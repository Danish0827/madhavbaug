"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

export type ConsultationCard = {
  card_image?: { url?: string; alt?: string };
  card_title: string;
};

export default function ConsultationCarousel({ cards }: { cards: ConsultationCard[] }) {
  const ref = useRef<SwiperClass | null>(null);
  if (!cards?.length) return null;
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
        loop={true}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 3 } }}
      >
        {cards.map((c, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="group relative h-80 overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5">
              {c.card_image?.url && (
                <Image
                  src={c.card_image.url}
                  alt={c.card_title}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <h3 className="font-display absolute inset-x-0 bottom-0 p-6 text-lg leading-snug text-white">
                {c.card_title}
              </h3>
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
