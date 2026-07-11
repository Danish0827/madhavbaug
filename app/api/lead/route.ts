/**
 * Lead capture endpoint for the landing pages.
 *
 * The PowerMAP CRM endpoint is reachable but slow (~30-35s to create a lead),
 * so we validate + respond to the user immediately and push to the CRM + send
 * the notification email in the BACKGROUND via `after()`. This keeps the form
 * snappy while still reliably delivering the lead.
 *
 * Secrets come from env vars (see .env.local): CRM_API_URL, CRM_API_KEY,
 * LEAD_MAIL_* . Set the same vars in the production hosting environment.
 */

import { after } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
// Allow the background CRM/email work to finish (CRM can take ~35s).
export const maxDuration = 60;

type LeadBody = {
  name?: string;
  phone?: string;
  pin?: string;
  source?: string;
  campaign?: string;
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
  const pin = (body.pin ?? "").trim();
  const source = (body.source ?? "Website").trim() || "Website";
  const campaign = (body.campaign ?? "Website Landing Page").trim() || "Website Landing Page";

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return Response.json(
      { ok: false, error: "Please enter your name and a valid phone number." },
      { status: 422 }
    );
  }

  const lead = { name, phone, pin, source, campaign, submittedAt: new Date().toISOString() };

  // Deliver to CRM + email in the background so the user isn't blocked by the
  // slow CRM. `after` keeps the invocation alive until these finish.
  after(async () => {
    const [crm, mail] = await Promise.allSettled([sendToCrm(lead), sendEmail(lead)]);
    if (crm.status === "rejected") console.error("[lead] CRM error:", crm.reason);
    else console.log("[lead] CRM:", crm.value ? "created" : "skipped");
    if (mail.status === "rejected") console.error("[lead] mail error:", mail.reason);
    else console.log("[lead] mail:", mail.value ? "sent" : "skipped");
  });

  return Response.json({ ok: true });
}

type Lead = {
  name: string;
  phone: string;
  pin: string;
  source: string;
  campaign: string;
  submittedAt: string;
};

async function sendToCrm(lead: Lead): Promise<boolean> {
  const url = process.env.CRM_API_URL;
  const key = process.env.CRM_API_KEY;
  if (!url || !key) {
    console.warn("[lead] CRM env not set - skipping CRM push");
    return false;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "X-API-Key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      patient_pincode: lead.pin,
      medium: lead.source,
      source: lead.source,
      campaign: lead.campaign,
    }),
    // The CRM is slow (~35s); give it room but never hang forever.
    signal: AbortSignal.timeout(50000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`CRM returned ${res.status} ${detail.slice(0, 200)}`);
  }
  return true;
}

async function sendEmail(lead: Lead): Promise<boolean> {
  const host = process.env.LEAD_MAIL_HOST;
  const user = process.env.LEAD_MAIL_USER;
  const pass = process.env.LEAD_MAIL_PASS;
  const to = process.env.LEAD_MAIL_TO || user;
  if (!host || !user || !pass) {
    console.warn("[lead] mail env not set - skipping email");
    return false;
  }
  const port = Number(process.env.LEAD_MAIL_PORT || 465);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });

  await transport.sendMail({
    from: `Madhavbaug Leads <${user}>`,
    to,
    replyTo: user,
    subject: `New Lead - ${lead.campaign} - ${lead.name}`,
    text:
      `New lead from ${lead.campaign}:\n\n` +
      `Name: ${lead.name}\n` +
      `Phone: ${lead.phone}\n` +
      `PIN Code: ${lead.pin || "-"}\n` +
      `Source: ${lead.source}\n` +
      `Campaign: ${lead.campaign}\n` +
      `Time: ${lead.submittedAt}\n`,
  });
  return true;
}
