import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import PageBanner from "@/components/PageBanner";
import FaqSection from "@/components/FaqSection";
import { dietHero, dietOverview, dietKits, whyItWorks, dietFaqs, type DietKit } from "@/data/dietPlans";

export const metadata: Metadata = {
  title: "Personalized Diet Kits & Plans | Madhavbaug",
  description:
    "Scientifically designed, easy-to-follow Madhavbaug diet kits and nutritional plans to lower blood sugar, manage blood pressure and protect your heart - food as medicine.",
};

const CONSULT_HREF = "/clinic-hospital-locator";

function ConsultButton({ label = "Consult a Madhavbaug expert", href = CONSULT_HREF }: { label?: string; href?: string }) {
  return (
    <Link
      href={href}
      className="btn-gradient inline-flex w-fit items-center gap-2 rounded-full py-3 pr-2.5 pl-5 text-sm font-medium text-white shadow-md transition-shadow hover:shadow-lg"
    >
      {label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function DietKitCard({ kit }: { kit: DietKit }) {
  const media = (
    <div className="flex flex-col gap-4 lg:h-full">
      {kit.images.map((src, i) => (
        <div key={i} className="relative min-h-56 flex-1 overflow-hidden rounded-[24px]">
          <Image src={src} alt={kit.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 460px" />
        </div>
      ))}
    </div>
  );

  const info = (
    <div className="flex flex-col p-7 sm:p-9">
      <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl text-transparent sm:text-2xl">
        {kit.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{kit.description}</p>

      <p className="mt-5 bg-gradient-to-r from-[#006589] to-[#3d4281] bg-clip-text text-sm font-semibold text-transparent">
        How it works
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{kit.howItWorks}</p>

      <p className="mt-5 bg-gradient-to-r from-[#006589] to-[#3d4281] bg-clip-text text-sm font-semibold text-transparent">
        What&apos;s Inside the Kit:
      </p>
      <ul className="mt-3 space-y-2.5">
        {kit.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
            <span>
              <span className="font-semibold text-ink">{b.term}</span>
              {b.rest}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <ConsultButton />
      </div>
    </div>
  );

  return (
    <article className="grid overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-black/5 lg:grid-cols-[460px_1fr]">
      {kit.imageSide === "left" ? (
        <>
          <div className="p-5 lg:p-6">{media}</div>
          {info}
        </>
      ) : (
        <>
          <div className="order-first p-7 sm:p-9 lg:order-last lg:col-start-2">{info}</div>
          <div className="p-5 lg:col-start-1 lg:row-start-1 lg:p-6">{media}</div>
        </>
      )}
    </article>
  );
}

export default function DietPlansPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          backgroundImage="/assets/diet/hero.png"
          breadcrumbs={dietHero.breadcrumbs}
          title={dietHero.title}
          description=""
        />

        {/* ---------- Overview ---------- */}
        <section className="px-5 pt-16 pb-14 sm:px-8 lg:px-20 lg:pt-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative h-72 w-full overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 lg:h-[420px]">
              <Image src={dietOverview.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
            <div>
              <SectionLabel>{dietOverview.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[34px]">{dietOverview.title}</h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-gray-700 lg:text-base">{dietOverview.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{dietOverview.body}</p>
              <div className="mt-6">
                <ConsultButton label={dietOverview.cta} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Madhavbaug Diet Kits ---------- */}
        <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Diet Kits &amp; Plans</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">Madhavbaug Diet Kits</h2>
            </div>
            <div className="mt-10 space-y-8">
              {dietKits.map((kit) => (
                <DietKitCard key={kit.title} kit={kit} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Why Madhavbaug Diets Work ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 h-72 w-full overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 lg:order-1 lg:h-[460px]">
              <Image src={whyItWorks.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
            <div className="order-1 lg:order-2">
              <SectionLabel>{whyItWorks.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[34px]">{whyItWorks.title}</h2>
              <ul className="mt-6 space-y-5">
                {whyItWorks.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#006589] to-[#3d4281] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-relaxed text-gray-600">
                      <span className="font-semibold text-ink">{p.term}</span>
                      {p.rest}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ConsultButton label="Get My Customized Diet Plan" href="/clinic-hospital-locator" />
                <Link
                  href={CONSULT_HREF}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-purple/40 px-5 py-3 text-sm font-medium text-brand-purple transition-colors hover:bg-brand-purple/5"
                >
                  Consult a Madhavbaug expert <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FAQs ---------- */}
        <FaqSection
          items={dietFaqs}
          title="Common Questions About Madhavbaug's Diet Kits"
          className="bg-surface-lav"
        />

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
