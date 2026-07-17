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
  company?: string;

  email?: string;
  disease?: string;

  landing_page?: string;
  referrer?: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_network?: string;
  utm_keyword?: string;
  utm_location?: string;

  campaign_id?: string;
  adset_id?: string;
  ad_id?: string;
  match_type?: string;
  placement?: string;
  gclid?: string;
  fbclid?: string;
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

  const lead: Lead = {
    name,
    phone,
    pin,
    source,
    campaign,
    submittedAt: new Date().toISOString(),

    email: body.email,
    disease: body.disease,

    landing_page: body.landing_page,
    referrer: body.referrer,

    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    utm_campaign: body.utm_campaign,
    utm_network: body.utm_network,
    utm_keyword: body.utm_keyword,
    utm_location: body.utm_location,

    campaign_id: body.campaign_id,
    adset_id: body.adset_id,
    ad_id: body.ad_id,
    match_type: body.match_type,
    placement: body.placement,
    gclid: body.gclid,
    fbclid: body.fbclid,
  };

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

  email?: string;
  disease?: string;

  landing_page?: string;
  referrer?: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_network?: string;
  utm_keyword?: string;
  utm_location?: string;

  campaign_id?: string;
  adset_id?: string;
  ad_id?: string;
  match_type?: string;
  placement?: string;
  gclid?: string;
  fbclid?: string;
};
async function sendToCrm(lead: Lead): Promise<boolean> {
  const url = process.env.CRM_API_URL;
  const key = process.env.CRM_API_KEY;

  if (!url || !key) return false;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
    },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      email: lead.email || "",
      disease: lead.disease || "",
      city: lead.pin,

      source: lead.source,
      campaign: lead.campaign,

      utm_source: lead.utm_source,
      utm_medium: lead.utm_medium,
      utm_campaign: lead.utm_campaign,
      utm_network: lead.utm_network,
      utm_keyword: lead.utm_keyword,
      utm_location: lead.utm_location,

      campaignid: lead.campaign_id,
      adgroupid: lead.adset_id,
      creative: lead.ad_id,
      matchtype: lead.match_type,
      placement: lead.placement,
      gclid: lead.gclid,

      landing_page: lead.landing_page,
      referrer: lead.referrer,
    }),
    signal: AbortSignal.timeout(50000),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  console.log(await res.text());

  return true;
}

async function sendEmail(lead: Lead): Promise<boolean> {
  const host = process.env.LEAD_MAIL_HOST;
  const user = process.env.LEAD_MAIL_USER;
  const pass = process.env.LEAD_MAIL_PASS;
  const to = ['danish@healthus.ai','healthusads@gmail.com'];
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
      `New Lead Received\n\n` +

      `Name: ${lead.name}\n` +
      `Phone: ${lead.phone}\n` +
      `Email: ${lead.email || "-"}\n` +
      `Disease: ${lead.disease || "-"}\n` +
      `PIN Code: ${lead.pin || "-"}\n\n` +

      `Source: ${lead.source}\n` +
      `Campaign: ${lead.campaign}\n` +
      `Submitted At: ${lead.submittedAt}\n\n` +

      `Landing Page: ${lead.landing_page || "-"}\n` +
      `Referrer: ${lead.referrer || "-"}\n\n` +

      `------------- UTM Details -------------\n` +
      `UTM Source: ${lead.utm_source || "-"}\n` +
      `UTM Medium: ${lead.utm_medium || "-"}\n` +
      `UTM Campaign: ${lead.utm_campaign || "-"}\n` +
      `UTM Network: ${lead.utm_network || "-"}\n` +
      `UTM Keyword: ${lead.utm_keyword || "-"}\n` +
      `UTM Location: ${lead.utm_location || "-"}\n\n` +

      `Campaign ID: ${lead.campaign_id || "-"}\n` +
      `Adset ID: ${lead.adset_id || "-"}\n` +
      `Ad ID: ${lead.ad_id || "-"}\n` +
      `Match Type: ${lead.match_type || "-"}\n` +
      `Placement: ${lead.placement || "-"}\n` +
      `GCLID: ${lead.gclid || "-"}\n` +
      `FBCLID: ${lead.fbclid || "-"}\n`,
  });
  return true;
}
