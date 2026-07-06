import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import ClinicLocator from "@/components/ClinicLocator";
import PageBanner from "@/components/PageBanner";

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
        <PageBanner
          backgroundImage="/assets/images/breadcrump/banner-1.webp"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Clinic Locator" },
          ]}
          title="Locate & Book Appointment"
          description="Find Madhavbaug Centre address and book appointment at nearest Madhavbaug Clinic or Hospital"
        />

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
