/**
 * All page section content for the Madhavbaug homepage.
 */

export type HeroSlide = {
  title: string;
  description: string;
  image: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/** 4 rotating hero banners. Swap `image` paths to change banner artwork. */
export const heroSlides: HeroSlide[] = [
  {
    title: "Give Your Heart the Strength to Heal Itself Without Surgery.",
    description:
      "Improve cardiac exercise tolerance, ease heart load, and naturally optimise arterial elasticity without invasive surgeries.",
    image: "/assets/banner-01.webp",
    primaryCta: { label: "Book a Consultation", href: "#" },
    secondaryCta: { label: "Chat With Us", href: "#" },
  },
  {
    title: "Reverse Type 2 Diabetes, Don't Just Manage It.",
    description:
      "Lower HbA1c, reduce medicine dependency, and restore healthy insulin response with doctor-led reversal protocols.",
    image: "/assets/banner-01.webp",
    primaryCta: { label: "Book a Consultation", href: "#" },
    secondaryCta: { label: "Chat With Us", href: "#" },
  },
  {
    title: "Bring Your Blood Pressure Back in Balance, Naturally.",
    description:
      "Standardised, clinically validated therapies that target the root cause of hypertension without lifelong pill counts.",
    image: "/assets/banner-01.webp",
    primaryCta: { label: "Book a Consultation", href: "#" },
    secondaryCta: { label: "Chat With Us", href: "#" },
  },
  {
    title: "Lose Weight the Medical Way and Keep It Off.",
    description:
      "BMR-aligned diet plans, guided activity, and cellular nutrition designed for sustainable, healthy weight loss.",
    image: "/assets/banner-01.webp",
    primaryCta: { label: "Book a Consultation", href: "#" },
    secondaryCta: { label: "Chat With Us", href: "#" },
  },
];

export const hero = {
  bannerTitle: "India's largest scientific healthcare revolution.",
  bannerSubtitle:
    "Evidence-based treatment for heart disease, diabetes, hypertension and obesity in India",
  disclaimer: "Results based on clinical data; individual outcomes may vary",
};

export type Stat = {
  value: string;
  label: string;
  description: string;
};

export const stats: Stat[] = [
  {
    value: "1,000,000 +",
    label: "Patients Served",
    description: "Trusting us with their chronic healthcare journey",
  },
  {
    value: "600,000 +",
    label: "Lives Transformed",
    description: "Achieving successful condition reversal and management",
  },
  {
    value: "200 +",
    label: "Research Papers Published",
    description: "Peer-reviewed and recognized in global medical journals",
  },
  {
    value: "650 +",
    label: "Ayurvedic Physicians",
    description: "Certified medical specialists dedicated to your recovery",
  },
  {
    value: "350 +",
    label: "Clinics & Hospitals",
    description: "Providing advanced non-surgical treatment near you",
  },
];

export const whoWeAre = {
  eyebrow: "Who We Are",
  title:
    "India's Trusted Traditional Ayurveda & Modern Medicine Network for Chronic Disease Reversal",
  body: "Pioneering evidence-based Ayurvedic medicine, we combine ancient healing with modern diagnostics to help you reverse heart disease, diabetes, hypertension, and obesity, all without surgical intervention.",
  primaryCta: { label: "Find Your Nearest Centre", href: "#" },
  secondaryCta: { label: "Check Your Health Risk", href: "#" },
};

export const about = {
  eyebrow: "About Us",
  title: "The Trusted Choice in Advanced Ayurveda for over 10 Lakh Families Across India",
  body: [
    "Healing begins when we look beyond daily pill counts and focus on the body's internal capacity to restore itself. At Madhavbaug, we conduct root cause analysis and counter chronic lifestyle conditions at their source using a sophisticated, clinically validated blend of evidence-based Ayurvedic medicine, personalized cellular nutrition, and advanced digital health tracking.",
    "From helping high-risk patients improve ejection fraction and safely bypass impending cardiac surgery to guiding complete type 2 diabetes reversal, our medical specialists provide a clear, measured, and data-backed pathway toward a healthy, medicine-free future.",
  ],
  cta: { label: "Book a Consultation", href: "#" },
  doctor: {
    name: "Dr. Rohit Sane",
    title: "Founder & Chief Executive Officer (CEO)",
  },
  highlights: [
    "Scientific Ayurveda Driven",
    "10 Lakh+ Lives Impacted",
    "Published Clinical Research",
  ],
};

export const hospitals = {
  eyebrow: "Our Hospitals",
  title: "Care Rooted in Science, Close to Your Home",
  body: "Madhavbaug's network of hospitals and clinics combines the best in Ayurvedic science and modern clinical care, all under one roof, right in your neighbourhood. Every centre is equipped to provide personalised care and medically supervised treatments for chronic conditions, including diabetes, heart disease, obesity and hypertension.",
  points: [
    "350+ centres & 5 hospitals across India",
    "Standardised treatment protocols across all locations",
    "Dedicated chronic disease management programs",
    "Trained Ayurvedic physicians and clinical specialists",
  ],
  cta: { label: "Find Your Nearest Madhavbaug Hospital", href: "#" },
};

export type HowStep = {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: string[];
};

export const howItWorks = {
  eyebrow: "How It Works",
  title: "Your Step-by-Step Pathway to Lasting Health",
  subtitle:
    "Your recovery follows a precise, structured clinical pathway overseen by a coordinated team of medical experts.",
  cta: { label: "Book a Consultation", href: "#" },
  steps: [
    {
      eyebrow: "Step 01",
      title: "Modern Diagnostics",
      subtitle: "Map, Measure & Target the Cause",
      points: [
        "Proprietary PowerMAP Assessment",
        "Precision Stress ECG Diagnostics",
        "Ambulatory Blood Pressure Monitoring",
      ],
      image: "/assets/step-1.png",
    },
    {
      eyebrow: "Step 02",
      title: "Signature Therapies",
      subtitle: "Treat Root Causes Non-Invasively",
      points: [
        "Doctor-Administered SHS Protocols",
        "Specialized CDC Therapies",
        "Cellular-Level Tissue Repair",
      ],
      image: "/assets/step-2.png",
    },
    {
      eyebrow: "Step 03",
      title: "Cellular Nutrition & Coaching",
      subtitle: "Sustain Long-Term Health Remission",
      points: [
        "Custom BMR-Aligned Diet Plans",
        "Guided Cardio-Rehab Activity",
        "24/7 Digital On-App Doctor Support",
      ],
      image: "/assets/step-3.png",
    },
  ] as (HowStep & { image: string })[],
};

export type VideoStory = {
  name: string;
  age: number;
  city: string;
  condition: string;
  dataProof: string;
  image: string;
  video: string;
};

export type ReviewStory = {
  name: string;
  age: number;
  city: string;
  condition: string;
  rating: number; // out of 5
  review: string;
};

export const successStories = {
  eyebrow: "Success Stories",
  title: "Honest Struggles. Extraordinary Reversals.",
  cta: { label: "View More Reviews", href: "#" },
  videos: [
    {
      name: "Sangeeta Koli",
      age: 45,
      city: "Mumbai",
      condition: "Type 2 Diabetes",
      dataProof: "HbA1c reduced from 9.2% to 6.1% within 6 months",
      image: "/assets/testi-1.png",
      video: "https://www.youtube.com/embed/8g8IlEGbv3o"
    },
    {
      name: "Kiran Thakkar",
      age: 36,
      city: "Mumbai",
      condition: "Excess Weight Gain/Obesity",
      dataProof:
        "12 kg weight loss within the first 3 months, 15 kg weight loss in 5 months",
      image: "/assets/testi-2.png",
      video: "https://www.youtube.com/embed/8g8IlEGbv3o"
    },
    {
      name: "Smitha Mhatre",
      age: 43,
      city: "Badlapur",
      condition: "Type 2 Diabetes",
      dataProof: "Blood sugar stabilised; off insulin within 4 months",
      image: "/assets/testi-3.png",
      video: "https://www.youtube.com/embed/8g8IlEGbv3o"
    },
    // {
    //   name: "Rajesh Patil",
    //   age: 52,
    //   city: "Pune",
    //   condition: "Heart Disease",
    //   dataProof: "Ejection fraction improved from 35% to 55% in 8 months",
    //   image: "/assets/testi-4.png",
    // },
    // {
    //   name: "Anita Deshmukh",
    //   age: 48,
    //   city: "Nashik",
    //   condition: "Hypertension",
    //   dataProof: "BP stabilised at 120/80 without daily medication",
    //   image: "/assets/testi-5.png",
    // },
  ] as VideoStory[],
  reviews: [
    {
      name: "Mahesh Joshi",
      age: 58,
      city: "Thane",
      condition: "Heart Disease",
      rating: 5,
      review:
        "I was advised bypass surgery, but Madhavbaug's therapies improved my heart pumping naturally. Today I walk 5 km daily without breathlessness.",
    },
    {
      name: "Sunita Kulkarni",
      age: 44,
      city: "Mumbai",
      condition: "Type 2 Diabetes",
      rating: 5,
      review:
        "Within 6 months my sugar levels normalised and my doctor reduced my medicines to almost zero. The diet plan was easy to follow at home.",
    },
    {
      name: "Prakash Shinde",
      age: 50,
      city: "Nagpur",
      condition: "Obesity",
      rating: 4,
      review:
        "Lost 14 kg in 5 months with their BMR-based diet and guided exercise. No crash dieting — just a scientific, sustainable routine.",
    },
    // {
    //   name: "Vaishali More",
    //   age: 39,
    //   city: "Badlapur",
    //   condition: "Hypertension",
    //   rating: 5,
    //   review:
    //     "My BP used to stay above 150 even with tablets. After the Madhavbaug program it is stable, and I feel calmer and more energetic.",
    // },
    // {
    //   name: "Dilip Sawant",
    //   age: 61,
    //   city: "Pune",
    //   condition: "Heart Disease",
    //   rating: 5,
    //   review:
    //     "The doctors explained every report and tracked my progress on the app. My stress test results improved beyond what I expected at this age.",
    // },
  ] as ReviewStory[],
};

export const findCentre = {
  eyebrow: "Locate a Centre",
  title: "Find a Madhavbaug Centre Near You",
  body: "With over 300+ clinics and specialized hospitals across India, find expert reversal care right in your neighborhood.",
  cta: { label: "Find Your Nearest Centre", href: "#" },
  states: [
    { name: "Maharashtra", value: "Maharashtra" },
    { name: "Gujarat", value: "Gujarat" },
    { name: "Karnataka", value: "Karnataka" },
    { name: "Delhi NCR", value: "Delhi NCR" },
    { name: "Madhya Pradesh", value: "Madhya Pradesh" },
    { name: "Rajasthan", value: "Rajasthan" },
    { name: "Telangana", value: "Telangana" },
  ],
  citiesByState: {
    Maharashtra: [
      { name: "Mumbai", value: "Mumbai" },
      { name: "Pune", value: "Pune" },
      { name: "Nagpur", value: "Nagpur" },
      { name: "Nashik", value: "Nashik" },
      { name: "Thane", value: "Thane" },
      { name: "Badlapur", value: "Badlapur" },
    ],
    Gujarat: [
      { name: "Ahmedabad", value: "Ahmedabad" },
      { name: "Surat", value: "Surat" },
      { name: "Vadodara", value: "Vadodara" },
      { name: "Rajkot", value: "Rajkot" },
    ],
    Karnataka: [
      { name: "Bengaluru", value: "Bengaluru" },
      { name: "Mysuru", value: "Mysuru" },
      { name: "Hubli", value: "Hubli" },
    ],
    "Delhi NCR": [
      { name: "New Delhi", value: "New Delhi" },
      { name: "Gurugram", value: "Gurugram" },
      { name: "Noida", value: "Noida" },
    ],
    "Madhya Pradesh": [
      { name: "Indore", value: "Indore" },
      { name: "Bhopal", value: "Bhopal" },
    ],
    Rajasthan: [
      { name: "Jaipur", value: "Jaipur" },
      { name: "Jodhpur", value: "Jodhpur" },
    ],
    Telangana: [
      { name: "Hyderabad", value: "Hyderabad" },
      { name: "Warangal", value: "Warangal" },
    ],
  } as Record<string, { name: string; value: string }[]>,
};
export const finalCta = {
  title: "Start Your Journey to a Medicine-Free Life with Madhavbaug",
  subtitle:
    "Don't just manage your condition. Overcome it. Take the first step toward sustainable, evidence-based chronic disease reversal.",
  cta: { label: "Book a Consultation", href: "#" },
};

export const footerAbout = {
  description:
    "We bring time-tested Panchakarma therapies and customised lifestyle plans directly to your community. Our experienced medical team is committed to providing accessible, high-quality care. Trust Madhavbaug to be your local partner in reclaiming a healthier, medicine-free life.",
  appName: "mibPULSE",
  appDescription:
    "The mibPulse app brings you structured, doctor-led care from Madhavbaug's expert clinic doctors, right to your phone.",
  copyright: "©2026 Madhavbaug. All Rights Reserved.",
  craftedBy: "Healthus.ai",
};
