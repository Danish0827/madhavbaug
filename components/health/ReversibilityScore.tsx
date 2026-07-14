"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Activity as ActivityIcon, RotateCcw, Sparkles } from "lucide-react";
import {
  calcDiabetesReversibility,
  REVERSIBILITY_PATIENT_LABEL,
  type ReversibilityTier,
} from "@/lib/reversibility";

/**
 * Four condition tabs. Only conditions with an outcome dataset are `enabled`
 * and rendered — the rest are scaffolded and hidden. When data arrives for a
 * condition, flip `enabled: true` (and add its panel) to reveal its tab.
 */
type Condition = { key: string; label: string; enabled: boolean };

const CONDITIONS: Condition[] = [
  { key: "diabetes", label: "Diabetes", enabled: true },
  { key: "hypertension", label: "Hypertension", enabled: false },
  { key: "obesity", label: "Obesity", enabled: false },
  { key: "heart-blockage", label: "Heart Blockage", enabled: false },
];

const tierMeta: Record<ReversibilityTier, { color: string; ring: string; note: string }> = {
  High: { color: "#16a34a", ring: "ring-green-200", note: "High potential for HbA1c improvement." },
  Moderate: {
    color: "#d97706",
    ring: "ring-amber-200",
    note: "Good potential with committed lifestyle and treatment.",
  },
  Guarded: {
    color: "#dc2626",
    ring: "ring-red-200",
    note: "Improvement is achievable, but needs close medical support.",
  },
};

export default function ReversibilityScore() {
  const tabs = CONDITIONS.filter((c) => c.enabled);
  const [tab, setTab] = useState(tabs[0]?.key ?? "diabetes");

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* ---------- Condition tabs ---------- */}
      <div className="mb-8 flex flex-wrap justify-center gap-2.5">
        {tabs.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setTab(c.key)}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
              tab === c.key
                ? "btn-gradient text-white shadow-md shadow-brand-purple/20"
                : "bg-white text-gray-600 ring-1 ring-gray-200 hover:text-brand-purple"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {tab === "diabetes" && <DiabetesPanel />}
    </div>
  );
}

/* ------------------------------------------------------------- diabetes tab */

function DiabetesPanel() {
  const [hba1c, setHba1c] = useState("");
  const [fbs, setFbs] = useState("");
  const [family, setFamily] = useState<"" | "yes" | "no">("");

  const result = useMemo(() => {
    const v = Number(hba1c);
    if (!hba1c || Number.isNaN(v) || v <= 0) return null;
    return calcDiabetesReversibility(v);
  }, [hba1c]);

  const reset = () => {
    setHba1c("");
    setFbs("");
    setFamily("");
  };

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
      {/* ---------- Inputs ---------- */}
      <div className="flex flex-col rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg text-ink sm:text-xl">Diabetes Reversibility Score</h3>
            <p className="text-sm text-gray-500">Enter your latest HbA1c to see your estimate.</p>
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <NumberField
            label="HbA1c"
            unit="%"
            value={hba1c}
            onChange={setHba1c}
            placeholder="e.g. 7.8"
            step="0.1"
          />
          <NumberField
            label="Fasting Blood Sugar"
            unit="mg/dL"
            value={fbs}
            onChange={setFbs}
            placeholder="e.g. 130"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-ink">Family History: Diabetes</label>
          <div className="grid grid-cols-2 gap-3">
            <Choice label="Yes" active={family === "yes"} onClick={() => setFamily(family === "yes" ? "" : "yes")} />
            <Choice label="No" active={family === "no"} onClick={() => setFamily(family === "no" ? "" : "no")} />
          </div>
        </div>

        <div className="mt-auto pt-7">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple hover:underline"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <p className="mt-4 text-xs leading-relaxed text-gray-400">
            Your score is calculated from your HbA1c, based on the real 90-day outcomes of{" "}
            {REVERSIBILITY_PATIENT_LABEL} Madhavbaug patients.
          </p>
        </div>
      </div>

      {/* ---------- Result ---------- */}
      <div>
        {!result ? (
          <div className="flex h-full min-h-[440px] flex-col items-center justify-center rounded-[28px] bg-surface-lav p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-purple shadow-sm">
              <ActivityIcon className="h-8 w-8" />
            </span>
            <h3 className="font-display mt-4 text-lg text-ink">Your Reversibility Score</h3>
            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Enter your HbA1c to see your estimated improvement and likelihood of reaching HbA1c
              below 7%.
            </p>
          </div>
        ) : (
          <ResultPanel result={result} fbs={fbs} family={family} />
        )}
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  fbs,
  family,
}: {
  result: ReturnType<typeof calcDiabetesReversibility>;
  fbs: string;
  family: "" | "yes" | "no";
}) {
  const meta = tierMeta[result.tier];
  const R = 84;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - Math.min(result.score, 100) / 100);

  return (
    <div className={`flex h-full flex-col rounded-[28px] bg-white p-6 shadow-lg ring-1 ${meta.ring} sm:p-8`}>
      <div className="flex flex-col items-center">
        <div className="relative h-48 w-48 sm:h-52 sm:w-52">
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
            <span className="font-display text-4xl text-ink">{result.score}%</span>
            <span className="text-xs font-medium text-gray-400">Reversibility Score</span>
          </div>
        </div>
        <span
          className="mt-4 inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: meta.color }}
        >
          {result.tier} Potential
        </span>
        <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">{meta.note}</p>
      </div>

      {/* Evidence line */}
      <p className="mt-5 rounded-2xl bg-surface-lav px-4 py-3 text-center text-xs leading-relaxed text-gray-600">
        Patients starting with an HbA1c of <strong className="text-ink">{result.band.label}</strong>{" "}
        averaged a <strong className="text-ink">{result.reduction}-unit</strong> reduction within
        ~90 days, and <strong className="text-ink">{result.score}%</strong> reached HbA1c &lt; 7%.
      </p>

      {/* Stat tiles */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Est. HbA1c after ~90 days" value={`${result.estimatedAfter}%`} />
        <Stat label="Avg expected reduction" value={`${result.reduction} units`} />
      </div>

      {(fbs || family) && (
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          <span className="font-medium text-gray-600">Your inputs: </span>
          {fbs && <>Fasting sugar {fbs} mg/dL. </>}
          {family && <>Family history of diabetes: {family === "yes" ? "Yes" : "No"}.</>}
        </p>
      )}

      <Link
        href="/clinic-hospital-locator"
        className="btn-gradient mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
      >
        Book a Consultation <ArrowUpRight className="h-4 w-4" />
      </Link>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-400">
        This is an estimate based on historical patient outcomes, not a guaranteed individual result
        or a medical diagnosis. Please consult a Madhavbaug doctor for a complete evaluation.
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
  step,
}: {
  label: string;
  unit?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
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
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
      />
    </div>
  );
}

function Choice({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-full border text-sm font-medium transition-colors ${
        active
          ? "border-brand-purple bg-brand-purple text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-brand-purple/50"
      }`}
    >
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-lav px-4 py-4 text-center">
      <p className="font-display text-2xl text-ink">{value}</p>
      <p className="mt-1 text-xs leading-tight text-gray-500">{label}</p>
    </div>
  );
}
