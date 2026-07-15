/**
 * Events data layer.
 *
 * Wraps the Madhavbaug events REST API. Each event carries a category
 * (Clinic / Corporate), a DD/MM/YYYY date, time, location, an information
 * blurb and an "ideal for" list. The API has no per-event slug, so we derive
 * one from the title for clean detail-page URLs. Fetches run server-side.
 *
 * Endpoints:
 *   GET /events                       -> all events (past + upcoming)
 *   GET /upcoming/events              -> upcoming only
 *   GET /events/category/<slug>       -> by category (clinic | corporate)
 */

const BASE = "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://madhavbaug.hclient.in/",
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&#038;": "&",
  "&#38;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&#8217;": "’",
  "&#8211;": "-",
  "&#8212;": "-",
  "&nbsp;": " ",
};

function decodeEntities(input = ""): string {
  return input.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ParsedDate = { ts: number; label: string; day: string; mon: string; year: string; weekday: string } | null;

function parseDate(raw = ""): ParsedDate {
  const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const d = Number(m[1]);
  const mo = Number(m[2]);
  const y = Number(m[3]);
  const dt = new Date(y, mo - 1, d);
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    ts: dt.getTime(),
    label: `${d} ${MONTHS[mo - 1]} ${y}`,
    day: String(d).padStart(2, "0"),
    mon: MONTHS[mo - 1] ?? "",
    year: String(y),
    weekday: weekdays[dt.getDay()] ?? "",
  };
}

/* ------------------------------------------------------------------ types */

export type EventTerm = { id: number; name: string; slug: string };

export type MbEvent = {
  title: string;
  slug: string;
  categories: EventTerm[];
  information: string;
  idealFor: string[];
  /** Raw DD/MM/YYYY plus friendly derived parts. */
  dateRaw: string;
  dateLabel: string;
  day: string;
  mon: string;
  year: string;
  weekday: string;
  timestamp: number;
  time: string;
  location: string;
  image: string;
  isUpcoming: boolean;
};

/* ---------------------------------------------------------------- raw shape */

type RawTerm = { id: number; name: string; slug: string };

type RawEvent = {
  title: string;
  categories?: RawTerm[];
  event_information?: string;
  event_ideal_for?: string;
  event_date?: string;
  event_time?: string;
  event_location?: string;
  featured_image?: string;
};

/* ---------------------------------------------------------------- normalise */

function normEvent(raw: RawEvent, todayTs: number): MbEvent {
  const title = decodeEntities(raw.title || "");
  const parsed = parseDate(raw.event_date || "");
  const idealFor = decodeEntities(raw.event_ideal_for || "")
    .split(/[·|]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    title,
    slug: slugify(title),
    categories: (raw.categories ?? []).map((t) => ({ id: t.id, name: decodeEntities(t.name), slug: t.slug })),
    information: decodeEntities(raw.event_information || "").trim(),
    idealFor,
    dateRaw: raw.event_date || "",
    dateLabel: parsed?.label ?? raw.event_date ?? "",
    day: parsed?.day ?? "",
    mon: parsed?.mon ?? "",
    year: parsed?.year ?? "",
    weekday: parsed?.weekday ?? "",
    timestamp: parsed?.ts ?? 0,
    time: decodeEntities(raw.event_time || ""),
    location: decodeEntities(raw.event_location || ""),
    image: raw.featured_image || "",
    isUpcoming: parsed ? parsed.ts >= todayTs : false,
  };
}

function startOfToday(): number {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
}

/* ---------------------------------------------------------------- fetchers */

async function fetchRaw(url: string): Promise<RawEvent[]> {
  const res = await fetch(url, { headers: FETCH_HEADERS, next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Events returned ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

/** All events (past + upcoming), each flagged with `isUpcoming`. */
export async function fetchEvents(): Promise<MbEvent[]> {
  const today = startOfToday();
  const raws = await fetchRaw(`${BASE}/events`);
  return raws.map((r) => normEvent(r, today));
}

/** One event by derived slug (matched against the full list). */
export async function fetchEventBySlug(slug: string): Promise<MbEvent | null> {
  const all = await fetchEvents();
  return all.find((e) => e.slug === slug) ?? null;
}

/** Distinct categories across a set of events (for the filter bar). */
export function collectEventCategories(events: MbEvent[]): EventTerm[] {
  const map = new Map<string, EventTerm>();
  for (const e of events) {
    for (const c of e.categories) if (!map.has(c.slug)) map.set(c.slug, c);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
