"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import type { MbEvent, EventTerm } from "@/lib/events";
import EventCard from "./EventCard";
import SearchSelect from "@/components/ui/SearchSelect";

type TimeTab = "upcoming" | "past";

export default function EventsBrowser({
  events,
  categories,
}: {
  events: MbEvent[];
  categories: EventTerm[];
}) {
  const [tab, setTab] = useState<TimeTab>("upcoming");
  const [cat, setCat] = useState("");

  /* Pre-select category from ?category=slug. */
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    if (c) setCat(c.trim());
  }, []);

  const counts = useMemo(
    () => ({
      upcoming: events.filter((e) => e.isUpcoming).length,
      past: events.filter((e) => !e.isUpcoming).length,
    }),
    [events]
  );

  const list = useMemo(() => {
    return events
      .filter((e) => (tab === "upcoming" ? e.isUpcoming : !e.isUpcoming))
      .filter((e) => !cat || e.categories.some((c) => c.slug === cat))
      .sort((a, b) => (tab === "upcoming" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp));
  }, [events, tab, cat]);

  const tabs: { key: TimeTab; label: string; count: number }[] = [
    { key: "upcoming", label: "Upcoming", count: counts.upcoming },
    { key: "past", label: "Past", count: counts.past },
  ];

  return (
    <div className="mx-auto w-full container">
      {/* ---------- Filters ---------- */}
      <div className="mb-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="inline-flex rounded-full bg-cream p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                tab === t.key ? "btn-gradient text-white shadow" : "text-gray-600 hover:text-brand-purple"
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 text-[11px] ${
                  tab === t.key ? "bg-white/20 text-white" : "bg-white text-gray-500"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {categories.length > 0 && (
          <div className="w-full max-w-xs sm:w-56">
            <SearchSelect
              label="All Categories"
              value={cat}
              options={categories.map((c) => ({ value: c.slug, label: c.name }))}
              onChange={setCat}
              searchable={false}
            />
          </div>
        )}
      </div>

      {/* ---------- Grid ---------- */}
      {list.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-[26px] bg-surface-lav px-6 py-20 text-center">
          <CalendarX className="h-8 w-8 text-brand-purple" />
          <p className="text-sm text-gray-600">
            No {tab} events{cat ? " in this category" : ""} right now. Please check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
