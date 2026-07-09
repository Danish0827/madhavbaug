"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Clock, Phone, Navigation, Loader2, CalendarCheck, X } from "lucide-react";

type LpClinic = {
  id: number;
  title: string;
  city: string;
  state: string;
  locality: string;
  address: string;
  timing: string;
  phone: string;
  phoneRaw: string;
  doctor: string;
  bookAppointment: string;
  directionsUrl: string;
};

export default function ClinicFinder({ popular }: { popular: string[] }) {
  const [clinics, setClinics] = useState<LpClinic[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/lp-clinics?state=maharashtra&city=mumbai&per_page=40", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { clinics: [] }))
      .then((d: { clinics?: LpClinic[] }) => {
        setClinics(d.clinics ?? []);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clinics;
    return clinics.filter((c) =>
      `${c.title} ${c.city} ${c.locality} ${c.address} ${c.state}`.toLowerCase().includes(q)
    );
  }, [clinics, query]);

  const shown = filtered.slice(0, 6);

  return (
    <div>
      {/* Search + popular chips */}
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your PIN code or preferred suburb..."
            className="h-[52px] w-full rounded-full border border-gray-200 bg-white pl-11 pr-10 text-sm text-gray-700 shadow-sm outline-none transition-colors placeholder:text-gray-400 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {popular.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setQuery(p)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                query.toLowerCase() === p.toLowerCase()
                  ? "border-brand-purple bg-brand-purple text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-brand-purple/50 hover:text-brand-purple"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin text-brand-purple" /> Loading clinics...
          </div>
        )}
        {status === "error" && (
          <p className="py-12 text-center text-sm text-gray-500">
            We couldn&apos;t load clinics right now. Please submit the form and our team will help you.
          </p>
        )}
        {status === "ready" && shown.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">
            No clinics match &quot;{query}&quot;. Try another suburb or submit your enquiry above.
          </p>
        )}
        {status === "ready" && shown.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => (
              <article key={c.id} className="flex flex-col rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h3 className="font-display text-base leading-snug text-ink">{c.title}</h3>
                {c.doctor && <p className="mt-1 text-xs font-medium text-teal-deep">{c.doctor}</p>}
                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-gray-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" /> {c.address}
                </p>
                {c.timing && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 shrink-0 text-brand-purple" /> {c.timing}
                  </p>
                )}
                {c.phone && (
                  <a href={`tel:${c.phoneRaw}`} className="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-brand-purple">
                    <Phone className="h-4 w-4 shrink-0 text-brand-purple" /> {c.phone}
                  </a>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                  {c.bookAppointment && (
                    <a
                      href={c.bookAppointment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gradient inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white"
                    >
                      <CalendarCheck className="h-3.5 w-3.5" /> Book
                    </a>
                  )}
                  {c.directionsUrl && (
                    <a
                      href={c.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-deep hover:underline"
                    >
                      <Navigation className="h-3.5 w-3.5" /> Directions
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
        {status === "ready" && filtered.length > 6 && (
          <p className="mt-6 text-center text-sm text-gray-500">
            Showing 6 of {filtered.length} nearby clinics. Refine your search or submit the form for help.
          </p>
        )}
      </div>
    </div>
  );
}
