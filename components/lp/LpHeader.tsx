"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  ArrowUpRight,
  Smartphone,
  HelpCircle,
  Briefcase,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import {
  lpNav,
  mainNav,
  utilityLeft,
  utilityRight,
} from "@/data/navigation";
import MegaMenuPanel from "../MegaMenuPanel";
import MobileNav from "../MobileNav";

const utilityIcons: Record<string, React.ReactNode> = {
  "Download mibPULSE App": <Smartphone className="h-3.5 w-3.5" />,
  "Have a Question?": <HelpCircle className="h-3.5 w-3.5" />,
  Careers: <Briefcase className="h-3.5 w-3.5" />,
  "Nearest Centres": <MapPin className="h-3.5 w-3.5" />,
  "Shop Now": <ShoppingBag className="h-3.5 w-3.5" />,
};

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const activeItem = mainNav.find((i) => i.label === active);

  // Absolute over the banner at the top; fixed (sticky) once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the desktop mega-menu on outside click or Escape.
  useEffect(() => {
    if (!active) return;
    const onClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <header
      className={`${scrolled ? "fixed animate-mm-in" : "absolute"
        } top-0 z-40 w-full`}
    >
      <div className="mx-auto w-full container px-2 sm:px-4 lg:px-5">
        <div
          ref={barRef}
          className="relative overflow-visible rounded-b-2xl bg-white shadow-[0px_4px_21.8px_0px_rgba(0,0,0,0.18)] lg:rounded-b-[32px]"
          onMouseLeave={() => setActive(null)}
        >
          {/* ---------- Utility bar ---------- */}
          {/* <div className="hidden bg-cream lg:block">
            <div className="flex items-center justify-between px-8 py-1.5 text-xs text-gray-700">
              <div className="flex items-center gap-6">
                {utilityLeft.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex items-center gap-1.5 hover:text-brand-purple"
                  >
                    {utilityIcons[l.label]}
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-6">
                {utilityRight.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex items-center gap-1.5 hover:text-brand-purple"
                  >
                    {utilityIcons[l.label]}
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div> */}

          {/* ---------- Main bar ---------- */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
            <Link href="/" className="shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Madhavbaug — Advanced Ayurveda Clinics and Hospitals"
                width={219}
                height={42}
                priority
                className="h-9 w-auto lg:h-10"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 lg:flex">
              {lpNav.map((item:any) => (
                <Link
                  key={item.label}
                 href={item.href}
                  aria-expanded={active === item.label}
                  className={`flex items-center gap-1 text-sm transition-colors ${active === item.label
                      ? "text-brand-purple"
                      : "text-gray-800 hover:text-brand-purple"
                    }`}
                >
                  {item.label}
                
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href='#book'
                className="hidden lg:inline-flex items-center group"
              >
                <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
                  Book a Consultation
                </span>
                <span className="flex  w-fit h-10 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-45 group-hover:shadow-xl duration-300 shadow-lg" />
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* ---------- Mega-menu panel (desktop) ---------- */}
          {activeItem && (
            <div className="absolute left-0 right-0 top-full z-40 hidden px-2 lg:block">
              <div className="thin-scroll mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                <MegaMenuPanel item={activeItem} />
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
