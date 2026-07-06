import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import DoctorsDirectory from "@/components/DoctorsDirectory";
import LocateCentreBand from "@/components/LocateCentreBand";

export const metadata: Metadata = {
  title: "Our Doctors | Madhavbaug",
  description:
    "Meet Madhavbaug's team of dedicated healthcare professionals - Ayurvedic physicians and specialists who combine modern diagnostics with time-tested Ayurvedic wisdom.",
};

const doctorFaqs: FaqItem[] = [
  {
    question: "What are the qualifications of the medical team at Madhavbaug?",
    answer:
      "Our medical team is led by qualified MBBS and BAMS doctors, supported by cardiac rehabilitation specialists, dieticians and certified physiotherapists. Every physician is trained in Madhavbaug's evidence-based, non-surgical protocols for chronic heart and metabolic conditions.",
  },
  {
    question: "How do your Ayurvedic physicians combine modern science with traditional medicine?",
    answer:
      "We begin with modern diagnostics - blood work, ECG, and clinical assessments - to understand your exact condition, then apply time-tested Ayurvedic Panchakarma therapies, diet and lifestyle changes. Progress is tracked with the same scientific reports, so treatment stays measurable and safe.",
  },
  {
    question: "Will the diet and exercise coaches work with my specific physical limitations?",
    answer:
      "Yes. Your diet and activity plan is personalised around your age, fitness level, medical condition and any joint or mobility limitations. Coaches adapt every routine so it stays safe, comfortable and sustainable for you.",
  },
  {
    question: "Can your specialists help me safely manage or reduce my ongoing allopathic medications?",
    answer:
      "Our primary goal is to safely regulate your health and restore long-term cardiovascular and metabolic balance. Any modification, reduction, or tapering of your ongoing allopathic medications is done strictly by our qualified doctors after observing sustained improvement in your diagnostic reports and clinical check-ups.",
  },
  {
    question: "Do I need an appointment to consult with a Madhavbaug expert or counsellor?",
    answer:
      "An appointment is recommended so your chosen doctor can review your reports and give you dedicated time. You can book a consultation online or call your nearest centre - walk-ins are also welcome subject to availability.",
  },
];

export default function OurDoctorsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          backgroundImage="/assets/doctors/hero.png"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Doctors" }]}
          title="Meet Our Team of Experts"
          description="Meet our team of dedicated healthcare professionals, who combine modern diagnostics and time-tested Ayurvedic wisdom to aid your health."
        />

        <div className="pt-14 lg:pt-20">
          <DoctorsDirectory />
        </div>

        <LocateCentreBand />

        <FaqSection items={doctorFaqs} className="bg-surface-lav" />

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
