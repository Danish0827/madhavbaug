import { fetchCities } from "@/lib/clinics";

export const revalidate = 3600;

export async function GET(request: Request) {
  const state = new URL(request.url).searchParams.get("state");
  if (!state) {
    return Response.json({ error: "Missing 'state' query param" }, { status: 400 });
  }
  try {
    const cities = await fetchCities(state);
    return Response.json({ cities });
  } catch (err) {
    return Response.json(
      { error: "Unable to load cities", detail: String(err) },
      { status: 502 }
    );
  }
}
