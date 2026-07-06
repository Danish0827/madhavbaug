import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Phone, Navigation, ArrowUpRight, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import { fetchDoctorBySlug } from "@/lib/doctors";
import { fetchClinicBySlug } from "@/lib/clinics";

type Params = { params: Promise<{ slug: string }> };

/** External Madhavbaug appointment-booking page. */
const BOOKING_URL =
  "https://cliniclocator.madhavbaug.org/schedule/?I=DrId07232478467423804900MB&S=ClinicWebsite";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await fetchDoctorBySlug(slug).catch(() => null);
  if (!doctor) return { title: "Doctor | Madhavbaug" };
  return {
    title: `${doctor.name} | Madhavbaug`,
    description: `${doctor.name} - ${doctor.designation || "Ayurvedic Physician"} at Madhavbaug. Book a consultation for non-surgical chronic disease reversal care.`,
  };
}

export default async function DoctorDetailPage({ params }: Params) {
  const { slug } = await params;
  const doctor = await fetchDoctorBySlug(slug).catch(() => null);
  if (!doctor) notFound();

  const clinic = doctor.clinic
    ? await fetchClinicBySlug(doctor.clinic.slug).catch(() => null)
    : null;

  return (
    <>
      <Navbar />
      <main>
        <section className="px-5 py-10 sm:px-8 lg:px-20 lg:py-14">
          <div className="mx-auto w-full container">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm">
              <Link href="/" className="text-[#7c44a8] hover:underline">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <Link href="/our-doctors" className="text-[#7c44a8] hover:underline">Our Doctors</Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-[#2b2b2b]">{doctor.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
              {/* ---------- Left sidebar ---------- */}
              <aside className="space-y-6">
                {/* Photo + name card */}
                <div className="overflow-hidden rounded-[24px] bg-surface-lav shadow-sm ring-1 ring-black/5">
                  <div className="relative flex h-80 w-full items-end justify-center overflow-hidden bg-gradient-to-br from-[#efe7fb] to-[#e3d3f2]">
                    {doctor.image ? (
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        priority
                        className="object-cover object-top"
                        sizes="350px"
                      />
                    ) : (
                      <UserRound className="h-24 w-24 text-brand-purple/40" />
                    )}
                  </div>
                  <div className="p-5">
                    <h1 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl leading-snug text-transparent">
                      {doctor.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                      {doctor.designation || "Ayurvedic Physician"}
                    </p>
                  </div>
                </div>

                {/* Book an Appointment -> external booking page */}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium text-white shadow-md transition-shadow hover:shadow-lg"
                >
                  Book an Appointment
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                {/* Clinic Location */}
                {clinic && (
                  <div className="rounded-[24px] bg-surface-lav p-6 shadow-sm ring-1 ring-black/5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-lg text-brand-purple">Clinic Location</h2>
                      <a
                        href={clinic.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex shrink-0 items-center gap-1 pt-1 text-xs font-medium"
                      >
                        <Navigation className="h-4 w-4 text-teal-deep" />
                        <span className="bg-gradient-to-r from-teal-deep to-indigo-deep bg-clip-text text-transparent">
                          Directions
                        </span>
                      </a>
                    </div>
                    <p className="mt-3 text-sm font-medium text-ink">{clinic.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{clinic.address}</p>
                    <div className="mt-4 space-y-3 text-sm text-gray-700">
                      {clinic.timing && (
                        <p className="flex items-center gap-2">
                          <Clock className="h-[18px] w-[18px] shrink-0 text-brand-purple" />
                          {clinic.timing}
                        </p>
                      )}
                      {clinic.phone && (
                        <a href={`tel:${clinic.phoneRaw}`} className="flex items-center gap-2 hover:text-brand-purple">
                          <Phone className="h-4 w-4 shrink-0 text-brand-purple" />
                          {clinic.phone}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </aside>

              {/* ---------- Right: info sections ---------- */}
              <div className="space-y-7">
                {doctor.information.length === 0 && (
                  <p className="text-sm text-gray-500">Details for this doctor are coming soon.</p>
                )}
                {doctor.information.map((sec, i) => (
                  <div key={i}>
                    <h2 className="font-display text-xl text-brand-purple">{sec.title}</h2>
                    <div
                      className="mt-3 text-sm leading-relaxed text-gray-600 [&_a]:text-brand-purple [&_a]:underline [&_li]:mb-1.5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: sec.html }}
                    />
                  </div>
                ))}
              </div>
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
