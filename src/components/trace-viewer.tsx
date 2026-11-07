"use client";

import { useState } from "react";

export type TraceRole = "agent" | "human" | "grader" | "system";

export interface TraceTurn {
  role: TraceRole;
  label?: string;
  content: string;
}

export interface TraceVerdict {
  outcome: "pass" | "fail" | "score";
  label: string;
  detail?: string;
}

const roleLabel: Record<TraceRole, string> = {
  agent: "Agent",
  human: "Simulated user",
  grader: "Grader",
  system: "System",
};

const verdictColor: Record<TraceVerdict["outcome"], string> = {
  pass: "var(--severity-low)",
  fail: "var(--severity-critical)",
  score: "var(--accent)",
};

export function TraceViewer({
  title,
  source,
  turns = [],
  verdict,
  collapseAfter = 4,
}: {
  title?: string;
  source?: string;
  turns?: TraceTurn[];
  verdict?: TraceVerdict;
  collapseAfter?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hidden = !expanded && turns.length > collapseAfter;
  const visibleTurns = hidden ? turns.slice(0, collapseAfter) : turns;
  const hiddenCount = turns.length - visibleTurns.length;

  return (
    <div className="not-prose my-6 rounded-lg border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          {title && <div className="text-sm font-semibold">{title}</div>}
          {source && (
            <a
              href={source}
              className="break-all font-mono text-xs text-muted underline"
            >
              {source}
            </a>
          )}
        </div>
        {verdict && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium uppercase tracking-wide"
            style={{ color: verdictColor[verdict.outcome], borderColor: verdictColor[verdict.outcome] }}
            title={verdict.detail}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: verdictColor[verdict.outcome] }}
            />
            {verdict.label}
          </span>
        )}
      </div>

      <ol className="divide-y divide-border">
        {visibleTurns.map((turn, i) => (
          <li key={i} className="flex gap-3 px-4 py-3">
            <div className="w-28 shrink-0 font-mono text-xs text-muted">
              <span className="text-foreground/60">#{i + 1}</span>{" "}
              {turn.label ?? roleLabel[turn.role]}
            </div>
            <pre className="min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground">
              {turn.content}
            </pre>
          </li>
        ))}
      </ol>

      {turns.length > collapseAfter && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full border-t border-border px-4 py-2 text-left text-xs text-accent hover:underline"
        >
          {expanded ? "Show fewer turns" : `Show ${hiddenCount} more turn${hiddenCount === 1 ? "" : "s"}`}
        </button>
      )}
    </div>
  );
}
