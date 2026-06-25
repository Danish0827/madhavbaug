"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, MapPin, Search } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { findCentre } from "@/data/content";
import Link from "next/link";

export default function FindCentre() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const cities = state ? findCentre.citiesByState[state] ?? [] : [];

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
                <SelectField
                  label="Select State"
                  value={state}
                  options={findCentre.states}
                  onChange={(v) => {
                    setState(v);
                    setCity("");
                  }}
                />
                <SelectField
                  label="Select City"
                  value={city}
                  options={cities}
                  disabled={!state}
                  onChange={setCity}
                />
              </div>
              <div className="flex justify-center pt-5">
                <Link
                  href={'#'}
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

function SelectField({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-brand-purple disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
