import Link from "next/link";

const links = [
  { href: "/posts", label: "Audits" },
  { href: "/taxonomy", label: "Taxonomy" },
  { href: "/about", label: "Methodology" },
];

export function Nav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          benchmark<span className="text-accent">/</span>audit
        </Link>
        <nav className="flex gap-5 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
