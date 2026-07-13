/**
 * Madhavbaug Cardio-Metabolic Health Risk score.
 *
 * Weighted scoring (max 105) + mandatory clinical override rules, per the
 * clinical formula supplied by the client. Pure + deterministic so it can be
 * unit-tested independently of the UI.
 */

export type Activity = "high" | "moderate" | "sedentary";
export type Smoking = "non" | "past" | "regular";
export type Gender = "male" | "female" | "other" | "";
export type RiskCategory = "Low" | "Moderate" | "High";

export type RiskInput = {
  age: number;
  gender?: Gender; // captured for future use, not scored
  heightCm: number;
  weightKg: number;
  systolicBp: number;
  fastingSugar: number;
  activity: Activity;
  smoking: Smoking;
  familyDiabetes: boolean;
  familyHeart: boolean;
};

export type RiskBreakdownRow = { label: string; value: string; score: number; max: number };

export type RiskResult = {
  bmi: number;
  totalScore: number;
  maxScore: number;
  percent: number;
  category: RiskCategory;
  overrideApplied: boolean;
  breakdown: RiskBreakdownRow[];
};

const round1 = (n: number) => Math.round(n * 10) / 10;

export function calculateRisk(input: RiskInput): RiskResult {
  const { age, heightCm, weightKg, systolicBp: bp, fastingSugar: sugar, activity, smoking } = input;

  // ---- BMI ----
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? round1(weightKg / (heightM * heightM)) : 0;
  const bmiScore = bmi < 23 ? 0 : bmi < 27.5 ? 10 : 20;

  // ---- Age ----
  const ageScore = age < 35 ? 0 : age < 50 ? 5 : 10;

  // ---- Systolic BP ----
  const bpScore = bp < 120 ? 0 : bp < 140 ? 10 : 20;

  // ---- Fasting blood sugar ----
  const sugarScore = sugar < 100 ? 0 : sugar < 126 ? 10 : 20;

  // ---- Physical activity ----
  const activityScore = activity === "high" ? 0 : activity === "moderate" ? 5 : 10;

  // ---- Smoking ----
  const smokingScore = smoking === "non" ? 0 : smoking === "past" ? 8 : 15;

  // ---- Family history ----
  const famCount = (input.familyDiabetes ? 1 : 0) + (input.familyHeart ? 1 : 0);
  const familyScore = famCount === 0 ? 0 : famCount === 1 ? 5 : 10;

  const totalScore =
    bmiScore + ageScore + bpScore + sugarScore + activityScore + smokingScore + familyScore;
  const maxScore = 105;
  const percent = Math.round((totalScore / maxScore) * 100);

  // ---- Base category from percentage ----
  let category: RiskCategory = percent <= 30 ? "Low" : percent <= 60 ? "Moderate" : "High";
  const baseCategory = category;

  // ---- Mandatory clinical overrides ----
  const majorFactors = [
    bmi >= 27.5,
    bp >= 140,
    sugar >= 126,
    smoking === "regular",
    activity === "sedentary",
  ].filter(Boolean).length;

  if ((bmi >= 27.5 && (bp >= 140 || sugar >= 126)) || majorFactors >= 3) {
    category = "High";
  } else if ((sugar >= 126 || bp >= 140) && category === "Low") {
    // Clearly abnormal clinical values can never read as Low risk.
    category = "Moderate";
  }

  return {
    bmi,
    totalScore,
    maxScore,
    percent,
    category,
    overrideApplied: category !== baseCategory,
    breakdown: [
      { label: "BMI", value: bmi ? `${bmi} kg/m²` : "-", score: bmiScore, max: 20 },
      { label: "Age", value: `${age || 0} yrs`, score: ageScore, max: 10 },
      { label: "Blood Pressure", value: `${bp || 0} mmHg`, score: bpScore, max: 20 },
      { label: "Fasting Blood Sugar", value: `${sugar || 0} mg/dL`, score: sugarScore, max: 20 },
      { label: "Physical Activity", value: activityLabel(activity), score: activityScore, max: 10 },
      { label: "Smoking", value: smokingLabel(smoking), score: smokingScore, max: 15 },
      { label: "Family History", value: familyLabel(famCount), score: familyScore, max: 10 },
    ],
  };
}

function activityLabel(a: Activity) {
  return a === "high" ? "Highly Active" : a === "moderate" ? "Moderately Active" : "Sedentary";
}
function smokingLabel(s: Smoking) {
  return s === "non" ? "Non-smoker" : s === "past" ? "Past / Occasional" : "Regular Smoker";
}
function familyLabel(count: number) {
  return count === 0 ? "None" : count === 1 ? "One condition" : "Both conditions";
}

export const riskMeta: Record<RiskCategory, { color: string; ring: string; text: string; note: string }> = {
  Low: {
    color: "#16a34a",
    ring: "ring-green-500/20",
    text: "text-green-600",
    note: "Your current cardio-metabolic risk appears low. Keep up your healthy habits and review your numbers periodically.",
  },
  Moderate: {
    color: "#d97706",
    ring: "ring-amber-500/20",
    text: "text-amber-600",
    note: "You have some risk factors worth addressing. A structured lifestyle and diet plan can help you lower your risk.",
  },
  High: {
    color: "#dc2626",
    ring: "ring-red-500/20",
    text: "text-red-600",
    note: "Several risk factors need attention. We strongly recommend a doctor consultation for a personalised care plan.",
  },
};
