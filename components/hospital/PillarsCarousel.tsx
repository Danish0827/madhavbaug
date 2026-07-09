"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HospitalPillar } from "@/lib/hospitals";
import "swiper/css";

const PROSE =
  "text-sm leading-relaxed text-gray-600 [&_h3]:font-display [&_h3]:mb-4 [&_h3]:bg-gradient-to-r [&_h3]:from-brand-purple-soft [&_h3]:to-brand-purple [&_h3]:bg-clip-text [&_h3]:text-lg [&_h3]:text-transparent [&_ul]:space-y-3 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2 [&_li]:before:h-2 [&_li]:before:w-2 [&_li]:before:rounded-full [&_li]:before:bg-teal-deep [&_strong]:font-semibold [&_strong]:text-ink [&_b]:font-semibold [&_b]:text-ink";

export default function PillarsCarousel({ items }: { items: HospitalPillar[] }) {
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
        breakpoints={{ 640: { slidesPerView: 1.5 }, 1024: { slidesPerView: 2.2 }, 1280: { slidesPerView: 2.4 } }}
      >
        {items.map((p, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="flex h-full flex-col rounded-[28px] bg-gradient-to-br from-[#006589]/[0.05] to-[#3d4281]/[0.05] p-7 ring-1 ring-black/5 sm:p-8">
              <div className={PROSE} dangerouslySetInnerHTML={{ __html: p.pillar_information }} />
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
