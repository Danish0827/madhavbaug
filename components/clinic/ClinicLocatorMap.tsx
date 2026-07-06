"use client";

import { MapPin } from "lucide-react";
import type { Clinic } from "@/lib/clinics";
import GoogleMapEmbed from "../GoogleMapEmbed";

/**
 * Locator map: a keyless Google embed centred on the active clinic
 * (the one being viewed, otherwise the first result). Updates whenever the
 * filtered result set changes.
 */
export default function ClinicLocatorMap({
  clinics,
  activeId,
}: {
  clinics: Clinic[];
  activeId?: string;
}) {
  const active = clinics.find((c) => String(c.id) === activeId) ?? clinics[0];

  if (!active) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2 bg-surface-lav text-sm text-gray-500">
        <MapPin className="h-5 w-5 text-brand-purple" /> No centres to show
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <GoogleMapEmbed
        query={active.geoQuery || active.address || active.title}
        zoom={14}
        title={`Map of ${active.title}`}
      />
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 text-xs shadow-md backdrop-blur">
        <MapPin className="h-4 w-4 shrink-0 text-brand-purple" />
        <span className="truncate font-medium text-ink">{active.title}</span>
        {clinics.length > 1 && (
          <span className="ml-auto shrink-0 text-gray-500">+{clinics.length - 1} more here</span>
        )}
      </div>
    </div>
  );
}
