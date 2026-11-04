# Weekly audit pipeline

This is the spec for how a finding gets from "a benchmark claim exists" to
"a post is live." Read this before building or running the automation —
it's also the file a future agent session should read first to resume this
project.

## Status as of this writing

Scaffold only. The site builds and deploys; `content/posts/` is empty by
design (see root decisions below). The pipeline described here is **not yet
wired up** — no CronCreate routine exists yet. Next concrete step:
implement the routine described in "Automation" below.

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

## Automation (not yet built)

Planned: a weekly `CronCreate` scheduled routine that runs steps 1–4
above as a Claude Code session with `gh`/git access, authenticated the same
way this scaffolding session was (existing `gh auth` on this machine).
It should stop and leave a draft/issue rather than open a PR if nothing
reproducible turns up that week, and it should never merge its own PR.

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
