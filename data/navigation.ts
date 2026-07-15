/**
 * Navigation data for the Madhavbaug site.
 * All header / mega-menu / footer content lives here so the
 * presentation components stay purely structural.
 *
 * Links point to real built routes wherever a page exists; entries that
 * have no page yet keep "#" as an honest placeholder.
 */

export type NavLink = { label: string; href: string };

export type MegaColumn = {
  title: string;
  links: NavLink[];
};

export type MegaFeature = {
  eyebrow: string;
  title: string;
  description: string;
  cta: NavLink;
};

export type NavItem = {
  label: string;
  href: string;
  columns: MegaColumn[];
  feature?: MegaFeature;
};

/* ---------- Shared route constants ---------- */
const LOCATOR = "/clinic-hospital-locator";
const DIET = "/diet-plans";
const LIFESTYLE = "/lifestyle-exercise-guide";
const DOCTORS = "/our-doctors";
const DIABETES = "/treatments/diabetes";
const POWERMAP = "/powermap";

/* ---------- Top utility bar ---------- */
export const utilityLeft: NavLink[] = [
  { label: "Download mibPULSE App", href: "#" },
  { label: "Have a Question?", href: LOCATOR },
];

export const utilityRight: NavLink[] = [
  { label: "Careers", href: "#" },
  { label: "Nearest Centres", href: LOCATOR },
  { label: "Shop Now", href: "#" },
];

/* ---------- Main navigation + mega-menus ---------- */
export const mainNav: NavItem[] = [
  {
    label: "Conditions We Treat",
    href: "#conditions",
    columns: [
      {
        title: "Heart & Circulation",
        links: [
          { label: "Heart Disease", href: "#" },
          { label: "High Cholesterol", href: "#" },
          { label: "Triglycerides", href: "#" },
          { label: "Dyslipidemia", href: "#" },
          { label: "Hypertension", href: "#" },
        ],
      },
      {
        title: "Metabolic & Diabetes",
        links: [
          { label: "Type 2 Diabetes", href: DIABETES },
          { label: "Prediabetes", href: "#" },
          { label: "Insulin Resistance", href: "#" },
          { label: "Metabolic Syndrome", href: "#" },
          { label: "Obesity & Weight Gain", href: "#" },
        ],
      },
      {
        title: "Liver, Thyroid & More",
        links: [
          { label: "Fatty Liver Disease", href: "#" },
          { label: "NAFLD", href: "#" },
          { label: "Hypothyroidism", href: "#" },
          { label: "Stress & Heart Disease", href: "#" },
          { label: "Sleep Disorders", href: "#" },
        ],
      },
    ],
    feature: {
      eyebrow: "Not sure where to start?",
      title: "Check Your Health Risk",
      description:
        "Take a 2-minute clinical assessment and discover your personalised reversal pathway.",
      cta: { label: "Start Assessment", href: "#" },
    },
  },
  {
    label: "Treatments",
    href: "#treatments",
    columns: [
      {
        title: "Signature Therapies",
        links: [
          { label: "SHS Protocols", href: DIABETES },
          { label: "Specialized CDC Therapies", href: DIABETES },
          { label: "Cellular-Level Tissue Repair", href: "#" },
          { label: "Panchakarma Therapies", href: "#" },
        ],
      },
      {
        title: "Diagnostics",
        links: [
          { label: "PowerMAP Assessment", href: POWERMAP },
          { label: "Stress ECG Diagnostics", href: "#" },
          { label: "Ambulatory BP Monitoring", href: "#" },
        ],
      },
      {
        title: "Nutrition & Coaching",
        links: [
          { label: "BMR-Aligned Diet Plans", href: DIET },
          { label: "Guided Cardio-Rehab", href: LIFESTYLE },
          { label: "24/7 On-App Doctor Support", href: "#" },
        ],
      },
    ],
    feature: {
      eyebrow: "Evidence-based care",
      title: "Reverse, Don't Just Manage",
      description:
        "Doctor-administered, clinically validated protocols that target the root cause.",
      cta: { label: "Book a Consultation", href: LOCATOR },
    },
  },
  {
    label: "Programs",
    href: "#programs",
    columns: [
      {
        title: "Reversal Programs",
        links: [
          { label: "Heart Care Program", href: "#" },
          { label: "Diabetes Reversal", href: DIABETES },
          { label: "Hypertension Control", href: "#" },
          { label: "Weight Management", href: DIET },
        ],
      },
      {
        title: "Wellness Plans",
        links: [
          { label: "Lifestyle & Diet Plans", href: DIET },
          { label: "Cardio-Rehab Plan", href: LIFESTYLE },
          { label: "Cellular Nutrition Plan", href: DIET },
        ],
      },
    ],
    feature: {
      eyebrow: "Personalised",
      title: "Built Around You",
      description:
        "Every program is tailored to your reports, lifestyle and reversal goals.",
      cta: { label: "Explore Programs", href: DIET },
    },
  },
  {
    label: "Clinics & Hospitals",
    href: LOCATOR,
    columns: [
      {
        title: "Find Care",
        links: [
          { label: "Locate a Centre", href: LOCATOR },
          { label: "350+ Clinics", href: LOCATOR },
          { label: "5 Specialty Hospitals", href: LOCATOR },
          { label: "Book a Consultation", href: LOCATOR },
        ],
      },
      {
        title: "About Our Network",
        links: [
          { label: "NABH Accredited Care", href: "/about" },
          { label: "Standardised Protocols", href: "/about" },
          { label: "Our Medical Team", href: DOCTORS },
        ],
      },
    ],
    feature: {
      eyebrow: "350+ centres across India",
      title: "Care Close to Home",
      description:
        "Find expert, non-surgical reversal care right in your neighbourhood.",
      cta: { label: "Find Your Nearest Centre", href: LOCATOR },
    },
  },
];


export const lpNav:any  = [
  {
    label: "Why Madhavbaug",
    href: "#why-madhavbaug",   
  },
  {
    label: "Doctor-Led Assessment",
    href: "#doctor-led-assessment",
  },
  {
    label: "Who Should Book",
    href: "#who-should-book",
  },
  {
    label: "What Happens Next",
    href: "#what-happens-next",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
]
/* ---------- Footer ---------- */
export const footerColumns: MegaColumn[] = [
  {
    title: "About Us",
    links: [
      { label: "About Madhavbaug", href: "/about" },
      { label: "Dr. Rohit Sane", href: "/founder" },
      { label: "Board of Directors", href: "/board-of-directors" },
      { label: "Our Doctors", href: DOCTORS },
      { label: "Our Research", href: "/research" },
      { label: "Awards & Recognition", href: "/awards" },
      { label: "Why Madhavbaug", href: "/about" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Forum", href: "#" },
    ],
  },
  {
    title: "Patient Resources",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Diet Plans", href: DIET },
      { label: "Lifestyle Tips", href: LIFESTYLE },
      { label: "Exercise Guides", href: LIFESTYLE },
      { label: "Insurance", href: "/insurance" },
      { label: "Heart Health Resources", href: "#" },
      { label: "Diabetes Education", href: DIABETES },
    ],
  },
  {
    title: "Additional Lifestyle Disorders",
    links: [
      { label: "High Cholesterol Treatment", href: "#" },
      { label: "Triglycerides Management", href: "#" },
      { label: "Dyslipidemia Treatment", href: "#" },
      { label: "Fatty Liver Disease", href: "#" },
      { label: "NAFLD Treatment", href: "#" },
      { label: "Fatty Liver & Diabetes", href: "#" },
      { label: "Hypothyroidism", href: "#" },
      { label: "Weight Gain & Thyroid", href: "#" },
      { label: "Stress Management", href: "#" },
      { label: "Sleep Disorders", href: "#" },
      { label: "Stress & Heart Disease", href: "#" },
      { label: "Burnout & Metabolic Health", href: "#" },
      { label: "Metabolic Syndrome", href: "#" },
      { label: "Insulin Resistance", href: "#" },
      { label: "Prediabetes", href: "#" },
    ],
  },
  {
    title: "Success Stories",
    links: [
      { label: "Heart Disease Recovery Stories", href: "#" },
      { label: "Diabetes Transformation Stories", href: "#" },
      { label: "Weight Loss Stories", href: "#" },
      { label: "Video Testimonial", href: "#" },
    ],
  },
  {
    title: "Our Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Ayurvedic Medicines", href: "#" },
      { label: "Health Supplements", href: "#" },
      { label: "Diet & Wellness Products", href: "#" },
    ],
  },
  {
    title: "Health Score Tools",
    links: [
      { label: "Check Your Heart Score", href: "#" },
      { label: "Check Your Diabetes Score", href: "#" },
      { label: "Check Your Hypertension Score", href: "#" },
      { label: "Check Your Obesity Score", href: "#" },
    ],
  },
];

export const footerLegal: NavLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Compliance Certification", href: "#" },
  { label: "Financial Assistance", href: "#" },
  { label: "Investor Relations", href: "#" },
];

export const socials: { label: string; href: string; icon: "youtube" | "instagram" | "facebook" | "linkedin" }[] = [
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
];
