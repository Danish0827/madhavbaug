import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import StickyTabs, { type TabItem } from "@/components/treatment/StickyTabs";
import Accordion from "@/components/treatment/Accordion";
import FaqSection from "@/components/FaqSection";
import ApproachCarousel from "@/components/treatment/ApproachCarousel";
import TestsCarousel from "@/components/treatment/TestsCarousel";
import WhyChooseCarousel from "@/components/treatment/WhyChooseCarousel";
import PatientJourney from "@/components/treatment/PatientJourney";
import { fetchTreatmentBySlug } from "@/lib/treatments";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

type Params = { params: Promise<{ slug: string }> };

const TABS: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "conditions", label: "Conditions" },
  { id: "eligibility", label: "Eligibility" },
  { id: "our-approach", label: "Our Approach" },
  { id: "patient-journey", label: "Patient Journey" },
  { id: "tests", label: "Tests" },
  { id: "why-choose-us", label: "Why Choose Us" },
  { id: "case-study", label: "Case Study" },
  { id: "research", label: "Research" },
  { id: "faqs", label: "FAQs" },
];

const PROSE =
  "text-sm leading-relaxed text-gray-600 [&_p]:mb-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-2 [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-brand-purple [&_a]:underline";

const SECTION = "scroll-mt-40 ";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const t = await fetchTreatmentBySlug(slug).catch(() => null);
  if (!t) return { title: "Treatment | Madhavbaug" };
  return {
    title: `${t.title} Treatment | Madhavbaug`,
    description: t.overview.description,
  };
}

export default async function TreatmentPage({ params }: Params) {
  const { slug } = await params;
  const t = await fetchTreatmentBySlug(slug).catch(() => null);
  if (!t) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero ---------- */}
        <PageBanner
          backgroundImage={t.banner.image}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
            { label: t.title },
          ]}
          title={t.banner.heading}
          description=""
        />
        {/* Stat cards */}
        {t.banner.cards.length > 0 && (
          <div className="pt-30 px-5 sm:px-8 lg:px-20">
            <div className="mx-auto -mt-14 w-full container">
              <div className="grid gap-5 sm:grid-cols-3">
                {t.banner.cards.map((c) => (
                  <div
                    key={c.heading}
                    className="bg-[#892FAC]/10 rounded-4xl px-6 py-10 flex gap-10  text-black shadow"
                  >
                    <p className="font-display text-3xl lg:text-4xl">{c.number}</p>
                    <p className="mt-2 text-lg font-display text-black">{c.heading}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- Sticky section tabs ---------- */}
        <StickyTabs tabs={TABS} />

        {/* ---------- Overview ---------- */}
        <section id="overview" className={`${SECTION} py-10 lg:py-20`}>
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            {(t.eligibility.image || t.conditions.image) && (
              <div className="relative w-full lg:w-[90%] mx-auto overflow-hidden rounded-4xl ring-1 ring-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={t.eligibility.image || t.conditions.image}
                  alt={t.title}
                  className="h-full w-full object-cover"
                  width={1000}
                  height={1000}
                  loading="lazy"
                />
              </div>
            )}
            <div>
              <SectionLabel>{t.overview.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.overview.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 lg:text-base">
                {t.overview.description}
              </p>
              <a
                href={t.overview.button.url}
                className="btn-gradient mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                {t.overview.button.title} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Conditions ---------- */}
        <section id="conditions" className={`${SECTION}  py-10 lg:py-20`}>
          <div className="mx-auto w-full container">
            <div className="">
              <SectionLabel>{t.conditions.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.conditions.title}
              </h2>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              {t.conditions.image && (
                <div className="relative aspect-square overflow-hidden rounded-[32px] ring-1 ring-black/5 lg:sticky lg:top-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.conditions.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              <Accordion items={t.conditions.items.map((c) => ({ title: c.title, body: c.description }))} />
            </div>
          </div>
        </section>

        {/* ---------- Eligibility (reversed: image left, content right) ---------- */}
        <section id="eligibility" className={`${SECTION} py-14 lg:py-20`}>
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            {t.eligibility.image && (
              <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-black/5 lg:order-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.eligibility.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="order-1 lg:order-2">
              <SectionLabel>{t.eligibility.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.eligibility.title}
              </h2>
              <div
                className={`mt-5 [&_li]:mb-3 [&_li]:pl-1 [&_ul]:space-y-2 ${PROSE} [&_ul]:list-none [&_ul]:pl-0`}
                dangerouslySetInnerHTML={{ __html: t.eligibility.listHtml }}
              />
            </div>
          </div>
        </section>

        {/* ---------- Our Approach ---------- */}
        <section id="our-approach" className={`${SECTION} bg-surface-rose py-14 lg:py-20`}>
          <div className="mx-auto w-full container">
            <div className="max-w-3xl">
              <SectionLabel>{t.approach.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.approach.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{t.approach.description}</p>
            </div>
            <div className="mt-10">
              <ApproachCarousel items={t.approach.items} />
            </div>
          </div>
        </section>

        {/* ---------- Patient Journey ---------- */}
        <section id="patient-journey" className={`${SECTION} py-14 lg:py-20`}>
          <div className="mx-auto w-full container">
            <div className="max-w-3xl">
              <SectionLabel>{t.journey.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.journey.title}
              </h2>
            </div>
            <div className="mt-12">
              <PatientJourney steps={t.journey.steps} />
            </div>
          </div>
        </section>

        {/* ---------- Tests ---------- */}
        <section id="tests" className={`${SECTION} bg-surface-lav py-14 lg:py-20`}>
          <div className="mx-auto w-full container">
            <div className="max-w-3xl">
              <SectionLabel>{t.tests.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.tests.title}
              </h2>
            </div>
            <div className="mt-10">
              <TestsCarousel cards={t.tests.cards} />
            </div>
          </div>
        </section>

        {/* ---------- Why Choose Us ---------- */}
        <section id="why-choose-us" className={`${SECTION} py-14 lg:py-20`}>
          <div className="mx-auto w-full container">
            <div className="max-w-3xl">
              <SectionLabel>{t.whyChoose.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.whyChoose.title}
              </h2>
            </div>
            <div className="mt-10">
              <WhyChooseCarousel cards={t.whyChoose.cards} />
            </div>
          </div>
        </section>

        {/* ---------- Case Study ---------- */}
        <section id="case-study" className={`${SECTION} bg-brand-gradient py-14 text-white lg:py-20`}>
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 text-base font-medium text-white/80">
                {t.caseStudy.eyebrow}
              </span>
              <h2 className="font-display mt-4 text-2xl leading-snug lg:text-[32px]">
                {t.caseStudy.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/85">{t.caseStudy.description}</p>
            </div>
            {t.caseStudy.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-white/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.caseStudy.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </section>

        {/* ---------- Research ---------- */}
        <section id="research" className={`${SECTION} py-14 lg:py-20`}>
          <div className="mx-auto w-full container">
            <div className="max-w-3xl">
              <SectionLabel>{t.research.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                {t.research.title}
              </h2>
            </div>
            <div className={`mt-6 max-w-4xl ${PROSE}`} dangerouslySetInnerHTML={{ __html: t.research.contentHtml }} />
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={t.research.bookBtn.url}
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                {t.research.bookBtn.title} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={t.research.findBtn.url}
                className="inline-flex items-center gap-2 rounded-full border border-brand-purple/40 px-6 py-3 text-sm font-medium text-brand-purple transition-colors hover:bg-brand-purple/5"
              >
                <MapPin className="h-4 w-4" /> {t.research.findBtn.title}
              </a>
            </div>
            {t.research.disclaimer && (
              <p className="mt-8 rounded-2xl bg-surface-lav px-5 py-4 text-xs leading-relaxed text-gray-500">
                {t.research.disclaimer}
              </p>
            )}
          </div>
        </section>

        {/* ---------- FAQs (shared site-wide component) ---------- */}
        <FaqSection
          id="faqs"
          items={t.faqs.items}
          eyebrow={t.faqs.eyebrow}
          title={t.faqs.title}
          className="bg-surface-lav"
          defaultOpen={-1}
        />

        {/* ---------- References ---------- */}
        {t.references.contentHtml && (
          <section className="px-5 py-12 sm:px-8 lg:px-20">
            <div className="mx-auto w-full container">
              <h3 className="font-display text-lg text-ink">{t.references.eyebrow}</h3>
              <div
                className="mt-4 text-xs leading-relaxed text-gray-500 [&_a]:break-words [&_a]:text-brand-purple [&_a]:underline [&_em]:italic [&_p]:mb-3 [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: t.references.contentHtml }}
              />
            </div>
          </section>
        )}

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
