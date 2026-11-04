export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-8 text-xs text-muted sm:px-6">
        <p>
          Every finding here is reproduced, not asserted, and every subject
          gets a right of reply before or alongside publication. See{" "}
          <a href="/about" className="underline hover:text-foreground">
            methodology
          </a>
          .
        </p>
        <p className="mt-2">
          Spot something, or own a benchmark discussed here? Contact details
          go in{" "}
          <code className="rounded bg-surface px-1 py-0.5">
            src/components/footer.tsx
          </code>{" "}
          before launch — left blank intentionally, see WORKFLOW.md.
        </p>
      </div>
    </footer>
  );
}
