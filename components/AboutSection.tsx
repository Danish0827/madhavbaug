import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { about } from "@/data/content";

export default function AboutSection() {
  return (
    <section className="bg-white pt-10 pb-16 lg:pb-24">
      <div className="mx-auto grid w-full container px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] gap-5 lg:gap-0 lg:px-20 rounded-4xl">
        {/* Gradient copy card */}
        <div className="bg-linear-120 from-[#006589] to-[#3D4281] flex flex-col justify-center rounded-4xl lg:rounded-r-none lg:rounded-l-4xl p-8 text-white sm:p-10 lg:p-12">
          <SectionLabel tone="light">{about.eyebrow}</SectionLabel>
          <h2 className="font-display mt-4 text-2xl leading-snug sm:text-[30px]">
            {about.title}
          </h2>
          {about.body.map((p, i) => (
            <p key={i} className="mt-4 text-base font-light text-white/85">
              {p}
            </p>
          ))}
          <div className="mt-8">
            <Link
              href={about.cta.href}
              className="inline-flex items-center group"
            >
              <span className="bg-white group-hover:bg-white/90 text-[rgb(137,47,172)] group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                {about.cta.label}
              </span>
              <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRight className="font-thin w-full h-full p-2 rounded-full bg-white group-hover:bg-white/90 group-hover:rotate-45 group-hover:shadow-xl duration-300 text-[rgb(137,47,172)] shadow-lg" />
              </span>
            </Link>
          </div>
        </div>

        {/* Founder photo with floating pills */}
        <div className="relative  rounded-r-4xl">
          <Image
            src="/assets/dr-sane.png"
            alt={about.doctor.name}
            width={1900}
            height={1900}
            className="object-cover object-top rounded-4xl lg:rounded-l-none lg:rounded-r-4xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-4xl lg:rounded-l-none lg:rounded-r-4xl" />

          {/* Floating highlight pills */}
          <div className="absolute hidden -right-8 bottom-1/2 lg:flex flex-col translate-y-1/2 gap-4">
            {about.highlights.map((h) => (
              <span
                key={h}
                className="max-w-45 font-display rounded-3xl btn-gradient px-3 py-4 text-center text-xs lg:text-lg font-medium text-white shadow-md backdrop-blur "
              >
                {h}
              </span>
            ))}
          </div>

          {/* Name plate */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-white ">
            <p className="font-display text-2xl">{about.doctor.name}</p>
            <p className="mt-1 text-xs text-white/80">{about.doctor.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
