import { BenchmarkStatusChip } from "@/components/ui/BenchmarkStatusChip";
import { IncentiveEligibilityBadge } from "@/components/ui/IncentiveEligibilityBadge";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertTriangle,
  Award,
  BarChart2,
  Bell,
  BellOff,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  DollarSign,
  Edit2,
  Loader2,
  Plus,
  ShieldCheck,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
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
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { getBenchmarkStatus } from "../../utils/benchmarkUtils";
import {
  calcIndicatorPerformanceScore,
  calcPayForImprovementEligibility,
  calcWeightedProviderRating,
  scoreToFractionalStars,
} from "../../utils/ratingEngine";

// ── Provider registry ──────────────────────────────────────────────────────────
const PROVIDERS = [
  {
    id: "SYD-001",
    name: "Bondi Aged Care",
    city: "Sydney",
    state: "NSW",
    type: "Residential",
    beds: 120,
  },
  {
    id: "MEL-001",
    name: "Southbank Care Centre",
    city: "Melbourne",
    state: "VIC",
    type: "Residential",
    beds: 98,
  },
  {
    id: "BNE-001",
    name: "Riverview Aged Care",
    city: "Brisbane",
    state: "QLD",
    type: "Residential",
    beds: 85,
  },
  {
    id: "PER-001",
    name: "Swan Valley Care",
    city: "Perth",
    state: "WA",
    type: "Residential",
    beds: 110,
  },
  {
    id: "ADL-001",
    name: "Torrens Aged Care",
    city: "Adelaide",
    state: "SA",
    type: "Residential",
    beds: 76,
  },
];

// ── Indicator definitions ──────────────────────────────────────────────────────
interface IndicatorDef {
  code: string;
  name: string;
  benchmark: number;
  isLowerBetter: boolean;
  unit: string;
  domain:
    | "safety"
    | "preventive"
    | "quality"
    | "staffing"
    | "compliance"
    | "experience";
}

const INDICATOR_DEFS: IndicatorDef[] = [
  {
    code: "SAF-001",
    name: "Falls with Harm Rate",
    benchmark: 5.1,
    isLowerBetter: true,
    unit: "/1000 care days",
    domain: "safety",
  },
  {
    code: "SAF-002",
    name: "Medication-Related Harm",
    benchmark: 3.2,
    isLowerBetter: true,
    unit: "%",
    domain: "safety",
  },
  {
    code: "PRV-001",
    name: "Screening Completion",
    benchmark: 85,
    isLowerBetter: false,
    unit: "%",
    domain: "preventive",
  },
  {
    code: "STF-001",
    name: "Staff Retention",
    benchmark: 82,
    isLowerBetter: false,
    unit: "%",
    domain: "staffing",
  },
  {
    code: "SAF-003",
    name: "Pressure Injuries Stage 2-4",
    benchmark: 2.4,
    isLowerBetter: true,
    unit: "/1000 care days",
    domain: "safety",
  },
  {
    code: "EXP-001",
    name: "Resident Satisfaction",
    benchmark: 78,
    isLowerBetter: false,
    unit: "%",
    domain: "experience",
  },
];

// Default indicator values per provider
const DEFAULT_VALUES: Record<string, number[]> = {
  "SYD-001": [4.2, 2.8, 87, 84, 1.8, 82],
  "MEL-001": [6.1, 3.8, 78, 76, 3.1, 71],
  "BNE-001": [3.9, 2.4, 91, 88, 1.4, 86],
  "PER-001": [5.6, 3.5, 82, 79, 2.8, 74],
  "ADL-001": [7.2, 4.1, 72, 71, 3.6, 68],
};

// Previous quarter values for pay-for-improvement
const PREV_VALUES: Record<string, number[]> = {
  "SYD-001": [5.1, 3.2, 82, 80, 2.3, 78],
  "MEL-001": [6.8, 4.2, 73, 72, 3.6, 67],
  "BNE-001": [4.4, 2.8, 87, 85, 1.8, 82],
  "PER-001": [6.2, 3.9, 78, 75, 3.2, 70],
  "ADL-001": [7.8, 4.5, 68, 67, 4.0, 64],
};

// Trend data for performance trends chart
const TREND_DATA = [
  { quarter: "Q1", falls: 6.8, medication: 3.9, screening: 78, staffing: 76 },
  { quarter: "Q2", falls: 6.1, medication: 3.5, screening: 81, staffing: 79 },
  { quarter: "Q3", falls: 5.4, medication: 3.1, screening: 84, staffing: 82 },
  { quarter: "Q4", falls: 4.2, medication: 2.8, screening: 87, staffing: 84 },
];

// Compliance standards
const COMPLIANCE_STANDARDS = [
  {
    id: 1,
    name: "Quality Standard 1 — Consumer Dignity and Choice",
    category: "Aged Care Quality Standards",
    status: "Compliant",
    lastAssessed: "15 Jan 2025",
    nextReview: "15 Jul 2025",
    notes: "Full compliance achieved",
  },
  {
    id: 2,
    name: "Quality Standard 2 — Ongoing Assessment and Planning",
    category: "Aged Care Quality Standards",
    status: "Compliant",
    lastAssessed: "15 Jan 2025",
    nextReview: "15 Jul 2025",
    notes: "Documentation up to date",
  },
  {
    id: 3,
    name: "Quality Standard 3 — Personal Care and Clinical Care",
    category: "Aged Care Quality Standards",
    status: "Pending Review",
    lastAssessed: "10 Oct 2024",
    nextReview: "10 Apr 2025",
    notes: "Awaiting clinical audit",
  },
  {
    id: 4,
    name: "Quality Standard 4 — Services and Supports for Daily Living",
    category: "Aged Care Quality Standards",
    status: "Compliant",
    lastAssessed: "15 Jan 2025",
    nextReview: "15 Jul 2025",
    notes: "Full compliance",
  },
  {
    id: 5,
    name: "Quality Standard 5 — Organisation's Service Environment",
    category: "Aged Care Quality Standards",
    status: "Compliant",
    lastAssessed: "15 Jan 2025",
    nextReview: "15 Jul 2025",
    notes: "Facility inspection passed",
  },
  {
    id: 6,
    name: "Quality Standard 6 — Feedback and Complaints",
    category: "Aged Care Quality Standards",
    status: "Non-Compliant",
    lastAssessed: "05 Dec 2024",
    nextReview: "05 Mar 2025",
    notes: "Complaint resolution delays noted",
  },
  {
    id: 7,
    name: "Quality Standard 7 — Human Resources",
    category: "Aged Care Quality Standards",
    status: "Pending Review",
    lastAssessed: "08 Nov 2024",
    nextReview: "08 May 2025",
    notes: "Workforce compliance review in progress",
  },
  {
    id: 8,
    name: "Quality Standard 8 — Organisational Governance",
    category: "Aged Care Quality Standards",
    status: "Compliant",
    lastAssessed: "15 Jan 2025",
    nextReview: "15 Jul 2025",
    notes: "Governance framework current",
  },
  {
    id: 9,
    name: "Aged Care Act Accreditation",
    category: "Accreditation",
    status: "Compliant",
    lastAssessed: "01 Feb 2025",
    nextReview: "01 Feb 2026",
    notes: "3-year accreditation granted",
  },
  {
    id: 10,
    name: "Mandatory Reporting Obligations",
    category: "Mandatory Reporting",
    status: "Compliant",
    lastAssessed: "01 Mar 2025",
    nextReview: "01 Jun 2025",
    notes: "All incidents reported on time",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function calcImprovementPct(
  current: number,
  previous: number,
  isLowerBetter: boolean,
): number {
  if (previous === 0) return 0;
  const raw = isLowerBetter
    ? ((previous - current) / previous) * 100
    : ((current - previous) / previous) * 100;
  return Math.max(-100, Math.min(100, raw));
}

function getRiskLevel(score: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (score >= 80)
    return {
      label: "Low",
      color: "oklch(0.28 0.14 145)",
      bg: "oklch(0.93 0.07 145)",
    };
  if (score >= 65)
    return {
      label: "Medium",
      color: "oklch(0.43 0.14 72)",
      bg: "oklch(0.96 0.05 80)",
    };
  if (score >= 50)
    return {
      label: "High",
      color: "oklch(0.48 0.18 50)",
      bg: "oklch(0.95 0.06 50)",
    };
  return {
    label: "Critical",
    color: "oklch(0.42 0.20 25)",
    bg: "oklch(0.95 0.06 25)",
  };
}

function getPriorityStyle(p: string) {
  if (p === "High")
    return { color: "oklch(0.42 0.20 25)", bg: "oklch(0.95 0.06 25)" };
  if (p === "Medium")
    return { color: "oklch(0.43 0.14 72)", bg: "oklch(0.96 0.05 80)" };
  return { color: "oklch(0.40 0.12 145)", bg: "oklch(0.93 0.07 145)" };
}

function getStatusStyle(s: string) {
  if (s === "Compliant")
    return { color: "oklch(0.28 0.14 145)", bg: "oklch(0.93 0.07 145)" };
  if (s === "Pending Review")
    return { color: "oklch(0.43 0.14 72)", bg: "oklch(0.96 0.05 80)" };
  return { color: "oklch(0.42 0.20 25)", bg: "oklch(0.95 0.06 25)" };
}

interface ImprovementTask {
  id: number;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  priority: string;
  progress: number;
  status: string;
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ProviderDashboard() {
  const [selectedProviderId, setSelectedProviderId] = useState("SYD-001");
  const [selectedQuarter, setSelectedQuarter] = useState("Q4-2024-25");
  const [activeTab, setActiveTab] = useState("overview");

  const provider =
    PROVIDERS.find((p) => p.id === selectedProviderId) ?? PROVIDERS[0];
  const defaultVals =
    DEFAULT_VALUES[selectedProviderId] ?? DEFAULT_VALUES["SYD-001"];
  const prevVals = PREV_VALUES[selectedProviderId] ?? PREV_VALUES["SYD-001"];

  // Indicator Management state
  const [indicatorValues, setIndicatorValues] = useState<number[]>(defaultVals);

  // Reset values when provider changes
  const resetForProvider = (pid: string) => {
    setSelectedProviderId(pid);
    setIndicatorValues(DEFAULT_VALUES[pid] ?? DEFAULT_VALUES["SYD-001"]);
    setAcknowledged(new Set());
  };

  // Compute scores
  const indicatorScores = useMemo(
    () =>
      INDICATOR_DEFS.map((def, i) =>
        calcIndicatorPerformanceScore(
          indicatorValues[i],
          def.benchmark,
          def.isLowerBetter,
        ),
      ),
    [indicatorValues],
  );

  const domainScores = useMemo(() => {
    const scores: Record<string, number[]> = {};
    INDICATOR_DEFS.forEach((def, i) => {
      if (!scores[def.domain]) scores[def.domain] = [];
      scores[def.domain].push(indicatorScores[i]);
    });
    const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
    return {
      safety: avg(scores.safety ?? [75]),
      preventive: avg(scores.preventive ?? [75]),
      quality: avg(scores.quality ?? [75]),
      staffing: avg(scores.staffing ?? [75]),
      compliance: avg(scores.compliance ?? [75]),
      experience: avg(scores.experience ?? [75]),
    };
  }, [indicatorScores]);

  const { score: overallScore } = calcWeightedProviderRating(domainScores);
  const overallStars = scoreToFractionalStars(overallScore);
  const riskInfo = getRiskLevel(overallScore);

  const screeningIdx = INDICATOR_DEFS.findIndex((d) => d.code === "PRV-001");
  const screeningCompletion = indicatorValues[screeningIdx] ?? 87;

  const hasBelowBenchmark = INDICATOR_DEFS.some(
    (def, i) =>
      getBenchmarkStatus(
        indicatorValues[i],
        def.benchmark,
        def.isLowerBetter,
      ) === "below",
  );
  const isIncentiveEligible = overallScore >= 70 && !hasBelowBenchmark;

  // Risk Alerts state
  const [acknowledged, setAcknowledged] = useState<Set<number>>(new Set());
  const [correctiveNotes, setCorrectiveNotes] = useState<
    Record<number, string>
  >({});
  const [expandedAction, setExpandedAction] = useState<number | null>(null);

  const alerts = useMemo(
    () =>
      INDICATOR_DEFS.map((def, i) => ({
        index: i,
        def,
        value: indicatorValues[i],
        status: getBenchmarkStatus(
          indicatorValues[i],
          def.benchmark,
          def.isLowerBetter,
        ),
      })).filter((a) => a.status === "below"),
    [indicatorValues],
  );

  // Improvement Tasks
  const [tasks, setTasks] = useState<ImprovementTask[]>([
    {
      id: 1,
      title: "Falls Prevention Protocol Update",
      description:
        "Review and update falls prevention protocols for high-risk residents.",
      owner: "Clinical Coordinator",
      dueDate: "2025-04-30",
      priority: "High",
      progress: 45,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Medication Review Backlog Clearance",
      description: "Complete outstanding medication reviews for all residents.",
      owner: "Pharmacist",
      dueDate: "2025-03-31",
      priority: "Medium",
      progress: 70,
      status: "In Progress",
    },
  ]);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<ImprovementTask | null>(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    owner: "",
    dueDate: "",
    priority: "Medium",
    progress: 0,
  });

  // Data Submission
  const [submissionForm, setSubmissionForm] = useState({
    falls: "",
    medication: "",
    screening: "",
    staffRetention: "",
    pressureInjury: "",
    satisfaction: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentSubmissions] = useState([
    { date: "01 Mar 2025", quarter: "Q3-2024-25", status: "Processed" },
    { date: "01 Dec 2024", quarter: "Q2-2024-25", status: "Processed" },
    { date: "01 Sep 2024", quarter: "Q1-2024-25", status: "Processed" },
  ]);

  // Pay-for-improvement
  const improvementPcts = INDICATOR_DEFS.map((def, i) =>
    calcImprovementPct(indicatorValues[i], prevVals[i], def.isLowerBetter),
  );
  const avgImprovement =
    improvementPcts.reduce((s, v) => s + v, 0) / improvementPcts.length;
  const pfiEligibility = calcPayForImprovementEligibility(
    overallStars,
    avgImprovement,
  );
  const estimatedPayment = isIncentiveEligible
    ? Math.min(
        180000,
        Math.max(
          0,
          Math.round(45000 * (Math.max(0, avgImprovement) / 100) * 10) / 10 +
            45000,
        ),
      )
    : 0;

  // Radar data
  const radarData = [
    {
      domain: "Safety",
      provider: Math.round(domainScores.safety),
      benchmark: 75,
    },
    {
      domain: "Preventive",
      provider: Math.round(domainScores.preventive),
      benchmark: 75,
    },
    {
      domain: "Quality",
      provider: Math.round(domainScores.quality),
      benchmark: 75,
    },
    {
      domain: "Staffing",
      provider: Math.round(domainScores.staffing),
      benchmark: 75,
    },
    {
      domain: "Compliance",
      provider: Math.round(domainScores.compliance),
      benchmark: 75,
    },
    {
      domain: "Experience",
      provider: Math.round(domainScores.experience),
      benchmark: 75,
    },
  ];

  // Benchmark comparison bar data
  const benchmarkBarData = INDICATOR_DEFS.map((def, i) => ({
    name: def.name.length > 20 ? `${def.name.slice(0, 18)}...` : def.name,
    fullName: def.name,
    provider: indicatorValues[i],
    regional: def.benchmark * (def.isLowerBetter ? 1.05 : 0.97),
    national: def.benchmark,
  }));

  function handleSaveIndicators() {
    toast.success("Indicator values saved successfully.", {
      description: "Performance scores recalculated in real time.",
    });
  }

  function handleAddTask() {
    setEditingTask(null);
    setTaskForm({
      title: "",
      description: "",
      owner: "",
      dueDate: "",
      priority: "Medium",
      progress: 0,
    });
    setShowActionDialog(true);
  }

  function handleEditTask(task: ImprovementTask) {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      owner: task.owner,
      dueDate: task.dueDate,
      priority: task.priority,
      progress: task.progress,
    });
    setShowActionDialog(true);
  }

  function handleSubmitTask() {
    if (!taskForm.title.trim()) return;
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                ...taskForm,
                status:
                  taskForm.progress >= 100
                    ? "Completed"
                    : taskForm.progress > 0
                      ? "In Progress"
                      : "Not Started",
              }
            : t,
        ),
      );
      toast.success("Task updated.");
    } else {
      const newTask: ImprovementTask = {
        id: Date.now(),
        ...taskForm,
        status:
          taskForm.progress >= 100
            ? "Completed"
            : taskForm.progress > 0
              ? "In Progress"
              : "Not Started",
      };
      setTasks((prev) => [...prev, newTask]);
      toast.success("Improvement action added.");
    }
    setShowActionDialog(false);
  }

  function handleDeleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Task removed.");
  }

  function handleDataSubmit() {
    const fields = Object.values(submissionForm);
    if (fields.some((v) => v === "")) {
      toast.error("All fields are required.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Data submitted successfully.", {
        description: `Clinical indicators for ${selectedQuarter} submitted.`,
      });
    }, 1500);
  }

  function handleClearForm() {
    setSubmissionForm({
      falls: "",
      medication: "",
      screening: "",
      staffRetention: "",
      pressureInjury: "",
      satisfaction: "",
    });
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      className="p-4 space-y-4 min-h-screen"
      style={{ background: "oklch(0.97 0.008 254)" }}
    >
      {/* Header */}
      <div
        className="rounded-none border p-4"
        style={{
          background: "oklch(0.15 0.05 254)",
          borderColor: "oklch(0.25 0.06 254)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-5 h-5 text-white" />
              <h1 className="text-lg font-bold text-white">
                Facility Performance Management Dashboard
              </h1>
            </div>
            <p className="text-xs" style={{ color: "oklch(0.75 0.04 254)" }}>
              N-ACRM · Provider Portal · {provider.name} · {provider.city},{" "}
              {provider.state}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div>
              <Label
                className="text-xs mb-1 block"
                style={{ color: "oklch(0.75 0.04 254)" }}
              >
                Provider
              </Label>
              <Select
                value={selectedProviderId}
                onValueChange={resetForProvider}
              >
                <SelectTrigger
                  className="rounded-none h-8 text-xs w-52 bg-white/10 text-white border-white/20"
                  data-ocid="provider.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {PROVIDERS.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="text-xs">
                      {p.name} ({p.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                className="text-xs mb-1 block"
                style={{ color: "oklch(0.75 0.04 254)" }}
              >
                Quarter
              </Label>
              <Select
                value={selectedQuarter}
                onValueChange={setSelectedQuarter}
              >
                <SelectTrigger
                  className="rounded-none h-8 text-xs w-36 bg-white/10 text-white border-white/20"
                  data-ocid="provider.quarter_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {["Q4-2024-25", "Q3-2024-25", "Q2-2024-25", "Q1-2024-25"].map(
                    (q) => (
                      <SelectItem key={q} value={q} className="text-xs">
                        {q}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="rounded-none h-10 w-max min-w-full bg-white border border-b-0 border-[oklch(0.88_0.03_254)] p-0">
            {[
              {
                value: "overview",
                label: "Overview",
                icon: <Activity className="w-3.5 h-3.5" />,
              },
              {
                value: "indicators",
                label: "Indicators",
                icon: <BarChart2 className="w-3.5 h-3.5" />,
              },
              {
                value: "alerts",
                label: "Risk Alerts",
                icon: <Bell className="w-3.5 h-3.5" />,
              },
              /*{
                value: "actions",
                label: "Improvement Actions",
                icon: <ClipboardCheck className="w-3.5 h-3.5" />,
              },*/
              {
                value: "pfi",
                label: "Pay-for-Improvement",
                icon: <DollarSign className="w-3.5 h-3.5" />,
              },
              {
                value: "trends",
                label: "Performance Trends",
                icon: <TrendingUp className="w-3.5 h-3.5" />,
              },
              {
                value: "radar",
                label: "Risk Radar",
                icon: <Star className="w-3.5 h-3.5" />,
              },
              {
                value: "benchmark",
                label: "Benchmark",
                icon: <BarChart2 className="w-3.5 h-3.5" />,
              },
              {
                value: "submission",
                label: "Data Submission",
                icon: <ClipboardCheck className="w-3.5 h-3.5" />,
              },
              {
                value: "compliance",
                label: "Compliance",
                icon: <ShieldCheck className="w-3.5 h-3.5" />,
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid="provider.tab"
                className="rounded-none h-10 px-3 text-xs font-medium flex items-center gap-1.5 border-r border-[oklch(0.88_0.03_254)] data-[state=active]:bg-[oklch(0.15_0.05_254)] data-[state=active]:text-white last:border-r-0"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ── TAB 1: Overview ──────────────────────────────────────────────────── */}
        <TabsContent
          value="overview"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {/* Overall Rating */}
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wide">
                  Overall Rating
                </div>
                <div className="mt-1">
                  <StarRating value={overallStars} size="md" />
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.50 0.025 250)" }}
                >
                  Score: {overallScore.toFixed(1)} / 100
                </div>
              </CardContent>
            </Card>
            {/* Risk Level */}
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                  Risk Level
                </div>
                <span
                  className="inline-block px-3 py-1 text-sm font-bold rounded-none"
                  style={{ background: riskInfo.bg, color: riskInfo.color }}
                >
                  {riskInfo.label}
                </span>
              </CardContent>
            </Card>
            {/* Screening Completion */}
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                  Screening Completion
                </div>
                <div
                  className="text-2xl font-black"
                  style={{ color: "oklch(0.15 0.05 254)" }}
                >
                  {screeningCompletion.toFixed(0)}%
                </div>
                <Progress
                  value={screeningCompletion}
                  className="h-1.5 mt-2 rounded-none"
                />
              </CardContent>
            </Card>
            {/* Incentive Eligibility */}
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                  Incentive Eligibility
                </div>
                <IncentiveEligibilityBadge
                  eligible={isIncentiveEligible}
                  size="md"
                />
              </CardContent>
            </Card>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {INDICATOR_DEFS.map((def, i) => {
              const score = indicatorScores[i];
              const status = getBenchmarkStatus(
                indicatorValues[i],
                def.benchmark,
                def.isLowerBetter,
              );
              const isGood = status === "above";
              const isBad = status === "below";
              return (
                <Card
                  key={def.code}
                  className="rounded-none border-[oklch(0.88_0.03_254)]"
                >
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wide leading-tight">
                      {def.name}
                    </div>
                    <div
                      className="text-2xl font-black mt-1"
                      style={{
                        color: isBad
                          ? "oklch(0.42 0.20 25)"
                          : isGood
                            ? "oklch(0.28 0.14 145)"
                            : "oklch(0.15 0.05 254)",
                      }}
                    >
                      {indicatorValues[i].toFixed(1)}
                      <span className="text-xs font-normal ml-1 text-muted-foreground">
                        {def.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        Benchmark: {def.benchmark}
                      </span>
                      <BenchmarkStatusChip
                        rate={indicatorValues[i]}
                        benchmark={def.benchmark}
                        isLowerBetter={def.isLowerBetter}
                        showLabel={false}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span style={{ color: "oklch(0.50 0.025 250)" }}>
                          Score
                        </span>
                        <span className="font-bold">
                          {score.toFixed(0)}/100
                        </span>
                      </div>
                      <Progress value={score} className="h-1 rounded-none" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* ── TAB 2: Indicator Management ──────────────────────────────────────── */}
        <TabsContent
          value="indicators"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="font-bold text-sm"
                style={{ color: "oklch(0.15 0.05 254)" }}
              >
                Clinical Indicator Management
              </h2>
              <p className="text-xs text-muted-foreground">
                Update indicator values to recalculate performance scores in
                real time.
              </p>
            </div>
            
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Indicator</TableHead>
                  <TableHead className="text-xs">Current Value</TableHead>
                  <TableHead className="text-xs">Benchmark</TableHead>
                  <TableHead className="text-xs">Unit</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INDICATOR_DEFS.map((def, i) => (
                  <TableRow key={def.code}>
                    <TableCell className="text-xs font-medium">
                      {def.name}
                    </TableCell>
                    <TableCell>
                    
                    <TableCell className="text-xs text-muted-foreground">
                      {indicatorValues[i]}
                    </TableCell>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {def.benchmark}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {def.unit}
                    </TableCell>
                    <TableCell>
                      <BenchmarkStatusChip
                        rate={indicatorValues[i]}
                        benchmark={def.benchmark}
                        isLowerBetter={def.isLowerBetter}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress
                          value={indicatorScores[i]}
                          className="h-1.5 rounded-none w-16"
                        />
                        <span className="text-xs font-bold w-10 text-right">
                          {indicatorScores[i].toFixed(0)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ── TAB 3: Risk Alerts ────────────────────────────────────────────────── */}
        <TabsContent
          value="alerts"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="mb-4">
            <h2
              className="font-bold text-sm"
              style={{ color: "oklch(0.15 0.05 254)" }}
            >
              Risk Alerts
            </h2>
            <p className="text-xs text-muted-foreground">
              Indicators performing below benchmark require attention.
            </p>
          </div>
          {alerts.filter((a) => !acknowledged.has(a.index)).length === 0 ? (
            <div
              className="text-center py-10 border border-dashed"
              style={{
                borderColor: "oklch(0.80 0.05 145)",
                background: "oklch(0.97 0.02 145)",
              }}
            >
              <CheckCircle2
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "oklch(0.45 0.15 145)" }}
              />
              <div
                className="text-sm font-semibold"
                style={{ color: "oklch(0.28 0.14 145)" }}
              >
                All indicators performing at or above benchmark
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                No active risk alerts.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts
                .filter((a) => !acknowledged.has(a.index))
                .map((alert, idx) => {
                  const isHigh =
                    alert.value / alert.def.benchmark >
                      (alert.def.isLowerBetter ? 1.2 : 0) ||
                    (!alert.def.isLowerBetter &&
                      alert.value / alert.def.benchmark < 0.8);
                  return (
                    <div
                      key={alert.index}
                      className="border p-4"
                      style={{
                        borderColor: isHigh
                          ? "oklch(0.72 0.16 25)"
                          : "oklch(0.75 0.12 72)",
                        background: isHigh
                          ? "oklch(0.97 0.025 25)"
                          : "oklch(0.97 0.02 80)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle
                              className="w-4 h-4"
                              style={{
                                color: isHigh
                                  ? "oklch(0.42 0.20 25)"
                                  : "oklch(0.43 0.14 72)",
                              }}
                            />
                            <span className="font-bold text-sm">
                              {alert.def.name}
                            </span>
                            <span
                              className="px-1.5 py-0.5 text-xs font-bold rounded-none"
                              style={
                                isHigh
                                  ? {
                                      background: "oklch(0.42 0.20 25)",
                                      color: "white",
                                    }
                                  : {
                                      background: "oklch(0.55 0.14 75)",
                                      color: "white",
                                    }
                              }
                            >
                              {isHigh ? "HIGH" : "MEDIUM"}
                            </span>
                          </div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: "oklch(0.40 0.04 254)" }}
                          >
                            Current:{" "}
                            <strong>
                              {alert.value.toFixed(1)}
                              {alert.def.unit}
                            </strong>{" "}
                            · Benchmark: {alert.def.benchmark}
                            {alert.def.unit}
                            {" · "}
                            {alert.def.isLowerBetter ? "Lower" : "Higher"} is
                            better
                          </div>
                          <div className="text-xs mt-0.5 text-muted-foreground">
                            Detected: {new Date().toLocaleDateString("en-AU")} —{" "}
                            {selectedQuarter}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-none h-7 text-xs"
                            onClick={() =>
                              setExpandedAction(
                                expandedAction === alert.index
                                  ? null
                                  : alert.index,
                              )
                            }
                            data-ocid={`alert.corrective_action_button.${idx + 1}`}
                          >
                            Add Corrective Action
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-none h-7 text-xs"
                            style={{
                              background: "oklch(0.15 0.05 254)",
                              color: "white",
                            }}
                            onClick={() =>
                              setAcknowledged(
                                (prev) => new Set([...prev, alert.index]),
                              )
                            }
                            data-ocid={`alert.acknowledge_button.${idx + 1}`}
                          >
                            <BellOff className="w-3 h-3 mr-1" />
                            Acknowledge
                          </Button>
                        </div>
                      </div>
                      {expandedAction === alert.index && (
                        <div className="mt-3 pt-3 border-t">
                          <Label className="text-xs font-semibold mb-1 block">
                            Corrective Action Notes
                          </Label>
                          <Textarea
                            rows={2}
                            placeholder="Describe the corrective action planned..."
                            className="rounded-none text-xs"
                            value={correctiveNotes[alert.index] ?? ""}
                            onChange={(e) =>
                              setCorrectiveNotes((prev) => ({
                                ...prev,
                                [alert.index]: e.target.value,
                              }))
                            }
                          />
                          <Button
                            size="sm"
                            className="mt-2 rounded-none h-7 text-xs"
                            style={{
                              background: "oklch(0.15 0.05 254)",
                              color: "white",
                            }}
                            onClick={() => {
                              setExpandedAction(null);
                              toast.success("Corrective action noted.");
                            }}
                          >
                            Save Note
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}

          {/* Acknowledged section */}
          {acknowledged.size > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Acknowledged Alerts ({acknowledged.size})
              </h3>
              <div className="space-y-2">
                {alerts
                  .filter((a) => acknowledged.has(a.index))
                  .map((alert) => (
                    <div
                      key={alert.index}
                      className="border p-3 flex items-center justify-between"
                      style={{
                        borderColor: "oklch(0.85 0.02 240)",
                        background: "oklch(0.97 0.005 240)",
                      }}
                    >
                      <div className="text-xs">
                        <span className="font-semibold">{alert.def.name}</span>
                        <span className="text-muted-foreground ml-2">
                          {alert.value.toFixed(1)}
                          {alert.def.unit} vs {alert.def.benchmark} benchmark
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs rounded-none">
                        Acknowledged
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── TAB 4: Improvement Actions ────────────────────────────────────────── */}
        {/*
        <TabsContent
          value="actions"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="font-bold text-sm"
                style={{ color: "oklch(0.15 0.05 254)" }}
              >
                Improvement Action Planner
              </h2>
              <p className="text-xs text-muted-foreground">
                Create and track quality improvement initiatives.
              </p>
            </div>
            <Button
              onClick={handleAddTask}
              className="rounded-none h-8 text-xs font-semibold"
              style={{ background: "oklch(0.15 0.05 254)", color: "white" }}
              data-ocid="action.open_modal_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              New Action
            </Button>
          </div>

          {tasks.length === 0 ? (
            <div
              className="text-center py-12 border border-dashed"
              style={{ borderColor: "oklch(0.82 0.03 254)" }}
              data-ocid="action.empty_state"
            >
              <ClipboardCheck className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm font-semibold text-muted-foreground">
                No improvement actions yet
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Click "New Action" to create your first improvement task.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task, idx) => {
                const pStyle = getPriorityStyle(task.priority);
                const sColor =
                  task.status === "Completed"
                    ? "oklch(0.28 0.14 145)"
                    : task.status === "In Progress"
                      ? "oklch(0.43 0.14 72)"
                      : "oklch(0.50 0.025 250)";
                return (
                  <Card
                    key={task.id}
                    className="rounded-none border-[oklch(0.88_0.03_254)]"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">
                              {task.title}
                            </span>
                            <span
                              className="px-1.5 py-0.5 text-xs font-bold rounded-none"
                              style={{
                                background: pStyle.bg,
                                color: pStyle.color,
                              }}
                            >
                              {task.priority}
                            </span>
                            <span
                              className="text-xs font-semibold"
                              style={{ color: sColor }}
                            >
                              {task.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {task.description}
                          </p>
                          <div
                            className="flex flex-wrap gap-4 text-xs"
                            style={{ color: "oklch(0.50 0.025 250)" }}
                          >
                            <span>
                              Owner: <strong>{task.owner}</strong>
                            </span>
                            <span>
                              Due: <strong>{task.dueDate}</strong>
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-0.5">
                              <span>Progress</span>
                              <span className="font-bold">
                                {task.progress}%
                              </span>
                            </div>
                            <Progress
                              value={task.progress}
                              className="h-2 rounded-none"
                            />
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-none h-7 w-7 p-0"
                            onClick={() => handleEditTask(task)}
                            data-ocid={`action.edit_button.${idx + 1}`}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-none h-7 w-7 p-0"
                            onClick={() => handleDeleteTask(task.id)}
                            data-ocid={`action.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {// New/Edit Action Dialog }
          <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
            <DialogContent className="rounded-none max-w-md">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold">
                  {editingTask ? "Edit Action" : "New Improvement Action"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div>
                  <Label className="text-xs font-semibold">Title *</Label>
                  <Input
                    className="rounded-none h-8 text-xs mt-1"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Action title"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Description</Label>
                  <Textarea
                    className="rounded-none text-xs mt-1"
                    rows={2}
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe the improvement action..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold">Owner</Label>
                    <Input
                      className="rounded-none h-8 text-xs mt-1"
                      value={taskForm.owner}
                      onChange={(e) =>
                        setTaskForm((f) => ({ ...f, owner: e.target.value }))
                      }
                      placeholder="Person responsible"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Due Date</Label>
                    <Input
                      type="date"
                      className="rounded-none h-8 text-xs mt-1"
                      value={taskForm.dueDate}
                      onChange={(e) =>
                        setTaskForm((f) => ({ ...f, dueDate: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-semibold">Priority</Label>
                  <Select
                    value={taskForm.priority}
                    onValueChange={(v) =>
                      setTaskForm((f) => ({ ...f, priority: v }))
                    }
                  >
                    <SelectTrigger className="rounded-none h-8 text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="High" className="text-xs">
                        High
                      </SelectItem>
                      <SelectItem value="Medium" className="text-xs">
                        Medium
                      </SelectItem>
                      <SelectItem value="Low" className="text-xs">
                        Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold">
                    Initial Progress: {taskForm.progress}%
                  </Label>
                  <Slider
                    value={[taskForm.progress]}
                    onValueChange={([v]) =>
                      setTaskForm((f) => ({ ...f, progress: v }))
                    }
                    min={0}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="rounded-none h-8 text-xs"
                  onClick={() => setShowActionDialog(false)}
                  data-ocid="action.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-none h-8 text-xs"
                  style={{ background: "oklch(0.15 0.05 254)", color: "white" }}
                  onClick={handleSubmitTask}
                  data-ocid="action.submit_button"
                >
                  {editingTask ? "Save Changes" : "Add Action"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        </div>
        */}
        {/* ── TAB 5: Pay-for-Improvement ───────────────────────────────────────── */}
        <TabsContent
          value="pfi"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="grid grid-cols-3 gap-3 mb-5">
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
                  Avg Improvement Score
                </div>
                <div
                  className="text-2xl font-black"
                  style={{
                    color:
                      avgImprovement >= 0
                        ? "oklch(0.28 0.14 145)"
                        : "oklch(0.42 0.20 25)",
                  }}
                >
                  {avgImprovement >= 0 ? "+" : ""}
                  {avgImprovement.toFixed(1)}%
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {avgImprovement >= 0 ? (
                    <TrendingUp
                      className="w-3.5 h-3.5"
                      style={{ color: "oklch(0.45 0.15 145)" }}
                    />
                  ) : (
                    <TrendingDown
                      className="w-3.5 h-3.5"
                      style={{ color: "oklch(0.42 0.20 25)" }}
                    />
                  )}
                  <span className="text-xs text-muted-foreground">
                    vs previous quarter
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
                  Eligibility Status
                </div>
                <IncentiveEligibilityBadge
                  eligible={pfiEligibility.eligible}
                  size="md"
                />
                {pfiEligibility.eligible && (
                  <div
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.40 0.12 145)" }}
                  >
                    {pfiEligibility.tier}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
                  Estimated Incentive
                </div>
                <div
                  className="text-2xl font-black"
                  style={{
                    color: pfiEligibility.eligible
                      ? "oklch(0.42 0.14 85)"
                      : "oklch(0.55 0.02 240)",
                  }}
                >
                  $
                  {pfiEligibility.eligible
                    ? estimatedPayment.toLocaleString()
                    : "0"}
                </div>
                <div className="text-xs mt-0.5 text-muted-foreground">
                  AUD · estimated payment
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Indicator</TableHead>
                  <TableHead className="text-xs text-right">
                    Previous Value
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    Current Value
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    Improvement %
                  </TableHead>
                  <TableHead className="text-xs">Direction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INDICATOR_DEFS.map((def, i) => {
                  const impPct = improvementPcts[i];
                  const isPos = impPct >= 0;
                  return (
                    <TableRow key={def.code}>
                      <TableCell className="text-xs font-medium">
                        {def.name}
                      </TableCell>
                      <TableCell className="text-xs text-right">
                        {prevVals[i].toFixed(1)} {def.unit}
                      </TableCell>
                      <TableCell className="text-xs text-right">
                        {indicatorValues[i].toFixed(1)} {def.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className="text-xs font-bold"
                          style={{
                            color: isPos
                              ? "oklch(0.28 0.14 145)"
                              : "oklch(0.42 0.20 25)",
                          }}
                        >
                          {isPos ? "+" : ""}
                          {impPct.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {isPos ? (
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: "oklch(0.28 0.14 145)" }}
                          >
                            <TrendingUp className="w-3 h-3" />
                            Improving
                          </span>
                        ) : (
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: "oklch(0.42 0.20 25)" }}
                          >
                            <TrendingDown className="w-3 h-3" />
                            Declining
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ── TAB 6: Performance Trends ─────────────────────────────────────────── */}
        <TabsContent
          value="trends"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="mb-4">
            <h2
              className="font-bold text-sm"
              style={{ color: "oklch(0.15 0.05 254)" }}
            >
              Performance Trends — 2024-25
            </h2>
            <p className="text-xs text-muted-foreground">
              Indicator trends across Q1–Q4. Dashed line shows benchmark
              reference.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Falls & Medication */}
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardHeader className="py-3 px-4 border-b">
                <CardTitle className="text-xs font-semibold">
                  Safety Indicators (Lower is Better)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={TREND_DATA}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.92 0.01 240)"
                    />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <ReferenceLine
                      y={5.1}
                      stroke="#666"
                      strokeDasharray="4 4"
                      label={{
                        value: "Falls Benchmark",
                        fontSize: 10,
                        position: "right",
                      }}
                    />
                    <ReferenceLine
                      y={3.2}
                      stroke="#999"
                      strokeDasharray="4 4"
                      label={{
                        value: "Med Benchmark",
                        fontSize: 10,
                        position: "right",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="falls"
                      name="Falls with Harm"
                      stroke="oklch(0.52 0.22 25)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="medication"
                      name="Medication Harm"
                      stroke="oklch(0.55 0.14 75)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* Screening & Staffing */}
            <Card className="rounded-none border-[oklch(0.88_0.03_254)]">
              <CardHeader className="py-3 px-4 border-b">
                <CardTitle className="text-xs font-semibold">
                  Preventive & Staffing (Higher is Better)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={TREND_DATA}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.92 0.01 240)"
                    />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[60, 100]} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <ReferenceLine
                      y={85}
                      stroke="#3b82f6"
                      strokeDasharray="4 4"
                      label={{ value: "Screening Benchmark", fontSize: 10 }}
                    />
                    <ReferenceLine
                      y={82}
                      stroke="#6b7280"
                      strokeDasharray="4 4"
                      label={{ value: "Staff Benchmark", fontSize: 10 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="screening"
                      name="Screening %"
                      stroke="oklch(0.45 0.15 254)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="staffing"
                      name="Staff Retention %"
                      stroke="oklch(0.45 0.15 145)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── TAB 7: Risk Radar ────────────────────────────────────────────────── */}
        <TabsContent
          value="radar"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="mb-4">
            <h2
              className="font-bold text-sm"
              style={{ color: "oklch(0.15 0.05 254)" }}
            >
              Provider Risk Radar
            </h2>
            <p className="text-xs text-muted-foreground">
              Performance across all care domains vs benchmark (75/100).
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11 }} />
                  <Radar
                    name="Provider"
                    dataKey="provider"
                    stroke="oklch(0.35 0.18 254)"
                    fill="oklch(0.35 0.18 254)"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Benchmark"
                    dataKey="benchmark"
                    stroke="#9ca3af"
                    fill="#9ca3af"
                    fillOpacity={0.15}
                    strokeDasharray="4 4"
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 0 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Domain Scores
              </h3>
              {radarData.map((d) => (
                <div key={d.domain}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="font-semibold">{d.domain}</span>
                    <span className="font-bold">{d.provider}/100</span>
                  </div>
                  <Progress value={d.provider} className="h-2 rounded-none" />
                  <div className="text-xs mt-0.5 text-muted-foreground">
                    Benchmark: 75 · Gap: {d.provider - 75 >= 0 ? "+" : ""}
                    {d.provider - 75}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── TAB 8: Benchmark Comparison ──────────────────────────────────────── */}
        <TabsContent
          value="benchmark"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="mb-4">
            <h2
              className="font-bold text-sm"
              style={{ color: "oklch(0.15 0.05 254)" }}
            >
              Benchmark Comparison
            </h2>
            <p className="text-xs text-muted-foreground">
              Provider performance vs regional and national averages.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={benchmarkBarData}
              margin={{ top: 10, right: 20, left: 0, bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.92 0.01 240)"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 0 }}
                formatter={(val, name, props) => [
                  `${Number(val).toFixed(2)} ${INDICATOR_DEFS[benchmarkBarData.findIndex((d) => d.name === props?.payload?.name)]?.unit ?? ""}`,
                  name,
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar
                dataKey="provider"
                name="This Provider"
                fill="oklch(0.25 0.08 254)"
                radius={0}
              />
              <Bar
                dataKey="regional"
                name="Regional Avg"
                fill="oklch(0.55 0.12 195)"
                radius={0}
              />
              <Bar
                dataKey="national"
                name="National Avg"
                fill="oklch(0.65 0.03 240)"
                radius={0}
              />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        {/* ── TAB 9: Data Submission ────────────────────────────────────────────── */}
        <TabsContent
          value="submission"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2
                className="font-bold text-sm mb-3"
                style={{ color: "oklch(0.15 0.05 254)" }}
              >
                Submit Clinical Indicator Data
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold">Provider ID</Label>
                    <Input
                      value={provider.id}
                      readOnly
                      className="rounded-none h-8 text-xs mt-1 bg-muted"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Quarter *</Label>
                    <Select
                      value={selectedQuarter}
                      onValueChange={setSelectedQuarter}
                    >
                      <SelectTrigger className="rounded-none h-8 text-xs mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {[
                          "Q4-2024-25",
                          "Q3-2024-25",
                          "Q2-2024-25",
                          "Q1-2024-25",
                        ].map((q) => (
                          <SelectItem key={q} value={q} className="text-xs">
                            {q}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-semibold">
                    Submission Date
                  </Label>
                  <Input
                    type="date"
                    className="rounded-none h-8 text-xs mt-1"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      key: "falls" as const,
                      label: "Falls with Harm Rate",
                      placeholder: "e.g. 4.2",
                      unit: "/1000",
                    },
                    {
                      key: "medication" as const,
                      label: "Medication-Related Harm",
                      placeholder: "e.g. 2.8",
                      unit: "%",
                    },
                    {
                      key: "screening" as const,
                      label: "Screening Completion",
                      placeholder: "e.g. 87",
                      unit: "%",
                    },
                    {
                      key: "staffRetention" as const,
                      label: "Staff Retention",
                      placeholder: "e.g. 84",
                      unit: "%",
                    },
                    {
                      key: "pressureInjury" as const,
                      label: "Pressure Injury Rate",
                      placeholder: "e.g. 1.8",
                      unit: "/1000",
                    },
                    {
                      key: "satisfaction" as const,
                      label: "Resident Satisfaction",
                      placeholder: "e.g. 82",
                      unit: "%",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <Label className="text-xs font-semibold">
                        {field.label} ({field.unit}) *
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        className="rounded-none h-8 text-xs mt-1"
                        placeholder={field.placeholder}
                        value={submissionForm[field.key]}
                        onChange={(e) =>
                          setSubmissionForm((f) => ({
                            ...f,
                            [field.key]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                  <Input
                    type="file"
                    className="flex gap-2 pt-1"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={handleDataSubmit}
                    disabled={isSubmitting}
                    className="rounded-none h-8 text-xs font-semibold"
                    style={{
                      background: "oklch(0.15 0.05 254)",
                      color: "white",
                    }}
                    data-ocid="submission.submit_button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Data"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-none h-8 text-xs"
                    onClick={handleClearForm}
                    data-ocid="submission.clear_button"
                  >
                    Clear Form
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h3
                className="font-bold text-sm mb-3"
                style={{ color: "oklch(0.15 0.05 254)" }}
              >
                Recent Submissions
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Quarter</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSubmissions.map((s) => (
                    <TableRow key={s.quarter}>
                      <TableCell className="text-xs">{s.date}</TableCell>
                      <TableCell className="text-xs">{s.quarter}</TableCell>
                      <TableCell>
                        <span
                          className="px-1.5 py-0.5 text-xs font-bold rounded-none"
                          style={{
                            background: "oklch(0.93 0.07 145)",
                            color: "oklch(0.28 0.14 145)",
                          }}
                        >
                          {s.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* ── TAB 10: Compliance Status ─────────────────────────────────────────── */}
        <TabsContent
          value="compliance"
          className="mt-0 border border-[oklch(0.88_0.03_254)] bg-white p-4"
        >
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[
              {
                label: "Total Standards",
                value: COMPLIANCE_STANDARDS.length,
                color: "oklch(0.15 0.05 254)",
                bg: "oklch(0.95 0.02 254)",
              },
              {
                label: "Compliant",
                value: COMPLIANCE_STANDARDS.filter(
                  (s) => s.status === "Compliant",
                ).length,
                color: "oklch(0.28 0.14 145)",
                bg: "oklch(0.93 0.07 145)",
              },
              {
                label: "Pending Review",
                value: COMPLIANCE_STANDARDS.filter(
                  (s) => s.status === "Pending Review",
                ).length,
                color: "oklch(0.43 0.14 72)",
                bg: "oklch(0.96 0.05 80)",
              },
              {
                label: "Non-Compliant",
                value: COMPLIANCE_STANDARDS.filter(
                  (s) => s.status === "Non-Compliant",
                ).length,
                color: "oklch(0.42 0.20 25)",
                bg: "oklch(0.95 0.06 25)",
              },
            ].map((c) => (
              <Card
                key={c.label}
                className="rounded-none"
                style={{ borderColor: "oklch(0.88 0.03 254)" }}
              >
                <CardContent className="p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                    {c.label}
                  </div>
                  <div
                    className="text-3xl font-black"
                    style={{ color: c.color }}
                  >
                    {c.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Standard</TableHead>
                  <TableHead className="text-xs">Category</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Last Assessed</TableHead>
                  <TableHead className="text-xs">Next Review</TableHead>
                  <TableHead className="text-xs">Notes</TableHead>
                  <TableHead className="text-xs">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPLIANCE_STANDARDS.map((std, idx) => {
                  const sStyle = getStatusStyle(std.status);
                  return (
                    <TableRow key={std.id}>
                      <TableCell className="text-xs font-medium max-w-xs">
                        {std.name}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {std.category}
                      </TableCell>
                      <TableCell>
                        <span
                          className="px-1.5 py-0.5 text-xs font-bold rounded-none whitespace-nowrap"
                          style={{ background: sStyle.bg, color: sStyle.color }}
                        >
                          {std.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        {std.lastAssessed}
                      </TableCell>
                      <TableCell className="text-xs">
                        {std.nextReview}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-xs">
                        {std.notes}
                      </TableCell>
                      <TableCell>
                        {std.status === "Non-Compliant" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-none h-7 text-xs whitespace-nowrap"
                            onClick={() =>
                              toast.success(`Review requested for: ${std.name}`)
                            }
                            data-ocid={`compliance.request_review_button.${idx + 1}`}
                          >
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Request Review
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center pt-2 pb-1">
        <p className="text-xs" style={{ color: "oklch(0.60 0.02 240)" }}>
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="underline hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with ❤ using caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
