# benchmark/audit

A public, growing taxonomy of how AI benchmarks and leaderboards actually
fail — broken graders, leaked answer keys, isolation claims that don't
hold, format gating, harness bugs dressed up as capability limits. Every
finding is a reproduction, not an assertion, and every benchmark owner named
gets a right of reply before or alongside publication.

See [`WORKFLOW.md`](./WORKFLOW.md) for the weekly audit pipeline and how a
finding goes from pick → reproduction → PR → published post.
See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the taxonomy, post schema, and
current submission policy.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind v4
- Content lives in `content/posts/*.mdx` (frontmatter + MDX body), no
  database — publishing a post is a git commit, nothing else
- `content/_templates/audit-post.mdx` is the schema template the weekly
  pipeline fills in
- Deployed on Vercel from this repo; every merge to `main` auto-deploys

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before deploying so OG
images, the sitemap, and the RSS feed resolve to the real domain instead of
`localhost`.

## Status

v1 is content-only: no public submissions, no database. See
[`WORKFLOW.md`](./WORKFLOW.md) for what's next.
