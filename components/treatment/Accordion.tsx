"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-brand-purple/30 bg-surface-lav" : "border-gray-200 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-base text-ink sm:text-lg">{item.title}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-brand-purple text-white" : "bg-gray-100 text-brand-purple"
                }`}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
