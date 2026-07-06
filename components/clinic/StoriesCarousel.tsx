"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { Play, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import type { ReviewStory, VideoStory } from "@/data/content";
import "swiper/css";
import "swiper/css/navigation";

type Tab = "Videos" | "Reviews";

export default function StoriesCarousel({
  videos,
  reviews,
  clinicName,
}: {
  videos: VideoStory[];
  reviews: ReviewStory[];
  clinicName: string;
}) {
  const [tab, setTab] = useState<Tab>("Videos");
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="relative mx-auto w-full container px-5 sm:px-8 lg:px-20">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>Success Stories</SectionLabel>
          <h2 className="font-display mt-4 text-3xl text-ink lg:text-[34px]">
            Honest Struggles. Extraordinary Reversals.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600">
            Real outcomes from patients treated at {clinicName} and across the Madhavbaug network.
          </p>

          {/* Toggle */}
          <div className="mt-6 inline-flex rounded-full bg-cream p-1">
            {(["Videos", "Reviews"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  swiperRef.current?.slideTo(0);
                }}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  tab === t ? "btn-gradient text-white shadow" : "text-gray-600 hover:text-brand-purple"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-12">
          <Swiper
            modules={[Navigation]}
            onSwiper={(s) => (swiperRef.current = s)}
            spaceBetween={24}
            slidesPerView={1.05}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
            {tab === "Videos"
              ? videos.map((v) => (
                  <SwiperSlide key={v.name} className="h-auto pb-2">
                    <VideoCard story={v} />
                  </SwiperSlide>
                ))
              : reviews.map((r) => (
                  <SwiperSlide key={r.name} className="h-auto pb-2">
                    <ReviewCard story={r} />
                  </SwiperSlide>
                ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-purple shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 md:flex lg:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-purple shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 md:flex lg:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ story }: { story: VideoStory }) {
  return (
    <article className="h-full overflow-hidden rounded-[24px] shadow-md ring-1 ring-black/5">
      <div className="relative h-52 w-full">
        <Image src={story.image} alt={story.name} fill className="object-cover" sizes="(max-width:640px) 100vw, 400px" />
        <button
          aria-label={`Play ${story.name}'s story`}
          className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-purple shadow-lg transition-transform hover:scale-105"
        >
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </button>
      </div>
      <div className="bg-brand-gradient p-6 text-white">
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
        <div className="mt-3">
          <p className="text-xs uppercase tracking-wide text-white/60">Data Proof</p>
          <p className="mt-0.5 text-sm">{story.dataProof}</p>
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ story }: { story: ReviewStory }) {
  const initials = story.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

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
