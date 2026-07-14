"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCcw, Activity as ActivityIcon, Info } from "lucide-react";
import SearchSelect from "@/components/ui/SearchSelect";
import {
  calculateRisk,
  riskMeta,
  type Activity,
  type Smoking,
  type Gender,
} from "@/lib/riskCalculator";

type FormState = {
  age: string;
  gender: Gender;
  height: string;
  weight: string;
  bp: string;
  sugar: string;
  activity: Activity;
  smoking: Smoking;
  familyDiabetes: boolean;
  familyHeart: boolean;
};

const initial: FormState = {
  age: "",
  gender: "",
  height: "",
  weight: "",
  bp: "",
  sugar: "",
  activity: "moderate",
  smoking: "non",
  familyDiabetes: false,
  familyHeart: false,
};

export default function RiskCalculator() {
  const [f, setF] = useState<FormState>(initial);

  const filled =
    f.age !== "" && f.height !== "" && f.weight !== "" && f.bp !== "" && f.sugar !== "";

  const result = useMemo(() => {
    if (!filled) return null;
    return calculateRisk({
      age: Number(f.age),
      gender: f.gender,
      heightCm: Number(f.height),
      weightKg: Number(f.weight),
      systolicBp: Number(f.bp),
      fastingSugar: Number(f.sugar),
      activity: f.activity,
      smoking: f.smoking,
      familyDiabetes: f.familyDiabetes,
      familyHeart: f.familyHeart,
    });
  }, [f, filled]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  return (
    <div className="mx-auto grid w-full container items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      {/* ---------- Inputs ---------- */}
      <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="font-display text-xl text-ink lg:text-2xl">Enter Your Details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your information is used only to calculate your score - nothing is stored.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <NumberField label="Age" unit="years" value={f.age} onChange={(v) => set("age", v)} placeholder="e.g. 42" />
          <SelectField
            label="Gender"
            hint="optional"
            value={f.gender}
            onChange={(v) => set("gender", v as Gender)}
            options={[
              { value: "", label: "Select" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
          <NumberField label="Height" unit="cm" value={f.height} onChange={(v) => set("height", v)} placeholder="e.g. 170" />
          <NumberField label="Weight" unit="kg" value={f.weight} onChange={(v) => set("weight", v)} placeholder="e.g. 72" />
          <NumberField label="Blood Pressure" unit="systolic, mmHg" value={f.bp} onChange={(v) => set("bp", v)} placeholder="e.g. 128" />
          <NumberField label="Fasting Blood Sugar" unit="mg/dL" value={f.sugar} onChange={(v) => set("sugar", v)} placeholder="e.g. 110" />
          <SelectField
            label="Physical Activity"
            clearable={false}
            value={f.activity}
            onChange={(v) => set("activity", v as Activity)}
            options={[
              { value: "high", label: "Highly Active" },
              { value: "moderate", label: "Moderately Active" },
              { value: "sedentary", label: "Sedentary" },
            ]}
          />
          <SelectField
            label="Smoking"
            clearable={false}
            value={f.smoking}
            onChange={(v) => set("smoking", v as Smoking)}
            options={[
              { value: "non", label: "Non-smoker" },
              { value: "past", label: "Past / Occasional" },
              { value: "regular", label: "Regular Smoker" },
            ]}
          />
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-ink">Family Medical History</p>
          <div className="flex flex-wrap gap-3">
            <CheckChip label="Diabetes" checked={f.familyDiabetes} onChange={(v) => set("familyDiabetes", v)} />
            <CheckChip label="Heart Disease / High BP" checked={f.familyHeart} onChange={(v) => set("familyHeart", v)} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setF(initial)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-purple hover:underline"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      {/* ---------- Result ---------- */}
      <div className="lg:sticky scroll-mt-2 lg:top-24">
        {!result ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] bg-surface-lav p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-purple shadow-sm">
              <ActivityIcon className="h-8 w-8" />
            </span>
            <h3 className="font-display mt-4 text-lg text-ink">Your Risk Score</h3>
            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Fill in Age, Height, Weight, Blood Pressure and Fasting Blood Sugar to see your
              personalised cardio-metabolic risk score.
            </p>
          </div>
        ) : (
          <ResultPanel result={result} />
        )}
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: ReturnType<typeof calculateRisk> }) {
  const meta = riskMeta[result.category];
  const R = 84;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - Math.min(result.percent, 100) / 100);

  return (
    <div className={`rounded-[28px] bg-white p-6 shadow-lg ring-1 ${meta.ring} sm:p-8`}>
      <div className="flex flex-col items-center">
        <div className="relative h-52 w-52">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" stroke="#eee" strokeWidth="16" />
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={meta.color}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl text-ink">{result.percent}%</span>
            <span className="text-xs font-medium text-gray-400">Risk Score</span>
          </div>
        </div>
        <span
          className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: meta.color }}
        >
          {result.category} Risk
        </span>
        {result.overrideApplied && (
          <p className="mt-3 flex items-center gap-1.5 text-center text-xs text-gray-500">
            <Info className="h-3.5 w-3.5" /> Adjusted for clinically significant values.
          </p>
        )}
        <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">{meta.note}</p>
      </div>
      {/* Breakdown */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <p className="mb-3 text-sm font-semibold text-ink">Score Breakdown</p>
        <ul className="space-y-2.5">
          {result.breakdown.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-gray-600">
                {row.label} <span className="text-gray-400">({row.value})</span>
              </span>
              <span className="font-medium text-ink">
                {row.score}
                <span className="text-gray-400"> / {row.max}</span>
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-3 border-t border-gray-100 pt-2.5 text-sm font-semibold">
            <span className="text-ink">Total</span>
            <span className="text-brand-purple">
              {result.totalScore} / {result.maxScore}
            </span>
          </li>
        </ul>
      </div>

      <Link
        href="/clinic-hospital-locator"
        className="btn-gradient mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
      >
        Book a Consultation <ArrowUpRight className="h-4 w-4" />
      </Link>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-400">
        This score is an educational screening estimate, not a medical diagnosis. Please consult a
        Madhavbaug doctor for a complete evaluation.
      </p>
    </div>
  );
}

/* ---------------- fields ---------------- */

function NumberField({
  label,
  unit,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  unit?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label} {unit && <span className="font-normal text-gray-400">({unit})</span>}
      </label>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-[45px] w-full rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
      />
    </div>
  );
}

function SelectField({
  label,
  hint,
  value,
  onChange,
  options,
  clearable = true,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  clearable?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label} {hint && <span className="font-normal text-gray-400">({hint})</span>}
      </label>
      <SearchSelect
        label={`Select ${label}`}
        value={value}
        options={options.filter((o) => o.value !== "")}
        onChange={onChange}
        searchable={false}
        clearable={clearable}
      />
    </div>
  );
}

function CheckChip({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        checked
          ? "border-brand-purple bg-brand-purple text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-brand-purple/50"
      }`}
    >
      {label}
    </button>
  );
}
