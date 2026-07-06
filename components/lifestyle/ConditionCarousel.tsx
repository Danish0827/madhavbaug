"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import type { ConditionGuide } from "@/data/lifestyle";
import "swiper/css";

export default function ConditionCarousel({ guides }: { guides: ConditionGuide[] }) {
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
        slidesPerView={1.05}
        breakpoints={{ 768: { slidesPerView: 1.4 }, 1024: { slidesPerView: 1.8 }, 1280: { slidesPerView: 1.9 } }}
      >
        {guides.map((g, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="flex h-full flex-col rounded-[30px] bg-gradient-to-br from-[#006589]/[0.06] to-[#3d4281]/[0.06] p-7 ring-1 ring-[#006589]/15 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-2xl text-transparent">
                  {g.title}
                </h3>
                <button
                  type="button"
                  className="btn-gradient inline-flex shrink-0 items-center gap-2 rounded-full py-2 pr-2 pl-4 text-sm font-medium text-white shadow-sm"
                >
                  Learn More
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{g.intro}</p>
              <p className="mt-4 text-sm text-gray-600">{g.listIntro}</p>
              <ul className="mt-3 space-y-2.5">
                {g.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
                    <span>
                      <span className="font-semibold text-ink">{it.bold}</span>
                      {it.rest}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{g.footer}</p>
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
