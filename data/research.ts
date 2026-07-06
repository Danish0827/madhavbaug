// Content for the "Our Research" page (Figma node 494-70).
// No live WordPress endpoint exists for research, so this is static, editable copy.

export type HeroStat = { number: string; label: string };

export const researchHero = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Research" },
  ],
  title: "Backing Healing with Clinical Data",
  description:
    "Explore the peer-reviewed studies and clinical evidence validating Madhavbaug's non-surgical approach to chronic disease reversal.",
};

export const heroStats: HeroStat[] = [
  { number: "150+", label: "Peer-Reviewed Research Papers" },
  { number: "150+", label: "Clinical Trials & Retrospective Studies" },
  { number: "1 Million+", label: "Cases Tracked & Studied" },
];

// ---------- Core Research Pillars (What We Study) ----------
export type ResearchPillar = {
  image: string;
  title: string;
  description: string;
};

export const researchPillars: ResearchPillar[] = [
  {
    image: "/assets/research/pillar-cardio.png",
    title: "Cardiovascular Reversal",
    description:
      "Testing the reduction of arterial blockages and the enhancement of myocardial function without surgical interventions.",
  },
  {
    image: "/assets/research/pillar-metabolic.png",
    title: "Metabolic Optimization",
    description:
      "Evaluating glycaemic control (HbA1c reduction) and medication de-escalation in type 2 diabetes.",
  },
  {
    image: "/assets/research/pillar-hemo.png",
    title: "Hemodynamic Performance",
    description:
      "Studying physical endurance, VO2 max improvements, and blood pressure regulation through integrated care.",
  },
];

// ---------- Major Clinical Breakthroughs & Protocols (carousel) ----------
export type Protocol = {
  title: string;
  approach: string;
  proof: string;
};

export const protocols: Protocol[] = [
  {
    title: "Heart Failure Reversal Therapy (HFRT)",
    approach:
      "Our HFRT uses a specialised four-step Ayurvedic Panchakarma procedure combined with medically guided exercise and tailored lifestyle modifications to safely improve heart function.",
    proof:
      "Peer-reviewed studies show that HFRT significantly increases the heart's pumping capacity (left ventricular ejection fraction) and reduces heart distress markers (NT-proBNP), leading to much better daily energy and stamina.",
  },
  {
    title: "Comprehensive Diabetes Care (CDC) Protocol",
    approach:
      'The CDC program targets the root cause of diabetes - insulin resistance - using medically guided lifestyle changes with specialised herbal formulations and our low-carbohydrate "Prameha Diet".',
    proof:
      "Published clinical data show a lasting reduction in HbA1c levels. Most importantly, patients safely reduced or completely stopped their dependency on allopathic medication. Research papers have proven reduction in correlating parameters like weight, helping control obesity and associated risk factors such as hypertension and other lifestyle diseases.",
  },
  {
    title: "Hypertension Reversal Protocol",
    approach:
      "A non-invasive, drug-minimising protocol combining external Panchakarma therapies, a low-sodium diet plan and guided physical activity to restore healthy vascular tone.",
    proof:
      "Clinical reviews record a sustained normalisation of systolic and diastolic blood pressure, protecting patients from long-term arterial and organ damage.",
  },
  {
    title: "Obesity & Metabolic Syndrome Program",
    approach:
      "An integrated weight-management protocol pairing our metabolic diet with cardio-safe exercise and herbal support to correct the underlying metabolic imbalance.",
    proof:
      "Documented outcomes show measurable reductions in weight, waist circumference and lipid profiles, lowering the combined risk of diabetes and heart disease.",
  },
];

// ---------- Featured Peer-Reviewed Publications ----------
export type Publication = {
  title: string;
  journal: string;
  challenge: string;
  approach: string;
  resultLabel: string;
  result: string;
  href?: string;
};

export const publications: Publication[] = [
  {
    title: "Diabetes & Medication Dependency",
    journal: "World Journal of Pharmaceutical Research (WJPR) - May 2026",
    challenge:
      "Managing Type 2 Diabetes while dealing with a heavy daily burden of multiple prescription pills.",
    approach:
      "A retrospective study of 67 patients using specialised Ayurvedic Panchakarma paired with personalised lifestyle care.",
    resultLabel: "80%+ Success Rate:",
    result:
      "Patients achieved excellent blood sugar control while safely and significantly reducing or completely stopping their dependency on synthetic antidiabetic drugs.",
  },
  {
    title: "Complete Diabetes Remission",
    journal:
      "International Journal of Scientific Research and Technology (IJSRT) - May 2026",
    challenge:
      "Finding a way to truly reverse Type 2 Diabetes rather than just managing symptoms indefinitely.",
    approach:
      "A clinical case series tracking the progress of patients through our intensive multimodal lifestyle programme.",
    resultLabel: "GTT-Negative Remission",
    result:
      "Following the programme, patients successfully tested negative on the rigorous oral Glucose Tolerance Test (GTT), the gold standard medical proof for complete diabetes remission.",
  },
  {
    title: "Cardiology & Heart Attack Risk",
    journal:
      "European Journal of Biomedical and Pharmaceutical Sciences (EJBPS) - June 2026",
    challenge:
      "Managing Type 2 Diabetes when it is complicated by secondary heart risks like high blood pressure, poor cholesterol, and excess weight.",
    approach:
      "Applying our Comprehensive Diabetes Care (CDC SP) programme to target the underlying metabolic roots of cardiovascular stress.",
    resultLabel: "80%+ Success Rate:",
    result:
      "Hard data confirmed a simultaneous improvement across all major heart risk factors, successfully lowering blood pressure, optimising lipid profiles, and reducing obesity.",
  },
  {
    title: "Cardiology & Heart Strain",
    journal:
      "International Journal of Innovative Science and Research Technology (IJISRT) - June 2026",
    challenge:
      "High resting heart rates in diabetic patients, which acts as a major warning sign for potential cardiac events.",
    approach:
      "A retrospective study analysing patients at our Nashik clinic undergoing a targeted Panchakarma-led protocol.",
    resultLabel: "GTT-Negative Remission",
    result:
      "Patients achieved a safe, measurable reduction in their resting heart rate, directly lowering the daily workload and strain on the heart muscle.",
  },
  {
    title: "Hypertension & Blood Pressure",
    journal:
      "Indian Journal of Clinical and Medical Research (INDJCMR) - May 2026",
    challenge:
      "Struggling with concurrent type 2 Diabetes and stubborn, high diastolic blood pressure.",
    approach:
      "A clinical review of 44 patients using a tailored, non-invasive Ayurvedic multimodal protocol.",
    resultLabel: "Vascular Protection",
    result:
      "The protocol successfully normalised diastolic blood pressure metrics, significantly protecting patients from long-term blood vessel and arterial damage.",
  },
];

// ---------- Global Presentations ----------
export type Presentation = {
  title: string;
  description: string;
};

export const presentationsIntro =
  "From international cardiology congresses to global healthcare forums, our clinical team shares Madhavbaug's peer-reviewed outcomes with the world's leading medical minds.";

export const presentations: Presentation[] = [
  {
    title: "World Cardiology Congress (Beijing & Dubai)",
    description:
      "Madhavbaug presented key milestones on the clinical utility of Sampurna Hruday Shuddhi Karan (Total Heart Purification). The data showcased how this standardised protocol safely addresses chronic cardiac risk factors, earning recognition from mainstream international cardiologists.",
  },
  {
    title: "International Healthcare Forums",
    description:
      "We regularly present peer-reviewed statistical outcomes on chronic disease reversal, proving that structured lifestyle modifications and Ayurvedic science can safely support frontline cardiovascular care.",
  },
];
