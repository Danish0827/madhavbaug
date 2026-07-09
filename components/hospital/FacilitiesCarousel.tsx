"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Img } from "@/lib/hospitals";
import "swiper/css";

export default function FacilitiesCarousel({ images }: { images: Img[] }) {
  const ref = useRef<SwiperClass | null>(null);
  if (!images.length) return null;
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        onSwiper={(s) => (ref.current = s)}
        spaceBetween={20}
        slidesPerView={1.1}
        loop={images.length > 2}
        breakpoints={{ 640: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2 } }}
      >
        {images.map((im, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-64 w-full overflow-hidden rounded-[24px] shadow-sm ring-1 ring-black/5 sm:h-80">
              <Image
                src={im.url}
                alt={im.alt || "Madhavbaug facility"}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 640px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex justify-center gap-3">
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
      aria-label={dir === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-md ring-1 ring-black/5 transition-transform hover:scale-105"
    >
      {dir === "prev" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}
