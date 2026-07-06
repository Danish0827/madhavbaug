/**
 * Placeholder content for the single-clinic page carousels.
 * The clinic API does not yet return per-clinic treatments / stories, so these
 * are passed into the page as props for now and can be swapped for live data
 * once the API exposes them.
 */

export type Treatment = {
  tag: string;
  title: string;
  description: string;
  /** lucide-react icon name, mapped to a component in the carousel. */
  icon: string;
};

export const clinicTreatments: Treatment[] = [
  {
    tag: "Diagnostics",
    title: "PowerMAP Assessment",
    description: "Proprietary cardiac mapping that pinpoints the root cause before treatment begins.",
    icon: "Activity",
  },
  {
    tag: "Diagnostics",
    title: "Precision Stress ECG",
    description: "Exercise ECG diagnostics to accurately measure your cardiac exercise tolerance.",
    icon: "HeartPulse",
  },
  {
    tag: "Diagnostics",
    title: "Ambulatory BP Monitoring",
    description: "24-hour blood-pressure tracking for a true picture of your hypertension.",
    icon: "Gauge",
  },
  {
    tag: "Therapy",
    title: "SHS Protocol",
    description: "Sampurna Hruday Shuddhikaran - doctor-administered, non-invasive heart therapy.",
    icon: "Heart",
  },
  {
    tag: "Therapy",
    title: "CDC Program",
    description: "Comprehensive Diabetes Care designed for sustainable type-2 diabetes reversal.",
    icon: "Droplets",
  },
  {
    tag: "Therapy",
    title: "Panchakarma Therapies",
    description: "Classical Ayurvedic detox therapies, all under medical supervision.",
    icon: "Leaf",
  },
  {
    tag: "Nutrition",
    title: "BMR-Aligned Diet Plans",
    description: "Personalised cellular nutrition mapped to your metabolic rate.",
    icon: "Salad",
  },
  {
    tag: "Coaching",
    title: "Guided Cardio-Rehab",
    description: "Supervised activity programs that rebuild stamina safely.",
    icon: "Dumbbell",
  },
];
