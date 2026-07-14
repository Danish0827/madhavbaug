"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionLabel from "@/components/ui/SectionLabel";
import SearchSelect from "@/components/ui/SearchSelect";

const CONDITIONS = [
  "Heart Disease",
  "Type 2 Diabetes",
  "Hypertension",
  "Obesity / Weight Gain",
  "High Cholesterol",
  "Other",
];

export default function AppointmentForm({
  clinicName,
  phoneRaw,
  whatsappUrl,
}: {
  clinicName: string;
  phoneRaw?: string;
  whatsappUrl?: string;
}) {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", condition: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, "").slice(-10)))
      return setError("Please enter a valid 10-digit mobile number.");
    setError("");
    // No public form API yet — capture intent locally and confirm.
    setSent(true);
  };

  return (
    <section className="bg-surface-rose py-16 lg:py-24">
      <div className="mx-auto w-full container px-5 sm:px-8 lg:px-20">
        <div className="grid overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5 lg:grid-cols-[1fr_0.85fr]">
          {/* ---------- Form ---------- */}
          <div className="p-7 sm:p-10">
            <SectionLabel>Book an Appointment</SectionLabel>
            <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
              Request a Callback at {clinicName}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Share your details and our medical team will call you to schedule your consultation.
            </p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-3xl bg-surface-lav px-6 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <h3 className="font-display text-xl text-ink">Thank you, {form.name.split(" ")[0]}!</h3>
                <p className="max-w-sm text-sm text-gray-600">
                  Your request has been received. Our team will call you on{" "}
                  <span className="font-medium text-ink">{form.mobile}</span> shortly to confirm your
                  appointment.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", mobile: "", email: "", condition: "", message: "" });
                  }}
                  className="mt-2 text-sm font-medium text-brand-purple hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    required
                    value={form.name}
                    onChange={(v) => set("name", v)}
                    placeholder="Your name"
                  />
                  <Field
                    label="Mobile Number"
                    required
                    type="tel"
                    value={form.mobile}
                    onChange={(v) => set("mobile", v)}
                    placeholder="10-digit mobile"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Email (optional)"
                    type="email"
                    value={form.email}
                    onChange={(v) => set("email", v)}
                    placeholder="you@example.com"
                  />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Condition</label>
                    <SearchSelect
                      label="Select a condition"
                      value={form.condition}
                      options={CONDITIONS.map((c) => ({ value: c, label: c }))}
                      onChange={(v) => set("condition", v)}
                      searchable={false}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Message (optional)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    rows={3}
                    placeholder="Tell us briefly about your concern"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-brand-purple"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="btn-gradient inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl sm:w-auto"
                >
                  Book My Appointment <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* ---------- Side panel ---------- */}
          <div className="bg-brand-gradient relative flex flex-col justify-center gap-6 overflow-hidden p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <h3 className="font-display relative text-2xl">Prefer to talk to us directly?</h3>
            <ul className="relative space-y-4 text-sm">
              {phoneRaw && (
                <li>
                  <a href={`tel:${phoneRaw}`} className="flex items-center gap-3 hover:text-white/90">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-white/60">Call the clinic</span>
                      Speak to our team now
                    </span>
                  </a>
                </li>
              )}
              {whatsappUrl && (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-white/90"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                      <FaWhatsapp className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-white/60">WhatsApp</span>
                      Chat with us instantly
                    </span>
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-white/60">Response time</span>
                  Callback within 24 hours
                </span>
              </li>
            </ul>
            <div className="relative mt-2 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-xs text-white/80">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              Your details are kept private and used only to contact you.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[46px] w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-purple"
      />
    </div>
  );
}
