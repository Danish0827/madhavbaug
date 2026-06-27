import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import ClinicLocator from "@/components/ClinicLocator";

export const metadata: Metadata = {
  title: "Clinic & Hospital Locator | Madhavbaug",
  description:
    "Find a Madhavbaug clinic or hospital near you and book an appointment at your nearest centre for non-surgical chronic disease reversal care.",
};

export default function ClinicHospitalLocatorPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero band ---------- */}
        <section className="relative bg-gradient-to-br from-surface-lav via-[#eef0f4] to-surface-rose pt-28 lg:pt-40">
          <div className="container mx-auto px-5">
            <div className="relative z-10 mx-auto -mb-14 max-w-[1000px] rounded-[36px] bg-white px-6 py-9 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:px-10 lg:rounded-[91px] lg:py-10">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center justify-center gap-2 text-sm"
              >
                <Link href="/" className="text-[#7c44a8] hover:underline">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-[#2b2b2b]">Clinic Locator</span>
              </nav>

              <h1 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl lg:text-[40px]">
                Locate &amp; Book Appointment
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-black/70 sm:text-base">
                Find Madhavbaug Centre address and book appointment at nearest
                Madhavbaug Clinic or Hospital
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Filters + map + clinic list ---------- */}
        <ClinicLocator />

        {/* ---------- Closing CTA ---------- */}
        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
