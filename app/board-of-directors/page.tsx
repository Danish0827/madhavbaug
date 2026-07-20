import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  boardHero,
  executiveLeaders,
  independentDirectors,
  type BoardMember,
} from "@/data/board";
import HeroBreadcrumb from "@/components/HeroBreadcrumb";

export const metadata: Metadata = {
  title: "Board of Directors | Madhavbaug",
  description:
    "Meet the Madhavbaug Board of Directors - experienced leaders across medicine, healthcare operations, finance, and corporate governance guiding responsible, patient-first care.",
};

function initials(name: string) {
  const parts = name.replace(/^(Dr|Mr|Mrs|Ms)\s+/i, "").split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
}

function DirectorPhoto({ name }: { name: string }) {
  return (
    <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-[#efe7fb] to-[#e3d3f2] lg:min-h-full">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/70 shadow-inner ring-1 ring-white">
        <span className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-3xl text-transparent">
          {initials(name)}
        </span>
      </div>
    </div>
  );
}

function DirectorRow({ member }: { member: BoardMember }) {
  const info = (
    <div className="flex flex-col justify-center rounded-[28px] bg-white p-8 lg:p-10">
      <h3 className="font-display bg-gradient-to-r from-brand-purple-soft to-brand-purple bg-clip-text text-xl text-transparent lg:text-2xl">
        {member.name}
      </h3>
      <p className="mt-2 text-sm font-semibold text-teal-deep">{member.role}</p>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{member.bio}</p>
      {member.readMore && (
        <Link
          href={member.readMore.href}
          className="btn-gradient mt-6 inline-flex w-fit items-center gap-2 rounded-full py-2.5 pr-2.5 pl-5 text-sm font-medium text-white shadow-md transition-shadow hover:shadow-lg"
        >
          {member.readMore.label}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      )}
    </div>
  );

  const photo = <DirectorPhoto name={member.name} />;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {member.imageSide === "left" ? (
        <>
          <div className="lg:col-span-2 lg:order-1">{photo}</div>
          <div className="lg:col-span-3 lg:order-2">{info}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-3 lg:order-1">{info}</div>
          <div className="lg:col-span-2 lg:order-2">{photo}</div>
        </>
      )}
    </div>
  );
}

export default function BoardOfDirectorsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBreadcrumb
          image={'/assets/board/hero.png'}
          imageAlt={boardHero.pillTitle}
          heroTitle={boardHero.heading}
          heroDescription={boardHero.description}
          pageTitle={boardHero.pillTitle}
          breadcrumbs={[
            { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Board of Directors" }
          ]}
          primaryButton={null}
          secondaryButton={null}
        />

        {/* ---------- Executive Leadership ---------- */}
        <section className="bg-[#006589]/10 px-5 pt-16 pb-8 sm:px-8 lg:px-20 lg:pt-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>The Core Founders / Promoters</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Executive Leadership
              </h2>
            </div>
            <div className="mt-10 space-y-6">
              {executiveLeaders.map((m) => (
                <DirectorRow key={m.name} member={m} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Independent & Non-Executive Directors ---------- */}
        <section className="bg-[#006589]/10 px-5 pt-8 pb-16 sm:px-8 lg:px-20 lg:pb-20">
          <div className="mx-auto w-full container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionLabel>The Governance Pillars</SectionLabel>
              </div>
              <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                Independent &amp; Non-Executive Directors
              </h2>
            </div>
            <div className="mt-10 space-y-6">
              {independentDirectors.map((m) => (
                <DirectorRow key={m.name} member={m} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/about"
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Learn More About Madhavbaug <ArrowUpRight className="h-4 w-4" />
              </Link>
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
