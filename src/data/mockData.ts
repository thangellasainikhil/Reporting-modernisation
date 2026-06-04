// Mock data for sections that don't have full backend support
import {
  calcNewWeightedOverallScore,
  overallScoreToStars,
  starsToPercentScore,
} from "../utils/ratingEngine";

export interface MockProvider {
  id: string;
  name: string;
  state: string;
  serviceType: string;
  beds?: number;
  accreditationStatus: "accredited" | "conditional" | "not-accredited";
  acqscStandards: number;
}

export const MOCK_PROVIDERS: MockProvider[] = [
  {
    id: "PROV-001",
    name: "Sunridge Aged Care",
    state: "NSW",
    serviceType: "Residential",
    beds: 120,
    accreditationStatus: "accredited",
    acqscStandards: 8,
  },
  {
    id: "PROV-002",
    name: "Bayside Home Care Services",
    state: "VIC",
    serviceType: "Home Care",
    accreditationStatus: "accredited",
    acqscStandards: 8,
  },
  {
    id: "PROV-003",
    name: "Central Queensland Aged Care",
    state: "QLD",
    serviceType: "Residential",
    beds: 85,
    accreditationStatus: "conditional",
    acqscStandards: 6,
  },
  {
    id: "PROV-004",
    name: "Adelaide Southern Care",
    state: "SA",
    serviceType: "Residential",
    beds: 64,
    accreditationStatus: "accredited",
    acqscStandards: 8,
  },
  {
    id: "PROV-005",
    name: "Perth Metro Seniors Living",
    state: "WA",
    serviceType: "Residential",
    beds: 145,
    accreditationStatus: "accredited",
    acqscStandards: 8,
  },
  {
    id: "PROV-006",
    name: "Hobart Community Aged Care",
    state: "TAS",
    serviceType: "CHSP",
    accreditationStatus: "accredited",
    acqscStandards: 8,
  },
  {
    id: "PROV-007",
    name: "Darwin Territory Care",
    state: "NT",
    serviceType: "Home Care",
    accreditationStatus: "conditional",
    acqscStandards: 5,
  },
  {
    id: "PROV-008",
    name: "ACT Aged Services",
    state: "ACT",
    serviceType: "Residential",
    beds: 78,
    accreditationStatus: "accredited",
    acqscStandards: 8,
  },
  {
    id: "PROV-009",
    name: "Hunter Valley Care Group",
    state: "NSW",
    serviceType: "Residential",
    beds: 112,
    accreditationStatus: "accredited",
    acqscStandards: 7,
  },
  {
    id: "PROV-010",
    name: "Geelong Aged Care Network",
    state: "VIC",
    serviceType: "CHSP",
    accreditationStatus: "accredited",
    acqscStandards: 8,
  },
];

export const NATIONAL_TRENDS = [
  { quarter: "Q1-2025", safetyScore: 72.4, preventiveScore: 68.1 },
  { quarter: "Q2-2025", safetyScore: 74.8, preventiveScore: 70.5 },
  { quarter: "Q3-2025", safetyScore: 76.2, preventiveScore: 73.3 },
  { quarter: "Q4-2025", safetyScore: 78.1, preventiveScore: 76.8 },
];

export const STATE_ADVERSE_EVENTS = [
  { state: "NSW", rate: 8.4 },
  { state: "VIC", rate: 7.2 },
  { state: "QLD", rate: 9.8 },
  { state: "SA", rate: 11.2 },
  { state: "WA", rate: 10.5 },
  { state: "TAS", rate: 6.8 },
  { state: "NT", rate: 14.3 },
  { state: "ACT", rate: 7.6 },
];

export const RECENT_SUBMISSIONS = [
  {
    id: "SUB-2025-1241",
    provider: "Sunridge Aged Care",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 1842,
    status: "processed",
    submitted: "2025-11-28",
  },
  {
    id: "SUB-2025-1240",
    provider: "Perth Metro Seniors Living",
    quarter: "Q4-2025",
    type: "CSV Upload",
    records: 3201,
    status: "validating",
    submitted: "2025-11-27",
  },
  {
    id: "SUB-2025-1239",
    provider: "Central Queensland Aged Care",
    quarter: "Q4-2025",
    type: "Manual Entry",
    records: 956,
    status: "validation_error",
    submitted: "2025-11-26",
  },
  {
    id: "SUB-2025-1238",
    provider: "Bayside Home Care Services",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 2104,
    status: "processed",
    submitted: "2025-11-25",
  },
  {
    id: "SUB-2025-1237",
    provider: "Adelaide Southern Care",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 1578,
    status: "processed",
    submitted: "2025-11-24",
  },
];

export type StateKey =
  | "NSW"
  | "VIC"
  | "QLD"
  | "SA"
  | "WA"
  | "TAS"
  | "NT"
  | "ACT";

export const REGIONAL_DATA: Record<
  StateKey,
  {
    regions: Array<{
      region: string;
      providers: number;
      avgSafety: number;
      avgPreventive: number;
      screeningCompliance: number;
      highRiskPrevalence: number;
      adverseEvents: number;
      equityGap: number;
    }>;
    radarProfile: Array<{
      dimension: string;
      score: number;
      benchmark: number;
    }>;
  }
> = {
  NSW: {
    regions: [
      {
        region: "Sydney Metro",
        providers: 312,
        avgSafety: 79.2,
        avgPreventive: 77.4,
        screeningCompliance: 88.1,
        highRiskPrevalence: 14.2,
        adverseEvents: 7.8,
        equityGap: 5.2,
      },
      {
        region: "Hunter & Central Coast",
        providers: 89,
        avgSafety: 75.8,
        avgPreventive: 73.2,
        screeningCompliance: 82.4,
        highRiskPrevalence: 17.5,
        adverseEvents: 9.4,
        equityGap: 7.8,
      },
      {
        region: "Illawarra & South Coast",
        providers: 67,
        avgSafety: 77.1,
        avgPreventive: 74.8,
        screeningCompliance: 85.3,
        highRiskPrevalence: 15.8,
        adverseEvents: 8.6,
        equityGap: 6.4,
      },
      {
        region: "New England & North West",
        providers: 44,
        avgSafety: 68.4,
        avgPreventive: 65.1,
        screeningCompliance: 71.2,
        highRiskPrevalence: 22.4,
        adverseEvents: 13.8,
        equityGap: 14.2,
      },
      {
        region: "Far West & Western",
        providers: 18,
        avgSafety: 61.2,
        avgPreventive: 58.4,
        screeningCompliance: 64.8,
        highRiskPrevalence: 28.6,
        adverseEvents: 16.4,
        equityGap: 21.5,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 74.8, benchmark: 76.2 },
      { dimension: "Preventive", score: 72.1, benchmark: 73.8 },
      { dimension: "Experience", score: 78.4, benchmark: 75.0 },
      { dimension: "Equity", score: 65.2, benchmark: 70.0 },
      { dimension: "Data Quality", score: 82.1, benchmark: 80.0 },
      { dimension: "Compliance", score: 84.3, benchmark: 82.0 },
    ],
  },
  VIC: {
    regions: [
      {
        region: "Melbourne Metro",
        providers: 287,
        avgSafety: 81.4,
        avgPreventive: 79.2,
        screeningCompliance: 89.4,
        highRiskPrevalence: 13.1,
        adverseEvents: 6.9,
        equityGap: 4.8,
      },
      {
        region: "Barwon South West",
        providers: 72,
        avgSafety: 77.8,
        avgPreventive: 75.4,
        screeningCompliance: 83.6,
        highRiskPrevalence: 16.2,
        adverseEvents: 8.2,
        equityGap: 7.1,
      },
      {
        region: "Grampians",
        providers: 38,
        avgSafety: 72.1,
        avgPreventive: 68.9,
        screeningCompliance: 76.4,
        highRiskPrevalence: 20.8,
        adverseEvents: 11.4,
        equityGap: 11.8,
      },
      {
        region: "Loddon Mallee",
        providers: 41,
        avgSafety: 73.6,
        avgPreventive: 70.2,
        screeningCompliance: 78.1,
        highRiskPrevalence: 19.4,
        adverseEvents: 10.8,
        equityGap: 10.2,
      },
      {
        region: "Gippsland",
        providers: 45,
        avgSafety: 74.2,
        avgPreventive: 71.8,
        screeningCompliance: 80.2,
        highRiskPrevalence: 18.1,
        adverseEvents: 9.8,
        equityGap: 9.4,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 78.4, benchmark: 76.2 },
      { dimension: "Preventive", score: 76.2, benchmark: 73.8 },
      { dimension: "Experience", score: 80.1, benchmark: 75.0 },
      { dimension: "Equity", score: 68.4, benchmark: 70.0 },
      { dimension: "Data Quality", score: 85.2, benchmark: 80.0 },
      { dimension: "Compliance", score: 87.4, benchmark: 82.0 },
    ],
  },
  QLD: {
    regions: [
      {
        region: "Brisbane Metro",
        providers: 198,
        avgSafety: 77.2,
        avgPreventive: 75.1,
        screeningCompliance: 86.2,
        highRiskPrevalence: 15.4,
        adverseEvents: 8.4,
        equityGap: 6.2,
      },
      {
        region: "Gold Coast",
        providers: 84,
        avgSafety: 78.8,
        avgPreventive: 76.4,
        screeningCompliance: 87.1,
        highRiskPrevalence: 14.8,
        adverseEvents: 7.8,
        equityGap: 5.4,
      },
      {
        region: "Sunshine Coast & Hinterland",
        providers: 61,
        avgSafety: 76.4,
        avgPreventive: 73.8,
        screeningCompliance: 84.8,
        highRiskPrevalence: 16.2,
        adverseEvents: 8.9,
        equityGap: 7.2,
      },
      {
        region: "Central Queensland",
        providers: 42,
        avgSafety: 69.8,
        avgPreventive: 66.4,
        screeningCompliance: 72.4,
        highRiskPrevalence: 23.8,
        adverseEvents: 12.8,
        equityGap: 15.4,
      },
      {
        region: "Far North Queensland",
        providers: 31,
        avgSafety: 62.4,
        avgPreventive: 59.8,
        screeningCompliance: 67.4,
        highRiskPrevalence: 31.4,
        adverseEvents: 17.8,
        equityGap: 22.8,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 73.2, benchmark: 76.2 },
      { dimension: "Preventive", score: 70.8, benchmark: 73.8 },
      { dimension: "Experience", score: 76.8, benchmark: 75.0 },
      { dimension: "Equity", score: 62.4, benchmark: 70.0 },
      { dimension: "Data Quality", score: 79.2, benchmark: 80.0 },
      { dimension: "Compliance", score: 81.8, benchmark: 82.0 },
    ],
  },
  SA: {
    regions: [
      {
        region: "Adelaide Metro",
        providers: 142,
        avgSafety: 75.8,
        avgPreventive: 73.4,
        screeningCompliance: 83.8,
        highRiskPrevalence: 16.8,
        adverseEvents: 9.8,
        equityGap: 8.4,
      },
      {
        region: "Barossa, Light & Lower North",
        providers: 28,
        avgSafety: 72.4,
        avgPreventive: 69.8,
        screeningCompliance: 78.4,
        highRiskPrevalence: 20.4,
        adverseEvents: 11.8,
        equityGap: 12.4,
      },
      {
        region: "Fleurieu & Kangaroo Island",
        providers: 19,
        avgSafety: 70.8,
        avgPreventive: 67.4,
        screeningCompliance: 74.8,
        highRiskPrevalence: 22.8,
        adverseEvents: 13.4,
        equityGap: 14.8,
      },
      {
        region: "Eyre & Western",
        providers: 12,
        avgSafety: 63.4,
        avgPreventive: 60.8,
        screeningCompliance: 66.4,
        highRiskPrevalence: 29.8,
        adverseEvents: 16.8,
        equityGap: 20.4,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 71.8, benchmark: 76.2 },
      { dimension: "Preventive", score: 69.4, benchmark: 73.8 },
      { dimension: "Experience", score: 74.2, benchmark: 75.0 },
      { dimension: "Equity", score: 60.8, benchmark: 70.0 },
      { dimension: "Data Quality", score: 77.4, benchmark: 80.0 },
      { dimension: "Compliance", score: 80.2, benchmark: 82.0 },
    ],
  },
  WA: {
    regions: [
      {
        region: "Perth Metro",
        providers: 168,
        avgSafety: 76.8,
        avgPreventive: 74.2,
        screeningCompliance: 84.8,
        highRiskPrevalence: 15.8,
        adverseEvents: 9.4,
        equityGap: 7.8,
      },
      {
        region: "Bunbury & South West",
        providers: 38,
        avgSafety: 73.4,
        avgPreventive: 70.8,
        screeningCompliance: 79.4,
        highRiskPrevalence: 19.8,
        adverseEvents: 11.4,
        equityGap: 11.8,
      },
      {
        region: "Midwest & Gascoyne",
        providers: 14,
        avgSafety: 64.8,
        avgPreventive: 62.4,
        screeningCompliance: 68.4,
        highRiskPrevalence: 28.4,
        adverseEvents: 15.8,
        equityGap: 19.4,
      },
      {
        region: "Pilbara & Kimberley",
        providers: 8,
        avgSafety: 58.4,
        avgPreventive: 55.8,
        screeningCompliance: 61.4,
        highRiskPrevalence: 34.8,
        adverseEvents: 20.4,
        equityGap: 26.4,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 72.4, benchmark: 76.2 },
      { dimension: "Preventive", score: 70.2, benchmark: 73.8 },
      { dimension: "Experience", score: 75.8, benchmark: 75.0 },
      { dimension: "Equity", score: 60.4, benchmark: 70.0 },
      { dimension: "Data Quality", score: 78.8, benchmark: 80.0 },
      { dimension: "Compliance", score: 82.4, benchmark: 82.0 },
    ],
  },
  TAS: {
    regions: [
      {
        region: "Greater Hobart",
        providers: 42,
        avgSafety: 78.4,
        avgPreventive: 76.8,
        screeningCompliance: 87.4,
        highRiskPrevalence: 14.2,
        adverseEvents: 7.2,
        equityGap: 5.8,
      },
      {
        region: "Launceston & North East",
        providers: 28,
        avgSafety: 75.2,
        avgPreventive: 73.4,
        screeningCompliance: 83.8,
        highRiskPrevalence: 17.4,
        adverseEvents: 8.8,
        equityGap: 8.4,
      },
      {
        region: "West & North West",
        providers: 18,
        avgSafety: 70.8,
        avgPreventive: 68.4,
        screeningCompliance: 76.4,
        highRiskPrevalence: 22.4,
        adverseEvents: 11.8,
        equityGap: 13.8,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 76.4, benchmark: 76.2 },
      { dimension: "Preventive", score: 74.8, benchmark: 73.8 },
      { dimension: "Experience", score: 79.2, benchmark: 75.0 },
      { dimension: "Equity", score: 66.8, benchmark: 70.0 },
      { dimension: "Data Quality", score: 83.4, benchmark: 80.0 },
      { dimension: "Compliance", score: 86.2, benchmark: 82.0 },
    ],
  },
  NT: {
    regions: [
      {
        region: "Darwin & Palmerston",
        providers: 18,
        avgSafety: 68.4,
        avgPreventive: 65.8,
        screeningCompliance: 71.4,
        highRiskPrevalence: 24.8,
        adverseEvents: 14.8,
        equityGap: 18.4,
      },
      {
        region: "Alice Springs & Central",
        providers: 8,
        avgSafety: 58.8,
        avgPreventive: 55.4,
        screeningCompliance: 62.4,
        highRiskPrevalence: 34.2,
        adverseEvents: 19.8,
        equityGap: 28.4,
      },
      {
        region: "Katherine & Remote",
        providers: 5,
        avgSafety: 52.4,
        avgPreventive: 49.8,
        screeningCompliance: 55.8,
        highRiskPrevalence: 41.8,
        adverseEvents: 24.4,
        equityGap: 34.8,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 62.4, benchmark: 76.2 },
      { dimension: "Preventive", score: 59.8, benchmark: 73.8 },
      { dimension: "Experience", score: 66.4, benchmark: 75.0 },
      { dimension: "Equity", score: 48.4, benchmark: 70.0 },
      { dimension: "Data Quality", score: 68.2, benchmark: 80.0 },
      { dimension: "Compliance", score: 71.8, benchmark: 82.0 },
    ],
  },
  ACT: {
    regions: [
      {
        region: "Canberra North",
        providers: 14,
        avgSafety: 80.8,
        avgPreventive: 79.4,
        screeningCompliance: 90.4,
        highRiskPrevalence: 12.4,
        adverseEvents: 6.8,
        equityGap: 4.2,
      },
      {
        region: "Canberra South",
        providers: 12,
        avgSafety: 79.4,
        avgPreventive: 78.2,
        screeningCompliance: 89.8,
        highRiskPrevalence: 13.2,
        adverseEvents: 7.2,
        equityGap: 4.8,
      },
      {
        region: "Queanbeyan & Surrounds",
        providers: 8,
        avgSafety: 76.8,
        avgPreventive: 75.4,
        screeningCompliance: 86.4,
        highRiskPrevalence: 15.8,
        adverseEvents: 8.4,
        equityGap: 6.4,
      },
    ],
    radarProfile: [
      { dimension: "Safety", score: 80.2, benchmark: 76.2 },
      { dimension: "Preventive", score: 78.8, benchmark: 73.8 },
      { dimension: "Experience", score: 82.4, benchmark: 75.0 },
      { dimension: "Equity", score: 70.8, benchmark: 70.0 },
      { dimension: "Data Quality", score: 88.4, benchmark: 80.0 },
      { dimension: "Compliance", score: 90.2, benchmark: 82.0 },
    ],
  },
};

export const MOCK_SCORECARDS = (providerId: string) => {
  const d = getProviderDomainStarScores(providerId);
  const latestOverall = domainScoresToOverallPercent(d);
  const q = overallStarsToQuintile(latestOverall);

  // Build 4 quarters with a slight regression for earlier quarters (each step back ~3pts)
  const quarters = ["Q1-2025", "Q2-2025", "Q3-2025", "Q4-2025"];
  return quarters.map((quarter, i) => {
    const step = (3 - i) * 3; // Q4 = 0, Q3 = 3, Q2 = 6, Q1 = 9 pts lower
    const clamp = (v: number) =>
      Math.min(95, Math.max(10, Math.round(v - step)));
    const safety = clamp(starsToPercentScore(d.safety));
    const preventive = clamp(starsToPercentScore(d.preventive));
    const quality = clamp(starsToPercentScore(d.quality));
    const staffing = clamp(starsToPercentScore(d.staffing));
    const compliance = clamp(starsToPercentScore(d.compliance));
    const experience = clamp(starsToPercentScore(d.experience));
    const equity = clamp(starsToPercentScore(d.safety)); // proxy equity from safety domain
    const overallScore = clamp(latestOverall);
    // Quintile improves toward Q4 for most providers
    const quintileRank = Math.min(5, Math.max(1, q + (3 - i)));
    return {
      quarter,
      overallScore,
      safetyScore: safety,
      preventiveScore: preventive,
      experienceScore: experience,
      equityScore: equity,
      qualityScore: quality,
      staffingScore: staffing,
      complianceScore: compliance,
      quintileRank,
      id: `SC-${providerId}-${i}`,
      providerId,
    };
  });
};

// Per-provider indicator profiles keyed by numeric seed (provider suffix)
type ProviderProfile = {
  safetyQ: number;
  safetyTrend: "improving" | "stable" | "declining";
  preventiveQ: number;
  preventiveTrend: "improving" | "stable" | "declining";
  experienceQ: number;
  experienceTrend: "improving" | "stable" | "declining";
  equityQ: number;
  equityTrend: "improving" | "stable" | "declining";
  qualityQ: number;
  qualityTrend: "improving" | "stable" | "declining";
  staffingQ: number;
  staffingTrend: "improving" | "stable" | "declining";
  complianceQ: number;
  complianceTrend: "improving" | "stable" | "declining";
};

const PROVIDER_PROFILES: Record<number, ProviderProfile> = {
  // PROV-001 Sunridge: Strong safety, weak preventive
  1: {
    safetyQ: 2,
    safetyTrend: "improving",
    preventiveQ: 4,
    preventiveTrend: "stable",
    experienceQ: 2,
    experienceTrend: "stable",
    equityQ: 2,
    equityTrend: "improving",
    qualityQ: 3,
    qualityTrend: "stable",
    staffingQ: 2,
    staffingTrend: "stable",
    complianceQ: 2,
    complianceTrend: "improving",
  },
  // PROV-002 Bayside: Weak safety, excellent staffing
  2: {
    safetyQ: 4,
    safetyTrend: "declining",
    preventiveQ: 3,
    preventiveTrend: "stable",
    experienceQ: 3,
    experienceTrend: "stable",
    equityQ: 3,
    equityTrend: "stable",
    qualityQ: 3,
    qualityTrend: "stable",
    staffingQ: 1,
    staffingTrend: "improving",
    complianceQ: 2,
    complianceTrend: "stable",
  },
  // PROV-003 Central QLD: Poor performer across the board
  3: {
    safetyQ: 4,
    safetyTrend: "declining",
    preventiveQ: 5,
    preventiveTrend: "declining",
    experienceQ: 4,
    experienceTrend: "declining",
    equityQ: 4,
    equityTrend: "stable",
    qualityQ: 4,
    qualityTrend: "declining",
    staffingQ: 4,
    staffingTrend: "declining",
    complianceQ: 5,
    complianceTrend: "declining",
  },
  // PROV-004 Adelaide: Balanced average performer
  4: {
    safetyQ: 3,
    safetyTrend: "stable",
    preventiveQ: 3,
    preventiveTrend: "stable",
    experienceQ: 2,
    experienceTrend: "stable",
    equityQ: 3,
    equityTrend: "improving",
    qualityQ: 3,
    qualityTrend: "stable",
    staffingQ: 3,
    staffingTrend: "stable",
    complianceQ: 2,
    complianceTrend: "improving",
  },
  // PROV-005 Perth Metro: Excellent top performer
  5: {
    safetyQ: 1,
    safetyTrend: "improving",
    preventiveQ: 1,
    preventiveTrend: "improving",
    experienceQ: 1,
    experienceTrend: "improving",
    equityQ: 2,
    equityTrend: "improving",
    qualityQ: 1,
    qualityTrend: "improving",
    staffingQ: 1,
    staffingTrend: "improving",
    complianceQ: 1,
    complianceTrend: "improving",
  },
  // PROV-006 Hobart: Good safety + strong compliance
  6: {
    safetyQ: 2,
    safetyTrend: "stable",
    preventiveQ: 3,
    preventiveTrend: "stable",
    experienceQ: 3,
    experienceTrend: "stable",
    equityQ: 3,
    equityTrend: "stable",
    qualityQ: 2,
    qualityTrend: "stable",
    staffingQ: 3,
    staffingTrend: "stable",
    complianceQ: 1,
    complianceTrend: "stable",
  },
  // PROV-007 Darwin: Worst performer, all declining
  7: {
    safetyQ: 5,
    safetyTrend: "declining",
    preventiveQ: 5,
    preventiveTrend: "declining",
    experienceQ: 5,
    experienceTrend: "declining",
    equityQ: 5,
    equityTrend: "declining",
    qualityQ: 5,
    qualityTrend: "declining",
    staffingQ: 5,
    staffingTrend: "declining",
    complianceQ: 5,
    complianceTrend: "declining",
  },
  // PROV-008 ACT: Solid performer, mostly Q2
  8: {
    safetyQ: 2,
    safetyTrend: "improving",
    preventiveQ: 2,
    preventiveTrend: "improving",
    experienceQ: 2,
    experienceTrend: "improving",
    equityQ: 2,
    equityTrend: "stable",
    qualityQ: 2,
    qualityTrend: "improving",
    staffingQ: 2,
    staffingTrend: "stable",
    complianceQ: 2,
    complianceTrend: "improving",
  },
  // PROV-009 Hunter Valley: Weak safety + preventive, clinical issues
  9: {
    safetyQ: 4,
    safetyTrend: "stable",
    preventiveQ: 4,
    preventiveTrend: "declining",
    experienceQ: 3,
    experienceTrend: "stable",
    equityQ: 3,
    equityTrend: "stable",
    qualityQ: 4,
    qualityTrend: "stable",
    staffingQ: 3,
    staffingTrend: "stable",
    complianceQ: 4,
    complianceTrend: "declining",
  },
  // PROV-010 Geelong: Moderate balanced
  10: {
    safetyQ: 2,
    safetyTrend: "stable",
    preventiveQ: 3,
    preventiveTrend: "stable",
    experienceQ: 2,
    experienceTrend: "improving",
    equityQ: 2,
    equityTrend: "stable",
    qualityQ: 3,
    qualityTrend: "stable",
    staffingQ: 2,
    staffingTrend: "improving",
    complianceQ: 2,
    complianceTrend: "stable",
  },
};

const DEFAULT_PROFILE: ProviderProfile = {
  safetyQ: 3,
  safetyTrend: "stable",
  preventiveQ: 3,
  preventiveTrend: "stable",
  experienceQ: 3,
  experienceTrend: "stable",
  equityQ: 3,
  equityTrend: "stable",
  qualityQ: 3,
  qualityTrend: "stable",
  staffingQ: 3,
  staffingTrend: "stable",
  complianceQ: 3,
  complianceTrend: "stable",
};

// Inline quintile-to-star converter (avoids circular dep with ratingEngine)
function qToStars(q: number, trend: string): number {
  const base = [5, 4, 3, 2, 1][q - 1] ?? 3;
  const adj = trend === "improving" ? 0.2 : trend === "declining" ? -0.2 : 0;
  return Math.min(5, Math.max(1, base + adj));
}

// Returns all 6 domain star scores for a given provider
export function getProviderDomainStarScores(providerId: string): {
  safety: number;
  preventive: number;
  quality: number;
  staffing: number;
  compliance: number;
  experience: number;
} {
  const match = providerId.match(/(\d+)$/);
  const seed = match ? Number.parseInt(match[1], 10) : 0;
  const p = PROVIDER_PROFILES[seed] ?? DEFAULT_PROFILE;
  return {
    safety: qToStars(p.safetyQ, p.safetyTrend),
    preventive: qToStars(p.preventiveQ, p.preventiveTrend),
    quality: qToStars(p.qualityQ, p.qualityTrend),
    staffing: qToStars(p.staffingQ, p.staffingTrend),
    compliance: qToStars(p.complianceQ, p.complianceTrend),
    experience: qToStars(p.experienceQ, p.experienceTrend),
  };
}

// Weighted overall score → percentage (0–100)
function domainScoresToOverallPercent(domains: {
  safety: number;
  preventive: number;
  quality: number;
  staffing: number;
  compliance: number;
  experience: number;
}): number {
  // domains are still 1-5 star values from getProviderDomainStarScores
  const asPercent = {
    safety: starsToPercentScore(domains.safety),
    preventive: starsToPercentScore(domains.preventive),
    quality: starsToPercentScore(domains.quality),
    staffing: starsToPercentScore(domains.staffing),
    compliance: starsToPercentScore(domains.compliance),
    experience: starsToPercentScore(domains.experience),
  };
  return Math.round(calcNewWeightedOverallScore(asPercent));
}

// Quintile rank from overall star score
function overallStarsToQuintile(overallPct: number): number {
  if (overallPct >= 74) return 1;
  if (overallPct >= 62) return 2;
  if (overallPct >= 50) return 3;
  if (overallPct >= 38) return 4;
  return 5;
}

// Rate values scaled by quintile: worse quintile → higher adverse rates / lower completion rates
function safetyRate(
  base: number,
  q: number,
  scale: "lower_is_better" | "higher_is_better",
): number {
  const qFactor: Record<number, number> = {
    1: 0.65,
    2: 0.82,
    3: 1.0,
    4: 1.22,
    5: 1.55,
  };
  const f = qFactor[q] ?? 1.0;
  return scale === "lower_is_better"
    ? Number.parseFloat((base * f).toFixed(1))
    : Number.parseFloat((base / f).toFixed(1));
}

export const MOCK_INDICATORS = (providerId: string) => {
  const match = providerId.match(/(\d+)$/);
  const seed = match ? Number.parseInt(match[1], 10) : 0;
  const profile = PROVIDER_PROFILES[seed] ?? DEFAULT_PROFILE;

  const {
    safetyQ,
    safetyTrend,
    preventiveQ,
    preventiveTrend,
    experienceQ,
    experienceTrend,
    equityQ,
    equityTrend,
    qualityQ,
    qualityTrend,
    staffingQ,
    staffingTrend,
    complianceQ,
    complianceTrend,
  } = profile;

  return [
    {
      id: `IND-${providerId}-1`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Safety",
      indicatorCode: "SAF-001",
      indicatorName: "Falls with Harm Rate",
      rate: safetyRate(4.2, safetyQ, "lower_is_better"),
      nationalBenchmark: 5.1,
      quintileRank: safetyQ,
      trend: safetyTrend,
    },
    {
      id: `IND-${providerId}-2`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Safety",
      indicatorCode: "SAF-002",
      indicatorName: "Medication-Related Harm",
      rate: safetyRate(2.8, safetyQ, "lower_is_better"),
      nationalBenchmark: 3.2,
      quintileRank: safetyQ,
      trend: safetyTrend,
    },
    {
      id: `IND-${providerId}-3`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Safety",
      indicatorCode: "SAF-003",
      indicatorName: "High-Risk Medication Prevalence",
      rate: safetyRate(18.4, safetyQ, "lower_is_better"),
      nationalBenchmark: 21.2,
      quintileRank: safetyQ,
      trend: safetyTrend,
    },
    {
      id: `IND-${providerId}-4`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Safety",
      indicatorCode: "SAF-004",
      indicatorName: "Polypharmacy ≥10 Medications",
      rate: safetyRate(12.1, safetyQ, "lower_is_better"),
      nationalBenchmark: 14.8,
      quintileRank: safetyQ,
      trend: safetyTrend,
    },
    {
      id: `IND-${providerId}-5`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Safety",
      indicatorCode: "SAF-005",
      indicatorName: "Pressure Injuries Stage 2–4",
      rate: safetyRate(1.8, safetyQ, "lower_is_better"),
      nationalBenchmark: 2.4,
      quintileRank: safetyQ,
      trend: safetyTrend,
    },
    {
      id: `IND-${providerId}-6`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Safety",
      indicatorCode: "SAF-006",
      indicatorName: "ED Presentations (30-day)",
      rate: safetyRate(8.4, safetyQ, "lower_is_better"),
      nationalBenchmark: 10.2,
      quintileRank: safetyQ,
      trend: safetyTrend,
    },
    {
      id: `IND-${providerId}-7`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Preventive",
      indicatorCode: "PRV-001",
      indicatorName: "Falls Risk Screening Completion",
      rate: safetyRate(94.2, preventiveQ, "higher_is_better"),
      nationalBenchmark: 88.4,
      quintileRank: preventiveQ,
      trend: preventiveTrend,
    },
    {
      id: `IND-${providerId}-8`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Preventive",
      indicatorCode: "PRV-002",
      indicatorName: "Depression Screening (GDS/PHQ-9)",
      rate: safetyRate(88.4, preventiveQ, "higher_is_better"),
      nationalBenchmark: 82.1,
      quintileRank: preventiveQ,
      trend: preventiveTrend,
    },
    {
      id: `IND-${providerId}-9`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Preventive",
      indicatorCode: "PRV-003",
      indicatorName: "Malnutrition Screening",
      rate: safetyRate(91.2, preventiveQ, "higher_is_better"),
      nationalBenchmark: 85.8,
      quintileRank: preventiveQ,
      trend: preventiveTrend,
    },
    {
      id: `IND-${providerId}-10`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Preventive",
      indicatorCode: "PRV-004",
      indicatorName: "Oral Health Assessment",
      rate: safetyRate(82.4, preventiveQ, "higher_is_better"),
      nationalBenchmark: 78.4,
      quintileRank: preventiveQ,
      trend: preventiveTrend,
    },
    {
      id: `IND-${providerId}-11`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Experience",
      indicatorCode: "EXP-001",
      indicatorName: "Complaint Rate",
      rate: safetyRate(3.2, experienceQ, "lower_is_better"),
      nationalBenchmark: 4.8,
      quintileRank: experienceQ,
      trend: experienceTrend,
    },
    {
      id: `IND-${providerId}-12`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Experience",
      indicatorCode: "EXP-002",
      indicatorName: "Satisfaction Survey Score",
      rate: safetyRate(84.8, experienceQ, "higher_is_better"),
      nationalBenchmark: 80.2,
      quintileRank: experienceQ,
      trend: experienceTrend,
    },
    {
      id: `IND-${providerId}-13`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Experience",
      indicatorCode: "EXP-003",
      indicatorName: "Social Engagement Rate",
      rate: safetyRate(72.4, experienceQ, "higher_is_better"),
      nationalBenchmark: 68.8,
      quintileRank: experienceQ,
      trend: experienceTrend,
    },
    {
      id: `IND-${providerId}-14`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Equity",
      indicatorCode: "EQT-001",
      indicatorName: "Referral-to-Placement Time (days)",
      rate: safetyRate(18.4, equityQ, "lower_is_better"),
      nationalBenchmark: 22.8,
      quintileRank: equityQ,
      trend: equityTrend,
    },
    {
      id: `IND-${providerId}-15`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Equity",
      indicatorCode: "EQT-002",
      indicatorName: "CALD Access Gap",
      rate: safetyRate(8.4, equityQ, "lower_is_better"),
      nationalBenchmark: 12.2,
      quintileRank: equityQ,
      trend: equityTrend,
    },
    {
      id: `IND-${providerId}-16`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Quality",
      indicatorCode: "QM-001",
      indicatorName: "Satisfaction Survey Score",
      rate: safetyRate(84.8, qualityQ, "higher_is_better"),
      nationalBenchmark: 80.2,
      quintileRank: qualityQ,
      trend: qualityTrend,
    },
    {
      id: `IND-${providerId}-17`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Quality",
      indicatorCode: "QM-002",
      indicatorName: "Clinical Outcome Score",
      rate: safetyRate(76.4, qualityQ, "higher_is_better"),
      nationalBenchmark: 74.2,
      quintileRank: qualityQ,
      trend: qualityTrend,
    },
    {
      id: `IND-${providerId}-18`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Staffing",
      indicatorCode: "STAFF-001",
      indicatorName: "Registered Nurse Hours per Resident",
      rate: safetyRate(4.8, staffingQ, "higher_is_better"),
      nationalBenchmark: 4.1,
      quintileRank: staffingQ,
      trend: staffingTrend,
    },
    {
      id: `IND-${providerId}-19`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Staffing",
      indicatorCode: "STAFF-002",
      indicatorName: "Staff Retention Rate",
      rate: safetyRate(88.2, staffingQ, "higher_is_better"),
      nationalBenchmark: 82.4,
      quintileRank: staffingQ,
      trend: staffingTrend,
    },
    {
      id: `IND-${providerId}-20`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Compliance",
      indicatorCode: "COMP-001",
      indicatorName: "Accreditation Compliance Score",
      rate: safetyRate(92.4, complianceQ, "higher_is_better"),
      nationalBenchmark: 88.0,
      quintileRank: complianceQ,
      trend: complianceTrend,
    },
    {
      id: `IND-${providerId}-21`,
      providerId,
      quarter: "Q4-2025",
      dimension: "Compliance",
      indicatorCode: "COMP-002",
      indicatorName: "Mandatory Reporting Completeness",
      rate: safetyRate(96.8, complianceQ, "higher_is_better"),
      nationalBenchmark: 92.0,
      quintileRank: complianceQ,
      trend: complianceTrend,
    },
  ];
};

export const PAY_FOR_IMPROVEMENT_DATA = [
  {
    id: "PFI-001",
    provider: "Sunridge Aged Care",
    metric: "ED Reduction 90-Day",
    baseline: 12.4,
    current: 9.8,
    improvement: 21.0,
    threshold: 15.0,
    eligible: true,
    funding: 142000,
  },
  {
    id: "PFI-002",
    provider: "Sunridge Aged Care",
    metric: "Deprescribing Rate",
    baseline: 18.3,
    current: 24.7,
    improvement: 35.0,
    threshold: 20.0,
    eligible: true,
    funding: 89500,
  },
  {
    id: "PFI-003",
    provider: "Perth Metro Seniors Living",
    metric: "Hospitalization Reduction",
    baseline: 8.2,
    current: 7.1,
    improvement: 13.4,
    threshold: 15.0,
    eligible: false,
    funding: 0,
  },
  {
    id: "PFI-004",
    provider: "Perth Metro Seniors Living",
    metric: "Screening Completion",
    baseline: 71.0,
    current: 89.0,
    improvement: 25.4,
    threshold: 20.0,
    eligible: true,
    funding: 78200,
  },
  {
    id: "PFI-005",
    provider: "Bayside Home Care Services",
    metric: "Social Participation",
    baseline: 42.0,
    current: 51.0,
    improvement: 21.4,
    threshold: 15.0,
    eligible: true,
    funding: 54800,
  },
  {
    id: "PFI-006",
    provider: "Adelaide Southern Care",
    metric: "ED Reduction 90-Day",
    baseline: 14.8,
    current: 11.2,
    improvement: 24.3,
    threshold: 15.0,
    eligible: true,
    funding: 98400,
  },
  {
    id: "PFI-007",
    provider: "Central Queensland Aged Care",
    metric: "Hospitalization Reduction",
    baseline: 10.4,
    current: 9.8,
    improvement: 5.8,
    threshold: 15.0,
    eligible: false,
    funding: 0,
  },
  {
    id: "PFI-008",
    provider: "Hunter Valley Care Group",
    metric: "Deprescribing Rate",
    baseline: 15.8,
    current: 21.4,
    improvement: 35.4,
    threshold: 20.0,
    eligible: true,
    funding: 72400,
  },
];

export const PAY_FOR_IMPROVEMENT_THRESHOLDS = [
  {
    metric: "ED Reduction 90-Day",
    threshold: 15.0,
    unit: "% reduction",
    description: "90-day emergency department presentation reduction",
  },
  {
    metric: "Hospitalization Reduction",
    threshold: 15.0,
    unit: "% reduction",
    description: "Unplanned hospitalization reduction",
  },
  {
    metric: "Deprescribing Rate",
    threshold: 20.0,
    unit: "% improvement",
    description: "Reduction in high-risk/unnecessary medications",
  },
  {
    metric: "Screening Completion",
    threshold: 20.0,
    unit: "% point improvement",
    description: "Mandatory screening bundle completion rate",
  },
  {
    metric: "Social Participation",
    threshold: 15.0,
    unit: "% improvement",
    description: "Resident social engagement and activities participation",
  },
];

export const DATA_QUALITY_RECORDS = [
  {
    id: "DQ-2025-001",
    provider: "Sunridge Aged Care",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 1842,
    validationErrors: 0,
    qualityScore: 98.4,
    status: "processed",
    submittedDate: "2025-11-28",
  },
  {
    id: "DQ-2025-002",
    provider: "Perth Metro Seniors Living",
    quarter: "Q4-2025",
    type: "CSV Upload",
    records: 3201,
    validationErrors: 12,
    qualityScore: 96.2,
    status: "processed",
    submittedDate: "2025-11-27",
  },
  {
    id: "DQ-2025-003",
    provider: "Central Queensland Aged Care",
    quarter: "Q4-2025",
    type: "Manual Entry",
    records: 956,
    validationErrors: 47,
    qualityScore: 72.4,
    status: "validation_error",
    submittedDate: "2025-11-26",
  },
  {
    id: "DQ-2025-004",
    provider: "Bayside Home Care Services",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 2104,
    validationErrors: 3,
    qualityScore: 97.8,
    status: "processed",
    submittedDate: "2025-11-25",
  },
  {
    id: "DQ-2025-005",
    provider: "Adelaide Southern Care",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 1578,
    validationErrors: 8,
    qualityScore: 94.8,
    status: "processed",
    submittedDate: "2025-11-24",
  },
  {
    id: "DQ-2025-006",
    provider: "Hobart Community Aged Care",
    quarter: "Q4-2025",
    type: "CSV Upload",
    records: 842,
    validationErrors: 28,
    qualityScore: 81.2,
    status: "processed",
    submittedDate: "2025-11-23",
  },
  {
    id: "DQ-2025-007",
    provider: "Darwin Territory Care",
    quarter: "Q4-2025",
    type: "CSV Upload",
    records: 421,
    validationErrors: 84,
    qualityScore: 68.4,
    status: "validation_error",
    submittedDate: "2025-11-22",
  },
  {
    id: "DQ-2025-008",
    provider: "ACT Aged Services",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 1248,
    validationErrors: 2,
    qualityScore: 99.1,
    status: "processed",
    submittedDate: "2025-11-21",
  },
  {
    id: "DQ-2025-009",
    provider: "Hunter Valley Care Group",
    quarter: "Q4-2025",
    type: "FHIR API",
    records: 1924,
    validationErrors: 6,
    qualityScore: 96.8,
    status: "processed",
    submittedDate: "2025-11-20",
  },
  {
    id: "DQ-2025-010",
    provider: "Geelong Aged Care Network",
    quarter: "Q4-2025",
    type: "CSV Upload",
    records: 688,
    validationErrors: 18,
    qualityScore: 88.4,
    status: "validating",
    submittedDate: "2025-11-19",
  },
];

export const MOCK_HIGH_RISK_COHORTS = [
  {
    id: "HRC-001",
    providerId: "PROV-001",
    riskCriteria: "recent_hospital_discharge,polypharmacy_80plus",
    cohortSize: 12,
    flagDate: new Date("2025-11-20").getTime(),
    status: "active",
    urgency: "high",
  },
  {
    id: "HRC-002",
    providerId: "PROV-003",
    riskCriteria: "falls_history,dementia_bpsd",
    cohortSize: 8,
    flagDate: new Date("2025-11-18").getTime(),
    status: "active",
    urgency: "high",
  },
  {
    id: "HRC-003",
    providerId: "PROV-005",
    riskCriteria: "frailty_threshold,comorbidities_3plus",
    cohortSize: 23,
    flagDate: new Date("2025-11-15").getTime(),
    status: "monitoring",
    urgency: "medium",
  },
  {
    id: "HRC-004",
    providerId: "PROV-007",
    riskCriteria: "polypharmacy_80plus",
    cohortSize: 5,
    flagDate: new Date("2025-11-12").getTime(),
    status: "active",
    urgency: "high",
  },
  {
    id: "HRC-005",
    providerId: "PROV-002",
    riskCriteria: "recent_hospital_discharge",
    cohortSize: 14,
    flagDate: new Date("2025-11-10").getTime(),
    status: "monitoring",
    urgency: "medium",
  },
  {
    id: "HRC-006",
    providerId: "PROV-004",
    riskCriteria: "falls_history",
    cohortSize: 7,
    flagDate: new Date("2025-11-05").getTime(),
    status: "resolved",
    urgency: "low",
  },
  {
    id: "HRC-007",
    providerId: "PROV-009",
    riskCriteria: "dementia_bpsd,comorbidities_3plus",
    cohortSize: 18,
    flagDate: new Date("2025-11-28").getTime(),
    status: "active",
    urgency: "high",
  },
  {
    id: "HRC-008",
    providerId: "PROV-010",
    riskCriteria: "frailty_threshold",
    cohortSize: 9,
    flagDate: new Date("2025-11-25").getTime(),
    status: "monitoring",
    urgency: "medium",
  },
];

export const MOCK_SCREENING_WORKFLOWS = [
  {
    id: "WF-001",
    providerId: "PROV-001",
    screeningType: "falls_risk_assessment",
    dueDate: new Date("2025-12-01").getTime(),
    status: "overdue",
    completionTimeHours: 0,
  },
  {
    id: "WF-002",
    providerId: "PROV-001",
    screeningType: "medication_review",
    dueDate: new Date("2025-12-05").getTime(),
    status: "in_progress",
    completionTimeHours: 0,
  },
  {
    id: "WF-003",
    providerId: "PROV-002",
    screeningType: "cognitive_assessment",
    dueDate: new Date("2025-11-28").getTime(),
    status: "completed",
    completionTimeHours: 48.5,
  },
  {
    id: "WF-004",
    providerId: "PROV-003",
    screeningType: "nutritional_review",
    dueDate: new Date("2025-11-25").getTime(),
    status: "overdue",
    completionTimeHours: 0,
  },
  {
    id: "WF-005",
    providerId: "PROV-004",
    screeningType: "pain_assessment",
    dueDate: new Date("2025-12-10").getTime(),
    status: "pending",
    completionTimeHours: 0,
  },
  {
    id: "WF-006",
    providerId: "PROV-005",
    screeningType: "behavioral_assessment",
    dueDate: new Date("2025-12-08").getTime(),
    status: "in_progress",
    completionTimeHours: 0,
  },
  {
    id: "WF-007",
    providerId: "PROV-006",
    screeningType: "advance_care_planning",
    dueDate: new Date("2025-11-30").getTime(),
    status: "completed",
    completionTimeHours: 72.0,
  },
  {
    id: "WF-008",
    providerId: "PROV-007",
    screeningType: "falls_risk_assessment",
    dueDate: new Date("2025-11-22").getTime(),
    status: "overdue",
    completionTimeHours: 0,
  },
  {
    id: "WF-009",
    providerId: "PROV-008",
    screeningType: "medication_review",
    dueDate: new Date("2025-12-12").getTime(),
    status: "pending",
    completionTimeHours: 0,
  },
  {
    id: "WF-010",
    providerId: "PROV-009",
    screeningType: "cognitive_assessment",
    dueDate: new Date("2025-12-03").getTime(),
    status: "in_progress",
    completionTimeHours: 0,
  },
  {
    id: "WF-011",
    providerId: "PROV-010",
    screeningType: "nutritional_review",
    dueDate: new Date("2025-11-29").getTime(),
    status: "completed",
    completionTimeHours: 36.0,
  },
  {
    id: "WF-012",
    providerId: "PROV-003",
    screeningType: "behavioral_assessment",
    dueDate: new Date("2025-11-20").getTime(),
    status: "overdue",
    completionTimeHours: 0,
  },
];

export const MOCK_AUDIT_LOGS = [
  {
    id: "AL-001",
    userId: "USR-REG-0142",
    userRole: "Regulator",
    action: "VIEW_SCORECARD",
    entityType: "ProviderScorecard",
    timestamp: new Date("2025-11-28T14:23:11").getTime(),
    details: "Accessed Q4-2025 scorecard for Sunridge Aged Care",
  },
  {
    id: "AL-002",
    userId: "USR-PRV-0089",
    userRole: "Provider",
    action: "SUBMIT_DATA",
    entityType: "DataSubmission",
    timestamp: new Date("2025-11-28T11:45:02").getTime(),
    details: "Submitted Q4-2025 FHIR data batch (1842 records)",
  },
  {
    id: "AL-003",
    userId: "USR-REG-0142",
    userRole: "Regulator",
    action: "FLAG_COHORT",
    entityType: "HighRiskCohort",
    timestamp: new Date("2025-11-27T16:32:44").getTime(),
    details: "Flagged high-risk cohort HRC-007 for Hunter Valley Care Group",
  },
  {
    id: "AL-004",
    userId: "USR-POL-0031",
    userRole: "Policy Analyst",
    action: "EXPORT_REPORT",
    entityType: "NationalReport",
    timestamp: new Date("2025-11-27T09:18:33").getTime(),
    details: "Exported Q3-2025 National Overview report (PDF)",
  },
  {
    id: "AL-005",
    userId: "USR-PRV-0124",
    userRole: "Provider",
    action: "UPDATE_SCREENING",
    entityType: "ScreeningWorkflow",
    timestamp: new Date("2025-11-26T15:44:18").getTime(),
    details: "Marked WF-003 cognitive assessment as complete",
  },
  {
    id: "AL-006",
    userId: "USR-REG-0208",
    userRole: "Regulator",
    action: "VIEW_AUDIT_LOG",
    entityType: "AuditLog",
    timestamp: new Date("2025-11-26T10:22:07").getTime(),
    details: "Accessed audit log for period 2025-11-01 to 2025-11-26",
  },
  {
    id: "AL-007",
    userId: "USR-PRV-0089",
    userRole: "Provider",
    action: "UPDATE_SCREENING",
    entityType: "ScreeningWorkflow",
    timestamp: new Date("2025-11-25T14:11:55").getTime(),
    details: "Updated medication review WF-002 to in_progress",
  },
  {
    id: "AL-008",
    userId: "USR-POL-0055",
    userRole: "Policy Analyst",
    action: "VIEW_HEATMAP",
    entityType: "RegionalHeatmap",
    timestamp: new Date("2025-11-25T09:04:28").getTime(),
    details: "Accessed NT regional heatmap analysis",
  },
  {
    id: "AL-009",
    userId: "SYS-BATCH",
    userRole: "System",
    action: "GENERATE_SCORECARDS",
    entityType: "ProviderScorecard",
    timestamp: new Date("2025-11-24T02:00:00").getTime(),
    details: "Automated Q4-2025 scorecard generation for 2,743 providers",
  },
  {
    id: "AL-010",
    userId: "USR-REG-0142",
    userRole: "Regulator",
    action: "VIEW_HIGH_RISK",
    entityType: "HighRiskCohort",
    timestamp: new Date("2025-11-23T16:48:22").getTime(),
    details: "Reviewed all active high-risk cohorts",
  },
];

// ── Regional Provider Drill-Down ──────────────────────────────────────────────

export interface CityProvider {
  id: string;
  name: string;
  city: string;
  type: string; // "Residential" | "Home Care" | "Day Care"
  beds?: number;
  established: number;
  indicators: {
    residents: number;
    staffing: number;
    qualityMeasures: number;
    compliance: number;
    safetyClinical: number;
    preventiveCare: number;
    experience: number;
    equity: number;
  };
  indicatorMeta?: {
    [key: string]: {
      trend: "improving" | "declining" | "stable";
      insight: string;
    };
  };
}

export const CITY_PROVIDERS: Record<string, CityProvider[]> = {
  // ── Sydney: 3 providers — HIGH / LOW / HIGH (5★, 1★, 5★) ──────────────────
  Sydney: [
    {
      // HIGH performer: strong across all domains — Overall ~5★
      id: "SYD-001",
      name: "Bondi Aged Care",
      city: "Sydney",
      type: "Residential",
      beds: 95,
      established: 2008,
      indicators: {
        residents: 4.7,
        staffing: 4.6,
        qualityMeasures: 4.8,
        compliance: 4.9,
        safetyClinical: 4.8,
        preventiveCare: 4.7,
        experience: 4.8,
        equity: 4.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is consistently excellent. Satisfaction survey results place this provider in the top quintile nationally.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are outstanding. All positions are filled with qualified staff and retention is above 92%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are exemplary, reflecting a culture of continuous improvement across all care domains.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance with all ACQSC standards. No outstanding notices or conditions.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is significantly below regional benchmark. Medication incidents are rare.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion rates are among the highest in the region. All mandatory bundles are on track.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is outstanding with very low complaint rates and strong social engagement.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access performance is strong. First Nations and CALD community access gaps are well-managed.",
        },
      },
    },
    {
      // LOW performer: critically weak safety, poor staffing, poor preventive — Overall ~1★
      id: "SYD-002",
      name: "Northern Beaches Elder Support",
      city: "Sydney",
      type: "Home Care",
      established: 2014,
      indicators: {
        residents: 1.8,
        staffing: 1.4,
        qualityMeasures: 1.6,
        compliance: 2.0,
        safetyClinical: 1.2,
        preventiveCare: 1.3,
        experience: 1.7,
        equity: 2.1,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "⚠ Resident Experience is critically below standard. High complaint volumes and unresolved grievances are ongoing.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing levels are critically below minimum thresholds. High turnover and unfilled clinical positions are severely impacting care delivery.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "⚠ Quality Measures are significantly below acceptable range. Immediate improvement plan is required.",
        },
        compliance: {
          trend: "declining",
          insight:
            "⚠ Multiple compliance notices outstanding. Provider is subject to enhanced monitoring by the regulator.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Falls with harm rate is 3× the national benchmark. Medication-related incidents are critically above threshold. Urgent intervention required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is critically low at under 35% nationally. Falls risk, depression, and malnutrition screenings are all overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "⚠ Resident experience scores are in the bottom quintile nationally. Complaint rates are 4× the regional average.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access performance is poor. Referral-to-placement time significantly exceeds the national benchmark.",
        },
      },
    },
    {
      // HIGH performer: 5★ — strong safety, excellent compliance — Overall ~5★
      id: "SYD-003",
      name: "Harbour View Care Centre",
      city: "Sydney",
      type: "Residential",
      beds: 120,
      established: 2005,
      indicators: {
        residents: 4.8,
        staffing: 4.9,
        qualityMeasures: 4.7,
        compliance: 5.0,
        safetyClinical: 4.9,
        preventiveCare: 4.6,
        experience: 4.8,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is exceptional. Satisfaction surveys show 96% positive ratings across all care domains.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing coverage is outstanding. All clinical positions filled; staff retention at 95%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are at the highest level. Continuous improvement processes are embedded in daily care.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance across all ACQSC standards. This provider is a national benchmark for regulatory compliance.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are exemplary. Falls harm rate is the lowest in the region. Zero medication-related serious incidents reported.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion at 97%. All mandatory bundles completed ahead of schedule.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is outstanding. Complaint rate is negligible and all resolved within 24 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access performance is strong. No measurable CALD access gap. Interpreter services fully embedded.",
        },
      },
    },
    {
      // HIGH performer: strong safety + coastal community focus
      id: "SYD-004",
      name: "Manly Aged Care Services",
      city: "Sydney",
      type: "Residential",
      beds: 95,
      established: 2005,
      indicators: {
        residents: 4.5,
        staffing: 4.3,
        qualityMeasures: 4.4,
        compliance: 4.6,
        safetyClinical: 4.5,
        preventiveCare: 4.3,
        experience: 4.4,
        equity: 4.1,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction scores are excellent. Regular community engagement activities drive high participation.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing levels are above benchmark. Low turnover and strong team culture.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "✅ Quality Measures are consistently above benchmark. Continuous improvement embedded in care planning.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full regulatory compliance maintained across all ACQSC standards.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is well below regional benchmark. Medication review processes are robust.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion at 94%. All mandatory bundles on schedule.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are strong. Complaint resolution averages under 48 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD support services are available and monitored.",
        },
      },
    },
    {
      // MEDIUM performer: stable with some weaknesses
      id: "SYD-005",
      name: "Parramatta Care Centre",
      city: "Sydney",
      type: "Residential",
      beds: 120,
      established: 1998,
      indicators: {
        residents: 3.4,
        staffing: 3.2,
        qualityMeasures: 3.5,
        compliance: 3.6,
        safetyClinical: 3.3,
        preventiveCare: 2.9,
        experience: 3.2,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience meets minimum acceptable standards. Satisfaction surveys show room for improvement.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are at minimum benchmark. Recruitment challenges are ongoing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are within acceptable range. Some indicators require closer monitoring.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor observations noted in last audit with corrective actions in progress.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance meets minimum standards. Falls prevention plan is active.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is below benchmark. Cognitive and oral health assessments are overdue.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint resolution timelines need improvement.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity monitoring is in place. Access gap data is being collected.",
        },
      },
    },
    {
      // LOW performer: multiple weak indicators
      id: "SYD-006",
      name: "Blacktown Senior Living",
      city: "Sydney",
      type: "Home Care",
      beds: 60,
      established: 2010,
      indicators: {
        residents: 2.3,
        staffing: 2.1,
        qualityMeasures: 2.4,
        compliance: 2.5,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.2,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident experience is well below benchmark. Complaints have increased significantly in recent quarters.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing levels are critically low. High turnover and vacancy rates are impacting care quality.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures are in the lowest quartile nationally. Improvement plan required urgently.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is below minimum standards. Multiple non-conformances identified in audit.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate is critically above benchmark. Immediate safety review is required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening completion is critically low. Mandatory bundles are significantly overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience indicators are in the bottom quartile. Unresolved complaints exceed 30 days.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access gap is measurable. CALD support services are limited.",
        },
      },
    },
    {
      // MEDIUM performer: adequate performance with improvement needed
      id: "SYD-007",
      name: "Penrith Valley Aged Care",
      city: "Sydney",
      type: "Residential",
      beds: 85,
      established: 2003,
      indicators: {
        residents: 3.6,
        staffing: 3.4,
        qualityMeasures: 3.7,
        compliance: 3.8,
        safetyClinical: 3.5,
        preventiveCare: 3.2,
        experience: 3.5,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is adequate. Regular feedback sessions are conducted and actioned.",
        },
        staffing: {
          trend: "improving",
          insight:
            "ℹ Staffing levels are improving. Recent recruitment drive has reduced vacancy rates.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures performance is satisfactory. Targeted improvement initiatives are in place.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Last audit resulted in minor observations only.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Falls prevention protocols are monitored weekly.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Screening bundles are progressively completed.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are adequate. Complaint resolution process is functioning.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Access gap monitoring is ongoing.",
        },
      },
    },
    {
      // MEDIUM performer: stable operations
      id: "SYD-008",
      name: "Campbelltown Care",
      city: "Sydney",
      type: "Day Care",
      beds: 50,
      established: 2012,
      indicators: {
        residents: 3.5,
        staffing: 3.3,
        qualityMeasures: 3.4,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.1,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident feedback is generally positive. Day program participation rates are satisfactory.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is stable. Workforce plan is under review for improvement.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality indicators meet minimum benchmarks. Continuous improvement processes are in place.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Standards are maintained with regular internal audits.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Incident reporting is timely and well-managed.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive screening is meeting minimum completion targets. Further improvement targeted.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience measures are adequate. Client feedback mechanisms are operational.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is being monitored. Interpreter services are available on request.",
        },
      },
    },
    {
      // HIGH performer: excellent compliance and safety
      id: "SYD-009",
      name: "Sutherland Shire Aged Care",
      city: "Sydney",
      type: "Residential",
      beds: 130,
      established: 2000,
      indicators: {
        residents: 4.3,
        staffing: 4.2,
        qualityMeasures: 4.4,
        compliance: 4.5,
        safetyClinical: 4.4,
        preventiveCare: 4.1,
        experience: 4.3,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is well above regional average. Personalised care planning is a strength.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing ratios are above benchmark. Staff satisfaction surveys report high engagement.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are consistently above benchmark. Improvement targets are being met.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is strong. Last full audit resulted in zero non-conformances.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is below benchmark. Medication management protocols are exemplary.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is above benchmark. All priority bundles are completed on time.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are strong. Complaint resolution averages under 72 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is good. CALD support is available and actively promoted.",
        },
      },
    },
    {
      // LOW performer: compliance and safety concerns
      id: "SYD-010",
      name: "Castle Hill Care Centre",
      city: "Sydney",
      type: "Residential",
      beds: 75,
      established: 2015,
      indicators: {
        residents: 2.5,
        staffing: 2.3,
        qualityMeasures: 2.6,
        compliance: 2.2,
        safetyClinical: 2.1,
        preventiveCare: 2.0,
        experience: 2.4,
        equity: 2.5,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident experience scores are in the lowest quartile. Multiple unresolved complaints have been escalated.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing levels are critically below benchmark. Agency staff reliance is high and unsustainable.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures performance is poor. Root cause analysis is outstanding.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is significantly below minimum requirements. Regulatory notice has been issued.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety indicators are critically poor. Serious incident rate is above regional benchmark.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening is at a critical low. Mandatory assessment bundles are overdue by over 90 days.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience metrics are in the bottom quintile. Family and resident feedback is consistently negative.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity monitoring is inadequate. CALD access data is incomplete.",
        },
      },
    },
    {
      // MEDIUM performer: steady performance
      id: "SYD-011",
      name: "Cronulla Senior Living",
      city: "Sydney",
      type: "Home Care",
      beds: 65,
      established: 2008,
      indicators: {
        residents: 3.7,
        staffing: 3.6,
        qualityMeasures: 3.8,
        compliance: 3.9,
        safetyClinical: 3.7,
        preventiveCare: 3.5,
        experience: 3.7,
        equity: 3.4,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident and client satisfaction is above average. Service coordination is a noted strength.",
        },
        staffing: {
          trend: "improving",
          insight:
            "ℹ Staffing levels are improving. New workforce strategy is showing early positive results.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance reviews are conducted quarterly.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. No significant non-conformances in the last two audit cycles.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Home safety assessment completion is above benchmark.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care is improving. Health monitoring programs are being expanded.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are good. Flexible service delivery model contributes to positive client outcomes.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Culturally appropriate services are being developed.",
        },
      },
    },
  ],

  // ── Melbourne: 2 providers — AVERAGE / HIGH (3★, 4★) ───────────────────────
  Melbourne: [
    {
      // AVERAGE performer: mixed — weak preventive, adequate safety — Overall ~3★
      id: "MEL-001",
      name: "Yarra Valley Life Care",
      city: "Melbourne",
      type: "Residential",
      beds: 80,
      established: 2001,
      indicators: {
        residents: 3.1,
        staffing: 2.8,
        qualityMeasures: 3.3,
        compliance: 3.5,
        safetyClinical: 3.2,
        preventiveCare: 1.9,
        experience: 3.0,
        equity: 2.9,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is below average. Survey completion rates are low, limiting data reliability.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing ratios are below regional average. Vacancy rates are elevated across clinical and support roles.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures performance is borderline. Structured improvement planning is recommended.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is within minimum thresholds. One outstanding action item from last audit cycle.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Medication-related risk indicators are above acceptable threshold for this provider. Pharmacist review is overdue.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is critically low. Malnutrition and cognitive assessments are significantly overdue.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are below average. Complaint resolution time exceeds the national benchmark.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is marginal. First Nations and CALD community representation gaps have been identified.",
        },
      },
    },
    {
      // HIGH performer: strong staffing, good safety — Overall ~4★
      id: "MEL-002",
      name: "Southbank Senior Living",
      city: "Melbourne",
      type: "Residential",
      beds: 60,
      established: 1998,
      indicators: {
        residents: 4.2,
        staffing: 4.8,
        qualityMeasures: 4.1,
        compliance: 4.4,
        safetyClinical: 3.9,
        preventiveCare: 3.8,
        experience: 4.3,
        equity: 3.7,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "✅ Resident Experience is strong, reflecting consistent quality care delivery and responsive management.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Excellent staffing coverage. Staff retention rates are the highest in the region and serve as a regional benchmark.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "✅ Quality Measures are performing well with consistent results over four quarters.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance standards are well met. All mandatory reporting is submitted on time.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Falls prevention protocols are in place and monitored.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Screening bundles are being progressively completed across all cohorts.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are above regional average. Resident feedback is consistently positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap monitoring is ongoing.",
        },
      },
    },
    {
      // HIGH performer: strong community engagement
      id: "MEL-003",
      name: "Dandenong Aged Care",
      city: "Melbourne",
      type: "Residential",
      beds: 110,
      established: 2004,
      indicators: {
        residents: 4.4,
        staffing: 4.3,
        qualityMeasures: 4.5,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.2,
        experience: 4.3,
        equity: 4.1,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is above benchmark. Culturally diverse programming is highly regarded.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above benchmark. Workforce retention strategies are effective.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures performance is strong. Continuous improvement culture is embedded.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is excellent. Zero critical non-conformances in the last audit cycle.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are well above benchmark. Falls harm is at its lowest recorded level.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is above benchmark. All priority bundles completed on time.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience scores are strong. Resident and family satisfaction surveys consistently positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. Multilingual staff are available across key care areas.",
        },
      },
    },
    {
      // MEDIUM performer: stable with some areas for improvement
      id: "MEL-004",
      name: "Frankston Senior Living",
      city: "Melbourne",
      type: "Residential",
      beds: 90,
      established: 2006,
      indicators: {
        residents: 3.5,
        staffing: 3.3,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.0,
        experience: 3.4,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction meets minimum standards. Lifestyle programs are available but need expansion.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are at minimum benchmark. Recruitment for specialist roles is ongoing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are within acceptable range. Some indicators require targeted improvement.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor observations from last audit have been actioned.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Falls prevention strategy is in place.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening is below benchmark. Cognitive and nutrition assessments require prioritisation.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are average. Feedback mechanisms are operational but response times could improve.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity monitoring is in place. Access gap data collection is active.",
        },
      },
    },
    {
      // MEDIUM performer: good compliance, weaker safety
      id: "MEL-005",
      name: "Ringwood Care Centre",
      city: "Melbourne",
      type: "Day Care",
      beds: 55,
      established: 2011,
      indicators: {
        residents: 3.3,
        staffing: 3.2,
        qualityMeasures: 3.4,
        compliance: 3.6,
        safetyClinical: 3.0,
        preventiveCare: 3.1,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is adequate. Day program activities are well-received.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is stable. Staff training completion rates are at benchmark.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures meet minimum standards. Review cycle is quarterly.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Regular internal audits support standards maintenance.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Safety indicators have declined slightly. Falls incident rate is approaching the benchmark threshold.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is within range. Health monitoring is active.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience measures are satisfactory. Client feedback is collected and reviewed regularly.",
        },
        equity: {
          trend: "stable",
          insight: "ℹ Equity access performance is acceptable.",
        },
      },
    },
    {
      // HIGH performer: excellent ratings across domains
      id: "MEL-006",
      name: "Box Hill Aged Care",
      city: "Melbourne",
      type: "Residential",
      beds: 150,
      established: 1997,
      indicators: {
        residents: 4.6,
        staffing: 4.5,
        qualityMeasures: 4.7,
        compliance: 4.8,
        safetyClinical: 4.6,
        preventiveCare: 4.4,
        experience: 4.6,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience is in the top quintile nationally. Person-centred care model is well-implemented.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing is excellent. High retention rate and strong professional development culture.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are above benchmark across all domains. Improvement trajectory is consistent.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full regulatory compliance. Recognised as a sector benchmark for governance.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are exemplary. Falls harm is in the lowest decile nationally.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is at 96%. All bundles completed ahead of schedule.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience scores are outstanding. Complaint resolution is within 24 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access is strong. CALD support services are fully embedded.",
        },
      },
    },
    {
      // LOW performer: safety and compliance issues
      id: "MEL-007",
      name: "Footscray Care Services",
      city: "Melbourne",
      type: "Home Care",
      beds: 45,
      established: 2014,
      indicators: {
        residents: 2.2,
        staffing: 2.0,
        qualityMeasures: 2.3,
        compliance: 2.1,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.2,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident and client satisfaction is critically low. Escalated complaints are unresolved.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is critically below benchmark. High vacancy rates are directly impacting care delivery.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures are in the lowest national quartile. Systemic improvement is required.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is significantly below minimum requirements. Regulatory action is under consideration.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety performance is critically poor. Serious incident rate has increased for three consecutive quarters.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening is critically overdue. Immediate prioritisation of assessment bundles is required.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience metrics are in the bottom decile. Complaint and incident linkage review is outstanding.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access data is incomplete. CALD gap analysis is not current.",
        },
      },
    },
    {
      // MEDIUM performer: adequate performance
      id: "MEL-008",
      name: "Essendon Senior Living",
      city: "Melbourne",
      type: "Residential",
      beds: 100,
      established: 2002,
      indicators: {
        residents: 3.8,
        staffing: 3.6,
        qualityMeasures: 3.9,
        compliance: 4.0,
        safetyClinical: 3.8,
        preventiveCare: 3.5,
        experience: 3.8,
        equity: 3.5,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is above average. Care planning is personalised and reviewed regularly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "ℹ Staffing levels are improving. Recruitment strategy is successfully reducing vacancies.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Improvement targets have been set for next quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. Last audit identified only minor administrative observations.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Falls incident review process is active.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving steadily. Assessment bundle completion rates are rising.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are good. Feedback from residents and families is generally positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Culturally appropriate care options are available.",
        },
      },
    },
    {
      // MEDIUM performer: western suburbs operations
      id: "MEL-009",
      name: "Sunshine Aged Care",
      city: "Melbourne",
      type: "Residential",
      beds: 80,
      established: 2009,
      indicators: {
        residents: 3.2,
        staffing: 3.1,
        qualityMeasures: 3.3,
        compliance: 3.4,
        safetyClinical: 3.2,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction meets minimum standards. Multilingual care programs are a noted strength.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is at minimum benchmark. Multilingual staff availability is a positive indicator.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures meet minimum benchmarks. Improvement reviews are scheduled.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Corrective actions from last audit are complete.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Incident reporting is complete and timely.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion meets minimum targets. Further improvement is targeted.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience measures are satisfactory. Culturally diverse activities are well-attended.",
        },
        equity: {
          trend: "improving",
          insight:
            "ℹ Equity access is improving. CALD community engagement is a key program focus.",
        },
      },
    },
    {
      // LOW performer: needs significant improvement
      id: "MEL-010",
      name: "Moonee Valley Care",
      city: "Melbourne",
      type: "Day Care",
      beds: 40,
      established: 2016,
      indicators: {
        residents: 2.4,
        staffing: 2.2,
        qualityMeasures: 2.5,
        compliance: 2.4,
        safetyClinical: 2.3,
        preventiveCare: 2.1,
        experience: 2.3,
        equity: 2.4,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident and day client satisfaction is well below benchmark. Concerns have been raised by families.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing shortages are impacting service delivery. Agency reliance is above acceptable levels.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures are poor. A formal quality improvement plan has been requested by the regulator.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance issues have been identified. A compliance action plan is in development.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety indicators are significantly below benchmark. Incident management process requires overhaul.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening rates are critically low. Assessment bundles are overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are in the lowest quartile. Client and family feedback is predominantly negative.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity monitoring is insufficient. Access gap reporting is not up to date.",
        },
      },
    },
    {
      // MEDIUM performer: growing outer suburb facility
      id: "MEL-011",
      name: "Werribee Senior Living",
      city: "Melbourne",
      type: "Residential",
      beds: 70,
      established: 2013,
      indicators: {
        residents: 3.6,
        staffing: 3.5,
        qualityMeasures: 3.7,
        compliance: 3.8,
        safetyClinical: 3.6,
        preventiveCare: 3.4,
        experience: 3.6,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average and improving. New lifestyle coordinator has had positive impact.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels are stable. Graduate nurse program is contributing to workforce capability.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance improvement initiatives are active.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. No significant findings in the last audit period.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Falls prevention protocols are reviewed monthly.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Screening bundle backlog is being systematically cleared.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are good. Resident feedback is actively collected and incorporated into care planning.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is being actively monitored. Community outreach programs are in development.",
        },
      },
    },
  ],

  // ── Brisbane: 2 providers — HIGH / LOW-AVERAGE (5★, 2★) ─────────────────────
  Brisbane: [
    {
      // HIGH performer: top performer across all domains — Overall ~5★
      id: "BRI-001",
      name: "Sunshine Coast Elder Home",
      city: "Brisbane",
      type: "Residential",
      beds: 150,
      established: 2006,
      indicators: {
        residents: 4.8,
        staffing: 4.7,
        qualityMeasures: 4.6,
        compliance: 4.9,
        safetyClinical: 4.8,
        preventiveCare: 4.7,
        experience: 4.8,
        equity: 4.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is consistently excellent, placing this provider in the top quintile nationally.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing performance is outstanding. All positions filled with qualified staff; retention above 91%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures demonstrate a strong continuous improvement culture. Peer review outcomes are consistently positive.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance with all ACQSC standards. No outstanding notices or conditions.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety and Clinical performance is excellent. Falls harm rate and medication incidents well below national average.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive Care completion rates are high across all mandatory screening bundles. Post-discharge protocols consistently met.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience indicators outstanding. Complaint rates are the lowest in the region with rapid resolution.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access performance is strong. First Nations and CALD community access gaps are minimal and monitored proactively.",
        },
      },
    },
    {
      // LOW-AVERAGE performer: poor safety, weak preventive — Overall ~2★
      id: "BRI-002",
      name: "Gold Coast Residency",
      city: "Brisbane",
      type: "Residential",
      beds: 90,
      established: 2011,
      indicators: {
        residents: 2.4,
        staffing: 2.8,
        qualityMeasures: 2.2,
        compliance: 2.5,
        safetyClinical: 1.8,
        preventiveCare: 1.9,
        experience: 2.3,
        equity: 2.6,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "⚠ Resident Experience is well below city average. Multiple unresolved complaints are under investigation.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing is critically below acceptable levels. Agency staff usage is at 45%, impacting continuity of care.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "⚠ Quality Measures are declining. Incident trend analysis shows worsening clinical governance outcomes.",
        },
        compliance: {
          trend: "declining",
          insight:
            "⚠ Compliance is below minimum requirements. Two conditions from the last assessment cycle remain unresolved.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Falls Risk Safety is critically poor. Incident rate is 2.8× the regional benchmark. A targeted safety improvement plan is urgently required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive Screening completion is significantly below national average. Falls risk and oral health screening are critically low.",
        },
        experience: {
          trend: "declining",
          insight:
            "⚠ Experience scores are in the lower quartile. Complaint resolution time has doubled year-on-year.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is marginal. Referral-to-placement time is above the regional average.",
        },
      },
    },
    {
      // HIGH performer: strong prevention focus
      id: "BRI-003",
      name: "Ipswich Aged Care",
      city: "Brisbane",
      type: "Residential",
      beds: 120,
      established: 2003,
      indicators: {
        residents: 4.5,
        staffing: 4.4,
        qualityMeasures: 4.6,
        compliance: 4.7,
        safetyClinical: 4.5,
        preventiveCare: 4.4,
        experience: 4.5,
        equity: 4.2,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction scores are well above benchmark. Community connection programs are highly valued.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels exceed benchmark. Low turnover and high staff satisfaction scores.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures performance is excellent. All KPIs are tracking above target.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is fully maintained. Recognised for governance excellence in last sector review.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are above benchmark. Falls prevention strategy is a sector best practice example.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening is above benchmark. All assessment bundles are current and up to date.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience scores are strong. Resident and family engagement programs are well-established.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD services are integrated into the care model.",
        },
      },
    },
    {
      // MEDIUM performer: adequate across all domains
      id: "BRI-004",
      name: "Logan Senior Living",
      city: "Brisbane",
      type: "Residential",
      beds: 85,
      established: 2007,
      indicators: {
        residents: 3.4,
        staffing: 3.2,
        qualityMeasures: 3.5,
        compliance: 3.6,
        safetyClinical: 3.3,
        preventiveCare: 3.0,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is adequate. Care planning reviews are conducted as required.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios meet minimum benchmarks. Workforce stability has improved over the past two quarters.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are within acceptable range. Targeted improvement plans are active.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor observations from the last audit are being actioned.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Falls prevention protocols are in place and reviewed regularly.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion has declined. Assessment bundle backlog requires prioritisation.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are average. Complaint management process needs strengthening.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity monitoring is active. Access gap data is being reviewed.",
        },
      },
    },
    {
      // MEDIUM performer: good compliance
      id: "BRI-005",
      name: "Redcliffe Care Centre",
      city: "Brisbane",
      type: "Day Care",
      beds: 55,
      established: 2010,
      indicators: {
        residents: 3.6,
        staffing: 3.4,
        qualityMeasures: 3.7,
        compliance: 3.8,
        safetyClinical: 3.5,
        preventiveCare: 3.3,
        experience: 3.6,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is above average. Day program uptake is high.",
        },
        staffing: {
          trend: "improving",
          insight:
            "ℹ Staffing is improving. New graduate placements have strengthened the care team.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance reviews are current.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. Internal audit process is well-established.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Incident reporting is timely.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Health monitoring programs are being expanded.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience measures are good. Client feedback mechanisms are operational.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Outreach programs are active.",
        },
      },
    },
    {
      // LOW performer: multiple concerning areas
      id: "BRI-006",
      name: "Caboolture Aged Care",
      city: "Brisbane",
      type: "Residential",
      beds: 65,
      established: 2013,
      indicators: {
        residents: 2.1,
        staffing: 2.0,
        qualityMeasures: 2.2,
        compliance: 2.0,
        safetyClinical: 1.9,
        preventiveCare: 1.8,
        experience: 2.1,
        equity: 2.2,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Multiple escalated complaints remain unresolved.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is critically below benchmark. High vacancy and agency reliance is impacting care quality.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures are in the lowest quartile. Formal improvement plan has been demanded.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is significantly below minimum standards. Regulatory intervention is being considered.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety indicators are critically poor. Serious incident rate is the highest in the region.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening is at a critical low. All assessment bundles are significantly overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience metrics are in the bottom decile. Resident and family feedback is overwhelmingly negative.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity monitoring is inadequate. CALD access gap data is unavailable.",
        },
      },
    },
    {
      // MEDIUM performer: suburban southern Brisbane
      id: "BRI-007",
      name: "Springwood Care Services",
      city: "Brisbane",
      type: "Home Care",
      beds: 50,
      established: 2009,
      indicators: {
        residents: 3.7,
        staffing: 3.5,
        qualityMeasures: 3.8,
        compliance: 3.9,
        safetyClinical: 3.7,
        preventiveCare: 3.5,
        experience: 3.7,
        equity: 3.4,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Client satisfaction is above average. Personalised care planning is a key service feature.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels are stable. Workforce plan is under active review.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance tracking is current.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. No significant audit findings in the last cycle.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Home safety assessment completion is on track.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Health promotion programs are expanding.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are good. Flexible delivery model supports positive client outcomes.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is acceptable. Culturally tailored services are in development.",
        },
      },
    },
    {
      // HIGH performer: eastern suburbs
      id: "BRI-008",
      name: "Carindale Senior Living",
      city: "Brisbane",
      type: "Residential",
      beds: 130,
      established: 2001,
      indicators: {
        residents: 4.3,
        staffing: 4.2,
        qualityMeasures: 4.4,
        compliance: 4.5,
        safetyClinical: 4.3,
        preventiveCare: 4.1,
        experience: 4.3,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is well above regional benchmark. Person-centred care model is consistently applied.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above benchmark. High retention rate supports continuity of care.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are tracking well above benchmark. Improvement is consistent across quarters.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is fully maintained. Zero critical findings in last audit.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are above benchmark. Falls harm rate is at its lowest recorded level.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is above benchmark. All bundles are current.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience scores are strong. Family and resident engagement is a noted strength.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD programs are well-established.",
        },
      },
    },
    {
      // MEDIUM performer: northern Brisbane suburbs
      id: "BRI-009",
      name: "Chermside Care Centre",
      city: "Brisbane",
      type: "Residential",
      beds: 95,
      established: 2005,
      indicators: {
        residents: 3.3,
        staffing: 3.2,
        qualityMeasures: 3.4,
        compliance: 3.5,
        safetyClinical: 3.3,
        preventiveCare: 3.1,
        experience: 3.3,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction meets minimum standards. Lifestyle programs are available and well-attended.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are at benchmark. Workforce stability has been maintained.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures meet minimum requirements. Performance improvement process is active.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor audit observations have been actioned.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Incident rates are within benchmark.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is at minimum targets. Assessment scheduling is managed actively.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are adequate. Client feedback is collected and reviewed.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Access gap is being monitored.",
        },
      },
    },
    {
      // MEDIUM performer: northern outer suburbs
      id: "BRI-010",
      name: "Aspley Aged Care",
      city: "Brisbane",
      type: "Home Care",
      beds: 45,
      established: 2015,
      indicators: {
        residents: 3.5,
        staffing: 3.3,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.4,
        preventiveCare: 3.2,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Client satisfaction is above average and improving. New care coordinator has driven positive outcomes.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is stable. Specialist skill mix is improving through targeted recruitment.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance targets for the next period have been set.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. Standards documentation is up to date.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Home safety assessment process is well-managed.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Health monitoring programs are being implemented.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are satisfactory. Service coordination and flexibility are client strengths.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Culturally appropriate care options are available.",
        },
      },
    },
    {
      // LOW performer: outer north Brisbane
      id: "BRI-011",
      name: "Strathpine Senior Living",
      city: "Brisbane",
      type: "Residential",
      beds: 70,
      established: 2017,
      indicators: {
        residents: 2.3,
        staffing: 2.2,
        qualityMeasures: 2.4,
        compliance: 2.3,
        safetyClinical: 2.1,
        preventiveCare: 2.0,
        experience: 2.2,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is below benchmark. Unresolved complaints have increased significantly.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing levels are below minimum benchmark. High agency reliance continues to impact care quality.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures performance is poor. A formal improvement plan is being developed.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is below minimum standards. Non-conformances identified in the last audit are outstanding.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety indicators are critically below benchmark. Falls and medication management both require urgent review.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening completion is critically low. Mandatory assessment bundles are significantly overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience metrics are in the lowest quartile. Client and family feedback is predominantly negative.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access monitoring is insufficient. Access gap data collection is not current.",
        },
      },
    },
  ],

  // ── Perth: 4 providers — HIGH / AVERAGE / HIGH / LOW (5★, 3★, 4★, 2★) ───────
  Perth: [
    {
      // HIGH performer: strong safety + experience — Overall ~5★
      id: "PER-001",
      name: "Swan River Senior Care",
      city: "Perth",
      type: "Residential",
      beds: 110,
      established: 2009,
      indicators: {
        residents: 4.6,
        staffing: 4.8,
        qualityMeasures: 4.5,
        compliance: 4.9,
        safetyClinical: 4.7,
        preventiveCare: 4.5,
        experience: 4.7,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience scores are at the top quartile nationally. Satisfaction has improved for four consecutive quarters.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing is excellent. All clinical positions filled; RN hours per resident exceed national requirement by 18%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are top-tier. Clinical governance processes are embedded and consistently delivering strong outcomes.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained. No notices or conditions outstanding from regulator.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls with harm rate is well below the national benchmark. Medication-related incidents are negligible.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion at 94%. All mandatory screening bundles completed within required timeframes.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience indicators are exceptional. Complaint rate is among the lowest in the state.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access is strong. First Nations and CALD access gap is minimal and proactively managed.",
        },
      },
    },
    {
      // AVERAGE performer: mixed indicators — strong staffing, weak safety — Overall ~3★
      id: "PER-002",
      name: "Fremantle Aged Services",
      city: "Perth",
      type: "Residential",
      beds: 85,
      established: 2013,
      indicators: {
        residents: 3.2,
        staffing: 4.1,
        qualityMeasures: 3.0,
        compliance: 3.4,
        safetyClinical: 2.6,
        preventiveCare: 2.8,
        experience: 3.1,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is below city average. Improvement in complaint handling processes is recommended.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing is a relative strength. RN coverage ratios meet national standards and agency staff reliance has reduced.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are marginally acceptable. Structured improvement planning is in progress.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets minimum requirements. One outstanding action item from the last audit cycle.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Falls with harm rate is above regional benchmark. Medication prevalence indicators require review.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is below national average. Depression screening and malnutrition review completion are lagging.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are below regional peers. Complaint resolution time is trending upward.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Referral-to-placement monitoring is ongoing.",
        },
      },
    },
    {
      // HIGH performer: 4★ — good safety, strong staffing — Overall ~4★
      id: "PER-003",
      name: "Cottesloe Home Care",
      city: "Perth",
      type: "Home Care",
      established: 2016,
      indicators: {
        residents: 4.3,
        staffing: 4.5,
        qualityMeasures: 4.2,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.1,
        experience: 4.4,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "✅ Resident Experience is strong and consistent across all care domains. Satisfaction surveys show high engagement.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing coverage is above average. RN hours per resident exceed national minimum.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are performing well. Incident review processes demonstrate a strong safety culture.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is well-maintained. All mandatory reporting submitted on time with no conditions.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "✅ Safety performance is above average. Falls with harm rate is within the national top two quintiles.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive Care completion is improving. Screening bundles are being completed at an increasing rate.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are above regional average. Resident feedback is positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap monitoring is ongoing.",
        },
      },
    },
    {
      // LOW performer: poor safety, very weak preventive — Overall ~2★
      id: "PER-004",
      name: "Rockingham Care Centre",
      city: "Perth",
      type: "Residential",
      beds: 68,
      established: 2010,
      indicators: {
        residents: 2.1,
        staffing: 2.4,
        qualityMeasures: 2.0,
        compliance: 2.3,
        safetyClinical: 1.6,
        preventiveCare: 1.8,
        experience: 2.2,
        equity: 2.5,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "⚠ Resident Experience is critically low. Complaint volumes have increased and two formal investigations are underway.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing is significantly below minimum standards. Reliance on casual staff is impacting care continuity and quality.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "⚠ Quality Measures are poor. Multiple adverse incidents reflect systemic clinical governance failures.",
        },
        compliance: {
          trend: "declining",
          insight:
            "⚠ Multiple compliance conditions remain unresolved. Enhanced regulatory monitoring is in place.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Falls with harm rate is critically above benchmark. Polypharmacy prevalence is in the worst quintile nationally. Urgent review required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is critically low at under 32%. All mandatory bundles are significantly overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "⚠ Experience scores are in the bottom decile nationally. Resident complaints are unresolved beyond 30 days.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access is poor. Referral-to-placement time is 2× the national benchmark.",
        },
      },
    },
    {
      // HIGH performer: southern Perth coastal
      id: "PER-005",
      name: "Rockingham Aged Care",
      city: "Perth",
      type: "Residential",
      beds: 120,
      established: 2005,
      indicators: {
        residents: 4.4,
        staffing: 4.3,
        qualityMeasures: 4.5,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.2,
        experience: 4.4,
        equity: 4.1,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is above benchmark. Coastal lifestyle programs are highly valued by residents.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above benchmark. Strong team culture and low turnover.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are tracking above benchmark. Continuous improvement culture is embedded.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is excellent. Last full audit resulted in zero critical findings.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are above benchmark. Falls harm rate is at its lowest recorded level.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is above benchmark. All assessment bundles are current.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are strong. Complaint resolution is well-managed.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is good. CALD support services are available.",
        },
      },
    },
    {
      // MEDIUM performer: peel region
      id: "PER-006",
      name: "Mandurah Senior Living",
      city: "Perth",
      type: "Residential",
      beds: 90,
      established: 2008,
      indicators: {
        residents: 3.5,
        staffing: 3.4,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.2,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is above average. Care planning is personalised and reviewed regularly.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels are at benchmark. Workforce plan is under active review.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Improvement targets are set and tracked.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. Minor observations from last audit have been resolved.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Falls prevention is actively managed.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening has declined slightly. Assessment bundle completion requires prioritisation.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are adequate. Client feedback is regularly collected and actioned.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is being monitored. Access gap data is actively reviewed.",
        },
      },
    },
    {
      // LOW performer: southeastern suburbs
      id: "PER-007",
      name: "Armadale Care Centre",
      city: "Perth",
      type: "Residential",
      beds: 60,
      established: 2014,
      indicators: {
        residents: 2.2,
        staffing: 2.1,
        qualityMeasures: 2.3,
        compliance: 2.2,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.1,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically below benchmark. Escalated complaints remain unresolved.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is critically below minimum. Agency reliance has reached unsustainable levels.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures are in the lowest quartile. A formal improvement plan has been requested.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is below minimum standards. Regulatory action is under consideration.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety performance is critically poor. Serious incident rate is above regional benchmark.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening is critically overdue. All assessment bundles require immediate action.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience metrics are in the bottom decile. Family and resident feedback is predominantly negative.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity monitoring is inadequate. CALD access data is not current.",
        },
      },
    },
    {
      // HIGH performer: northern suburbs
      id: "PER-008",
      name: "Joondalup Aged Care",
      city: "Perth",
      type: "Residential",
      beds: 140,
      established: 2002,
      indicators: {
        residents: 4.6,
        staffing: 4.5,
        qualityMeasures: 4.7,
        compliance: 4.8,
        safetyClinical: 4.6,
        preventiveCare: 4.4,
        experience: 4.6,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience is in the top quintile nationally. Person-centred care model is excellent.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing is exemplary. High retention rates and strong professional development opportunities.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are consistently above benchmark. Improvement trajectory has been sustained for four quarters.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full regulatory compliance. Recognised for sector-leading governance practices.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are exemplary. Falls harm rate is in the lowest national decile.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is at 95%. All mandatory bundles completed ahead of schedule.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience scores are outstanding. Complaint resolution averages under 24 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access is strong. Multilingual care services are fully embedded.",
        },
      },
    },
    {
      // MEDIUM performer: inner western suburbs
      id: "PER-009",
      name: "Fremantle Care",
      city: "Perth",
      type: "Home Care",
      beds: 55,
      established: 2011,
      indicators: {
        residents: 3.8,
        staffing: 3.7,
        qualityMeasures: 3.9,
        compliance: 4.0,
        safetyClinical: 3.8,
        preventiveCare: 3.6,
        experience: 3.8,
        equity: 3.6,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Client satisfaction is above average. Service flexibility and coordination are noted strengths.",
        },
        staffing: {
          trend: "improving",
          insight:
            "ℹ Staffing is improving. New workforce strategy is reducing turnover effectively.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance targets are being tracked and met.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. No significant findings in the last audit period.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Home safety assessment process is well-managed.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Health promotion programs are being expanded.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are good. Client and family feedback is generally positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is acceptable. Culturally appropriate care is being developed.",
        },
      },
    },
    {
      // MEDIUM performer: eastern suburbs
      id: "PER-010",
      name: "Midland Senior Living",
      city: "Perth",
      type: "Residential",
      beds: 80,
      established: 2006,
      indicators: {
        residents: 3.3,
        staffing: 3.2,
        qualityMeasures: 3.4,
        compliance: 3.5,
        safetyClinical: 3.3,
        preventiveCare: 3.1,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction meets minimum standards. Lifestyle activities are available and attended.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios meet minimum benchmarks. Stability has been maintained over the last two quarters.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures meet minimum requirements. Improvement reviews are scheduled.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Corrective actions from last audit are complete.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Incident reporting is timely.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion meets minimum targets. Scheduling improvements are planned.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience measures are adequate. Feedback collection process is active.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Access gap monitoring is ongoing.",
        },
      },
    },
    {
      // MEDIUM performer: southeastern metro
      id: "PER-011",
      name: "Cannington Aged Care",
      city: "Perth",
      type: "Residential",
      beds: 75,
      established: 2009,
      indicators: {
        residents: 3.6,
        staffing: 3.5,
        qualityMeasures: 3.7,
        compliance: 3.8,
        safetyClinical: 3.6,
        preventiveCare: 3.4,
        experience: 3.6,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average and improving. New care model has been well-received.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels are stable. Staff development initiatives are contributing to improved capability.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance improvement initiatives are active.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. No significant findings in the last audit cycle.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Incident management is well-structured.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Assessment bundle backlog is being cleared.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are good. Client and family engagement programs are active.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access monitoring is in place. Community outreach programs are in development.",
        },
      },
    },
  ],

  // ── Adelaide: 4 providers — HIGH / AVERAGE / HIGH / AVERAGE (5★, 3★, 4★, 3★) ─
  Adelaide: [
    {
      // HIGH performer: excellent safety, top compliance — Overall ~5★
      id: "ADL-001",
      name: "Glenelg Senior Services",
      city: "Adelaide",
      type: "Residential",
      beds: 100,
      established: 2007,
      indicators: {
        residents: 4.7,
        staffing: 4.6,
        qualityMeasures: 4.8,
        compliance: 4.9,
        safetyClinical: 4.8,
        preventiveCare: 4.6,
        experience: 4.7,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is outstanding. Placed in top quintile nationally for two consecutive reporting periods.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing is excellent. All positions filled; staff retention rate is 93%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are exemplary. Continuous improvement culture is reflected in all outcome metrics.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance with all ACQSC standards. No outstanding notices or conditions.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are at the highest level. Falls harm rate is 60% below the national benchmark.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive Care completion at 95%. All mandatory bundles completed within required timeframes.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience indicators are exceptional. Resident complaint rate is near zero.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access is strong. No measurable CALD access gap identified. First Nations access plan is active.",
        },
      },
    },
    {
      // AVERAGE performer: moderate across all — some weak areas — Overall ~3★
      id: "ADL-002",
      name: "Barossa Valley Elder Care",
      city: "Adelaide",
      type: "Residential",
      beds: 75,
      established: 2004,
      indicators: {
        residents: 3.3,
        staffing: 3.0,
        qualityMeasures: 3.4,
        compliance: 3.6,
        safetyClinical: 3.1,
        preventiveCare: 2.9,
        experience: 3.2,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is marginally acceptable. Improvement in care personalisation and complaint handling is recommended.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing ratios are declining. Vacancy rates are elevated and clinical supervision coverage is below standard.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are borderline. Incident review cycle needs to be strengthened.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is within minimum thresholds. One outstanding action item from the last audit cycle.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is borderline. Falls rate is slightly above the regional average. Monitoring protocol is in place.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is below average. Cognitive and nutritional assessment completion rates require improvement.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are average. Complaint resolution times are within acceptable range but trending upward.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap monitoring is in place.",
        },
      },
    },
    {
      // HIGH performer: 4★ — good safety, above average staffing — Overall ~4★
      id: "ADL-003",
      name: "Hills District Home Care",
      city: "Adelaide",
      type: "Home Care",
      established: 2018,
      indicators: {
        residents: 4.1,
        staffing: 4.4,
        qualityMeasures: 4.2,
        compliance: 4.5,
        safetyClinical: 4.3,
        preventiveCare: 4.0,
        experience: 4.2,
        equity: 3.9,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is strong. Recent improvements in care coordination have boosted satisfaction scores.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing coverage is above average. Clinical supervision ratios meet national standards.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are above average and improving. Clinical governance processes are producing measurable outcomes.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is well-maintained. All mandatory reporting is submitted on time.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "✅ Safety performance is good. Falls with harm rate is below the regional benchmark.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive Care completion is improving. Screening bundle completion rate increased 8% over the past quarter.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are above regional average. Resident feedback is consistently positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap monitoring is ongoing.",
        },
      },
    },
    {
      // AVERAGE performer: balanced moderate — some gaps — Overall ~3★
      id: "ADL-004",
      name: "Port Adelaide Aged Care",
      city: "Adelaide",
      type: "Day Care",
      established: 2021,
      indicators: {
        residents: 3.0,
        staffing: 3.5,
        qualityMeasures: 3.1,
        compliance: 3.4,
        safetyClinical: 2.8,
        preventiveCare: 3.2,
        experience: 3.0,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is at the lower end of acceptable range. Survey participation rates need improvement.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate but below regional peers. Agency staff reliance is a concern for care continuity.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are borderline. Improvement opportunities have been identified in clinical incident reporting.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets minimum requirements. Improvement plan is in progress.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Safety indicators are below average. Falls rate has increased in the past quarter. A targeted prevention plan is required.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is at the lower end of acceptable range. Cognitive assessment completion needs improvement.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint resolution process is in place but requires strengthening.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap is being monitored.",
        },
      },
    },
    {
      // HIGH performer: Barossa Valley region
      id: "ADL-005",
      name: "Gawler Aged Care",
      city: "Adelaide",
      type: "Residential",
      beds: 100,
      established: 2004,
      indicators: {
        residents: 4.4,
        staffing: 4.3,
        qualityMeasures: 4.5,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.2,
        experience: 4.4,
        equity: 4.1,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is well above benchmark. Regional community connection is a key strength.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels exceed benchmark. Low turnover and high staff satisfaction.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are consistently above benchmark. Continuous improvement is embedded in operations.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is excellent. Last audit resulted in zero critical non-conformances.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are above benchmark. Falls harm rate is at its lowest recorded level.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is above benchmark. All bundles are current and on time.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience scores are strong. Complaint resolution is well-managed and timely.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD community services are available.",
        },
      },
    },
    {
      // MEDIUM performer: Adelaide Hills region
      id: "ADL-006",
      name: "Mount Barker Senior Living",
      city: "Adelaide",
      type: "Residential",
      beds: 70,
      established: 2009,
      indicators: {
        residents: 3.5,
        staffing: 3.3,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.2,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is adequate. Care planning is reviewed as required and residents are engaged.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are at benchmark. Workforce stability is being maintained.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are within acceptable range. Targeted improvement plans are active.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor observations from last audit have been actioned.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Falls prevention is actively managed.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion has declined. Assessment bundle backlog requires prioritisation.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are adequate. Client feedback mechanisms are operational.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity monitoring is active. Access gap data is being reviewed regularly.",
        },
      },
    },
    {
      // LOW performer: northern suburbs
      id: "ADL-007",
      name: "Salisbury Care Centre",
      city: "Adelaide",
      type: "Residential",
      beds: 80,
      established: 2013,
      indicators: {
        residents: 2.2,
        staffing: 2.0,
        qualityMeasures: 2.3,
        compliance: 2.1,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.2,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Multiple escalated complaints remain unresolved.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is critically below benchmark. High vacancy and agency reliance impacts care quality significantly.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures are in the lowest quartile. A formal improvement plan has been demanded by the regulator.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is significantly below minimum standards. Regulatory intervention is being considered.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety performance is critically poor. Serious incident rate is above regional benchmark.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening is critically overdue. All assessment bundles require immediate action.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience metrics are in the bottom decile. Resident and family feedback is predominantly negative.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity monitoring is inadequate. CALD access gap data is unavailable.",
        },
      },
    },
    {
      // MEDIUM performer: northeastern Adelaide
      id: "ADL-008",
      name: "Modbury Aged Care",
      city: "Adelaide",
      type: "Day Care",
      beds: 45,
      established: 2011,
      indicators: {
        residents: 3.7,
        staffing: 3.5,
        qualityMeasures: 3.8,
        compliance: 3.9,
        safetyClinical: 3.7,
        preventiveCare: 3.5,
        experience: 3.7,
        equity: 3.4,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Client satisfaction is above average. Day program participation rates are high.",
        },
        staffing: {
          trend: "improving",
          insight:
            "ℹ Staffing is improving. Recent recruitment drive has strengthened the care team.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are satisfactory. Performance is being actively tracked and improved.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is strong. Internal audit results are consistently positive.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable range. Incident management is timely and structured.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive Care completion is improving. Health monitoring programs are being expanded.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience measures are good. Client feedback is collected and incorporated into service planning.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access performance is acceptable. Culturally tailored programming is available.",
        },
      },
    },
    {
      // HIGH performer: southern suburbs
      id: "ADL-009",
      name: "Morphett Vale Care",
      city: "Adelaide",
      type: "Residential",
      beds: 115,
      established: 1999,
      indicators: {
        residents: 4.3,
        staffing: 4.2,
        qualityMeasures: 4.4,
        compliance: 4.5,
        safetyClinical: 4.3,
        preventiveCare: 4.1,
        experience: 4.3,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is well above regional benchmark. Person-centred care model is consistently applied.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above benchmark. High retention rate supports continuity of care.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are tracking well above benchmark. Improvement is consistent across all quarters.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is fully maintained. Zero critical findings in the last audit cycle.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are above benchmark. Falls harm rate is at its lowest recorded level.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is above benchmark. All bundles are current and completed on schedule.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience scores are strong. Complaint resolution time averages under 48 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD support is available and actively promoted.",
        },
      },
    },
    {
      // MEDIUM performer: outer southern suburbs
      id: "ADL-010",
      name: "Noarlunga Senior Living",
      city: "Adelaide",
      type: "Home Care",
      beds: 50,
      established: 2012,
      indicators: {
        residents: 3.4,
        staffing: 3.3,
        qualityMeasures: 3.5,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.1,
        experience: 3.4,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Client satisfaction meets minimum standards. Service delivery is reliable and consistent.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are at minimum benchmark. Workforce plan is under review.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are within acceptable range. Improvement targets have been set.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Corrective actions from last audit are progressing.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is acceptable. Home safety assessment completion is on track.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion meets minimum targets. Scheduling improvements are in progress.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are adequate. Client feedback is collected and reviewed regularly.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is being monitored. Community outreach programs are in development.",
        },
      },
    },
    {
      // LOW performer: outer northern suburbs
      id: "ADL-011",
      name: "Elizabeth Aged Care",
      city: "Adelaide",
      type: "Residential",
      beds: 65,
      established: 2016,
      indicators: {
        residents: 2.4,
        staffing: 2.2,
        qualityMeasures: 2.5,
        compliance: 2.3,
        safetyClinical: 2.1,
        preventiveCare: 2.0,
        experience: 2.3,
        equity: 2.4,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is well below benchmark. Complaints have increased significantly in the last two quarters.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing levels are critically below minimum. Agency reliance has reached unsustainable levels.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality Measures performance is poor. Formal improvement plan is required.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is below minimum standards. Audit findings remain outstanding.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety indicators are critically below benchmark. Falls and serious incident rates require urgent review.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening is critically low. Mandatory assessment bundles are overdue by more than 90 days.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience metrics are in the lowest quartile. Family and resident concerns are not being addressed adequately.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access monitoring is insufficient. CALD access gap reporting is incomplete.",
        },
      },
    },
  ],

  // ── Canberra: 4 providers — HIGH / AVERAGE / HIGH / LOW (5★, 3★, 4★, 2★) ────
  Canberra: [
    {
      // HIGH performer: 5★ — outstanding all-round — Overall ~5★
      id: "CAN-001",
      name: "Tuggeranong Senior Living",
      city: "Canberra",
      type: "Residential",
      beds: 130,
      established: 2006,
      indicators: {
        residents: 4.9,
        staffing: 4.8,
        qualityMeasures: 4.7,
        compliance: 5.0,
        safetyClinical: 4.9,
        preventiveCare: 4.8,
        experience: 4.9,
        equity: 4.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is at the highest level nationally. Satisfaction surveys consistently yield 97%+ positive ratings.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing is exceptional. All positions permanently filled; staff retention at 96%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are at the national top. Continuous improvement culture is deeply embedded.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance with all ACQSC standards. Zero outstanding notices. Recognised as a sector leader in compliance.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are exceptional. Falls with harm rate is 70% below the national benchmark.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion at 98%. Proactive screening model has become a sector exemplar.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience indicators are outstanding. Near-zero complaint rate with all complaints resolved within 12 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access is excellent. No measurable CALD access gap. First Nations access plan is fully implemented.",
        },
      },
    },
    {
      // AVERAGE performer: adequate across the board — some weak safety — Overall ~3★
      id: "CAN-002",
      name: "Belconnen Home Care",
      city: "Canberra",
      type: "Home Care",
      established: 2017,
      indicators: {
        residents: 3.4,
        staffing: 3.6,
        qualityMeasures: 3.2,
        compliance: 3.5,
        safetyClinical: 2.9,
        preventiveCare: 3.3,
        experience: 3.4,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is within acceptable range. Below city average with improvement opportunities in personalised care.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate but below city peers. Agency usage is moderate and being actively reduced.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are borderline. Structured improvement planning is recommended.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets minimum requirements. One outstanding notice under resolution.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Safety performance is below average. Falls rate has increased and medication review cycle needs strengthening.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is at average levels. Screening bundle completion requires monitoring.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are borderline. Complaint resolution time has been improving slightly.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap monitoring is ongoing.",
        },
      },
    },
    {
      // HIGH performer: 4★ — strong compliance, good quality — Overall ~4★
      id: "CAN-003",
      name: "Gungahlin Elder Home",
      city: "Canberra",
      type: "Residential",
      beds: 88,
      established: 2012,
      indicators: {
        residents: 4.0,
        staffing: 4.2,
        qualityMeasures: 4.3,
        compliance: 4.6,
        safetyClinical: 4.1,
        preventiveCare: 3.9,
        experience: 4.0,
        equity: 3.8,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "✅ Resident Experience is above average. Satisfaction surveys show positive trends.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing coverage is improving. New recruits have increased RN hours per resident above national minimum.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are performing well. Clinical governance processes are producing good outcomes.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is well-maintained. All mandatory reporting submitted on time with no conditions.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "✅ Safety performance is above average. Falls with harm rate is within the national top two quintiles.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is within acceptable range. Malnutrition screening completion requires monitoring.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are above regional average. Resident feedback is positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap monitoring is ongoing.",
        },
      },
    },
    {
      // LOW performer: poor safety, poor staffing — Overall ~2★
      id: "CAN-004",
      name: "Woden Valley Care",
      city: "Canberra",
      type: "Residential",
      beds: 105,
      established: 2009,
      indicators: {
        residents: 2.3,
        staffing: 1.9,
        qualityMeasures: 2.1,
        compliance: 2.4,
        safetyClinical: 1.7,
        preventiveCare: 2.0,
        experience: 2.2,
        equity: 2.5,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "⚠ Resident Experience is significantly below standard. High complaint volumes and slow resolution times are impacting the rating.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing is critically below minimum thresholds. High vacancy rates and heavy reliance on casual staff are impacting care quality.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "⚠ Quality Measures are poor. Incident analysis reveals systemic failures in clinical governance processes.",
        },
        compliance: {
          trend: "declining",
          insight:
            "⚠ Multiple compliance conditions outstanding. Provider is subject to enhanced monitoring.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Safety indicators are critically poor. Falls with harm rate is in the worst quintile nationally. Pressure injury prevalence is above the acceptable threshold.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is critically low. All mandatory bundles are significantly overdue across multiple cohorts.",
        },
        experience: {
          trend: "declining",
          insight:
            "⚠ Experience scores are in the lower quartile nationally. Complaint rates have increased sharply in the past two quarters.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access performance is below standard. CALD access gap and referral-to-placement time require urgent attention.",
        },
      },
    },

    {
      // HIGH performer — Overall ~4.5★
      id: "CAN-005",
      name: "Tuggeranong Aged Care",
      city: "Canberra",
      type: "Residential Aged Care",
      beds: 95,
      established: 2005,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.7,
        compliance: 4.8,
        safetyClinical: 4.6,
        preventiveCare: 4.5,
        experience: 4.4,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is among the highest in the ACT region. Personal care plans are reviewed monthly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios exceed mandated minimums. Turnover rate is low at under 8% annually.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are consistently above benchmark. Pressure injury and falls rates are well below national average.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Full accreditation compliance maintained. No sanctions in the last three years.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety indicators are strong. Medication management audit scores are excellent.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive screening bundles are completed on schedule across all cohorts.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are in the top quartile. Complaint resolution is swift and effective.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD and First Nations engagement programs are active.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.5★
      id: "CAN-006",
      name: "Belconnen Care Centre",
      city: "Canberra",
      type: "Residential Aged Care",
      beds: 110,
      established: 1998,
      indicators: {
        residents: 3.4,
        staffing: 3.5,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.4,
        preventiveCare: 3.3,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is within acceptable range. Some concerns raised around meal quality.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels meet minimum requirements. Rostering improvements are underway.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are average. Falls rate is at benchmark level.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. One minor advisory noted in last audit cycle.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Medication review schedule requires tightening.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive screening is near benchmark. Cognitive assessment completion is lagging.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Activity engagement scores could be improved.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access requires attention. CALD community referral pathways are limited.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.8★
      id: "CAN-007",
      name: "Gungahlin Senior Living",
      city: "Canberra",
      type: "Residential Aged Care",
      beds: 75,
      established: 2012,
      indicators: {
        residents: 4.7,
        staffing: 4.8,
        qualityMeasures: 4.9,
        compliance: 4.8,
        safetyClinical: 4.7,
        preventiveCare: 4.6,
        experience: 4.8,
        equity: 4.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are outstanding. Person-centred care model is exemplary.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are well above sector average. Retention incentives are effective.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are in the top decile nationally. Zero pressure injuries in the last two quarters.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Full compliance with all accreditation standards. Commended in recent ACQSC site audit.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is exemplary. Multi-disciplinary risk review meetings are held weekly.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ All preventive screening bundles completed well above target dates.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are best in city. Net Promoter Score among families is consistently high.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Strong equity performance. Culturally safe care framework is embedded in operations.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.2★
      id: "CAN-008",
      name: "Woden Valley Aged Care",
      city: "Canberra",
      type: "Residential Aged Care",
      beds: 130,
      established: 1994,
      indicators: {
        residents: 3.1,
        staffing: 3.2,
        qualityMeasures: 3.3,
        compliance: 3.4,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is below the city average. A care improvement plan has been initiated.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is at minimum compliance levels. Recruitment campaign is ongoing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are at benchmark. Falls monitoring frequency has been increased.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is adequate. Two areas flagged for improvement in the last audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is at minimum acceptable level. Wound care protocols are being updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care is at benchmark. Flu vaccination coverage needs improvement.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint volumes have stabilised.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. CALD and First Nations programs are limited but present.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.2★
      id: "CAN-009",
      name: "Queanbeyan Care",
      city: "Canberra",
      type: "Residential Aged Care",
      beds: 58,
      established: 1990,
      indicators: {
        residents: 2.1,
        staffing: 2.0,
        qualityMeasures: 2.3,
        compliance: 2.4,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.2,
        equity: 2.1,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Multiple formal complaints received in the last quarter.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below mandated minimums. High agency staff use is impacting continuity of care.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are in the bottom quintile. Falls with harm rate is significantly above benchmark.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Multiple compliance breaches identified. Remediation plan is in progress.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety indicators are critically poor. Medication errors have increased.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening completion is critically low. Bundles are overdue across multiple cohorts.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are in the bottom decile. Complaint volumes have increased significantly.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access is below standard. CALD access gap requires urgent attention.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.7★
      id: "CAN-010",
      name: "Molonglo Senior Living",
      city: "Canberra",
      type: "Residential Aged Care",
      beds: 85,
      established: 2010,
      indicators: {
        residents: 3.8,
        staffing: 3.7,
        qualityMeasures: 3.6,
        compliance: 3.9,
        safetyClinical: 3.7,
        preventiveCare: 3.8,
        experience: 3.6,
        equity: 3.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average and improving. New activities coordinator has made a positive impact.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are adequate. Training investment has increased this financial year.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are satisfactory. Falls prevention program has been enhanced.",
        },
        compliance: {
          trend: "improving",
          insight:
            "ℹ Compliance is strong. No significant findings in the most recent audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is within acceptable range. Medication management audit results are satisfactory.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care completion is near benchmark. Bowel screening uptake is improving.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience scores are improving. Resident council feedback has been positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is satisfactory. Interpreter services are available on request.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.5★
      id: "CAN-011",
      name: "Majura Aged Care",
      city: "Canberra",
      type: "Residential Aged Care",
      beds: 62,
      established: 2001,
      indicators: {
        residents: 2.4,
        staffing: 2.5,
        qualityMeasures: 2.3,
        compliance: 2.6,
        safetyClinical: 2.2,
        preventiveCare: 2.4,
        experience: 2.5,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is below acceptable levels. Concerns around dignity of care have been raised by families.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is insufficient. Agency use is high and continuity of care is compromised.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Falls rate and pressure injuries are above the benchmark.",
        },
        compliance: {
          trend: "stable",
          insight:
            "⚠ Compliance has areas requiring improvement. Two corrective actions are open.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is poor. Incidents have increased in the last two quarters.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care is significantly below benchmark. Screening bundles are largely overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience is poor. Complaint resolution timeframes are unacceptably long.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is below standard. Language support services are inadequate.",
        },
      },
    },
  ],

  // ── Hobart: 4 providers — AVERAGE / AVERAGE-LOW / HIGH / LOW (3★, 3★, 4★, 1★) ─
  Hobart: [
    {
      // AVERAGE performer: balanced moderate — Overall ~3★
      id: "HOB-001",
      name: "Sandy Bay Senior Care",
      city: "Hobart",
      type: "Residential",
      beds: 92,
      established: 2010,
      indicators: {
        residents: 3.3,
        staffing: 3.5,
        qualityMeasures: 3.4,
        compliance: 3.7,
        safetyClinical: 3.0,
        preventiveCare: 3.2,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is within acceptable range. Improvement planning is in progress.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate but below city peers. Agency usage has stabilised.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are borderline. Improvement opportunities have been identified.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets minimum requirements. No new notices outstanding.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is average. Falls rate is within the national mid-range. Improvement plan is in place.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is at average levels. Screening bundle completion requires ongoing monitoring.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are borderline. Complaint resolution process is in place.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap is being monitored.",
        },
      },
    },
    {
      // AVERAGE-LOW performer: weak safety but improving, moderate compliance — Overall ~3★
      id: "HOB-002",
      name: "Huon Valley Elder Services",
      city: "Hobart",
      type: "Home Care",
      established: 2019,
      indicators: {
        residents: 2.9,
        staffing: 3.2,
        qualityMeasures: 2.7,
        compliance: 3.1,
        safetyClinical: 2.4,
        preventiveCare: 2.6,
        experience: 2.8,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is below average. Improvement in complaint handling is required.",
        },
        staffing: {
          trend: "improving",
          insight:
            "ℹ Staffing is improving from a low base. New recruitment campaign has reduced vacancy rates.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are below acceptable range. Structured improvement planning is recommended.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets minimum requirements. One outstanding action item remains open.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "⚠ Safety performance is below average but has improved slightly. Falls rate remains above the regional benchmark.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "⚠ Preventive Care completion is below national average. Cognitive and malnutrition screening bundles require priority attention.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are below average. Complaint resolution time has improved but remains above the national benchmark.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. Access gap monitoring is in place.",
        },
      },
    },
    {
      // HIGH performer: 4★ — strong quality, good safety — Overall ~4★
      id: "HOB-003",
      name: "North Hobart Aged Care",
      city: "Hobart",
      type: "Residential",
      beds: 115,
      established: 2007,
      indicators: {
        residents: 4.2,
        staffing: 4.5,
        qualityMeasures: 4.4,
        compliance: 4.7,
        safetyClinical: 4.3,
        preventiveCare: 4.1,
        experience: 4.2,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is strong. Satisfaction surveys show consistent above-average results.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing is above average. RN hours per resident exceed national minimum by 15%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are performing well. Continuous improvement processes are driving measurable outcomes.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is well-maintained. All mandatory reporting submitted on time with no conditions.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "✅ Safety performance is above average. Falls with harm rate is in the national top two quintiles.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive Care completion is improving. Screening bundle completion rate is above the national average.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are above regional average. Resident feedback is positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity performance is good. First Nations and CALD access gap is being actively managed.",
        },
      },
    },
    {
      // LOW performer: 1★ — critically weak across all domains — Overall ~1★
      id: "HOB-004",
      name: "Tasman Care Home",
      city: "Hobart",
      type: "Residential",
      beds: 70,
      established: 2015,
      indicators: {
        residents: 1.4,
        staffing: 1.6,
        qualityMeasures: 1.3,
        compliance: 1.5,
        safetyClinical: 1.1,
        preventiveCare: 1.2,
        experience: 1.4,
        equity: 1.7,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "⚠ Resident Experience is critically poor. Multiple formal complaints are under active investigation by the regulator.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing is critically below minimum requirements. Reliance on unqualified staff is a significant clinical risk.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "⚠ Quality Measures are at the lowest level. Systemic failures in clinical governance have been identified.",
        },
        compliance: {
          trend: "declining",
          insight:
            "⚠ Provider is non-compliant with multiple mandatory standards. Formal improvement notice has been issued.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Safety indicators are at the national worst quintile. Falls with serious harm rate is 4× the national benchmark. Urgent escalation required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive screening completion is critically low at under 22%. Systematic failure to complete mandatory screening bundles.",
        },
        experience: {
          trend: "declining",
          insight:
            "⚠ Experience scores are in the bottom decile. Complaint rates are the highest in the city. Resident advocacy involvement is recommended.",
        },
        equity: {
          trend: "declining",
          insight:
            "⚠ Equity access performance is the worst in the region. Significant barriers to First Nations and CALD community access have been identified.",
        },
      },
    },

    {
      // HIGH performer — Overall ~4.5★
      id: "HOB-005",
      name: "Glenorchy Aged Care",
      city: "Hobart",
      type: "Residential Aged Care",
      beds: 88,
      established: 2006,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.7,
        compliance: 4.6,
        safetyClinical: 4.5,
        preventiveCare: 4.4,
        experience: 4.6,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are strong. Person-centred care reviews are conducted quarterly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing levels are above minimum requirements. Staff satisfaction scores are high.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above benchmark. Pressure injury prevention program is effective.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained. No significant findings in the last two audits.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety indicators are strong. Incident reporting culture is embedded.",
        },
        preventiveCare: {
          trend: "stable",
          insight: "✅ Preventive screening bundles are completed on schedule.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are in the top quartile. Family satisfaction surveys show improvement.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD community programs are active.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.4★
      id: "HOB-006",
      name: "Kingston Senior Living",
      city: "Hobart",
      type: "Residential Aged Care",
      beds: 72,
      established: 2000,
      indicators: {
        residents: 3.3,
        staffing: 3.4,
        qualityMeasures: 3.5,
        compliance: 3.6,
        safetyClinical: 3.3,
        preventiveCare: 3.2,
        experience: 3.4,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at benchmark level. Improvements in meal planning are noted.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is at minimum compliance level. Retention challenges persist.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are average. Falls monitoring has been enhanced.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. Minor advisory raised in last audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Medication management requires closer oversight.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care is near benchmark. Cognitive screening completion needs improvement.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Complaint resolution processes are in place.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below average. CALD access programs are limited.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.7★
      id: "HOB-007",
      name: "Clarence Care Centre",
      city: "Hobart",
      type: "Residential Aged Care",
      beds: 105,
      established: 2009,
      indicators: {
        residents: 4.7,
        staffing: 4.8,
        qualityMeasures: 4.6,
        compliance: 4.9,
        safetyClinical: 4.7,
        preventiveCare: 4.8,
        experience: 4.7,
        equity: 4.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are outstanding. Individual care planning is best practice.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are well above sector average. Staff engagement scores are excellent.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are in the top decile nationally. Falls with harm rate is near zero.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Exemplary compliance record. Commended at the most recent ACQSC audit.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is a demonstrated strength. Multi-disciplinary clinical governance is rigorous.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ All preventive bundles are completed ahead of schedule across all cohorts.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are best in city. Consumer advisory body is actively engaged.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access is strong. Culturally safe care framework is well embedded.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.0★
      id: "HOB-008",
      name: "Bellerive Aged Care",
      city: "Hobart",
      type: "Residential Aged Care",
      beds: 60,
      established: 1996,
      indicators: {
        residents: 3.0,
        staffing: 3.1,
        qualityMeasures: 2.9,
        compliance: 3.2,
        safetyClinical: 3.0,
        preventiveCare: 2.8,
        experience: 3.1,
        equity: 2.9,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at minimum acceptable level. Improvement plan is in place.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum requirements. Agency use is elevated.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "⚠ Quality measures are below benchmark. Falls prevention training is scheduled.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is adequate. Corrective actions from last audit are being addressed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "⚠ Clinical safety requires attention. Wound care incidents are being reviewed.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "⚠ Preventive screening is below benchmark. Bundle completion is delayed.",
        },
        experience: {
          trend: "stable",
          insight: "ℹ Experience is average. Resident council is functioning.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access is below acceptable standard. CALD and First Nations support is limited.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.1★
      id: "HOB-009",
      name: "Bridgewater Care",
      city: "Hobart",
      type: "Residential Aged Care",
      beds: 50,
      established: 1993,
      indicators: {
        residents: 2.0,
        staffing: 1.9,
        qualityMeasures: 2.2,
        compliance: 2.3,
        safetyClinical: 1.9,
        preventiveCare: 2.0,
        experience: 2.1,
        equity: 2.0,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Formal complaints have increased significantly.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below mandated minimums. High turnover is impacting care quality.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are in the bottom quintile. Falls with harm rate is well above benchmark.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Multiple compliance breaches. Remediation plan is active and monitored by ACQSC.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is critically poor. Pressure injuries and medication errors are elevated.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening completion is critically low across all mandatory bundles.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are in the bottom decile. Complaint resolution is inadequate.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access is poor. First Nations and CALD barriers have been identified.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.6★
      id: "HOB-010",
      name: "Sorell Senior Living",
      city: "Hobart",
      type: "Residential Aged Care",
      beds: 65,
      established: 2007,
      indicators: {
        residents: 3.6,
        staffing: 3.7,
        qualityMeasures: 3.5,
        compliance: 3.8,
        safetyClinical: 3.6,
        preventiveCare: 3.5,
        experience: 3.7,
        equity: 3.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average. New menu offerings have been well received.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Retention initiatives are showing early results.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are satisfactory. Falls rate is at benchmark level.",
        },
        compliance: {
          trend: "improving",
          insight:
            "ℹ Compliance is strong. Recent audit found no significant issues.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is within acceptable range. Medication audit scores are satisfactory.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care is near benchmark. Flu vaccination coverage has improved.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience scores are improving. Resident feedback processes have been strengthened.",
        },
        equity: {
          trend: "stable",
          insight: "ℹ Equity is satisfactory. Interpreter access is available.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.4★
      id: "HOB-011",
      name: "Moonah Aged Care",
      city: "Hobart",
      type: "Residential Aged Care",
      beds: 55,
      established: 1999,
      indicators: {
        residents: 2.3,
        staffing: 2.4,
        qualityMeasures: 2.2,
        compliance: 2.5,
        safetyClinical: 2.1,
        preventiveCare: 2.3,
        experience: 2.4,
        equity: 2.2,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is well below acceptable levels. Dignity of care concerns have been raised.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is insufficient. Reliance on agency staff is high and continuity is poor.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Pressure injury and falls rates are both above benchmark.",
        },
        compliance: {
          trend: "stable",
          insight:
            "⚠ Compliance has areas requiring improvement. Corrective actions are open.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is poor. Incident rate has increased over the past two quarters.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care is significantly below benchmark. Screening bundles are largely overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience is poor. Complaint volumes have risen and resolution is slow.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is below standard. Language support services are inadequate.",
        },
      },
    },
  ],

  // ── Darwin: 4 providers — HIGH / AVERAGE / HIGH / AVERAGE (4★, 3★, 5★, 3★) ──
  Darwin: [
    {
      // HIGH performer: 4★ — good overall — Overall ~4★
      id: "DAR-001",
      name: "Mindil Beach Senior Care",
      city: "Darwin",
      type: "Residential",
      beds: 82,
      established: 2008,
      indicators: {
        residents: 4.1,
        staffing: 4.4,
        qualityMeasures: 4.0,
        compliance: 4.5,
        safetyClinical: 4.2,
        preventiveCare: 3.9,
        experience: 4.1,
        equity: 3.8,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "✅ Resident Experience is above average. Satisfaction surveys show consistent positive results.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing coverage is strong. All clinical positions are filled and retention is above 88%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are performing well. Clinical governance processes are delivering strong outcomes.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is well-maintained. All mandatory reporting submitted on time.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "✅ Safety performance is above average. Falls with harm rate is within the national top two quintiles.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is within acceptable range. Minor improvement opportunities in cognitive assessment completion.",
        },
        experience: {
          trend: "stable",
          insight:
            "✅ Experience indicators are above regional average. Resident feedback is consistently positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. First Nations community access gap monitoring is ongoing.",
        },
      },
    },
    {
      // AVERAGE performer: moderate indicators — some weak areas — Overall ~3★
      id: "DAR-002",
      name: "Palmerston Aged Services",
      city: "Darwin",
      type: "Residential",
      beds: 65,
      established: 2003,
      indicators: {
        residents: 3.1,
        staffing: 3.4,
        qualityMeasures: 3.0,
        compliance: 3.3,
        safetyClinical: 2.7,
        preventiveCare: 2.9,
        experience: 3.1,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is within acceptable range but below city average. Improvement plan is in progress.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate but below city peers. Agency usage is moderate.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are borderline. Structured improvement planning is recommended.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets minimum requirements. One outstanding action item remains open.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "⚠ Safety performance is below average. Falls rate has increased slightly. Medication prevalence indicators require attention.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "⚠ Preventive Care completion is below average. Screening bundles for malnutrition and depression are lagging.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience indicators are below city average. Complaint resolution time is above the national benchmark.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. First Nations access gap is being monitored.",
        },
      },
    },
    {
      // HIGH performer: 5★ — exceptional safety, top compliance — Overall ~5★
      id: "DAR-003",
      name: "Darwin Harbour Care",
      city: "Darwin",
      type: "Home Care",
      established: 2016,
      indicators: {
        residents: 4.8,
        staffing: 4.7,
        qualityMeasures: 4.9,
        compliance: 4.9,
        safetyClinical: 4.9,
        preventiveCare: 4.8,
        experience: 4.8,
        equity: 4.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident Experience is outstanding. Satisfaction surveys place this provider in the top quintile nationally.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing is excellent. All positions filled permanently; staff retention at 94%.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality Measures are at the highest level nationally. Continuous improvement culture is evident in all care domains.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance with all ACQSC standards. Zero outstanding notices.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety indicators are at the national top. Falls with harm rate is 72% below the national benchmark.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion at 97%. Proactive screening model recognised as a sector exemplar.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience indicators are exceptional. Near-zero complaint rate with all complaints resolved within 24 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity access is excellent. First Nations community access program is fully operational. No measurable CALD access gap.",
        },
      },
    },
    {
      // AVERAGE performer: moderate but with some weak safety — Overall ~3★
      id: "DAR-004",
      name: "Casuarina Elder Care",
      city: "Darwin",
      type: "Day Care",
      established: 2020,
      indicators: {
        residents: 3.5,
        staffing: 3.7,
        qualityMeasures: 3.3,
        compliance: 3.8,
        safetyClinical: 3.0,
        preventiveCare: 3.4,
        experience: 3.4,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience is within acceptable range. Survey participation rates should be improved for more reliable data.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate but below city peers. Agency staff reliance has been stable.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality Measures are borderline. Improvement opportunities have been identified in clinical incident reporting.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets requirements. No new notices outstanding.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is average. Falls rate is within the national mid-range. Monitoring protocol is in place.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive Care completion is within acceptable range. Cognitive assessment completion requires monitoring.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint resolution process is in place.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is acceptable. First Nations access gap is being monitored.",
        },
      },
    },

    {
      // HIGH performer — Overall ~4.6★
      id: "DAR-005",
      name: "Palmerston Aged Care",
      city: "Darwin",
      type: "Residential Aged Care",
      beds: 70,
      established: 2010,
      indicators: {
        residents: 4.6,
        staffing: 4.7,
        qualityMeasures: 4.8,
        compliance: 4.6,
        safetyClinical: 4.5,
        preventiveCare: 4.6,
        experience: 4.7,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are strong. Person-centred care model is well implemented.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are above minimum requirements. Staff satisfaction surveys are positive.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above benchmark. Falls with harm rate is well below national average.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained. No significant findings in recent audits.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety indicators are strong. Medication management scores are excellent.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive screening bundles are completed on schedule across all cohorts.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are in the top quartile. Resident and family satisfaction is high.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. First Nations engagement programs are active.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.5★
      id: "DAR-006",
      name: "Casuarina Senior Living",
      city: "Darwin",
      type: "Residential Aged Care",
      beds: 90,
      established: 2003,
      indicators: {
        residents: 3.5,
        staffing: 3.4,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.4,
        preventiveCare: 3.3,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at benchmark level. Care planning processes are being reviewed.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum requirements. Rostering improvements are underway.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are average. Falls monitoring has been enhanced.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. Minor advisory noted in last audit cycle.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Medication review schedule requires tightening.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive screening is near benchmark. Cognitive assessment completion is lagging.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Activities engagement could be improved.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access requires attention. First Nations and CALD referral pathways are limited.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.8★
      id: "DAR-007",
      name: "Wanguri Care Centre",
      city: "Darwin",
      type: "Residential Aged Care",
      beds: 65,
      established: 2015,
      indicators: {
        residents: 4.8,
        staffing: 4.9,
        qualityMeasures: 4.7,
        compliance: 4.9,
        safetyClinical: 4.8,
        preventiveCare: 4.7,
        experience: 4.8,
        equity: 4.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are exceptional. Care plan reviews are thorough and resident-led.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are well above sector average. Turnover is the lowest in the region.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are in the top decile nationally. Zero pressure injuries recorded last quarter.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Exemplary compliance. Commended at the most recent ACQSC site audit.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is outstanding. Multi-disciplinary governance is a demonstrated strength.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ All preventive bundles completed well ahead of schedule.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are best in city. Consumer advisory body is highly engaged.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity access is exceptional. Culturally safe care for First Nations residents is exemplary.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.0★
      id: "DAR-008",
      name: "Tiwi Aged Care",
      city: "Darwin",
      type: "Residential Aged Care",
      beds: 45,
      established: 1995,
      indicators: {
        residents: 2.0,
        staffing: 1.8,
        qualityMeasures: 2.1,
        compliance: 2.2,
        safetyClinical: 1.9,
        preventiveCare: 1.8,
        experience: 2.0,
        equity: 1.9,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Multiple formal complaints received in recent quarters.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below mandated minimums. Agency use is extremely high.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are in the bottom quintile. Falls and pressure injury rates are unacceptable.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Significant compliance breaches identified. Active remediation plan in place.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is critically poor. Medication errors and incidents are elevated.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening completion is critically low across all mandatory bundles.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are in the bottom decile. Complaint resolution is inadequate.",
        },
        equity: {
          trend: "declining",
          insight:
            "❌ Equity access is critically poor. First Nations and CALD community barriers are unaddressed.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.3★
      id: "DAR-009",
      name: "Karama Care",
      city: "Darwin",
      type: "Residential Aged Care",
      beds: 78,
      established: 2001,
      indicators: {
        residents: 3.3,
        staffing: 3.2,
        qualityMeasures: 3.4,
        compliance: 3.5,
        safetyClinical: 3.2,
        preventiveCare: 3.1,
        experience: 3.3,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is within acceptable range. Improvement plan has been initiated.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is at minimum compliance levels. Recruitment campaign is ongoing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are at benchmark. Falls monitoring frequency has been increased.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is adequate. Two areas flagged for improvement.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is at minimum acceptable level. Wound care protocols are being updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care is at benchmark. Flu vaccination coverage needs improvement.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint volumes have stabilised.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. First Nations programs are limited but present.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.8★
      id: "DAR-010",
      name: "Millner Senior Living",
      city: "Darwin",
      type: "Residential Aged Care",
      beds: 82,
      established: 2008,
      indicators: {
        residents: 3.8,
        staffing: 3.9,
        qualityMeasures: 3.7,
        compliance: 4.0,
        safetyClinical: 3.8,
        preventiveCare: 3.7,
        experience: 3.8,
        equity: 3.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average and steadily improving. Staff-to-resident relationships are strong.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are adequate. Training investment has increased this year.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures are satisfactory and improving. Falls prevention program has been enhanced.",
        },
        compliance: {
          trend: "improving",
          insight:
            "ℹ Compliance is strong. No significant findings in the most recent audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is within acceptable range. Medication management results are satisfactory.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care completion is near benchmark. Bowel screening uptake is improving.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience scores are improving. Resident council feedback has been positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is satisfactory. Interpreter services are available on request.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.4★
      id: "DAR-011",
      name: "Nakara Aged Care",
      city: "Darwin",
      type: "Residential Aged Care",
      beds: 55,
      established: 2000,
      indicators: {
        residents: 2.3,
        staffing: 2.4,
        qualityMeasures: 2.2,
        compliance: 2.5,
        safetyClinical: 2.1,
        preventiveCare: 2.3,
        experience: 2.4,
        equity: 2.2,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is below acceptable levels. Concerns have been escalated to management.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is insufficient. Agency reliance is high and care continuity is compromised.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Falls rate and pressure injuries are above benchmark.",
        },
        compliance: {
          trend: "stable",
          insight:
            "⚠ Compliance has areas requiring improvement. Corrective actions are open.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is poor. Incidents have increased in the last two quarters.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care is significantly below benchmark. Bundles are largely overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience is poor. Complaint resolution timeframes are unacceptably long.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is below standard. Language support services are inadequate.",
        },
      },
    },
  ],
  // ── Gold Coast: 5 providers ───────────────────────────────────────────────────────────────
  "Gold Coast": [
    {
      id: "GC-001",
      name: "Surfers Paradise Aged Care",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 120,
      established: 2003,
      indicators: {
        residents: 4.6,
        staffing: 4.7,
        qualityMeasures: 4.8,
        compliance: 4.9,
        safetyClinical: 4.7,
        preventiveCare: 4.6,
        experience: 4.8,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is outstanding. Survey scores place this facility in the top 10% in QLD.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Fully staffed with qualified personnel. RN hours per resident exceed the national benchmark.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality improvement program is exemplary. Zero serious incidents in the past two quarters.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full ACQSC compliance maintained. No outstanding conditions or notices.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is well below the QLD regional benchmark. Medication safety protocols are robust.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion above 95%. All vaccination and assessment bundles are current.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Resident and family experience ratings are exceptional. Complaint resolution averages under 48 hours.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Strong culturally safe care for CALD and First Nations residents. Interpreter services routinely available.",
        },
      },
    },
    {
      id: "GC-002",
      name: "Broadbeach Gardens Aged Care",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 85,
      established: 1998,
      indicators: {
        residents: 3.2,
        staffing: 3.1,
        qualityMeasures: 3.3,
        compliance: 3.4,
        safetyClinical: 3.2,
        preventiveCare: 3.0,
        experience: 3.1,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident Experience meets minimum standards. Satisfaction scores are consistent but show no growth trend.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing levels are adequate but agency staff reliance is increasing. Retention below city average.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are acceptable. Some incident reporting gaps identified in last audit cycle.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. One open recommendation from last ACQSC review.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Falls rate is near the state benchmark. Medication review frequency meets but does not exceed requirements.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care completion has dipped below 80% for cognitive assessments. Action plan initiated.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint volumes have been steady with no escalations.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity indicators are within acceptable range. CALD outreach program needs strengthening.",
        },
      },
    },
    {
      id: "GC-003",
      name: "Southport Community Care",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 65,
      established: 1990,
      indicators: {
        residents: 1.8,
        staffing: 1.9,
        qualityMeasures: 1.7,
        compliance: 2.0,
        safetyClinical: 1.8,
        preventiveCare: 1.6,
        experience: 1.7,
        equity: 2.1,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Multiple serious concerns raised in recent surveys.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Severe staffing shortages. RN hours per resident are significantly below the national minimum benchmark.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Multiple incidents unreported or under-investigated in the past quarter.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is at risk. Two outstanding improvement notices from ACQSC.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate exceeds state average by 35%. Medication error rate is above acceptable thresholds.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care bundle completion has fallen to 55%. Urgent remediation required.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Complaint volumes have increased significantly. Several unresolved complaints pending ACQSC escalation.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is marginal. Access barriers for First Nations residents not adequately addressed.",
        },
      },
    },
    {
      id: "GC-004",
      name: "Robina Aged Care & Wellness",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 110,
      established: 2010,
      indicators: {
        residents: 4.1,
        staffing: 4.0,
        qualityMeasures: 4.2,
        compliance: 4.3,
        safetyClinical: 4.1,
        preventiveCare: 4.0,
        experience: 4.2,
        equity: 3.9,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience scores have improved for three consecutive quarters. Meal quality and social programs commended.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing ratios are above benchmark. Allied health team is comprehensive and well integrated.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality improvement culture is strong. Clinical governance meetings are weekly and well documented.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ All ACQSC standards met. Proactive compliance program in place with quarterly internal audits.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "✅ Safety performance is above state average. Falls prevention program is evidence-based and actively monitored.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive screening completion is at 88% and improving. Advance care planning documentation is thorough.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Family feedback is very positive. Activities program is diverse and resident-centred.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is generally good. CALD engagement program in place with bilingual staff on roster.",
        },
      },
    },
    {
      id: "GC-005",
      name: "Coomera Seniors Village",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 75,
      established: 2007,
      indicators: {
        residents: 3.5,
        staffing: 3.6,
        qualityMeasures: 3.4,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.4,
        experience: 3.6,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average and trending upward. New lifestyle coordinator has improved engagement.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Some vacancies in specialist allied health roles are being addressed through recruitment.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures are improving. Recent investment in clinical documentation systems is yielding results.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is solid. Minor recommendations from last ACQSC assessment have been addressed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is above state midpoint. Wound management protocols have been recently updated.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive care improving steadily. Vaccination rates are at 85% and climbing toward target.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience feedback is positive and improving. Complaint resolution timeframes are reducing.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is average. Language support services available but expansion is planned.",
        },
      },
    },

    {
      // HIGH performer — Overall ~4.6★
      id: "GC-006",
      name: "Robina Aged Care",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 100,
      established: 2007,
      indicators: {
        residents: 4.5,
        staffing: 4.7,
        qualityMeasures: 4.6,
        compliance: 4.8,
        safetyClinical: 4.6,
        preventiveCare: 4.5,
        experience: 4.7,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are strong. Person-centred care reviews are conducted quarterly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing levels exceed minimum requirements. Staff satisfaction is high.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above benchmark. Falls prevention program is effective.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained. No significant findings in recent audits.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety indicators are strong. Medication management scores are excellent.",
        },
        preventiveCare: {
          trend: "stable",
          insight: "✅ Preventive screening bundles are completed on schedule.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are in the top quartile. Family satisfaction surveys are positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD community programs are active.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.4★
      id: "GC-007",
      name: "Southport Care Centre",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 115,
      established: 1999,
      indicators: {
        residents: 3.3,
        staffing: 3.5,
        qualityMeasures: 3.4,
        compliance: 3.6,
        safetyClinical: 3.3,
        preventiveCare: 3.2,
        experience: 3.4,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at benchmark level. Concerns around activities diversity noted.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum requirements. Rostering improvements are underway.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are average. Falls monitoring has been enhanced.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. Minor advisory raised in last audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Medication review schedule requires tightening.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive screening is near benchmark. Cognitive assessment completion is lagging.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Complaint resolution processes are in place.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below average. CALD access programs are limited.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.4★
      id: "GC-008",
      name: "Burleigh Heads Senior Living",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 80,
      established: 2013,
      indicators: {
        residents: 4.4,
        staffing: 4.5,
        qualityMeasures: 4.3,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.5,
        experience: 4.3,
        equity: 4.1,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is high and improving. New lifestyle activities have been well received.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are strong. Turnover rate is below sector average.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are well above benchmark. Pressure injury prevention is exemplary.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is excellent. No issues raised at last audit.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is strong. Incident reporting culture is well embedded.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive care bundles are completed on schedule across all cohorts.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are above average. Resident feedback is consistently positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is good. CALD and diverse community programs are active.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.0★
      id: "GC-009",
      name: "Broadbeach Aged Care",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 70,
      established: 1997,
      indicators: {
        residents: 3.0,
        staffing: 3.1,
        qualityMeasures: 2.9,
        compliance: 3.2,
        safetyClinical: 2.9,
        preventiveCare: 2.8,
        experience: 3.0,
        equity: 2.9,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at minimum acceptable level. Improvement plan is in place.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum requirements. Agency use is elevated.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "⚠ Quality measures are below benchmark. Falls prevention training is scheduled.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is adequate. Corrective actions from last audit are being addressed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "⚠ Clinical safety requires attention. Wound care incidents are being reviewed.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "⚠ Preventive screening is below benchmark. Bundle completion is delayed.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Activities engagement is below expectation.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access is below acceptable standard. CALD and First Nations support is limited.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.2★
      id: "GC-010",
      name: "Helensvale Senior Living",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 58,
      established: 1994,
      indicators: {
        residents: 2.1,
        staffing: 2.0,
        qualityMeasures: 2.3,
        compliance: 2.4,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.2,
        equity: 2.1,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Formal complaints have escalated.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below mandated minimums. High agency use is impacting care continuity.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are in the bottom quintile. Falls with harm rate is well above benchmark.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance breaches identified. Active remediation plan in place.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is critically poor. Medication errors and pressure injuries are elevated.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening completion is critically low. Mandatory bundles are largely overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are in the bottom decile. Complaint resolution timeframes are unacceptable.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access is poor. CALD and First Nations barriers remain unaddressed.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.7★
      id: "GC-011",
      name: "Ormeau Aged Care",
      city: "Gold Coast",
      type: "Residential Aged Care",
      beds: 88,
      established: 2011,
      indicators: {
        residents: 3.7,
        staffing: 3.8,
        qualityMeasures: 3.6,
        compliance: 3.9,
        safetyClinical: 3.7,
        preventiveCare: 3.6,
        experience: 3.8,
        equity: 3.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average and improving. New care coordinator has been effective.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are adequate. Training investment has increased this year.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures are satisfactory and improving. Falls prevention program has been enhanced.",
        },
        compliance: {
          trend: "improving",
          insight:
            "ℹ Compliance is strong. No significant findings in the most recent audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is within acceptable range. Medication audit scores are satisfactory.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care completion is near benchmark. Bowel screening uptake is improving.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience scores are improving. Resident council feedback has been positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is satisfactory. Interpreter services are available on request.",
        },
      },
    },
  ],

  // ── Newcastle: 4 providers ──────────────────────────────────────────────────────────────────
  Newcastle: [
    {
      id: "NEW-001",
      name: "Hunter Valley Aged Care",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 130,
      established: 2001,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.7,
        compliance: 4.8,
        safetyClinical: 4.6,
        preventiveCare: 4.5,
        experience: 4.7,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience is excellent across all survey dimensions. Feedback loop with residents is well established.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are outstanding. High staff retention and strong professional development program in place.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are exemplary. This facility benchmarks in the top 15% nationally on clinical indicators.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full ACQSC compliance. No outstanding conditions. Proactive regulatory engagement.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is well below the NSW benchmark. Comprehensive medication safety program in operation.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care completion at 96%. All assessment and screening bundles are current and documented.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Family and resident experience is consistently rated as excellent. Zero unresolved complaints on record.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Strong equity outcomes. First Nations liaison officer employed and CALD services well resourced.",
        },
      },
    },
    {
      id: "NEW-002",
      name: "Maitland Seniors Living",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 80,
      established: 1995,
      indicators: {
        residents: 3.1,
        staffing: 3.0,
        qualityMeasures: 3.2,
        compliance: 3.3,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 2.9,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is adequate. Survey response rates are low, reducing confidence in data reliability.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing levels are below the city average. Agency staff utilisation has increased over the past two quarters.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures meet minimum requirements. No sustained improvement trajectory observed.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained with one open advisory notice from the last inspection cycle.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is at the state midpoint. Falls prevention program needs refreshing.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care completion has declined to 76%. Cognitive screening is the primary gap area.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Some families have noted limited communication from care staff.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity performance is below the state average. CALD outreach is minimal.",
        },
      },
    },
    {
      id: "NEW-003",
      name: "Cessnock Care Centre",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 55,
      established: 1987,
      indicators: {
        residents: 2.1,
        staffing: 2.0,
        qualityMeasures: 2.2,
        compliance: 2.3,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.1,
        equity: 2.4,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is poor. Multiple adverse survey responses have been escalated to management.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing levels are critically low. Vacancies in nursing and personal care roles are affecting service delivery.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures show concerning trends. Incident reporting practices require significant improvement.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is at risk. Two improvement notices outstanding and a formal compliance review is scheduled.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate exceeds NSW benchmark significantly. Medication management review is required urgently.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care completion has fallen to 60%. Multiple assessment bundles are overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Complaint volumes have surged. Several complaints involve quality of care concerns being investigated.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is below acceptable levels. Support for CALD residents is inadequate.",
        },
      },
    },
    {
      id: "NEW-004",
      name: "Lake Macquarie Aged Care",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 100,
      established: 2006,
      indicators: {
        residents: 3.4,
        staffing: 3.5,
        qualityMeasures: 3.3,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.5,
        experience: 3.3,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident experience has improved following recent engagement with resident committee. Trend is positive.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate and stable. Succession planning for senior nurse roles is underway.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures have improved steadily following the appointment of a new Quality Manager.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All previous improvement notices have been resolved and closed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is above the state midpoint. Post-fall analysis protocol has been strengthened.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive care is improving. Vaccination rates are now above 87% and screening bundle completion is on target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is adequate. Activities program has been expanded with volunteer support.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is average. Translation services are available on request.",
        },
      },
    },

    {
      // HIGH performer — Overall ~4.5★
      id: "NEW-005",
      name: "Cessnock Aged Care",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 95,
      established: 2004,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.7,
        compliance: 4.6,
        safetyClinical: 4.5,
        preventiveCare: 4.4,
        experience: 4.6,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are strong. Person-centred care plans are reviewed monthly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing levels exceed minimum requirements. Staff satisfaction surveys are positive.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above benchmark. Pressure injury prevention is effective.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained. No significant findings in recent audits.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety indicators are strong. Medication management scores are excellent.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive screening bundles are completed on schedule across all cohorts.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are in the top quartile. Family satisfaction surveys are positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity access is good. CALD community programs are active.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.3★
      id: "NEW-006",
      name: "Maitland Senior Living",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 110,
      established: 2001,
      indicators: {
        residents: 4.2,
        staffing: 4.4,
        qualityMeasures: 4.3,
        compliance: 4.5,
        safetyClinical: 4.3,
        preventiveCare: 4.2,
        experience: 4.4,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is high. New lifestyle program has been very well received.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing ratios are strong. Staff turnover is below regional average.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above benchmark. Falls rate is well below national average.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Compliance is excellent. No issues raised at last audit.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is strong. Incident reporting and review processes are robust.",
        },
        preventiveCare: {
          trend: "stable",
          insight: "✅ Preventive care bundles are completed on schedule.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are above average. Complaint volumes are low.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is good. Translation services are available and utilised.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.5★
      id: "NEW-007",
      name: "Raymond Terrace Care",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 75,
      established: 1998,
      indicators: {
        residents: 3.4,
        staffing: 3.5,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.4,
        preventiveCare: 3.3,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at benchmark level. Meals and activities programs are being reviewed.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum requirements. Rostering improvements are underway.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are average. Falls monitoring has been enhanced.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. Minor advisory raised in last audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Medication review schedule requires tightening.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive screening is near benchmark. Cognitive assessment completion is lagging.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Complaint resolution processes are in place.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below average. CALD access programs are limited.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.2★
      id: "NEW-008",
      name: "Charlestown Aged Care",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 88,
      established: 2002,
      indicators: {
        residents: 3.1,
        staffing: 3.2,
        qualityMeasures: 3.3,
        compliance: 3.4,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is below the city average. A care improvement plan has been initiated.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is at minimum compliance levels. Recruitment campaign is ongoing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are at benchmark. Falls monitoring frequency has been increased.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is adequate. Two areas flagged for improvement.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is at minimum acceptable level. Wound care protocols are being updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care is at benchmark. Flu vaccination coverage needs improvement.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint volumes have stabilised.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. CALD programs are limited but present.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.2★
      id: "NEW-009",
      name: "Cardiff Care Services",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 52,
      established: 1993,
      indicators: {
        residents: 2.1,
        staffing: 2.0,
        qualityMeasures: 2.3,
        compliance: 2.4,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.2,
        equity: 2.1,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Multiple formal complaints received this quarter.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below mandated minimums. High agency use is impacting care quality.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are in the bottom quintile. Falls with harm rate is significantly above benchmark.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance breaches identified. Active remediation plan is monitored by ACQSC.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is critically poor. Medication errors and incidents are elevated.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive screening completion is critically low. Mandatory bundles are largely overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are in the bottom decile. Complaint volumes have risen sharply.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity access is poor. CALD and First Nations barriers are unaddressed.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.7★
      id: "NEW-010",
      name: "Belmont Senior Living",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 80,
      established: 2009,
      indicators: {
        residents: 3.7,
        staffing: 3.8,
        qualityMeasures: 3.6,
        compliance: 3.9,
        safetyClinical: 3.7,
        preventiveCare: 3.6,
        experience: 3.8,
        equity: 3.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident satisfaction is above average and improving. New activities coordinator is making a difference.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing ratios are adequate. Training investment has increased this financial year.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures are satisfactory and improving. Falls prevention program has been enhanced.",
        },
        compliance: {
          trend: "improving",
          insight:
            "ℹ Compliance is strong. No significant findings in the most recent audit.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is within acceptable range. Medication audit scores are satisfactory.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care completion is near benchmark. Bowel screening uptake is improving.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience scores are improving. Resident council feedback has been positive.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is satisfactory. Interpreter services are available on request.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.5★
      id: "NEW-011",
      name: "Swansea Aged Care",
      city: "Newcastle",
      type: "Residential Aged Care",
      beds: 60,
      established: 2000,
      indicators: {
        residents: 2.4,
        staffing: 2.5,
        qualityMeasures: 2.3,
        compliance: 2.6,
        safetyClinical: 2.2,
        preventiveCare: 2.4,
        experience: 2.5,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is below acceptable levels. Dignity of care concerns have been raised by families.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is insufficient. Agency reliance is high and continuity of care is poor.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Pressure injury and falls rates are both above benchmark.",
        },
        compliance: {
          trend: "stable",
          insight:
            "⚠ Compliance has areas requiring improvement. Corrective actions are open.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Clinical safety is poor. Incidents have increased in the last two quarters.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care is significantly below benchmark. Screening bundles are largely overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience is poor. Complaint resolution timeframes are unacceptably long.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is below standard. Language support services are inadequate.",
        },
      },
    },
  ],

  // ── Wollongong: 4 providers ───────────────────────────────────────────────────────────────
  Wollongong: [
    {
      id: "WOL-001",
      name: "Illawarra Aged Care",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 115,
      established: 2004,
      indicators: {
        residents: 4.5,
        staffing: 4.4,
        qualityMeasures: 4.6,
        compliance: 4.8,
        safetyClinical: 4.5,
        preventiveCare: 4.6,
        experience: 4.5,
        equity: 4.2,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction surveys consistently score above 4.4. Personalised care planning is a strength.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are well above benchmark. Allied health complement is comprehensive and resident-focussed.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality outcomes are excellent. This facility is a regional reference point for best practice dementia care.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance with all applicable standards. Regulatory history is clean with no adverse findings.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is below NSW benchmark. Medication reconciliation on admission is exemplary.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care completion at 94%. Advance care planning is integrated into the care pathway.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Family satisfaction is very high. Communication and responsiveness are frequently commended.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity outcomes are strong. Dedicated programs for CALD and LGBTQI+ residents are in operation.",
        },
      },
    },
    {
      id: "WOL-002",
      name: "Shellharbour Senior Living",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 72,
      established: 1999,
      indicators: {
        residents: 3.0,
        staffing: 2.9,
        qualityMeasures: 3.1,
        compliance: 3.2,
        safetyClinical: 3.0,
        preventiveCare: 2.9,
        experience: 3.0,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is average. Survey response rates require improvement for more reliable benchmarking.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate but below the regional median. Some enrolled nurse positions are vacant.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures meet minimum thresholds. Improvement opportunities have been identified in wound care management.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. No adverse notices outstanding but internal audit gaps have been identified.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is at the state average. Falls prevention resources have been reviewed.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care completion at 74%. Nutritional screening is a particular gap requiring targeted action.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint management process is adequate but slow.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is within acceptable range. No dedicated CALD program currently in place.",
        },
      },
    },
    {
      id: "WOL-003",
      name: "Dapto Aged Services",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 50,
      established: 1985,
      indicators: {
        residents: 1.9,
        staffing: 1.8,
        qualityMeasures: 2.0,
        compliance: 2.1,
        safetyClinical: 1.9,
        preventiveCare: 1.7,
        experience: 1.8,
        equity: 2.2,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is very low. Survey results indicate systemic issues with personalised care delivery.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Critical staffing shortages are impacting care quality. Agency dependency is unsustainably high.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Multiple clinical incidents have been inadequately reviewed or documented.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Compliance is below standard. Three improvement notices are outstanding with ACQSC engagement in progress.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate is 40% above the NSW state average. Medication error rates are elevated.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care bundle completion has dropped to 52%. Emergency remediation plan has been submitted.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Multiple unresolved complaints are under review. Advocacy body has been engaged by affected families.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is below the state average. Access barriers are not being adequately addressed.",
        },
      },
    },
    {
      id: "WOL-004",
      name: "Kiama Coastal Care",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 90,
      established: 2011,
      indicators: {
        residents: 4.0,
        staffing: 4.1,
        qualityMeasures: 4.0,
        compliance: 4.2,
        safetyClinical: 4.0,
        preventiveCare: 3.9,
        experience: 4.1,
        equity: 3.8,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience has improved consistently over the past 12 months due to a strengthened consumer engagement program.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing ratios exceed the national benchmark. High retention rates reflect a positive workplace culture.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality outcomes are improving. A new clinical governance framework has been embedded across all care teams.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained. Internal auditing processes are rigorous and well documented.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety metrics are above the state average and improving. Post-fall analysis has reduced repeat incident rates.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care is at 85%. Advance care planning documentation has been strengthened.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Family satisfaction ratings are high and improving. Weekend staffing improvements have been well received.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is good. Culturally safe care plans are in place for all CALD and First Nations residents.",
        },
      },
    },
    {
      id: "WOL-005",
      name: "Shellharbour Aged Care",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 95,
      established: 2008,
      indicators: {
        residents: 4.3,
        staffing: 4.4,
        qualityMeasures: 4.5,
        compliance: 4.6,
        safetyClinical: 4.3,
        preventiveCare: 4.2,
        experience: 4.4,
        equity: 4.1,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is excellent. Coastal lifestyle programs and person-centred care are highly valued.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels consistently exceed the NSW benchmark. Strong allied health team supports resident outcomes.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality indicators are in the top quartile for the Illawarra region. Clinical governance is comprehensive.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full ACQSC compliance maintained. No adverse findings across three consecutive assessment cycles.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is well below the state average. Safety culture is embedded across all care teams.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care completion at 93%. Vaccination and screening programs are systematically managed.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are outstanding. Family engagement and community connection are defining strengths.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is good. Culturally safe care plans are in place for CALD and First Nations residents.",
        },
      },
    },
    {
      id: "WOL-006",
      name: "Kiama Senior Living",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 70,
      established: 2012,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.7,
        compliance: 4.8,
        safetyClinical: 4.5,
        preventiveCare: 4.4,
        experience: 4.6,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is exceptional. Scenic coastal environment and premium care model deliver outstanding outcomes.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing is a key strength. Low turnover and strong graduate pipeline from University of Wollongong.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are among the best in NSW South Coast. Continuous improvement is organisational culture.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Exemplary compliance record. Proactive regulatory engagement and zero adverse findings since establishment.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm and medication safety are exceptional. Safety innovations are shared with regional peers.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care at 96%. All clinical assessment bundles are completed on schedule with no overdue items.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are top decile in NSW. Resident voice is central to service design and delivery.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent. Dedicated CALD and First Nations programs are fully resourced and well integrated.",
        },
      },
    },
    {
      id: "WOL-007",
      name: "Dapto Care Centre",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 88,
      established: 2000,
      indicators: {
        residents: 3.5,
        staffing: 3.6,
        qualityMeasures: 3.4,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.4,
        experience: 3.6,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is above average. Consumer engagement program is active but participation rates vary.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Some reliance on agency staff for weekend shifts is noted.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures have improved following targeted review. Clinical documentation standards are strengthening.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. One advisory note from the last ACQSC assessment has been resolved.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is near the state average. Falls prevention program is active.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive care improving. Vaccination rates have reached 85% this quarter.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is above average. Activities calendar covers seven days with good resident variety.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. Cultural support services are available on request.",
        },
      },
    },
    {
      id: "WOL-008",
      name: "Figtree Aged Care",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 115,
      established: 1998,
      indicators: {
        residents: 3.2,
        staffing: 3.1,
        qualityMeasures: 3.3,
        compliance: 3.0,
        safetyClinical: 3.2,
        preventiveCare: 3.1,
        experience: 3.0,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at the state average. No major concerns but improvement opportunities exist.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing has declined slightly. Difficulty retaining experienced care staff in a competitive Illawarra market.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures meet minimum requirements. Improvement plan is in development.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. Regulatory history is clean with no active improvement notices.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is at the state midpoint. Falls rate is within acceptable bounds.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care has dipped to 79%. Medication review completion has fallen below the recommended threshold.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Activities calendar is adequate but weekends are understaffed.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is acceptable. No dedicated equity program is currently in place.",
        },
      },
    },
    {
      id: "WOL-009",
      name: "Thirroul Care",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 55,
      established: 1993,
      indicators: {
        residents: 2.5,
        staffing: 2.4,
        qualityMeasures: 2.6,
        compliance: 2.3,
        safetyClinical: 2.5,
        preventiveCare: 2.4,
        experience: 2.3,
        equity: 2.6,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is below standard. Formal complaints have been escalated to ACQSC this quarter.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is critically low. Overnight RN coverage does not consistently meet the mandated minimum.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Multiple clinical audit findings remain unresolved.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two active improvement notices are outstanding. Provider is under enhanced ACQSC monitoring.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate significantly exceeds the state average. Urgent clinical safety review is in progress.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 58%. Multiple assessment bundles are critically overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores have deteriorated. Advocacy body involvement has been requested by families.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. No cultural safety protocols are currently operational.",
        },
      },
    },
    {
      id: "WOL-010",
      name: "Corrimal Senior Living",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 80,
      established: 2005,
      indicators: {
        residents: 3.8,
        staffing: 3.7,
        qualityMeasures: 3.9,
        compliance: 4.0,
        safetyClinical: 3.8,
        preventiveCare: 3.7,
        experience: 3.9,
        equity: 3.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident experience is improving. Consumer feedback forums have been well attended this quarter.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is above average. Graduate nurse program has strengthened the permanent workforce.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures are above average and trending upward. Structured improvement calendar is active.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. No active improvement notices and regulatory engagement is constructive.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "ℹ Safety performance is above the state midpoint. Falls prevention protocols have been updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 87%. Vaccination and screening programs are on track.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience is above average. Social activities seven days a week have been positively received.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. CALD support services are available and used regularly.",
        },
      },
    },
    {
      id: "WOL-011",
      name: "Fairy Meadow Aged Care",
      city: "Wollongong",
      type: "Residential Aged Care",
      beds: 62,
      established: 2015,
      indicators: {
        residents: 2.2,
        staffing: 2.1,
        qualityMeasures: 2.3,
        compliance: 2.0,
        safetyClinical: 2.2,
        preventiveCare: 2.1,
        experience: 2.0,
        equity: 2.4,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is poor. Survey response rates are low and qualitative feedback is highly negative.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing shortages are severe. Multiple care positions have been vacant for over three months.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are well below the state benchmark. Incident investigation processes require urgent improvement.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Three improvement notices are active. Escalated regulatory scrutiny is ongoing.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate is critically elevated. Emergency review of clinical safety protocols has been initiated.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 54%. Critical backlog of overdue assessment bundles is a significant patient safety risk.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are critically low. Multiple formal complaints are under ACQSC investigation.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is critically below standard. Cultural and linguistic support services are absent.",
        },
      },
    },
  ],

  // ── Geelong: 4 providers ───────────────────────────────────────────────────────────────────
  Geelong: [
    {
      id: "GEE-001",
      name: "Bellarine Peninsula Aged Care",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 125,
      established: 2005,
      indicators: {
        residents: 4.3,
        staffing: 4.4,
        qualityMeasures: 4.5,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.3,
        experience: 4.5,
        equity: 4.1,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience is excellent. Recent refurbishment and lifestyle program upgrades have significantly lifted scores.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above benchmark. Specialist dementia care team is a notable strength.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures reflect best practice clinical governance. Peer review processes are well embedded.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full ACQSC compliance. Clean regulatory history with proactive quality and safety reporting.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is below the VIC benchmark. Clinical safety program is regarded as a regional model.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care completion at 92%. Annual care plan reviews are conducted on schedule for all residents.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Resident and family feedback is consistently excellent. Social engagement and community connection are prioritised.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity performance is strong. Dedicated CALD support coordinator on staff.",
        },
      },
    },
    {
      id: "GEE-002",
      name: "Lara Aged Care Services",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 78,
      established: 1997,
      indicators: {
        residents: 3.1,
        staffing: 3.2,
        qualityMeasures: 3.0,
        compliance: 3.3,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.1,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is at the state average. Survey participation rates are adequate.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum requirements. Allied health coverage is limited to contracted weekly visits.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are at minimum standards. No sustained improvement or decline noted.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained with one advisory open from the last assessment period.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is near the state average. Falls monitoring program is active but not improving.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care completion has slipped to 78%. Nutritional assessment completion is the primary concern.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint volumes have been stable with no escalations.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is acceptable. No dedicated CALD or First Nations programs currently in operation.",
        },
      },
    },
    {
      id: "GEE-003",
      name: "Corio Bay Aged Facility",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 60,
      established: 1988,
      indicators: {
        residents: 2.0,
        staffing: 2.1,
        qualityMeasures: 2.0,
        compliance: 2.2,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.0,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is poor. Systemic issues with person-centred care practice have been flagged in recent reviews.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing levels are significantly below the VIC benchmark. RN coverage gaps are occurring overnight.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are below standard. Clinical incident management processes require urgent review.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices outstanding. ACQSC formal monitoring engagement is in progress.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate is above the VIC average. Medication management review has been requested by the regulator.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 58%. Multiple assessment bundles are significantly overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Unresolved complaints have increased. Advocacy body involvement has been requested by a number of families.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity performance is poor. No cultural safety frameworks or First Nations protocols are in place.",
        },
      },
    },
    {
      id: "GEE-004",
      name: "Surf Coast Aged Care",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 95,
      established: 2009,
      indicators: {
        residents: 3.6,
        staffing: 3.7,
        qualityMeasures: 3.5,
        compliance: 3.8,
        safetyClinical: 3.6,
        preventiveCare: 3.5,
        experience: 3.7,
        equity: 3.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident experience is above average and improving. Consumer advisory body is active and influential.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is above the minimum benchmark. Registered nurse hours are now meeting the mandated minimum.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures are improving. New clinical governance committee established in the last quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Full compliance. All previous improvement notices are closed and a preventive audit schedule is in place.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "ℹ Safety outcomes are above the state midpoint and improving. Falls prevention program has been updated.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive care improving. Vaccination rates are now at 86% with a target of 92% by end of quarter.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience scores are improving. Complaint resolution timeframes have been reduced to an average of 5 days.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. Cultural competency training has been delivered to all care staff this year.",
        },
      },
    },
    {
      id: "GEE-005",
      name: "Lara Aged Care",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 90,
      established: 2007,
      indicators: {
        residents: 4.2,
        staffing: 4.3,
        qualityMeasures: 4.4,
        compliance: 4.5,
        safetyClinical: 4.2,
        preventiveCare: 4.1,
        experience: 4.3,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is excellent. Community-based environment and strong family engagement are key strengths.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above the VIC benchmark. Low turnover supports care continuity.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality indicators are above average and improving. Structured clinical governance supports continuous improvement.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full ACQSC compliance. Regulatory engagement is proactive and no adverse notices issued.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is below the state average. Comprehensive post-fall analysis is routinely performed.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care at 91%. Vaccination and advance care planning completion are systematically tracked.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are strong. Resident voice is central to service planning and activities programming.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is good. Cultural diversity programs are in place for CALD residents.",
        },
      },
    },
    {
      id: "GEE-006",
      name: "Ocean Grove Senior Living",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 75,
      established: 2011,
      indicators: {
        residents: 4.6,
        staffing: 4.5,
        qualityMeasures: 4.7,
        compliance: 4.8,
        safetyClinical: 4.6,
        preventiveCare: 4.5,
        experience: 4.7,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is exceptional. Coastal lifestyle setting and premium person-centred model consistently deliver outstanding outcomes.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing is a major strength. Long-tenured team and strong partnerships with Deakin University provide graduate pipeline.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are among the best in regional Victoria. Innovation in dementia care is a recognised strength.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Exemplary compliance record. Zero adverse findings since establishment and proactive regulatory engagement.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm and medication safety are top decile. Safety innovations are shared across the provider network.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care at 95%. All clinical bundles completed on schedule with no overdue assessments.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are outstanding. Family engagement and transparency are defining organisational values.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent. Dedicated CALD and First Nations programs are fully resourced.",
        },
      },
    },
    {
      id: "GEE-007",
      name: "Leopold Care Centre",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 100,
      established: 2003,
      indicators: {
        residents: 3.4,
        staffing: 3.5,
        qualityMeasures: 3.3,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.3,
        experience: 3.5,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is above average. Consumer engagement is active and participation rates are growing.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate and stable. Some reliance on agency staff for weekend and evening shifts.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures have improved following targeted clinical review. Documentation standards are strengthening.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. One advisory note from the last assessment cycle has been resolved.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is above the state midpoint. Falls prevention program is well established.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 84%. Medication review completion is on target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is above average. Activities calendar covers seven days with good variety.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. Cultural support services are available on request.",
        },
      },
    },
    {
      id: "GEE-008",
      name: "Corio Aged Care",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 120,
      established: 1997,
      indicators: {
        residents: 3.1,
        staffing: 3.0,
        qualityMeasures: 3.2,
        compliance: 3.1,
        safetyClinical: 3.0,
        preventiveCare: 2.9,
        experience: 3.1,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident satisfaction is at the state average. No major concerns but improvement opportunities are identified.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing has declined slightly due to competitive regional labour market. Agency reliance is increasing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures meet minimum requirements. Improvement plan is in development.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. Regulatory history is clean with no active improvement notices.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is at the state midpoint. Falls rate is within acceptable bounds.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care has dipped to 78%. Pain assessment and behavioural review completion are below target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Weekend activities are limited due to staffing constraints.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is acceptable. No dedicated equity program is currently in place.",
        },
      },
    },
    {
      id: "GEE-009",
      name: "Norlane Care",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 58,
      established: 1991,
      indicators: {
        residents: 2.3,
        staffing: 2.2,
        qualityMeasures: 2.4,
        compliance: 2.1,
        safetyClinical: 2.3,
        preventiveCare: 2.2,
        experience: 2.1,
        equity: 2.5,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is below standard. Formal complaints have been lodged with the Aged Care Quality and Safety Commission.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is critically low. Overnight RN coverage does not consistently meet the mandated minimum.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Multiple clinical audit findings remain unresolved from prior quarter.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices are active. Provider is under enhanced monitoring by ACQSC.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate significantly exceeds the VIC average. Urgent clinical safety review is in progress.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 60%. Multiple assessment bundles are critically overdue.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores have deteriorated markedly. Advocacy body involvement has been requested by families.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. Cultural safety protocols are not currently operational.",
        },
      },
    },
    {
      id: "GEE-010",
      name: "Bell Park Senior Living",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 85,
      established: 2009,
      indicators: {
        residents: 3.9,
        staffing: 3.8,
        qualityMeasures: 4.0,
        compliance: 4.1,
        safetyClinical: 3.9,
        preventiveCare: 3.8,
        experience: 4.0,
        equity: 3.7,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident experience is improving. Consumer feedback forums are well attended and actioned promptly.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is above average. Graduate nurse program has strengthened the permanent care workforce.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures are above average and trending upward. Structured improvement calendar is actively managed.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. No active improvement notices and regulatory engagement is constructive.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "ℹ Safety performance is above the state midpoint and improving. Falls prevention protocols have been updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 88%. Vaccination and screening programs are on track for the quarter.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience is above average. Seven-day activities program has been positively received by residents and families.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is adequate. CALD support services are available and well used.",
        },
      },
    },
    {
      id: "GEE-011",
      name: "Moolap Aged Care",
      city: "Geelong",
      type: "Residential Aged Care",
      beds: 48,
      established: 2018,
      indicators: {
        residents: 2.0,
        staffing: 1.9,
        qualityMeasures: 2.1,
        compliance: 1.8,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 1.8,
        equity: 2.2,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically poor. Multiple formal complaints are under ACQSC investigation.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing shortages are severe. Multiple care positions have been vacant for more than three months.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are well below the state benchmark. Incident investigation processes require urgent reform.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Three improvement notices are active. Escalated regulatory scrutiny with potential sanctions is ongoing.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate is critically elevated. Emergency review of clinical safety protocols has been commissioned.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 52%. Critical backlog of overdue assessment bundles poses significant clinical risk.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are critically low. Media scrutiny has been received following family complaints.",
        },
        equity: {
          trend: "declining",
          insight:
            "❌ Equity is critically below standard. Cultural and linguistic support services are absent.",
        },
      },
    },
  ],

  // ── Townsville: 4 providers ───────────────────────────────────────────────────────────────
  Townsville: [
    {
      id: "TSV-001",
      name: "North Queensland Aged Care",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 140,
      established: 2002,
      indicators: {
        residents: 4.4,
        staffing: 4.5,
        qualityMeasures: 4.6,
        compliance: 4.7,
        safetyClinical: 4.5,
        preventiveCare: 4.4,
        experience: 4.6,
        equity: 4.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience is excellent. Strong First Nations and CALD engagement programs have boosted satisfaction scores.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing ratios are above the QLD benchmark. Retention is strong with a supported professional development pathway.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality indicators place this provider in the top quartile for North Queensland. Clinical governance is mature.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained across all ACQSC standards. No adverse findings in the past two assessment cycles.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm and medication safety indicators are well below the national average. Safety culture is embedded.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care completion is at 94% and improving. Tropical health and heat safety protocols are integrated.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are outstanding. Community connectedness and cultural celebration are defining features.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent. Dedicated First Nations coordinator and bilingual care staff support diverse community needs.",
        },
      },
    },
    {
      id: "TSV-002",
      name: "Castle Hill Seniors Care",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 82,
      established: 1996,
      indicators: {
        residents: 3.1,
        staffing: 3.0,
        qualityMeasures: 3.2,
        compliance: 3.1,
        safetyClinical: 3.0,
        preventiveCare: 2.9,
        experience: 3.1,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is average. Survey response rates are low due to geographic and socio-economic factors.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing has been negatively affected by regional workforce shortages. Agency reliance is increasing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are adequate. No sustained improvement trend has been demonstrated.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance meets requirements. Minor advisory notes have been addressed from the last assessment.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is at the state midpoint. Heat-related risk management protocols are current.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care completion has fallen to 75%. Tropical disease screening gaps have been identified.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Activities program is limited by staffing constraints.",
        },
        equity: {
          trend: "improving",
          insight:
            "ℹ Equity is above average for the region. Cultural safety training is routinely delivered.",
        },
      },
    },
    {
      id: "TSV-003",
      name: "Pallarenda Aged Services",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 55,
      established: 1989,
      indicators: {
        residents: 2.0,
        staffing: 1.9,
        qualityMeasures: 2.1,
        compliance: 2.2,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.0,
        equity: 2.4,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is low. Systemic complaints about care quality and responsiveness have been lodged.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Workforce crisis is acute. Significant nursing vacancies are creating dangerous care delivery gaps.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are below standard. Incident management has not improved following previous audit findings.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices outstanding. The provider is subject to enhanced monitoring by ACQSC.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Safety indicators are significantly below the QLD average. Medication management is flagged as a priority risk.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care completion at 55%. Urgent remediation is required across all assessment bundle types.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Multiple unresolved complaints are in progress. External advocacy has been sought by multiple families.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard for the region. First Nations residents report inadequate cultural support.",
        },
      },
    },
    {
      id: "TSV-004",
      name: "Aitkenvale Aged Care Centre",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 105,
      established: 2013,
      indicators: {
        residents: 4.0,
        staffing: 4.1,
        qualityMeasures: 4.0,
        compliance: 4.2,
        safetyClinical: 4.0,
        preventiveCare: 3.9,
        experience: 4.1,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience has improved following the introduction of a dedicated resident liaison role.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above the QLD benchmark. Remote area allowances have improved recruitment outcomes.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above the state average. A structured quality improvement calendar is in place.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance maintained. Proactive regulatory engagement continues with ACQSC.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Safety metrics have improved significantly. New medication management system implemented last quarter.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 86%. Tropical and First Nations health screening protocols are current.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience is above average and improving. Family communication has been strengthened with digital updates.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent for the region. First Nations cultural programs and bilingual care pathways are in place.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.5★
      id: "TSV-005",
      name: "Kirwan Community Care",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 95,
      established: 2003,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.4,
        compliance: 4.7,
        safetyClinical: 4.5,
        preventiveCare: 4.3,
        experience: 4.6,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are strong. Person-centred care plans are reviewed monthly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios consistently exceed requirements. Retention program is effective.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above the QLD benchmark. Falls prevention program is outstanding.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Full compliance maintained. Last ACQSC site audit received commendations.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is excellent. Medication error rate is below the national average.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive care completion at 91%. Vaccination and screening rates are exemplary.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are top-quartile regionally. Consumer advisory body is highly active.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent. First Nations elder liaison officer supports culturally safe care.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.5★
      id: "TSV-006",
      name: "Aitkenvale Senior Services",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 72,
      established: 2007,
      indicators: {
        residents: 3.5,
        staffing: 3.4,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.3,
        experience: 3.4,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are satisfactory. Care plan review cycle is on track.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets requirements. Some agency use during peak leave periods.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are near the benchmark. No adverse events in the last quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All required assessments are current.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Falls rate is close to the state average.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 82%. Bowel screening uptake is improving.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Complaint volumes are low and resolved promptly.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity indicators are within range. CALD outreach services available on request.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.3★
      id: "TSV-007",
      name: "Mundingburra Aged Care",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 60,
      established: 1999,
      indicators: {
        residents: 3.2,
        staffing: 3.3,
        qualityMeasures: 3.1,
        compliance: 3.4,
        safetyClinical: 3.2,
        preventiveCare: 3.0,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are around the state midpoint. Improvements are planned.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels meet minimum requirements with some reliance on part-time staff.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are at the benchmark. No serious adverse events recorded.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. One minor corrective action was addressed last quarter.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable limits. Falls management protocol is under review.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 80%. Vaccination uptake meets the minimum threshold.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is adequate. Resident satisfaction surveys returned mixed results.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is near the standard. Language support requires strengthening.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.7★
      id: "TSV-008",
      name: "Hyde Park Care Centre",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 110,
      established: 2012,
      indicators: {
        residents: 4.7,
        staffing: 4.8,
        qualityMeasures: 4.6,
        compliance: 4.8,
        safetyClinical: 4.7,
        preventiveCare: 4.5,
        experience: 4.8,
        equity: 4.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are exceptional. Care planning is individualised and comprehensive.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are well above sector average. Staff satisfaction scores are excellent.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are in the top decile for QLD. Zero pressure injuries last two quarters.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Exemplary compliance record. Proactive regulatory engagement with ACQSC.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is outstanding. Multidisciplinary safety rounds are conducted weekly.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive bundles completed ahead of schedule each quarter.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are highest in the city. Consumer advisory body is embedded in governance.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity access is exceptional. First Nations cultural safety program is nationally recognised.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.6★
      id: "TSV-009",
      name: "Hermit Park Senior Living",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 85,
      established: 2005,
      indicators: {
        residents: 3.6,
        staffing: 3.5,
        qualityMeasures: 3.7,
        compliance: 3.8,
        safetyClinical: 3.6,
        preventiveCare: 3.4,
        experience: 3.5,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are above average. Care plan quality is being refined.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Nurse-to-resident ratio meets the regulated minimum.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality performance is near benchmark. Pressure injury prevention is a focus area.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All corrective actions from last audit have been closed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable range. Post-fall review process is improving.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 84%. Dementia and cognitive assessment completion is on track.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is satisfactory. Resident and family feedback is captured quarterly.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is near the standard. CALD intake is increasing and supports are being reviewed.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.3★
      id: "TSV-010",
      name: "Currajong Aged Care",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 55,
      established: 1996,
      indicators: {
        residents: 2.3,
        staffing: 2.1,
        qualityMeasures: 2.0,
        compliance: 2.4,
        safetyClinical: 2.2,
        preventiveCare: 1.9,
        experience: 2.1,
        equity: 2.0,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident outcomes are below benchmark. Care plan review rates are insufficient.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below the required minimum. High turnover is a systemic risk.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are significantly below the QLD benchmark. Adverse events are increasing.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices are outstanding. Regulatory oversight has been escalated.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate exceeds the state benchmark. Urgent clinical safety plan required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 62%. Multiple assessment bundles are overdue and unaddressed.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are very low. Several complaints have been referred to the Commissioner.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. No formal First Nations or CALD cultural safety plan exists.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.4★
      id: "TSV-011",
      name: "Thuringowa Care Services",
      city: "Townsville",
      type: "Residential Aged Care",
      beds: 78,
      established: 2010,
      indicators: {
        residents: 3.4,
        staffing: 3.3,
        qualityMeasures: 3.5,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.2,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are at the state midpoint. Improvement initiatives are underway.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels are adequate but reliance on agency staff needs addressing.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are near the benchmark. No critical incidents in the past quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Annual audit outcome was acceptable with minor recommendations.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is adequate. Falls management is being reviewed and updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 81%. Cognitive screening completion is near target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Resident satisfaction program is being strengthened.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is within acceptable range. Interpreter services are available but underutilised.",
        },
      },
    },
  ],

  // ── Cairns: 4 providers ───────────────────────────────────────────────────────────────────
  Cairns: [
    {
      id: "CNS-001",
      name: "Tropical Reef Aged Care",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 120,
      established: 2006,
      indicators: {
        residents: 4.4,
        staffing: 4.3,
        qualityMeasures: 4.5,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.3,
        experience: 4.5,
        equity: 4.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident satisfaction is excellent. Multicultural program and tropical lifestyle activities are highly valued.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above the benchmark. Strong relationships with James Cook University provide a pipeline of graduates.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality indicators are among the best in Far North QLD. Clinical governance structure is comprehensive.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full ACQSC compliance. Regulatory history is clean with no adverse findings across three assessment cycles.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is well below the QLD average. Tropical environment risk protocols (heat, hydration) are excellent.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care completion at 93%. Tropical disease screening and vaccination rates are outstanding.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are outstanding. Community connection and family engagement are defining organisational strengths.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is exceptional. First Nations elder care program is a recognised model of best practice in QLD.",
        },
      },
    },
    {
      id: "CNS-002",
      name: "Manoora Aged Services",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 70,
      established: 1994,
      indicators: {
        residents: 3.2,
        staffing: 3.0,
        qualityMeasures: 3.1,
        compliance: 3.3,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.5,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is adequate. Difficult to recruit survey participants from high-dependency cohorts.",
        },
        staffing: {
          trend: "declining",
          insight:
            "⚠ Staffing levels have declined. Regional workforce shortages are acutely felt in this location.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are acceptable but stagnant. No targeted quality improvement initiatives are in progress.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. One open recommendation from the last assessment has a plan in place.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is near the state midpoint. Heat-related incident protocols are current but untested.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care at 76%. Tropical disease screening completion has fallen below target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Activities program is limited in scope due to staffing constraints.",
        },
        equity: {
          trend: "improving",
          insight:
            "ℹ Equity is above average. Cultural safety training program has been recently updated.",
        },
      },
    },
    {
      id: "CNS-003",
      name: "Cairns Southside Care Centre",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 58,
      established: 1986,
      indicators: {
        residents: 1.8,
        staffing: 1.7,
        qualityMeasures: 1.9,
        compliance: 2.0,
        safetyClinical: 1.8,
        preventiveCare: 1.7,
        experience: 1.8,
        equity: 2.1,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is critically low. Systemic concerns about dignity and person-centred care have been raised.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is at crisis level. RN hours per resident fall significantly below the national minimum.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality outcomes are poor. Multiple serious incidents have been inadequately managed and reported.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Three improvement notices outstanding. Formal compliance investigation by ACQSC is in progress.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate is well above the state average. Medication mismanagement has been identified as a serious risk.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 50%. Vaccination coverage is critically below target and poses infection control risks.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Multiple escalated complaints are under formal investigation. Media scrutiny has been received.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. First Nations cultural safety is not being adequately addressed.",
        },
      },
    },
    {
      id: "CNS-004",
      name: "Edmonton Community Aged Care",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 88,
      established: 2001,
      indicators: {
        residents: 3.4,
        staffing: 3.5,
        qualityMeasures: 3.3,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.3,
        experience: 3.5,
        equity: 3.7,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "ℹ Resident experience is above average and improving. New leadership team has prioritised consumer engagement.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate and stabilising following a difficult recruitment period. GP visiting schedule is regular.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "ℹ Quality measures have improved following external review recommendations. Clinical documentation is now well structured.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. Previous improvement notices are resolved and a preventive audit schedule is now in place.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "ℹ Safety performance is above the state midpoint. Medication incident rate has been reduced significantly.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "ℹ Preventive care is improving. Vaccination rates are now at 84% with a target of 90% for the next quarter.",
        },
        experience: {
          trend: "improving",
          insight:
            "ℹ Experience is improving. Community connection activities have been expanded and are well received.",
        },
        equity: {
          trend: "improving",
          insight:
            "ℹ Equity is above average. First Nations elder outreach has been strengthened with funding from a community grant.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.6★
      id: "CNS-005",
      name: "Manunda Senior Care",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 100,
      established: 2006,
      indicators: {
        residents: 4.6,
        staffing: 4.7,
        qualityMeasures: 4.5,
        compliance: 4.7,
        safetyClinical: 4.6,
        preventiveCare: 4.4,
        experience: 4.7,
        equity: 4.5,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are outstanding. Person-centred care plans are reviewed bi-monthly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are well above sector average. Staff training investment is high.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are in the top quartile for QLD. Falls prevention is a standout strength.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Full compliance with all standards. Last ACQSC audit received positive commendations.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety governance is excellent. Medication management processes are robust.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care bundles are completed consistently above 92%.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are top-quartile. Consumer advisory group is embedded in operations.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity access is excellent. Culturally safe programs for First Nations and CALD residents are active.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.5★
      id: "CNS-006",
      name: "Westcourt Aged Care",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 70,
      established: 2001,
      indicators: {
        residents: 3.5,
        staffing: 3.4,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.3,
        experience: 3.4,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are satisfactory. Care plan reviews are on schedule.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets requirements with limited agency use in peak periods.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are near the benchmark. No serious incidents last quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All required processes are current and documented.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Falls rate is near the state average.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 83%. Vaccination and bowel screening rates are acceptable.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Resident satisfaction is being monitored closely.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity indicators are within range. CALD services are available and utilised.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.2★
      id: "CNS-007",
      name: "Mooroobool Care Services",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 58,
      established: 1998,
      indicators: {
        residents: 3.1,
        staffing: 3.2,
        qualityMeasures: 3.0,
        compliance: 3.3,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are around the state midpoint. Quality improvement is being planned.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum levels. Part-time and casual reliance is being managed.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is at the benchmark. No critical incidents have been recorded this quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor corrective action from last audit has been resolved.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable limits. Post-fall review process is functioning.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 80%. Cognitive and bowel assessment completion is near target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is adequate. Resident surveys show moderate satisfaction levels.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is near the standard. Interpreter services are available but need promotion.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.4★
      id: "CNS-008",
      name: "Manoora Senior Living",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 88,
      established: 2009,
      indicators: {
        residents: 4.4,
        staffing: 4.5,
        qualityMeasures: 4.3,
        compliance: 4.6,
        safetyClinical: 4.4,
        preventiveCare: 4.2,
        experience: 4.5,
        equity: 4.3,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are above average and improving. Resident-led care planning is a strength.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are above requirements. Workforce retention is excellent.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures have improved notably. Falls harm rate is below the QLD benchmark.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Compliance is exemplary. Proactive engagement with ACQSC is ongoing.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is strong. Medication audit pass rate exceeds 95%.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive care completion is at 89%. Tropical health screening protocols are current.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are high and improving. Community engagement activities are well received.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent for the region. Bilingual care pathways are operational.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.7★
      id: "CNS-009",
      name: "White Rock Aged Care",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 65,
      established: 2004,
      indicators: {
        residents: 3.7,
        staffing: 3.6,
        qualityMeasures: 3.8,
        compliance: 3.7,
        safetyClinical: 3.6,
        preventiveCare: 3.5,
        experience: 3.6,
        equity: 3.4,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are above the midpoint. Continuous improvement program is active.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate and stable. Graduate nurse recruitment is strengthening the team.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality performance is satisfactory. Pressure injury prevention program is effective.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All required documentation is current and maintained.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable range. Falls rate is near the state average.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 85%. Cognitive assessment completion is above the threshold.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is satisfactory. Complaint resolution is timely and effective.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity indicators are within range. CALD and First Nations outreach is being expanded.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.2★
      id: "CNS-010",
      name: "Woree Care Centre",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 50,
      established: 1994,
      indicators: {
        residents: 2.2,
        staffing: 2.0,
        qualityMeasures: 1.9,
        compliance: 2.3,
        safetyClinical: 2.1,
        preventiveCare: 1.9,
        experience: 2.0,
        equity: 1.9,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident outcomes are significantly below benchmark. Care plan quality is inadequate.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below minimum requirements. High turnover is a critical risk.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are well below the QLD benchmark. Adverse events are escalating.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Multiple improvement notices outstanding. Enhanced ACQSC monitoring has been initiated.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate significantly exceeds the state benchmark. Urgent clinical review required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 61%. Multiple overdue assessment bundles pose a clinical risk.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are very low. Multiple complaints referred to the Aged Care Commissioner.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is well below standard. No cultural safety framework is in place.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.3★
      id: "CNS-011",
      name: "Bentley Park Senior Living",
      city: "Cairns",
      type: "Residential Aged Care",
      beds: 80,
      established: 2013,
      indicators: {
        residents: 3.3,
        staffing: 3.4,
        qualityMeasures: 3.2,
        compliance: 3.5,
        safetyClinical: 3.3,
        preventiveCare: 3.1,
        experience: 3.4,
        equity: 3.2,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are at the state midpoint. Care planning quality is being reviewed.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Workforce planning to reduce agency reliance is underway.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is near the benchmark. No serious adverse events recorded this quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. One minor recommendation from the last audit is being actioned.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is adequate. Medication management processes have been reviewed and updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 81%. Bowel and cognitive screening completion is near target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Resident satisfaction surveys show mixed results.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is within acceptable range. Language support for CALD residents is being strengthened.",
        },
      },
    },
  ],

  // ── Ballarat: 3 providers ────────────────────────────────────────────────────────────────────
  Ballarat: [
    {
      id: "BAL-001",
      name: "Ballarat Central Aged Care",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 115,
      established: 2003,
      indicators: {
        residents: 4.2,
        staffing: 4.3,
        qualityMeasures: 4.4,
        compliance: 4.5,
        safetyClinical: 4.3,
        preventiveCare: 4.2,
        experience: 4.4,
        equity: 4.0,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience is excellent. Heritage-style facility design has been complemented by modern person-centred care practices.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are consistently above the VIC benchmark. Long-tenured staff contribute to a stable care environment.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are very strong. Regional benchmarking places this provider in the top 20% of VIC facilities.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full ACQSC compliance. No adverse regulatory findings in the past three years.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is below the VIC benchmark. Strong medication safety culture is evident in audit results.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care completion at 91%. Annual care plan review compliance is 100%.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Family satisfaction is very high. Regular events and open visiting policy are strongly commended.",
        },
        equity: {
          trend: "stable",
          insight:
            "✅ Equity is good. Inclusive care programs are available for CALD and LGBTQI+ residents.",
        },
      },
    },
    {
      id: "BAL-002",
      name: "Sebastopol Senior Living",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 78,
      established: 1999,
      indicators: {
        residents: 3.2,
        staffing: 3.1,
        qualityMeasures: 3.3,
        compliance: 3.2,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience meets standards. Satisfaction survey participation rates are improving with new methods.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Allied health visit frequency is below the city average.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are at minimum standards. Improvement targets have been set for the next quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. One open advisory notice from the last assessment cycle.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is near the VIC state average. Fall rates are within acceptable bounds.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care at 76%. Medication review completion has fallen below minimum expectations.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Activities calendar is limited due to staffing constraints on weekends.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is acceptable. No dedicated equity program in place at this time.",
        },
      },
    },
    {
      id: "BAL-003",
      name: "Wendouree Aged Services",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 52,
      established: 1983,
      indicators: {
        residents: 2.1,
        staffing: 2.0,
        qualityMeasures: 2.2,
        compliance: 2.3,
        safetyClinical: 2.1,
        preventiveCare: 2.0,
        experience: 2.1,
        equity: 2.4,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is poor. Formal complaints have been lodged with the Aged Care Quality and Safety Commission.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing shortages are significant. Overnight RN coverage is not consistently meeting the mandated minimum.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality outcomes are below standard. Incident investigation processes are inadequate and under review.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices outstanding. An external compliance support engagement has been commissioned.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate exceeds the VIC benchmark by a significant margin. Urgent safety remediation is required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care has fallen to 60%. Multiple overdue assessment bundles are being escalated.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are very low. Several complaints have been escalated to the Aged Care Commissioner.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. No cultural safety framework or First Nations protocol is in place.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.5★
      id: "BAL-004",
      name: "Mount Clear Aged Care",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 95,
      established: 2004,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.5,
        compliance: 4.7,
        safetyClinical: 4.5,
        preventiveCare: 4.3,
        experience: 4.6,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are excellent. Care plans are personalised and reviewed monthly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are above the VIC benchmark. Staff satisfaction program is effective.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are top-quartile for the region. Falls prevention protocols are exemplary.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Full compliance maintained. Last ACQSC audit received positive commendations.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is outstanding. Medication error rate is below the national average.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive care at 90%. Vaccination and screening rates are above the benchmark.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience is excellent. Consumer advisory body is embedded in governance.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent. CALD and First Nations outreach programs are well established.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.5★
      id: "BAL-005",
      name: "Buninyong Senior Living",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 68,
      established: 2008,
      indicators: {
        residents: 3.5,
        staffing: 3.4,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.3,
        experience: 3.4,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are satisfactory. Care plan review schedule is maintained.",
        },
        staffing: {
          trend: "stable",
          insight: "ℹ Staffing meets requirements with limited agency use.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are near the benchmark. No serious adverse events recorded.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All corrective actions from last audit are resolved.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable range. Post-fall review process is functioning.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 83%. Vaccination rates are above the minimum threshold.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Resident satisfaction surveys show satisfactory results.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity indicators are within range. Interpreter services available on request.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.3★
      id: "BAL-006",
      name: "Delacombe Care Centre",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 60,
      established: 1997,
      indicators: {
        residents: 3.2,
        staffing: 3.3,
        qualityMeasures: 3.1,
        compliance: 3.4,
        safetyClinical: 3.2,
        preventiveCare: 3.0,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are around the VIC midpoint. Improvement plan is in development.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels meet minimum requirements. Reliance on part-time staff is being managed.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is at the benchmark. No critical incidents in the past quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor corrective action from last audit has been addressed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable limits. Falls management protocol is being updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 81%. Bowel screening uptake is near target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is adequate. Resident surveys returned mixed results.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is near the standard. Language support services require promotion.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.7★
      id: "BAL-007",
      name: "Canadian Senior Services",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 115,
      established: 2011,
      indicators: {
        residents: 4.7,
        staffing: 4.8,
        qualityMeasures: 4.6,
        compliance: 4.8,
        safetyClinical: 4.7,
        preventiveCare: 4.5,
        experience: 4.8,
        equity: 4.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are exceptional. Care planning is comprehensive and resident-led.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are well above the VIC average. Staff retention is the best in the region.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are in the top decile nationally. Zero pressure injuries last two quarters.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Exemplary compliance record. Proactive regulatory engagement with ACQSC is maintained.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is outstanding. Multidisciplinary safety governance meetings held weekly.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive bundles completed ahead of schedule. Vaccination rates exceed 95%.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience is best-in-city. Consumer advisory body has significant governance influence.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity access is excellent. CALD and cultural safety frameworks are nationally benchmarked.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.6★
      id: "BAL-008",
      name: "Ballarat East Aged Care",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 82,
      established: 2006,
      indicators: {
        residents: 3.6,
        staffing: 3.5,
        qualityMeasures: 3.7,
        compliance: 3.8,
        safetyClinical: 3.6,
        preventiveCare: 3.4,
        experience: 3.5,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are above average. Care planning quality is being enhanced.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Nurse-to-resident ratio meets the regulated minimum.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality performance is near the benchmark. Pressure injury prevention is a focus area.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All prior corrective actions have been closed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable range. Post-fall review process is functioning well.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 85%. Dementia and cognitive assessment completion is on track.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is satisfactory. Resident and family feedback is captured and acted upon.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is near the standard. CALD resident intake is increasing and supports are planned.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.4★
      id: "BAL-009",
      name: "Eastwood Care",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 52,
      established: 1993,
      indicators: {
        residents: 2.4,
        staffing: 2.2,
        qualityMeasures: 2.1,
        compliance: 2.5,
        safetyClinical: 2.3,
        preventiveCare: 2.0,
        experience: 2.2,
        equity: 2.0,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident outcomes are significantly below the VIC benchmark. Care plan quality needs urgent improvement.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below minimum requirements. High turnover is a systemic risk.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are well below benchmark. Adverse events have increased this quarter.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices are outstanding. ACQSC monitoring has been escalated.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate exceeds the VIC benchmark. Urgent safety review is required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 63%. Multiple overdue assessment bundles are posing clinical risk.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores are very low. Several complaints have been referred to the Commissioner.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. No formal cultural safety or First Nations plan is in place.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.4★
      id: "BAL-010",
      name: "Winter's Flat Senior Living",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 75,
      established: 2009,
      indicators: {
        residents: 3.4,
        staffing: 3.3,
        qualityMeasures: 3.5,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.2,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are at the VIC midpoint. Improvement initiatives are in progress.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels are adequate. Agency use is being reduced through targeted recruitment.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is near the benchmark. No critical incidents have been recorded this quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Annual audit outcome was acceptable with minor recommendations.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is adequate. Falls management protocol has been reviewed and updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 82%. Cognitive screening completion is near the quarterly target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Resident satisfaction program is being strengthened.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is within acceptable range. Interpreter services are available and promoted.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.2★
      id: "BAL-011",
      name: "Sebastopol Aged Care",
      city: "Ballarat",
      type: "Residential Aged Care",
      beds: 63,
      established: 2002,
      indicators: {
        residents: 3.1,
        staffing: 3.2,
        qualityMeasures: 3.0,
        compliance: 3.3,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are around the VIC midpoint. Quality improvement plan is being developed.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum levels. Workforce planning is addressing part-time and casual reliance.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is at benchmark. No serious adverse events recorded in the past quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. One minor recommendation from the last audit is being actioned.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is within acceptable limits. Medication management is under regular review.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 80%. Bowel and cognitive screening completion is near target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is adequate. Resident surveys show moderate satisfaction levels.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is within the standard. CALD language services are available but need more promotion.",
        },
      },
    },
  ],

  // ── Bendigo: 3 providers ────────────────────────────────────────────────────────────────────
  Bendigo: [
    {
      id: "BEN-001",
      name: "Bendigo Goldfields Aged Care",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 105,
      established: 2004,
      indicators: {
        residents: 4.1,
        staffing: 4.2,
        qualityMeasures: 4.3,
        compliance: 4.4,
        safetyClinical: 4.2,
        preventiveCare: 4.1,
        experience: 4.3,
        equity: 3.9,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident experience is strong. Historical community connection and trusted local reputation are key strengths.",
        },
        staffing: {
          trend: "stable",
          insight:
            "✅ Staffing levels are above the VIC regional benchmark. Long-serving staff contribute to excellent care continuity.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are above average and trending upward. Continuous improvement is embedded in team culture.",
        },
        compliance: {
          trend: "stable",
          insight:
            "✅ Full compliance. Regulatory engagement is proactive and no adverse notices have been issued.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Falls harm rate is below the VIC benchmark. Comprehensive post-fall analysis is routinely performed.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive care at 90%. Advance care planning and vaccination programs are systematically managed.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience is excellent. Community engagement events and family communication are consistently commended.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is good. Cultural diversity programs are in place for CALD residents.",
        },
      },
    },
    {
      id: "BEN-002",
      name: "Kangaroo Flat Aged Care",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 70,
      established: 1996,
      indicators: {
        residents: 3.0,
        staffing: 3.1,
        qualityMeasures: 3.0,
        compliance: 3.2,
        safetyClinical: 3.0,
        preventiveCare: 2.9,
        experience: 3.1,
        equity: 2.9,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident experience is at the state average. Survey data shows no deterioration but minimal improvement.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Some allied health roles are filled by contract providers rather than permanent staff.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures meet minimum requirements with no concerning trends at this time.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is maintained. One minor advisory note from the last ACQSC assessment period.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety performance is at the state midpoint. No significant safety events in the past quarter.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "⚠ Preventive care has dipped to 77%. Pain assessment and behavioural review completion are below target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is average. Social activities program is limited in scope.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is below average. Access support for non-English speaking residents is limited.",
        },
      },
    },
    {
      id: "BEN-003",
      name: "Eaglehawk Aged Services",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 45,
      established: 1980,
      indicators: {
        residents: 2.0,
        staffing: 1.9,
        qualityMeasures: 2.1,
        compliance: 2.2,
        safetyClinical: 2.0,
        preventiveCare: 1.9,
        experience: 2.0,
        equity: 2.3,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident satisfaction is below standard. Formal complaints have been lodged with the ACQSC in the past quarter.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing is critically low. RN coverage is not meeting the mandated minimum across all care periods.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are poor. Incident investigation processes have been found to be inadequate by internal review.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices outstanding. The provider has been placed under an enhanced monitoring arrangement.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate exceeds the VIC average significantly. Urgent clinical safety review has been commissioned.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 57%. Multiple assessment bundles are critically overdue and posing clinical risk.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores have deteriorated markedly. Advocacy body involvement has been requested by families.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. No cultural safety protocols or First Nations programs are in operation.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.5★
      id: "BEN-004",
      name: "Flora Hill Aged Care",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 100,
      established: 2005,
      indicators: {
        residents: 4.5,
        staffing: 4.6,
        qualityMeasures: 4.4,
        compliance: 4.7,
        safetyClinical: 4.5,
        preventiveCare: 4.3,
        experience: 4.6,
        equity: 4.4,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are excellent. Person-centred care plans are reviewed regularly.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are consistently above the VIC benchmark. Staff retention is exemplary.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are top-quartile for the region. Falls prevention is a recognised strength.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Full compliance maintained. Last ACQSC audit received positive commendations.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety governance is excellent. Medication audit pass rate exceeds 95%.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "✅ Preventive care bundles are completed at 91% each quarter.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience scores are top-quartile. Consumer advisory body is actively engaged.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity is excellent. CALD and First Nations outreach programs are well established.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.5★
      id: "BEN-005",
      name: "Strathdale Senior Living",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 72,
      established: 2007,
      indicators: {
        residents: 3.5,
        staffing: 3.4,
        qualityMeasures: 3.6,
        compliance: 3.7,
        safetyClinical: 3.5,
        preventiveCare: 3.3,
        experience: 3.4,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are satisfactory. Care plan reviews are on schedule.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets requirements with limited agency use in peak periods.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality measures are near the benchmark. No serious incidents in the last quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All required processes are current and documented.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Clinical safety is adequate. Falls rate is close to the VIC state average.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 83%. Vaccination and bowel screening rates are acceptable.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Resident satisfaction is monitored each quarter.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity indicators are within range. CALD services are available and utilised.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.2★
      id: "BEN-006",
      name: "Kennington Care Centre",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 58,
      established: 1999,
      indicators: {
        residents: 3.1,
        staffing: 3.2,
        qualityMeasures: 3.0,
        compliance: 3.3,
        safetyClinical: 3.1,
        preventiveCare: 3.0,
        experience: 3.2,
        equity: 3.0,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are around the VIC midpoint. Quality improvement is being planned.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum levels. Part-time reliance is being managed through workforce planning.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is at benchmark. No critical incidents have been recorded this quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Minor corrective action from the last audit has been resolved.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable limits. Post-fall review process is functional.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 80%. Cognitive and bowel assessment completion is near target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is adequate. Resident surveys show moderate satisfaction levels.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is near the standard. Interpreter services are available but need further promotion.",
        },
      },
    },
    {
      // HIGH performer — Overall ~4.7★
      id: "BEN-007",
      name: "Epsom Aged Care",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 120,
      established: 2012,
      indicators: {
        residents: 4.7,
        staffing: 4.8,
        qualityMeasures: 4.6,
        compliance: 4.8,
        safetyClinical: 4.7,
        preventiveCare: 4.5,
        experience: 4.8,
        equity: 4.6,
      },
      indicatorMeta: {
        residents: {
          trend: "improving",
          insight:
            "✅ Resident outcomes are exceptional. Care planning is individualised and resident-led.",
        },
        staffing: {
          trend: "improving",
          insight:
            "✅ Staffing ratios are well above the VIC average. Staff satisfaction is the highest in the region.",
        },
        qualityMeasures: {
          trend: "improving",
          insight:
            "✅ Quality measures are in the top decile nationally. Zero pressure injuries recorded last two quarters.",
        },
        compliance: {
          trend: "improving",
          insight:
            "✅ Exemplary compliance record. Proactive regulatory engagement with ACQSC is ongoing.",
        },
        safetyClinical: {
          trend: "improving",
          insight:
            "✅ Clinical safety is outstanding. Multidisciplinary safety governance is held weekly.",
        },
        preventiveCare: {
          trend: "improving",
          insight:
            "✅ Preventive bundles completed ahead of schedule. Vaccination rates exceed 95%.",
        },
        experience: {
          trend: "improving",
          insight:
            "✅ Experience is best-in-city. Consumer advisory body has significant governance influence.",
        },
        equity: {
          trend: "improving",
          insight:
            "✅ Equity access is excellent. CALD and cultural safety frameworks are nationally benchmarked.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.6★
      id: "BEN-008",
      name: "White Hills Care",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 80,
      established: 2006,
      indicators: {
        residents: 3.6,
        staffing: 3.5,
        qualityMeasures: 3.7,
        compliance: 3.8,
        safetyClinical: 3.6,
        preventiveCare: 3.4,
        experience: 3.5,
        equity: 3.3,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are above average. Care plan quality is being enhanced.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing is adequate. Nurse-to-resident ratio meets the regulated minimum.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is near the benchmark. Pressure injury prevention program is effective.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is good. All corrective actions from the last audit have been closed.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable range. Post-fall review process is functioning well.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 85%. Dementia and cognitive assessment completion is on track.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is satisfactory. Resident and family feedback is captured quarterly and actioned.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is near the standard. CALD resident intake is increasing and supports are planned.",
        },
      },
    },
    {
      // LOW performer — Overall ~2.3★
      id: "BEN-009",
      name: "Long Gully Senior Living",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 48,
      established: 1992,
      indicators: {
        residents: 2.3,
        staffing: 2.1,
        qualityMeasures: 2.0,
        compliance: 2.4,
        safetyClinical: 2.2,
        preventiveCare: 1.9,
        experience: 2.1,
        equity: 2.0,
      },
      indicatorMeta: {
        residents: {
          trend: "declining",
          insight:
            "❌ Resident outcomes are significantly below the VIC benchmark. Care plan quality is inadequate.",
        },
        staffing: {
          trend: "declining",
          insight:
            "❌ Staffing ratios are below minimum requirements. High turnover is a critical risk.",
        },
        qualityMeasures: {
          trend: "declining",
          insight:
            "❌ Quality measures are well below the benchmark. Adverse events have increased this quarter.",
        },
        compliance: {
          trend: "declining",
          insight:
            "❌ Two improvement notices outstanding. ACQSC monitoring has been escalated.",
        },
        safetyClinical: {
          trend: "declining",
          insight:
            "❌ Falls harm rate significantly exceeds the VIC benchmark. Urgent clinical review required.",
        },
        preventiveCare: {
          trend: "declining",
          insight:
            "❌ Preventive care at 62%. Multiple overdue assessment bundles are posing clinical risk.",
        },
        experience: {
          trend: "declining",
          insight:
            "❌ Experience scores have deteriorated. Multiple complaints referred to the Aged Care Commissioner.",
        },
        equity: {
          trend: "stable",
          insight:
            "⚠ Equity is below standard. No formal cultural safety or First Nations plan exists.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.4★
      id: "BEN-010",
      name: "Maiden Gully Aged Care",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 75,
      established: 2010,
      indicators: {
        residents: 3.4,
        staffing: 3.3,
        qualityMeasures: 3.5,
        compliance: 3.6,
        safetyClinical: 3.4,
        preventiveCare: 3.2,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are at the VIC midpoint. Improvement initiatives are underway.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing levels are adequate. Agency reliance is being reduced through targeted recruitment.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is near the benchmark. No critical incidents recorded this quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. Annual audit outcome was acceptable with minor recommendations.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is adequate. Falls management protocol has been reviewed and updated.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 82%. Cognitive screening completion is near the quarterly target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience scores are average. Resident satisfaction program is being strengthened.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is within acceptable range. Interpreter services are available and promoted.",
        },
      },
    },
    {
      // MEDIUM performer — Overall ~3.3★
      id: "BEN-011",
      name: "Golden Square Care",
      city: "Bendigo",
      type: "Residential Aged Care",
      beds: 65,
      established: 2003,
      indicators: {
        residents: 3.2,
        staffing: 3.3,
        qualityMeasures: 3.1,
        compliance: 3.4,
        safetyClinical: 3.2,
        preventiveCare: 3.1,
        experience: 3.3,
        equity: 3.1,
      },
      indicatorMeta: {
        residents: {
          trend: "stable",
          insight:
            "ℹ Resident outcomes are around the VIC midpoint. Quality improvement plan is in development.",
        },
        staffing: {
          trend: "stable",
          insight:
            "ℹ Staffing meets minimum levels. Workforce planning addresses part-time and casual reliance.",
        },
        qualityMeasures: {
          trend: "stable",
          insight:
            "ℹ Quality is at benchmark. No serious adverse events recorded in the past quarter.",
        },
        compliance: {
          trend: "stable",
          insight:
            "ℹ Compliance is satisfactory. One minor recommendation from the last audit is being actioned.",
        },
        safetyClinical: {
          trend: "stable",
          insight:
            "ℹ Safety is within acceptable limits. Medication management is under regular review.",
        },
        preventiveCare: {
          trend: "stable",
          insight:
            "ℹ Preventive care at 81%. Bowel and cognitive screening completion is near target.",
        },
        experience: {
          trend: "stable",
          insight:
            "ℹ Experience is adequate. Resident surveys show moderate satisfaction levels.",
        },
        equity: {
          trend: "stable",
          insight:
            "ℹ Equity is within the standard. CALD language services are available and being promoted.",
        },
      },
    },
  ],
};

export const CITY_LIST = Object.keys(CITY_PROVIDERS);

// ── Unified Provider List (single source of truth for all modules) ────────────

const CITY_TO_STATE: Record<string, string> = {
  Sydney: "New South Wales",
  Melbourne: "Victoria",
  Brisbane: "Queensland",
  Perth: "Western Australia",
  Adelaide: "South Australia",
  Canberra: "Australian Capital Territory",
  Hobart: "Tasmania",
  Darwin: "Northern Territory",
};

export interface UnifiedProvider {
  id: string;
  name: string;
  city: string;
  type: string;
  serviceType: string;
  state: string;
  beds?: number;
  established: number;
  accreditationStatus: "accredited" | "conditional" | "not-accredited";
  acqscStandards: number;
  domainScores: {
    safety: number;
    preventive: number;
    quality: number;
    staffing: number;
    compliance: number;
    experience: number;
  };
  overallStars: number;
}

function cityProviderToDomainScores(cp: CityProvider): {
  safety: number;
  preventive: number;
  quality: number;
  staffing: number;
  compliance: number;
  experience: number;
} {
  return {
    safety: starsToPercentScore(cp.indicators.safetyClinical),
    preventive: starsToPercentScore(cp.indicators.preventiveCare),
    quality: starsToPercentScore(cp.indicators.qualityMeasures),
    staffing: starsToPercentScore(cp.indicators.staffing),
    compliance: starsToPercentScore(cp.indicators.compliance),
    experience: starsToPercentScore(
      (cp.indicators.residents + cp.indicators.experience) / 2,
    ),
  };
}

function cityProviderToOverallStars(cp: CityProvider): number {
  const d = cityProviderToDomainScores(cp);
  const overallScore = calcNewWeightedOverallScore(d);
  return overallScoreToStars(overallScore);
}

export const UNIFIED_PROVIDERS: UnifiedProvider[] = Object.values(
  CITY_PROVIDERS,
)
  .flat()
  .map((cp) => {
    const domainScores = cityProviderToDomainScores(cp);
    const overallStars = cityProviderToOverallStars(cp);
    let accreditationStatus: "accredited" | "conditional" | "not-accredited" =
      "not-accredited";
    if (overallStars >= 4) accreditationStatus = "accredited";
    else if (overallStars >= 3) accreditationStatus = "conditional";
    const acqscStandards = Math.min(
      8,
      Math.max(1, Math.round((overallStars / 5) * 8)),
    );
    return {
      id: cp.id,
      name: cp.name,
      city: cp.city,
      type: cp.type,
      serviceType: cp.type,
      state: CITY_TO_STATE[cp.city] ?? cp.city,
      beds: cp.beds,
      established: cp.established,
      accreditationStatus,
      acqscStandards,
      domainScores,
      overallStars,
    };
  });

/**
 * Returns domain star scores for any provider ID.
 * For UNIFIED_PROVIDERS (city-based IDs like SYD-001), returns computed domain scores.
 * Falls back to getProviderDomainStarScores for legacy PROV-xxx IDs.
 */
export function getUnifiedProviderDomainScores(
  providerId: string,
  quarter = "Q4-2025",
): {
  safety: number;
  preventive: number;
  quality: number;
  staffing: number;
  compliance: number;
  experience: number;
} {
  if (quarter === "Q4-2025") {
    const unified = UNIFIED_PROVIDERS.find((p) => p.id === providerId);
    if (unified) return unified.domainScores;
    return getProviderDomainStarScores(providerId);
  }
  // For non-base quarters, recalculate from quarter-specific indicator data
  const inds = getUnifiedProviderIndicators(providerId, quarter);
  // Use new 0-100 scoring model
  const domMap: Record<string, number[]> = {
    Safety: [],
    Preventive: [],
    Quality: [],
    Staffing: [],
    Compliance: [],
    Experience: [],
  };
  for (const ind of inds) {
    const score =
      ind.rate !== undefined &&
      ind.nationalBenchmark !== undefined &&
      ind.nationalBenchmark !== 0 &&
      ind.rate !== 0
        ? Math.min(
            100,
            ind.isLowerBetter
              ? (ind.nationalBenchmark / ind.rate) * 100
              : (ind.rate / ind.nationalBenchmark) * 100,
          )
        : 75;
    const dimKey = ind.dimension as keyof typeof domMap;
    if (domMap[dimKey]) domMap[dimKey].push(score);
  }
  const avg = (arr: number[]) =>
    arr.length === 0 ? 3 : arr.reduce((a, b) => a + b, 0) / arr.length;
  return {
    safety: avg(domMap.Safety),
    preventive: avg(domMap.Preventive),
    quality: avg(domMap.Quality),
    staffing: avg(domMap.Staffing),
    compliance: avg(domMap.Compliance),
    experience: avg(domMap.Experience),
  };
}

/**
 * Returns 10 mock indicators for any provider ID, derived from that provider's
 * domain scores so that ratings are consistent across all modules.
 */
export function getUnifiedProviderIndicators(
  providerId: string,
  quarter = "Q4-2025",
): Array<{
  id: string;
  providerId: string;
  quarter: string;
  dimension: string;
  indicatorCode: string;
  indicatorName: string;
  rate: number;
  nationalBenchmark: number;
  quintileRank: number;
  trend: "improving" | "stable" | "declining";
  isLowerBetter: boolean;
}> {
  const QUARTER_MULTIPLIERS: Record<string, number> = {
    "Q1-2025": 1.18,
    "Q2-2025": 1.09,
    "Q3-2025": 1.0,
    "Q4-2025": 0.92,
  };
  const qMult = QUARTER_MULTIPLIERS[quarter] ?? 1.0;

  function adjustQuintileForQuarter(baseQ: number, q: string): number {
    const adj: Record<string, number> = {
      "Q1-2025": 1,
      "Q2-2025": 0,
      "Q3-2025": 0,
      "Q4-2025": -1,
    };
    return Math.min(5, Math.max(1, baseQ + (adj[q] ?? 0)));
  }

  function applyQuarterRate(baseRate: number, isLowerBetter2: boolean): number {
    if (isLowerBetter2) return Number.parseFloat((baseRate * qMult).toFixed(1));
    return Number.parseFloat(Math.min(100, baseRate / qMult).toFixed(1));
  }

  function quarterTrend(
    baseTrend: "improving" | "stable" | "declining",
    q_rank: number,
  ): "improving" | "stable" | "declining" {
    if (quarter === "Q1-2025" && q_rank >= 4) return "declining";
    if (quarter === "Q4-2025" && baseTrend === "stable") return "improving";
    return baseTrend;
  }

  const d = getUnifiedProviderDomainScores(providerId);

  // Get trend from city provider meta if available
  function getTrend(
    cp: CityProvider | undefined,
    field: keyof NonNullable<CityProvider["indicatorMeta"]>,
  ): "improving" | "stable" | "declining" {
    return cp?.indicatorMeta?.[field as string]?.trend ?? "stable";
  }

  const cityProvider = Object.values(CITY_PROVIDERS)
    .flat()
    .find((p) => p.id === providerId);

  const safetyTrend = getTrend(cityProvider, "safetyClinical");
  const preventiveTrend = getTrend(cityProvider, "preventiveCare");
  const qualityTrend = getTrend(cityProvider, "qualityMeasures");
  const staffingTrend = getTrend(cityProvider, "staffing");
  const complianceTrend = getTrend(cityProvider, "compliance");
  const experienceTrend = getTrend(cityProvider, "experience");

  // Per-indicator quintile from provider-specific domain sub-scores
  // Uses the city provider's individual indicator scores for each specific indicator
  const cp = cityProvider;

  // Derive per-indicator quintiles from individual domain indicator values stored on CityProvider
  // This gives each indicator a distinct quintile instead of sharing the domain-level quintile
  function indQ(starScore: number): number {
    return Math.min(5, Math.max(1, Math.round(6 - starScore)));
  }

  // Safety sub-indicators: derive from safetyClinical score with per-indicator offsets
  const safetyBase = cp ? cp.indicators.safetyClinical : d.safety;
  const falls_q = indQ(safetyBase);
  const medHarm_q = indQ(
    Math.min(
      5,
      Math.max(1, safetyBase + (cp ? (cp.indicators.compliance - 3) * 0.2 : 0)),
    ),
  );
  const highRiskMed_q = indQ(
    Math.min(
      5,
      Math.max(1, safetyBase - (cp ? (cp.indicators.staffing - 3) * 0.15 : 0)),
    ),
  );
  const polypharmacy_q = indQ(
    Math.min(
      5,
      Math.max(
        1,
        safetyBase + (cp ? (cp.indicators.preventiveCare - 3) * 0.18 : 0),
      ),
    ),
  );
  const pressure_q = indQ(
    Math.min(
      5,
      Math.max(
        1,
        safetyBase - (cp ? (cp.indicators.qualityMeasures - 3) * 0.12 : 0),
      ),
    ),
  );
  const ed_q = indQ(
    Math.min(
      5,
      Math.max(1, safetyBase + (cp ? (cp.indicators.residents - 3) * 0.1 : 0)),
    ),
  );

  // Preventive sub-indicators
  const prevBase = cp ? cp.indicators.preventiveCare : d.preventive;
  const fallsScreen_q = indQ(prevBase);
  const deprScreen_q = indQ(
    Math.min(
      5,
      Math.max(1, prevBase + (cp ? (cp.indicators.experience - 3) * 0.15 : 0)),
    ),
  );
  const malnutrition_q = indQ(
    Math.min(
      5,
      Math.max(1, prevBase - (cp ? (cp.indicators.staffing - 3) * 0.1 : 0)),
    ),
  );

  // Quality sub-indicators
  const qualBase = cp ? cp.indicators.qualityMeasures : d.quality;
  const satisfaction_q = indQ(qualBase);
  const clinical_q = indQ(
    Math.min(
      5,
      Math.max(1, qualBase + (cp ? (cp.indicators.compliance - 3) * 0.1 : 0)),
    ),
  );

  // Staffing sub-indicators
  const staffBase = cp ? cp.indicators.staffing : d.staffing;
  const rnHours_q = indQ(staffBase);
  const retention_q = indQ(
    Math.min(
      5,
      Math.max(1, staffBase + (cp ? (cp.indicators.compliance - 3) * 0.12 : 0)),
    ),
  );

  // Compliance sub-indicators
  const compBase = cp ? cp.indicators.compliance : d.compliance;
  const accred_q = indQ(compBase);
  const reporting_q = indQ(
    Math.min(
      5,
      Math.max(
        1,
        compBase + (cp ? (cp.indicators.qualityMeasures - 3) * 0.1 : 0),
      ),
    ),
  );

  // Experience sub-indicators
  const expBase = cp ? cp.indicators.experience : d.experience;
  const expSatisfaction_q = indQ(expBase);
  const complaintRate_q = indQ(
    Math.min(
      5,
      Math.max(1, expBase - (cp ? (cp.indicators.residents - 3) * 0.15 : 0)),
    ),
  );

  function indRate(
    base: number,
    q: number,
    scale: "lower_is_better" | "higher_is_better",
  ): number {
    const qFactor: Record<number, number> = {
      1: 0.62,
      2: 0.8,
      3: 1.0,
      4: 1.28,
      5: 1.62,
    };
    const f = qFactor[q] ?? 1.0;
    return scale === "lower_is_better"
      ? Number.parseFloat((base * f).toFixed(1))
      : Number.parseFloat(Math.min(100, base / f).toFixed(1));
  }

  // Derive trend per indicator from domain trend + slight per-indicator variation
  function indTrend(
    domainTrend: "improving" | "stable" | "declining",
    q: number,
  ): "improving" | "stable" | "declining" {
    // Low-quintile (poor) providers tend to have declining indicators
    if (domainTrend === "declining") return "declining";
    if (domainTrend === "improving") return q <= 2 ? "improving" : "stable";
    // Stable domain: top quintile might still be improving on individual indicators
    if (q === 1) return "improving";
    if (q === 5) return "declining";
    return "stable";
  }

  return [
    {
      id: `IND-${providerId}-1`,
      providerId,
      quarter,
      dimension: "Safety",
      indicatorCode: "SAF-001",
      indicatorName: "Falls with Harm Rate",
      rate: applyQuarterRate(indRate(4.2, falls_q, "lower_is_better"), true),
      nationalBenchmark: 5.1,
      quintileRank: adjustQuintileForQuarter(falls_q, quarter),
      trend: quarterTrend(indTrend(safetyTrend, falls_q), falls_q),
      isLowerBetter: true,
    },
    {
      id: `IND-${providerId}-2`,
      providerId,
      quarter,
      dimension: "Safety",
      indicatorCode: "SAF-002",
      indicatorName: "Medication-Related Harm",
      rate: applyQuarterRate(indRate(2.8, medHarm_q, "lower_is_better"), true),
      nationalBenchmark: 3.2,
      quintileRank: medHarm_q,
      trend: indTrend(safetyTrend, medHarm_q),
      isLowerBetter: true,
    },
    {
      id: `IND-${providerId}-3`,
      providerId,
      quarter,
      dimension: "Safety",
      indicatorCode: "SAF-003",
      indicatorName: "High-Risk Medication Prevalence",
      rate: applyQuarterRate(
        indRate(18.4, highRiskMed_q, "lower_is_better"),
        true,
      ),
      nationalBenchmark: 21.2,
      quintileRank: highRiskMed_q,
      trend: indTrend(safetyTrend, highRiskMed_q),
      isLowerBetter: true,
    },
    {
      id: `IND-${providerId}-4`,
      providerId,
      quarter,
      dimension: "Safety",
      indicatorCode: "SAF-004",
      indicatorName: "Polypharmacy ≥10 Medications",
      rate: applyQuarterRate(
        indRate(12.1, polypharmacy_q, "lower_is_better"),
        true,
      ),
      nationalBenchmark: 14.8,
      quintileRank: adjustQuintileForQuarter(polypharmacy_q, quarter),
      trend: quarterTrend(
        indTrend(safetyTrend, polypharmacy_q),
        polypharmacy_q,
      ),
      isLowerBetter: true,
    },
    {
      id: `IND-${providerId}-5`,
      providerId,
      quarter,
      dimension: "Safety",
      indicatorCode: "SAF-005",
      indicatorName: "Pressure Injuries Stage 2–4",
      rate: applyQuarterRate(indRate(1.8, pressure_q, "lower_is_better"), true),
      nationalBenchmark: 2.4,
      quintileRank: adjustQuintileForQuarter(pressure_q, quarter),
      trend: quarterTrend(indTrend(safetyTrend, pressure_q), pressure_q),
      isLowerBetter: true,
    },
    {
      id: `IND-${providerId}-6`,
      providerId,
      quarter,
      dimension: "Safety",
      indicatorCode: "SAF-006",
      indicatorName: "ED Presentations (30-day)",
      rate: applyQuarterRate(indRate(8.4, ed_q, "lower_is_better"), true),
      nationalBenchmark: 10.2,
      quintileRank: adjustQuintileForQuarter(ed_q, quarter),
      trend: quarterTrend(indTrend(safetyTrend, ed_q), ed_q),
      isLowerBetter: true,
    },
    {
      id: `IND-${providerId}-7`,
      providerId,
      quarter,
      dimension: "Preventive",
      indicatorCode: "PRV-001",
      indicatorName: "Falls Risk Screening Completion",
      rate: applyQuarterRate(
        indRate(94.2, fallsScreen_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 88.4,
      quintileRank: fallsScreen_q,
      trend: indTrend(preventiveTrend, fallsScreen_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-8`,
      providerId,
      quarter,
      dimension: "Preventive",
      indicatorCode: "PRV-002",
      indicatorName: "Depression Screening (GDS/PHQ-9)",
      rate: applyQuarterRate(
        indRate(88.4, deprScreen_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 82.1,
      quintileRank: deprScreen_q,
      trend: indTrend(preventiveTrend, deprScreen_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-9`,
      providerId,
      quarter,
      dimension: "Preventive",
      indicatorCode: "PRV-003",
      indicatorName: "Malnutrition Screening",
      rate: applyQuarterRate(
        indRate(91.2, malnutrition_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 85.8,
      quintileRank: adjustQuintileForQuarter(malnutrition_q, quarter),
      trend: quarterTrend(
        indTrend(preventiveTrend, malnutrition_q),
        malnutrition_q,
      ),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-10`,
      providerId,
      quarter,
      dimension: "Quality",
      indicatorCode: "QM-001",
      indicatorName: "Satisfaction Survey Score",
      rate: applyQuarterRate(
        indRate(84.8, satisfaction_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 80.2,
      quintileRank: adjustQuintileForQuarter(satisfaction_q, quarter),
      trend: quarterTrend(
        indTrend(qualityTrend, satisfaction_q),
        satisfaction_q,
      ),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-11`,
      providerId,
      quarter,
      dimension: "Quality",
      indicatorCode: "QM-002",
      indicatorName: "Clinical Outcome Score",
      rate: applyQuarterRate(
        indRate(76.4, clinical_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 74.2,
      quintileRank: adjustQuintileForQuarter(clinical_q, quarter),
      trend: quarterTrend(indTrend(qualityTrend, clinical_q), clinical_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-12`,
      providerId,
      quarter,
      dimension: "Staffing",
      indicatorCode: "STAFF-001",
      indicatorName: "Registered Nurse Hours per Resident",
      rate: applyQuarterRate(
        indRate(4.8, rnHours_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 4.1,
      quintileRank: rnHours_q,
      trend: indTrend(staffingTrend, rnHours_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-13`,
      providerId,
      quarter,
      dimension: "Staffing",
      indicatorCode: "STAFF-002",
      indicatorName: "Staff Retention Rate",
      rate: applyQuarterRate(
        indRate(88.2, retention_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 82.4,
      quintileRank: adjustQuintileForQuarter(retention_q, quarter),
      trend: quarterTrend(indTrend(staffingTrend, retention_q), retention_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-14`,
      providerId,
      quarter,
      dimension: "Compliance",
      indicatorCode: "COMP-001",
      indicatorName: "Accreditation Compliance Score",
      rate: applyQuarterRate(
        indRate(92.4, accred_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 88.0,
      quintileRank: adjustQuintileForQuarter(accred_q, quarter),
      trend: quarterTrend(indTrend(complianceTrend, accred_q), accred_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-15`,
      providerId,
      quarter,
      dimension: "Compliance",
      indicatorCode: "COMP-002",
      indicatorName: "Mandatory Reporting Completeness",
      rate: applyQuarterRate(
        indRate(96.8, reporting_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 92.0,
      quintileRank: adjustQuintileForQuarter(reporting_q, quarter),
      trend: quarterTrend(indTrend(complianceTrend, reporting_q), reporting_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-16`,
      providerId,
      quarter,
      dimension: "Experience",
      indicatorCode: "EXP-001",
      indicatorName: "Resident Satisfaction Score",
      rate: applyQuarterRate(
        indRate(84.8, expSatisfaction_q, "higher_is_better"),
        false,
      ),
      nationalBenchmark: 80.2,
      quintileRank: expSatisfaction_q,
      trend: indTrend(experienceTrend, expSatisfaction_q),
      isLowerBetter: false,
    },
    {
      id: `IND-${providerId}-17`,
      providerId,
      quarter,
      dimension: "Experience",
      indicatorCode: "EXP-002",
      indicatorName: "Complaint Rate",
      rate: applyQuarterRate(
        indRate(3.2, complaintRate_q, "lower_is_better"),
        true,
      ),
      nationalBenchmark: 4.8,
      quintileRank: complaintRate_q,
      trend: indTrend(experienceTrend, complaintRate_q),
      isLowerBetter: true,
    },
  ];
}

// ──────────────────────────────────────────────────────────────────────────────

// ── Cohort Risk Investigation Detail ─────────────────────────────────────────

export interface CohortDetail {
  cohortId: string;
  providerName: string;
  region: string;
  riskCriteria: string[];
  cohortSize: number;
  flagDate: string;
  urgency: "high" | "medium" | "low";
  status: string;
  riskScore: number;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  riskIndicators: Array<{
    indicator: string;
    currentValue: string;
    benchmark: string;
    riskLevel: "HIGH" | "MEDIUM" | "LOW";
    barPercent: number;
  }>;
  screeningBundle: Array<{
    name: string;
    completed: number;
    pending: number;
    overdue: number;
    total: number;
  }>;
  residents: Array<{
    id: string;
    age: number;
    riskFactors: string;
    screeningStatus: "Completed" | "Pending" | "Overdue";
  }>;
  recommendedAlerts: string[];
  suggestedActions: string[];
  trendData: Array<{ quarter: string; highRiskResidents: number }>;
  performanceImpact: Array<{
    indicator: string;
    stars: number;
  }>;
  performanceMessage: string;
}

export const COHORT_DETAIL_DATA: Record<string, CohortDetail> = {
  "HRC-001": {
    cohortId: "HRC-001",
    providerName: "Sunridge Aged Care",
    region: "Queensland",
    riskCriteria: ["Recent Hospital Discharge", "Age ≥80 + Polypharmacy"],
    cohortSize: 12,
    flagDate: "20 Nov 2025",
    urgency: "high",
    status: "ACTIVE",
    riskScore: 82,
    riskLevel: "HIGH",
    riskIndicators: [
      {
        indicator: "Recent hospital discharge rate",
        currentValue: "38.5%",
        benchmark: "18.2%",
        riskLevel: "HIGH",
        barPercent: 82,
      },
      {
        indicator: "Polypharmacy rate",
        currentValue: "41.7%",
        benchmark: "21.4%",
        riskLevel: "HIGH",
        barPercent: 78,
      },
      {
        indicator: "Falls history rate",
        currentValue: "33.3%",
        benchmark: "19.8%",
        riskLevel: "MEDIUM",
        barPercent: 55,
      },
      {
        indicator: "Frailty score",
        currentValue: "4.2 / 5",
        benchmark: "3.1 / 5",
        riskLevel: "HIGH",
        barPercent: 84,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 7,
        pending: 3,
        overdue: 2,
        total: 12,
      },
      {
        name: "Medication Review",
        completed: 5,
        pending: 4,
        overdue: 3,
        total: 12,
      },
      {
        name: "Cognitive Assessment",
        completed: 8,
        pending: 2,
        overdue: 2,
        total: 12,
      },
      {
        name: "Nutrition Assessment",
        completed: 6,
        pending: 3,
        overdue: 3,
        total: 12,
      },
      {
        name: "Pain Assessment",
        completed: 9,
        pending: 2,
        overdue: 1,
        total: 12,
      },
      {
        name: "Behavioral Assessment",
        completed: 7,
        pending: 4,
        overdue: 1,
        total: 12,
      },
    ],
    residents: [
      {
        id: "R-1032",
        age: 84,
        riskFactors: "Polypharmacy",
        screeningStatus: "Completed",
      },
      {
        id: "R-1044",
        age: 88,
        riskFactors: "Falls History",
        screeningStatus: "Pending",
      },
      {
        id: "R-1092",
        age: 82,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Overdue",
      },
      {
        id: "R-1015",
        age: 86,
        riskFactors: "Polypharmacy + Falls",
        screeningStatus: "Overdue",
      },
      {
        id: "R-1067",
        age: 81,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Pending",
      },
      {
        id: "R-1078",
        age: 85,
        riskFactors: "Dementia",
        screeningStatus: "Completed",
      },
      {
        id: "R-1033",
        age: 83,
        riskFactors: "Frailty",
        screeningStatus: "Pending",
      },
      {
        id: "R-1088",
        age: 89,
        riskFactors: "Polypharmacy",
        screeningStatus: "Overdue",
      },
      {
        id: "R-1055",
        age: 80,
        riskFactors: "Comorbidities",
        screeningStatus: "Completed",
      },
      {
        id: "R-1021",
        age: 87,
        riskFactors: "Falls History",
        screeningStatus: "Pending",
      },
      {
        id: "R-1041",
        age: 84,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Completed",
      },
      {
        id: "R-1099",
        age: 82,
        riskFactors: "Polypharmacy",
        screeningStatus: "Overdue",
      },
    ],
    recommendedAlerts: [
      "⚠ Medication review required for 4 residents",
      "⚠ Falls prevention intervention recommended for 3 residents",
      "⚠ Nutrition review required for 2 residents",
      "⚠ Cognitive assessment overdue for 2 residents",
    ],
    suggestedActions: [
      "Pharmacist medication review",
      "Occupational therapy home safety check",
      "Physiotherapy falls prevention program",
      "Dietitian consultation",
      "Advance care planning review",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 8 },
      { quarter: "Q3 2025", highRiskResidents: 10 },
      { quarter: "Q4 2025", highRiskResidents: 12 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 2 },
      { indicator: "Preventive Care", stars: 2 },
      { indicator: "Quality Measures", stars: 3 },
    ],
    performanceMessage:
      "This provider shows lower preventive care performance due to incomplete screening bundles.",
  },
  "HRC-002": {
    cohortId: "HRC-002",
    providerName: "Central Queensland Aged Care",
    region: "Central Queensland",
    riskCriteria: ["Falls History", "Dementia with BPSD"],
    cohortSize: 8,
    flagDate: "18 Nov 2025",
    urgency: "high",
    status: "ACTIVE",
    riskScore: 76,
    riskLevel: "HIGH",
    riskIndicators: [
      {
        indicator: "Falls history rate",
        currentValue: "42.1%",
        benchmark: "19.8%",
        riskLevel: "HIGH",
        barPercent: 76,
      },
      {
        indicator: "Dementia with BPSD prevalence",
        currentValue: "37.5%",
        benchmark: "22.0%",
        riskLevel: "HIGH",
        barPercent: 72,
      },
      {
        indicator: "Behavioural incident rate",
        currentValue: "28.4%",
        benchmark: "18.6%",
        riskLevel: "MEDIUM",
        barPercent: 52,
      },
      {
        indicator: "Cognitive assessment overdue rate",
        currentValue: "50.0%",
        benchmark: "10.2%",
        riskLevel: "HIGH",
        barPercent: 80,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 4,
        pending: 2,
        overdue: 2,
        total: 8,
      },
      {
        name: "Medication Review",
        completed: 3,
        pending: 3,
        overdue: 2,
        total: 8,
      },
      {
        name: "Cognitive Assessment",
        completed: 5,
        pending: 1,
        overdue: 2,
        total: 8,
      },
      {
        name: "Nutrition Assessment",
        completed: 4,
        pending: 2,
        overdue: 2,
        total: 8,
      },
      {
        name: "Pain Assessment",
        completed: 6,
        pending: 1,
        overdue: 1,
        total: 8,
      },
      {
        name: "Behavioral Assessment",
        completed: 3,
        pending: 2,
        overdue: 3,
        total: 8,
      },
    ],
    residents: [
      {
        id: "R-2011",
        age: 83,
        riskFactors: "Falls History + Dementia",
        screeningStatus: "Overdue",
      },
      {
        id: "R-2024",
        age: 87,
        riskFactors: "BPSD",
        screeningStatus: "Pending",
      },
      {
        id: "R-2038",
        age: 85,
        riskFactors: "Falls History",
        screeningStatus: "Completed",
      },
      {
        id: "R-2045",
        age: 81,
        riskFactors: "Dementia",
        screeningStatus: "Overdue",
      },
      {
        id: "R-2059",
        age: 89,
        riskFactors: "BPSD + Polypharmacy",
        screeningStatus: "Overdue",
      },
      {
        id: "R-2062",
        age: 80,
        riskFactors: "Falls History",
        screeningStatus: "Pending",
      },
      {
        id: "R-2074",
        age: 84,
        riskFactors: "Dementia",
        screeningStatus: "Completed",
      },
      {
        id: "R-2081",
        age: 86,
        riskFactors: "Falls History + BPSD",
        screeningStatus: "Pending",
      },
    ],
    recommendedAlerts: [
      "⚠ Behavioral intervention required for 3 residents",
      "⚠ Falls prevention assessment overdue for 2 residents",
      "⚠ Cognitive reassessment required for 2 residents",
    ],
    suggestedActions: [
      "Dementia specialist consultation",
      "Physiotherapy falls prevention program",
      "Behavioral support plan review",
      "Psychogeriatric assessment referral",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 5 },
      { quarter: "Q3 2025", highRiskResidents: 7 },
      { quarter: "Q4 2025", highRiskResidents: 8 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 2 },
      { indicator: "Preventive Care", stars: 2 },
      { indicator: "Quality Measures", stars: 2 },
    ],
    performanceMessage:
      "This provider demonstrates elevated risk in dementia-related behavioral incidents. Mandatory behavioral assessment completion is critically overdue.",
  },
  "HRC-003": {
    cohortId: "HRC-003",
    providerName: "Perth Metro Seniors Living",
    region: "Western Australia",
    riskCriteria: ["Frailty Score ≥ Threshold", "≥3 Comorbidities"],
    cohortSize: 23,
    flagDate: "15 Nov 2025",
    urgency: "medium",
    status: "MONITORING",
    riskScore: 61,
    riskLevel: "MEDIUM",
    riskIndicators: [
      {
        indicator: "Frailty score",
        currentValue: "3.8 / 5",
        benchmark: "3.1 / 5",
        riskLevel: "MEDIUM",
        barPercent: 61,
      },
      {
        indicator: "Comorbidity burden rate",
        currentValue: "56.5%",
        benchmark: "38.2%",
        riskLevel: "MEDIUM",
        barPercent: 58,
      },
      {
        indicator: "Polypharmacy rate",
        currentValue: "26.1%",
        benchmark: "21.4%",
        riskLevel: "MEDIUM",
        barPercent: 48,
      },
      {
        indicator: "Functional decline rate",
        currentValue: "21.7%",
        benchmark: "16.4%",
        riskLevel: "LOW",
        barPercent: 38,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 16,
        pending: 5,
        overdue: 2,
        total: 23,
      },
      {
        name: "Medication Review",
        completed: 14,
        pending: 6,
        overdue: 3,
        total: 23,
      },
      {
        name: "Cognitive Assessment",
        completed: 18,
        pending: 3,
        overdue: 2,
        total: 23,
      },
      {
        name: "Nutrition Assessment",
        completed: 15,
        pending: 6,
        overdue: 2,
        total: 23,
      },
      {
        name: "Pain Assessment",
        completed: 19,
        pending: 3,
        overdue: 1,
        total: 23,
      },
      {
        name: "Behavioral Assessment",
        completed: 17,
        pending: 4,
        overdue: 2,
        total: 23,
      },
    ],
    residents: [
      {
        id: "R-3001",
        age: 82,
        riskFactors: "Frailty + 3 Comorbidities",
        screeningStatus: "Completed",
      },
      {
        id: "R-3014",
        age: 85,
        riskFactors: "Comorbidities",
        screeningStatus: "Pending",
      },
      {
        id: "R-3022",
        age: 80,
        riskFactors: "Frailty",
        screeningStatus: "Completed",
      },
      {
        id: "R-3031",
        age: 88,
        riskFactors: "Comorbidities + Frailty",
        screeningStatus: "Overdue",
      },
      {
        id: "R-3044",
        age: 83,
        riskFactors: "4 Comorbidities",
        screeningStatus: "Pending",
      },
      {
        id: "R-3057",
        age: 81,
        riskFactors: "Frailty",
        screeningStatus: "Completed",
      },
      {
        id: "R-3063",
        age: 86,
        riskFactors: "Comorbidities",
        screeningStatus: "Overdue",
      },
      {
        id: "R-3078",
        age: 84,
        riskFactors: "Frailty + Polypharmacy",
        screeningStatus: "Pending",
      },
    ],
    recommendedAlerts: [
      "⚠ Frailty reassessment required for 5 residents",
      "⚠ Medication review overdue for 3 residents",
      "⚠ Nutrition assessment pending for 6 residents",
    ],
    suggestedActions: [
      "Geriatrician frailty assessment",
      "Pharmacist medication reconciliation",
      "Physiotherapy strength and balance program",
      "Dietitian consultation",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 16 },
      { quarter: "Q3 2025", highRiskResidents: 20 },
      { quarter: "Q4 2025", highRiskResidents: 23 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 3 },
      { indicator: "Preventive Care", stars: 3 },
      { indicator: "Quality Measures", stars: 3 },
    ],
    performanceMessage:
      "This provider is monitoring a growing frailty cohort. Screening completion rates are adequate but improvement in medication review turnaround is required.",
  },
  "HRC-004": {
    cohortId: "HRC-004",
    providerName: "Darwin Territory Care",
    region: "Northern Territory",
    riskCriteria: ["Age ≥80 + Polypharmacy"],
    cohortSize: 5,
    flagDate: "12 Nov 2025",
    urgency: "high",
    status: "ACTIVE",
    riskScore: 79,
    riskLevel: "HIGH",
    riskIndicators: [
      {
        indicator: "Polypharmacy rate (≥10 meds)",
        currentValue: "60.0%",
        benchmark: "21.4%",
        riskLevel: "HIGH",
        barPercent: 79,
      },
      {
        indicator: "Age ≥80 in cohort",
        currentValue: "100.0%",
        benchmark: "42.0%",
        riskLevel: "HIGH",
        barPercent: 85,
      },
      {
        indicator: "Medication-related incident rate",
        currentValue: "24.8%",
        benchmark: "9.4%",
        riskLevel: "HIGH",
        barPercent: 72,
      },
      {
        indicator: "Pharmacist review completion",
        currentValue: "20.0%",
        benchmark: "78.4%",
        riskLevel: "HIGH",
        barPercent: 88,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 2,
        pending: 2,
        overdue: 1,
        total: 5,
      },
      {
        name: "Medication Review",
        completed: 1,
        pending: 1,
        overdue: 3,
        total: 5,
      },
      {
        name: "Cognitive Assessment",
        completed: 3,
        pending: 1,
        overdue: 1,
        total: 5,
      },
      {
        name: "Nutrition Assessment",
        completed: 2,
        pending: 2,
        overdue: 1,
        total: 5,
      },
      {
        name: "Pain Assessment",
        completed: 3,
        pending: 1,
        overdue: 1,
        total: 5,
      },
      {
        name: "Behavioral Assessment",
        completed: 2,
        pending: 2,
        overdue: 1,
        total: 5,
      },
    ],
    residents: [
      {
        id: "R-4001",
        age: 84,
        riskFactors: "Polypharmacy (12 meds)",
        screeningStatus: "Overdue",
      },
      {
        id: "R-4009",
        age: 81,
        riskFactors: "Polypharmacy (10 meds)",
        screeningStatus: "Overdue",
      },
      {
        id: "R-4017",
        age: 87,
        riskFactors: "Polypharmacy + Falls",
        screeningStatus: "Overdue",
      },
      {
        id: "R-4025",
        age: 80,
        riskFactors: "Polypharmacy (11 meds)",
        screeningStatus: "Pending",
      },
      {
        id: "R-4033",
        age: 86,
        riskFactors: "Polypharmacy (13 meds)",
        screeningStatus: "Completed",
      },
    ],
    recommendedAlerts: [
      "⚠ Urgent medication review required for 3 residents",
      "⚠ Medication-related risk indicators are above acceptable threshold",
      "⚠ Pharmacist review critically overdue",
    ],
    suggestedActions: [
      "Urgent pharmacist medication review",
      "Deprescribing protocol initiation",
      "GP medication reconciliation referral",
      "Medication safety risk assessment",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 3 },
      { quarter: "Q3 2025", highRiskResidents: 4 },
      { quarter: "Q4 2025", highRiskResidents: 5 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 1 },
      { indicator: "Preventive Care", stars: 2 },
      { indicator: "Quality Measures", stars: 2 },
    ],
    performanceMessage:
      "This provider has critically low medication management performance. Polypharmacy prevalence is significantly above national benchmarks and requires urgent intervention.",
  },
  "HRC-005": {
    cohortId: "HRC-005",
    providerName: "Bayside Home Care Services",
    region: "Victoria",
    riskCriteria: ["Recent Hospital Discharge"],
    cohortSize: 14,
    flagDate: "10 Nov 2025",
    urgency: "medium",
    status: "MONITORING",
    riskScore: 58,
    riskLevel: "MEDIUM",
    riskIndicators: [
      {
        indicator: "Recent hospital discharge rate",
        currentValue: "28.6%",
        benchmark: "18.2%",
        riskLevel: "MEDIUM",
        barPercent: 58,
      },
      {
        indicator: "Post-discharge bundle completion (7-day)",
        currentValue: "42.9%",
        benchmark: "72.4%",
        riskLevel: "HIGH",
        barPercent: 72,
      },
      {
        indicator: "Readmission risk score",
        currentValue: "3.4 / 5",
        benchmark: "2.6 / 5",
        riskLevel: "MEDIUM",
        barPercent: 52,
      },
      {
        indicator: "GP follow-up completion (14-day)",
        currentValue: "57.1%",
        benchmark: "82.0%",
        riskLevel: "MEDIUM",
        barPercent: 45,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 9,
        pending: 3,
        overdue: 2,
        total: 14,
      },
      {
        name: "Medication Review",
        completed: 7,
        pending: 4,
        overdue: 3,
        total: 14,
      },
      {
        name: "Cognitive Assessment",
        completed: 10,
        pending: 2,
        overdue: 2,
        total: 14,
      },
      {
        name: "Nutrition Assessment",
        completed: 8,
        pending: 4,
        overdue: 2,
        total: 14,
      },
      {
        name: "Pain Assessment",
        completed: 11,
        pending: 2,
        overdue: 1,
        total: 14,
      },
      {
        name: "Behavioral Assessment",
        completed: 9,
        pending: 3,
        overdue: 2,
        total: 14,
      },
    ],
    residents: [
      {
        id: "R-5001",
        age: 82,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Completed",
      },
      {
        id: "R-5008",
        age: 79,
        riskFactors: "Hospital Discharge + Falls",
        screeningStatus: "Pending",
      },
      {
        id: "R-5015",
        age: 85,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Overdue",
      },
      {
        id: "R-5022",
        age: 77,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Completed",
      },
      {
        id: "R-5029",
        age: 83,
        riskFactors: "Hospital Discharge + Polypharmacy",
        screeningStatus: "Overdue",
      },
      {
        id: "R-5036",
        age: 80,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Pending",
      },
      {
        id: "R-5043",
        age: 88,
        riskFactors: "Hospital Discharge",
        screeningStatus: "Completed",
      },
    ],
    recommendedAlerts: [
      "⚠ Post-discharge medication review overdue for 3 residents",
      "⚠ Falls risk reassessment required for 2 residents post-discharge",
      "⚠ GP follow-up referral outstanding for 6 residents",
    ],
    suggestedActions: [
      "Post-discharge care coordination review",
      "GP follow-up appointment scheduling",
      "Pharmacist medication reconciliation",
      "Occupational therapy home assessment",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 10 },
      { quarter: "Q3 2025", highRiskResidents: 12 },
      { quarter: "Q4 2025", highRiskResidents: 14 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 3 },
      { indicator: "Preventive Care", stars: 3 },
      { indicator: "Quality Measures", stars: 3 },
    ],
    performanceMessage:
      "Post-discharge care coordination requires improvement. Completion of the 7-day bundle is below the national benchmark for this provider.",
  },
  "HRC-006": {
    cohortId: "HRC-006",
    providerName: "Adelaide Southern Care",
    region: "South Australia",
    riskCriteria: ["Falls History"],
    cohortSize: 7,
    flagDate: "05 Nov 2025",
    urgency: "low",
    status: "RESOLVED",
    riskScore: 34,
    riskLevel: "LOW",
    riskIndicators: [
      {
        indicator: "Falls history rate",
        currentValue: "21.4%",
        benchmark: "19.8%",
        riskLevel: "LOW",
        barPercent: 34,
      },
      {
        indicator: "Falls with harm rate",
        currentValue: "8.6%",
        benchmark: "5.1%",
        riskLevel: "MEDIUM",
        barPercent: 42,
      },
      {
        indicator: "Falls risk screening completion",
        currentValue: "85.7%",
        benchmark: "88.4%",
        riskLevel: "LOW",
        barPercent: 28,
      },
      {
        indicator: "Environment hazard score",
        currentValue: "2.4 / 5",
        benchmark: "2.8 / 5",
        riskLevel: "LOW",
        barPercent: 22,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 7,
        pending: 0,
        overdue: 0,
        total: 7,
      },
      {
        name: "Medication Review",
        completed: 6,
        pending: 1,
        overdue: 0,
        total: 7,
      },
      {
        name: "Cognitive Assessment",
        completed: 7,
        pending: 0,
        overdue: 0,
        total: 7,
      },
      {
        name: "Nutrition Assessment",
        completed: 6,
        pending: 1,
        overdue: 0,
        total: 7,
      },
      {
        name: "Pain Assessment",
        completed: 7,
        pending: 0,
        overdue: 0,
        total: 7,
      },
      {
        name: "Behavioral Assessment",
        completed: 6,
        pending: 1,
        overdue: 0,
        total: 7,
      },
    ],
    residents: [
      {
        id: "R-6001",
        age: 81,
        riskFactors: "Falls History",
        screeningStatus: "Completed",
      },
      {
        id: "R-6008",
        age: 84,
        riskFactors: "Falls History",
        screeningStatus: "Completed",
      },
      {
        id: "R-6015",
        age: 79,
        riskFactors: "Falls History",
        screeningStatus: "Completed",
      },
      {
        id: "R-6022",
        age: 83,
        riskFactors: "Falls History + Frailty",
        screeningStatus: "Completed",
      },
      {
        id: "R-6029",
        age: 80,
        riskFactors: "Falls History",
        screeningStatus: "Completed",
      },
      {
        id: "R-6036",
        age: 86,
        riskFactors: "Falls History",
        screeningStatus: "Pending",
      },
      {
        id: "R-6043",
        age: 82,
        riskFactors: "Falls History",
        screeningStatus: "Completed",
      },
    ],
    recommendedAlerts: [
      "ℹ Ongoing monitoring recommended for 1 resident with pending review",
      "ℹ Quarterly falls risk reassessment scheduled for all cohort members",
    ],
    suggestedActions: [
      "Continue falls prevention program",
      "Quarterly reassessment scheduling",
      "Environmental safety monitoring",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 9 },
      { quarter: "Q3 2025", highRiskResidents: 8 },
      { quarter: "Q4 2025", highRiskResidents: 7 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 4 },
      { indicator: "Preventive Care", stars: 4 },
      { indicator: "Quality Measures", stars: 4 },
    ],
    performanceMessage:
      "This provider has successfully resolved the high-risk falls cohort through effective intervention. Performance indicators are tracking positively.",
  },
  "HRC-007": {
    cohortId: "HRC-007",
    providerName: "Hunter Valley Care Group",
    region: "New South Wales",
    riskCriteria: ["Dementia with BPSD", "≥3 Comorbidities"],
    cohortSize: 18,
    flagDate: "28 Nov 2025",
    urgency: "high",
    status: "ACTIVE",
    riskScore: 88,
    riskLevel: "HIGH",
    riskIndicators: [
      {
        indicator: "Dementia with BPSD prevalence",
        currentValue: "44.4%",
        benchmark: "22.0%",
        riskLevel: "HIGH",
        barPercent: 88,
      },
      {
        indicator: "Comorbidity burden (≥3 conditions)",
        currentValue: "61.1%",
        benchmark: "38.2%",
        riskLevel: "HIGH",
        barPercent: 80,
      },
      {
        indicator: "Unplanned hospitalisation rate",
        currentValue: "27.8%",
        benchmark: "12.4%",
        riskLevel: "HIGH",
        barPercent: 82,
      },
      {
        indicator: "Behavioral incident rate",
        currentValue: "38.9%",
        benchmark: "18.6%",
        riskLevel: "HIGH",
        barPercent: 76,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 10,
        pending: 4,
        overdue: 4,
        total: 18,
      },
      {
        name: "Medication Review",
        completed: 8,
        pending: 5,
        overdue: 5,
        total: 18,
      },
      {
        name: "Cognitive Assessment",
        completed: 12,
        pending: 3,
        overdue: 3,
        total: 18,
      },
      {
        name: "Nutrition Assessment",
        completed: 9,
        pending: 4,
        overdue: 5,
        total: 18,
      },
      {
        name: "Pain Assessment",
        completed: 13,
        pending: 3,
        overdue: 2,
        total: 18,
      },
      {
        name: "Behavioral Assessment",
        completed: 7,
        pending: 5,
        overdue: 6,
        total: 18,
      },
    ],
    residents: [
      {
        id: "R-7001",
        age: 86,
        riskFactors: "Dementia + BPSD",
        screeningStatus: "Overdue",
      },
      {
        id: "R-7012",
        age: 82,
        riskFactors: "3 Comorbidities + Dementia",
        screeningStatus: "Overdue",
      },
      {
        id: "R-7023",
        age: 88,
        riskFactors: "BPSD + Polypharmacy",
        screeningStatus: "Overdue",
      },
      {
        id: "R-7034",
        age: 83,
        riskFactors: "Dementia",
        screeningStatus: "Pending",
      },
      {
        id: "R-7045",
        age: 85,
        riskFactors: "4 Comorbidities",
        screeningStatus: "Overdue",
      },
      {
        id: "R-7056",
        age: 81,
        riskFactors: "BPSD",
        screeningStatus: "Completed",
      },
      {
        id: "R-7067",
        age: 87,
        riskFactors: "Dementia + Frailty",
        screeningStatus: "Overdue",
      },
      {
        id: "R-7078",
        age: 84,
        riskFactors: "3 Comorbidities",
        screeningStatus: "Pending",
      },
      {
        id: "R-7089",
        age: 80,
        riskFactors: "Dementia + Hospital Discharge",
        screeningStatus: "Overdue",
      },
    ],
    recommendedAlerts: [
      "⚠ Urgent behavioral support plan required for 6 residents",
      "⚠ Medication review critically overdue for 5 residents",
      "⚠ Nutrition assessment overdue for 5 residents",
      "⚠ Unplanned hospitalisation rate significantly above benchmark",
    ],
    suggestedActions: [
      "Psychogeriatric specialist assessment",
      "Behavioral support plan development",
      "Pharmacist medication review and deprescribing",
      "Dietitian nutritional assessment",
      "Advance care planning review",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 11 },
      { quarter: "Q3 2025", highRiskResidents: 15 },
      { quarter: "Q4 2025", highRiskResidents: 18 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 1 },
      { indicator: "Preventive Care", stars: 1 },
      { indicator: "Quality Measures", stars: 2 },
    ],
    performanceMessage:
      "This provider has critically poor performance across safety and preventive care indicators. Urgent regulatory intervention and clinical review are recommended.",
  },
  "HRC-008": {
    cohortId: "HRC-008",
    providerName: "Geelong Aged Care Network",
    region: "Victoria",
    riskCriteria: ["Frailty Score ≥ Threshold"],
    cohortSize: 9,
    flagDate: "25 Nov 2025",
    urgency: "medium",
    status: "MONITORING",
    riskScore: 55,
    riskLevel: "MEDIUM",
    riskIndicators: [
      {
        indicator: "Frailty score",
        currentValue: "3.6 / 5",
        benchmark: "3.1 / 5",
        riskLevel: "MEDIUM",
        barPercent: 55,
      },
      {
        indicator: "Functional decline rate",
        currentValue: "33.3%",
        benchmark: "16.4%",
        riskLevel: "MEDIUM",
        barPercent: 52,
      },
      {
        indicator: "Weight loss prevalence (>5%)",
        currentValue: "22.2%",
        benchmark: "14.8%",
        riskLevel: "MEDIUM",
        barPercent: 46,
      },
      {
        indicator: "Activity participation rate",
        currentValue: "44.4%",
        benchmark: "68.8%",
        riskLevel: "LOW",
        barPercent: 32,
      },
    ],
    screeningBundle: [
      {
        name: "Falls Risk Assessment",
        completed: 6,
        pending: 2,
        overdue: 1,
        total: 9,
      },
      {
        name: "Medication Review",
        completed: 5,
        pending: 3,
        overdue: 1,
        total: 9,
      },
      {
        name: "Cognitive Assessment",
        completed: 7,
        pending: 1,
        overdue: 1,
        total: 9,
      },
      {
        name: "Nutrition Assessment",
        completed: 5,
        pending: 3,
        overdue: 1,
        total: 9,
      },
      {
        name: "Pain Assessment",
        completed: 7,
        pending: 1,
        overdue: 1,
        total: 9,
      },
      {
        name: "Behavioral Assessment",
        completed: 6,
        pending: 2,
        overdue: 1,
        total: 9,
      },
    ],
    residents: [
      {
        id: "R-8001",
        age: 82,
        riskFactors: "Frailty",
        screeningStatus: "Completed",
      },
      {
        id: "R-8009",
        age: 85,
        riskFactors: "Frailty + Weight Loss",
        screeningStatus: "Pending",
      },
      {
        id: "R-8017",
        age: 80,
        riskFactors: "Frailty",
        screeningStatus: "Completed",
      },
      {
        id: "R-8025",
        age: 88,
        riskFactors: "Frailty + Functional Decline",
        screeningStatus: "Overdue",
      },
      {
        id: "R-8033",
        age: 83,
        riskFactors: "Frailty + Comorbidities",
        screeningStatus: "Pending",
      },
      {
        id: "R-8041",
        age: 81,
        riskFactors: "Frailty",
        screeningStatus: "Completed",
      },
      {
        id: "R-8049",
        age: 86,
        riskFactors: "Frailty + Weight Loss",
        screeningStatus: "Pending",
      },
      {
        id: "R-8057",
        age: 84,
        riskFactors: "Frailty",
        screeningStatus: "Completed",
      },
      {
        id: "R-8065",
        age: 79,
        riskFactors: "Frailty",
        screeningStatus: "Completed",
      },
    ],
    recommendedAlerts: [
      "⚠ Nutrition review required for 3 residents with weight loss",
      "⚠ Frailty reassessment pending for 2 residents",
      "⚠ Activity engagement program referral recommended",
    ],
    suggestedActions: [
      "Geriatrician frailty assessment review",
      "Dietitian nutritional consultation",
      "Physiotherapy strength and balance program",
      "Social engagement and activity program",
    ],
    trendData: [
      { quarter: "Q2 2025", highRiskResidents: 6 },
      { quarter: "Q3 2025", highRiskResidents: 8 },
      { quarter: "Q4 2025", highRiskResidents: 9 },
    ],
    performanceImpact: [
      { indicator: "Safety & Clinical", stars: 3 },
      { indicator: "Preventive Care", stars: 3 },
      { indicator: "Quality Measures", stars: 4 },
    ],
    performanceMessage:
      "This provider is proactively monitoring a frailty cohort. Nutrition and activity engagement require focused improvement to prevent deterioration.",
  },
};

// ──────────────────────────────────────────────────────────────────────────────

export const RISK_CRITERIA_LABELS: Record<string, string> = {
  recent_hospital_discharge: "Recent Hospital Discharge",
  polypharmacy_80plus: "Age ≥80 + Polypharmacy",
  falls_history: "Falls History",
  dementia_bpsd: "Dementia with BPSD",
  frailty_threshold: "Frailty Score ≥ Threshold",
  comorbidities_3plus: "≥3 Comorbidities",
};

// ──────────────────────────────────────────────────────────────────────────────
// CENTRALISED PROVIDER REGISTRIES
// ──────────────────────────────────────────────────────────────────────────────

/** Single aggregated list of all city-based providers. */
export const PROVIDER_MASTER: CityProvider[] =
  Object.values(CITY_PROVIDERS).flat();

/** Alias for modules that import as VALIDATED_PROVIDERS. */
export const VALIDATED_PROVIDERS = PROVIDER_MASTER;

// ──────────────────────────────────────────────────────────────────────────────
// AUSTRALIAN AGED CARE BENCHMARK CONSTANTS
// ──────────────────────────────────────────────────────────────────────────────

export const BENCHMARKS = {
  fallsWithHarm: 5.1,
  medicationHarm: 3.2,
  highRiskMed: 21.2,
  screeningCompletion: 85,
  vaccinationRate: 90,
  residentSatisfaction: 80,
  staffTurnover: 25,
  rnHoursPerResident: 0.6,
  auditScore: 80,
  complaintResolution: 90,
} as const;

// ──────────────────────────────────────────────────────────────────────────────
// REAL-TIME RATING OVERRIDE STORE
// ──────────────────────────────────────────────────────────────────────────────

/** Module-level store for user-feedback rating overrides (provider-level blending). */
const _ratingOverrideMap = new Map<
  string,
  { stars: number; domainAdjustments: Record<string, number> }
>();

/**
 * Applies a user-feedback override for a provider.
 * getProviderRatingForQuarter blends this override at 30% weight.
 */
export function applyRatingOverride(
  providerId: string,
  newStars: number,
  domainAdjustments: Record<string, number>,
): void {
  _ratingOverrideMap.set(providerId, { stars: newStars, domainAdjustments });
}

// ──────────────────────────────────────────────────────────────────────────────
// AUTHORITATIVE PROVIDER RATING (SINGLE SOURCE OF TRUTH)
// ──────────────────────────────────────────────────────────────────────────────

export interface AuthoritativeProviderRating {
  stars: number;
  overallScore: number;
  risk: "Low" | "Medium" | "High";
  eligibility: "Not Eligible" | "Eligible" | "Highly Eligible";
  funding: number;
  trend: "improving" | "declining" | "stable";
  improvement: number;
  domains: {
    safety: number;
    preventive: number;
    quality: number;
    staffing: number;
    compliance: number;
    experience: number;
  };
  indicators: ReturnType<typeof getUnifiedProviderIndicators>;
}

/**
 * Single authoritative rating calculation for any provider + quarter.
 * All modules (Regulator, Provider, Policy Analyst, Public) must call
 * this function — no local recalculations permitted.
 */
export function getProviderRatingForQuarter(
  providerId: string,
  quarter = "Q4-2025",
): AuthoritativeProviderRating {
  const domains = getUnifiedProviderDomainScores(providerId, quarter);
  const indicators = getUnifiedProviderIndicators(providerId, quarter);

  // Weighted overall score (0–100)
  const rawScore =
    domains.safety * 0.3 +
    domains.preventive * 0.2 +
    domains.quality * 0.2 +
    domains.staffing * 0.15 +
    domains.compliance * 0.1 +
    domains.experience * 0.05;

  // Dominant trend across all indicators
  const trendCounts = { improving: 0, declining: 0, stable: 0 };
  for (const ind of indicators) trendCounts[ind.trend]++;
  const dominantTrend: "improving" | "declining" | "stable" =
    trendCounts.declining > trendCounts.improving
      ? "declining"
      : trendCounts.improving > trendCounts.declining
        ? "improving"
        : "stable";

  // Trend adjustment: declining -5, improving +2
  const trendAdj =
    dominantTrend === "declining" ? -5 : dominantTrend === "improving" ? 2 : 0;
  const adjustedScore = Math.max(0, Math.min(100, rawScore + trendAdj));

  // Star rating
  let stars = overallScoreToStars(adjustedScore);

  // Blend user-feedback override (30% new / 70% computed)
  const override = _ratingOverrideMap.get(providerId);
  if (override) {
    stars = Math.round((stars * 0.7 + override.stars * 0.3) * 2) / 2;
  }

  // Benchmark ratio: proportion of indicators WORSE than benchmark
  let belowBenchmarkCount = 0;
  for (const ind of indicators) {
    if (ind.nationalBenchmark === 0) continue;
    const worse = ind.isLowerBetter
      ? ind.rate > ind.nationalBenchmark * 1.05
      : ind.rate < ind.nationalBenchmark * 0.95;
    if (worse) belowBenchmarkCount++;
  }
  const belowBenchmarkRatio =
    belowBenchmarkCount / Math.max(1, indicators.length);

  // Improvement % vs Q1-2025 baseline
  let improvement = 0;
  if (quarter !== "Q1-2025") {
    const baselineDomains = getUnifiedProviderDomainScores(
      providerId,
      "Q1-2025",
    );
    const baselineScore =
      baselineDomains.safety * 0.3 +
      baselineDomains.preventive * 0.2 +
      baselineDomains.quality * 0.2 +
      baselineDomains.staffing * 0.15 +
      baselineDomains.compliance * 0.1 +
      baselineDomains.experience * 0.05;
    if (baselineScore !== 0) {
      const raw =
        ((adjustedScore - baselineScore) / Math.abs(baselineScore)) * 100;
      improvement = Math.max(-100, Math.min(100, raw));
    }
  }

  // Risk level: validated against rating
  let risk: "Low" | "Medium" | "High";
  if (stars < 3 || belowBenchmarkRatio > 0.6) risk = "High";
  else if (stars < 4 || belowBenchmarkRatio > 0.3) risk = "Medium";
  else risk = "Low";
  // Validation: rating < 3 cannot be Low Risk
  if (stars < 3 && risk === "Low") risk = "High";

  // Eligibility (strict logic, no shortcuts)
  const eligibility: "Not Eligible" | "Eligible" | "Highly Eligible" =
    belowBenchmarkRatio > 0.6
      ? "Not Eligible"
      : stars < 3
        ? "Not Eligible"
        : dominantTrend === "declining"
          ? "Not Eligible"
          : stars >= 4.5
            ? "Highly Eligible"
            : stars >= 4.0 && improvement > 0
              ? "Eligible"
              : "Not Eligible";

  // Funding (only for eligible providers)
  let funding = 0;
  if (eligibility === "Eligible") {
    funding = 18000 + stars * 2000;
  } else if (eligibility === "Highly Eligible") {
    funding = 30000 + stars * 3000;
  }

  return {
    stars,
    overallScore: Math.round(adjustedScore * 10) / 10,
    risk,
    eligibility,
    funding: Math.round(funding),
    trend: dominantTrend,
    improvement: Math.round(improvement * 10) / 10,
    domains,
    indicators,
  };
}

/**
 * Alias kept for modules that previously used this name.
 */
export const getAuthorativeProviderRating = getProviderRatingForQuarter;

export const SCREENING_TYPE_LABELS: Record<string, string> = {
  falls_risk_assessment: "Falls Risk Assessment",
  medication_review: "Medication Review",
  cognitive_assessment: "Cognitive Assessment",
  nutritional_review: "Nutritional Review",
  pain_assessment: "Pain Assessment",
  behavioral_assessment: "Behavioral Assessment",
  advance_care_planning: "Advance Care Planning Review",
};
