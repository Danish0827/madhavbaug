import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  footerColumns,
  footerLegal,
  socials,
} from "@/data/navigation";
import { footerAbout } from "@/data/content";
import {
  YoutubeIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
} from "./ui/SocialIcons";

const iconMap = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
};

export default function SiteFooter() {
  return (
    <footer className="bg-white pt-16">
      <div className="mx-auto w-full container px-5 sm:px-8 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1.1fr_1fr]">
          {/* Brand column */}
          <div>
            <Image
              src="/assets/logo.png"
              alt="Madhavbaug"
              width={220}
              height={42}
              className="h-10 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-gray-600">
              {footerAbout.description}
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00658914] text-[#006589] transition-colors hover:bg-[#006589] hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>

            {/* App card */}
            <div className="mt-6 rounded-2xl bg-brand-purple/10 p-5">
              <div className="flex items-center gap-3">
                <span className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow">
                  <Image src="/assets/icon/footer-logo.svg" alt={footerAbout.appName} width={48} height={48} />
                </span>
                <span className="font-semibold text-2xl text-black">
                  {footerAbout.appName}
                </span>
                <span className="ml-auto rounded-md shrink-0">
                 <Image src="/assets/icon/googleplay.svg" alt="Get it on Google Play" width={180} height={40} />
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {footerAbout.appDescription}
              </p>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumnGroup titles={["About Us", "Patient Resources"]} />
          <FooterColumnGroup titles={["Additional Lifestyle Disorders"]} />
          <FooterColumnGroup
            titles={["Success Stories", "Our Products", "Health Score Tools"]}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 bg-cream">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-between gap-3 px-5 py-4 text-xs text-gray-600 sm:px-8 md:flex-row lg:px-20">
          <p>{footerAbout.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {footerLegal.map((l, i) => (
              <span key={l.label} className="flex items-center gap-3">
                <Link href={l.href} className="hover:text-brand-purple">
                  {l.label}
                </Link>
                {i < footerLegal.length - 1 && (
                  <span className="text-gray-300">•</span>
                )}
              </span>
            ))}
          </div>
          <p>
            Crafted by{" "}
            <span className="font-medium text-brand-purple">
              {footerAbout.craftedBy}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumnGroup({ titles }: { titles: string[] }) {
  const cols = footerColumns.filter((c) => titles.includes(c.title));
  return (
    <div className="space-y-8">
      {cols.map((col) => (
        <div key={col.title}>
          <h4 className="font-semibold text-lg text-ink">{col.title}</h4>
          <ul className="mt-3 space-y-2">
            {col.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-gray-600 hover:text-brand-purple"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
