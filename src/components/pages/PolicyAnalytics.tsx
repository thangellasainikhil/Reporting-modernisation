import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generatePolicyInsights } from "@/utils/policyInsightEngine";
import type { PolicyInsight } from "@/utils/policyInsightEngine";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUp,
  BarChart2,
  Brain,
  ChevronRight,
  Globe2,
  Info,
  Minus,
  RefreshCw,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Inline Data ───────────────────────────────────────────────────────────────

const QUARTERLY_TRENDS = [
  {
    quarter: "Q1 2025",
    falls: 8.4,
    medication: 3.8,
    screening: 76,
    hospitalizations: 12.1,
  },
  {
    quarter: "Q2 2025",
    falls: 8.1,
    medication: 3.6,
    screening: 79,
    hospitalizations: 11.8,
  },
  {
    quarter: "Q3 2025",
    falls: 7.8,
    medication: 3.3,
    screening: 81,
    hospitalizations: 11.4,
  },
  {
    quarter: "Q4 2025",
    falls: 7.5,
    medication: 3.1,
    screening: 84,
    hospitalizations: 11.0,
  },
];

const REGIONAL_TABLE = [
  {
    state: "NSW",
    providers: 624,
    avgRating: 3.9,
    highRisk: 58,
    highRiskPct: 9.3,
    screeningPct: 86,
    fallsRate: 7.2,
  },
  {
    state: "VIC",
    providers: 581,
    avgRating: 4.1,
    highRisk: 44,
    highRiskPct: 7.6,
    screeningPct: 88,
    fallsRate: 6.8,
  },
  {
    state: "QLD",
    providers: 428,
    avgRating: 3.6,
    highRisk: 62,
    highRiskPct: 14.5,
    screeningPct: 81,
    fallsRate: 8.9,
  },
  {
    state: "SA",
    providers: 214,
    avgRating: 3.7,
    highRisk: 31,
    highRiskPct: 14.5,
    screeningPct: 79,
    fallsRate: 9.1,
  },
  {
    state: "WA",
    providers: 298,
    avgRating: 3.8,
    highRisk: 38,
    highRiskPct: 12.8,
    screeningPct: 83,
    fallsRate: 8.4,
  },
  {
    state: "TAS",
    providers: 98,
    avgRating: 4.2,
    highRisk: 7,
    highRiskPct: 7.1,
    screeningPct: 90,
    fallsRate: 6.4,
  },
  {
    state: "NT",
    providers: 64,
    avgRating: 3.2,
    highRisk: 28,
    highRiskPct: 43.8,
    screeningPct: 68,
    fallsRate: 13.2,
  },
  {
    state: "ACT",
    providers: 89,
    avgRating: 4.0,
    highRisk: 16,
    highRiskPct: 18.0,
    screeningPct: 85,
    fallsRate: 7.8,
  },
];

const POLICY_PROGRAMS = [
  {
    name: "Aged Care Quality Standards (2024 Reform)",
    beforeLabel: "Avg Rating",
    beforeVal: "3.4",
    afterLabel: "Avg Rating",
    afterVal: "3.8",
    metric2Before: "High Risk 18%",
    metric2After: "High Risk 10.4%",
    status: "Improving" as const,
    change: "+0.4 rating",
  },
  {
    name: "National Dementia Strategy",
    beforeLabel: "Cognitive Screening",
    beforeVal: "61%",
    afterLabel: "Cognitive Screening",
    afterVal: "71%",
    metric2Before: "Behavioural incidents 8.2%",
    metric2After: "Behavioural incidents 6.8%",
    status: "Improving" as const,
    change: "+10pp screening",
  },
  {
    name: "Workforce Retention Initiative",
    beforeLabel: "Staff Retention",
    beforeVal: "72%",
    afterLabel: "Staff Retention",
    afterVal: "79%",
    metric2Before: "RN hours 0.38/resident",
    metric2After: "RN hours 0.45/resident",
    status: "On Track" as const,
    change: "+7pp retention",
  },
  {
    name: "Regional Access Equity Fund",
    beforeLabel: "Remote Gap",
    beforeVal: "24%",
    afterLabel: "Remote Gap",
    afterVal: "18.2%",
    metric2Before: "Wait time 31 days",
    metric2After: "Wait time 24.8 days",
    status: "Partial Impact" as const,
    change: "-5.8pp gap",
  },
];

const RISK_DISTRIBUTION = [
  {
    name: "Low Risk (≥4★)",
    value: 1420,
    pct: 51.8,
    fill: "oklch(0.52 0.15 145)",
  },
  {
    name: "Medium Risk (3★)",
    value: 1039,
    pct: 37.9,
    fill: "oklch(0.70 0.14 72)",
  },
  {
    name: "High Risk (<3★)",
    value: 284,
    pct: 10.4,
    fill: "oklch(0.52 0.22 25)",
  },
];

const PFI_OUTCOMES = [
  {
    label: "Total Eligible",
    value: "1,842",
    sub: "of 2,743 providers",
    color: "oklch(var(--gov-navy))",
  },
  {
    label: "Total Funding",
    value: "$142M",
    sub: "current quarter",
    color: "oklch(var(--gov-gold-dark))",
  },
  {
    label: "Avg Improvement",
    value: "18.4%",
    sub: "across all metrics",
    color: "oklch(var(--gov-green))",
  },
  {
    label: "Bonus Eligible",
    value: "384",
    sub: "safety improvement ≥15%",
    color: "oklch(var(--gov-amber))",
  },
];

const EQUITY_DATA = [
  {
    label: "CALD Access Gap",
    value: 11.4,
    unit: "%",
    benchmark: 8.0,
    benchmarkUnit: "%",
    trend: "declining" as const,
    status: "Below Target",
    description: "Gap in CALD community access vs general population",
  },
  {
    label: "First Nations Equity Score",
    value: 62,
    unit: "/100",
    benchmark: 80,
    benchmarkUnit: "/100",
    trend: "improving" as const,
    status: "Improving",
    description: "Composite equity score for First Nations access",
  },
  {
    label: "Remote/Rural Gap",
    value: 18.2,
    unit: "%",
    benchmark: 12.0,
    benchmarkUnit: "%",
    trend: "stable" as const,
    status: "Stable",
    description: "Service availability gap in remote and rural areas",
  },
  {
    label: "Referral-to-Placement",
    value: 24.8,
    unit: " days",
    benchmark: 22,
    benchmarkUnit: " days",
    trend: "improving" as const,
    status: "Improving",
    description: "Average time from referral to placement nationally",
  },
  {
    label: "LGBTIQ+ Inclusive Services",
    value: 68,
    unit: "%",
    benchmark: 85,
    benchmarkUnit: "%",
    trend: "stable" as const,
    status: "Below Target",
    description: "Providers offering LGBTIQ+ inclusive care",
  },
  {
    label: "Culturally Safe Care Rating",
    value: 3.4,
    unit: "/5",
    benchmark: 4.0,
    benchmarkUnit: "/5",
    trend: "improving" as const,
    status: "Improving",
    description: "Average culturally safe care self-assessment rating",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function TrendIcon({ trend }: { trend: "improving" | "declining" | "stable" }) {
  if (trend === "improving")
    return <TrendingUp className="w-3.5 h-3.5 text-gov-green" />;
  if (trend === "declining")
    return <TrendingDown className="w-3.5 h-3.5 text-gov-red" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

function highRiskBadge(pct: number) {
  if (pct < 10) return <span className="badge-green">{pct}%</span>;
  if (pct <= 20) return <span className="badge-amber">{pct}%</span>;
  return <span className="badge-red">{pct}%</span>;
}

function statusBadge(status: "Improving" | "On Track" | "Partial Impact") {
  if (status === "Improving")
    return <span className="badge-green">{status}</span>;
  if (status === "On Track")
    return <span className="badge-blue">{status}</span>;
  return <span className="badge-amber">{status}</span>;
}

function equityStatusBadge(status: string, trend: string) {
  if (status === "Improving" || trend === "improving")
    return <span className="badge-green">{status}</span>;
  if (status === "Stable") return <span className="badge-navy">{status}</span>;
  return <span className="badge-red">{status}</span>;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KPICard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  ocid,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
  ocid: string;
}) {
  return (
    <div
      className="bg-card border p-4 flex flex-col gap-1"
      style={{ borderLeft: `4px solid ${accent}` }}
      data-ocid={ocid}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <span
          className="text-xs uppercase font-bold tracking-widest"
          style={{ color: "oklch(0.46 0.025 250)" }}
        >
          {label}
        </span>
      </div>
      <div className="text-2xl font-black tabular-nums text-gov-navy">
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="rounded-none border col-span-1 sm:col-span-2 lg:col-span-3">
          <CardHeader className="pb-2 pt-4 px-4 border-b">
            <CardTitle className="text-sm font-semibold text-gov-navy">
              Sector Snapshot — Q4 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                {
                  label: "Providers Meeting Quality Standards",
                  value: "89.6%",
                  note: "2,459 of 2,743",
                  good: true,
                },
                {
                  label: "National Avg Screening Completion",
                  value: "84%",
                  note: "Target: 85%",
                  good: false,
                },
                {
                  label: "Providers With Improvement Plans",
                  value: "68.4%",
                  note: "1,876 active plans",
                  good: true,
                },
                {
                  label: "Avg Days Since Last Audit",
                  value: "94 days",
                  note: "Benchmark: <120 days",
                  good: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="text-3xl font-black tabular-nums"
                    style={{
                      color: item.good
                        ? "oklch(var(--gov-green))"
                        : "oklch(var(--gov-amber))",
                    }}
                  >
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-gov-navy text-center">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Summary */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            Risk Distribution — National
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {RISK_DISTRIBUTION.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <div
                  className="w-36 text-xs font-medium text-right shrink-0"
                  style={{ color: r.fill }}
                >
                  {r.name}
                </div>
                <div className="flex-1">
                  <Progress
                    value={r.pct}
                    className="h-5 rounded-none"
                    style={{ background: "oklch(0.92 0.005 240)" }}
                  />
                </div>
                <div className="w-20 text-xs tabular-nums font-bold text-right">
                  {r.value.toLocaleString()} ({r.pct}%)
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top-level domain summary */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            Domain Performance Summary — National Average
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              {
                domain: "Safety",
                weight: "30%",
                score: 74,
                color: "oklch(0.52 0.22 25)",
              },
              {
                domain: "Preventive",
                weight: "20%",
                score: 81,
                color: "oklch(0.70 0.14 72)",
              },
              {
                domain: "Quality",
                weight: "20%",
                score: 79,
                color: "oklch(0.70 0.14 72)",
              },
              {
                domain: "Staffing",
                weight: "15%",
                score: 83,
                color: "oklch(0.52 0.15 145)",
              },
              {
                domain: "Compliance",
                weight: "10%",
                score: 88,
                color: "oklch(0.52 0.15 145)",
              },
              {
                domain: "Experience",
                weight: "5%",
                score: 77,
                color: "oklch(0.70 0.14 72)",
              },
            ].map((d) => (
              <div key={d.domain} className="p-3 border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-gov-navy">
                    {d.domain}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {d.weight}
                  </span>
                </div>
                <div
                  className="text-2xl font-black tabular-nums mb-1"
                  style={{ color: d.color }}
                >
                  {d.score}
                </div>
                <Progress value={d.score} className="h-2 rounded-none" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Trends Tab ────────────────────────────────────────────────────────────────

function TrendsTab() {
  return (
    <div className="space-y-5">
      {/* Falls & Hospitalizations */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            Falls Incidents &amp; Hospitalisations — Rate per 1,000 Residents
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            National average quarterly rates with benchmark reference lines
          </p>
        </CardHeader>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={QUARTERLY_TRENDS}
              margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.90 0.01 240)"
              />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                domain={[5, 15]}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "2px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <ReferenceLine
                y={6.5}
                stroke="oklch(0.52 0.22 25)"
                strokeDasharray="5 3"
                label={{
                  value: "Falls Bmark 6.5",
                  position: "right",
                  fontSize: 9,
                  fill: "oklch(0.52 0.22 25)",
                }}
              />
              <ReferenceLine
                y={9.5}
                stroke="oklch(0.40 0.16 250)"
                strokeDasharray="5 3"
                label={{
                  value: "Hosp Bmark 9.5",
                  position: "right",
                  fontSize: 9,
                  fill: "oklch(0.40 0.16 250)",
                }}
              />
              <Line
                type="monotone"
                dataKey="falls"
                name="Falls Rate"
                stroke="oklch(0.52 0.22 25)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="hospitalizations"
                name="Hospitalizations"
                stroke="oklch(0.40 0.16 250)"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Medication Harm & Screening */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            Medication Harm Rate &amp; Screening Completion — Quarterly
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Medication harm (rate) vs. screening completion (%) — dual axis
          </p>
        </CardHeader>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={QUARTERLY_TRENDS}
              margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.90 0.01 240)"
              />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                domain={[2, 5]}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Rate",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 10,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[70, 90]}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "%",
                  angle: 90,
                  position: "insideRight",
                  fontSize: 10,
                }}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "2px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <ReferenceLine
                yAxisId="left"
                y={3.0}
                stroke="oklch(0.52 0.22 25)"
                strokeDasharray="5 3"
                label={{
                  value: "Med Bmark 3.0",
                  position: "right",
                  fontSize: 9,
                  fill: "oklch(0.52 0.22 25)",
                }}
              />
              <ReferenceLine
                yAxisId="right"
                y={85}
                stroke="oklch(0.52 0.15 145)"
                strokeDasharray="5 3"
                label={{
                  value: "Scr Bmark 85%",
                  position: "left",
                  fontSize: 9,
                  fill: "oklch(0.52 0.15 145)",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="medication"
                name="Medication Harm"
                stroke="oklch(0.52 0.22 25)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="screening"
                name="Screening Completion %"
                stroke="oklch(0.52 0.15 145)"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* All indicators combined bar chart */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            All Indicators — Quarterly Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={QUARTERLY_TRENDS}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.90 0.01 240)"
              />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "2px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar
                dataKey="falls"
                name="Falls Rate"
                fill="oklch(0.52 0.22 25)"
                maxBarSize={18}
              />
              <Bar
                dataKey="medication"
                name="Medication Harm"
                fill="oklch(0.70 0.14 72)"
                maxBarSize={18}
              />
              <Bar
                dataKey="hospitalizations"
                name="Hospitalisations"
                fill="oklch(0.40 0.16 250)"
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Regional Tab ──────────────────────────────────────────────────────────────

function RegionalTab() {
  return (
    <div className="space-y-5">
      {/* Bar chart: avg rating by state */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            Average Provider Rating by State/Territory
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={REGIONAL_TABLE}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.90 0.01 240)"
              />
              <XAxis dataKey="state" tick={{ fontSize: 11 }} tickLine={false} />
              <YAxis
                domain={[2.5, 4.5]}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "2px" }}
              />
              <ReferenceLine
                y={3.8}
                stroke="oklch(0.28 0.09 254)"
                strokeDasharray="5 3"
                label={{
                  value: "National 3.8",
                  position: "right",
                  fontSize: 9,
                  fill: "oklch(0.28 0.09 254)",
                }}
              />
              <Bar
                dataKey="avgRating"
                name="Avg Rating"
                maxBarSize={28}
                radius={0}
              >
                {REGIONAL_TABLE.map((entry) => (
                  <Cell
                    key={entry.state}
                    fill={
                      entry.avgRating >= 4.0
                        ? "oklch(0.52 0.15 145)"
                        : entry.avgRating >= 3.5
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

      {/* Regional performance table */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            State &amp; Territory Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table
              className="w-full gov-table"
              data-ocid="policy.regional.table"
            >
              <thead>
                <tr>
                  <th className="text-left">State/Territory</th>
                  <th className="text-right">Providers</th>
                  <th className="text-right">Avg Rating</th>
                  <th className="text-center">High Risk</th>
                  <th className="text-right">Screening %</th>
                  <th className="text-right">Falls Rate</th>
                </tr>
              </thead>
              <tbody>
                {REGIONAL_TABLE.map((row, idx) => (
                  <tr
                    key={row.state}
                    data-ocid={`policy.regional.row.${idx + 1}`}
                  >
                    <td className="font-bold text-gov-navy">{row.state}</td>
                    <td className="text-right tabular-nums">
                      {row.providers.toLocaleString()}
                    </td>
                    <td className="text-right">
                      <span
                        className="font-semibold tabular-nums"
                        style={{
                          color:
                            row.avgRating >= 4.0
                              ? "oklch(var(--gov-green))"
                              : row.avgRating >= 3.5
                                ? "oklch(var(--gov-amber))"
                                : "oklch(var(--gov-red))",
                        }}
                      >
                        {row.avgRating.toFixed(1)}
                      </span>
                    </td>
                    <td className="text-center">
                      {highRiskBadge(row.highRiskPct)}
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({row.highRisk})
                      </span>
                    </td>
                    <td className="text-right tabular-nums">
                      <span
                        style={{
                          color:
                            row.screeningPct >= 85
                              ? "oklch(var(--gov-green))"
                              : row.screeningPct >= 75
                                ? "oklch(var(--gov-amber))"
                                : "oklch(var(--gov-red))",
                          fontWeight: 600,
                        }}
                      >
                        {row.screeningPct}%
                      </span>
                    </td>
                    <td className="text-right tabular-nums">
                      <span
                        style={{
                          color:
                            row.fallsRate <= 7.0
                              ? "oklch(var(--gov-green))"
                              : row.fallsRate <= 9.0
                                ? "oklch(var(--gov-amber))"
                                : "oklch(var(--gov-red))",
                          fontWeight: 600,
                        }}
                      >
                        {row.fallsRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Policy Impact Tab ─────────────────────────────────────────────────────────

function PolicyImpactTab() {
  return (
    <div className="space-y-5">
      <div
        className="px-3 py-2 text-xs border flex items-start gap-2"
        style={{
          background: "oklch(0.97 0.01 254)",
          borderColor: "oklch(0.82 0.05 254)",
          color: "oklch(0.40 0.04 254)",
        }}
      >
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>
          Program evaluations compare sector metrics before and after program
          implementation. Data sourced from Aged Care Quality and Safety
          Commission quarterly reports.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {POLICY_PROGRAMS.map((prog, idx) => (
          <div
            key={prog.name}
            className="border bg-card p-5"
            style={{ borderLeft: "4px solid oklch(var(--gov-navy))" }}
            data-ocid={`policy.impact.card.${idx + 1}`}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="font-bold text-sm text-gov-navy">{prog.name}</div>
              {statusBadge(prog.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div
                className="p-3 border"
                style={{
                  background: "oklch(0.97 0.025 25)",
                  borderColor: "oklch(0.80 0.10 25)",
                }}
              >
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide mb-1">
                  Before
                </div>
                <div className="text-lg font-black tabular-nums text-gov-red">
                  {prog.beforeVal}
                </div>
                <div className="text-xs text-muted-foreground">
                  {prog.beforeLabel}
                </div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {prog.metric2Before}
                </div>
              </div>
              <div
                className="p-3 border"
                style={{
                  background: "oklch(0.97 0.02 145)",
                  borderColor: "oklch(0.80 0.10 145)",
                }}
              >
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide mb-1">
                  After
                </div>
                <div className="text-lg font-black tabular-nums text-gov-green">
                  {prog.afterVal}
                </div>
                <div className="text-xs text-muted-foreground">
                  {prog.afterLabel}
                </div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {prog.metric2After}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUp className="w-3.5 h-3.5 text-gov-green" />
              <span className="text-xs font-bold text-gov-green">
                {prog.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Risk Distribution Tab ─────────────────────────────────────────────────────

function RiskDistributionTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="rounded-none border">
          <CardHeader className="pb-2 pt-4 px-4 border-b">
            <CardTitle className="text-sm font-semibold text-gov-navy">
              Risk Tier Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4" data-ocid="policy.risk.chart">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="value"
                  label={({ pct }: { pct: number }) => `${pct}%`}
                  labelLine={false}
                >
                  {RISK_DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "2px" }}
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    "Providers",
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-none border">
          <CardHeader className="pb-2 pt-4 px-4 border-b">
            <CardTitle className="text-sm font-semibold text-gov-navy">
              Provider Risk Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {RISK_DISTRIBUTION.map((r) => (
                <div key={r.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold" style={{ color: r.fill }}>
                      {r.name}
                    </span>
                    <span
                      className="tabular-nums font-bold"
                      style={{ color: r.fill }}
                    >
                      {r.value.toLocaleString()} ({r.pct}%)
                    </span>
                  </div>
                  <Progress value={r.pct} className="h-4 rounded-none" />
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t space-y-2">
              <div className="text-xs font-bold uppercase tracking-wide text-gov-navy">
                Risk Tier Definitions
              </div>
              {[
                {
                  tier: "Low Risk (≥4★)",
                  criteria:
                    "Overall rating ≥4 stars, all safety indicators within benchmark",
                  color: "oklch(0.52 0.15 145)",
                },
                {
                  tier: "Medium Risk (3★)",
                  criteria:
                    "Overall rating 3 stars, 1–2 indicators below benchmark",
                  color: "oklch(0.70 0.14 72)",
                },
                {
                  tier: "High Risk (<3★)",
                  criteria:
                    "Overall rating <3 stars, or critical safety indicator failure",
                  color: "oklch(0.52 0.22 25)",
                },
              ].map((t) => (
                <div key={t.tier} className="flex items-start gap-2">
                  <div
                    className="w-2 h-2 rounded-full mt-1 shrink-0"
                    style={{ background: t.color }}
                  />
                  <div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: t.color }}
                    >
                      {t.tier}:
                    </span>{" "}
                    <span className="text-xs text-muted-foreground">
                      {t.criteria}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State-level risk breakdown bar chart */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            High-Risk Provider % by State/Territory
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={REGIONAL_TABLE}
              margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.90 0.01 240)"
              />
              <XAxis dataKey="state" tick={{ fontSize: 11 }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "2px" }}
                formatter={(v: number) => [`${v}%`, "High Risk %"]}
              />
              <ReferenceLine
                y={10}
                stroke="oklch(0.70 0.14 72)"
                strokeDasharray="5 3"
                label={{
                  value: "10% threshold",
                  position: "right",
                  fontSize: 9,
                  fill: "oklch(0.70 0.14 72)",
                }}
              />
              <Bar
                dataKey="highRiskPct"
                name="High Risk %"
                maxBarSize={28}
                radius={0}
              >
                {REGIONAL_TABLE.map((entry) => (
                  <Cell
                    key={entry.state}
                    fill={
                      entry.highRiskPct < 10
                        ? "oklch(0.52 0.15 145)"
                        : entry.highRiskPct <= 20
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
    </div>
  );
}

// ── Programs Tab ──────────────────────────────────────────────────────────────

function ProgramsTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PFI_OUTCOMES.map((outcome, idx) => (
          <div
            key={outcome.label}
            className="p-4 border bg-card"
            style={{ borderLeft: `4px solid ${outcome.color}` }}
            data-ocid={`policy.pfi.card.${idx + 1}`}
          >
            <div
              className="text-xs uppercase font-bold tracking-widest mb-1"
              style={{ color: "oklch(0.46 0.025 250)" }}
            >
              {outcome.label}
            </div>
            <div
              className="text-2xl font-black tabular-nums"
              style={{ color: outcome.color }}
            >
              {outcome.value}
            </div>
            <div className="text-xs mt-0.5 text-muted-foreground">
              {outcome.sub}
            </div>
          </div>
        ))}
      </div>

      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            Pay-for-Improvement Tier Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-4 border"
              style={{
                background: "oklch(0.97 0.02 145)",
                borderColor: "oklch(0.80 0.10 145)",
              }}
            >
              <div className="text-xs uppercase font-bold tracking-wide text-gov-green mb-2">
                Tier 1 — Base Incentive
              </div>
              <div className="text-3xl font-black tabular-nums text-gov-green">
                1,458
              </div>
              <div className="text-sm text-gov-navy font-semibold mt-1">
                providers eligible
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Overall rating ≥4★
              </div>
              <div className="mt-3 pt-3 border-t border-current">
                <span className="text-xs text-muted-foreground">
                  Incentive payment:{" "}
                </span>
                <span className="font-bold text-gov-green">
                  $75,000/provider
                </span>
              </div>
            </div>
            <div
              className="p-4 border"
              style={{
                background: "oklch(0.96 0.04 80)",
                borderColor: "oklch(0.80 0.12 75)",
              }}
            >
              <div className="text-xs uppercase font-bold tracking-wide text-gov-amber mb-2">
                Tier 2 — Bonus Incentive
              </div>
              <div className="text-3xl font-black tabular-nums text-gov-amber">
                384
              </div>
              <div className="text-sm text-gov-navy font-semibold mt-1">
                providers eligible
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Safety improvement ≥15%
              </div>
              <div className="mt-3 pt-3 border-t border-current">
                <span className="text-xs text-muted-foreground">
                  Incentive payment:{" "}
                </span>
                <span className="font-bold text-gov-amber">
                  $120,000/provider
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-4 p-4 border"
            style={{
              background: "oklch(0.97 0.01 254)",
              borderColor: "oklch(0.82 0.05 254)",
            }}
          >
            <div className="text-xs font-bold text-gov-navy mb-2">
              Eligibility Logic Chain
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                {
                  label: "Indicator Performance",
                  isArrow: false,
                  id: "step-perf",
                },
                { label: "→", isArrow: true, id: "arrow-1" },
                {
                  label: "Indicator Rating",
                  isArrow: false,
                  id: "step-rating",
                },
                { label: "→", isArrow: true, id: "arrow-2" },
                {
                  label: "Provider Scorecard",
                  isArrow: false,
                  id: "step-scorecard",
                },
                { label: "→", isArrow: true, id: "arrow-3" },
                { label: "Overall Rating", isArrow: false, id: "step-overall" },
                { label: "→", isArrow: true, id: "arrow-4" },
                { label: "PFI Eligibility", isArrow: false, id: "step-pfi" },
              ].map((step) =>
                step.isArrow ? (
                  <span
                    key={step.id}
                    className="text-muted-foreground font-bold"
                  >
                    {step.label}
                  </span>
                ) : (
                  <span
                    key={step.id}
                    className="px-2 py-1 border text-xs font-semibold text-gov-navy border-gov-navy"
                  >
                    {step.label}
                  </span>
                ),
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PFI by state */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            PFI Eligible Providers by State — Estimated
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full gov-table">
              <thead>
                <tr>
                  <th className="text-left">State</th>
                  <th className="text-right">Total Providers</th>
                  <th className="text-right">Tier 1 Eligible</th>
                  <th className="text-right">Tier 2 Bonus</th>
                  <th className="text-right">Est. Funding</th>
                </tr>
              </thead>
              <tbody>
                {REGIONAL_TABLE.map((row, idx) => {
                  const tier1 = Math.round(row.providers * 0.532);
                  const tier2 = Math.round(row.providers * 0.14);
                  const funding = (tier1 * 75000 + tier2 * 120000) / 1000000;
                  return (
                    <tr key={row.state} data-ocid={`policy.pfi.row.${idx + 1}`}>
                      <td className="font-bold text-gov-navy">{row.state}</td>
                      <td className="text-right tabular-nums">
                        {row.providers.toLocaleString()}
                      </td>
                      <td className="text-right tabular-nums text-gov-green font-semibold">
                        {tier1}
                      </td>
                      <td className="text-right tabular-nums text-gov-amber font-semibold">
                        {tier2}
                      </td>
                      <td className="text-right tabular-nums font-bold text-gov-navy">
                        ${funding.toFixed(1)}M
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Equity Tab ────────────────────────────────────────────────────────────────

function EquityTab() {
  return (
    <div className="space-y-5">
      <div
        className="px-3 py-2 text-xs border flex items-start gap-2"
        style={{
          background: "oklch(0.97 0.01 254)",
          borderColor: "oklch(0.82 0.05 254)",
          color: "oklch(0.40 0.04 254)",
        }}
      >
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>
          Equity insights highlight service access disparities across population
          groups and geographic regions. These metrics inform the Regional
          Access Equity Fund allocation.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EQUITY_DATA.map((eq, idx) => {
          const isHigherBetter =
            eq.unit === "/100" ||
            (eq.unit === "%" && eq.label.includes("Score")) ||
            eq.label.includes("Inclusive") ||
            eq.label.includes("Equity") ||
            eq.label.includes("Culturally");
          const progressVal = isHigherBetter
            ? (eq.value / eq.benchmark) * 100
            : (eq.benchmark / eq.value) * 100;
          const clampedProg = Math.min(100, Math.max(0, progressVal));

          return (
            <div
              key={eq.label}
              className="p-4 border bg-card"
              style={{ borderLeft: "4px solid oklch(var(--gov-navy))" }}
              data-ocid={`policy.equity.card.${idx + 1}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div
                  className="text-xs uppercase font-bold tracking-widest"
                  style={{ color: "oklch(0.46 0.025 250)" }}
                >
                  {eq.label}
                </div>
                {equityStatusBadge(eq.status, eq.trend)}
              </div>

              <div className="text-2xl font-black tabular-nums text-gov-navy mb-1">
                {eq.value}
                {eq.unit}
              </div>

              <div className="flex items-center gap-1.5 text-xs mb-2">
                <TrendIcon trend={eq.trend} />
                <span className="text-muted-foreground capitalize">
                  {eq.trend}
                </span>
                <span className="text-muted-foreground ml-auto">
                  Benchmark: {eq.benchmark}
                  {eq.benchmarkUnit}
                </span>
              </div>

              <Progress value={clampedProg} className="h-2 rounded-none mb-2" />

              <div className="text-xs text-muted-foreground">
                {eq.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Equity bar chart */}
      <Card className="rounded-none border">
        <CardHeader className="pb-2 pt-4 px-4 border-b">
          <CardTitle className="text-sm font-semibold text-gov-navy">
            Equity Gap vs Benchmark — Visual Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={[
                { name: "CALD Gap", actual: 11.4, benchmark: 8.0 },
                { name: "FN Score", actual: 62, benchmark: 80 },
                { name: "Remote Gap", actual: 18.2, benchmark: 12.0 },
                { name: "Wait Days", actual: 24.8, benchmark: 22 },
                { name: "LGBTIQ+", actual: 68, benchmark: 85 },
                { name: "Cultural", actual: 3.4, benchmark: 4.0 },
              ]}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.90 0.01 240)"
              />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "2px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar
                dataKey="actual"
                name="Current Value"
                fill="oklch(0.52 0.22 25)"
                maxBarSize={22}
              />
              <Bar
                dataKey="benchmark"
                name="Benchmark/Target"
                fill="oklch(0.52 0.15 145)"
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

// ── Intelligence Tab ──────────────────────────────────────────────────────────

const QUARTERS = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"] as const;

const CATEGORY_META: Record<
  PolicyInsight["category"],
  { label: string; color: string; bg: string }
> = {
  trend: { label: "Trend", color: "#1e3a5f", bg: "#dbeafe" },
  regional: { label: "Regional", color: "#0f5f5a", bg: "#ccfbf1" },
  benchmark: { label: "Benchmark", color: "#4c1d95", bg: "#ede9fe" },
  risk: { label: "Risk", color: "#7f1d1d", bg: "#fee2e2" },
  screening: { label: "Screening", color: "#064e3b", bg: "#d1fae5" },
};

function SeverityIcon({ severity }: { severity: PolicyInsight["severity"] }) {
  if (severity === "critical")
    return <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />;
  if (severity === "warning")
    return <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />;
  return <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />;
}

function InsightCard({
  insight,
  index,
}: { insight: PolicyInsight; index: number }) {
  const borderColor =
    insight.severity === "critical"
      ? "#dc2626"
      : insight.severity === "warning"
        ? "#d97706"
        : "#2563eb";
  const cat = CATEGORY_META[insight.category];
  const ocid = `intelligence.insight.item.${index + 1}` as const;

  return (
    <div
      className="bg-white border border-slate-200 flex flex-col gap-3 p-4 rounded-none"
      style={{ borderLeft: `4px solid ${borderColor}` }}
      data-ocid={ocid}
    >
      {/* Header row */}
      <div className="flex items-start gap-2">
        <SeverityIcon severity={insight.severity} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-sm"
              style={{ color: cat.color, background: cat.bg }}
            >
              {cat.label}
            </span>
            {insight.severity === "critical" && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-red-100 text-red-700">
                Critical
              </span>
            )}
            {insight.severity === "warning" && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-amber-100 text-amber-700">
                Warning
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-slate-800 leading-snug">
            {insight.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 leading-relaxed">
        {insight.description}
      </p>

      {/* Evidence chip */}
      <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-sm">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2">
          Evidence
        </span>
        <span className="text-xs text-slate-700 font-mono">
          {insight.evidence}
        </span>
      </div>

      {/* Recommendation */}
      <div className="flex items-start gap-2">
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 italic leading-relaxed">
          {insight.recommendation}
        </p>
      </div>
    </div>
  );
}

function IntelligenceTab() {
  const [selectedQuarter, setSelectedQuarter] = useState<string>("Q4 2025");
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(() =>
    new Date().toISOString(),
  );

  const insights = useMemo(() => {
    void refreshKey;
    return generatePolicyInsights(selectedQuarter);
  }, [selectedQuarter, refreshKey]);

  const criticalCount = insights.filter(
    (i) => i.severity === "critical",
  ).length;
  const warningCount = insights.filter((i) => i.severity === "warning").length;
  const infoCount = insights.filter((i) => i.severity === "info").length;

  function handleRefresh() {
    setRefreshKey((k) => k + 1);
    setLastUpdated(new Date().toISOString());
  }

  function formatTs(iso: string) {
    try {
      return new Date(iso).toLocaleString("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  }

  return (
    <div className="space-y-5">
      {/* Panel Header */}
      <div className="border bg-slate-50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Brain
              className="w-5 h-5 flex-shrink-0"
              style={{ color: "oklch(var(--gov-navy))" }}
            />
            <div>
              <h2 className="text-base font-bold text-gov-navy">
                Policy Intelligence Engine
              </h2>
              <p className="text-xs text-muted-foreground">
                AI-assisted pattern analysis across sector data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={selectedQuarter}
              onValueChange={(v) => {
                setSelectedQuarter(v);
                setLastUpdated(new Date().toISOString());
              }}
            >
              <SelectTrigger
                className="w-36 h-8 text-xs rounded-none"
                data-ocid="intelligence.quarter_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUARTERS.map((q) => (
                  <SelectItem key={q} value={q} className="text-xs">
                    {q}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs rounded-none gap-1.5"
              onClick={handleRefresh}
              data-ocid="intelligence.refresh_button"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Analysis
            </Button>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Last updated: {formatTs(lastUpdated)}
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-red-100 text-red-700 border border-red-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          {criticalCount} Critical
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
          <AlertCircle className="w-3.5 h-3.5" />
          {warningCount} Warnings
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
          <Info className="w-3.5 h-3.5" />
          {infoCount} Informational
        </span>
        <span className="ml-auto text-xs text-muted-foreground self-center">
          Analysing data for: <strong>{selectedQuarter}</strong>
        </span>
      </div>

      {/* Insights grid */}
      {insights.length === 0 ? (
        <div
          className="border p-8 text-center text-muted-foreground text-sm"
          data-ocid="intelligence.empty_state"
        >
          No insights generated for this quarter.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insights.map((insight, idx) => (
            <InsightCard key={insight.id} insight={insight} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PolicyAnalytics() {
  return (
    <div className="p-6 space-y-5" data-ocid="policy_analytics.page">
      {/* Page Header */}
      <div className="border-b pb-4">
        <div className="flex items-start gap-3">
          <Globe2
            className="w-6 h-6 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(var(--gov-navy))" }}
          />
          <div>
            <h1 className="text-xl font-bold text-gov-navy">
              National Aged Care Intelligence Center
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Policy Analyst View — Aggregated sector-level analytics.
              Individual provider and resident data not shown.
            </p>
          </div>
        </div>
        <div
          className="mt-3 px-3 py-2 text-xs border flex items-center gap-2"
          style={{
            background: "oklch(0.97 0.01 254)",
            borderColor: "oklch(0.82 0.05 254)",
            color: "oklch(0.40 0.04 254)",
          }}
        >
          <BarChart2 className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Policy Analyst View.</strong> This dashboard displays
            aggregated sector-level metrics only. Individual resident records,
            provider operational details, and regulatory case data are not
            accessible.
          </span>
        </div>
      </div>

      {/* KPI Cards — always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard
          label="Total Providers"
          value="2,743"
          sub="nationally registered"
          icon={Users}
          accent="oklch(var(--gov-navy))"
          ocid="policy.kpi.card.1"
        />
        <KPICard
          label="National Avg Rating"
          value="3.8 / 5"
          sub="system status: Watch"
          icon={Star}
          accent="oklch(var(--gov-amber))"
          ocid="policy.kpi.card.2"
        />
        <KPICard
          label="High-Risk Providers"
          value="284"
          sub="10.4% of total"
          icon={AlertTriangle}
          accent="oklch(var(--gov-red))"
          ocid="policy.kpi.card.3"
        />
        <KPICard
          label="Improving Providers"
          value="621"
          sub="22.6% showing improvement"
          icon={Activity}
          accent="oklch(var(--gov-green))"
          ocid="policy.kpi.card.4"
        />
      </div>

      {/* Tabbed Navigation */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0 gap-0 overflow-x-auto">
          {(
            [
              {
                value: "overview",
                label: "Overview",
                ocid: "policy.tab.overview",
              },
              { value: "trends", label: "Trends", ocid: "policy.tab.trends" },
              {
                value: "regional",
                label: "Regional",
                ocid: "policy.tab.regional",
              },
              {
                value: "impact",
                label: "Policy Impact",
                ocid: "policy.tab.impact",
              },
              {
                value: "risk",
                label: "Risk Distribution",
                ocid: "policy.tab.risk",
              },
              {
                value: "programs",
                label: "Programs",
                ocid: "policy.tab.programs",
              },
              { value: "equity", label: "Equity", ocid: "policy.tab.equity" },
              {
                value: "intelligence",
                label: "Intelligence",
                ocid: "intelligence.tab",
              },
            ] as const
          ).map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-ocid={tab.ocid}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gov-navy data-[state=active]:bg-transparent data-[state=active]:text-gov-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
          <TabsContent value="overview" className="mt-0">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="trends" className="mt-0">
            <TrendsTab />
          </TabsContent>
          <TabsContent value="regional" className="mt-0">
            <RegionalTab />
          </TabsContent>
          <TabsContent value="impact" className="mt-0">
            <PolicyImpactTab />
          </TabsContent>
          <TabsContent value="risk" className="mt-0">
            <RiskDistributionTab />
          </TabsContent>
          <TabsContent value="programs" className="mt-0">
            <ProgramsTab />
          </TabsContent>
          <TabsContent value="equity" className="mt-0">
            <EquityTab />
          </TabsContent>
          <TabsContent value="intelligence" className="mt-0">
            <IntelligenceTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
