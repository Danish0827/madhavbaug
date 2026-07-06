"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Phone,
  Navigation,
  Search,
  Loader2,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { Clinic, ClinicsPage, GeoTerm, Pagination } from "@/lib/clinics";
import ClinicLocatorMap from "./clinic/ClinicLocatorMap";
import SearchSelect from "./ui/SearchSelect";

const PER_PAGE = 10;

export default function ClinicLocator() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [states, setStates] = useState<GeoTerm[]>([]);
  const [cities, setCities] = useState<GeoTerm[]>([]);
  const [stateSlug, setStateSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ---- Load states once ---- */
  useEffect(() => {
    fetch("/api/clinics/states", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { states: [] }))
      .then((d: { states?: GeoTerm[] }) => setStates(d.states ?? []))
      .catch(() => setStates([]));
  }, []);

  /* ---- Deep-link: pre-select state/city from URL (?state=&city=) ---- */
  const pendingRef = useRef<{ state: string; city: string } | null>(null);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    let s = (p.get("state") ?? "").trim();
    let c = (p.get("city") ?? "").trim();
    if (s.includes("/city=")) {
      const [a, b] = s.split("/city=");
      s = a.trim();
      c = (c || b).trim();
    }
    pendingRef.current = s || c ? { state: s, city: c } : null;
  }, []);

  /* ---- Load cities whenever the state changes ---- */
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

  /* ---- Resolve deep-link once states/cities are available ---- */
  useEffect(() => {
    const p = pendingRef.current;
    if (!p) return;
    if (p.state && !stateSlug && states.length) {
      const m = states.find(
        (s) =>
          s.slug.toLowerCase() === p.state.toLowerCase() ||
          s.name.toLowerCase() === p.state.toLowerCase()
      );
      if (m) setStateSlug(m.slug);
    }
    if (p.city && cities.length) {
      const m = cities.find(
        (c) =>
          c.slug.toLowerCase() === p.city.toLowerCase() ||
          c.name.toLowerCase() === p.city.toLowerCase()
      );
      if (m) setCitySlug(m.slug);
      pendingRef.current = null;
    }
  }, [states, cities, stateSlug]);

  /* ---- Debounce the search box ---- */
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchQuery((prev) => {
        const next = searchInput.trim();
        if (next !== prev) setPage(1);
        return next;
      });
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  /* ---- Fetch clinics (server-side filter + pagination) ---- */
  useEffect(() => {
    const ctrl = new AbortController();
    setStatus("loading");
    const sp = new URLSearchParams();
    if (stateSlug) sp.set("state", stateSlug);
    if (citySlug) sp.set("city", citySlug);
    if (searchQuery) sp.set("search", searchQuery);
    sp.set("page", String(page));
    sp.set("per_page", String(PER_PAGE));

    fetch(`/api/clinics?${sp.toString()}`, { cache: "no-store", signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: ClinicsPage) => {
        setClinics(data.clinics);
        setPagination(data.pagination);
        setActiveId("");
        setStatus("ready");
        listRef.current?.scrollTo({ top: 0 });
      })
      .catch((e) => {
        if (!ctrl.signal.aborted && (e as Error).name !== "AbortError") setStatus("error");
      });
    return () => ctrl.abort();
  }, [stateSlug, citySlug, searchQuery, page]);
  const clearAll = () => {
    setStateSlug("");
    setCitySlug("");
    setSearchInput("");
    setSearchQuery("");
    setPage(1);
    setActiveId("");
  };
  const hasFilters = !!(stateSlug || citySlug || searchQuery);
  const total = pagination?.total ?? 0;
  const totalPages = pagination?.total_pages ?? 1;
  const rangeLabel = useMemo(() => {
    if (!pagination || total === 0) return "";
    const start = (pagination.page - 1) * pagination.per_page + 1;
    const end = Math.min(pagination.page * pagination.per_page, total);
    return `Showing ${start}-${end} of ${total} centre${total === 1 ? "" : "s"}`;
  }, [pagination, total]);

  return (
    <section className="bg-white px-5 pt-24 pb-12 sm:px-8 lg:px-10 lg:pt-28">
      <div className="mx-auto w-full container">
        {/* ---------- Filter bar ---------- */}
        <div className="rounded-3xl bg-[#006589]/10 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 lg:rounded-full lg:p-3 lg:pl-4">
          <div className="grid gap-3 lg:grid-cols-[auto_1fr_1fr_1.2fr] lg:items-center">
            <span className="text-center px-6 text-[#006589] font-semibold">Locate Your Nearest Clinic:</span>
            <SearchSelect
              label="Select State"
              required
              icon={<MapPin className="h-4 w-4" />}
              value={stateSlug}
              options={states.map((s) => ({ value: s.slug, label: s.name }))}
              disabled={!states.length}
              onChange={(v) => {
                setStateSlug(v);
                setCitySlug("");
                setPage(1);
                setActiveId("");
              }}
            />
            <SearchSelect
              label="Select City"
              icon={<Building2 className="h-4 w-4" />}
              value={citySlug}
              options={cities.map((c) => ({ value: c.slug, label: c.name }))}
              disabled={!stateSlug || !cities.length}
              onChange={(v) => {
                setCitySlug(v);
                setPage(1);
                setActiveId("");
              }}
            />
            {/* Debounced search box */}
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search clinic, area or city..."
                className="h-[45px] w-full rounded-full border border-gray-200 bg-white pl-11 pr-9 text-sm text-gray-700 shadow-sm outline-none transition-colors placeholder:text-gray-400 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
              />
              {searchInput && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* ---------- Result summary ---------- */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            {status === "loading" ? "Searching centres..." : rangeLabel || "No centres found"}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple hover:underline"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>
        {/* ---------- Map + clinic list ---------- */}
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,400px)_1fr] xl:grid-cols-[minmax(0,500px)_1fr] 2xl:grid-cols-[minmax(0,600px)_1fr] lg:gap-5 xl:gap-8">
          {/* Map (sticky) */}
          <div className="h-[300px] lg:sticky lg:top-30 lg:h-[80vh]">
            <div className="relative z-0 h-full overflow-hidden rounded-[30px] ring-1 ring-black/5 [isolation:isolate]">
              <ClinicLocatorMap clinics={clinics} activeId={activeId} />
            </div>
          </div>

          {/* Clinic cards + pagination */}
          <div className="flex flex-col ">
            <div
              ref={listRef}
              className="thin-scroll flex flex-1 flex-col gap-4 lg:overflow-y-auto lg:p-2"
            >
              {status === "loading" && <ListState icon="loading" message="Loading clinics & hospitals..." />}
              {status === "error" && (
                <ListState
                  icon="error"
                  message="We couldn't load the centres right now. Please try again."
                />
              )}
              {status === "ready" && clinics.length === 0 && (
                <ListState
                  icon="empty"
                  message="No centres match your search. Try a different state, city or keyword."
                />
              )}
              {status === "ready" &&
                clinics.map((clinic) => (
                  <ClinicCard
                    key={clinic.id}
                    clinic={clinic}
                    active={activeId === String(clinic.id)}
                    onHover={() => setActiveId(String(clinic.id))}
                    onOpen={() => router.push(`/clinic-hospital-locator/${clinic.slug}`)}
                  />
                ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  disabled={page <= 1 || status === "loading"}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-purple hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <span className="text-sm text-gray-600">
                  Page {pagination?.page ?? page} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={!pagination?.has_more || status === "loading"}
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-purple hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function ClinicCard({
  clinic,
  active,
  onHover,
  onOpen,
}: {
  clinic: Clinic;
  active: boolean;
  onHover: () => void;
  onOpen: () => void;
}) {
  return (
    <article
      onClick={onOpen}
      onMouseEnter={onHover}
      className={`flex min-h-[173px] cursor-pointer flex-col rounded-[30px] p-6 transition-shadow hover:shadow-md ${
        active ? "ring-2 ring-brand-purple/60" : ""
      }`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(111,88,165,0.1) 0%, rgba(137,47,172,0.1) 100%), linear-gradient(90deg, #ffffff 0%, #ffffff 100%)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl leading-snug text-transparent">
          {clinic.title}
        </h3>
        <a
          href={clinic.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex shrink-0 items-center gap-1 whitespace-nowrap pt-1 text-xs font-medium"
        >
          <Navigation className="h-4 w-4 text-teal-deep" />
          <span className="bg-gradient-to-r from-teal-deep to-indigo-deep bg-clip-text text-transparent">
            Directions
          </span>
        </a>
      </div>

      <p className="mt-2 text-sm font-light leading-relaxed text-black/90">
        {clinic.address}
      </p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-4 text-sm text-black/80">
        {clinic.timing && (
          <span className="flex items-center gap-2">
            <Clock className="h-[18px] w-[18px] text-brand-purple" />
            {clinic.timing}
          </span>
        )}
        {clinic.phone && (
          <a
            href={`tel:${clinic.phoneRaw}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:text-brand-purple"
          >
            <Phone className="h-4 w-4 text-brand-purple" />
            {clinic.phone}
          </a>
        )}
      </div>
    </article>
  );
}

function ListState({
  icon,
  message,
}: {
  icon: "loading" | "error" | "empty";
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[30px] bg-surface-lav px-6 py-16 text-center text-sm text-gray-600">
      {icon === "loading" ? (
        <Loader2 className="h-7 w-7 animate-spin text-brand-purple" />
      ) : (
        <MapPin className="h-7 w-7 text-brand-purple" />
      )}
      {message}
    </div>
  );
}
