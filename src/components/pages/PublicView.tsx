import { BenchmarkStatusChip } from "@/components/ui/BenchmarkStatusChip";
import { IncentiveEligibilityBadge } from "@/components/ui/IncentiveEligibilityBadge";
import { PerformanceAlertModal } from "@/components/ui/PerformanceAlertModal";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITY_LIST, CITY_PROVIDERS, type CityProvider } from "@/data/mockData";
import { isEligibleForIncentive } from "@/utils/benchmarkUtils";
import type {
  IndicatorForAlert,
  PerformanceAlert,
} from "@/utils/performanceAlerts";
import { resolveAlertToShow } from "@/utils/performanceAlerts";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  Globe,
  MapPin,
  Minus,
  Search,
  ShieldCheck,
  SortDesc,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  type DomainScores,
  calcWeightedProviderRating,
} from "../../utils/ratingEngine";

// ── Helpers ────────────────────────────────────────────────────────────────────

function calcOverallFromIndicators(ind: CityProvider["indicators"]): number {
  const domains: DomainScores = {
    safety: ind.safetyClinical,
    preventive: ind.preventiveCare,
    quality: ind.qualityMeasures,
    staffing: ind.staffing,
    compliance: ind.compliance,
    experience: (ind.residents + ind.experience) / 2,
  };
  return calcWeightedProviderRating(domains).score;
}

function ratingColor(score: number): string {
  if (score >= 4.0) return "oklch(0.38 0.14 145)";
  if (score >= 3.0) return "oklch(0.50 0.16 72)";
  return "oklch(0.48 0.20 25)";
}

function ratingBandLabel(score: number): string {
  if (score >= 4.5) return "Excellent";
  if (score >= 4.0) return "Good";
  if (score >= 3.0) return "Moderate";
  return "Poor";
}

function ratingBadgeClass(score: number): string {
  if (score >= 4.0) return "badge-green";
  if (score >= 3.0) return "badge-amber";
  return "badge-red";
}

// Returns left accent bar color and hover border color based on rating tier
function cardAccentStyle(score: number): {
  border: string;
  hoverBorder: string;
  label: string;
} {
  if (score >= 4.0)
    return {
      border: "oklch(0.52 0.15 145)",
      hoverBorder: "oklch(0.38 0.14 145)",
      label: "badge-green",
    };
  if (score >= 3.0)
    return {
      border: "oklch(0.70 0.14 72)",
      hoverBorder: "oklch(0.50 0.16 72)",
      label: "badge-amber",
    };
  return {
    border: "oklch(0.52 0.22 25)",
    hoverBorder: "oklch(0.48 0.20 25)",
    label: "badge-red",
  };
}

function typeBadge(type: string) {
  if (type === "Residential") return <span className="badge-navy">{type}</span>;
  if (type === "Home Care") return <span className="badge-blue">{type}</span>;
  return <span className="badge-gray">{type}</span>;
}

function TrendArrow({
  trend,
}: { trend: "improving" | "declining" | "stable" }) {
  if (trend === "improving")
    return (
      <TrendingUp
        className="w-3.5 h-3.5"
        style={{ color: "oklch(0.45 0.15 145)" }}
      />
    );
  if (trend === "declining")
    return (
      <TrendingDown
        className="w-3.5 h-3.5"
        style={{ color: "oklch(0.48 0.20 25)" }}
      />
    );
  return (
    <Minus className="w-3.5 h-3.5" style={{ color: "oklch(0.55 0.02 240)" }} />
  );
}

// ── Build alert indicators from CityProvider ──────────────────────────────────

const PUBLIC_INDICATOR_KEYS: {
  key: keyof CityProvider["indicators"];
  label: string;
}[] = [
  { key: "residents", label: "Residents Experience" },
  { key: "staffing", label: "Staffing" },
  { key: "qualityMeasures", label: "Quality Measures" },
  { key: "compliance", label: "Compliance" },
  { key: "safetyClinical", label: "Safety & Clinical" },
  { key: "preventiveCare", label: "Preventive Care" },
  { key: "experience", label: "Experience" },
  { key: "equity", label: "Equity" },
];

function buildPublicAlertIndicators(
  provider: CityProvider,
): IndicatorForAlert[] {
  return PUBLIC_INDICATOR_KEYS.map((ind) => ({
    label: ind.label,
    score: provider.indicators[ind.key],
    providerValue: provider.indicators[ind.key],
    benchmark: 3.5,
    isLowerBetter: false,
  }));
}

// ── Indicator config for public display ───────────────────────────────────────

const PUBLIC_INDICATORS: {
  key: keyof CityProvider["indicators"];
  label: string;
}[] = [
  { key: "residents", label: "Residents Experience" },
  { key: "staffing", label: "Staffing" },
  { key: "qualityMeasures", label: "Quality Measures" },
  { key: "compliance", label: "Compliance" },
  { key: "safetyClinical", label: "Safety & Clinical" },
  { key: "preventiveCare", label: "Preventive Care" },
  { key: "experience", label: "Experience" },
  { key: "equity", label: "Equity" },
];

// ── Regional Comparison Bar Chart ─────────────────────────────────────────────

function RegionComparisonChart({
  providers,
  selectedId,
}: {
  providers: CityProvider[];
  selectedId?: string;
}) {
  const data = providers.map((p) => ({
    name: p.name.length > 18 ? `${p.name.slice(0, 16)}…` : p.name,
    fullName: p.name,
    rating: Number.parseFloat(
      calcOverallFromIndicators(p.indicators).toFixed(2),
    ),
    id: p.id,
  }));

  return (
    <Card
      className="rounded-none border-0 shadow-gov overflow-hidden"
      data-ocid="public.comparison.chart_point"
    >
      <CardHeader
        className="pb-3 pt-4 px-5 border-b"
        style={{
          background: "oklch(0.97 0.008 254)",
          borderColor: "oklch(0.88 0.012 240)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle
              className="text-sm font-bold text-gov-navy"
              style={{ letterSpacing: "-0.01em" }}
            >
              Regional Provider Rating Comparison
            </CardTitle>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.50 0.025 250)" }}
            >
              Weighted overall rating by provider — Benchmark at 3.5 stars
            </p>
          </div>
          <div
            className="flex items-center gap-3 text-xs"
            style={{ color: "oklch(0.50 0.025 250)" }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5"
                style={{ background: "oklch(0.52 0.15 145)", borderRadius: 1 }}
              />
              Good (4.0+)
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5"
                style={{ background: "oklch(0.70 0.14 72)", borderRadius: 1 }}
              />
              Moderate (3.0–3.9)
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5"
                style={{ background: "oklch(0.52 0.22 25)", borderRadius: 1 }}
              />
              Poor (&lt;3.0)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 bg-white">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 0, bottom: 40 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.87 0.012 240)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 10,
                fill: "oklch(0.38 0.06 254)",
                fontWeight: 600,
              }}
              axisLine={{ stroke: "oklch(0.82 0.04 254)" }}
              tickLine={false}
              angle={-30}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fontSize: 10, fill: "oklch(0.50 0.025 250)" }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <RechartsTooltip
              contentStyle={{
                fontSize: 12,
                fontWeight: 600,
                border: "1px solid oklch(0.82 0.04 254)",
                borderRadius: 0,
                background: "#fff",
              }}
              formatter={(
                value: number,
                _: string,
                entry: { payload?: { fullName?: string } },
              ) => [
                `${(value as number).toFixed(2)} / 5.0`,
                entry?.payload?.fullName ?? "Rating",
              ]}
            />
            <ReferenceLine
              y={3.5}
              stroke="oklch(0.28 0.09 254)"
              strokeDasharray="5 3"
              strokeWidth={1.5}
              label={{
                value: "Benchmark 3.5",
                position: "insideTopRight",
                fontSize: 9,
                fontWeight: 700,
                fill: "oklch(0.28 0.09 254)",
              }}
            />
            <Bar dataKey="rating" radius={0} maxBarSize={48}>
              {data.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={
                    entry.id === selectedId
                      ? "oklch(0.28 0.09 254)"
                      : entry.rating >= 4.0
                        ? "oklch(0.52 0.15 145)"
                        : entry.rating >= 3.0
                          ? "oklch(0.70 0.14 72)"
                          : "oklch(0.52 0.22 25)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ── KPI Summary Cards ─────────────────────────────────────────────────────────

function CityKPICards({ providers }: { providers: CityProvider[] }) {
  const ratings = providers.map((p) => calcOverallFromIndicators(p.indicators));
  const avgRating = ratings.reduce((s, r) => s + r, 0) / ratings.length;
  const highest = providers.reduce((prev, curr) =>
    calcOverallFromIndicators(curr.indicators) >
    calcOverallFromIndicators(prev.indicators)
      ? curr
      : prev,
  );
  const highestRating = calcOverallFromIndicators(highest.indicators);
  const eligibleCount = providers.filter((p) => {
    const score = calcOverallFromIndicators(p.indicators);
    const hasBelowBenchmark = PUBLIC_INDICATORS.some(
      (ind) => p.indicators[ind.key] < 3.5,
    );
    return isEligibleForIncentive(score, hasBelowBenchmark);
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border rounded-none overflow-hidden shadow-gov">
      {/* Highest rated */}
      <div
        className="p-5 bg-white border-r"
        style={{ borderColor: "oklch(0.88 0.012 240)" }}
        data-ocid="public.kpi.highest.card"
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="text-xs uppercase font-bold tracking-widest"
            style={{ color: "oklch(0.46 0.025 250)" }}
          >
            Top-Rated Provider
          </div>
          <Award
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "oklch(0.52 0.15 145)" }}
          />
        </div>
        <div
          className="text-4xl font-black tabular-nums leading-none mb-1"
          style={{ color: ratingColor(highestRating) }}
        >
          {highestRating.toFixed(1)}
          <span
            className="text-lg font-semibold"
            style={{ color: "oklch(0.65 0.02 240)" }}
          >
            {" "}
            /5
          </span>
        </div>
        <div
          className="text-xs font-semibold truncate mt-2"
          style={{ color: "oklch(0.35 0.06 254)" }}
        >
          {highest.name}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "oklch(0.55 0.02 240)" }}
        >
          Highest in region
        </div>
      </div>

      {/* Average rating */}
      <div
        className="p-5 bg-white border-r"
        style={{ borderColor: "oklch(0.88 0.012 240)" }}
        data-ocid="public.kpi.average.card"
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="text-xs uppercase font-bold tracking-widest"
            style={{ color: "oklch(0.46 0.025 250)" }}
          >
            Regional Average
          </div>
          <SortDesc
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "oklch(0.50 0.16 72)" }}
          />
        </div>
        <div
          className="text-4xl font-black tabular-nums leading-none mb-1"
          style={{ color: ratingColor(avgRating) }}
        >
          {avgRating.toFixed(1)}
          <span
            className="text-lg font-semibold"
            style={{ color: "oklch(0.65 0.02 240)" }}
          >
            {" "}
            /5
          </span>
        </div>
        <div className="mt-2">
          <StarRating value={avgRating} size="sm" showLabel={false} />
        </div>
        <div className="text-xs mt-1" style={{ color: "oklch(0.55 0.02 240)" }}>
          Weighted composite score
        </div>
      </div>

      {/* Provider count */}
      <div
        className="p-5 bg-white border-r"
        style={{ borderColor: "oklch(0.88 0.012 240)" }}
        data-ocid="public.kpi.count.card"
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="text-xs uppercase font-bold tracking-widest"
            style={{ color: "oklch(0.46 0.025 250)" }}
          >
            Providers Monitored
          </div>
          <Building2
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "oklch(0.28 0.09 254)" }}
          />
        </div>
        <div className="text-4xl font-black tabular-nums leading-none mb-1 text-gov-navy">
          {providers.length}
        </div>
        <div className="text-xs mt-2" style={{ color: "oklch(0.55 0.02 240)" }}>
          Registered in this region
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "oklch(0.55 0.02 240)" }}
        >
          All publicly reported
        </div>
      </div>

      {/* Incentive eligible */}
      <div className="p-5 bg-white" data-ocid="public.kpi.eligible.card">
        <div className="flex items-start justify-between mb-3">
          <div
            className="text-xs uppercase font-bold tracking-widest"
            style={{ color: "oklch(0.46 0.025 250)" }}
          >
            Incentive Eligible
          </div>
          <ShieldCheck
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "oklch(0.45 0.15 145)" }}
          />
        </div>
        <div
          className="text-4xl font-black tabular-nums leading-none mb-1"
          style={{ color: "oklch(0.38 0.14 145)" }}
        >
          {eligibleCount}
        </div>
        <div className="text-xs mt-2" style={{ color: "oklch(0.55 0.02 240)" }}>
          Meet quality threshold
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "oklch(0.55 0.02 240)" }}
        >
          Pay-for-Improvement eligible
        </div>
      </div>
    </div>
  );
}

// ── Provider Detail Panel ─────────────────────────────────────────────────────

function ProviderDetailPanel({
  provider,
  allProviders,
  onBack,
}: {
  provider: CityProvider;
  allProviders: CityProvider[];
  onBack: () => void;
}) {
  const overall = calcOverallFromIndicators(provider.indicators);
  const belowThree = PUBLIC_INDICATORS.filter(
    (ind) => provider.indicators[ind.key] < 3.0,
  ).length;
  const hasBelowBenchmark = PUBLIC_INDICATORS.some(
    (ind) => provider.indicators[ind.key] < 3.5,
  );
  const incentiveEligible = isEligibleForIncentive(overall, hasBelowBenchmark);

  const [alertOpen, setAlertOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<PerformanceAlert | null>(
    null,
  );

  useEffect(() => {
    const indicators = buildPublicAlertIndicators(provider);
    const alertResult = resolveAlertToShow(provider.name, overall, indicators);
    if (alertResult) {
      setCurrentAlert(alertResult);
      setAlertOpen(true);
    } else {
      setCurrentAlert(null);
      setAlertOpen(false);
    }
  }, [provider, overall]);

  const accent = cardAccentStyle(overall);

  return (
    <div className="space-y-5" data-ocid="public.provider.detail.panel">
      {/* Detail header panel */}
      <div
        className="border rounded-none overflow-hidden shadow-gov"
        style={{ borderColor: accent.border }}
      >
        {/* Color accent top bar */}
        <div className="h-1.5 w-full" style={{ background: accent.border }} />
        <div
          className="px-5 py-4"
          style={{ background: "oklch(0.975 0.006 254)" }}
        >
          <div className="flex items-start gap-4">
            <button
              type="button"
              data-ocid="public.provider.detail.back_button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 border transition-all hover:bg-gov-navy hover:text-white flex-shrink-0 mt-0.5"
              style={{
                borderColor: "oklch(var(--gov-navy))",
                color: "oklch(var(--gov-navy))",
                borderRadius: 0,
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Providers
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Building2
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: accent.border }}
                />
                <h2
                  className="text-xl font-black leading-tight"
                  style={{
                    color: "oklch(var(--gov-navy))",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {provider.name}
                </h2>
                <span
                  className={ratingBadgeClass(overall)}
                  style={{ fontSize: 11 }}
                >
                  {ratingBandLabel(overall)}
                </span>
              </div>
              <div
                className="flex flex-wrap gap-x-4 gap-y-1 text-xs"
                style={{ color: "oklch(0.48 0.025 250)" }}
              >
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {provider.city}, Australia
                </span>
                <span>{typeBadge(provider.type)}</span>
                {provider.beds && (
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5" />
                    {provider.beds} beds
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Established {provider.established}
                </span>
                <IncentiveEligibilityBadge
                  eligible={incentiveEligible}
                  size="sm"
                />
              </div>
            </div>

            {/* Overall score pill */}
            <div
              className="flex-shrink-0 text-center px-4 py-3 border"
              style={{
                background: "white",
                borderColor: accent.border,
                minWidth: 80,
              }}
            >
              <div
                className="text-3xl font-black tabular-nums leading-none"
                style={{ color: accent.border }}
              >
                {overall.toFixed(1)}
              </div>
              <div
                className="text-xs font-semibold mt-0.5"
                style={{ color: "oklch(0.55 0.02 240)" }}
              >
                out of 5
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning for low indicators */}
      {belowThree > 0 && (
        <div
          className="flex items-center gap-2.5 px-4 py-3 text-xs font-semibold border-l-4"
          style={{
            background: "oklch(0.97 0.025 25)",
            borderLeftColor: "oklch(0.52 0.22 25)",
            borderTop: "1px solid oklch(0.80 0.10 25)",
            borderRight: "1px solid oklch(0.80 0.10 25)",
            borderBottom: "1px solid oklch(0.80 0.10 25)",
            color: "oklch(0.42 0.20 25)",
          }}
          data-ocid="public.provider.warning.panel"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>
              {belowThree} indicator{belowThree !== 1 ? "s" : ""}
            </strong>{" "}
            below acceptable threshold — this provider may require improvement
            action.
          </span>
        </div>
      )}

      {/* Indicator Scorecard Table */}
      <Card className="rounded-none border-0 shadow-gov overflow-hidden">
        <CardHeader
          className="pb-3 pt-4 px-5 border-b"
          style={{
            background: "oklch(0.975 0.006 254)",
            borderColor: "oklch(0.88 0.012 240)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-gov-navy">
                Quality Indicator Ratings
              </CardTitle>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.50 0.025 250)" }}
              >
                Star ratings across 8 care quality domains
              </p>
            </div>
            <div
              className="text-xs font-semibold px-2.5 py-1"
              style={{
                background: "oklch(0.93 0.012 240)",
                color: "oklch(0.40 0.04 254)",
                border: "1px solid oklch(0.86 0.015 240)",
              }}
            >
              8 Indicators
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full gov-table">
            <thead>
              <tr>
                <th className="text-left" style={{ width: "30%" }}>
                  Indicator
                </th>
                <th className="text-left" style={{ width: "28%" }}>
                  Star Rating
                </th>
                <th className="text-center" style={{ width: "10%" }}>
                  Score
                </th>
                <th className="text-left" style={{ width: "18%" }}>
                  vs Benchmark
                </th>
                <th className="text-center" style={{ width: "14%" }}>
                  Band
                </th>
              </tr>
            </thead>
            <tbody>
              {PUBLIC_INDICATORS.map((ind, idx) => {
                const score = provider.indicators[ind.key];
                const meta = provider.indicatorMeta?.[ind.key];
                const trend = meta?.trend ?? "stable";
                const isLow = score < 3.0;
                const isHigh = score >= 4.5;

                return (
                  <tr
                    key={ind.key}
                    data-ocid={`public.indicator.row.${idx + 1}`}
                    style={
                      isLow ? { background: "oklch(0.99 0.008 25)" } : undefined
                    }
                  >
                    <td
                      className="font-semibold text-xs uppercase tracking-wide"
                      style={{ color: "oklch(0.30 0.06 254)" }}
                    >
                      <div className="flex items-center gap-1.5">
                        {isLow && (
                          <AlertTriangle
                            className="w-3.5 h-3.5 flex-shrink-0"
                            style={{ color: "oklch(0.48 0.20 25)" }}
                          />
                        )}
                        {isHigh && (
                          <CheckCircle
                            className="w-3.5 h-3.5 flex-shrink-0"
                            style={{ color: "oklch(0.45 0.15 145)" }}
                          />
                        )}
                        {ind.label}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <StarRating value={score} size="md" showLabel={false} />
                        <TrendArrow trend={trend} />
                      </div>
                    </td>
                    <td className="text-center">
                      <span
                        className="font-black tabular-nums text-sm"
                        style={{ color: ratingColor(score) }}
                      >
                        {score.toFixed(1)}
                      </span>
                    </td>
                    <td>
                      <BenchmarkStatusChip
                        rate={score}
                        benchmark={3.5}
                        isLowerBetter={false}
                        size="xs"
                      />
                    </td>
                    <td className="text-center">
                      <span className={ratingBadgeClass(score)}>
                        {score >= 4.5
                          ? "Excellent"
                          : score >= 3.5
                            ? "Good"
                            : score >= 3.0
                              ? "Moderate"
                              : "Poor"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Overall Rating card */}
      <Card
        className="rounded-none border-0 shadow-gov overflow-hidden"
        style={{
          background:
            overall >= 4.0
              ? "oklch(0.96 0.025 145)"
              : overall >= 3.0
                ? "oklch(0.97 0.03 80)"
                : "oklch(0.97 0.025 25)",
        }}
        data-ocid="public.provider.overall_rating.card"
      >
        <div className="h-1 w-full" style={{ background: accent.border }} />
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <div
                className="text-xs uppercase font-bold tracking-widest mb-1"
                style={{ color: "oklch(0.46 0.025 250)" }}
              >
                Overall Provider Rating
              </div>
              <div
                className="text-xs mb-3"
                style={{ color: "oklch(0.40 0.03 250)" }}
              >
                Overall rating calculated using weighted composite score of key
                indicators.
              </div>
              <StarRating value={overall} size="lg" />
              <div
                className="mt-3 text-xs pt-3 border-t"
                style={{
                  color: "oklch(0.50 0.025 250)",
                  borderColor: "oklch(0.82 0.06 145)",
                }}
              >
                <span className="font-semibold">Safety 30%</span>
                {" · "}
                <span className="font-semibold">Preventive Care 20%</span>
                {" · "}
                <span className="font-semibold">Quality Measures 20%</span>
                {" · "}
                <span className="font-semibold">Staffing 15%</span>
                {" · "}
                <span className="font-semibold">Compliance 10%</span>
                {" · "}
                <span className="font-semibold">Experience 5%</span>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div
                className="text-6xl font-black tabular-nums leading-none"
                style={{ color: ratingColor(overall) }}
              >
                {overall.toFixed(1)}
              </div>
              <div
                className="text-sm font-semibold mt-1"
                style={{ color: "oklch(0.55 0.02 240)" }}
              >
                out of 5.0
              </div>
              <div className="mt-3">
                <span
                  className="px-3 py-1.5 text-xs font-black uppercase tracking-wide"
                  style={{
                    background: ratingColor(overall),
                    color: "#fff",
                    borderRadius: 2,
                  }}
                >
                  {ratingBandLabel(overall)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison chart */}
      <RegionComparisonChart
        providers={allProviders}
        selectedId={provider.id}
      />

      {/* Performance Alert Modal */}
      <PerformanceAlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        alert={currentAlert}
      />
    </div>
  );
}

// ── Provider Card ─────────────────────────────────────────────────────────────

function ProviderCard({
  provider,
  index,
  onSelect,
}: {
  provider: CityProvider;
  index: number;
  onSelect: (p: CityProvider) => void;
}) {
  const overall = calcOverallFromIndicators(provider.indicators);
  const belowThree = PUBLIC_INDICATORS.filter(
    (ind) => provider.indicators[ind.key] < 3.0,
  ).length;
  const accent = cardAccentStyle(overall);

  return (
    <button
      type="button"
      data-ocid={`public.provider.card.${index}`}
      className="border-0 bg-white cursor-pointer group w-full text-left shadow-gov overflow-hidden transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderRadius: 0,
        outline: "1px solid oklch(0.88 0.012 240)",
      }}
      onClick={() => onSelect(provider)}
      aria-label={`View details for ${provider.name}`}
    >
      {/* Color accent left bar (via top bar for grid layout) */}
      <div className="h-1 w-full" style={{ background: accent.border }} />

      {/* Card header */}
      <div
        className="px-4 py-3 border-b flex items-start gap-2.5"
        style={{
          background: "oklch(0.975 0.006 254)",
          borderColor: "oklch(0.88 0.012 240)",
        }}
      >
        <Building2
          className="w-4 h-4 flex-shrink-0 mt-0.5"
          style={{ color: accent.border }}
        />
        <div className="flex-1 min-w-0">
          <span
            className="font-black text-sm leading-snug block truncate"
            style={{
              color: "oklch(var(--gov-navy))",
              letterSpacing: "-0.01em",
            }}
          >
            {provider.name}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {typeBadge(provider.type)}
          </div>
        </div>
        <ChevronDown
          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 rotate-[-90deg] opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ color: "oklch(var(--gov-navy))" }}
        />
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        <div
          className="flex flex-wrap gap-x-4 gap-y-1 text-xs"
          style={{ color: "oklch(0.48 0.025 250)" }}
        >
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {provider.city}
          </span>
          {provider.beds && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-3 h-3" />
              {provider.beds} beds
            </span>
          )}
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            Est. {provider.established}
          </span>
        </div>

        {/* Overall rating — prominent */}
        <div
          className="flex items-center justify-between py-2.5 px-3"
          style={{
            background: "oklch(0.975 0.006 254)",
            border: "1px solid oklch(0.88 0.012 240)",
          }}
        >
          <div>
            <div
              className="text-xs uppercase font-bold tracking-wide mb-1"
              style={{ color: "oklch(0.46 0.025 250)" }}
            >
              Overall Rating
            </div>
            <StarRating value={overall} size="md" showLabel={false} />
          </div>
          <div className="text-right">
            <div
              className="text-2xl font-black tabular-nums leading-none"
              style={{ color: accent.border }}
            >
              {overall.toFixed(1)}
            </div>
            <div className="text-xs" style={{ color: "oklch(0.60 0.02 240)" }}>
              / 5.0
            </div>
          </div>
        </div>

        {belowThree > 0 && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border-l-4"
            style={{
              background: "oklch(0.97 0.025 25)",
              borderLeftColor: "oklch(0.52 0.22 25)",
              border: "1px solid oklch(0.80 0.10 25)",
              borderLeft: "3px solid oklch(0.52 0.22 25)",
              color: "oklch(0.42 0.20 25)",
            }}
          >
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            {belowThree} indicator{belowThree !== 1 ? "s" : ""} below threshold
          </div>
        )}

        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-none border text-xs font-bold mt-1 group-hover:bg-gov-navy group-hover:text-white transition-colors"
          style={{
            borderColor: "oklch(var(--gov-navy))",
            color: "oklch(var(--gov-navy))",
          }}
          data-ocid={`public.provider.view_details.button.${index}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(provider);
          }}
        >
          <Search className="w-3 h-3 mr-1.5" />
          View Provider Scorecard
        </Button>
      </div>
    </button>
  );
}

// ── Main Public View ───────────────────────────────────────────────────────────

interface PublicViewProps {
  currentQuarter?: string;
}
export default function PublicView({
  currentQuarter: _currentQuarter = "Q4-2025",
}: PublicViewProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<CityProvider | null>(
    null,
  );
  const [sortByRating, setSortByRating] = useState(false);

  const rawProviders = selectedCity ? (CITY_PROVIDERS[selectedCity] ?? []) : [];
  const providers = sortByRating
    ? [...rawProviders].sort(
        (a, b) =>
          calcOverallFromIndicators(b.indicators) -
          calcOverallFromIndicators(a.indicators),
      )
    : rawProviders;

  function handleCityChange(city: string) {
    setSelectedCity(city);
    setSelectedProvider(null);
  }

  function handleProviderSelect(provider: CityProvider) {
    setSelectedProvider(provider);
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.005 240)" }}
      data-ocid="public.page"
    >
      {/* ── Government hero band ── */}
      <div
        className="border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.13 0.065 254) 0%, oklch(0.20 0.08 254) 60%, oklch(0.16 0.07 254) 100%)",
          borderColor: "oklch(0.22 0.06 254)",
        }}
      >
        {/* Top thin gold accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.12 85), oklch(0.82 0.14 80), oklch(0.72 0.12 85))",
          }}
        />

        <div className="px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Crest icon */}
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center border"
                style={{
                  background: "oklch(0.20 0.08 254)",
                  borderColor: "oklch(0.72 0.12 85)",
                }}
              >
                <Globe
                  className="w-6 h-6"
                  style={{ color: "oklch(0.72 0.12 85)" }}
                />
              </div>

              <div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: "oklch(0.72 0.12 85)" }}
                >
                  Australian Government · Department of Health and Aged Care
                </div>
                <h1
                  className="text-2xl font-black leading-tight"
                  style={{
                    color: "oklch(0.97 0.005 240)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Aged Care Provider Directory
                </h1>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "oklch(0.75 0.04 254)" }}
                >
                  Public Transparency Portal — Quality ratings for registered
                  aged care services
                </p>
              </div>
            </div>

            {/* Stats pill */}
            <div className="flex-shrink-0 hidden sm:flex flex-col gap-1.5 text-right">
              <div
                className="px-3 py-1.5 text-xs font-bold"
                style={{
                  background: "oklch(0.20 0.08 254)",
                  color: "oklch(0.80 0.08 254)",
                  border: "1px solid oklch(0.28 0.08 254)",
                }}
              >
                <MapPin
                  className="w-3 h-3 inline mr-1"
                  style={{ color: "oklch(0.72 0.12 85)" }}
                />
                {CITY_LIST.length} Regions monitored
              </div>
              <div
                className="px-3 py-1.5 text-xs font-bold"
                style={{
                  background: "oklch(0.20 0.08 254)",
                  color: "oklch(0.80 0.08 254)",
                  border: "1px solid oklch(0.28 0.08 254)",
                }}
              >
                <Building2
                  className="w-3 h-3 inline mr-1"
                  style={{ color: "oklch(0.72 0.12 85)" }}
                />
                {Object.values(CITY_PROVIDERS).flat().length} Providers reported
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Disclaimer banner */}
        <div
          className="flex items-start gap-3 px-4 py-3 border-l-4 text-xs"
          style={{
            background: "oklch(0.97 0.01 254)",
            borderLeftColor: "oklch(0.52 0.14 230)",
            borderTop: "1px solid oklch(0.88 0.015 240)",
            borderRight: "1px solid oklch(0.88 0.015 240)",
            borderBottom: "1px solid oklch(0.88 0.015 240)",
            color: "oklch(0.40 0.04 254)",
          }}
        >
          <ShieldCheck
            className="w-4 h-4 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.45 0.15 145)" }}
          />
          <div>
            <span className="font-bold">
              Public View — Quality Ratings Only.
            </span>{" "}
            Resident data, regulatory actions, cohort information, and
            operational details are not displayed in the public portal. Ratings
            are based on nationally standardised quality indicators.
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div
          className="border"
          style={{
            background: "oklch(0.985 0.004 250)",
            borderColor: "oklch(0.86 0.015 240)",
            boxShadow: "0 1px 3px 0 rgba(15,23,60,0.06)",
          }}
        >
          <div
            className="px-4 py-2 border-b flex items-center gap-2"
            style={{
              background: "oklch(0.955 0.012 254)",
              borderColor: "oklch(0.86 0.015 240)",
            }}
          >
            <Search
              className="w-3.5 h-3.5"
              style={{ color: "oklch(var(--gov-navy))" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(var(--gov-navy))" }}
            >
              Provider Search &amp; Filter
            </span>
          </div>

          <div className="px-4 py-4 flex flex-wrap items-end gap-4">
            <div className="min-w-[220px]">
              <div
                className="block text-xs font-bold uppercase tracking-wide mb-1.5"
                style={{ color: "oklch(0.46 0.025 250)" }}
              >
                Region / City
              </div>
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger
                  className="rounded-none border h-9 text-sm"
                  style={{ borderColor: "oklch(0.80 0.02 240)" }}
                  data-ocid="public.region.select"
                >
                  <SelectValue placeholder="Select a region..." />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {CITY_LIST.map((city, idx) => (
                    <SelectItem
                      key={city}
                      value={city}
                      data-ocid={`public.city.item.${idx + 1}`}
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCity && (
              <div className="flex items-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-none h-9 text-xs font-bold transition-colors"
                  style={{
                    borderColor: sortByRating
                      ? "oklch(var(--gov-navy))"
                      : "oklch(0.80 0.02 240)",
                    background: sortByRating
                      ? "oklch(var(--gov-navy))"
                      : "white",
                    color: sortByRating ? "white" : "oklch(var(--gov-navy))",
                  }}
                  data-ocid="public.sort_by_rating.toggle"
                  onClick={() => setSortByRating((v) => !v)}
                >
                  <SortDesc className="w-3.5 h-3.5 mr-1.5" />
                  Sort by Rating
                </Button>
              </div>
            )}

            {selectedCity && (
              <div
                className="ml-auto text-xs"
                style={{ color: "oklch(0.50 0.025 250)" }}
              >
                <span className="font-semibold text-gov-navy">
                  {providers.length}
                </span>{" "}
                provider{providers.length !== 1 ? "s" : ""} in{" "}
                <span className="font-semibold">{selectedCity}</span>
                {sortByRating && (
                  <span
                    className="ml-2 px-1.5 py-0.5 text-xs font-semibold"
                    style={{
                      background: "oklch(0.92 0.03 254)",
                      color: "oklch(var(--gov-navy))",
                      border: "1px solid oklch(0.82 0.04 254)",
                    }}
                  >
                    Sorted: Highest Rated First
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Empty state */}
        {!selectedCity && (
          <div
            className="border py-16 text-center"
            data-ocid="public.empty_state"
            style={{
              borderColor: "oklch(0.86 0.015 240)",
              background: "white",
              boxShadow: "0 1px 3px 0 rgba(15,23,60,0.05)",
            }}
          >
            <div
              className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border"
              style={{
                background: "oklch(0.955 0.012 254)",
                borderColor: "oklch(0.86 0.015 240)",
              }}
            >
              <MapPin
                className="w-7 h-7"
                style={{ color: "oklch(var(--gov-navy))" }}
              />
            </div>
            <p
              className="text-base font-black"
              style={{
                color: "oklch(var(--gov-navy))",
                letterSpacing: "-0.01em",
              }}
            >
              Select a region to view providers
            </p>
            <p
              className="text-xs mt-1.5"
              style={{ color: "oklch(0.55 0.02 240)" }}
            >
              Choose from {CITY_LIST.length} regions across Australia to compare
              aged care quality ratings
            </p>
            <div
              className="mt-4 flex items-center justify-center gap-3 text-xs"
              style={{ color: "oklch(0.50 0.025 250)" }}
            >
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 bg-gov-green"
                  style={{ borderRadius: 1 }}
                />
                High performers
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2"
                  style={{ background: "oklch(0.70 0.14 72)", borderRadius: 1 }}
                />
                Moderate performers
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2"
                  style={{ background: "oklch(0.52 0.22 25)", borderRadius: 1 }}
                />
                Require improvement
              </span>
            </div>
          </div>
        )}

        {/* Provider list view */}
        {selectedCity && !selectedProvider && (
          <>
            {/* KPI Cards */}
            <CityKPICards providers={rawProviders} />

            {/* Comparison chart */}
            <RegionComparisonChart providers={providers} />

            {/* Provider grid header */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border"
              style={{
                background: "oklch(0.955 0.012 254)",
                borderColor: "oklch(0.86 0.015 240)",
              }}
            >
              <div className="flex items-center gap-2">
                <Building2
                  className="w-4 h-4"
                  style={{ color: "oklch(var(--gov-navy))" }}
                />
                <span
                  className="font-bold text-sm"
                  style={{ color: "oklch(var(--gov-navy))" }}
                >
                  {selectedCity}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.48 0.025 250)" }}
                >
                  — {providers.length} registered provider
                  {providers.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {sortByRating && (
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5"
                    style={{
                      background: "oklch(0.92 0.06 254)",
                      color: "oklch(var(--gov-navy))",
                      border: "1px solid oklch(0.82 0.06 254)",
                    }}
                  >
                    <SortDesc className="w-3 h-3" />
                    Sorted by Rating
                  </span>
                )}
                <span className="badge-navy">{providers.length} Providers</span>
              </div>
            </div>

            {/* Provider grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="public.provider.list"
            >
              {providers.map((provider, idx) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  index={idx + 1}
                  onSelect={handleProviderSelect}
                />
              ))}
            </div>
          </>
        )}

        {/* Provider detail */}
        {selectedCity && selectedProvider && (
          <ProviderDetailPanel
            provider={selectedProvider}
            allProviders={rawProviders}
            onBack={() => setSelectedProvider(null)}
          />
        )}
      </div>
    </div>
  );
}
