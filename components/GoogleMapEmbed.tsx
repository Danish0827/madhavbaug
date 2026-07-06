/**
 * Keyless Google Maps embed. Uses the public `output=embed` endpoint so no API
 * key or billing is required. The `query` should be a full address (or
 * "lat,lng") — Google geocodes it and drops an accurate pin on the real place.
 */
export default function GoogleMapEmbed({
  query,
  zoom = 15,
  className = "h-full w-full",
  title = "Location map",
}: {
  query: string;
  zoom?: number;
  className?: string;
  title?: string;
}) {
  if (!query) {
    return (
      <div className={`flex items-center justify-center bg-surface-lav text-sm text-gray-500 ${className}`}>
        Map unavailable
      </div>
    );
  }
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;
  return (
    <iframe
      src={src}
      title={title}
      className={className}
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
