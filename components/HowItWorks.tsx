import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Search } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { howItWorks } from "@/data/content";
import { CiSearch } from "react-icons/ci";
import { GoCheckCircleFill } from "react-icons/go";

export default function HowItWorks() {
  return (
    <section id="treatments" className="bg-cover bg-center bg-no-repeat py-16 lg:py-24" style={{ backgroundImage: "url('/ASSETS/work-bg.WEBP')" }}>
      <div className="mx-auto w-full container px-5 sm:px-8 lg:px-20">
        {/* Header row */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <SectionLabel>{howItWorks.eyebrow}</SectionLabel>
            <h2 className="font-display mt-4 text-3xl leading-snug text-ink lg:text-[34px]">
              {howItWorks.title}
            </h2>
            <p className="mt-4 text-sm text-gray-600">{howItWorks.subtitle}</p>
          </div>
          <Link
            href={howItWorks.cta.href}
            className="inline-flex items-center group"
          >
            <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
              {howItWorks.cta.label}
            </span>
            <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
              <Search className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
            </span>
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <article
              key={step.title}
              className="overflow-hidden rounded-4xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
            >
              <div className="relative w-full">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={1600}
                  height={1000}
                  className="object-cover"
                />
                {/* <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-purple shadow">
                  {step.eyebrow}
                </span> */}
              </div>
              <div className="bg-white p-6">
                <h3 className="font-display text-xl text-brand-purple">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{step.subtitle}</p>
                <ul className="mt-4 space-y-2.5">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <GoCheckCircleFill className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
