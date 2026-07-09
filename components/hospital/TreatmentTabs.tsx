"use client";

import { useState } from "react";
import Image from "next/image";
import type { HospitalTreatment } from "@/lib/hospitals";

const PROSE =
  "text-sm leading-relaxed text-gray-600 [&_p]:mb-4 [&_p]:font-medium [&_p]:text-ink [&_ul]:grid [&_ul]:gap-x-6 [&_ul]:gap-y-2 sm:[&_ul]:grid-cols-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:mt-2 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-brand-purple";

export default function TreatmentTabs({ items }: { items: HospitalTreatment[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];
  if (!current) return null;

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Treatments offered"
        className="thin-scroll mx-auto flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-full bg-gradient-to-r from-[#006589]/[0.06] to-[#3d4281]/[0.06] p-2"
      >
        {items.map((t, i) => (
          <button
            key={t.treatment_name}
            role="tab"
            type="button"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === i
                ? "bg-gradient-to-br from-[#006589] to-[#3d4281] text-white shadow"
                : "text-[#221e47] hover:text-[#006589]"
            }`}
          >
            {t.treatment_name}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,440px)_1fr]">
        {current.treatment_image?.url && (
          <div className="relative h-72 w-full overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 lg:sticky lg:top-28 lg:h-[380px]">
            <Image
              src={current.treatment_image.url}
              alt={current.treatment_name}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 440px"
            />
          </div>
        )}
        <div>
          <h3 className="font-display text-xl text-brand-purple lg:text-2xl">{current.treatment_name}</h3>
          <div className={`mt-4 ${PROSE}`} dangerouslySetInnerHTML={{ __html: current.treatment_information }} />
        </div>
      </div>
    </div>
  );
}
