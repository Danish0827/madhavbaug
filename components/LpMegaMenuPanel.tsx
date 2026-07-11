import Link from "next/link";

type LpNavItem = { label: string; href: string };

/**
 * Simple landing-page nav panel (anchor links only). Kept minimal so the
 * standalone LP header never links away to other site pages.
 */
export default function LpMegaMenuPanel({ item }: { item: LpNavItem[] }) {
  if (!Array.isArray(item) || item.length === 0) return null;
  return (
    <nav className="grid gap-1 p-4">
      {item.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-surface-lav hover:text-brand-purple"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
