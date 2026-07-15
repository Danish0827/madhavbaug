"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import type { AwardHighlight } from "@/data/awards";
import "swiper/css";

export default function AwardHighlightsCarousel({ items }: { items: AwardHighlight[] }) {
  const ref = useRef<SwiperClass | null>(null);
  return (
    <div className="relative">
      
      <Swiper
        modules={[Navigation]}
        onSwiper={(s) => (ref.current = s)}
        spaceBetween={24}
        loop={true}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 3 } }}
        className="h-full"
      >
        {items.map((a, i) => (
          <SwiperSlide key={i} className="h-full pb-2">
            <article className="flex h-full flex-col overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5">
              <div className="bg-brand-gradient flex h-60 items-center justify-center">
                <Trophy className="h-14 w-14 text-white/90" />
              </div>
              <div className="flex flex-1 flex-col bg-gradient-to-br from-[#006589]/[0.05] to-[#3d4281]/[0.05] p-6 h-full">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg xl:text-xl leading-snug text-teal-deep mb-2">{a.title}</h3>
                  <span className="shrink-0 rounded-full bg-gradient-to-br from-[#006589] to-[#3d4281] px-4 py-1.5 text-xs font-semibold text-white">
                    {a.year}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-teal-deep/80">{a.subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{a.description}</p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="my-6 flex justify-center gap-3">
        <NavBtn dir="prev" onClick={() => ref.current?.slidePrev()} />
        <NavBtn dir="next" onClick={() => ref.current?.slideNext()} />
      </div>
    </div>
  );
}

function NavBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-md ring-1 ring-black/5 transition-transform hover:scale-105"
    >
      {dir === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
