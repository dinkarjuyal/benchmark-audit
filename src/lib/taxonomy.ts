import type { TaxonomyCategory } from "./types";

export const taxonomy: TaxonomyCategory[] = [
  {
    id: "grader-strictness",
    name: "Grader Strictness",
    oneLiner: "The scorer rejects answers that are actually correct.",
    description:
      "Regex, exact-match, or brittle parsing logic marks a right answer wrong because it doesn't match the expected surface form — wrong units, a valid paraphrase, a correct value in the wrong field. The model's capability is fine; the grader is lying about it.",
  },
  {
    id: "contamination",
    name: "Answer-Key Leakage",
    oneLiner: "The correct answer is reachable without doing the task.",
    description:
      "The eval set, ground truth, or a close paraphrase of it is findable through web search, a public HuggingFace dataset, or pretraining data. A model with tool access can retrieve the key instead of solving the task, and the benchmark can't tell the difference.",
  },
  {
    id: "environment-isolation",
    name: "Environment / Sandbox Isolation Failure",
    oneLiner: "A claimed isolation guarantee doesn't actually hold.",
    description:
      "The benchmark's methodology states a mitigation — no network access, no internet, a sealed sandbox — and the shipped harness doesn't enforce it. Verified by reproduction, not by reading the paper.",
  },
  {
    id: "format-gating",
    name: "Prompt / Format Gating",
    oneLiner: "The task format penalizes correct reasoning, not incorrect reasoning.",
    description:
      "A model is forced into an unnatural response shape — prose instead of JSON Schema, a single token instead of reasoning — and the format mismatch, not a capability gap, is what drives the score down.",
  },
  {
    id: "statistical-validity",
    name: "Statistical Validity",
    oneLiner: "The headline number doesn't support the claim being made.",
    description:
      "Single-seed results presented as stable, no variance or confidence interval reported, a baseline chosen to maximize the delta, or n too small for the claimed effect size.",
  },
  {
    id: "task-validity",
    name: "Task Validity / Ambiguity",
    oneLiner: "The task itself is contradictory, unsatisfiable, or underspecified.",
    description:
      "Constraints in the prompt conflict with each other, the task admits no correct solution, or the \"correct\" answer depends on an assumption never stated to the model.",
  },
  {
    id: "harness-bugs",
    name: "Scaffold / Harness Bugs Masking Capability",
    oneLiner: "Tooling breaks before the model gets a fair attempt.",
    description:
      "Missing packages, broken tool implementations, or flawed diffing/comparison logic in the harness fail the model for reasons that have nothing to do with whether it could do the task. Reported gains from fixing the harness alone, with zero model changes, are the tell.",
  },
];

export function getCategory(id: string): TaxonomyCategory | undefined {
  return taxonomy.find((c) => c.id === id);
}
