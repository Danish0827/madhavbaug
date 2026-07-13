"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Building2, MapPin, Search } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import SearchSelect from "./ui/SearchSelect";
import { findCentre } from "@/data/content";
import type { GeoTerm } from "@/lib/clinics";
import Link from "next/link";

export default function FindCentre() {
  const [states, setStates] = useState<GeoTerm[]>([]);
  const [cities, setCities] = useState<GeoTerm[]>([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  /* ---- Load states once ---- */
  useEffect(() => {
    fetch("/api/clinics/states", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { states: [] }))
      .then((d: { states?: GeoTerm[] }) => setStates(d.states ?? []))
      .catch(() => setStates([]));
  }, []);

  /* ---- Load cities whenever the state changes ---- */
  useEffect(() => {
    if (!state) {
      setCities([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/clinics/cities?state=${encodeURIComponent(state)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { cities: [] }))
      .then((d: { cities?: GeoTerm[] }) => !cancelled && setCities(d.cities ?? []))
      .catch(() => !cancelled && setCities([]));
    return () => {
      cancelled = true;
    };
  }, [state]);

  return (
    <section id="programs" className=" py-10 lg:py-16 px-5 sm:px-8">
      <div className="mx-auto rounded-4xl bg-linear-150 from-[#e8e8e9] to-[#eac5f8] grid w-full container items-center gap-10  lg:grid-cols-2 ">
        {/* Copy + selectors */}
        <div className="flex items-center relative h-full z-10">
          <div className="px-5 sm:px-8 lg:px-12">
            <Image
              src="/assets/map.webp"
              alt="Madhavbaug centres across India"
              fill
              className="absolute object-cover"
            />
            <SectionLabel>{findCentre.eyebrow}</SectionLabel>
            <h2 className="font-display mt-4 text-3xl leading-snug text-ink lg:text-[36px]">
              {findCentre.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm text-gray-600">{findCentre.body}</p>

            <div className="mt-7 relative z-20 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <SearchSelect
                  label="Select State"
                  icon={<MapPin className="h-4 w-4" />}
                  value={state}
                  options={states.map((s) => ({ value: s.slug, label: s.name }))}
                  disabled={!states.length}
                  onChange={(v) => {
                    setState(v);
                    setCity("");
                  }}
                />
                <SearchSelect
                  label="Select City"
                  icon={<Building2 className="h-4 w-4" />}
                  value={city}
                  options={cities.map((c) => ({ value: c.slug, label: c.name }))}
                  disabled={!state || !cities.length}
                  onChange={setCity}
                />
              </div>
              <div className="flex justify-center pt-5">
                <Link
                  href={`clinic-hospital-locator?state=${state}/city=${city}`}
                  className="inline-flex items-center group"
                >
                  <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                    {findCentre.cta.label}
                  </span>
                  <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
                    <Search className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative aspect-[636/434] w-full overflow-hidden rounded-r-4xl ">
          <Image
            src="/assets/locate-1.webp"
            alt="Madhavbaug centres across India"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
