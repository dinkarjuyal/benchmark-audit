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
        evidence supports. This site exists to make the gap visible and
        specific, one reproduced finding at a time — not to dunk on any
        particular lab or benchmark author.
      </p>

      <h2 className="mt-8 text-base font-semibold">What qualifies as a finding</h2>
      <p className="mt-2 text-muted">
        Every post is a reproduction, not an assertion. That means a concrete
        repro someone else can run — a diff against the published
        grader, a sandbox escape that actually executes, a web search that
        actually returns the answer key — not a reading of the paper or
        a hunch from the leaderboard. Findings that can&apos;t be reproduced
        don&apos;t get published, however plausible they sound.
      </p>

      <h2 className="mt-8 text-base font-semibold">Right of reply</h2>
      <p className="mt-2 text-muted">
        Every post names the benchmark owner and attempts outreach before or
        alongside publication. If they respond, the response is quoted in
        full in the post, not summarized or edited. If they don&apos;t
        respond by the time a post ships, that is stated plainly rather than
        implied. The one exception is an actively exploitable issue (e.g. a
        sandbox escape with live impact), where responsible disclosure norms
        — notify first, publish after a fix window or once it&apos;s
        public elsewhere — take priority over the standard outreach
        window.
      </p>

      <h2 className="mt-8 text-base font-semibold">Cadence and review</h2>
      <p className="mt-2 text-muted">
        One finding ships per week at most. A reproducible audit takes real
        time; a daily cadence would force the same shortcut —
        publishing on a plausible claim instead of a verified one — this
        project exists to call out elsewhere. Every post is reviewed by a
        person before it goes live, regardless of how it was drafted.
      </p>

      <h2 className="mt-8 text-base font-semibold">Taxonomy</h2>
      <p className="mt-2 text-muted">
        Findings are tagged against a fixed, public list of failure modes
        (see <a href="/taxonomy" className="underline">taxonomy</a>). The
        list only grows when a finding genuinely doesn&apos;t fit an existing
        category — never to make a finding sound more novel than it is.
      </p>

      <h2 className="mt-8 text-base font-semibold">Submissions</h2>
      <p className="mt-2 text-muted">
        Not open yet. The plan is to accept public submissions and
        crowdsourced verification once there&apos;s a track record here
        worth trusting — opening it too early is its own way to end up
        publishing something false. Check back.
      </p>
    </div>
  );
}
