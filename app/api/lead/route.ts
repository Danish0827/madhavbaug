/**
 * Lead capture endpoint for the landing pages.
 *
 * On submit it (1) creates the lead in the PowerMAP CRM and (2) emails a
 * notification to LEAD_MAIL_TO via SMTP. All secrets come from env vars
 * (see .env.local): CRM_API_URL, CRM_API_KEY, LEAD_MAIL_* .
 */

import nodemailer from "nodemailer";

export const runtime = "nodejs";

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

  const submittedAt = new Date().toISOString();

  const [crm, mail] = await Promise.allSettled([
    sendToCrm({ name, phone, pin, source, campaign }),
    sendEmail({ name, phone, pin, source, campaign, submittedAt }),
  ]);

  const crmOk = crm.status === "fulfilled" && crm.value;
  const mailOk = mail.status === "fulfilled" && mail.value;

  if (crm.status === "rejected") console.error("[lead] CRM error:", crm.reason);
  if (mail.status === "rejected") console.error("[lead] mail error:", mail.reason);

  // Lead is considered captured if the CRM accepted it. Email is a secondary
  // notification and should not block the user's success state.
  if (!crmOk && !mailOk) {
    return Response.json(
      { ok: false, error: "We couldn't submit right now. Please call us or try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, crm: crmOk, mail: mailOk });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function sendToCrm(lead: {
  name: string;
  phone: string;
  pin: string;
  source: string;
  campaign: string;
}): Promise<boolean> {
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
    // Fail fast so the form never hangs if the CRM is unreachable.
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`CRM returned ${res.status} ${detail.slice(0, 200)}`);
  }
  return true;
}

async function sendEmail(lead: {
  name: string;
  phone: string;
  pin: string;
  source: string;
  campaign: string;
  submittedAt: string;
}): Promise<boolean> {
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
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 15000,
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
