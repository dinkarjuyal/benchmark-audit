import type { Severity } from "@/lib/types";

const severityColor: Record<Severity, string> = {
  critical: "var(--severity-critical)",
  high: "var(--severity-high)",
  medium: "var(--severity-medium)",
  low: "var(--severity-low)",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium uppercase tracking-wide"
      style={{ color: severityColor[severity], borderColor: severityColor[severity] }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: severityColor[severity] }}
      />
      {severity}
    </span>
  );
}

export function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-0.5 text-xs text-muted">
      {label}
    </span>
  );
}
