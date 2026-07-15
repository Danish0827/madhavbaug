import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, ChevronRight, Clock, MapPin, Tag, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import EventCard from "@/components/events/EventCard";
import { fetchEvents, fetchEventBySlug } from "@/lib/events";

type Params = { params: Promise<{ slug: string }> };

const LOCATOR = "/clinic-hospital-locator";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const e = await fetchEventBySlug(slug).catch(() => null);
  if (!e) return { title: "Event | Madhavbaug" };
  return {
    title: `${e.title} | Madhavbaug Events`,
    description: e.information.slice(0, 160) || `${e.title} - a Madhavbaug health event.`,
  };
}

export default async function EventDetailPage({ params }: Params) {
  const { slug } = await params;
  const [e, all] = await Promise.all([
    fetchEventBySlug(slug).catch(() => null),
    fetchEvents().catch(() => []),
  ]);
  if (!e) notFound();

  const cat = e.categories[0];
  const others = all.filter((x) => x.slug !== e.slug && x.isUpcoming).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero ---------- */}
        <section className="relative">
          <div className="relative min-h-[380px] overflow-hidden bg-brand-gradient lg:min-h-[460px]">
            {e.image && (
              <Image src={e.image} alt={e.title} fill priority className="object-cover" sizes="100vw" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
            <div className="relative mx-auto flex min-h-[380px] w-full container flex-col justify-end px-5 py-12 sm:px-8 lg:min-h-[460px] lg:px-10 lg:py-16">
              <div className="flex flex-wrap items-center gap-3">
                {cat && (
                  <span className="rounded-full bg-brand-purple px-3.5 py-1 text-xs font-semibold text-white">
                    {cat.name}
                  </span>
                )}
                <span
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                    e.isUpcoming ? "bg-green-500 text-white" : "bg-white/20 text-white"
                  }`}
                >
                  {e.isUpcoming ? "Upcoming" : "Past event"}
                </span>
              </div>
              <h1 className="font-display mt-4 max-w-3xl text-3xl leading-tight text-white sm:text-4xl lg:text-[42px]">
                {e.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> {e.dateLabel}
                  {e.weekday && ` · ${e.weekday}`}
                </span>
                {e.time && (
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {e.time}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8 lg:px-10">
            <nav
              aria-label="Breadcrumb"
              className="mx-auto flex w-full container flex-wrap items-center gap-2 text-sm"
            >
              <Link href="/" className="text-brand-purple hover:underline">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <Link href="/events" className="text-brand-purple hover:underline">Events</Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-ink">{e.title}</span>
            </nav>
          </div>
        </section>

        {/* ---------- Details ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto grid w-full container gap-10 lg:grid-cols-[1fr_360px]">
            {/* Main */}
            <div>
              <SectionLabel>About this Event</SectionLabel>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[30px]">{e.title}</h2>
              <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-gray-600 lg:text-base">
                {e.information || "Details for this event will be shared soon."}
              </p>

              {e.idealFor.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-display text-lg text-ink">Ideal For</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {e.idealFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-surface-lav px-4 py-3 text-sm font-medium text-ink"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#006589] to-[#3d4281] text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky info card */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-black/5 sm:p-8">
                <h3 className="font-display text-lg text-ink">Event Details</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <InfoRow icon={<CalendarDays className="h-5 w-5" />} label="Date">
                    {e.dateLabel}
                    {e.weekday && ` · ${e.weekday}`}
                  </InfoRow>
                  {e.time && (
                    <InfoRow icon={<Clock className="h-5 w-5" />} label="Time">
                      {e.time}
                    </InfoRow>
                  )}
                  {cat && (
                    <InfoRow icon={<Tag className="h-5 w-5" />} label="Category">
                      {cat.name}
                    </InfoRow>
                  )}
                  {e.location && (
                    <InfoRow icon={<MapPin className="h-5 w-5" />} label="Location">
                      {e.location}
                    </InfoRow>
                  )}
                </ul>

                <Link
                  href={LOCATOR}
                  className="btn-gradient mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
                >
                  {e.isUpcoming ? "Register / Enquire" : "Book a Consultation"}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                {e.location && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-brand-purple/40 py-3 text-sm font-semibold text-brand-purple transition-colors hover:bg-brand-purple/5"
                  >
                    <MapPin className="h-4 w-4" /> Get Directions
                  </a>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* ---------- Other upcoming events ---------- */}
        {others.length > 0 && (
          <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="mb-10 text-center">
                <div className="flex justify-center">
                  <SectionLabel>Don&apos;t Miss Out</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">Other Upcoming Events</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((o) => (
                  <EventCard key={o.slug} event={o} />
                ))}
              </div>
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

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
        <p className="mt-0.5 leading-relaxed text-gray-700">{children}</p>
      </div>
    </li>
  );
}
