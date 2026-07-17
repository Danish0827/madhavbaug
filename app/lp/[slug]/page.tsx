import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import LpHeader from "@/components/lp/LpHeader";
import HeroBreadcrumb from "@/components/HeroBreadcrumb";
import ConsultationCarousel from "@/components/lp/ConsultationCarousel";
import FaqSection from "@/components/FaqSection";
import FinalCTA from "@/components/FinalCTA";
import SectionLabel from "@/components/ui/SectionLabel";
import { fetchLandingBySlug } from "@/lib/treatments";

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;

  const t: any = await fetchLandingBySlug(slug).catch(() => null);

  const seo = t?.seo || {};

  return {
    title: seo.meta_title || "Madhavbaug",
    description: seo.meta_description || "",
    keywords: seo.meta_keywords || "",
  };
}
/* Shared rich-text styling for the CMS HTML fields. */
const PROSE =
  "text-sm leading-relaxed text-gray-600 lg:text-base [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-ink [&_b]:font-semibold [&_b]:text-ink [&_ul]:mt-4 [&_ul]:space-y-2.5 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[9px] [&_li]:before:h-2 [&_li]:before:w-2 [&_li]:before:rounded-full [&_li]:before:bg-brand-purple";

const PROSE_LIGHT =
  "text-sm leading-relaxed text-white/90 lg:text-base [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-white [&_b]:font-semibold [&_b]:text-white [&_ul]:mt-4 [&_ul]:space-y-2.5 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[9px] [&_li]:before:h-2 [&_li]:before:w-2 [&_li]:before:rounded-full [&_li]:before:bg-white/70";

function BookButton({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <Link href="#book" className="mt-7 inline-flex w-fit items-center group">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg ${
          light ? "bg-white text-[rgb(137,47,172)]" : "btn-gradient text-white"
        }`}
      >
        {label}
      </span>
      <span className="flex h-10 w-fit items-center justify-center rounded-full bg-white/20">
        <ArrowUpRight
          className={`h-full w-full rounded-full p-2.5 text-white shadow-lg duration-300 group-hover:rotate-45 group-hover:shadow-xl ${
            light ? "bg-white !text-[rgb(137,47,172)]" : "btn-gradient"
          }`}
        />
      </span>
    </Link>
  );
}

type Params = { params: Promise<{ slug: string }> };

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function LandingPage({ params }: Params) {
  const { slug } = await params;
  const t: any = await fetchLandingBySlug(slug).catch(() => null);
  if (!t) notFound();

  const care = t.care ?? {};
  const why = t.why_choose ?? {};
  const ob = t.obesity ?? {};
  const cons = t.consultation ?? {};
  const after = t.after_booking ?? {};
  const booking = t.booking ?? {};
  const counts: any[] = care.counts ?? [];

  // Disease-wise campaign name for the CRM, e.g. "obesity-care" -> "Obesity Landing Page".
  const disease = (slug.split("-")[0] || "").replace(/^\w/, (c) => c.toUpperCase());
  const leadCampaign = `${disease} Landing Page`;

  return (
    <div id="top" className="bg-white">
      <LpHeader />
      <main>
        {/* ---------- Hero + Form (banner) ---------- */}
        <HeroBreadcrumb
          image={t?.banner?.banner_image?.url}
          mobImage={t?.banner?.mobile_banner?.url}
          imageAlt={t?.banner?.banner_image?.alt || t?.banner?.banner_heading}
          heroTitle={t?.banner?.banner_heading}
          heroDescription={t?.banner?.banner_content}
          pageTitle="Book an Appointment"
          breadcrumbs={null}
          leadCampaign={leadCampaign}
          primaryButton={{ label: care.book_button?.title || "Book an Obesity Consultation", href: "#book" }}
          secondaryButton={null}
        />

        {/* ---------- Care ---------- */}
        <section id="why-madhavbaug" className="scroll-mt-24 px-5 py-10 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto grid w-full h-full container items-center gap-10 lg:grid-cols-[45%_55%]">
            {care.care_image?.url && (
              <div className="relative order-1 w-full xl:w-4/5 h-full mx-auto overflow-hidden rounded-[30px] shadow-sm ring-1 ring-black/5 ">
                <Image src={care.care_image.url} alt={care.care_title || ""} width={1000} height={1000} className="object-cover w-full h-full object-top" />
              </div>
            )}
            <div className="order-2">
              <SectionLabel>{care.care_title}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{care.care_main_title}</h2>
              <div className={`mt-5 ${PROSE}`} dangerouslySetInnerHTML={{ __html: care.care_information }} />
              {care.book_button?.title && <BookButton label={care.book_button.title} />}
            </div>
          </div>
        </section>

        {/* ---------- Stats (care.counts) ---------- */}
        {counts.length > 0 && (
          <section className="bg-white px-5 pb-14 sm:px-8 lg:px-10 lg:pb-20">
            <div className="mx-auto grid w-full container gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {counts.map((c, i) => (
                <div key={i} className="bg-stat-card rounded-[30px] p-6 ring-1 ring-brand-purple/10">
                  <p className="font-display text-3xl lg:text-2xl xl:text-3xl text-ink">{c.number}</p>
                  <p className="font-display mt-3 text-lg lg:text-base xl:text-lg text-ink">{c.heading}</p>
                  <p className="mt-2 text-sm lg:text-xs xl:text-base text-gray-500">{c.short_description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- Why Choose (gradient card + image) ---------- */}
        {/* {slug === "diabetes-doctor-near-me" || slug === "heart-specialist-near-me" && */}
        <section className="scroll-mt-24 bg-white px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto grid w-full container items-stretch gap-5 lg:grid-cols-[55%_45%] lg:gap-0">
            <div className="flex order-2 lg:order-1 flex-col justify-center rounded-4xl bg-gradient-to-br from-[#006589] to-[#3D4281] p-8 text-white sm:p-10 lg:rounded-r-none lg:rounded-l-4xl lg:p-12">
              <SectionLabel tone="light">{why.why_choose_title}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug sm:text-[30px]">{why.why_choose_main_title}</h2>
              <div className={`mt-5 ${PROSE_LIGHT}`} dangerouslySetInnerHTML={{ __html: why.why_choose_information }} />
              {why.why_choose_button?.title && <BookButton label={why.why_choose_button.title} light />}
            </div>
            {why.why_choose_image?.url && (
              <div className="relative order-1 lg:order-2 h-full lg:h-80 overflow-hidden rounded-4xl lg:h-auto lg:rounded-l-none lg:rounded-r-4xl">
                <Image src={why.why_choose_image.url} alt={why.why_choose_title || ""} width={1000} height={1000} className="object-cover lg:h-200 xl:h-160  object-center"  />
              </div>
            )}
          </div>
        </section>

        {/* ---------- Obesity isn't just about weight ---------- */}
        {ob.obesity_information && (
          <section id="doctor-led-assessment" className="scroll-mt-24 px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
            <div className="mx-auto grid w-full h-full container items-center gap-10 lg:grid-cols-[45%_55%]">
              {ob.obesity_image?.url && (
               <div className="relative order-1 xl:w-4/5 h-full mx-auto overflow-hidden rounded-[30px] shadow-sm ring-1 ring-black/5 ">
                  <Image src={ob.obesity_image.url} alt={ob.obesity_main_title || ""} width={2000} height={2000} className="object-cover w-full h-full object-center"  />
                </div>
              )}
              <div className="order-1 lg:order-2">
                <SectionLabel>{ob.obesity_title}</SectionLabel>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{ob.obesity_main_title}</h2>
                <div
                  className={`mt-5 ${PROSE} [&_ul]:lg:grid [&_ul]:grid-cols-2 [&_ul]:gap-x-6`}
                  dangerouslySetInnerHTML={{ __html: ob.obesity_information }}
                />
              </div>
            </div>
          </section>
        )}

        {/* ---------- Consultation (cards carousel) ---------- */}
        {cons.consultation_cards?.length > 0 && (
          <section id="who-should-book" className="scroll-mt-24 px-5 py-5 sm:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto w-full container">
              <div className="mx-auto max-w-3xl text-center">
                <div className="flex justify-center">
                  <SectionLabel>{cons.consultation_title}</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{cons.consultation_main_title}</h2>
                {cons.consultation_short_description && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{cons.consultation_short_description}</p>
                )}
              </div>
              <div className="">
                <ConsultationCarousel cards={cons.consultation_cards} />
              </div>
            </div>
          </section>
        )}

        {/* {counts.length > 0 && (
          <section className="bg-white px-5 pb-14 sm:px-8 lg:px-10 lg:pb-20">
            <div className="mx-auto grid w-full container gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {counts.map((c, i) => (
                <div key={i} className="bg-stat-card rounded-[30px] p-6 ring-1 ring-brand-purple/10">
                  <p className="font-display text-3xl lg:text-2xl xl:text-3xl text-ink">{c.number}</p>
                  <p className="font-display mt-3 text-lg lg:text-base xl:text-lg text-ink">{c.heading}</p>
                  <p className="mt-2 text-sm lg:text-xs xl:text-base text-gray-500">{c.short_description}</p>
                </div>
              ))}
            </div>
          </section>
        )} */}

        {/* ---------- After booking ---------- */}
        {after.after_booking_information && (
          <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
            <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <SectionLabel>{after.after_booking_title}</SectionLabel>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{after.after_booking_title_copy}</h2>
                <div className={`mt-5 ${PROSE}`} dangerouslySetInnerHTML={{ __html: after.after_booking_information }} />
                {after.after_booking_button?.title && <BookButton label={after.after_booking_button.title} />}
              </div>
              {after.after_booking_image?.url && (
                 <div className="relative order-1 lg:order-2 xl:w-4/5 h-full mx-auto overflow-hidden rounded-[30px] shadow-sm ring-1 ring-black/5 ">
                  <Image src={after.after_booking_image.url} alt={after.after_booking_title_copy || ""} width={1000} height={1000} className="object-cover lg:h-150  object-center"  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* ---------- Booking for a loved one ---------- */}
        {booking.booking_section_description && (
          <section id="what-happens-next" className="scroll-mt-20 bg-gradient-to-b from-[#006589]/10 to-white px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <div className="mx-auto grid w-full h-full container items-center gap-10 lg:grid-cols-[45%_55%]">
            {booking.booking_image.url && (
              <div className="relative order-1 xl:w-4/5 h-full mx-auto overflow-hidden rounded-[30px] shadow-sm ring-1 ring-black/5 ">
                <Image src={booking.booking_image.url} alt={booking.booking_section_title || ""} width={1000} height={1000} className="object-cover w-full h-full object-top" />
              </div>
            )}
             <div className="order-2">
              <div className=" ">
                <SectionLabel>{booking.booking_section_title}</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{booking.booking_section_main_title}</h2>
              <div
                className={` mt-5 max-w-2xl text-left ${PROSE} [&_ul]:grid sm:[&_ul]:grid-cols-2`}
                dangerouslySetInnerHTML={{ __html: booking.booking_section_description }}
              />
              {booking.booking_section_button?.title && (
                <div className="flex ">
                  <BookButton label={booking.booking_section_button.title} />
                </div>
              )}
            </div>
            </div>
          </section>
        )}
   

        {/* ---------- FAQs (from API) ---------- */}
        {t.faq?.faqs?.length > 0 && (
          <div id="faqs" className="scroll-mt-24">
            <FaqSection
              items={t.faq.faqs}
              eyebrow={t.faq.faqs_title || "FAQs"}
              title={t.faq.faqs_main_title || "Frequently Asked Questions"}
            />
          </div>
        )}

        {/* ---------- Disclaimer ---------- */}
        {t.disclaimer?.disclaimer_details && (
          <section className="px-5 pb-10 sm:px-8 lg:px-10">
            <div className="mx-auto w-full max-w-4xl rounded-2xl bg-surface-lav p-6 text-center">
              <p className="text-xs leading-relaxed text-gray-500">
                <span className="font-semibold text-gray-700">{t.disclaimer.disclaimer_heading}: </span>
                {t.disclaimer.disclaimer_details}
              </p>
            </div>
          </section>
        )}

        <FinalCTA ctaHref="#book" />
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex justify-center lg:justify-start">
              <Image src="/assets/logo.png" alt="Madhavbaug" width={320} height={85} className="h-auto w-[240px] sm:w-[280px] lg:w-[320px]" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[15px] leading-7 text-[#666666]">
                We bring time-tested Panchakarma therapies and customised lifestyle plans directly to
                your community. Our experienced medical team is committed to providing accessible,
                high-quality care. Trust Madhavbaug to be your local partner in reclaiming a healthier,
                medicine-free life.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t bg-[#F7ECE8]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-center text-[13px] text-[#666666] md:flex-row">
            <p>©2026 Madhavbaug. All Rights Reserved.</p>
            <p>Medical Disclaimer: Results based on clinical data; individual outcomes may vary</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
