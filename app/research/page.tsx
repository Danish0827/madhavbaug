import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Globe2, Presentation } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import PageBanner from "@/components/PageBanner";
import BreakthroughsCarousel from "@/components/research/BreakthroughsCarousel";
import {
  researchHero,
  heroStats,
  researchPillars,
  protocols,
  publications,
  presentations,
  presentationsIntro,
} from "@/data/research";

export const metadata: Metadata = {
  title: "Our Research | Madhavbaug",
  description:
    "Peer-reviewed studies, clinical trials and published evidence behind Madhavbaug's non-surgical, Ayurveda-led reversal of chronic heart and metabolic conditions.",
};

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero ---------- */}
        <PageBanner
          backgroundImage="/assets/research/hero.png"
          breadcrumbs={researchHero.breadcrumbs}
          title={researchHero.title}
          description={researchHero.description}
        />

        {/* ---------- Hero stats ---------- */}
        <section className="px-5 pt-10 sm:px-8 lg:px-20">
          <div className="mx-auto grid w-full container gap-4 sm:grid-cols-3">
            {heroStats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#6F58A5]/[0.06] to-[#892FAC]/[0.06] px-8 py-10 ring-1 ring-black/5">
                <p className="font-display text-3xl text-black lg:text-4xl">{s.number}</p>
                <p className="font-display text-base text-ink">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- What We Study (Core Research Pillars) ---------- */}
        <section className="px-5 pt-16 pb-14 sm:px-8 lg:px-20 lg:pt-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Core Research Pillars (What We Study)</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                What We Study At Madhavbaug
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {researchPillars.map((p) => (
                <article
                  key={p.title}
                  className="flex flex-col overflow-hidden rounded-4xl shadow-sm ring-1 ring-black/5"
                >
                  <div className="h-60 w-full">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={1000}
                      height={1000}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-brand-gradient flex flex-1 flex-col p-6 h-full">
                    <h3 className="font-display text-xl text-white">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{p.description}</p>
                    <div className="mt-6 flex items-center w-fit group">
                      
                      <button
                        type="button"
                        className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                      >
                        Read our Research
                      </button>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white">
                        <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 duration-300" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Evidence-Based Treatment Protocols (carousel) ---------- */}
        <section className="bg-gradient-to-br from-[#6f58a5]/[0.06] to-[#892fac]/[0.06] px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Major Clinical Breakthroughs &amp; Protocols</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Evidence-Based Treatment Protocols
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                A closer look at the specialised, research-backed protocols that power our non-surgical
                reversal of chronic heart and metabolic conditions.
              </p>
            </div>
            <div className="mt-10">
              <BreakthroughsCarousel items={protocols} />
            </div>
          </div>
        </section>

        {/* ---------- Published Work (Peer-Reviewed Publications) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Featured Peer-Reviewed Publications</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Published Work in Global Medical Journals
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {publications.map((pub) => (
                <article
                  key={pub.title}
                  className="rounded-[28px] bg-gradient-to-br from-brand-purple/[0.06] to-brand-maroon/[0.05] p-7 ring-1 ring-black/5 sm:p-8"
                >
                  <a
                    href={pub.href ?? "#"}
                    className="font-display inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl leading-snug text-transparent"
                  >
                    {pub.title}
                    <ExternalLink className="h-4 w-4 shrink-0 text-brand-purple" />
                  </a>
                  <p className="mt-2 text-sm font-medium italic text-gray-700">{pub.journal}</p>

                  <div className="mt-5">
                    <p className="text-sm font-semibold text-teal-deep">The Challenge</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{pub.challenge}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-teal-deep">The Approach</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{pub.approach}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-teal-deep">{pub.resultLabel}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{pub.result}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                View More Research Papers <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ---------- Sharing Insights (Global Presentations) ---------- */}
        <section className="bg-gradient-to-b from-[#faf1ee] to-[#f6e6e2] px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Global Presentations</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Sharing Insights on the World Stage
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{presentationsIntro}</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {presentations.map((item, i) => (
                <article
                  key={item.title}
                  className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div className="bg-brand-gradient flex h-48 items-center justify-center">
                    {i === 0 ? (
                      <Globe2 className="h-14 w-14 text-white/90" />
                    ) : (
                      <Presentation className="h-14 w-14 text-white/90" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl leading-snug text-transparent">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/about"
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Learn More About Madhavbaug <ArrowUpRight className="h-4 w-4" />
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
