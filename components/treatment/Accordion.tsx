"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUp, ChevronDown } from "lucide-react";

export type AccordionItem = { title: string; body: string };

/**
 * Reusable accordion. `html` renders the body as rich HTML (trusted CMS
 * content); otherwise it renders as plain paragraphs.
 */
export default function Accordion({
  items,
  html = false,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  html?: boolean;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="rounded-3xl bg-[#FBF0EDE5]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        return (
          <div
            key={i}
            className={`overflow-hidden border transition-colors bg-[#FBF0EDE5]
        ${isOpen ? "border-[#F5E3DF] bg-[#F5E3DF]" : "border-gray-200 bg-white"}
        ${isFirst ? "rounded-t-3xl" : ""}
        ${isLast ? "rounded-b-3xl" : ""}
      `}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex cursor-pointer w-full items-center justify-between gap-4 px-5 py-4 text-left bg-[#FBF0EDE5]"
            >
              <span className="font-display text-base text-ink sm:text-lg">{item.title}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-[#FBF0EDE5] text-gray-500" : "bg-none text-gray-500"
                  }`}
              >
                {isOpen ? <ChevronDown className="rotate-180 h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                {html ? (
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed text-gray-600 [&_a]:text-brand-purple [&_a]:underline [&_li]:mb-1.5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                ) : (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{item.body}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
