"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Quote,
  ArrowUpRight,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { successStories } from "@/data/content";
import type { ReviewStory, VideoStory } from "@/data/content";

type Tab = "Videos" | "Reviews";

export default function SuccessStories() {
  const [tab, setTab] = useState<Tab>("Videos");
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Heart watermark */}
      <div className="pointer-events-none absolute right-50 top-10 w-full h-full text-brand-purple/5" >
        <Image
          src="/assets/blue-water.webp"
          alt="Madhavbaug"
          width={200}
          height={500}
          className="absolute right-3 top-3 object-contain rounded bg-white/80 px-1.5 py-1"
        />
      </div>

      <div className="relative mx-auto w-full container px-5 sm:px-8 lg:px-20">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>{successStories.eyebrow}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl text-ink lg:text-[34px]">
            {successStories.title}
          </h2>

          {/* Toggle */}
          <div className="mt-6 inline-flex rounded-full bg-cream p-1">
            {(["Videos", "Reviews"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  trackRef.current?.scrollTo({ left: 0 });
                }}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${tab === t
                    ? "btn-gradient text-white shadow"
                    : "text-gray-600 hover:text-brand-purple"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Carousel ---------- */}
        <div className="relative mt-12">
          <div
            ref={trackRef}
            className=" -mx-5 grid md:grid-cols-2 lg:grid-cols-3 gap-6   px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-20 lg:px-20"
          >
            {tab === "Videos"
              ? successStories.videos.map((v) => <VideoCard key={v.name} story={v} />)
              : successStories.reviews.map((r) => <ReviewCard key={r.name} story={r} />)}
          </div>

          {/* Arrows */}
          {/* <button
            onClick={() => scrollByCard(-1)}
            aria-label="Previous"
            className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-purple shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 md:flex lg:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Next"
            className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-purple shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 md:flex lg:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button> */}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={successStories.cta.href}
            className="inline-flex items-center group"
          >
            <span className="bg-transparent group-hover:bg-white/10 text-[rgb(137,47,172)] border border-[rgb(137,47,172)] group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium  shadow-lg">
              {successStories.cta.label}
            </span>
            <span className="flex  w-fit h-10 items-center justify-center rounded-full border border-[rgb(137,47,172)]">
              <ArrowUpRight className="font-thin w-full h-full p-2 rounded-full bg-transparent group-hover:bg-white/10 text-[rgb(137,47,172)] group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Video card (image + gradient info panel) ---------- */
function VideoCard({ story }: { story: VideoStory }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  return (
    <article
      // onClick={() => setSelectedVideo(story.video)}
      className="cursor-pointer shrink-0 snap-start overflow-hidden rounded-[24px] shadow-md ring-1 ring-black/5 w-full"
    >
      <div onClick={() => setSelectedVideo(story.video)} className="relative h-52 w-full">
        <Image src={story.image} alt={story.name} fill className="object-cover" />
        <button
          
          aria-label={`Play ${story.name}'s story`}
          className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-purple shadow-lg transition-transform hover:scale-105"
        >
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </button>
        <Image
          src="/assets/logo.png"
          alt="Madhavbaug"
          width={90}
          height={17}
          className="absolute right-3 top-3 rounded bg-white/80 px-1.5 py-1"
        />
      </div>
      <div className="bg-brand-gradient p-6 h-full text-white">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-2xl">{story.name}</h3>
          <span className="text-sm text-white/70">
            {story.age} • {story.city}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-wide text-white/60">Condition</p>
          <p className="mt-0.5 text-sm font-medium">{story.condition}</p>
        </div>
        {/* <div className="mt-3">
          <p className="text-xs uppercase tracking-wide text-white/60">Data Proof</p>
          <p className="mt-0.5 text-sm">{story.dataProof}</p>
        </div> */}
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              ✕
            </button>

            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                src={selectedVideo}
                title="Story Video"
                className="h-full w-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setSelectedVideo(null)}
          />
        </div>
      )}
    </article>
  );
}

/* ---------- Review card (quote + stars, light design) ---------- */
function ReviewCard({ story }: { story: ReviewStory }) {
  const initials = story.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <article
      data-card
      className="flex shrink-0 snap-start flex-col rounded-[24px] bg-surface-lav p-7 shadow-sm ring-1 ring-brand-purple/10 w-full"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
          <Quote className="h-5 w-5 fill-current" />
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < story.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
                }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-700">
        &ldquo;{story.review}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-brand-purple/10 pt-5">
        <span className="bg-brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="font-display truncate text-base text-ink">{story.name}</p>
          <p className="text-xs text-gray-500">
            {story.age} • {story.city}
          </p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-brand-purple ring-1 ring-brand-purple/20">
          {story.condition}
        </span>
      </div>
    </article>
  );
}
