import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AppRole } from "../App";

interface HeaderProps {
  currentRole: AppRole;
  setCurrentRole: (role: AppRole) => void;
  currentQuarter: string;
  setCurrentQuarter: (quarter: string) => void;
}

const roles: AppRole[] = ["Regulator", "Provider", "Policy Analyst", "Public"];
const quarters = ["Q1-2025", "Q2-2025", "Q3-2025", "Q4-2025"];

export default function Header({
  currentRole,
  setCurrentRole,
  currentQuarter,
  setCurrentQuarter,
}: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-5 border-b-2 border-gov-gold flex-shrink-0"
      style={{
        background: "oklch(var(--gov-navy-dark))",
        minHeight: "64px",
      }}
    >
      {/* Left: Crest + Title lockup */}
      <div className="flex items-center gap-0">
        {/* Government crest */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 overflow-hidden mr-3"
          style={{
            background: "oklch(1 0 0)",
            border: "1.5px solid oklch(var(--gov-gold))",
          }}
          aria-label="Australian Government Crest"
        >
          <img
            src="/assets/generated/gov-crest-icon.dim_64x64.png"
            alt=""
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Gold vertical rule — signature design motif */}
        <div
          className="self-stretch w-0.5 mr-3 my-3 flex-shrink-0"
          style={{ background: "oklch(var(--gov-gold))" }}
          aria-hidden="true"
        />

        {/* Platform identity block */}
        <div>
          <div
            className="font-extrabold leading-none tracking-widest uppercase"
            style={{
              fontSize: "15px",
              color: "oklch(1 0 0)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            N-ACRM
          </div>
          <div
            className="text-xs leading-snug mt-0.5"
            style={{ color: "oklch(1 0.035 240)", fontWeight: 400 }}
          >
            National Aged Care Reporting & Prevention Framework
          </div>
        </div>

        {/* Divider + dept label */}
        <div
          className="hidden lg:block ml-5 pl-5 border-l self-center py-0.5"
          style={{ borderColor: "oklch(0.26 0.05 254)" }}
        >
          <div
            className="text-xs font-semibold"
            style={{ color: "oklch(1 0.035 240)" }}
          >
            Australian Government
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "oklch(1 0.035 240)" }}
          >
            Department of Health & Aged Care
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Quarter Selector */}
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs font-medium hidden sm:block"
            style={{ color: "oklch(1 0.035 240)" }}
          >
            Period
          </span>
          <Select value={currentQuarter} onValueChange={setCurrentQuarter}>
            <SelectTrigger
              className="h-7 w-[100px] text-xs border-0 font-semibold rounded-sm"
              style={{
                background: "oklch(0.20 0.075 254)",
                color: "oklch(0.88 0.01 240)",
              }}
              aria-label="Select reporting quarter"
              data-ocid="header.quarter_selector.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {quarters.map((q) => (
                <SelectItem key={q} value={q} className="text-xs">
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs font-medium hidden sm:block"
            style={{ color: "oklch(1 0.035 240)" }}
          >
            Role
          </span>
          <Select
            value={currentRole}
            onValueChange={(v) => setCurrentRole(v as AppRole)}
          >
            <SelectTrigger
              className="h-7 w-[120px] text-xs border-0 font-semibold rounded-sm"
              style={{
                background: "oklch(0.20 0.075 254)",
                color: "oklch(0.88 0.01 240)",
              }}
              aria-label="Select user role"
              data-ocid="header.role_selector.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r} value={r} className="text-xs">
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Separator */}
        <div
          className="hidden md:block w-px h-5 mx-1"
          style={{ background: "oklch(0.25 0.055 254)" }}
        />

        {/* OFFICIAL classification badge */}
        <div
          className="hidden md:flex items-center px-2 py-0.5 text-xs font-bold tracking-widest rounded-sm border"
          style={{
            background: "oklch(0.20 0.01 240)",
            borderColor: "oklch(0.34 0.02 240)",
            color: "oklch(0.55 0.02 240)",
            letterSpacing: "0.12em",
          }}
        >
          OFFICIAL
        </div>

        {/* System Status — gold-tinted border for live system feel */}
        <div
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold border"
          style={{
            background: "oklch(0.16 0.06 254)",
            color: "oklch(0.76 0.13 145)",
            borderColor: "oklch(0.24 0.08 145)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
}
