"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import type { Clinic } from "@/lib/clinics";

/* Leaflet is loaded from a CDN at runtime; it isn't typed here. */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    L?: any;
  }
}
type L = any;

const INDIA: [number, number] = [22.9734, 78.6569];

let leafletPromise: Promise<L> | null = null;

function loadLeaflet(): Promise<L> {
  if (window.L) return Promise.resolve(window.L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise<L>((resolve, reject) => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.async = true;
    s.onload = () => resolve(window.L);
    s.onerror = () => reject(new Error("Leaflet failed to load"));
    document.head.appendChild(s);
  });
  return leafletPromise;
}

/** Brand-coloured teardrop pin as an inline SVG divIcon. */
function pinIcon(L: L, active: boolean) {
  const fill = active ? "#892fac" : "#6f58a5";
  return L.divIcon({
    className: "",
    html: `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 13.4 23.8 14 24.4.6.6 1.5.6 2 0 .6-.6 14-13.9 14-24.4C30 6.7 23.3 0 15 0z" fill="${fill}"/>
      <circle cx="15" cy="15" r="6" fill="#fff"/>
    </svg>`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36],
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] || ch
  );
}

export default function ClinicMap({
  clinics,
  selectedId,
  onSelect,
}: {
  clinics: Clinic[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L | null>(null);
  const markersRef = useRef<Map<string, L>>(new Map());
  const onSelectRef = useRef(onSelect);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  onSelectRef.current = onSelect;

  const located = clinics.filter((c) => c.lat != null && c.lng != null);

  /* ---- Init map once ---- */
  useEffect(() => {
    if (!divRef.current) return;
    let alive = true;
    loadLeaflet()
      .then((L) => {
        if (!alive || !divRef.current || mapRef.current) return;
        // Fixed map: no zoom controls/gestures — it only re-frames itself to
        // the currently marked clinics.
        const map = L.map(divRef.current, {
          center: INDIA,
          zoom: 5,
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
          dragging: false,
          attributionControl: true,
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        mapRef.current = map;
        setStatus("ready");
        setTimeout(() => map.invalidateSize(), 100);
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  /* ---- Plot markers whenever the located set changes ---- */
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (status !== "ready" || !L || !map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    const pts: [number, number][] = [];
    for (const c of located) {
      const id = String(c.id);
      const pos: [number, number] = [c.lat as number, c.lng as number];
      const marker = L.marker(pos, { icon: pinIcon(L, false) }).addTo(map);
      marker.bindPopup(
        `<div style="font-family:Inter,sans-serif;max-width:220px">
           <strong style="color:#892fac;font-size:13px">${escapeHtml(c.title)}</strong>
           <div style="color:#444;font-size:12px;margin-top:4px">${escapeHtml(c.address)}</div>
           <a href="${c.directionsUrl}" target="_blank" rel="noopener"
              style="display:inline-block;margin-top:6px;color:#0d6e8f;font-size:12px;font-weight:600">Get directions &rarr;</a>
         </div>`
      );
      marker.on("click", () => onSelectRef.current(id));
      markersRef.current.set(id, marker);
      pts.push(pos);
    }

    if (pts.length > 1) map.fitBounds(pts, { padding: [40, 40] });
    else if (pts.length === 1) map.setView(pts[0], 13);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinics, status]);

  /* ---- Focus the selected clinic ---- */
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready" || !map || !selectedId) return;
    const m = markersRef.current.get(selectedId);
    if (m) {
      map.setView(m.getLatLng(), 14, { animate: true });
      m.openPopup();
    }
  }, [selectedId, status]);

  return (
    <div className="relative h-full w-full">
      <div ref={divRef} className="h-full w-full" />
      {status !== "ready" && (
        <div className="absolute inset-0 z-[400] flex items-center justify-center gap-2 bg-white/70 text-sm text-gray-600 backdrop-blur-sm">
          {status === "error" ? (
            <>
              <MapPin className="h-5 w-5 text-brand-purple" /> Map could not load
            </>
          ) : (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-brand-purple" /> Loading map...
            </>
          )}
        </div>
      )}
      <div className="pointer-events-none absolute bottom-4 left-4 z-[400] flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-brand-purple shadow-sm backdrop-blur">
        <MapPin className="h-4 w-4" />
        {located.length} centre{located.length === 1 ? "" : "s"} on map
      </div>
    </div>
  );
}
