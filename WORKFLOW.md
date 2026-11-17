# Weekly audit pipeline

This is the spec for how a finding gets from "a benchmark claim exists" to
"a post is live." Read this before building or running the automation —
it's also the file a future agent session should read first to resume this
project.

## Status as of this writing

Live. Five posts have shipped (APEX-Agents, three ColBench findings, BFCL
v4). The automation described in "Automation" below is wired up as a
daily scheduled routine (`benchmark-audit-daily`) plus a weekly
self-review routine (`benchmark-audit-meta-review`) — see AUDIT_SYSTEM.md
for how the daily run organizes itself into roles (PM/Engineer/QA) and
what the weekly Meta run is and isn't allowed to change.

Note on cadence: the root decision below says "weekly cadence at most" for
the *publish* gate, not the pick attempt. The daily routine attempts a
pick every day but guard-checks for an already-open unmerged `audit/*` PR
and no-ops if one exists, so actual publish cadence is still capped by how
fast the repo owner reviews — daily picking doesn't mean daily shipping.
This was an explicit, informed decision to revisit the original
"daily-cadence benchmark takes are usually wrong" framing below; it's
recorded here rather than silently overridden.

## Root decisions already made (don't re-litigate these)

Established via a "grilling"-style interrogation before any code was
written. Re-opening these needs a real reason, not just revisiting:

- **Platform**: standalone Next.js app + own domain, not the existing
  Jekyll site, not a Claude Artifact (Artifacts' `db` capability is gated to
  signed-in claude.ai org members, not open public visitors — wrong fit
  for crowdsourcing later).
- **v1 scope**: content only. No public submissions, no database, no auth.
  Submissions are v2, gated on this project having a track record worth
  trusting.
- **Publish gate**: a human (the repo owner) approves every post, weekly
  cadence at most. The agent pipeline drafts and opens a PR; merging the PR
  is the approval and the publish action. Never fully automated.
- **Right of reply**: every post attempts outreach to the benchmark owner
  before or alongside publication, except for an actively exploitable
  issue, where responsible-disclosure norms take priority.
- **Domain**: ships on a free subdomain first; a permanent brand/domain is
  a v2+ decision, deliberately deferred.
- **Stack**: static content in git, no DB, deployed on Vercel from GitHub.
  No GPU/compute needed — this is not a training workload, don't reach
  for GCP credits here.

## The pipeline (target design)

1. **Picker** (1 agent/subagent): scans for one benchmark, leaderboard, or
   eval claim worth auditing this week — something trending, a new
   release, a provocative result. Picks exactly one. Quality over cadence:
   this project exists because daily-cadence benchmark takes are usually
   wrong.
2. **Auditor team** (parallel subagents, one taxonomy category each, see
   `src/lib/taxonomy.ts` for the current list): each must **reproduce, not
   assert**. A grader-strictness finding needs an actual wrong-marked
   answer sample; a contamination finding needs an actual successful
   retrieval of the answer key; an isolation-failure finding needs an
   actual kill-chain, not a reading of the methodology section. No
   reproduction, no finding — drop it rather than publish a hunch.
3. **Outreach**: before drafting the post, contact the benchmark
   owner/maintainer (email, GitHub issue, or public reply as appropriate)
   describing the finding and asking for comment. Log every attempt in the
   post's `outreachLog`. Give a real window to respond (days, not hours)
   except for active-exploit cases.
4. **Synthesizer**: takes whatever the auditors reproduced plus whatever
   outreach returned, tags it against `src/lib/taxonomy.ts` (proposes a new
   category only if nothing existing fits — this should be rare), fills
   `content/_templates/audit-post.mdx`, and opens a PR against this repo
   with the new file in `content/posts/` (`draft: false`, outreach fields
   filled in).
5. **Human gate**: repo owner reviews the PR like any other PR — reads
   the repro, checks the severity argument, checks the outreach log is real
   — and merges to publish. Merge triggers a Vercel deploy automatically.

If no finding survives reproduction in a given week, no PR goes out that
week. Silence is an acceptable output; a weak post is not.

## Automation (built)

Two cloud routines, both on `dinkarjuyal/benchmark-audit`:

- **`benchmark-audit-daily`** — runs daily, guard-checks for an open
  `audit/*` PR (no-ops if found), otherwise runs steps 1–2 above organized
  into the PM/Engineer/QA roles in AUDIT_SYSTEM.md, and opens a PR with a
  draft post if something survives QA, or an issue if nothing does after
  two target attempts. Never merges its own PR, never does outreach.
- **`benchmark-audit-meta-review`** — runs weekly, reviews the past week's
  PR/issue activity from the daily routine, and proposes refinements to
  AUDIT_SYSTEM.md's tunable policy (never its fixed guardrails) via its
  own PR. Never merges its own PR either.

Outreach (step 3 above) is intentionally not automated anywhere — it stays
a separate, explicitly human-initiated action.

## Post schema

See `src/lib/types.ts` (`PostFrontmatter`) for the authoritative shape, and
`content/_templates/audit-post.mdx` for the fillable template with the
required-before-publish checklist in its HTML comment.

## Open items / deliberately deferred

- Public submissions + crowdsourced verification (v2; needs auth + a
  moderation story before it opens)
- Permanent domain/brand
- Cross-posting findings to social on publish (worth adding once there's a
  first real post to test it against)
