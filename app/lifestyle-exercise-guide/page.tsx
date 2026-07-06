import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import FaqSection from "@/components/FaqSection";
import ConditionCarousel from "@/components/lifestyle/ConditionCarousel";
import RoutineCarousel from "@/components/lifestyle/RoutineCarousel";
import {
  lifestyleHero,
  dangerSection,
  pillarsSection,
  conditionSection,
  routineSection,
  warningSection,
  lifestyleFaqs,
} from "@/data/lifestyle";

export const metadata: Metadata = {
  title: "Lifestyle & Exercise Guide | Madhavbaug",
  description:
    "A doctor-guided lifestyle and exercise guide from Madhavbaug - safe, personalised movement, daily routines and warning signs to help you heal naturally and reduce medications.",
};

export default function LifestyleExerciseGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero ---------- */}
        <section className="relative">
          <div className="bg-brand-gradient relative min-h-[440px] overflow-hidden lg:min-h-[560px]">
            <div className="absolute inset-0 hidden lg:block">
              <Image
                src="/assets/lifestyle/hero.png"
                alt="Madhavbaug lifestyle and exercise"
                fill
                priority
                className="object-cover object-left"
                sizes="100vw"
              />
            </div>
            <div className="relative mx-auto w-full container px-5 py-16 sm:px-8 lg:px-20 lg:py-24">
              <div className="lg:ml-auto lg:w-1/2 lg:pl-6">
                <h1 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-[38px]">
                  {lifestyleHero.heading}
                </h1>
                {lifestyleHero.intro.map((p, i) => (
                  <p key={i} className="mt-4 text-sm leading-relaxed text-white/80 lg:text-base">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Breadcrumb pill */}
          <div className="relative z-10 mx-auto -mt-12 w-full max-w-[900px] px-4 lg:-mt-16">
            <div className="rounded-[28px] bg-white px-6 py-7 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] sm:px-10 lg:rounded-[56px]">
              <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm">
                {lifestyleHero.breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
                    {item.href ? (
                      <Link href={item.href} className="text-[#7c44a8] hover:underline">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[#2b2b2b]">{item.label}</span>
                    )}
                  </div>
                ))}
              </nav>
              <h2 className="font-display mt-2 text-2xl text-ink lg:text-[32px]">
                {lifestyleHero.pillTitle}
              </h2>
            </div>
          </div>
        </section>

        {/* ---------- Why Generic Workouts Can Be Dangerous ---------- */}
        <section className="px-5 pt-16 pb-14 sm:px-8 lg:px-20 lg:pt-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionLabel>{dangerSection.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[34px]">
                {dangerSection.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-gray-600 lg:text-base">
                {dangerSection.text}
              </p>
              <div className="mt-6 rounded-2xl bg-[#006589]/[0.06] p-6 ring-1 ring-[#006589]/15">
                <p className="flex items-center gap-2 text-sm font-semibold text-teal-deep">
                  <Info className="h-4 w-4" /> {dangerSection.note.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{dangerSection.note.body}</p>
              </div>
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 lg:h-96">
              <Image
                src={dangerSection.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 600px"
              />
            </div>
          </div>
        </section>

        {/* ---------- The 3 Simple Pillars (grid) ---------- */}
        <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>{pillarsSection.eyebrow}</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                {pillarsSection.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{pillarsSection.subtitle}</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {pillarsSection.pillars.map((p) => (
                <article
                  key={p.title}
                  className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div className="relative h-52 w-full">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 400px" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl text-transparent">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{p.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Exercise Guides According to Your Condition (carousel) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="relative order-1 h-64 w-full overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 lg:h-80">
                <Image
                  src={conditionSection.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 600px"
                />
              </div>
              <div className="order-2">
                <SectionLabel>{conditionSection.eyebrow}</SectionLabel>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[34px]">
                  {conditionSection.title}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-gray-600 lg:text-base">
                  {conditionSection.intro}
                </p>
              </div>
            </div>
            <div className="mt-12">
              <ConditionCarousel guides={conditionSection.guides} />
            </div>
          </div>
        </section>

        {/* ---------- Your Ideal Daily Routine (carousel) ---------- */}
        <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>{routineSection.eyebrow}</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                {routineSection.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{routineSection.subtitle}</p>
            </div>
            <div className="mt-10">
              <RoutineCarousel cards={routineSection.cards} />
            </div>
          </div>
        </section>

        {/* ---------- When to Stop Exercising ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 h-72 w-full overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 lg:order-1 lg:h-[420px]">
              <Image
                src={warningSection.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 600px"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionLabel>{warningSection.eyebrow}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[34px]">
                {warningSection.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-gray-600">{warningSection.intro}</p>
              <ul className="mt-5 space-y-3">
                {warningSection.signs.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-brand-purple/[0.05] p-6 ring-1 ring-brand-purple/15">
                <p className="flex items-center gap-2 text-sm font-semibold text-brand-purple">
                  <AlertTriangle className="h-4 w-4" /> {warningSection.note.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{warningSection.note.body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FAQs (shared component) ---------- */}
        <FaqSection items={lifestyleFaqs} className="bg-surface-lav" />
        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
