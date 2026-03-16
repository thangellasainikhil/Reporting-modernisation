import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ActivePage } from "../../App";
import {
  NATIONAL_TRENDS,
  RECENT_SUBMISSIONS,
  STATE_ADVERSE_EVENTS,
} from "../../data/mockData";
import { useNationalOverviewStats } from "../../hooks/useQueries";

interface NationalOverviewProps {
  currentQuarter: string;
  setActivePage?: (page: ActivePage) => void;
}

function getQuarterMultiplier(quarter: string): number {
  if (quarter.startsWith("Q1")) return 0.88;
  if (quarter.startsWith("Q2")) return 0.93;
  if (quarter.startsWith("Q3")) return 0.97;
  return 1.0;
}

const STATES_DATA = [
  {
    code: "NSW",
    name: "New South Wales",
    providers: 847,
    avgRating: 3.9,
    risk: "low" as const,
  },
  {
    code: "VIC",
    name: "Victoria",
    providers: 712,
    avgRating: 3.7,
    risk: "medium" as const,
  },
  {
    code: "QLD",
    name: "Queensland",
    providers: 489,
    avgRating: 3.5,
    risk: "medium" as const,
  },
  {
    code: "WA",
    name: "Western Australia",
    providers: 287,
    avgRating: 4.1,
    risk: "low" as const,
  },
  {
    code: "SA",
    name: "South Australia",
    providers: 198,
    avgRating: 3.2,
    risk: "high" as const,
  },
  {
    code: "TAS",
    name: "Tasmania",
    providers: 89,
    avgRating: 3.8,
    risk: "low" as const,
  },
  {
    code: "NT",
    name: "Northern Territory",
    providers: 67,
    avgRating: 2.9,
    risk: "high" as const,
  },
  {
    code: "ACT",
    name: "Australian Capital Territory",
    providers: 54,
    avgRating: 4.2,
    risk: "low" as const,
  },
];

const CRITICAL_ALERTS = [
  {
    provider: "Northern Beaches Elder Support",
    state: "NSW",
    indicator: "Falls with Harm Rate",
    providerValue: 7.2,
    benchmark: 5.1,
    unit: "per 1,000 res-days",
    severity: "critical" as const,
    action: "Implement falls prevention protocol review within 30 days",
  },
  {
    provider: "Sandy Bay Senior Care",
    state: "TAS",
    indicator: "Medication-Related Harm",
    providerValue: 4.8,
    benchmark: 3.2,
    unit: "incidents/month",
    severity: "critical" as const,
    action: "Commission medication safety audit and pharmacist review",
  },
  {
    provider: "Casuarina Elder Care",
    state: "NT",
    indicator: "Pressure Injuries Stage 2\u20134",
    providerValue: 3.9,
    benchmark: 2.4,
    unit: "prevalence %",
    severity: "warning" as const,
    action: "Review wound care protocols and increase nursing rounds",
  },
  {
    provider: "Glenelg Senior Services",
    state: "SA",
    indicator: "Screening Completion Rate",
    providerValue: 61.0,
    benchmark: 85.0,
    unit: "% complete",
    severity: "warning" as const,
    action: "Escalate screening compliance to facility manager",
  },
];

// Per-card accent tint for icon container — semantic color coding
function getIconBg(accentColor: string): string {
  if (accentColor.includes("var(--gov-navy)")) return "oklch(0.92 0.025 254)";
  if (accentColor.includes("var(--gov-gold)")) return "oklch(0.95 0.045 85)";
  if (accentColor.includes("var(--gov-red)")) return "oklch(0.94 0.04 25)";
  if (accentColor.includes("var(--gov-green)")) return "oklch(0.94 0.04 145)";
  return "oklch(0.94 0.008 240)";
}

function KpiCard({
  label,
  value,
  subtext,
  trend,
  icon: Icon,
  accentColor,
}: {
  label: string;
  value: string;
  subtext: string;
  trend?: number;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  accentColor: string;
}) {
  const iconBg = getIconBg(accentColor);

  return (
    <Card
      className="border-0 border-l-4 rounded-none"
      style={{
        borderLeftColor: accentColor,
        boxShadow:
          "0 1px 3px 0 rgba(15,23,60,0.07), 0 1px 2px -1px rgba(15,23,60,0.05)",
      }}
      data-ocid="national_overview.stats.card"
    >
      <CardContent className="p-5 pb-4">
        {/* Top row: label + icon */}
        <div className="flex items-start justify-between mb-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest leading-none"
            style={{
              color: "oklch(var(--muted-foreground))",
              letterSpacing: "0.09em",
            }}
          >
            {label}
          </p>
          <div
            className="w-9 h-9 flex items-center justify-center rounded-sm flex-shrink-0"
            style={{ background: iconBg }}
          >
            <Icon className="w-4.5 h-4.5" style={{ color: accentColor }} />
          </div>
        </div>

        {/* Value — dominant, Geist Mono, large */}
        <p
          className="font-bold leading-none tracking-tight"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
            color: "oklch(var(--foreground))",
          }}
        >
          {value}
        </p>

        {/* Subtext */}
        <p className="text-xs mt-1.5" style={{ color: "oklch(0.58 0.02 240)" }}>
          {subtext}
        </p>

        {/* Trend row */}
        {trend !== undefined && (
          <div
            className="flex items-center gap-1 mt-3 pt-2.5 border-t"
            style={{ borderColor: "oklch(0.92 0.008 240)" }}
          >
            {trend >= 0 ? (
              <TrendingUp
                className="w-3 h-3 flex-shrink-0"
                style={{ color: "oklch(var(--gov-green))" }}
              />
            ) : (
              <TrendingDown
                className="w-3 h-3 flex-shrink-0"
                style={{ color: "oklch(var(--gov-red))" }}
              />
            )}
            <span
              className="text-xs font-bold"
              style={{
                color:
                  trend >= 0
                    ? "oklch(var(--gov-green))"
                    : "oklch(var(--gov-red))",
              }}
            >
              {trend >= 0 ? "+" : ""}
              {trend}%
            </span>
            <span className="text-xs" style={{ color: "oklch(0.60 0.02 240)" }}>
              vs prior quarter
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StateRiskBox({ state }: { state: (typeof STATES_DATA)[0] }) {
  const riskStyles = {
    low: {
      border: "oklch(0.72 0.12 145)",
      bg: "oklch(0.96 0.025 145)",
      badge: "badge-green",
      label: "Low Risk",
    },
    medium: {
      border: "oklch(0.72 0.12 60)",
      bg: "oklch(0.97 0.018 80)",
      badge: "badge-amber",
      label: "Moderate",
    },
    high: {
      border: "oklch(0.65 0.18 25)",
      bg: "oklch(0.97 0.02 25)",
      badge: "badge-red",
      label: "High Risk",
    },
  };
  const s = riskStyles[state.risk];
  return (
    <div
      className="p-3 border rounded-sm cursor-default transition-shadow"
      style={{ background: s.bg, borderColor: s.border }}
      title={`${state.name}: ${state.providers} providers, avg ${state.avgRating}\u2605`}
    >
      <div className="flex items-start justify-between mb-1">
        <span
          className="text-xl font-bold"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "oklch(var(--gov-navy))",
          }}
        >
          {state.code}
        </span>
        <span className={s.badge}>{s.label}</span>
      </div>
      <div
        className="text-xs truncate"
        style={{ color: "oklch(0.42 0.03 250)" }}
      >
        {state.name}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs" style={{ color: "oklch(0.50 0.02 240)" }}>
          {state.providers.toLocaleString()} providers
        </span>
        <div className="flex items-center gap-0.5">
          <Star
            className="w-3 h-3"
            style={{
              color: "oklch(var(--gov-gold))",
              fill: "oklch(var(--gov-gold))",
            }}
          />
          <span
            className="text-xs font-semibold"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            {state.avgRating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

function DomainBar({ label, score }: { label: string; score: number }) {
  const color =
    score >= 80
      ? "oklch(var(--gov-green))"
      : score >= 60
        ? "oklch(var(--gov-amber))"
        : "oklch(var(--gov-red))";
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs w-24 flex-shrink-0"
        style={{ color: "oklch(0.42 0.03 250)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: "oklch(0.91 0.008 240)" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-semibold w-8 text-right"
        style={{ fontFamily: "'Geist Mono', monospace", color }}
      >
        {score}
      </span>
    </div>
  );
}

function NationalHealthBar({
  stats,
}: {
  stats:
    | {
        totalProviders: bigint | number;
        highRiskFlagged: bigint | number;
        avgSafetyScore: number;
        avgPreventiveScore: number;
      }
    | null
    | undefined;
}) {
  const avgScore = stats
    ? (stats.avgSafetyScore + stats.avgPreventiveScore) / 2
    : 76.5;
  const highRisk = stats ? Number(stats.highRiskFlagged) : 184;
  const total = stats ? Number(stats.totalProviders) : 2743;
  const improving = Math.round(total * 0.227);
  const incentiveEligible = Math.round(total * 0.498);

  let statusLabel = "STABLE";
  let statusColor = "oklch(var(--gov-green))";
  let statusBg = "oklch(0.92 0.06 145)";
  let dotColor = "bg-green-400";

  if (avgScore < 65) {
    statusLabel = "CRITICAL";
    statusColor = "oklch(var(--gov-red))";
    statusBg = "oklch(0.92 0.08 25)";
    dotColor = "bg-red-400";
  } else if (avgScore < 75) {
    statusLabel = "WATCH";
    statusColor = "oklch(var(--gov-amber))";
    statusBg = "oklch(0.94 0.06 60)";
    dotColor = "bg-amber-400";
  }

  return (
    <div
      className="border rounded-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
      style={{
        background: "oklch(0.975 0.015 254)",
        borderColor: "oklch(0.84 0.04 254)",
      }}
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: "oklch(0.45 0.04 254)" }}
        >
          National Aged Care System Status
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-bold"
          style={{ background: statusBg, color: statusColor }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColor}`}
            />
          </span>
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-5 text-xs">
        {[
          {
            label: "Avg Score",
            value: avgScore.toFixed(1),
            color: "oklch(var(--gov-navy))",
          },
          {
            label: "High-Risk Providers",
            value: highRisk.toLocaleString(),
            color: "oklch(var(--gov-red))",
          },
          {
            label: "Improving",
            value: improving.toLocaleString(),
            color: "oklch(var(--gov-green))",
          },
          {
            label: "Incentive Eligible",
            value: incentiveEligible.toLocaleString(),
            color: "oklch(var(--gov-blue))",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span style={{ color: "oklch(0.52 0.025 250)" }}>{label}</span>
            <span className="font-bold font-mono-data" style={{ color }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getSubmissionBadge(status: string) {
  if (status === "processed")
    return <span className="badge-green">Processed</span>;
  if (status === "validating")
    return <span className="badge-blue">Validating</span>;
  if (status === "validation_error")
    return <span className="badge-red">Error</span>;
  return <span className="badge-gray">Pending</span>;
}

export default function NationalOverview({
  currentQuarter,
  setActivePage,
}: NationalOverviewProps) {
  const { data: stats, isLoading } = useNationalOverviewStats(currentQuarter);
  const qMult = getQuarterMultiplier(currentQuarter);

  const radarData = [
    { domain: "Safety", score: Math.round(78 * qMult), fullMark: 100 },
    { domain: "Preventive", score: Math.round(74 * qMult), fullMark: 100 },
    { domain: "Quality", score: Math.round(81 * qMult), fullMark: 100 },
    { domain: "Staffing", score: Math.round(72 * qMult), fullMark: 100 },
    { domain: "Compliance", score: Math.round(85 * qMult), fullMark: 100 },
    { domain: "Experience", score: Math.round(69 * qMult), fullMark: 100 },
  ];

  const kpiCards = [
    {
      label: "Total Providers",
      value: stats ? Number(stats.totalProviders).toLocaleString() : "2,743",
      subtext: "Active aged care services",
      trend: 1.2,
      icon: Building2,
      accentColor: "oklch(var(--gov-navy))",
    },
    {
      label: "Average National Rating",
      value: stats
        ? `${(((stats.avgSafetyScore + stats.avgPreventiveScore) / 2 / 100) * 5).toFixed(1)} / 5 \u2605`
        : "3.8 / 5 \u2605",
      subtext: "Weighted provider average",
      trend: 0.8,
      icon: Star,
      accentColor: "oklch(var(--gov-gold))",
    },
    {
      label: "High-Risk Providers",
      value: stats ? Number(stats.highRiskFlagged).toLocaleString() : "184",
      subtext: "Requiring intervention",
      trend: -5.2,
      icon: AlertTriangle,
      accentColor: "oklch(var(--gov-red))",
    },
    {
      label: "Incentive Eligible",
      value: stats
        ? Math.round(Number(stats.totalProviders) * 0.498).toLocaleString()
        : "1,366",
      subtext: "Pay-for-Improvement eligible",
      trend: 3.4,
      icon: TrendingUp,
      accentColor: "oklch(var(--gov-green))",
    },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Page Header */}
      <div className="flex items-start justify-between pb-4 border-b">
        <div>
          <h1
            className="text-xl font-bold"
            style={{ color: "oklch(var(--gov-navy))" }}
          >
            National Intelligence Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Reporting period:{" "}
            <span
              className="font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {currentQuarter}
            </span>
            {" \u00b7"} Updated{" "}
            {new Date().toLocaleDateString("en-AU", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-1 text-xs font-bold rounded-sm border"
            style={{
              background: "oklch(0.93 0.04 145)",
              color: "oklch(0.32 0.14 145)",
              borderColor: "oklch(0.72 0.12 145)",
            }}
          >
            \u25cf Live Data
          </span>
          <span
            className="px-2.5 py-1 text-xs font-bold rounded-sm"
            style={{
              background: "oklch(0.93 0.012 254)",
              color: "oklch(0.38 0.06 254)",
            }}
          >
            AGED CARE ACT 2024
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((k) => (
            <Skeleton key={k} className="h-32 rounded-none" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <KpiCard key={card.label} {...card} />
          ))}
        </div>
      )}

      {/* National Health Status Bar */}
      <NationalHealthBar stats={stats} />

      {/* Domain Radar + Regional Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border rounded-none shadow-xs">
          <CardHeader className="pb-2 pt-4 px-4 border-b">
            <CardTitle
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--gov-navy))" }}
            >
              National Domain Performance Radar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart
                data={radarData}
                margin={{ top: 10, right: 25, bottom: 10, left: 25 }}
              >
                <PolarGrid stroke="oklch(0.89 0.008 240)" />
                <PolarAngleAxis
                  dataKey="domain"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(0.42 0.04 254)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                />
                <Radar
                  name="National Average"
                  dataKey="score"
                  stroke="oklch(0.42 0.14 230)"
                  fill="oklch(0.52 0.14 230)"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: "12px",
                    border: "1px solid oklch(0.87 0.012 240)",
                    borderRadius: "2px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  formatter={(v) => [`${v}`, "Score"]}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2 border-t pt-3">
              {radarData.map((d) => (
                <DomainBar key={d.domain} label={d.domain} score={d.score} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border rounded-none shadow-xs">
          <CardHeader className="pb-2 pt-4 px-4 border-b">
            <CardTitle
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--gov-navy))" }}
            >
              Regional Risk Distribution \u2014 Australian States & Territories
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STATES_DATA.map((state) => (
                <StateRiskBox key={state.code} state={state} />
              ))}
            </div>
            <div
              className="flex items-center gap-4 mt-3 pt-3 border-t text-xs"
              style={{ color: "oklch(0.52 0.02 240)" }}
            >
              {[
                { color: "oklch(0.72 0.12 145)", label: "Low Risk" },
                { color: "oklch(0.72 0.12 60)", label: "Moderate" },
                { color: "oklch(0.65 0.18 25)", label: "High Risk" },
              ].map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-sm inline-block"
                    style={{ background: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border rounded-none shadow-xs">
          <CardHeader className="pb-2 pt-4 px-4 border-b">
            <CardTitle
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--gov-navy))" }}
            >
              National Score Trends \u2014 Q1 to Q4 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={NATIONAL_TRENDS}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.91 0.008 240)"
                />
                <XAxis
                  dataKey="quarter"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  domain={[65, 85]}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: "12px",
                    border: "1px solid oklch(0.87 0.012 240)",
                    borderRadius: "2px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="safetyScore"
                  name="Safety Score"
                  stroke="oklch(0.28 0.09 254)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="preventiveScore"
                  name="Preventive Score"
                  stroke="oklch(0.52 0.15 145)"
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border rounded-none shadow-xs">
          <CardHeader className="pb-2 pt-4 px-4 border-b">
            <CardTitle
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--gov-navy))" }}
            >
              Adverse Event Rate by State/Territory (per 1,000 residents)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={STATE_ADVERSE_EVENTS}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.91 0.008 240)"
                  vertical={false}
                />
                <XAxis
                  dataKey="state"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: "12px",
                    border: "1px solid oklch(0.87 0.012 240)",
                    borderRadius: "2px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                />
                <Bar
                  dataKey="rate"
                  name="Adverse Event Rate"
                  fill="oklch(0.45 0.18 25)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Critical Performance Alerts */}
      <Card className="border rounded-none shadow-xs">
        <CardHeader className="pb-2 pt-4 px-4 border-b flex flex-row items-center justify-between">
          <CardTitle
            className="text-sm font-semibold flex items-center gap-2"
            style={{ color: "oklch(var(--gov-navy))" }}
          >
            <AlertTriangle
              className="w-4 h-4"
              style={{ color: "oklch(var(--gov-red))" }}
            />
            Critical Performance Alerts
            <span
              className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-sm"
              style={{
                background: "oklch(0.92 0.08 25)",
                color: "oklch(0.35 0.18 25)",
              }}
            >
              {CRITICAL_ALERTS.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {CRITICAL_ALERTS.map((alert) => (
              <div
                key={`${alert.provider}-${alert.indicator}`}
                className="flex items-start gap-3 p-3 border-l-4 rounded-sm"
                style={{
                  borderLeftColor:
                    alert.severity === "critical"
                      ? "oklch(var(--gov-red))"
                      : "oklch(var(--gov-amber))",
                  background:
                    alert.severity === "critical"
                      ? "oklch(0.98 0.012 25)"
                      : "oklch(0.98 0.008 80)",
                }}
              >
                <AlertTriangle
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{
                    color:
                      alert.severity === "critical"
                        ? "oklch(var(--gov-red))"
                        : "oklch(var(--gov-amber))",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className="font-bold text-xs"
                        style={{ color: "oklch(var(--foreground))" }}
                      >
                        {alert.provider}
                      </span>
                      <span
                        className="ml-2 text-xs"
                        style={{ color: "oklch(0.52 0.02 240)" }}
                      >
                        {alert.state}
                      </span>
                    </div>
                    <span
                      className={
                        alert.severity === "critical"
                          ? "badge-red"
                          : "badge-amber"
                      }
                    >
                      {alert.severity === "critical" ? "Critical" : "Warning"}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs">
                    <span style={{ color: "oklch(0.42 0.03 250)" }}>
                      <span className="font-semibold">{alert.indicator}:</span>{" "}
                      <span
                        className="font-mono-data font-bold"
                        style={{
                          color:
                            alert.severity === "critical"
                              ? "oklch(var(--gov-red))"
                              : "oklch(var(--gov-amber))",
                        }}
                      >
                        {alert.providerValue}
                      </span>{" "}
                      {alert.unit}{" "}
                      <span style={{ color: "oklch(0.52 0.02 240)" }}>
                        (benchmark:{" "}
                        <span className="font-mono-data">
                          {alert.benchmark}
                        </span>
                        )
                      </span>
                    </span>
                  </div>
                  <div
                    className="mt-1 text-xs italic"
                    style={{ color: "oklch(0.48 0.03 250)" }}
                  >
                    \u21b3 {alert.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Provider Lookup CTA */}
      {setActivePage && (
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-sm"
          style={{
            background: "oklch(0.96 0.012 254)",
            borderColor: "oklch(0.82 0.05 254)",
          }}
          data-ocid="national_overview.regional_lookup.card"
        >
          <div className="flex-1">
            <div
              className="font-bold text-sm"
              style={{ color: "oklch(var(--gov-navy))" }}
            >
              Regional Provider Lookup
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.48 0.025 250)" }}
            >
              Search providers by city and view detailed star-rated quality
              scorecards.
            </div>
          </div>
          <Button
            size="sm"
            className="rounded-sm flex-shrink-0 flex items-center gap-1.5 font-semibold"
            style={{ background: "oklch(var(--gov-navy))", color: "#fff" }}
            data-ocid="national_overview.regional_lookup.primary_button"
            onClick={() => setActivePage("regional_provider")}
          >
            Open Regional Lookup
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Recent Submissions */}
      <Card className="border rounded-none shadow-xs">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle
            className="text-sm font-semibold"
            style={{ color: "oklch(var(--gov-navy))" }}
          >
            Recent Data Submissions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Submission ID</th>
                <th>Provider</th>
                <th>Quarter</th>
                <th>Type</th>
                <th className="text-right">Records</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SUBMISSIONS.map((sub) => (
                <tr key={sub.id}>
                  <td className="font-mono-data text-xs">{sub.id}</td>
                  <td className="font-semibold">{sub.provider}</td>
                  <td>{sub.quarter}</td>
                  <td>{sub.type}</td>
                  <td className="text-right font-mono-data">
                    {sub.records.toLocaleString()}
                  </td>
                  <td>{sub.submitted}</td>
                  <td>{getSubmissionBadge(sub.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
