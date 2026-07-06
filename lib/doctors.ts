/**
 * Doctors data layer. Normalises the upstream WordPress REST response
 * (GET /wp-json/madhavbaug/v1/doctors) into a clean, typed shape and maps the
 * upstream pagination fields onto the same `Pagination` contract the clinic
 * locator already uses.
 */

export type DoctorLocation = { id: number; name: string; slug: string };

export type Doctor = {
  id: number;
  name: string;
  slug: string;
  url: string;
  image: string;
  designation: string;
  locations: DoctorLocation[];
};

export type DoctorsPagination = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_more: boolean;
};

export type DoctorsPage = {
  doctors: Doctor[];
  pagination: DoctorsPagination;
};

export type DoctorQuery = {
  state?: string;
  city?: string;
  search?: string;
  page?: number;
  per_page?: number;
};

type RawDoctor = {
  id: number;
  title: string;
  slug: string;
  url?: string;
  image?: string;
  designation?: string;
  doctor_location?: { id: number; name: string; slug: string; url?: string }[];
  doctors_information?: { add_title?: string; add_description?: string }[];
  select_clinic?: { id: number; title: string; slug: string; url?: string; image?: string }[];
};

/** A titled info block on the doctor detail page (body is trusted CMS HTML). */
export type DoctorInfoSection = { title: string; html: string };

export type DoctorClinicRef = { id: number; title: string; slug: string; url: string };

export type DoctorDetail = Doctor & {
  information: DoctorInfoSection[];
  clinic: DoctorClinicRef | null;
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

function decode(input = ""): string {
  return input.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m).trim();
}

function normalise(raw: RawDoctor): Doctor {
  return {
    id: raw.id,
    name: decode(raw.title),
    slug: raw.slug,
    url: raw.url ?? "",
    image: raw.image ?? "",
    designation: decode(raw.designation ?? ""),
    locations: (raw.doctor_location ?? []).map((l) => ({
      id: l.id,
      name: decode(l.name),
      slug: l.slug,
    })),
  };
}

const BASE = "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1";
const UPSTREAM = `${BASE}/doctors`;

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://madhavbaug.hclient.in/",
};

/** Fetch a single filtered + paginated page of doctors (server-side only). */
export async function fetchDoctorsPage(query: DoctorQuery): Promise<DoctorsPage> {
  const sp = new URLSearchParams();
  if (query.state) sp.set("state", query.state);
  if (query.city) sp.set("city", query.city);
  if (query.search) sp.set("search", query.search);
  sp.set("page", String(query.page ?? 1));
  sp.set("per_page", String(query.per_page ?? 12));

  const res = await fetch(`${UPSTREAM}?${sp.toString()}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);

  const json: {
    doctors?: RawDoctor[];
    pagination?: {
      total?: number;
      per_page?: number;
      current_page?: number;
      total_pages?: number;
      has_next?: boolean;
    };
  } = await res.json();

  const doctors = (json.doctors ?? []).map(normalise);
  const p = json.pagination ?? {};
  return {
    doctors,
    pagination: {
      page: p.current_page ?? query.page ?? 1,
      per_page: p.per_page ?? query.per_page ?? 12,
      total: p.total ?? doctors.length,
      total_pages: p.total_pages ?? 1,
      has_more: p.has_next ?? false,
    },
  };
}

/** Fetch one doctor's full detail by slug (GET /doctors/<slug>). */
export async function fetchDoctorBySlug(slug: string): Promise<DoctorDetail | null> {
  const res = await fetch(`${UPSTREAM}/${encodeURIComponent(slug)}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);

  const raw: RawDoctor = await res.json();
  if (!raw?.id) return null;

  const base = normalise(raw);
  const information: DoctorInfoSection[] = (raw.doctors_information ?? [])
    .map((s) => ({ title: decode(s.add_title ?? ""), html: (s.add_description ?? "").trim() }))
    .filter((s) => s.title || s.html);

  const c = raw.select_clinic?.[0];
  const clinic: DoctorClinicRef | null = c
    ? { id: c.id, title: decode(c.title), slug: c.slug, url: c.url ?? "" }
    : null;

  return { ...base, information, clinic };
}
