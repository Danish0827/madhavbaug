/**
 * Hospital detail data layer. Fetches a single hospital by slug from the
 * WordPress REST API and exposes the deeply-nested ACF payload as typed data.
 * Rich-text fields (`*_description`, `*_information`, `*_details`) are trusted
 * CMS HTML and rendered as-is; short display titles are entity-decoded.
 */

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&#038;": "&",
  "&#38;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8211;": "-",
  "&#8212;": "-",
  "&#8230;": "…",
  "&nbsp;": " ",
};

export function decodeEntities(input = ""): string {
  return input.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m).trim();
}

export type Img = { url: string; alt?: string; title?: string };
export type CmsLink = { title: string; url: string; target?: string };

export type HospitalTreatment = {
  treatment_name: string;
  treatment_information: string;
  treatment_image?: Img;
};

export type HospitalPillar = { pillar_information: string };
export type HospitalProgram = { program_details: string };
export type HospitalStory = {
  name: string;
  location: string;
  condition_name: string;
  thumbnail?: Img;
  youtube_link?: string;
};
export type HospitalService = {
  service_image?: Img;
  service_name: string;
  service_short_description: string;
  learn_more?: CmsLink;
};

export type Hospital = {
  id: number;
  title: string;
  slug: string;
  banner: {
    image?: Img;
    heading: string;
    shortDescription: string;
    bottomTitle: string;
    button?: CmsLink;
  };
  about: {
    title: string;
    mainTitle: string;
    html: string;
    button?: CmsLink;
  };
  treatments: {
    mainTitle: string;
    items: HospitalTreatment[];
  };
  pillars: {
    title: string;
    mainTitle: string;
    shortDescription: string;
    items: HospitalPillar[];
  };
  programs: {
    title: string;
    mainTitle: string;
    items: HospitalProgram[];
  };
  team: {
    title: string;
    mainTitle: string;
    image?: Img;
    html: string;
    noteLabel: string;
    noteDetails: string;
  };
  stories: {
    title: string;
    mainTitle: string;
    items: HospitalStory[];
  };
  amenities: {
    title: string;
    mainTitle: string;
    html: string;
    button?: CmsLink;
    slider: Img[];
  };
  services: {
    title: string;
    mainTitle: string;
    items: HospitalService[];
  };
  research: {
    image?: Img;
    title: string;
    description: string;
    button?: CmsLink;
  };
};

const BASE = "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://madhavbaug.hclient.in/",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function img(o: any): Img | undefined {
  return o?.url ? { url: o.url, alt: o.alt ?? "", title: o.title ?? "" } : undefined;
}
function link(o: any): CmsLink | undefined {
  return o?.title || o?.url ? { title: decodeEntities(o.title ?? ""), url: o.url || "#", target: o.target } : undefined;
}

/** Fetch a hospital's full detail by slug (GET /hospitals/<slug>). */
export async function fetchHospitalBySlug(slug: string): Promise<Hospital | null> {
  const res = await fetch(`${BASE}/hospitals/${encodeURIComponent(slug)}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);

  const d: any = await res.json();
  if (!d?.id) return null;

  const b = d.banner_section ?? {};
  const ab = d.about_section ?? {};
  const tr = d.treatments_section ?? {};
  const pi = d.pillars_section ?? {};
  const pr = d.programs_section ?? {};
  const tm = d.team_section ?? {};
  const ss = d.success_stories_section ?? {};
  const am = d.amenities_section ?? {};
  const sv = d.services_section ?? {};
  const rb = d.research_backed_section ?? {};

  return {
    id: d.id,
    title: decodeEntities(d.title ?? ""),
    slug: d.slug,
    banner: {
      image: img(b.banner_image),
      heading: decodeEntities(b.banner_heading ?? ""),
      shortDescription: decodeEntities(b.banner_short_description ?? ""),
      bottomTitle: decodeEntities(b.banner_bottom_title ?? ""),
      button: link(b.book_an_appointment),
    },
    about: {
      title: decodeEntities(ab.about_title ?? "About"),
      mainTitle: decodeEntities(ab.about_main_title ?? ""),
      html: ab.about_short_description ?? "",
      button: link(ab.about_button),
    },
    treatments: {
      mainTitle: decodeEntities(tr.treatments_main_title ?? ""),
      items: (tr.treatments ?? []).map((t: any) => ({
        treatment_name: decodeEntities(t.treatment_name ?? ""),
        treatment_information: t.treatment_information ?? "",
        treatment_image: img(t.treatment_image),
      })),
    },
    pillars: {
      title: decodeEntities(pi.pillar_title ?? ""),
      mainTitle: decodeEntities(pi.pillar_main_title ?? ""),
      shortDescription: decodeEntities(pi.pillar_short_description ?? ""),
      items: (pi.pillars ?? []).map((p: any) => ({ pillar_information: p.pillar_information ?? "" })),
    },
    programs: {
      title: decodeEntities(pr.programs_title ?? ""),
      mainTitle: decodeEntities(pr.programs_main_title ?? ""),
      items: (pr.programs ?? []).map((p: any) => ({ program_details: p.program_details ?? "" })),
    },
    team: {
      title: decodeEntities(tm.team_title ?? ""),
      mainTitle: decodeEntities(tm.team_main_title ?? ""),
      image: img(tm.team_image),
      html: tm.team_details ?? "",
      noteLabel: decodeEntities(tm.please_note_text ?? ""),
      noteDetails: decodeEntities(tm.note_details ?? ""),
    },
    stories: {
      title: decodeEntities(ss.success_stories_title ?? ""),
      mainTitle: decodeEntities(ss.success_stories_main_title ?? ""),
      items: (ss.stories ?? []).map((s: any) => ({
        name: decodeEntities(s.name ?? ""),
        location: decodeEntities(s.location ?? ""),
        condition_name: decodeEntities(s.condition_name ?? ""),
        thumbnail: img(s.thumbnail),
        youtube_link: s.youtube_link || "#",
      })),
    },
    amenities: {
      title: decodeEntities(am.amenities_title ?? ""),
      mainTitle: decodeEntities(am.amenities_main_title ?? ""),
      html: am.amenities_description ?? "",
      button: link(am.amenities_book_button),
      slider: (am.facilities_slider ?? []).map((s: any) => img(s.slider_image)).filter(Boolean) as Img[],
    },
    services: {
      title: decodeEntities(sv.service_title ?? ""),
      mainTitle: decodeEntities(sv.service_main_title ?? ""),
      items: (sv.services ?? []).map((s: any) => ({
        service_image: img(s.service_image),
        service_name: decodeEntities(s.service_name ?? ""),
        service_short_description: decodeEntities(s.service_short_description ?? ""),
        learn_more: link(s.learn_more),
      })),
    },
    research: {
      image: img(rb.research_backed_image),
      title: decodeEntities(rb.research_backed_title ?? ""),
      description: decodeEntities(rb.research_backed_description ?? ""),
      button: link(rb.explore_button),
    },
  };
}
