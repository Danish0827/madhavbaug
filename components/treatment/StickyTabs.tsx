"use client";

import { useEffect, useRef, useState } from "react";

export type TabItem = { id: string; label: string };

/**
 * Sticky section nav for the treatment page. Highlights the section currently
 * under the bar (scroll-spy) and smooth-scrolls to a section on click.
 * Must be rendered as a direct child of a tall scroll container so it can stick.
 */
export default function StickyTabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement>(null);

  /* ---- Scroll-spy: the active section is the last one whose top has passed
     under the sticky bar. Reliable for tall sections (unlike IO on a band). ---- */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const offset = (barRef.current?.getBoundingClientRect().bottom ?? 160) + 8;
        let current = tabs[0]?.id ?? "";
        for (const t of tabs) {
          const el = document.getElementById(t.id);
          if (el && el.getBoundingClientRect().top <= offset) current = t.id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tabs]);

  // Keep the active tab in view within the horizontal bar (mobile).
  useEffect(() => {
    barRef.current
      ?.querySelector<HTMLElement>(`[data-tab="${active}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="hidden lg:block sticky top-20 z-30 mt-10 bg-none py-3 lg:top-24">
      <div className="mx-auto w-full container px-2 sm:px-4 lg:px-5">
        <div
          ref={barRef}
          className=" flex justify-between gap-1 overflow-x-auto rounded-2xl lg:rounded-full bg-[#eef0f4] shadow-xl p-1.5 lg:p-4"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              data-tab={t.id}
              onClick={() => go(t.id)}
              className={`shrink-0 whitespace-nowrap cursor-pointer hover:bg-gradient-to-r from-teal-deep to-indigo-deep text-brand-purple hover:shadow rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === t.id
                  ? "bg-gradient-to-r hover:bg-gradient-to-r from-teal-deep to-indigo-deep text-white shadow"
                  : "text-gray-600 text-brand-purple hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
