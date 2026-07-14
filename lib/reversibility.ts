/**
 * Diabetes Reversibility Score — data-driven, HbA1c-based.
 *
 * The bands below come from the real 90-day outcomes of 19,565 Madhavbaug
 * patient records (baseline HbA1c -> average reduction + % who reached
 * HbA1c < 7%). The score is intentionally driven ONLY by HbA1c, per the
 * clinical brief. Pure + deterministic so it can be unit-tested.
 *
 * Other conditions (hypertension, obesity, heart blockage) are scaffolded in
 * the UI but hidden until their own outcome datasets are supplied.
 */

export type ConditionKey = "diabetes" | "hypertension" | "obesity" | "heart-blockage";

export type ReversibilityTier = "High" | "Moderate" | "Guarded";

export type ReversibilityBand = {
  /** Human label for the baseline HbA1c band, e.g. "7.5 - 8.5%". */
  label: string;
  min: number;
  max: number;
  /** Average HbA1c-unit reduction observed at ~90 days. */
  reduction: number;
  /** % of patients in this band who reached HbA1c < 7%. */
  score: number;
};

/** Total patients behind the model (for the "based on N patients" copy). */
export const REVERSIBILITY_PATIENT_N = 19565;
export const REVERSIBILITY_PATIENT_LABEL = "19,565";

export const DIABETES_BANDS: ReversibilityBand[] = [
  { label: "< 6.5%", min: -Infinity, max: 6.5, reduction: 0.1, score: 95 },
  { label: "6.5 - 7.5%", min: 6.5, max: 7.5, reduction: 0.8, score: 90 },
  { label: "7.5 - 8.5%", min: 7.5, max: 8.5, reduction: 1.4, score: 76 },
  { label: "8.5 - 9.5%", min: 8.5, max: 9.5, reduction: 2.0, score: 61 },
  { label: "> 9.5%", min: 9.5, max: Infinity, reduction: 3.4, score: 40 },
];

export type DiabetesReversibility = {
  band: ReversibilityBand;
  /** Reversibility Score (%) = likelihood of reaching HbA1c < 7%. */
  score: number;
  /** Average expected HbA1c-unit reduction. */
  reduction: number;
  /** Estimated HbA1c after ~90 days = baseline - reduction. */
  estimatedAfter: number;
  tier: ReversibilityTier;
};

const round1 = (n: number) => Math.round(n * 10) / 10;

export function calcDiabetesReversibility(hba1c: number): DiabetesReversibility {
  const band =
    DIABETES_BANDS.find((b) => hba1c >= b.min && hba1c < b.max) ??
    DIABETES_BANDS[DIABETES_BANDS.length - 1];
  const estimatedAfter = round1(Math.max(0, hba1c - band.reduction));
  const tier: ReversibilityTier = band.score >= 75 ? "High" : band.score >= 55 ? "Moderate" : "Guarded";
  return { band, score: band.score, reduction: band.reduction, estimatedAfter, tier };
}
