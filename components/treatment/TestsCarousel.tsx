"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

export default function TestsCarousel({
  cards,
}: {
  cards: { image: string; name: string; description: string }[];
}) {
  const ref = useRef<SwiperClass | null>(null);
  return (
    <div className="relative">
      <div className="mb-6 flex justify-center gap-3">
        <NavBtn dir="prev" onClick={() => ref.current?.slidePrev()} />
        <NavBtn dir="next" onClick={() => ref.current?.slideNext()} />
      </div>
      <Swiper
        modules={[Navigation]}
        onSwiper={(s) => (ref.current = s)}
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
      >
        {cards.map((card, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
              {card.image && (
                <div className="relative h-44 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base leading-snug text-teal-deep">{card.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
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
      aria-label={dir}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-md ring-1 ring-black/5 transition-transform hover:scale-105"
    >
      {dir === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
