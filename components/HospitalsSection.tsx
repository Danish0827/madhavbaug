import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Search, ShieldCheck } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { hospitals } from "@/data/content";
import { CiSearch } from "react-icons/ci";

export default function HospitalsSection() {
  return (
    <section id="clinics" className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto w-full container px-5 sm:px-8 lg:px-20">
        <div className="grid items-stretch gap-8 rounded-4xl lg:grid-cols-2 lg:gap-12 2xl:gap-20">
          {/* Photo */}
          <div className="relative min-h-80 overflow-hidden rounded-4xl shadow-xl">
            <Image
              src="/assets/hospital.png"
              alt="Madhavbaug hospital"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-2 flex items-center justify-between gap-2 z-10 px-7 w-full">
              <div className="flex">
                <Image src="/assets/icon/nabh.webp" width={500} height={500} alt="NABH" className="object-contain w-16 h-16 xl:w-22 xl:h-22" />
                <Image src="/assets/icon/iso-d.svg" width={500} height={500} alt="NABH" className="object-contain w-16 h-16 xl:w-20 xl:h-22" />
              </div>
              <Image src="/assets/icon/iso.svg" width={500} height={500} alt="NABH" className="object-contain w-40 xl:w-50 h-30" />

            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center">
            <SectionLabel>{hospitals.eyebrow}</SectionLabel>
            <h2 className="font-display mt-4 text-3xl leading-snug text-ink">
              {hospitals.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {hospitals.body}
            </p>
            <ul className="mt-6 space-y-3">
              {hospitals.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">

              <Link
                href={hospitals.cta.href}
                className="inline-flex items-center group"
              >
                <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                  {hospitals.cta.label}
                </span>
                <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
                  <Search className="font-medium w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
