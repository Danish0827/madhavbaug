"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Phone, ArrowUpRight } from "lucide-react";

export default function LeadForm({
  source = "Website",
  campaign = "Website Landing Page",
  compact = false,
}: {
  source?: string;
  campaign?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      pin: String(fd.get("pin") || ""),
      company: String(fd.get("company") || ""), // honeypot
      source,
      campaign,
    };

    if (!payload.name.trim() || payload.phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      setError("Please enter your name and a valid 10-digit phone number.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3  bg-white p-8 text-center   ring-black/5">
        <span className="flex h-14 w-14 items-center justify-center  bg-teal-deep/10 text-teal-deep">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="font-display text-xl text-ink">Thank you!</h3>
        <p className="text-sm text-gray-600">
          Your request has been received. Our care team will call you back shortly to help you book
          your consultation.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-brand-purple hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  
  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-[40px] bg-white px-6 lg:px-10 -mt-20 lg:-mt-10"
    >
      <h3 className="pt-10 my-6 text-center font-serif text-2xl lg:text-[32px] font-medium text-[#2E2E2E]">
        Book an Appointment
      </h3>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* <div className="flex flex-col gap-4 lg:flex lg:flex-row"> */}
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
{/* </div> */}
        <div className="flex-1">
          <input
            id="lead-pin"
            name="pin"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="PIN Code (optional)"
            className="h-14 w-full rounded-full border border-[#E8D8EC] px-6 text-[15px] outline-none transition focus:border-[#7E3FB6]"
          />
        </div>

        <div className="flex items-center ">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center cursor-pointer group disabled:opacity-60"
          >
            <span className="btn-gradient inline-flex h-12 items-center rounded-full px-8 text-sm font-medium text-white shadow-lg transition-all duration-300 group-hover:shadow-xl">
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
              <ArrowUpRight className="btn-gradient h-full w-full rounded-full p-3 text-white shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:shadow-xl" />
            </span>
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-[#9A9A9A]">
        By submitting this form, you agree to receive important updates and
        promotional messages via Email, SMS, RCS, and WhatsApp.
      </p>

      {status === "error" && (
        <p className="mt-3 text-center text-sm text-red-600">
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
    <div>
      {/* <label htmlFor={`lead-${name}`} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-purple">*</span>}
      </label> */}
      <input
        id={`lead-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
      />
    </div>
  );
}
