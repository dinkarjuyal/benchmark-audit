export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-8 text-xs text-muted sm:px-6">
        <p>
          Every finding here is reproduced, not asserted. Every subject gets
          a right of reply before or alongside publication. See the{" "}
          <a href="/about" className="underline hover:text-foreground">
            methodology
          </a>
          .
        </p>
        <p className="mt-2">
          Think something here is wrong, or run one of these benchmarks?{" "}
          <a
            href="https://github.com/dinkarjuyal/benchmark-audit/issues"
            className="underline hover:text-foreground"
          >
            Open an issue on GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
