import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { whoWeAre } from "@/data/content";
import { FaWhatsapp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { LiaGgCircle } from "react-icons/lia";

export default function WhoWeAre() {
  return (
    <section id="conditions" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid w-full container justify-between items-center gap-10 px-5 sm:px-8 lg:grid-cols-[40%_50%] lg:gap-16 lg:px-20">
        {/* Photo with decorative frames */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -left-6 -top-16 hidden h-46 w-40 mx-auto z-20 lg:block " >
            <Image
              src="/assets/home-india-1.webp"
              alt="Madhavbaug physician caring for a patient"
              fill
              className="object-contain rounded-4xl shadow-xl"
            />
          </div>

          <div className="absolute -bottom-10 -right-16 hidden h-46 w-40  lg:block z-20" >
            <Image
              src="/assets/home-india-2.webp"
              alt="Madhavbaug physician caring for a patient"
              fill
              className="object-cover rounded-4xl shadow-xl"
            />
          </div>
          <div className="relative aspect-[451/501] overflow-hidden ">
            <Image
              src="/assets/home-india.webp"
              alt="Madhavbaug physician caring for a patient"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionLabel>{whoWeAre.eyebrow}</SectionLabel>
          <h2 className="font-display mt-4 text-2xl md:text-3xl leading-snug text-ink lg:text-[34px]">
            {whoWeAre.title}
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-gray-600">
            {whoWeAre.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href={whoWeAre.primaryCta.href}
              className="inline-flex items-center group"
            >
              <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                {whoWeAre.primaryCta.label}
              </span>
              <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
                <Search className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
              </span>
            </Link>
            <Link
              href={whoWeAre.secondaryCta.href}
              className="inline-flex items-center group"
            >
              <span className="bg-transparent group-hover:bg-white/10 text-[rgb(137,47,172)] border border-[rgb(137,47,172)] group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium  shadow-lg">
                {whoWeAre.secondaryCta.label}
              </span>
              <span className="flex  w-fit h-10 items-center justify-center rounded-full border border-[rgb(137,47,172)]">
                <LiaGgCircle className="font-thin w-full h-full p-2 rounded-full bg-transparent group-hover:bg-white/10 text-[rgb(137,47,172)] group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
