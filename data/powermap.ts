// Content for the "PowerMAP" technology page (Figma node 308-1467). Static copy.

export const powermapHero = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Technology" },
    { label: "PowerMAP" },
  ],
  title: "Madhavbaug PowerMAP Medical Analysis Panel (MAP) Technology for Doctors & Clinicians",
};

export const powermapIntro = {
  eyebrow: "PowerMAP",
  heading: "India's First Smart Medical Command Center: Watching Over Your Health 24/7",
  description:
    "You are never alone on your recovery path. Madhavbaug's advanced PowerMAP technology connects your daily vitals directly to a team of experts, keeping your chronic disease reversal journey perfectly on track.",
  cta: "Consult a Madhavbaug expert",
  image: "/assets/powermap/powermap-app.png",
};

export const careSection = {
  eyebrow: "Care at Madhavbaug",
  heading: "Go Beyond Standard Care Boundaries with Madhavbaug",
  paragraphs: [
    "Standard healthcare only checks on you during a short, 10-minute doctor's appointment. But chronic diseases like diabetes and heart risks happen every single day.",
    "At Madhavbaug, we use India's most advanced medical technology to bridge this gap. Whether you live in a major metro or a remote village, our PowerMAP technology connects you directly with top chronic disease reversal experts. You get world-class, continuous medical supervision right from the comfort of your home.",
  ],
  cta: "Book a Consultation",
  image: "/assets/powermap/care.png",
};

export type PowerCard = { image: string; title: string; description: string };

export const howItWorks = {
  eyebrow: "How it Works",
  heading: "How Madhavbaug's Advanced PowerMAP Technology Protects You Every Day",
  description:
    "We have combined a smartphone app with a powerful medical command centre to make your healing journey effortless. Here is how the magic happens:",
  cards: [
    {
      image: "/assets/powermap/card-syncing.png",
      title: "Simple Daily Syncing",
      description:
        "You easily log your meals, steps, and daily vitals into our user-friendly mibPULSE App.",
    },
    {
      image: "/assets/powermap/card-visual.png",
      title: "No Jargon, Just Visual Clarity",
      description:
        "Our advanced software automatically translates confusing lab reports and numbers into beautiful, easy-to-read colour charts. You can actually see your body healing over time.",
    },
    {
      image: "/assets/powermap/card-safety.png",
      title: "The Ultimate Medical Safety Net",
      description:
        "If your logged vitals ever cross into a dangerous zone, our system instantly triggers a Clinical Alert to your doctor. It acts like a smoke alarm for your health, ensuring immediate medical attention if you need it.",
    },
    {
      image: "/assets/powermap/card-tracking.png",
      title: "Total Lifestyle Tracking",
      description:
        "By seeing your real-time habits, your medical team can spot exactly what is helping or hurting your progress, allowing them to tweak your plan for faster results.",
    },
  ] as PowerCard[],
};

export type BenefitItem = { title: string; description: string };

export const benefitsSection = {
  eyebrow: "Benefits",
  heading: "Why Advanced Technology Means a Healthier You",
  image: "/assets/powermap/feature-app.png",
  items: [
    {
      title: "A Doctor in Your Pocket",
      description:
        "Because our system tracks your health 24/7, your doctor is always just a click away. You get continuous medical oversight without having to visit the clinic every week.",
    },
    {
      title: "Zero Guesswork, Maximum Accuracy",
      description:
        "By replacing paper logs with digital tracking, we eliminate human errors. Your doctor gets flawless data, leading to safer, highly accurate treatment decisions.",
    },
    {
      title: "Faster, More Successful Disease Reversal",
      description:
        "When your medical team can see the exact gaps in your daily diet or exercise, they can fast-track your journey to reversing diabetes or heart risks.",
    },
    {
      title: "An Entire Team in Your Corner",
      description:
        "Our software allows your doctor, dietitian, exercise expert, and stress counsellor to look at the exact same dashboard at the same time. They work as a unified team to support you.",
    },
  ] as BenefitItem[],
};

export const privacySection = {
  eyebrow: "Trust & Safety",
  heading: "Your Privacy is Our Priority",
  description:
    "Rest assured, your daily health logs and medical data are 100% secure, encrypted, and shared strictly with your certified Madhavbaug medical team only.",
  image: "/assets/powermap/privacy.png",
};
