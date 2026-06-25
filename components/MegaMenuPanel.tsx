import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/data/navigation";

export default function MegaMenuPanel({ item }: { item: NavItem }) {
  return (
    <div className="animate-mm-in grid grid-cols-[1fr_auto] gap-8 p-8">
      {/* Link columns */}
      <div
        className="grid gap-x-10 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${item.columns.length}, minmax(0,1fr))` }}
      >
        {item.columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-purple">
              {col.title}
            </h4>
            <ul className="space-y-1.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-brand-purple"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Feature card */}
      {item.feature && (
        <Link
          href={item.feature.cta.href}
          className="bg-brand-gradient group flex w-64 flex-col justify-between rounded-2xl p-6 text-white"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              {item.feature.eyebrow}
            </p>
            <h3 className="font-display mt-2 text-xl leading-snug">
              {item.feature.title}
            </h3>
            <p className="mt-3 text-sm text-white/80">
              {item.feature.description}
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
            {item.feature.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      )}
    </div>
  );
}
