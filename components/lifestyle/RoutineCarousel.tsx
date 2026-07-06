"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RoutineCard } from "@/data/lifestyle";
import "swiper/css";

export default function RoutineCarousel({ cards }: { cards: RoutineCard[] }) {
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
        slidesPerView={1.15}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 3.3 } }}
      >
        {cards.map((c, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="flex h-full flex-col overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5">
              <div className="relative h-48 w-full">
                <Image src={c.image} alt={c.time} fill className="object-cover" sizes="(max-width:640px) 100vw, 340px" />
              </div>
              <div className="flex flex-1 flex-col gap-4 bg-[#006589] p-6">
                <h3 className="font-display text-xl text-white">{c.time}</h3>
                <div>
                  <p className="text-xs font-medium text-white/50">What to Do</p>
                  <p className="mt-1 text-sm text-white/90">{c.whatToDo}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/50">Why it Helps</p>
                  <p className="mt-1 text-sm text-white/90">{c.whyItHelps}</p>
                </div>
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
      aria-label={dir === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-md ring-1 ring-black/5 transition-transform hover:scale-105"
    >
      {dir === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
