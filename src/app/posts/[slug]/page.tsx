import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCategory } from "@/lib/taxonomy";
import { SeverityBadge, TagBadge } from "@/components/badge";
import { TraceViewer } from "@/components/trace-viewer";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <time className="font-mono text-xs text-muted">{post.date}</time>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">{post.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <SeverityBadge severity={post.severity} />
        {post.taxonomyTags.map((tag) => {
          const cat = getCategory(tag);
          return <TagBadge key={tag} label={cat?.name ?? tag} />;
        })}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface p-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs text-muted">Benchmark</dt>
          <dd>{post.benchmark}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Owner</dt>
          <dd>{post.benchmarkOwner}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Outreach</dt>
          <dd className="capitalize">{post.outreachStatus.replace("_", " ")}</dd>
        </div>
      </dl>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <MDXRemote
          source={post.content}
          components={{ TraceViewer }}
          options={{ blockJS: false }}
        />
      </div>

      {post.evidence.length > 0 && (
        <div className="mt-10 border-t border-border pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Evidence
          </h2>
          <ul className="mt-2 space-y-1">
            {post.evidence.map((link) => (
              <li key={link}>
                <a
                  href={link}
                  className="break-all text-sm text-accent underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
