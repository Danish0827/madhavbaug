import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check, ShieldCheck, BadgeIndianRupee, Landmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import PageBanner from "@/components/PageBanner";
import PartnersTabs from "@/components/insurance/PartnersTabs";
import {
  insurancePartners,
  tpaPartners,
  insuranceLocations,
  claimCards,
  admissionChecklist,
} from "@/data/insurance";

export const metadata: Metadata = {
  title: "Health Insurance & AYUSH Coverage | Madhavbaug",
  description:
    "Get world-class, non-surgical chronic disease treatments with cashless and reimbursement benefits from India's leading insurance providers. AYUSH coverage at Madhavbaug.",
};


export default function InsurancePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Hero ---------- */}
        <PageBanner
          backgroundImage="/assets/insurance/hero.png"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Insurance & Financial Assistance" },
          ]}
          title="Insurance Coverage at Madhavbaug"
          description="Health Insurance & AYUSH Coverage — get world-class, non-surgical chronic disease treatments with cashless and reimbursement benefits from India's leading insurance providers."
        />

        {/* ---------- Block 1: Is Ayurveda covered (image left) ---------- */}
        <section className="px-5 pt-24 pb-14 sm:px-8 lg:px-20 lg:pt-28">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-black/5">
              <Image src="/assets/insurance/covered.png" alt="Ayurvedic treatment insurance coverage" fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
            <div>
              <SectionLabel>Insurance & Financial Assistance</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                Is Ayurvedic Treatment Covered by Health Insurance?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 lg:text-base">
                Yes, absolutely. By law, the Insurance Regulatory and Development Authority of India
                (IRDAI) requires all health insurance companies to cover AYUSH (Ayurveda, Yoga,
                Unani, Siddha, and Homoeopathy) treatments just like they cover regular allopathic
                (English) medicines and surgeries. This means you do not have to worry about hidden
                limits anymore; you may use your policy's full sum insured value to cover your
                Ayurvedic hospital treatments, depending also on the terms of your specific insurance
                plan.
              </p>
              <a
                href="/clinic-hospital-locator"
                className="btn-gradient mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Consult a Madhavbaug expert <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Block 2: Why Madhavbaug qualifies (image right) ---------- */}
        <section className="bg-[#faf1ee] px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="order-1">
              <SectionLabel>Our Approach</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                Why Madhavbaug Qualifies for Insurance Claims
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 lg:text-base">
                To claim insurance for any Ayurvedic treatment, the government requires that the
                hospital meet strict medical standards. Madhavbaug fully meets every requirement. Our
                hospitals are proudly NABH-accredited (the highest government-recognised quality badge
                for Indian healthcare) and staffed 24/7 by qualified, MD-level doctors and trained
                nursing and support staff. Because we use scientifically proven methods and maintain
                highly detailed medical files, bills, and discharge papers, insurance companies
                partner with us for Madhavbaug treatments to provide smooth cashless or reimbursement
                claims.
              </p>
            </div>
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-black/5">
              <Image src="/assets/insurance/qualifies.png" alt="NABH-accredited Madhavbaug hospital" fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
          </div>
        </section>

        {/* ---------- Partners ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Partners</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Our Health Insurance & TPA Partners
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Avail cashless or reimbursement benefits for your treatment through leading health
                insurance providers (AYUSH coverage applicable at Madhavbaug).
              </p>
            </div>

            {/* Location tabs + partners card */}
            <PartnersTabs
              locations={insuranceLocations}
              insurers={insurancePartners}
              tpas={tpaPartners}
            />
          </div>
        </section>

        {/* ---------- How to Claim ---------- */}
        <section className="bg-gradient-to-br from-[#006589]/[0.06] to-[#3d4281]/[0.06] px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>Cashless vs. Reimbursement</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                How to Claim Insurance for Your Treatment at Madhavbaug?
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {claimCards.map((card) => (
                <article key={card.tab} className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-9">
                  <span className="inline-flex rounded-full bg-gradient-to-r from-[#6f58a5] to-[#892fac] px-4 py-1.5 text-xs font-semibold text-white">
                    {card.tab}
                  </span>
                  <h3 className="font-display mt-4 bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-2xl text-transparent">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm capitalize text-[#2b2b2b]">{card.caption}</p>
                  <div className="mt-6 space-y-5">
                    {card.items.map((it) => (
                      <div key={it.subtitle}>
                        <h4 className="bg-gradient-to-r from-[#006589] to-[#3d4281] bg-clip-text text-sm font-semibold text-transparent">
                          {it.subtitle}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{it.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Documents checklist (image left) ---------- */}
        <section className="px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-black/5">
              <Image src="/assets/insurance/documents.png" alt="Documents required for cashless claim" fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
            <div>
              <SectionLabel>Step-by-Step Admission Checklist</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                Documents Required for a Smooth Cashless Insurance Claim
              </h2>
              <ul className="mt-6 space-y-3">
                {admissionChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-deep/10 text-teal-deep">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/clinic-hospital-locator"
                className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Consult a Madhavbaug expert <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---------- No insurance / EMI ---------- */}
        <section className="bg-gradient-to-br from-brand-purple/[0.06] to-brand-maroon/[0.06] px-5 py-14 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full container items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionLabel>Trust & Safety</SectionLabel>
              <h2 className="font-display mt-4 text-2xl leading-snug text-ink lg:text-[32px]">
                No Insurance? Avail Easy 0% Interest EMI Options
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 lg:text-base">
                Experience hassle-free healing with affordable 0% interest EMI (up to 6 months) and
                flexible medical loan plans with our finance partners:
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                {[BadgeIndianRupee, Landmark, ShieldCheck].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-purple shadow-sm ring-1 ring-black/5"
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] ring-1 ring-black/5">
              <Image src="/assets/insurance/emi.png" alt="0% interest EMI options" fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
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
