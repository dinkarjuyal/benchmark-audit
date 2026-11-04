# Contributing

## Submissions: not open yet

Public submissions and crowdsourced verification are planned (see
`WORKFLOW.md`) but not live. Opening that before this project has a track
record of reproduced, carefully-gated findings would just mean publishing
unverified claims faster — the exact failure mode this project exists to
call out elsewhere. Check `WORKFLOW.md` for status.

## Taxonomy

The category list lives in `src/lib/taxonomy.ts`. It's meant to grow, but
only when a real finding genuinely doesn't fit an existing category —
never to make a finding sound more novel, and never split or merged after
the fact to flatter one post. If you think a category is missing, open an
issue describing the finding that doesn't fit, not just the category name.

## Post format

Every post is one `.mdx` file in `content/posts/`, matching
`PostFrontmatter` in `src/lib/types.ts`. Start from
`content/_templates/audit-post.mdx`, which documents the required-before-
publish checklist (reproduced, outreach attempted, severity argued) in its
HTML comment. A PR adding a post should set `draft: false` only once all
three are satisfied.
