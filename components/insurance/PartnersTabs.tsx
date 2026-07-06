"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const TEAL = "bg-gradient-to-br from-[#006589] to-[#3d4281]";

/**
 * Partners section with working location tabs. Selecting a location switches
 * the active tab; the accepted insurers / TPAs are network-wide, so the lists
 * are shared and the card reflects the chosen location.
 */
export default function PartnersTabs({
  locations,
  insurers,
  tpas,
}: {
  locations: string[];
  insurers: string[];
  tpas: string[];
}) {
  const initial = Math.max(0, locations.indexOf("Madhavbaug Vadodara"));
  const [active, setActive] = useState(initial);

  return (
    <>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Madhavbaug locations"
        className="thin-scroll mt-8 flex items-center justify-start gap-2 overflow-x-auto rounded-full bg-gradient-to-r from-[#006589]/[0.06] to-[#3d4281]/[0.06] p-2 sm:justify-center sm:p-3"
      >
        {locations.map((loc, i) => (
          <button
            key={loc}
            role="tab"
            type="button"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              active === i
                ? `${TEAL} text-white shadow`
                : "text-[#221e47] hover:text-[#006589]"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="mt-10 grid overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div className="relative min-h-[240px] lg:min-h-full">
          <Image
            src="/assets/insurance/handshake.png"
            alt="Insurance partnership"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 360px"
          />
        </div>
        <div className={`${TEAL} p-8 text-white lg:p-10`}>
          <p className="text-sm text-white/70">
            Insurers &amp; TPAs accepted at{" "}
            <span className="font-semibold text-white">{locations[active]}</span>
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <PartnerList title="Insurance Partners" items={insurers} />
            <PartnerList title="Third-Party Administrators" items={tpas} />
          </div>
        </div>
      </div>
    </>
  );
}

function PartnerList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-xl">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Check className="h-2.5 w-2.5" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
