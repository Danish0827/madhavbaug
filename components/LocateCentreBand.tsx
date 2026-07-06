"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Building2, Sprout, ArrowUpRight } from "lucide-react";
import type { GeoTerm } from "@/lib/clinics";
import SearchSelect from "./ui/SearchSelect";

export default function LocateCentreBand() {
  const router = useRouter();
  const [states, setStates] = useState<GeoTerm[]>([]);
  const [cities, setCities] = useState<GeoTerm[]>([]);
  const [stateSlug, setStateSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");

  useEffect(() => {
    fetch("/api/clinics/states", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { states: [] }))
      .then((d: { states?: GeoTerm[] }) => setStates(d.states ?? []))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!stateSlug) {
      setCities([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/clinics/cities?state=${encodeURIComponent(stateSlug)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { cities: [] }))
      .then((d: { cities?: GeoTerm[] }) => !cancelled && setCities(d.cities ?? []))
      .catch(() => !cancelled && setCities([]));
    return () => {
      cancelled = true;
    };
  }, [stateSlug]);

  const findCentre = () => {
    const sp = new URLSearchParams();
    if (stateSlug) sp.set("state", stateSlug);
    if (citySlug) sp.set("city", citySlug);
    const qs = sp.toString();
    router.push(`/clinic-hospital-locator${qs ? `?${qs}` : ""}`);
  };

  return (
    <section className="px-5 py-10 sm:px-8 lg:px-20 lg:py-14">
      <div className="mx-auto grid w-full container overflow-hidden rounded-[30px] bg-gradient-to-br from-[#6f58a5]/[0.08] to-[#892fac]/[0.08] ring-1 ring-brand-purple/10 lg:grid-cols-2">
        {/* Left: copy + finder card */}
        <div className="p-7 sm:p-10">
          <span className="inline-flex items-center gap-2 text-base font-medium text-eyebrow">
            <Sprout className="h-5 w-5" strokeWidth={2} /> Locate a Centre
          </span>
          <h2 className="font-display mt-3 max-w-md text-2xl leading-snug text-ink lg:text-[30px]">
            Worried About Your Health? Talk to a Madhavbaug Expert
          </h2>

          <div className="mt-6 rounded-[24px] border border-brand-purple/30 bg-white/80 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <SearchSelect
                label="Select State"
                icon={<MapPin className="h-4 w-4" />}
                value={stateSlug}
                options={states.map((s) => ({ value: s.slug, label: s.name }))}
                disabled={!states.length}
                onChange={(v) => {
                  setStateSlug(v);
                  setCitySlug("");
                }}
              />
              <SearchSelect
                label="Select City"
                icon={<Building2 className="h-4 w-4" />}
                value={citySlug}
                options={cities.map((c) => ({ value: c.slug, label: c.name }))}
                disabled={!stateSlug || !cities.length}
                onChange={setCitySlug}
              />
            </div>
            <button
              type="button"
              onClick={findCentre}
              className="btn-gradient mt-4 inline-flex items-center gap-2 rounded-full py-2.5 pr-2.5 pl-5 text-sm font-medium text-white shadow-md transition-shadow hover:shadow-lg"
            >
              Find Your Nearest Centre
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative min-h-56 lg:min-h-full">
          <Image
            src="/assets/doctors/locate-right.png"
            alt="Consult a Madhavbaug expert"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 720px"
          />
        </div>
      </div>
    </section>
  );
}
