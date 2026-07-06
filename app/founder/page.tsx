import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Dr. Rohit Sane — Founder | Madhavbaug",
  description:
    "Dr Rohit Madhav Sane, Founder, MD & CEO of Madhavbaug — MBBS with a fellowship in cardiac rehabilitation, pioneering evidence-based Ayurveda for chronic disease reversal.",
};

const founderStats = [
  {
    number: "150+",
    title: "Peer-Reviewed Research Papers",
    description:
      "Published and presented across top national and international medical journals/conferences.",
  },
  {
    number: "10,000+",
    title: "Doctors Trained",
    description:
      "Over the last two decades, equipping thousands of Ayurvedic practitioners with specialised certifications in non-invasive chronic disease management.",
  },
  {
    number: "",
    title: "Global Advocacy",
    description:
      "Actively presenting data-driven proof of heart disease and diabetes reversal to the global scientific community.",
  },
];

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero ---------- */}
        <section className="bg-brand-gradient relative overflow-hidden pt-28 pb-40 text-white lg:pt-36 lg:pb-48">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
          <div className="relative mx-auto grid w-full container items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.75fr_1fr] lg:px-20">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[32px] ring-4 ring-white/20">
              <Image src="/assets/founder/portrait.png" alt="Dr. Rohit Sane" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 400px" priority />
            </div>
            <div>
              <h1 className="font-display text-3xl leading-tight sm:text-4xl lg:text-[44px]">
                Dr Rohit Madhav Sane
              </h1>
              <p className="mt-3 text-lg text-white/90">
                Founder, Managing Director &amp; CEO, Madhavbaug
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                MBBS | Fellowship in Cardiac Rehabilitation (FCR)
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 lg:text-base">
                &ldquo;Our mission is to build a complete global healthcare ecosystem where Ayurveda,
                backed by modern scientific research, stands as a primary, safe, and effective line of
                treatment for chronic diseases.&rdquo;
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/clinic-hospital-locator"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-brand-purple shadow-lg transition-shadow hover:shadow-xl"
                >
                  Book a Consultation <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <FaWhatsapp className="h-4 w-4" /> Chat With Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb pill */}
        <div className="relative z-10 mx-auto -mt-28 w-full max-w-[840px] px-4">
          <div className="rounded-[28px] bg-white px-6 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-10 lg:rounded-[91px]">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <Link href="/" className="text-[#7c44a8] hover:underline">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <Link href="/about" className="text-[#7c44a8] hover:underline">Our Founders</Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-[#2b2b2b]">Dr Rohit Madhav Sane</span>
            </nav>
            <h2 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl lg:text-[40px]">
              Our Founder
            </h2>
          </div>
        </div>

        {/* ---------- The Madhavbaug Story (text left + image right) ---------- */}
        <section className="px-5 pt-24 pb-14 sm:px-8 lg:px-20 lg:pt-28">
          <div className="mx-auto grid w-full container items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[30px] bg-[#f6e6e2] p-8 sm:p-10">
              <SectionLabel>The Genesis of Madhavbaug</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[30px]">
                The Madhavbaug Story
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-black/70">
                Inspired by his father, Vd Madhav Sane (a dedicated Ayurvedic practitioner who treated
                patients through Panchakarma and lifestyle changes), Dr Rohit Sane grew up witnessing
                the profound power of traditional Ayurveda. However, the sudden and tragic loss of his
                father to a heart attack became a pivotal turning point, exposing a critical gap in
                healthcare: modern invasive treatments were often too expensive or came too late, while
                traditional Ayurveda lacked the scientific data to be widely trusted by mainstream
                medicine. Motivated by this personal grief and determined to honour his father&rsquo;s
                legacy, Dr Rohit vowed to bridge these two worlds. In 2006, he founded Madhavbaug,
                combining modern diagnostic tools with evidence-based Ayurvedic protocols to create a
                safe, non-invasive, and scientifically proven path to cardiac wellness, in time
                applying this approach to chronic disease reversal. Today, his vision has spread across
                350+ clinics &amp; hospitals, 650+ specialists, and 1,000,000+ patients.
              </p>
              <Link
                href="/clinic-hospital-locator"
                className="btn-gradient mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Book a Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[30px] ring-1 ring-black/5">
              <Image src="/assets/founder/story.png" alt="Madhavbaug clinic team" fill className="object-cover" sizes="(max-width:1024px) 100vw, 555px" />
            </div>
          </div>
        </section>

        {/* ---------- Bridging (image left + text right) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 aspect-[590/482] overflow-hidden rounded-[30px] ring-1 ring-black/5 lg:order-1">
              <Image src="/assets/founder/bridging.png" alt="Bridging modern medicine and Ayurveda" fill className="object-cover" sizes="(max-width:1024px) 100vw, 590px" />
            </div>
            <div className="order-1 lg:order-2">
              <SectionLabel>Academic Background &amp; The &ldquo;Ideomedical&rdquo; Concept</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[30px]">
                Bridging Modern Medicine and Ancient Wisdom
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-black/70 lg:text-base">
                Dr Rohit Sane began his medical career deeply rooted in mainstream modern medicine,
                earning his MBBS degree and completing a specialised fellowship in cardiac
                rehabilitation. Rather than seeing modern science and traditional healing as opposites,
                he chose to combine them. He used his background in Western diagnostics to rigorously
                test and prove the healing power of ancient Ayurvedic treatments. This journey led to a
                major medical breakthrough created just for patients like you: Integrative Medicine.
                This unique approach uses advanced medical testing, like stress tests and continuous
                monitoring, to measure exactly how your body responds to customised diets, specialised
                exercises, and Ayurvedic care. By tracking your progress with real-time scientific data,
                Dr Sane bridged the gap between tradition and science, giving you a proven, measurable,
                and entirely non-surgical path back to health.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Standardizing Ayurveda (stats) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Academic Contributions &amp; Research Footprint</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[30px]">
                Standardizing Ayurveda Through Clinical Data with Dr Sane
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {founderStats.map((s) => (
                <div key={s.title} className="rounded-[30px] bg-stat-card p-7 ring-1 ring-brand-purple/10">
                  {s.number ? (
                    <p className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-4xl text-transparent">
                      {s.number}
                    </p>
                  ) : null}
                  <h3 className={`font-display text-xl text-ink ${s.number ? "mt-3" : ""}`}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                </div>
              ))}
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
