"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { heroSlides, hero } from "@/data/content";

const SLIDE_MS = 5000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section className="relative pb-20 xl:pb-24">
      <div
        className="relative h-[78svh] min-h-[620px] w-full overflow-hidden sm:h-[700px] lg:h-100 xl:h-200 2xl:h-200"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute w-full h-full inset-0 transition-opacity duration-700 ${i === index ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
          // aria-hidden={i !== index}
          >
            {/* Banner photo */}
            <Image
              src={slide.image}
              alt={slide.title}
              width={1920}
              height={1080}
              priority={i === 0}
              className="object-cover lg:hidden object-left lg:object-cover lg:object-center w-full h-full"
            />
            {/* Curved gradient panel (desktop) */}
            <Image
              src="/assets/hero-panel.png"
              alt={slide.title}
              width={1920}
              height={1080}
              priority={i === 0}
              className="hidden object-cover object-right lg:block"
            />
            {/* Mobile gradient overlay (fades photo into brand gradient) */}
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-indigo-deep via-blue-deep/95 to-transparent lg:hidden" />

            {/* Copy */}
            <div className="absolute inset-0">
              <div className="mx-auto flex h-full container items-end px-5 pb-20 sm:px-8 lg:items-center lg:px-20 lg:pb-0">
                <div className="max-w-md text-white lg:ml-auto">
                  <h1 className="font-display text-[30px] leading-tight sm:text-4xl lg:text-3xl xl:text-[40px]">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-white/85 xl:text-base lg:mt-5">
                    {slide.description}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8 lg:gap-4">
                    <Link
                      href={slide.primaryCta.href}
                      className="inline-flex items-center group"
                    >
                      <span className="bg-white group-hover:bg-white/90 text-[rgb(137,47,172)] group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                        {slide.primaryCta.label}
                      </span>
                      <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
                        <ArrowUpRight className="font-thin w-full h-full p-2 rounded-full bg-white group-hover:bg-white/90 group-hover:rotate-45 group-hover:shadow-xl duration-300 text-[rgb(137,47,172)] shadow-lg" />
                      </span>
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className="inline-flex items-center group"
                    >
                      <span className="bg-transparent group-hover:bg-white/10 text-white border group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium  shadow-lg">
                        {slide.secondaryCta.label}
                      </span>
                      <span className="flex  w-fit h-10 items-center justify-center rounded-full border">
                        <FaWhatsapp className="font-thin w-full h-full p-2 rounded-full bg-transparent group-hover:bg-white/10 text-white group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous banner"
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition-colors hover:bg-white/40 sm:flex lg:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next banner"
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition-colors hover:bg-white/40 sm:flex lg:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-16 right-2 z-20 flex -translate-x-1/2 gap-2 lg:bottom-28">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ---------- Overlapping banner pill ---------- */}
      <div className="relative z-10 mx-auto -mb-10 -mt-14 w-full max-w-[1000px] bg-wh px-4 lg:-mt-24">
        <div className="rounded-[28px] bg-white px-6 py-8 text-center sm:px-10 lg:rounded-[91px]">
          <h2 className="font-display text-2xl text-ink sm:text-3xl lg:text-[40px]">
            {hero.bannerTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            {hero.bannerSubtitle}
          </p>
          <p className="mt-3 text-xs text-gray-400">{hero.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
