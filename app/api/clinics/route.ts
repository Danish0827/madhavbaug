import { fetchClinicsPage } from "@/lib/clinics";

export const revalidate = 300;

export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;
  try {
    const data = await fetchClinicsPage({
      state: sp.get("state") || undefined,
      city: sp.get("city") || undefined,
      search: sp.get("search") || undefined,
      page: Number(sp.get("page")) || 1,
      per_page: Number(sp.get("per_page")) || 10,
    });
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return Response.json(
      { error: "Unable to load clinics", detail: String(err) },
      { status: 502 }
    );
  }
}
