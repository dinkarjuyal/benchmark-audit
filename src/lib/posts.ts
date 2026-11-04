import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPost(filename: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { ...(data as PostFrontmatter), content };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map(readPost).filter((p) => !p.draft);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categoryId: string): Post[] {
  return getAllPosts().filter((p) => p.taxonomyTags.includes(categoryId));
}
