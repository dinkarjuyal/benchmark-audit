export type Severity = "critical" | "high" | "medium" | "low";

export type OutreachStatus =
  | "not_contacted"
  | "awaiting_response"
  | "responded"
  | "no_response";

export interface OutreachEntry {
  date: string;
  channel: string;
  note: string;
}

export interface TaxonomyCategory {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  example?: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  benchmark: string;
  benchmarkOwner: string;
  taxonomyTags: string[];
  severity: Severity;
  summary: string;
  evidence: string[];
  outreachStatus: OutreachStatus;
  outreachLog: OutreachEntry[];
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  content: string;
}
