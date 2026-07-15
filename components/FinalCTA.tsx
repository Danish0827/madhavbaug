import Link from "next/link";
import { ArrowUpRight, HeartPulse } from "lucide-react";
import { finalCta } from "@/data/content";
import Image from "next/image";

export default function FinalCTA({ ctaHref = "/contact" }: { ctaHref?: string }) {
  return (
    <section className="bg-cover bg-center bg-no-repeat py-16 overflow-hidden xl:py-12" style={{ backgroundImage: "url('/assets/cta.webp')" }}>
      <div className="mx-auto w-full container">
        <div className="relative  rounded-[32px]  px-6 py-12 sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute right-50 top-10 w-full h-full text-white" >
            <Image
              src="/assets/cta-water.png"
              alt="Madhavbaug"
              width={500}
              height={500}
              className="absolute scale-150 w-full h-full left-1/2 top-20 -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </div>
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl xl:max-w-3xl 2xl:max-w-5xl">
              <h2 className="font-display text-2xl leading-snug text-white sm:text-3xl lg:text-[36px]">
                {finalCta.title}
              </h2>
              <p className="mt-3 text-sm text-white/70 sm:text-base">
                {finalCta.subtitle}
              </p>
            </div>
            <Link
                  href={ctaHref}
                  className="inline-flex items-center group"
                >
                  <span className="bg-white group-hover:bg-white/90 text-[rgb(137,47,172)] group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                     {finalCta.cta.label}
                  </span>
                  <span className="flex w-fit h-10 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight className="font-thin w-full h-full p-2.5 rounded-full bg-white group-hover:bg-white/90 text-[rgb(137,47,172)] group-hover:rotate-45 group-hover:shadow-xl duration-300 shadow-lg" />
                  </span>
                </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
