import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import PageBanner from "@/components/PageBanner";
import RiskCalculator from "@/components/health/RiskCalculator";

export const metadata: Metadata = {
  title: "Health Risk Calculator | Madhavbaug",
  description:
    "Check your cardio-metabolic health risk in under a minute. Madhavbaug's weighted risk calculator scores your BMI, blood pressure, blood sugar, lifestyle and family history to estimate your Low / Moderate / High risk.",
};

const legend = [
  { band: "0 – 30%", label: "Low Risk", color: "#16a34a", note: "Keep up your healthy habits." },
  { band: "31 – 60%", label: "Moderate Risk", color: "#d97706", note: "Some risk factors to address." },
  { band: "> 60%", label: "High Risk", color: "#dc2626", note: "A doctor consultation is recommended." },
];

const factors = [
  { label: "BMI (Height & Weight)", max: 20 },
  { label: "Blood Pressure", max: 20 },
  { label: "Fasting Blood Sugar", max: 20 },
  { label: "Smoking", max: 15 },
  { label: "Age", max: 10 },
  { label: "Physical Activity", max: 10 },
  { label: "Family History", max: 10 },
];

export default function HealthRiskCalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          backgroundImage="/assets/doctors/hero.png"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Health Score Tools" },
            { label: "Health Risk Calculator" },
          ]}
          title="Health Risk Calculator"
          description="Answer a few quick questions and get an instant, weighted estimate of your cardio-metabolic health risk - based on your BMI, blood pressure, blood sugar, lifestyle and family history."
        />

        {/* ---------- Calculator ---------- */}
        <section className="px-5 pt-16 pb-14 sm:px-8 lg:px-10 lg:pt-20">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="flex justify-center">
              <SectionLabel>Cardio-Metabolic Risk</SectionLabel>
            </div>
            <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
              Check Your Health Risk Score
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              A weighted screening tool - clinically stronger predictors like blood sugar, blood
              pressure and smoking carry more weight than age.
            </p>
          </div>
          <RiskCalculator />
        </section>

        {/* ---------- Understanding your score ---------- */}
        <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>How It Works</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Understanding Your Score
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Each factor adds points (max 105). Your total is converted to a percentage and
                classified into one of three risk bands.
              </p>
            </div>

            {/* Risk bands */}
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {legend.map((l) => (
                <div key={l.label} className="rounded-[24px] bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
                  <span className="inline-block rounded-full px-4 py-1 text-sm font-semibold text-white" style={{ backgroundColor: l.color }}>
                    {l.label}
                  </span>
                  <p className="font-display mt-3 text-2xl text-ink">{l.band}</p>
                  <p className="mt-2 text-sm text-gray-500">{l.note}</p>
                </div>
              ))}
            </div>

            {/* Factor weights */}
            <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
              <p className="text-sm font-semibold text-ink">What we measure (and its weight)</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {factors.map((fac) => (
                  <div key={fac.label} className="flex items-center justify-between gap-3 rounded-2xl bg-surface-lav px-4 py-3">
                    <span className="text-sm text-ink">{fac.label}</span>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-purple">
                      {fac.max} pts
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-gray-500">
                Clinical safeguards apply automatically: very high blood sugar (≥126 mg/dL) or blood
                pressure (≥140 mmHg) can never be classified as Low risk, and multiple abnormal
                values are classified as High risk regardless of the total. This tool is an
                educational estimate and not a medical diagnosis.
              </p>
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
