# Audit system: roles and tunable policy

WORKFLOW.md is the spec for what a finding has to clear before it ships.
This file is the spec for *how the automated daily run organizes itself*
to get there, and it is the one file a scheduled **Meta** run is allowed to
edit. Everything under "Tunable policy" is fair game for Meta to refine
based on real evidence from past runs. Everything under "Fixed guardrails"
is not — Meta can recommend a guardrail change in prose, as a note in the
Change log, but may never edit the guardrails themselves, and the daily
routine's own cron-level prompt (not this file) is the actual enforcement
point for the two hardest ones (never merge, never contact the benchmark
owner), so a bad edit here cannot remove them anyway.

## Roles (daily run)

### PM (Picker)
Owns the decision of what gets audited today. Scans for a benchmark,
leaderboard, or claim that's trending or newly relevant (new release, a
paper/leaderboard update, public discussion of results looking off).
Checks it against `content/posts/` (the `benchmark` frontmatter field, not
just filenames) and against all `audit/*` branches (open and merged) so the
same target doesn't get re-picked. Rejects targets with no public code or
data — the project can't reproduce a claim it can't run or read. Hands the
Engineer role a single target plus which `src/lib/taxonomy.ts` categories
plausibly apply.

### Engineer (Auditor)
Owns reproduction. One instance per plausible taxonomy category, run in
parallel via the Agent tool. Must produce a real artifact: actual grading
code run against actual test data, actual output showing the defect — not
a description of what the code "would do." If the only path to a repro
would require executing untrusted cloned code directly and the environment
won't allow that, the Engineer re-derives the exact logic by reading the
source and re-implements it standalone (verbatim where it matters) against
the real public data, rather than skipping the finding or guessing. A
category with nothing reproducible after a real attempt returns empty —
that's a correct result, not a failure to report.

### QA (Reviewer)
Owns the go/no-go gate before anything gets written up. Takes everything
the Engineer roles returned and checks, skeptically, for each candidate
finding:
- Is there an actual repro artifact (real command + real output), or is
  this an assertion dressed as one?
- Is the severity argument scoped to what was actually shown (what
  fraction of the benchmark, which categories, would it move a ranking) or
  is it inflated?
- Does a simpler explanation account for the result (a legitimate
  inference question misread as a grading bug, a single outlier presented
  as systematic)?
- Does this duplicate a finding already published or already the subject
  of a closed PR?

QA can kill a finding the Engineer thought was good. QA cannot soften the
"reproduce, not assert" bar to let something through — if QA is unsure
whether a repro is real, that's a no, not a maybe. Only what QA clears
reaches Synthesize-and-ship.

### Meta (weekly, separate routine from the daily one)
Does not touch any single day's pick. Instead, once a week, looks back at
everything the daily routine did that week (PRs opened, whether they were
merged/closed/left open, issues opened for "nothing found" or "skipped,"
which taxonomy categories keep getting picked vs. ignored, any pattern in
what the repo owner pushed back on in review comments) and asks: is this
system actually getting better, or just busier? Proposes changes to the
**Tunable policy** section below — never to Fixed guardrails, never
directly to a merged post, never to the cron schedule or trigger config
itself (Meta doesn't have access to that; it can only propose, via the
file it's allowed to edit). Opens a PR with the diff and a Change log
entry explaining the evidence behind each change. Never merges its own PR
— same human gate as a content PR.

## Fixed guardrails (Meta may not remove or weaken these; enforced
primarily in the daily routine's own prompt, not this file)

- Never merge any PR. Merging is the repo owner's action only.
- Never contact a benchmark's owners/maintainers (no emails, no GitHub
  issues/DMs aimed at the audited party). Opening the project's own
  "nothing found" or "skipped" issue is not outreach.
- Every new post ships with `draft: true`, `outreachStatus: "not_contacted"`,
  `outreachLog: []`. Flipping a post live is a separate, explicit,
  human-initiated action.
- The daily run must guard-check for an already-open, unmerged `audit/*`
  PR and no-op (do nothing else) if one exists, so unreviewed PRs can't
  outpace the repo owner's review bandwidth.
- No reproduction, no finding — this bar is set in WORKFLOW.md and this
  file only elaborates on how QA enforces it, never loosens it.

## Tunable policy (Meta may refine these, with reasoning, via PR)

- **Picker sourcing**: which signals count as "trending" (arXiv recency,
  HN/Twitter discussion, leaderboard update feeds) and how to weight them.
- **Taxonomy rotation**: current taxonomy tag usage across published posts
  (check `content/posts/*.mdx` frontmatter) — if one category (e.g.
  grader-strictness) keeps winning and others (contamination,
  environment-isolation, statistical-validity, task-validity,
  harness-bugs, format-gating) never get picked, that's worth a nudge in
  the Picker's prompt, not a quota.
- **Retry bound**: currently 2 target attempts per day before falling back
  to a "nothing found" issue. Adjust if evidence shows this is too tight
  (good targets abandoned early) or too loose (burning a lot of a run on
  dead ends).
- **QA acceptance bar**: the four bullet checks above. Sharpen or add to
  them if a pattern of weak findings is getting through, or legitimate
  ones are getting killed too easily.
- **Severity rubric**: how "low/medium/high" gets argued from scope. Add
  calibration examples here as real cases accumulate.

## Change log

Meta appends one entry per PR it opens, newest first. Format:
`YYYY-MM-DD — <what changed> — <evidence that motivated it>`.

(No entries yet — this file is new as of 2026-11-17.)
