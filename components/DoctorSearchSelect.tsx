"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2, X, Check } from "lucide-react";

/**
 * Doctor-name search presented as a dropdown. Typing is debounced by the
 * parent, which hits the API and feeds back matching names as `suggestions`.
 * So the dropdown always reflects live server results, not a pre-loaded list.
 */
export default function DoctorSearchSelect({
  input,
  onInput,
  onSelect,
  onClear,
  suggestions,
  loading,
  selected,
}: {
  input: string;
  onInput: (v: string) => void;
  onSelect: (name: string) => void;
  onClear: () => void;
  suggestions: string[];
  loading: boolean;
  selected: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const showPanel = open && input.trim().length > 0;

  return (
    <div ref={rootRef} className="relative w-full">
      <div
        className={`flex h-[45px] w-full items-center gap-2 rounded-full border bg-white pl-4 pr-3 shadow-sm transition-all ${
          open
            ? "border-brand-purple ring-4 ring-brand-purple/10"
            : "border-gray-200 hover:border-brand-purple/50"
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-brand-purple" />
        <input
          value={input}
          onChange={(e) => {
            onInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search Doctor"
          className="h-full flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
        {loading ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-purple" />
        ) : input || selected ? (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => {
              onClear();
              setOpen(false);
            }}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      {showPanel && (
        <div className="animate-mm-in absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <ul className="thin-scroll max-h-64 overflow-y-auto p-1.5" role="listbox">
            {loading && (
              <li className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Searching...
              </li>
            )}
            {!loading && suggestions.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-gray-400">No doctors found</li>
            )}
            {!loading &&
              suggestions.map((n) => (
                <li key={n} role="option" aria-selected={selected === n}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(n);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-lav hover:text-brand-purple ${
                      selected === n ? "font-medium text-brand-purple" : "text-gray-700"
                    }`}
                  >
                    <span className="truncate">{n}</span>
                    {selected === n && <Check className="h-4 w-4 shrink-0 text-brand-purple" />}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
