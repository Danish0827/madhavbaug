"use client";

import { useEffect, useRef, useState } from "react";

type Step = { time: string; heading: string; description: string; image: string };

/**
 * Patient journey: a sticky image on the left that swaps to the active step's
 * image as you scroll through the step cards on the right (desktop). On mobile
 * each step shows its own image inline.
 */
export default function PatientJourney({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) {
          const i = refs.current.indexOf(visible.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-16">
      {/* Sticky image (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-40 aspect-[460/440] overflow-hidden rounded-[32px] ring-1 ring-black/5">
          {steps.map((s, i) =>
            s.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={s.image}
                alt={s.heading}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ) : null
          )}
        </div>
      </div>

      {/* Steps */}
      <div className="relative">
        <div className="absolute bottom-6 left-[19px] top-3 w-px bg-brand-purple/20" />
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="relative pl-14"
            >
              <span
                className={`absolute left-[9px] top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-white transition-colors ${
                  i === active ? "bg-brand-gradient text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </span>
              <div
                className={`rounded-[28px] p-6 transition-all ${
                  i === active
                    ? "bg-white shadow-md ring-1 ring-brand-purple/20"
                    : "bg-white/60 ring-1 ring-black/5"
                }`}
              >
                {s.time && (
                  <span className="inline-flex rounded-full bg-surface-lav px-3 py-1 text-xs font-medium text-brand-purple">
                    {s.time}
                  </span>
                )}
                <h3 className="font-display mt-3 text-lg text-ink">{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                {s.image && (
                  <div className="relative mt-4 h-44 w-full overflow-hidden rounded-2xl lg:hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.heading} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
