import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  ArrowUpRight,
  Stethoscope,
  Navigation,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import TreatmentsCarousel from "@/components/clinic/TreatmentsCarousel";
import StoriesCarousel from "@/components/clinic/StoriesCarousel";
import AppointmentForm from "@/components/clinic/AppointmentForm";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { fetchClinicBySlug } from "@/lib/clinics";
import { clinicTreatments } from "@/data/clinicSections";
import { successStories } from "@/data/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const clinic = await fetchClinicBySlug(slug).catch(() => null);
  if (!clinic) return { title: "Clinic | Madhavbaug" };
  return {
    title: `${clinic.title} | Madhavbaug`,
    description: `Visit ${clinic.title}. ${clinic.address}. Book a consultation for non-surgical chronic disease reversal care.`,
  };
}

export default async function ClinicDetailPage({ params }: Params) {
  const { slug } = await params;
  console.log(slug,"saSAA");
  
  const clinic = await fetchClinicBySlug(slug).catch(() => null);
  console.log(clinic,"data araha aahia");
  
  if (!clinic) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero band (Figma style) ---------- */}
        <section
          style={{ backgroundImage: "url('/assets/images/breadcrump/banner-1.webp')" }}
          className="relative h-120 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-surface-lav via-[#eef0f4] to-surface-rose"
        />
        <div className="relative z-10 mx-auto -mt-14 w-full max-w-250 px-4 lg:-mt-24">
          <div className="rounded-[28px] bg-white px-6 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-10 lg:rounded-[60px] lg:py-10">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center justify-center gap-2 text-sm"
            >
              <Link href="/" className="text-[#7c44a8] hover:underline">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <Link href="/clinic-hospital-locator" className="text-[#7c44a8] hover:underline">
                Clinic Locator
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <span className="max-w-[60vw] truncate text-[#2b2b2b]">{clinic.title}</span>
            </nav>

            <h1 className="font-display mt-3 text-2xl leading-tight text-ink sm:text-3xl lg:text-[36px]">
              {clinic.title}
            </h1>
            {clinic.doctor && (
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Stethoscope className="h-4 w-4 text-brand-purple" /> Led by {clinic.doctor}
              </p>
            )}

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={clinic.bookAppointment || "#"}
                target={clinic.bookAppointment ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Book a Consultation <ArrowUpRight className="h-4 w-4" />
              </a>
              {clinic.whatsappUrl && (
                <a
                  href={clinic.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  <FaWhatsapp className="h-4 w-4" /> WhatsApp
                </a>
              )}
              <a
                href={clinic.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-purple/40 px-6 py-3 text-sm font-medium text-brand-purple transition-colors hover:bg-brand-purple/5"
              >
                <Navigation className="h-4 w-4" /> Directions
              </a>
            </div>
          </div>
        </div>
        {/* ---------- Info + map ---------- */}
        <section className="relative z-10 px-5 sm:px-8 lg:px-20">
          <div className="mx-auto mt-12 w-full container">
            <div className="grid overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] ring-1 ring-black/5 lg:grid-cols-2">
              {/* Details */}
              <div className="p-7 sm:p-10">
                <h2 className="font-display text-2xl text-ink">Clinic Details</h2>
                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                    <span className="text-gray-700">{clinic.address}</span>
                  </li>
                  {clinic.timing && (
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                      <span className="text-gray-700">{clinic.timing}</span>
                    </li>
                  )}
                  {clinic.phone && (
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                      <a href={`tel:${clinic.phoneRaw}`} className="text-gray-700 hover:text-brand-purple">
                        {clinic.phone}
                      </a>
                    </li>
                  )}
                  {clinic.doctor && (
                    <li className="flex items-start gap-3">
                      <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                      <span className="text-gray-700">{clinic.doctor}</span>
                    </li>
                  )}
                </ul>
                <a
                  href={clinic.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  Get Directions <Navigation className="h-4 w-4" />
                </a>
              </div>

              {/* Map */}
              <div className="relative min-h-[320px] lg:min-h-[420px]">
                <GoogleMapEmbed
                  query={clinic.geoQuery || clinic.address || clinic.title}
                  zoom={16}
                  title={`Map of ${clinic.title}`}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </section>
        {/* ---------- Stats ---------- */}
        {/* {clinic.stats.length > 0 && (
          <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
            <div className="mx-auto grid w-full container gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {clinic.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-stat-card rounded-[28px] p-6 text-center ring-1 ring-brand-purple/10"
                >
                  <p className="font-display text-3xl text-brand-maroon">{stat.value}</p>
                  <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        )} */}

        {/* ---------- Treatments & Diagnostics carousel ---------- */}
        <TreatmentsCarousel treatments={clinicTreatments} clinicName={clinic.city || "Madhavbaug"} />

        {/* ---------- Success Stories carousel ---------- */}
        <StoriesCarousel
          videos={successStories.videos}
          reviews={successStories.reviews}
          clinicName={clinic.city || "Madhavbaug"}
        />

        {/* ---------- Appointment / enquiry form ---------- */}
        <AppointmentForm
          clinicName={clinic.city || "Madhavbaug"}
          phoneRaw={clinic.phoneRaw}
          whatsappUrl={clinic.whatsappUrl}
        />

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
