"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ArrowUpRight } from "lucide-react";
import { mainNav, utilityLeft, utilityRight } from "@/data/navigation";

export default function MobileNav({
  open,
  onClose,
}: {
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

        <nav className="flex-1 px-2 py-3">
          {mainNav.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <div key={item.label} className="border-b border-gray-50">
                <button
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                  className="flex w-full items-center justify-between px-3 py-3.5 text-left text-[15px] font-medium text-gray-800"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 text-brand-purple transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                  <div className="min-h-0">
                    <div className="space-y-4 px-3 pb-4">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-brand-purple/70">
                            {col.title}
                          </p>
                          <ul className="space-y-1">
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <Link
                                  href={l.href}
                                  onClick={onClose}
                                  className="block py-1 text-sm text-gray-600"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="px-5 pb-4">
          <Link
            href="/clinic-hospital-locator"
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

        <div className="space-y-2 border-t border-gray-100 bg-cream/50 px-5 py-4 text-sm text-gray-600">
          {[...utilityLeft, ...utilityRight].map((l) => (
            <Link key={l.label} href={l.href} onClick={onClose} className="block">
              {l.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
