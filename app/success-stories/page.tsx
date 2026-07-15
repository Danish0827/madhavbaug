import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";
import StoriesBrowser from "@/components/stories/StoriesBrowser";
import { fetchStories, collectCategories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Success Stories | Madhavbaug",
  description:
    "Real Madhavbaug patient stories - video testimonials and written reviews from people who reversed heart disease, diabetes, hypertension and more without surgery.",
};

export const revalidate = 300;

export default async function SuccessStoriesPage() {
  const stories = await fetchStories().catch(() => []);
  const categories = collectCategories(stories);

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          backgroundImage="/assets/images/breadcrump/banner-1.webp"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Success Stories" }]}
          title="Patient Success Stories"
          description="Real people, real results - watch video testimonials and read reviews from Madhavbaug patients who reversed chronic conditions without surgery."
        />

        <section className="px-5 pt-24 pb-16 sm:px-8 lg:px-10 lg:pt-28">
          <StoriesBrowser stories={stories} categories={categories} />
        </section>

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
