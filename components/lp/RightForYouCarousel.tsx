"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight, HeartPulse } from "lucide-react";
import type { RightForYouCard } from "@/data/obesityLp";
import "swiper/css";

export default function RightForYouCarousel({ items }: { items: RightForYouCard[] }) {
  const ref = useRef<SwiperClass | null>(null);
  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-3">
        <NavBtn dir="prev" onClick={() => ref.current?.slidePrev()} />
        <NavBtn dir="next" onClick={() => ref.current?.slideNext()} />
      </div>
      <Swiper
        modules={[Navigation]}
        onSwiper={(s) => (ref.current = s)}
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{ 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 3.3 } }}
      >
        {items.map((c, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="flex h-full flex-col rounded-[28px] bg-gradient-to-br from-[#6f58a5]/[0.06] to-[#892fac]/[0.06] p-7 ring-1 ring-brand-purple/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple-soft to-brand-purple text-white">
                <HeartPulse className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-4 text-lg leading-snug text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.description}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function NavBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-md ring-1 ring-black/5 transition-transform hover:scale-105"
    >
      {dir === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
