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
import HeroBreadcrumb from "@/components/HeroBreadcrumb";

export const metadata: Metadata = {
  title: "Dr. Rohit Sane — Founder | Madhavbaug",
  description:
    "Dr Rohit Madhav Sane, Founder, MD of Madhavbaug — MBBS with a fellowship in cardiac rehabilitation, pioneering evidence-based Ayurveda for chronic disease reversal.",
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
    number: "Global Advocacy",
    title: "",
    description:
      "Actively presenting data-driven proof of heart disease and diabetes reversal to the global scientific community.",
  },
];

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBreadcrumb
          image="/assets/founder/rohit.webp"
          imageAlt="Our Founder"
          heroTitle="Dr Rohit Madhav Sane"
          heroDescription={`<p className="mt-3 text-lg text-white/90">
                              Founder, Managing Director Madhavbaug
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              MBBS | Fellowship in Cardiac Rehabilitation (FCR)
                            </p>
                            <p className="mt-5 max-w-xl text-sm  text-white/80 lg:text-base">
                              &ldquo;Our mission is to build a complete global healthcare ecosystem where Ayurveda,
                              backed by modern scientific research, stands as a primary, safe, and effective line of
                              treatment for chronic diseases.&rdquo;
                            </p>`}
          pageTitle="Our Founder"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dr Rohit Madhav Sane" },
          ]}
          primaryButton={{
            label: "Book a Consultation",
            href: "/contact",
          }}
          secondaryButton={null}
        />
        {/* ---------- Hero ---------- */}

        {/* ---------- The Madhavbaug Story (text left + image right) ---------- */}
        <section className="px-3 sm:px-5 lg:px-10 ">
          <div className="mx-auto grid w-full container items-stretch gap-5 lg:gap-0 lg:grid-cols-[55%_45%]">
            <div style={{ backgroundImage: `url('/assets/work-2.webp')` }} className="bg-cover order-2 lg:order-1 bg-no-repeat rounded-4xl lg:rounded-none lg:rounded-l-4xl p-8 sm:p-10">
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
            href="clinic-hospital-locator"
            className="inline-flex items-center group mt-5"
          >
            <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
            Book a Consultation
            </span>
            <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRight className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
            </span>
          </Link>
          
            </div>
            <div className="relative overflow-hidden rounded-4xl lg:rounded-none lg:rounded-r-4xl order-1 lg:order-2 ring-black/5">
              <Image src="/assets/founder/story.png" alt="Madhavbaug clinic team" width={1000} height={1000} className="object-cover w-full h-100 lg:h-170 xl:h-150 2xl:h-120" />
            </div>
          </div>
        </section>

        {/* ---------- Bridging (image left + text right) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 w-full xl:w-[90%] mx-auto h-full overflow-hidden rounded-[30px] ring-1 ring-black/5 lg:order-1">
              <Image src="/assets/founder/bridging.png" alt="Bridging modern medicine and Ayurveda" width={1000} height={1000} className="object-cover w-full h-full" />
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
