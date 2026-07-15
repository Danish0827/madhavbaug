import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import PageBanner from "@/components/PageBanner";
import AwardHighlightsCarousel from "@/components/awards/AwardHighlightsCarousel";
import MilestonesTabs from "@/components/awards/MilestonesTabs";
import { awardHighlights, milestoneTabs, pressReleases, recognitionStats } from "@/data/awards";
import HeroBreadcrumb from "@/components/HeroBreadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Awards & Recognitions | Madhavbaug",
  description:
    "A legacy of validated excellence — the national and international honours that recognise Madhavbaug's scientific rigour, clinical safety, and non-surgical healthcare.",
};

export default function AwardsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBreadcrumb
          image="/assets/awards/hero.webp"
          imageAlt="Awards & Recognitions"
          heroTitle="A Legacy of Validated Excellence"
          heroDescription="<p>At Madhavbaug, our greatest reward is the health and smiles of our patients. However, the national and international honours we receive serve as a powerful reminder of our scientific rigour, clinical safety, and pursuit of non-surgical healthcare solutions.</p>"
          pageTitle="Awards & Recognitions"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Awards & Recognitions" },
          ]}
          primaryButton={null}
          secondaryButton={null}
        />

        {/* ---------- Award Highlights (carousel) ---------- */}
        <section className="px-5 pb-14 sm:px-8 lg:px-20 ">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Awards &amp; Recognitions</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">Award Highlights</h2>
            </div>
            <div className="mt-10">
              <AwardHighlightsCarousel items={awardHighlights} />
            </div>
          </div>
        </section>

        {/* ---------- Milestones (tabs) ---------- */}
        <section className="px-5  sm:px-8 lg:px-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Awards</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Milestones in Healthcare Excellence
              </h2>
            </div>
            <MilestonesTabs tabs={milestoneTabs} />
          </div>
        </section>

        {/* ---------- Madhavbaug in the Headlines ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto  text-center">
              <div className="flex justify-center">
                <SectionLabel>Media Recognition</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Madhavbaug in the Headlines
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
               Our medical breakthroughs, clinical trial outcomes, and unique approach to non-surgical chronic care are frequently featured across leading national media and prestigious business publications.
              </p>
            </div>
            <div className="mt-10 lg:mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pressReleases.map((p, i) => (
                <article key={i} className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
                  <div className="relative h-44 w-full">
                    <Image src="/assets/awards/press.png" alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 400px" />
                  </div>
                  <div className="flex flex-1 flex-col bg-gradient-to-br from-brand-purple/[0.06] to-brand-maroon/[0.06] p-6">
                    <h3 className="font-display text-base leading-snug text-ink">{p.title}</h3>
                    <p className="my-4 text-xs font-medium text-gray-500">{p.source}</p>
                    <Link
                      href={p.href}
                      className="mt-auto my-3 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#6f58a5] to-[#892fac] px-5 py-2 pt-3 text-sm font-medium text-white transition-shadow hover:shadow-lg"
                    >
                      Read Release
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- The Recognition That Matters Most ---------- */}
        <section className="px-5 pb-16 sm:px-8 lg:px-20 lg:pb-24">
          <div className="mx-auto w-full container">
            <div className="mx-auto text-center">
              <div className="flex justify-center">
                <SectionLabel>Patient Trust: Our Ultimate Recognition</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                The Recognition That Matters Most
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                While industry accolades validate our science, our true success is measured by the
                health milestones our patients achieve every day.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {recognitionStats.map((s) => (
                <div key={s.label} className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#006589]/[0.06] to-[#3d4281]/[0.06] px-8 py-10 ring-1 ring-black/5">
                  <p className="font-display text-3xl text-teal-deep lg:text-4xl">{s.number}</p>
                  <p className="font-display text-base text-ink">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
            href="/about"
            className="inline-flex items-center group"
          >
            <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
              Learn More About Madhavbaug
            </span>
            <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRight className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-45 group-hover:shadow-xl duration-300 shadow-lg" />
            </span>
          </Link>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
