import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { taxonomy } from "@/lib/taxonomy";
import { SeverityBadge, TagBadge } from "@/components/badge";
import { EmptyState } from "@/components/empty-state";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <section>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          every finding reproduced, not asserted
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          AI benchmarks fail in specific, recurring ways. We catalog them.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          Leaderboards get taken at face value far more often than they
          deserve to be. This is a running audit of where benchmarks and
          evals actually break: broken graders, leaked answer keys,
          isolation claims that don&apos;t hold, format gating, harness bugs
          dressed up as capability limits. Every finding gets reproduced.
          Every subject gets a right of reply.
        </p>
        <div className="mt-6 flex gap-3 text-sm">
          <Link
            href="/taxonomy"
            className="rounded-md bg-foreground px-4 py-2 font-medium text-background"
          >
            Browse the taxonomy
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-border px-4 py-2 font-medium"
          >
            Methodology
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Latest audits
        </h2>
        <div className="mt-4">
          {posts.length === 0 ? (
            <EmptyState
              title="first audit ships week 1"
              body="This runs on a weekly cadence: a benchmark or claim is picked, a reproduction is attempted, and nothing publishes without a real repro and an outreach attempt to the benchmark owner. Check back soon."
            />
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-border pb-6">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-lg font-medium hover:text-accent"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{post.summary}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <SeverityBadge severity={post.severity} />
                    {post.taxonomyTags.map((t) => (
                      <TagBadge key={t} label={t} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Taxonomy categories
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {taxonomy.map((cat) => (
            <Link
              key={cat.id}
              href={`/taxonomy#${cat.id}`}
              className="rounded-lg border border-border bg-surface p-4 hover:border-accent"
            >
              <p className="font-medium">{cat.name}</p>
              <p className="mt-1 text-sm text-muted">{cat.oneLiner}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
