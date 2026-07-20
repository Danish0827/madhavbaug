import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, Play, MapPin, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import TreatmentTabs from "@/components/hospital/TreatmentTabs";
import PillarsCarousel from "@/components/hospital/PillarsCarousel";
import FacilitiesCarousel from "@/components/hospital/FacilitiesCarousel";
import { fetchHospitalBySlug } from "@/lib/hospitals";
import HeroBreadcrumb from "@/components/HeroBreadcrumb";

type Params = { params: Promise<{ slug: string }> };

const LOCATOR = "/clinic-hospital-locator";

const CHECK_LIST =
  "[&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-gray-600 [&_li]:before:mt-0.5 [&_li]:before:flex [&_li]:before:h-5 [&_li]:before:w-5 [&_li]:before:shrink-0 [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:rounded-full [&_li]:before:bg-teal-deep/10 [&_li]:before:text-[11px] [&_li]:before:text-teal-deep [&_li]:before:content-['✓']";

const PROGRAM_PROSE =
  "[&_h3]:font-display [&_h3]:text-lg [&_h3]:text-ink [&_em]:mb-2 [&_em]:block [&_em]:not-italic [&_em]:font-medium [&_em]:text-teal-deep [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-gray-600";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const h = await fetchHospitalBySlug(slug).catch(() => null);
  if (!h) return { title: "Hospital | Madhavbaug" };
  return {
    title: `${h.banner.bottomTitle || h.title} | Madhavbaug`,
    description: h.banner.shortDescription,
  };
}

export default async function HospitalPage({ params }: Params) {
  const { slug } = await params;
  const h = await fetchHospitalBySlug(slug).catch(() => null);
  if (!h) notFound();

  // The API has no dedicated About image, so use a facility photo (fallback: banner).
  const aboutImage = h.amenities.slider[0]?.url ?? h.banner.image?.url ?? "";

  return (
    <>
      <Navbar />
      <main>
         <HeroBreadcrumb
                  image={h?.banner?.image?.url ? h?.banner?.image?.url : "/assets/images/breadcrump/banner-1.webp"}
                  imageAlt={h.banner.bottomTitle}
                  heroTitle={h.banner.heading}
                  heroDescription= {h.banner.shortDescription}
                  pageTitle={h.banner.bottomTitle}
                  breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Hospitals", href: '/hospitals' },
                    { label: h.banner.bottomTitle },
                  ]}
                  primaryButton={{
                    label: h.banner.button?.title || "Book a Consultation",
                    href: LOCATOR,
                  }}
                  secondaryButton={null}
                />
        {/* ---------- Hero ---------- */}
      
        {/* ---------- About ---------- */}
        <section className="px-5  pb-14 sm:px-8 lg:px-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionLabel>{h.about.title}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.about.mainTitle}</h2>
              <div
                className="mt-5 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-gray-600 [&_ul]:mt-6 [&_ul]:grid [&_ul]:gap-3 sm:[&_ul]:grid-cols-2 [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:rounded-2xl [&_li]:bg-surface-lav [&_li]:px-4 [&_li]:py-3 [&_li]:text-sm [&_li]:font-medium [&_li]:text-ink [&_li]:before:flex [&_li]:before:h-6 [&_li]:before:w-6 [&_li]:before:shrink-0 [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:rounded-full [&_li]:before:bg-gradient-to-br [&_li]:before:from-[#006589] [&_li]:before:to-[#3d4281] [&_li]:before:text-[11px] [&_li]:before:text-white [&_li]:before:content-['✓']"
                dangerouslySetInnerHTML={{ __html: h.about.html }}
              />
              {h.about.button && (
                <Link
                  href={LOCATOR}
                  className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  {h.about.button.title} <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            {aboutImage && (
              <div className="relative h-80 w-full overflow-hidden rounded-[30px] shadow-sm ring-1 ring-black/5 lg:h-[560px]">
                <Image src={aboutImage} alt={h.about.mainTitle} fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
              </div>
            )}
          </div>
        </section>

        {/* ---------- Treatments (tabs) ---------- */}
        {h.treatments.items.length > 0 && (
          <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <div className="flex justify-center">
                  <SectionLabel>Treatments</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.treatments.mainTitle}</h2>
              </div>
              <TreatmentTabs items={h.treatments.items} />
            </div>
          </section>
        )}

        {/* ---------- Pillars (carousel) ---------- */}
        {h.pillars.items.length > 0 && (
          <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="mx-auto max-w-3xl text-center">
                <div className="flex justify-center">
                  <SectionLabel>{h.pillars.title}</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.pillars.mainTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{h.pillars.shortDescription}</p>
              </div>
              <div className="mt-10">
                <PillarsCarousel items={h.pillars.items} />
              </div>
            </div>
          </section>
        )}

        {/* ---------- Residential Programs ---------- */}
        {h.programs.items.length > 0 && (
          <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="mx-auto max-w-3xl text-center">
                <div className="flex justify-center">
                  <SectionLabel>{h.programs.title}</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.programs.mainTitle}</h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {h.programs.items.map((p, i) => (
                  <article
                    key={i}
                    className={`rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-black/5 ${PROGRAM_PROSE}`}
                    dangerouslySetInnerHTML={{ __html: p.program_details }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- Expert Medical Team ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            {h.team.image?.url && (
              <div className="relative order-1 h-72 w-full overflow-hidden rounded-[30px] shadow-sm ring-1 ring-black/5 lg:h-[440px]">
                <Image src={h.team.image.url} alt={h.team.mainTitle} fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
              </div>
            )}
            <div className="order-2">
              <SectionLabel>{h.team.title}</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.team.mainTitle}</h2>
              <div className={`mt-6 ${CHECK_LIST}`} dangerouslySetInnerHTML={{ __html: h.team.html }} />
              {h.team.noteDetails && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-purple/[0.06] p-5 ring-1 ring-brand-purple/15">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                  <p className="text-sm leading-relaxed text-gray-700">
                    <span className="font-semibold text-brand-purple">{h.team.noteLabel}: </span>
                    {h.team.noteDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---------- Local Success Stories ---------- */}
        {h.stories.items.length > 0 && (
          <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="mx-auto max-w-3xl text-center">
                <div className="flex justify-center">
                  <SectionLabel>{h.stories.title}</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.stories.mainTitle}</h2>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {h.stories.items.map((s, i) => (
                  <article key={i} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5">
                    <a
                      href={s.youtube_link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block h-56 w-full overflow-hidden"
                    >
                      {s.thumbnail?.url && (
                        <Image src={s.thumbnail.url} alt={s.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width:640px) 100vw, 400px" />
                      )}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-purple shadow-lg">
                          <Play className="ml-0.5 h-6 w-6 fill-current" />
                        </span>
                      </span>
                    </a>
                    <div className="p-6">
                      <span className="inline-block rounded-full bg-teal-deep/10 px-3 py-1 text-xs font-medium text-teal-deep">
                        {s.condition_name}
                      </span>
                      <h3 className="font-display mt-3 text-lg text-ink">{s.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 text-brand-purple" /> {s.location}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- Facility & Amenities (image slider) ---------- */}
        {h.amenities.slider.length > 0 && (
          <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <SectionLabel>{h.amenities.title}</SectionLabel>
                  <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.amenities.mainTitle}</h2>
                  <div className={`mt-6 ${CHECK_LIST}`} dangerouslySetInnerHTML={{ __html: h.amenities.html }} />
                  {h.amenities.button && (
                    <Link
                      href={LOCATOR}
                      className="btn-gradient mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                    >
                      {h.amenities.button.title} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <FacilitiesCarousel images={h.amenities.slider} />
              </div>
            </div>
          </section>
        )}

        {/* ---------- Healthcare Services ---------- */}
        {h.services.items.length > 0 && (
          <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="mx-auto max-w-3xl text-center">
                <div className="flex justify-center">
                  <SectionLabel>{h.services.title}</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.services.mainTitle}</h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {h.services.items.map((s, i) => (
                  <article key={i} className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5">
                    {s.service_image?.url && (
                      <div className="relative h-48 w-full">
                        <Image src={s.service_image.url} alt={s.service_name} fill className="object-cover" sizes="(max-width:768px) 100vw, 400px" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg leading-snug text-ink">{s.service_name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.service_short_description}</p>
                      {s.learn_more?.title && (
                        <Link
                          href={s.learn_more.url && s.learn_more.url !== "#" ? s.learn_more.url : "/insurance"}
                          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-medium text-brand-purple hover:underline"
                        >
                          {s.learn_more.title} <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- Research-Backed ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            {h.research.image?.url && (
              <div className="relative order-2 h-72 w-full overflow-hidden rounded-[30px] shadow-sm ring-1 ring-black/5 lg:order-1 lg:h-[420px]">
                <Image src={h.research.image.url} alt={h.research.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
              </div>
            )}
            <div className="order-1 lg:order-2">
              <SectionLabel>Scientific Evidence</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{h.research.title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-gray-600 lg:text-base">{h.research.description}</p>
              {h.research.button && (
                <Link
                  href="/research"
                  className="btn-gradient mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  {h.research.button.title} <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
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
