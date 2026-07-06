"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

/* Rich list content with teal check-circle bullets. */
const CHECKLIST =
  "text-sm leading-relaxed text-gray-600 [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-brand-purple [&_a]:underline [&_ul]:my-3 [&_ul]:list-none [&_ul]:space-y-2.5 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-8 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0.5 [&_li]:before:flex [&_li]:before:h-5 [&_li]:before:w-5 [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:rounded-full [&_li]:before:bg-teal-deep [&_li]:before:text-[11px] [&_li]:before:font-bold [&_li]:before:text-white [&_li]:before:content-['✓']";

export default function ApproachCarousel({
  items,
}: {
  items: { title: string; contentHtml: string }[];
}) {
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
        breakpoints={{ 1024: { slidesPerView: 2 } }}
      >
        {items.map((it, i) => (
          <SwiperSlide key={i} className="h-auto pb-2">
            <article className="flex h-full flex-col rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5">
              <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl leading-snug text-transparent">
                {it.title}
              </h3>
              <div className={`mt-4 ${CHECKLIST}`} dangerouslySetInnerHTML={{ __html: it.contentHtml }} />
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
