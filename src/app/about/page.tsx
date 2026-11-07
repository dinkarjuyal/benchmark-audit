import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How findings are produced, verified, and gated before publication.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-sm sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Methodology</h1>
      <p className="mt-4 text-muted">
        Benchmarks get treated as ground truth far more often than the
        evidence supports. This is where the gap gets made visible, one
        reproduced finding at a time. The goal isn&apos;t to dunk on any
        particular lab or benchmark author.
      </p>

      <h2 className="mt-8 text-base font-semibold">What qualifies as a finding</h2>
      <p className="mt-2 text-muted">
        Every post is a reproduction, not an assertion: a concrete repro
        someone else can run. A diff against the published grader. A
        sandbox escape that executes. A web search that returns the answer
        key. Not a reading of the paper, not a hunch from the leaderboard.
        Findings that can&apos;t be reproduced don&apos;t get published, no
        matter how plausible they sound.
      </p>

      <h2 className="mt-8 text-base font-semibold">Right of reply</h2>
      <p className="mt-2 text-muted">
        Every post names the benchmark owner and attempts outreach before or
        alongside publication. A response gets quoted in full: no
        summarizing, no editing. No response by ship time gets stated
        plainly. The one exception: an actively exploitable issue, like a
        sandbox escape with live impact. There, responsible disclosure takes
        over: notify first, publish after a fix window or once it&apos;s
        public elsewhere.
      </p>

      <h2 className="mt-8 text-base font-semibold">Cadence and review</h2>
      <p className="mt-2 text-muted">
        One finding ships per week at most. A reproducible audit takes real
        time. A daily cadence would force the shortcut this project is
        built to catch: publishing on a plausible claim instead of a
        verified one. Every post gets reviewed by a person before it goes
        live, however it was drafted.
      </p>

      <h2 className="mt-8 text-base font-semibold">Taxonomy</h2>
      <p className="mt-2 text-muted">
        Findings are tagged against a fixed, public list of failure modes.
        The list only grows when something genuinely doesn&apos;t fit an
        existing category, never to make a finding sound more novel than it
        is.
      </p>

      <h2 className="mt-8 text-base font-semibold">Submissions</h2>
      <p className="mt-2 text-muted">
        Not open yet. Submissions and crowdsourced verification come once
        there&apos;s a track record here worth trusting. Opening that too
        early is its own way to publish something false. Check back.
      </p>
    </div>
  );
}
