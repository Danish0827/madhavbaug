"use client";

import { useState } from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import type { MilestoneTab } from "@/data/awards";

export default function MilestonesTabs({ tabs }: { tabs: MilestoneTab[] }) {
  const [active, setActive] = useState(0);
  const cards = tabs[active]?.cards ?? [];

  return (
    <>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Award categories"
        className="thin-scroll mx-auto mt-8 flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-full bg-gradient-to-r from-[#006589]/[0.06] to-[#3d4281]/[0.06] p-2"
      >
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            type="button"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`shrink-0 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
              active === i
                ? "bg-gradient-to-br from-[#006589] to-[#3d4281] text-white shadow"
                : "text-[#221e47] hover:text-[#006589]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cards.map((c) => (
          <article key={c.title} className="overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5">
            <div className="flex h-56 items-center justify-center bg-white p-6">
              {c.image ? (
                <div className="relative h-full w-full">
                  <Image src={c.image} alt={c.title} fill className="object-contain" sizes="(max-width:768px) 100vw, 600px" />
                </div>
              ) : (
                <span className="bg-brand-gradient flex h-20 w-20 items-center justify-center rounded-2xl text-white">
                  <Award className="h-9 w-9" />
                </span>
              )}
            </div>
            <div className="bg-gradient-to-br from-brand-purple/[0.08] to-brand-maroon/[0.08] p-7">
              <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl leading-snug text-transparent">
                {c.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-teal-deep">{c.presentedBy}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{c.description}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
