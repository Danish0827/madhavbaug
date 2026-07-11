"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ArrowUpRight } from "lucide-react";
import { mainNav, utilityLeft, utilityRight } from "@/data/navigation";

export default function LpMobileNav({
  lpNav,
  open,
  onClose,
}: {
  lpNav: any[];
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      {/* Drawer */}
      <aside
        className={`thin-scroll fixed right-0 top-0 z-50 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <Image src="/assets/logo.png" alt="Madhavbaug" width={160} height={31} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-5 py-5 space-y-3">
          {lpNav.map((item: any) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              // aria-expanded={active === item.label}
              className={`flex items-center gap-1 text-base transition-colors `}
            >
              {item.label}

            </Link>
          ))}
        </nav>

        <div className="px-5 pb-4">
          <Link
            href="#book"
            onClick={onClose}
            className="inline-flex w-full items-center group"
          >
            <span className="btn-gradient w-full justify-center text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium  shadow-lg">
              Book a Consultation
            </span>
            <span className="flex shrink-0 w-fit h-10 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRight className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-45 group-hover:shadow-xl duration-300 shadow-lg" />
            </span>
          </Link>
        </div>

        {/* <div className="space-y-2 border-t border-gray-100 bg-cream/50 px-5 py-4 text-sm text-gray-600">
          {[...utilityLeft, ...utilityRight].map((l) => (
            <Link key={l.label} href={l.href} onClick={onClose} className="block">
              {l.label}
            </Link>
          ))}
        </div> */}
      </aside>
    </>
  );
}
