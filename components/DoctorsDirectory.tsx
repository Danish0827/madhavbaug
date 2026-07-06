"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  X,
  Loader2,
  UserRound,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Doctor, DoctorsPage, DoctorsPagination } from "@/lib/doctors";
import type { GeoTerm } from "@/lib/clinics";
import SearchSelect from "./ui/SearchSelect";
import DoctorSearchSelect from "./DoctorSearchSelect";

const PER_PAGE = 12;

export default function DoctorsDirectory() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pagination, setPagination] = useState<DoctorsPagination | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [states, setStates] = useState<GeoTerm[]>([]);
  const [cities, setCities] = useState<GeoTerm[]>([]);
  const [stateSlug, setStateSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  /* ---- Load states once (shared clinic taxonomy) ---- */
  useEffect(() => {
    fetch("/api/clinics/states", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { states: [] }))
      .then((d: { states?: GeoTerm[] }) => setStates(d.states ?? []))
      .catch(() => setStates([]));
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

  /* ---- Debounce the doctor-name search -> triggers the API fetch ---- */
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

  /* ---- Fetch doctors (server-side filter + pagination) ---- */
  useEffect(() => {
    const ctrl = new AbortController();
    setStatus("loading");
    const sp = new URLSearchParams();
    if (stateSlug) sp.set("state", stateSlug);
    if (citySlug) sp.set("city", citySlug);
    if (searchQuery) sp.set("search", searchQuery);
    sp.set("page", String(page));
    sp.set("per_page", String(PER_PAGE));

    fetch(`/api/doctors?${sp.toString()}`, { cache: "no-store", signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: DoctorsPage) => {
        setDoctors(data.doctors);
        setPagination(data.pagination);
        setStatus("ready");
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
  };

  const hasFilters = !!(stateSlug || citySlug || searchQuery);
  const total = pagination?.total ?? 0;
  const totalPages = pagination?.total_pages ?? 1;
  const currentPage = pagination?.page ?? page;

  const countLabel = useMemo(() => {
    if (status === "loading") return "Loading doctors...";
    if (total === 0) return "No doctors found";
    return `Displaying ${doctors.length} of ${total} doctor${total === 1 ? "" : "s"}`;
  }, [status, total, doctors.length]);

  const goTo = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="px-5 py-10 sm:px-8 lg:px-20 lg:py-14">
      <div ref={topRef} className="mx-auto w-full container">
        {/* ---------- Filter bar ---------- */}
        <div className="rounded-3xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 lg:rounded-full lg:p-3 lg:pl-6">
          <div className="grid gap-3 lg:grid-cols-[auto_1fr_1fr_1fr] lg:items-center">
            <span className="px-2 text-center font-semibold text-brand-purple">Filter by Location:</span>
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
              }}
            />
            {/* Doctor-name search dropdown (debounced -> hits the API) */}
            <DoctorSearchSelect
              input={searchInput}
              onInput={setSearchInput}
              selected={searchQuery}
              suggestions={doctors.map((d) => d.name)}
              loading={status === "loading" && searchInput.trim().length > 0}
              onSelect={(n) => {
                setSearchInput(n);
                setSearchQuery(n);
                setPage(1);
              }}
              onClear={() => {
                setSearchInput("");
                setSearchQuery("");
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* ---------- Result summary ---------- */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {hasFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple hover:underline"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          ) : (
            <span />
          )}
          <p className="text-sm text-gray-600">{countLabel}</p>
        </div>

        {/* ---------- Doctor grid ---------- */}
        <div className="mt-6">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-[30px] bg-surface-lav px-6 py-20 text-center text-sm text-gray-600">
              <Loader2 className="h-7 w-7 animate-spin text-brand-purple" />
              Loading doctors...
            </div>
          )}
          {status === "error" && (
            <div className="rounded-[30px] bg-surface-lav px-6 py-20 text-center text-sm text-gray-600">
              We couldn&apos;t load the doctors right now. Please try again.
            </div>
          )}
          {status === "ready" && doctors.length === 0 && (
            <div className="rounded-[30px] bg-surface-lav px-6 py-20 text-center text-sm text-gray-600">
              No doctors match your search. Try a different state, city or name.
            </div>
          )}
          {status === "ready" && doctors.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          )}
        </div>

        {/* ---------- Pagination ---------- */}
        {status === "ready" && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <PagerBtn label="First" onClick={() => goTo(1)} disabled={currentPage <= 1}>
              <ChevronsLeft className="h-4 w-4" />
            </PagerBtn>
            <PagerBtn label="Previous" onClick={() => goTo(currentPage - 1)} disabled={currentPage <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </PagerBtn>
            <span className="mx-2 min-w-[92px] text-center text-sm font-medium text-ink">
              {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </span>
            <PagerBtn
              label="Next"
              onClick={() => goTo(currentPage + 1)}
              disabled={!pagination?.has_more && currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </PagerBtn>
            <PagerBtn label="Last" onClick={() => goTo(totalPages)} disabled={currentPage >= totalPages}>
              <ChevronsRight className="h-4 w-4" />
            </PagerBtn>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      href={`/our-doctors/${doctor.slug}`}
      className="group flex flex-col overflow-hidden rounded-[24px] bg-surface-lav shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
    >
      <div className="relative flex h-72 w-full items-end justify-center overflow-hidden">
        {doctor.image ? (
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#efe7fb] to-[#e3d3f2] text-brand-purple/40">
            <UserRound className="h-20 w-20" />
          </div>
        )}
      </div>
      <div className="bg-white p-5">
        <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-brand-purple">
          {doctor.name}
        </h3>
        <p className="mt-1 text-sm text-teal-deep">{doctor.designation || "Ayurvedic Physician"}</p>
      </div>
    </Link>
  );
}

function PagerBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-brand-purple hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
