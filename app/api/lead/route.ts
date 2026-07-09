/**
 * Lead capture endpoint for the landing pages.
 *
 * Forwards the submission to a Google Apps Script Web App (set via the
 * LEAD_WEBHOOK_URL env var) which appends the row to the Google Sheet and
 * emails danish@healthus.ai. See docs/lead-apps-script.gs for the script to
 * deploy. If the env var is not set, the lead is logged and accepted so the
 * form UX still works during development.
 */

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  message?: string;
  source?: string;
  company?: string; // honeypot
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields — silently accept, do nothing.
  if (body.company) return Response.json({ ok: true });

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  if (!name || phone.replace(/\D/g, "").length < 10) {
    return Response.json(
      { ok: false, error: "Please enter your name and a valid phone number." },
      { status: 422 }
    );
  }

  const lead = {
    name,
    phone,
    message: (body.message ?? "").trim(),
    source: body.source || "Obesity Care LP",
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[lead] LEAD_WEBHOOK_URL not set - lead logged only:", lead);
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook returned ${res.status}`);
    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] webhook error:", err);
    // Don't lose the lead to the user's eyes — surface a soft failure.
    return Response.json(
      { ok: false, error: "We couldn't submit right now. Please call us or try again." },
      { status: 502 }
    );
  }
}
