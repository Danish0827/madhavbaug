/**
 * Success-stories data layer.
 *
 * Wraps the Madhavbaug stories REST API. Each story is either a VIDEO
 * testimonial (youtube link + thumbnail) or a written REVIEW (quote + star
 * rating), discriminated by `select_videosreviews`. Normalised into a clean
 * `Story` union the UI can render directly. Fetches run server-side.
 *
 * Endpoints:
 *   GET /stories                      -> all stories (array)
 *   GET /stories/category/<slug>      -> stories in a condition category
 *   GET /stories/tag/<slug>           -> stories by tag (videos | reviews)
 */

const BASE = "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1/stories";

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

/* ------------------------------------------------------------------ types */

export type StoryTerm = { id: number; name: string; slug: string };

type BaseStory = {
  name: string;
  age: string;
  location: string;
  condition: string;
  categories: StoryTerm[];
  tags: StoryTerm[];
};

export type VideoStory = BaseStory & {
  type: "video";
  /** YouTube (or other) link; may be "#" as a placeholder. */
  youtubeLink: string;
  thumbnail: string;
  thumbnailAlt: string;
};

export type ReviewStory = BaseStory & {
  type: "review";
  review: string;
  rating: number;
};

export type Story = VideoStory | ReviewStory;

/* ---------------------------------------------------------------- raw shape */

type RawTerm = { id: number; name: string; slug: string };

type RawStory = {
  title: string;
  age?: string;
  location?: string;
  condition_name?: string;
  story_categories?: RawTerm[];
  story_tags?: RawTerm[];
  select_videosreviews?: string;
  reviews?: string;
  rating_star?: string;
  youtube_link?: string;
  video_thumbnail?: { url?: string; alt?: string; title?: string } | null;
};

/* ---------------------------------------------------------------- normalise */

function normTerm(t: RawTerm): StoryTerm {
  return { id: t.id, name: decodeEntities(t.name), slug: t.slug };
}

function normStory(raw: RawStory): Story {
  const base: BaseStory = {
    name: decodeEntities(raw.title || ""),
    age: raw.age || "",
    location: decodeEntities(raw.location || ""),
    condition: decodeEntities(raw.condition_name || ""),
    categories: (raw.story_categories ?? []).map(normTerm),
    tags: (raw.story_tags ?? []).map(normTerm),
  };

  if (raw.select_videosreviews === "videos") {
    return {
      ...base,
      type: "video",
      youtubeLink: raw.youtube_link || "#",
      thumbnail: raw.video_thumbnail?.url || "",
      thumbnailAlt: decodeEntities(raw.video_thumbnail?.alt || base.name),
    };
  }

  return {
    ...base,
    type: "review",
    review: decodeEntities(raw.reviews || ""),
    rating: Math.min(5, Math.max(0, Math.round(Number(raw.rating_star) || 5))),
  };
}

/* ---------------------------------------------------------------- fetchers */

async function fetchArray(url: string): Promise<Story[]> {
  const res = await fetch(url, { headers: FETCH_HEADERS, next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Stories returned ${res.status}`);
  const json: RawStory[] = await res.json();
  return (Array.isArray(json) ? json : []).map(normStory);
}

/** All success stories (videos + reviews). */
export function fetchStories(): Promise<Story[]> {
  return fetchArray(BASE);
}

/** Stories in a condition category (e.g. "heart-disease"). */
export function fetchStoriesByCategory(slug: string): Promise<Story[]> {
  return fetchArray(`${BASE}/category/${encodeURIComponent(slug)}`);
}

/** Stories by tag (e.g. "videos" or "reviews"). */
export function fetchStoriesByTag(slug: string): Promise<Story[]> {
  return fetchArray(`${BASE}/tag/${encodeURIComponent(slug)}`);
}

/** Distinct condition categories present across a set of stories (for filters). */
export function collectCategories(stories: Story[]): StoryTerm[] {
  const map = new Map<string, StoryTerm>();
  for (const s of stories) {
    for (const c of s.categories) if (!map.has(c.slug)) map.set(c.slug, c);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
