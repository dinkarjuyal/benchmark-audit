import type { Metadata } from "next";
import { taxonomy } from "@/lib/taxonomy";
import { getPostsByCategory } from "@/lib/posts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Taxonomy",
  description:
    "The growing taxonomy of recurring ways AI benchmarks and leaderboards fail.",
};

export default function TaxonomyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Taxonomy</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Every audit here is tagged against this list. It starts at seven
        categories and only grows when a finding doesn&apos;t fit any
        existing one — categories are never split or merged to flatter a
        finding.
      </p>

      <div className="mt-10 space-y-10">
        {taxonomy.map((cat) => {
          const posts = getPostsByCategory(cat.id);
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-20">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                <span className="font-mono text-xs text-muted">
                  {posts.length} {posts.length === 1 ? "finding" : "findings"}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-accent">
                {cat.oneLiner}
              </p>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                {cat.description}
              </p>
              {posts.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/posts/${p.slug}`}
                        className="text-sm underline hover:text-accent"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
