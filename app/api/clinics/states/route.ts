import { fetchStates } from "@/lib/clinics";

export const revalidate = 3600;

export async function GET() {
  try {
    const states = await fetchStates();
    return Response.json({ states });
  } catch (err) {
    return Response.json(
      { error: "Unable to load states", detail: String(err) },
      { status: 502 }
    );
  }
}
