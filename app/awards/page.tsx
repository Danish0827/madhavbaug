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
        {/* ---------- Hero ---------- */}
        <PageBanner
          backgroundImage="/assets/awards/hero.png"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Awards & Recognitions" },
          ]}
          title="Awards & Recognitions"
          description="A Legacy of Validated Excellence — the national and international honours that reflect our scientific rigour, clinical safety, and pursuit of non-surgical healthcare solutions."
        />

        {/* ---------- Award Highlights (carousel) ---------- */}
        <section className="px-5 pt-24 pb-14 sm:px-8 lg:px-20 lg:pt-28">
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
        <section className="bg-gradient-to-br from-[#006589]/[0.05] to-[#3d4281]/[0.05] px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
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
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Media Recognition</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Madhavbaug in the Headlines
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Our medical breakthroughs, clinical trial outcomes, and unique approach to non-surgical
                chronic care are frequently featured across leading national media and prestigious
                business publications.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pressReleases.map((p, i) => (
                <article key={i} className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
                  <div className="relative h-44 w-full">
                    <Image src="/assets/awards/press.png" alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 400px" />
                  </div>
                  <div className="flex flex-1 flex-col bg-gradient-to-br from-brand-purple/[0.06] to-brand-maroon/[0.06] p-6">
                    <h3 className="font-display text-base leading-snug text-ink">{p.title}</h3>
                    <p className="mt-2 text-xs font-medium text-gray-500">{p.source}</p>
                    <a
                      href={p.href}
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#6f58a5] to-[#892fac] px-5 py-2 pt-3 text-sm font-medium text-white transition-shadow hover:shadow-lg"
                    >
                      Read Release
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- The Recognition That Matters Most ---------- */}
        <section className="px-5 pb-16 sm:px-8 lg:px-20 lg:pb-24">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
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
                <div key={s.label} className="flex items-center gap-4 rounded-[24px] bg-gradient-to-br from-[#006589]/[0.06] to-[#3d4281]/[0.06] p-6 ring-1 ring-black/5">
                  <p className="font-display text-3xl text-teal-deep lg:text-4xl">{s.number}</p>
                  <p className="font-display text-base text-ink">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href="/about"
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Learn More About Madhavbaug <ArrowUpRight className="h-4 w-4" />
              </a>
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
