import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SeverityBadge, TagBadge } from "@/components/badge";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "Audits",
  description: "Every reproduced benchmark audit, newest first.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Audits</h1>
      <p className="mt-3 text-sm text-muted">
        Newest first. Severity reflects how much of the benchmark&apos;s
        headline claim the finding undermines, not how embarrassing it is.
      </p>

      <div className="mt-10">
        {posts.length === 0 ? (
          <EmptyState
            title="nothing published yet"
            body="The weekly pipeline hasn't shipped its first reproduced finding. See the home page for what's running."
          />
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border pb-8">
                <time className="font-mono text-xs text-muted">
                  {post.date}
                </time>
                <Link
                  href={`/posts/${post.slug}`}
                  className="mt-1 block text-lg font-medium hover:text-accent"
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
    </div>
  );
}
