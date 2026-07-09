/**
 * Proxy for the external Madhavbaug clinics API, used by the landing-page
 * clinic finder. Proxying avoids cross-origin issues and lets us cache.
 */

export const revalidate = 300;

const UPSTREAM = "https://madhavbaug-main-site.vercel.app/api/clinics";

export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;
  const qs = new URLSearchParams();
  qs.set("state", sp.get("state") || "maharashtra");
  qs.set("city", sp.get("city") || "mumbai");
  qs.set("page", sp.get("page") || "1");
  qs.set("per_page", sp.get("per_page") || "40");

  try {
    const res = await fetch(`${UPSTREAM}?${qs.toString()}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = await res.json();
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return Response.json(
      { clinics: [], error: "Unable to load clinics", detail: String(err) },
      { status: 502 }
    );
  }
}
