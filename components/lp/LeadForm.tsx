"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ArrowUpRight } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({
  source = "Website",
  campaign = "Website Landing Page",
}: {
  source?: string;
  campaign?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const getParam = (key: string) => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get(key) || "";
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      pin: String(fd.get("pin") || ""),
      company: String(fd.get("company") || ""),

      source,
      campaign,

      email: "",
      disease: "",

      landing_page: window.location.href,
      referrer: document.referrer,

      utm_source: getParam("utm_source"),
      utm_medium: getParam("utm_medium"),
      utm_campaign: getParam("utm_campaign"),
      utm_network: getParam("utm_network"),
      utm_keyword: getParam("utm_term"),
      utm_location: getParam("utm_location"),

      campaign_id: getParam("campaignid"),
      adset_id: getParam("adgroupid"),
      ad_id: getParam("creative"),
      match_type: getParam("matchtype"),
      placement: getParam("placement"),
      gclid: getParam("gclid"),
      fbclid: getParam("fbclid"),
    };

    if (!payload.name.trim()) {
      setStatus("error");
      setError("Please enter your name.");
      return;
    }

    if (payload.phone.replace(/\D/g, "").length !== 10) {
      setStatus("error");
      setError("Please enter a valid mobile number.");
      return;
    }

    try {
      setStatus("submitting");
      setError("");

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 bg-white p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center bg-teal-deep/10 text-teal-deep">
          <CheckCircle2 className="h-7 w-7" />
        </span>

        <h3 className="font-display text-xl text-ink">
          Thank you!
        </h3>

        <p className="text-sm text-gray-600">
          Our team will contact you shortly.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-brand-purple text-sm hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-[40px] bg-white px-6 lg:px-0 -mt-20 lg:-mt-10"
    >
      <h3 className="pt-10 my-6 text-center font-serif text-2xl lg:text-[32px] font-medium text-[#2E2E2E]">
        Book an Appointment
      </h3>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <Field
          name="name"
          type="text"
          placeholder="Full Name *"
          required
        />

        <Field
          name="phone"
          type="tel"
          placeholder="Mobile Number *"
          required
        />

        <Field
          name="pin"
          type="text"
          placeholder="PIN Code"
        />

        <div className="shrink-0">
          <button
            disabled={status === "submitting"}
            className="group inline-flex items-center disabled:opacity-50"
          >
            <span className="btn-gradient inline-flex h-12 items-center rounded-full px-8 text-sm font-medium text-white">
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Request Callback"
              )}
            </span>

            <span className="flex h-12 w-12 items-center justify-center rounded-full">
              <ArrowUpRight className="btn-gradient h-full w-full rounded-full p-3 text-white transition group-hover:rotate-45" />
            </span>
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-[#9A9A9A]">
        By submitting this form, you agree to receive important updates and
        promotional messages via Email, SMS, RCS and WhatsApp.
      </p>

      {status === "error" && (
        <p className="mt-4 text-center text-red-600 text-sm">
          {error}
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  type,
  placeholder,
  required,
}: {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="w-full">
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
      />
    </div>
  );
}