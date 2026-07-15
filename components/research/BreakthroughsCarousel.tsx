"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Protocol } from "@/data/research";
import "swiper/css";

export default function BreakthroughsCarousel({ items }: { items: Protocol[] }) {
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
        slidesPerView={1}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 2 },
        }}
        className=""
      >
        {items.map((p, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="flex h-full flex-col rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-9">
              <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl leading-snug text-transparent sm:text-2xl">
                {p.title}
              </h3>

              <div className="mt-5">
                <p className="text-sm font-semibold text-teal-deep">The Approach</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.approach}</p>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-teal-deep">The Clinical Proof</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.proof}</p>
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
