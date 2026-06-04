import {
  AlertTriangle,
  Building2,
  Calculator,
  ClipboardCheck,
  Database,
  FileText,
  LayoutDashboard,
  LineChart,
  Search,
  TrendingUp,
} from "lucide-react";
import type { ActivePage, AppRole } from "../App";

interface NavItem {
  id: ActivePage;
  label: string;
  labelOverride?: Partial<Record<AppRole, string>>;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  roles: AppRole[];
  ocid: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "INTELLIGENCE",
    items: [
      {
        id: "national_overview",
        label: "National Overview",
        labelOverride: { Provider: "My Dashboard" },
        icon: LayoutDashboard,
        roles: ["Regulator", "Provider", "Policy Analyst"],
        ocid: "nav.national_overview.link",
      },
      {
        id: "regional_provider",
        label: "Regional Provider Lookup",
        icon: Search,
        roles: ["Regulator", "Policy Analyst"],
        ocid: "nav.regional_provider.link",
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        id: "provider_performance",
        label: "Provider Performance",
        icon: Building2,
        roles: ["Regulator", "Policy Analyst"],
        ocid: "nav.provider_performance.link",
      },
      {
        id: "high_risk_cohorts",
        label: "High-Risk Cohort Monitoring",
        icon: AlertTriangle,
        roles: ["Regulator", "Provider"],
        ocid: "nav.high_risk_cohorts.link",
      },
      {
        id: "screening_tracking",
        label: "Screening Bundle Tracking",
        icon: ClipboardCheck,
        roles: ["Regulator", "Provider"],
        ocid: "nav.screening_tracking.link",
      },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      {
        id: "policy_analytics",
        label: "Policy Analytics",
        icon: LineChart,
        roles: ["Regulator", "Policy Analyst"],
        ocid: "nav.policy_analytics.link",
      },
      {
        id: "pay_for_improvement",
        label: "Pay-for-Improvement",
        icon: TrendingUp,
        roles: ["Regulator", "Provider", "Policy Analyst"],
        ocid: "nav.pay_for_improvement.link",
      },
      {
        id: "rating_engine",
        label: "Rating Engine",
        icon: Calculator,
        roles: ["Regulator", "Provider"],
        ocid: "nav.rating_engine.link",
      },
    ],
  },
  {
    title: "COMPLIANCE",
    items: [
      {
        id: "data_quality",
        label: "Data Quality Dashboard",
        icon: Database,
        roles: ["Regulator", "Provider"],
        ocid: "nav.data_quality.link",
      },
      {
        id: "audit_governance",
        label: "Audit & Governance",
        icon: FileText,
        roles: ["Regulator"],
        ocid: "nav.audit_governance.link",
      },
    ],
  },
];

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  currentRole: AppRole;
}

export default function Sidebar({
  activePage,
  setActivePage,
  currentRole,
}: SidebarProps) {
  return (
    <aside
      className="flex flex-col border-r overflow-y-auto flex-shrink-0"
      style={{
        width: "240px",
        minWidth: "240px",
        background: "oklch(0.90 0.015 250)",
        borderColor: "oklch(0.78 0.01 250)",
      }}
      aria-label="Main navigation"
    >
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex items-center gap-2.5 flex-shrink-0"
        style={{
          borderBottomColor: "oklch(0.72 0.01 250)",
          background: "oklch(0.82 0.02 250)",
        }}
      >
        <div
          className="w-0.5 h-5 flex-shrink-0 rounded-full"
          style={{ background: "oklch(var(--sidebar-primary))" }}
          aria-hidden="true"
        />

        <div>
          <div
            className="text-xs font-bold uppercase tracking-widest leading-none"
            style={{
              color: "oklch(0 0.06 250)",
              letterSpacing: "0.1em",
            }}
          >
            Module Navigator
          </div>

          <div
            className="text-xs mt-0.5 leading-none"
            style={{
              color: "oklch(0 0.02 250)",
            }}
          >
            {currentRole} View
          </div>
        </div>
      </div>

      <nav className="flex-1 py-1.5 overflow-y-auto">
        {NAV_GROUPS.map((group, groupIdx) => {
          const visibleItems = group.items.filter((item) =>
            item.roles.includes(currentRole)
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title}>
              <div
                className="px-4 flex items-center gap-2"
                style={{
                  paddingTop: groupIdx === 0 ? "10px" : "12px",
                  paddingBottom: "6px",
                  borderTop:
                    groupIdx > 0
                      ? "1px solid oklch(0 0 250)"
                      : "none",
                  marginTop: groupIdx > 0 ? "4px" : "0",
                }}
              >
                <span
                  className="text-xs font-bold uppercase"
                  style={{
                    color: "oklch(0 0 250)",
                    letterSpacing: "0.10em",
                  }}
                >
                  {group.title}
                </span>

                <div
                  className="flex-1 h-px"
                  style={{
                    background: "oklch(0 0.01 250)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                const label = item.labelOverride?.[currentRole] ?? item.label;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    data-ocid={item.ocid}
                    aria-label={label}
                    aria-current={isActive ? "page" : undefined}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors duration-100 focus-visible:outline-none"
                    style={{
                      background: isActive
                        ? "oklch(0.88 0.04 250)"
                        : "transparent",
                      color: isActive
                        ? "oklch(0.20 0.02 250)"
                        : "oklch(0.42 0.02 250)",
                      borderLeft: isActive
                        ? "3px solid oklch(var(--sidebar-primary))"
                        : "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          "oklch(0.93 0.02 250)";
                        e.currentTarget.style.color =
                          "oklch(0.25 0.02 250)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color =
                          "oklch(0 0 250)";
                      }
                    }}
                  >
                    <Icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{
                        color: isActive
                          ? "oklch(var(--sidebar-primary))"
                          : "inherit",
                        opacity: isActive ? 1 : 0.8,
                      }}
                    />

                    <span className="text-xs font-medium leading-snug">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-4 py-2.5 border-t text-xs flex-shrink-0"
        style={{
          borderColor: "oklch(0.55 0.01 250)",
          background: "oklch(0.94 0.01 250)",
        }}
      >
        <div style={{ color: "oklch(0.45 0.02 250)" }}>
          Version 20.0 · Q4-2025
        </div>

        <div
          className="mt-0.5"
          style={{ color: "oklch(0.55 0.02 250)" }}
        >
          Privacy Act 1988 Compliance
        </div>
      </div>
    </aside>
  );
}
