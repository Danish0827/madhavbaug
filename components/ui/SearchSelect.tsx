"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";

export type SelectOption = { value: string; label: string };

/**
 * Premium, searchable single-select dropdown (combobox).
 * - Type-to-filter search box inside the panel
 * - Keyboard navigation (↑/↓/Enter/Esc)
 * - Clear button, selected check mark, click-outside to close
 */
export default function SearchSelect({
  label,
  value,
  options,
  onChange,
  disabled,
  required,
  icon,
  searchable = true,
  clearable = true,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  searchable?: boolean;
  clearable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Reset search + focus the box on open.
  useEffect(() => {
    if (open) {
      setActive(0);
      if (searchable) setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery("");
    }
  }, [open, searchable]);

  // Keep the active option in view.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const o = filtered[active];
      if (o) choose(o.value);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-[45px] w-full items-center gap-2 rounded-full border bg-white pl-4 pr-3 text-left text-sm shadow-sm transition-all ${
          disabled
            ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
            : open
            ? "border-brand-purple ring-4 ring-brand-purple/10"
            : "border-gray-200 text-gray-700 hover:border-brand-purple/50"
        }`}
      >
        {icon && <span className="shrink-0 text-brand-purple">{icon}</span>}
        <span className={`flex-1 truncate ${selected ? "text-gray-800" : "text-gray-400"}`}>
          {selected ? selected.label : `${label}${required ? " *" : ""}`}
        </span>
        {selected && !disabled && clearable ? (
          <span
            role="button"
            tabIndex={-1}
            aria-label="Clear"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-3.5 w-3.5" />
          </span>
        ) : (
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {open && (
        <div
          className="animate-mm-in absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          onKeyDown={onKeyDown}
        >
          {searchable && (
            <div className="border-b border-gray-100 p-2">
              <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3">
                <Search className="h-4 w-4 shrink-0 text-gray-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder={`Search ${label.replace(/^Select\s+/i, "").toLowerCase()}...`}
                  className="h-10 w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
          )}

          <ul ref={listRef} className="thin-scroll max-h-64 overflow-y-auto p-1.5" role="listbox">
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-gray-400">No results found</li>
            )}
            {filtered.map((o, i) => {
              const isSel = o.value === value;
              const isActive = i === active;
              return (
                <li key={o.value} role="option" aria-selected={isSel}>
                  <button
                    type="button"
                    onClick={() => choose(o.value)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive ? "bg-surface-lav text-brand-purple" : "text-gray-700"
                    } ${isSel ? "font-medium" : ""}`}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSel && <Check className="h-4 w-4 shrink-0 text-brand-purple" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
