import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  Eye,
  Target,
  FlaskConical,
  HeartHandshake,
  Leaf,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import FindCentre from "@/components/FindCentre";
import SectionLabel from "@/components/ui/SectionLabel";
import PageBanner from "@/components/PageBanner";
import {
  aboutFeatures,
  aboutCoreValues,
  aboutStats,
  aboutPillars,
  aboutValues,
} from "@/data/about";
import HeroBreadcrumb from "@/components/HeroBreadcrumb";
import { about } from "@/data/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Madhavbaug | Where Ayurveda Meets Modern Diagnostics",
  description:
    "Madhavbaug is the pioneer in evidence-based holistic care — combining time-tested Ayurveda with modern diagnostics for non-surgical chronic disease reversal.",
};

const FEATURE_ICONS = { Eye, Target, FlaskConical, HeartHandshake, Leaf };
const TEAL = "bg-gradient-to-br from-[#006589] to-[#3d4281]";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero ---------- */}
        <HeroBreadcrumb
          image="/assets/images/about.webp"
          imageAlt="About Madhavbaug"
          heroTitle="Madhavbaug: Where Time-Tested Ayurveda Meets the Latest in Diagnostics"
          heroDescription="<p>The Pioneer in Evidence-Based Holistic Care</p>"
          pageTitle="About Madhavbaug"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
          primaryButton={{
            label: "Explore the Madhavbaug Approach to Treatment",
            href: "/about",
          }}
          secondaryButton={null}
        />
        {/* <PageBanner
          backgroundImage="/assets/about/hero.png"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
          title="About Madhavbaug"
          description="Where Time-Tested Ayurveda Meets the Latest in Diagnostics — the pioneer in evidence-based holistic care."
        /> */}

        {/* ---------- Benefits / Vision-Mission-Values ---------- */}
        <section className="px-5 pt-24 pb-14 sm:px-8 lg:px-10 lg:pt-10">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[32px] ring-1 ring-black/5 h-full object-cover">
              <Image src="/assets/about/feature.png" alt="Madhavbaug care" width={1200} height={1200} className="object-cover w-full h-full" />
            </div>
            <div className="py-2">
              <SectionLabel>Benefits</SectionLabel>
              <h2 className="font-display my-4 text-2xl leading-snug text-ink lg:text-[32px]">
                Driven by Purpose, Backed by Science
              </h2>

              <div className="mt-6 space-y-5">
                {aboutFeatures.map((f) => {
                  const Icon = FEATURE_ICONS[f.icon as keyof typeof FEATURE_ICONS];
                  return (
                    <div key={f.title} className="flex gap-4">
                      <span className="bg-brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-ink">{f.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{f.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Core Values card */}
              <div className="mt-6 rounded-[24px] bg-stat-card p-6 ring-1 ring-brand-purple/10">
                <span className="inline-flex rounded-full bg-gradient-to-r from-[#6f58a5] to-[#892fac] px-4 py-1.5 mb-2 text-xs font-semibold text-white">
                  Core Values
                </span>
                <ul className="mt-4 space-y-5">
                  {aboutCoreValues.map((v) => {
                    const Icon = FEATURE_ICONS[v.icon as keyof typeof FEATURE_ICONS];
                    return (
                      <li key={v.label} className="flex gap-3 text-sm text-gray-700">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                        <span>
                          <span className="font-semibold text-ink">{v.label}:</span> {v.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white pt-10 pb-16 lg:pb-24 px-5 sm:px-8 lg:px-10">
          <div className="mx-auto grid h-full w-full container items-stretch gap-5 lg:gap-0 lg:grid-cols-[55%_45%]">
            {/* Gradient copy card */}
            <div className="bg-linear-120 h-full from-[#006589] to-[#3D4281] flex flex-col justify-center rounded-4xl lg:rounded-r-none lg:rounded-l-4xl p-8 text-white sm:p-10 lg:p-12">
              {/* <SectionLabel tone="light">{about.eyebrow}</SectionLabel> */}
              <h2 className="font-display mt-4 text-2xl leading-snug sm:text-[30px]">
                The Visionary Behind the Movement
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/90 lg:text-base">
                &ldquo;Our mission is to build a complete global healthcare ecosystem where Ayurveda,
                backed by modern scientific research, stands as a primary, safe, and effective line of
                treatment for chronic diseases.&rdquo;
              </p>
              <p className="mt-2 text-sm font-medium text-white/80">— Dr Rohit Madhav Sane</p>
              <p className="mt-5 text-sm leading-relaxed text-white/80">
                Madhavbaug was founded in 2006 by Dr Rohit Madhav Sane (Founder, MD &amp; CEO) as a
                tribute to his father, a dedicated Ayurvedic practitioner. Dr Sane holds an MBBS
                degree and a fellowship in cardiac rehabilitation.
              </p>
              <div className="mt-8">
                <Link
                  href="{about.cta.href}"
                  className="inline-flex items-center group"
                >
                  <span className="bg-white group-hover:bg-white/90 text-[rgb(137,47,172)] group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                    Read more about Dr. Sane Here
                  </span>
                  <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight className="font-thin w-full h-full p-2 rounded-full bg-white group-hover:bg-white/90 group-hover:rotate-45 group-hover:shadow-xl duration-300 text-[rgb(137,47,172)] shadow-lg" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Founder photo with floating pills */}
            <div className="relative h-fit rounded-r-4xl">
              <Image
                src="/assets/dr-sane.png"
                alt={about.doctor.name}
                width={1900}
                height={1900}
                className="object-cover w-full h-100 lg:h-150 xl:h-120 object-top rounded-4xl lg:rounded-l-none lg:rounded-r-4xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-4xl lg:rounded-l-none lg:rounded-r-4xl" />
              {/* Name plate */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-white ">
                <p className="font-display text-2xl">{about.doctor.name}</p>
                <p className="mt-1 text-xs text-white/80">{about.doctor.title}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Our Journey + stats ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="py-5">
              <SectionLabel>Our Journey</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                From a Single Clinic to India's Trusted Cardiac Care Network
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600 lg:text-base">
                <p>
                  The journey of Madhavbaug began with a fundamental question: Is surgery the only
                  answer to heart disease?
                </p>
                <p>
                  Recognising the immense emotional, physical, and financial toll that invasive
                  cardiac procedures take on families, we set out to find a better way. We pioneered a
                  revolutionary medical path: Ideomedical Therapy, which seamlessly fuses the deep
                  healing mechanisms of Ayurveda with modern diagnostic precision, evidence-based
                  diets, and structured physiotherapy.
                </p>
                <p>
                  What started as a single visionary clinic for heart disease treatment has grown into
                  a nationwide movement, transforming chronic disease reversal across India.
                </p>
              </div>
            </div>
            <div className="relative h-full overflow-hidden rounded-[32px] ring-1 ring-black/5">
              <Image src="/assets/about/journey.png" alt="Madhavbaug journey" width={1200} height={1200} className="object-cover w-full h-full"/>
            </div>
          </div>

          <div className="mx-auto mt-10 grid w-full container gap-5 sm:grid-cols-3">
            {aboutStats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 rounded-[24px] bg-stat-card p-6 ring-1 ring-brand-purple/10">
                <p className="font-display text-3xl text-black lg:text-4xl">{s.number}</p>
                <p className="font-display text-base text-ink">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- 4 Pillars ---------- */}
        <section className="bg-cover bg-no-repeat bg-center px-5 py-14 sm:px-8 lg:px-20 lg:py-20" style={{ backgroundImage: "url('/ASSETS/work-bg.WEBP')" }}>
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>The Madhavbaug Way</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                The 4 Pillars of Non-Invasive Recovery
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                We believe the human body has an extraordinary capacity to heal when provided with the
                right scientific guidance. Our treatment protocols do not merely manage disease; they
                actively work to restore your nervous system and health to their optimum function.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutPillars.map((p) => (
                <article key={p.title} className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-black/5">
                  <div className="relative h-48 w-full">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width:640px) 100vw, 320px" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-lg leading-snug text-transparent">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed font-normal text-gray-600">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Get to know us (Leadership cards) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>About Us</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Get to Know Madhavbaug Better
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {aboutValues.map((v) => (
                <article key={v.title} className="overflow-hidden rounded-[24px] shadow-sm ring-1 ring-black/5">
                  <div className="relative h-70 w-full">
                    <Image src={v.image} alt={v.title} fill className="object-cover" sizes="(max-width:640px) 100vw, 400px" />
                  </div>
                  <div className={`${TEAL} p-6 text-white`}>
                    <h3 className="font-display text-xl lg:text-2xl">{v.title}</h3>
                    <p className="mt-2 text-sm font-normal leading-relaxed text-white/85">{v.description}</p>
                    
                    <div className="mt-5">
                <Link
                 href={v.href}
                  className="inline-flex items-center group"
                >
                  <span className="bg-white group-hover:bg-white/90 text-[rgb(137,47,172)] group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium  shadow-lg">
                   Learn More
                  </span>
                  <span className="flex  w-fit h-8.5 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight className="font-thin w-full h-full p-2 rounded-full bg-white group-hover:bg-white/90 group-hover:rotate-45 group-hover:shadow-xl duration-300 text-[rgb(137,47,172)] shadow-lg" />
                  </span>
                </Link>
              </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Locate a Centre ---------- */}
        <FindCentre />

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
