import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import PageBanner from "@/components/PageBanner";
import {
  powermapHero,
  powermapIntro,
  careSection,
  howItWorks,
  benefitsSection,
  privacySection,
} from "@/data/powermap";

export const metadata: Metadata = {
  title: "PowerMAP Technology | Madhavbaug",
  description:
    "Madhavbaug PowerMAP (Medical Analysis Panel) - India's first smart medical command centre connecting your daily vitals to a team of doctors for continuous, 24/7 chronic disease reversal care.",
};

const LOCATOR = "/clinic-hospital-locator";

function ConsultButton({ label, variant = "gradient" }: { label: string; variant?: "gradient" | "solid" }) {
  return (
    <Link
      href={LOCATOR}
      className={`inline-flex w-fit items-center gap-2 rounded-full py-3 pr-2.5 pl-5 text-sm font-medium shadow-md transition-shadow hover:shadow-lg ${
        variant === "gradient" ? "btn-gradient text-white" : "bg-brand-purple text-white"
      }`}
    >
      {label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function PowerMapPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          backgroundImage="/assets/powermap/hero.png"
          breadcrumbs={powermapHero.breadcrumbs}
          title={powermapHero.title}
          description=""
        />

        {/* ---------- PowerMAP intro (app image + text) ---------- */}
        <section className="px-5 pt-16 pb-14 sm:px-8 lg:px-20 lg:pt-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-[#eaf3fb] to-[#dcecf8] lg:min-h-[380px]">
              <Image
                src={powermapIntro.image}
                alt="mibPULSE app"
                fill
                priority
                className="object-contain p-6"
                sizes="(max-width:1024px) 100vw, 600px"
              />
            </div>
            <div>
              <SectionLabel>{powermapIntro.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[30px]">
                {powermapIntro.heading}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-gray-600 lg:text-base">
                {powermapIntro.description}
              </p>
              <div className="mt-6">
                <ConsultButton label={powermapIntro.cta} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Go Beyond Standard Care (peach card + photo) ---------- */}
        <section className="px-5 pb-14 sm:px-8 lg:px-20">
          <div className="mx-auto grid w-full container items-stretch gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] bg-[#f6e6e2] p-8 sm:p-10">
              <SectionLabel>{careSection.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[30px]">
                {careSection.heading}
              </h2>
              {careSection.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-sm leading-relaxed text-black/70">{p}</p>
              ))}
              <div className="mt-7">
                <ConsultButton label={careSection.cta} variant="solid" />
              </div>
            </div>
            <div className="relative min-h-72 overflow-hidden rounded-[30px] ring-1 ring-black/5 lg:min-h-[440px]">
              <Image src={careSection.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 560px" />
            </div>
          </div>
        </section>

        {/* ---------- How it Works (2x2 image cards) ---------- */}
        <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-4xl text-center">
              <div className="flex justify-center">
                <SectionLabel>{howItWorks.eyebrow}</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{howItWorks.heading}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
                {howItWorks.description}
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {howItWorks.cards.map((c) => (
                <article key={c.title} className="flex flex-col overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5">
                  <div className="relative h-56 w-full">
                    <Image src={c.image} alt={c.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 620px" />
                  </div>
                  <div className="flex flex-1 flex-col bg-gradient-to-br from-[#006589] to-[#3d4281] p-7">
                    <h3 className="font-display text-xl text-white">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{c.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Benefits (app image + checklist) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 flex min-h-72 items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-[#eaf3fb] to-[#dcecf8] lg:order-1 lg:min-h-[460px]">
              <Image src={benefitsSection.image} alt="mibPULSE app" fill className="object-contain p-6" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
            <div className="order-1 lg:order-2">
              <SectionLabel>{benefitsSection.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{benefitsSection.heading}</h2>
              <ul className="mt-6 space-y-5">
                {benefitsSection.items.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#006589] to-[#3d4281] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-relaxed text-gray-600">
                      <span className="font-semibold text-ink">{item.title}</span>{" "}
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Privacy (peach card + photo) ---------- */}
        <section className="px-5 pb-16 sm:px-8 lg:px-20 lg:pb-20">
          <div className="mx-auto grid w-full container items-stretch gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-center rounded-[30px] bg-[#f6e6e2] p-8 sm:p-10">
              <SectionLabel>{privacySection.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[30px]">
                {privacySection.heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-black/70 lg:text-base">
                {privacySection.description}
              </p>
            </div>
            <div className="relative min-h-72 overflow-hidden rounded-[30px] ring-1 ring-black/5 lg:min-h-[300px]">
              <Image src={privacySection.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 690px" />
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
