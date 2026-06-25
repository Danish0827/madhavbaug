import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import FloatingActions from "@/components/FloatingActions";
import StatsStrip from "@/components/StatsStrip";
import WhoWeAre from "@/components/WhoWeAre";
import AboutSection from "@/components/AboutSection";
import HospitalsSection from "@/components/HospitalsSection";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";
import FindCentre from "@/components/FindCentre";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <StatsStrip />
        <WhoWeAre />
        <AboutSection />
        <HospitalsSection />
        <HowItWorks />
        <SuccessStories />
        <FindCentre />
        <FinalCTA />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
