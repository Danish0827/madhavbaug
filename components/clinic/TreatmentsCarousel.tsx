"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import {
  Activity,
  HeartPulse,
  Gauge,
  Heart,
  Droplets,
  Leaf,
  Salad,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Treatment } from "@/data/clinicSections";
import "swiper/css";
import "swiper/css/navigation";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  HeartPulse,
  Gauge,
  Heart,
  Droplets,
  Leaf,
  Salad,
  Dumbbell,
};

export default function TreatmentsCarousel({
  treatments,
  clinicName,
}: {
  treatments: Treatment[];
  clinicName: string;
}) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="bg-surface-lav py-16 lg:py-24">
      <div className="mx-auto w-full container px-5 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Treatments &amp; Diagnostics</SectionLabel>
            <h2 className="font-display mt-4 text-3xl leading-snug text-ink lg:text-[34px]">
              <span className="text-brand-maroon">What We Treat</span>{" "}
              <span className="text-teal-deep">at {clinicName}</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Evidence-based Ayurvedic protocols combined with modern diagnostics to reverse
              chronic conditions - without surgery.
            </p>
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-md ring-1 ring-black/5 transition-transform hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-purple shadow-md ring-1 ring-black/5 transition-transform hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(s) => (swiperRef.current = s)}
            spaceBetween={24}
            slidesPerView={1.1}
            autoplay={{ delay: 3500, disableOnInteraction: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {treatments.map((t) => {
              const Icon = ICONS[t.icon] ?? Activity;
              return (
                <SwiperSlide key={t.title} className="h-auto pb-2">
                  <article className="group flex h-full min-h-[230px] flex-col rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md transition-transform group-hover:scale-105">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="mt-5 inline-flex w-fit rounded-full bg-surface-lav px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-purple">
                      {t.tag}
                    </span>
                    <h3 className="font-display mt-3 text-lg text-ink">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.description}</p>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
