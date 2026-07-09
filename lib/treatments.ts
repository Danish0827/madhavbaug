/**
 * Treatment (condition) detail data layer.
 * Maps the WordPress `/treatments/<slug>` payload into a clean, typed shape.
 */

const BASE = "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://madhavbaug.hclient.in/",
};

export type TImage = { url: string; alt: string };
export type TLink = { title: string; url: string };

export type Treatment = {
  id: number;
  title: string;
  slug: string;
  banner: {
    image: string;
    heading: string;
    cards: { number: string; heading: string }[];
  };
  overview: { eyebrow: string; title: string; description: string; button: TLink };
  conditions: {
    eyebrow: string;
    title: string;
    image: string;
    items: { title: string; description: string }[];
  };
  eligibility: { eyebrow: string; title: string; listHtml: string; image: string };
  approach: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; contentHtml: string }[];
  };
  journey: {
    eyebrow: string;
    title: string;
    steps: { time: string; heading: string; description: string; image: string }[];
  };
  tests: {
    eyebrow: string;
    title: string;
    cards: { image: string; name: string; description: string }[];
  };
  whyChoose: {
    eyebrow: string;
    title: string;
    cards: { title: string; description: string }[];
  };
  caseStudy: { eyebrow: string; title: string; description: string; image: string };
  research: {
    eyebrow: string;
    title: string;
    contentHtml: string;
    bookBtn: TLink;
    findBtn: TLink;
    disclaimer: string;
  };
  faqs: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  references: { eyebrow: string; contentHtml: string };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const img = (o: any): string => o?.url ?? "";
const link = (o: any): TLink => ({ title: o?.title ?? "", url: o?.url || "#" });
const clean = (s: any): string => (typeof s === "string" ? s.trim() : "");

function map(raw: any): Treatment {
  const b = raw.banner_section ?? {};
  const o = raw.overview_section ?? {};
  const c = raw.condition_section ?? {};
  const e = raw.eligibility_section ?? {};
  const a = raw.our_approach_section ?? {};
  const j = raw.patient_journey_section ?? {};
  const t = raw.our_tests_section ?? {};
  const w = raw.why_choose_us_section ?? {};
  const cs = raw.case_study_section ?? {};
  const r = raw.research_section ?? {};
  const f = raw.faq_section ?? {};
  const ref = raw.reference_section ?? {};

  return {
    id: raw.id,
    title: clean(raw.title),
    slug: raw.slug,
    banner: {
      image: img(b.banner_image),
      heading: clean(b.banner_heading),
      cards: (b.banner_bottom_cards ?? []).map((x: any) => ({
        number: clean(x.card_number),
        heading: clean(x.card_heading),
      })),
    },
    overview: {
      eyebrow: clean(o.overview_title) || "Overview",
      title: clean(o.overview_main_title),
      description: clean(o.overview_description),
      button: link(o.overview_button),
    },
    conditions: {
      eyebrow: clean(c.condition_title) || "Conditions",
      title: clean(c.condition_main_title),
      image: img(c.condition_image),
      items: (c.condition_accordian ?? []).map((x: any) => ({
        title: clean(x.accordian_title),
        description: clean(x.accordian_description),
      })),
    },
    eligibility: {
      eyebrow: clean(e.eligibility_title) || "Eligibility",
      title: clean(e.eligibility_main_title),
      listHtml: clean(e.eligibility_list),
      image: img(e.eligibility_sideimage),
    },
    approach: {
      eyebrow: clean(a.our_approach_title) || "Our Approach",
      title: clean(a.our_approach_main_title),
      description: clean(a.our_approach_description),
      items: (a.approach_lists ?? []).map((x: any) => ({
        title: clean(x.list_title),
        contentHtml: clean(x.approach_content),
      })),
    },
    journey: {
      eyebrow: clean(j.patient_journey_title) || "Patient Journey",
      title: clean(j.patient_journey_main_title),
      steps: (j.patient_journey ?? []).map((x: any) => ({
        time: clean(x.time),
        heading: clean(x.patient_journey_heading),
        description: clean(x.patient_journey_description),
        image: img(x.patient_journey_image),
      })),
    },
    tests: {
      eyebrow: clean(t.tests_title) || "Our Tests",
      title: clean(t.tests_main_title),
      cards: (t.test_cards ?? []).map((x: any) => ({
        image: img(x.test_image),
        name: clean(x.test_name),
        description: clean(x.test_description),
      })),
    },
    whyChoose: {
      eyebrow: clean(w.why_choose_us_title) || "Why Choose Us",
      title: clean(w.why_choose_us_main_title),
      cards: (w.why_choose_us_cards ?? []).map((x: any) => ({
        title: clean(x.card_title),
        description: clean(x.card_description),
      })),
    },
    caseStudy: {
      eyebrow: clean(cs.case_study_title) || "Case Study",
      title: clean(cs.case_study_main_title),
      description: clean(cs.case_study_description),
      image: img(cs.case_study_image),
    },
    research: {
      eyebrow: clean(r.research_title) || "Research Studies",
      title: clean(r.research_main_title),
      contentHtml: clean(r.research_description),
      bookBtn: link(r.book_your_consultation),
      findBtn: link(r.find_your_nearest_centre),
      disclaimer: clean(r.disclaimer),
    },
    faqs: {
      eyebrow: clean(f.faqs_title) || "FAQs",
      title: clean(f.faq_main_title),
      items: (f.faqs ?? []).map((x: any) => ({
        question: clean(x.add_question),
        answer: clean(x.add_answer),
      })),
    },
    references: {
      eyebrow: clean(ref.references_title) || "References",
      contentHtml: clean(ref.references_content),
    },
  };
}

export async function fetchTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const res = await fetch(`${BASE}/treatments/${encodeURIComponent(slug)}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
  const raw = await res.json();
  if (!raw?.id) return null;
  return map(raw);
}

export async function fetchLandingBySlug(slug: string) {
  const res = await fetch(`${BASE}/landing-pages/${slug}`);
  const raw = await res.json();

  return raw.data;
}