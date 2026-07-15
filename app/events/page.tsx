import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";
import EventsBrowser from "@/components/events/EventsBrowser";
import { fetchEvents, collectEventCategories } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events | Madhavbaug",
  description:
    "Join Madhavbaug's upcoming clinic and corporate health events - free heart-health check-ups, awareness camps and preventive-care workshops near you.",
};

export const revalidate = 300;

export default async function EventsPage() {
  const events = await fetchEvents().catch(() => []);
  const categories = collectEventCategories(events);

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          backgroundImage="/assets/images/breadcrump/banner-1.webp"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
          title="Events & Health Camps"
          description="Attend our clinic and corporate health events - preventive check-ups, awareness camps and workshops designed to help you take charge of your heart health."
        />

        <section className="px-5 pt-24 pb-16 sm:px-8 lg:px-10 lg:pt-28">
          <EventsBrowser events={events} categories={categories} />
        </section>

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
