"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Play, Quote, Star, X } from "lucide-react";
import type { Story, StoryTerm, VideoStory, ReviewStory } from "@/lib/stories";
import SearchSelect from "@/components/ui/SearchSelect";

type TypeTab = "all" | "video" | "review";

const TABS: { key: TypeTab; label: string }[] = [
  { key: "all", label: "All Stories" },
  { key: "video", label: "Video Stories" },
  { key: "review", label: "Written Reviews" },
];

/** Turn a YouTube watch/share link into an embed URL; null if not playable. */
function toEmbed(link: string): string | null {
  if (!link || link === "#") return null;
  const id =
    link.match(/[?&]v=([\w-]{11})/)?.[1] ||
    link.match(/youtu\.be\/([\w-]{11})/)?.[1] ||
    link.match(/embed\/([\w-]{11})/)?.[1];
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
  return /^https?:\/\//.test(link) ? link : null;
}

export default function StoriesBrowser({
  stories,
  categories,
}: {
  stories: Story[];
  categories: StoryTerm[];
}) {
  const [tab, setTab] = useState<TypeTab>("all");
  const [cat, setCat] = useState("");
  const [video, setVideo] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      stories.filter((s) => {
        const byType = tab === "all" || s.type === tab;
        const byCat = !cat || s.categories.some((c) => c.slug === cat);
        return byType && byCat;
      }),
    [stories, tab, cat]
  );

  return (
    <div className="mx-auto w-full container">
      {/* ---------- Filters ---------- */}
      <div className="mb-10 flex flex-col items-center gap-5">
        <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-cream p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors sm:px-6 ${
                tab === t.key ? "btn-gradient text-white shadow" : "text-gray-600 hover:text-brand-purple"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {categories.length > 0 && (
          <div className="w-full max-w-xs">
            <SearchSelect
              label="All Conditions"
              value={cat}
              options={categories.map((c) => ({ value: c.slug, label: c.name }))}
              onChange={setCat}
              searchable={false}
            />
          </div>
        )}
      </div>

      {/* ---------- Grid ---------- */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) =>
            s.type === "video" ? (
              <VideoCard key={`${s.name}-${i}`} story={s} onPlay={() => setVideo(toEmbed(s.youtubeLink))} />
            ) : (
              <ReviewCard key={`${s.name}-${i}`} story={s} />
            )
          )}
        </div>
      ) : (
        <p className="rounded-[24px] bg-surface-lav px-6 py-16 text-center text-sm text-gray-600">
          No stories match this filter yet. Try another condition or type.
        </p>
      )}

      {/* ---------- Video modal ---------- */}
      {video && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideo(null)}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                src={video}
                title="Success story video"
                className="h-full w-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Video card ---------- */
function VideoCard({ story, onPlay }: { story: VideoStory; onPlay: () => void }) {
  const playable = story.youtubeLink && story.youtubeLink !== "#";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] shadow-md ring-1 ring-black/5">
      <button
        type="button"
        onClick={playable ? onPlay : undefined}
        aria-label={playable ? `Play ${story.name}'s story` : `${story.name}'s story`}
        className={`group relative block h-52 w-full ${playable ? "cursor-pointer" : "cursor-default"}`}
      >
        {story.thumbnail ? (
          <Image
            src={story.thumbnail}
            alt={story.thumbnailAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 400px"
          />
        ) : (
          <div className="h-full w-full bg-brand-gradient" />
        )}
        <span className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-purple shadow-lg transition-transform group-hover:scale-105">
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </span>
        <Image
          src="/assets/logo.png"
          alt="Madhavbaug"
          width={90}
          height={17}
          className="absolute right-3 top-3 rounded bg-white/80 px-1.5 py-1"
        />
      </button>
      <div className="bg-brand-gradient flex flex-1 flex-col p-6 text-white">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="font-display text-2xl">{story.name}</h3>
          <span className="text-sm text-white/70">
            {story.age} • {story.location}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-wide text-white/60">Condition</p>
          <p className="mt-0.5 text-sm font-medium">{story.condition}</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- Review card ---------- */
function ReviewCard({ story }: { story: ReviewStory }) {
  const initials = story.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="flex h-full flex-col rounded-[24px] bg-surface-lav p-7 shadow-sm ring-1 ring-brand-purple/10">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
          <Quote className="h-5 w-5 fill-current" />
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < story.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-700">&ldquo;{story.review}&rdquo;</p>

      <div className="mt-6 flex items-center gap-3 border-t border-brand-purple/10 pt-5">
        <span className="bg-brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="font-display truncate text-base text-ink">{story.name}</p>
          <p className="text-xs text-gray-500">
            {story.age} • {story.location}
          </p>
        </div>
        {story.condition && (
          <span className="ml-auto shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-brand-purple ring-1 ring-brand-purple/20">
            {story.condition}
          </span>
        )}
      </div>
    </article>
  );
}
