/**
 * Clinic locator data layer.
 *
 * The upstream WordPress REST API returns each clinic's fields as raw HTML
 * snippets (phone numbers wrapped in <a>, timings with <br>, etc.). These
 * helpers normalise that mess into a clean, typed `Clinic` shape that the UI
 * can render directly. Parsing happens server-side in the API route so the
 * browser never sees the raw HTML.
 */

import coordsData from "@/data/clinic-coords.json";

/** Pre-geocoded clinic coordinates, keyed by clinic id. */
const COORDS = coordsData as Record<string, { lat: number; lng: number }>;

export type Clinic = {
  id: number;
  title: string;
  slug: string;
  link: string;
  /** Derived from the title — "Heart Hospital in <City>, <State>". */
  city: string;
  state: string;
  /** A short landmark/locality (first segment of the address). */
  locality: string;
  address: string;
  timing: string;
  /** Human-readable phone, e.g. "+91 9981444938". */
  phone: string;
  /** Digits only, for the tel: link. */
  phoneRaw: string;
  /** Digits only, for the WhatsApp link. */
  whatsapp: string;
  /** Doctor / display name, e.g. "Dr. Varsha Deshmukh". */
  doctor: string;
  bookAppointment: string;
  directionsUrl: string;
  /** Plain-text query used for geocoding / directions. */
  geoQuery: string;
  /** Pre-geocoded map coordinates (null if not located). */
  lat: number | null;
  lng: number | null;
};

/** A state or city taxonomy term from the /states and /cities endpoints. */
export type GeoTerm = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

/** Shape of a single clinic record from the upstream API. */
type RawClinic = {
  id: number;
  title: string;
  slug: string;
  link: string;
  acf?: Record<string, string | undefined>;
};

export type ClinicStat = { value: string; label: string };

/** A single clinic's full detail (extends the card data with stats + media). */
export type ClinicDetail = Clinic & {
  stats: ClinicStat[];
  whatsappUrl: string;
  clinicVideo: string;
};

export type Pagination = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_more: boolean;
};

export type ClinicsPage = {
  clinics: Clinic[];
  pagination: Pagination;
};

export type ClinicQuery = {
  state?: string;
  city?: string;
  search?: string;
  page?: number;
  per_page?: number;
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
  "&lt;": "<",
  "&gt;": ">",
};

function decodeEntities(input: string): string {
  return input.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}

/** Strip every HTML tag and collapse whitespace. */
function stripTags(html = ""): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** Pull the display text + tel target out of the telephone_number HTML. */
function parsePhone(html = ""): { phone: string; phoneRaw: string } {
  const href = html.match(/tel:([+\d\s-]+)/i)?.[1] ?? "";
  const phone = stripTags(html);
  return { phone, phoneRaw: href.replace(/[\s-]/g, "") };
}

/** Pull the digits out of the whatsapp_number HTML (phone=919...). */
function parseWhatsApp(html = ""): string {
  return html.match(/phone=(\d+)/i)?.[1] ?? "";
}

/** Timing arrives as "10:00 AM TO 7:00 PM <br> THURSDAY CLOSED". */
function parseTiming(html = ""): string {
  const text = stripTags(html.replace(/<br\s*\/?>/gi, ", "));
  return text.replace(/\s*,\s*/g, ", ").replace(/,\s*$/, "");
}

/** "Heart Hospital in Bhilai-Durg, Chhattisgarh" -> { city, state }. */
function parseLocation(title: string): { city: string; state: string } {
  const after = title.split(/\bin\b/i).slice(1).join("in").trim();
  const loc = after || title;
  const parts = loc.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { city: parts.slice(0, -1).join(", "), state: parts[parts.length - 1] };
  }
  return { city: loc, state: loc };
}

function normalise(raw: RawClinic): Clinic {
  const acf = raw.acf ?? {};
  const title = decodeEntities(raw.title);
  const { city, state } = parseLocation(title);
  const { phone, phoneRaw } = parsePhone(acf.telephone_number);
  const address = stripTags(acf.address);
  const locality = address.split(",")[0]?.trim() || city;
  const directionsQuery = stripTags(acf.google_location) || address || title;

  return {
    id: raw.id,
    title,
    slug: raw.slug,
    link: raw.link,
    city,
    state,
    locality,
    address,
    timing: parseTiming(acf.timing),
    phone,
    phoneRaw,
    whatsapp: parseWhatsApp(acf.whatsapp_number),
    doctor: stripTags(acf.website_display_text),
    bookAppointment: acf.book_appointment ?? "",
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      directionsQuery
    )}`,
    geoQuery: directionsQuery,
    lat: COORDS[String(raw.id)]?.lat ?? null,
    lng: COORDS[String(raw.id)]?.lng ?? null,
  };
}

const BASE = "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1";
const UPSTREAM = `${BASE}/clinics`;

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://madhavbaug.hclient.in/",
};

/**
 * Fetch a single filtered + paginated page of clinics. The upstream supports
 * server-side filtering by state, city (id or slug) and free-text search.
 * Runs server-side only (called from the API route).
 */
export async function fetchClinicsPage(query: ClinicQuery): Promise<ClinicsPage> {
  const sp = new URLSearchParams();
  if (query.state) sp.set("state", query.state);
  if (query.city) sp.set("city", query.city);
  if (query.search) sp.set("search", query.search);
  sp.set("page", String(query.page ?? 1));
  sp.set("per_page", String(query.per_page ?? 10));

  const res = await fetch(`${UPSTREAM}?${sp.toString()}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);

  const json: {
    data?: RawClinic[];
    pagination?: Partial<Pagination>;
  } = await res.json();

  const clinics = (json.data ?? []).map(normalise);
  const p = json.pagination ?? {};
  return {
    clinics,
    pagination: {
      page: p.page ?? query.page ?? 1,
      per_page: p.per_page ?? query.per_page ?? 10,
      total: p.total ?? clinics.length,
      total_pages: p.total_pages ?? 1,
      has_more: p.has_more ?? false,
    },
  };
}

/** "<span>9600+</span> Consultation Done" -> { value: "9600+", label: "Consultation Done" }. */
function parseStat(html?: string): ClinicStat | null {
  const text = stripTags(html);
  if (!text) return null;
  const m = text.match(/^(\S+)\s+(.*)$/);
  return m ? { value: m[1], label: m[2] } : { value: text, label: "" };
}

/** Fetch one clinic's full detail by slug (GET /clinic/<slug>). */
export async function fetchClinicBySlug(slug: string): Promise<ClinicDetail | null> {
  const res = await fetch(`${BASE}/clinics/single/${encodeURIComponent(slug)}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  console.log(res);
  
  if (res.status === 200) return res.json();
  // if (res.status === 404) return null;

  // if (!res.ok) throw new Error(`Upstream returned ${res.status}`);

  // const raw: RawClinic = await res.json();
  // if (!raw?.id) return null;

  // const base = normalise(raw);
  // const acf = raw.acf ?? {};
  // const stats = [
  //   parseStat(acf.consultation_done),
  //   parseStat(acf.years_of_experience),
  //   parseStat(acf.heart_disease_patients_treated),
  //   parseStat(acf.diabetes_patients_treated),
  // ].filter((s): s is ClinicStat => s !== null);

  // return res
}

function toTerm(t: { id: number; name: string; slug: string; count?: number }): GeoTerm {
  return { id: t.id, name: decodeEntities(t.name), slug: t.slug, count: t.count ?? 0 };
}

/** All states for the State dropdown (GET /states). */
export async function fetchStates(): Promise<GeoTerm[]> {
  const res = await fetch(`${BASE}/states`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`States returned ${res.status}`);
  const json: { data?: { id: number; name: string; slug: string; count?: number }[] } =
    await res.json();
  return (json.data ?? []).map(toTerm).sort((a, b) => a.name.localeCompare(b.name));
}

/** Cities within a state for the City dropdown (GET /cities?state=<id|slug>). */
export async function fetchCities(state: string): Promise<GeoTerm[]> {
  const res = await fetch(`${BASE}/cities?state=${encodeURIComponent(state)}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Cities returned ${res.status}`);
  const json: { data?: { id: number; name: string; slug: string; count?: number }[] } =
    await res.json();
  return (json.data ?? []).map(toTerm).sort((a, b) => a.name.localeCompare(b.name));
}
