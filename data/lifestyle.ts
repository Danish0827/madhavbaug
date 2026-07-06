// Content for the "Lifestyle & Exercise Guide" page (Figma node 395-2).
// Static, editable copy pulled from the Figma design.

import type { FaqItem } from "@/components/FaqSection";

export const lifestyleHero = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Lifestyle & Exercise Guide" },
  ],
  pillTitle: "Madhavbaug Lifestyle and Exercise Guide",
  heading:
    "Madhavbaug Lifestyle and Exercise Guide: Move Safely, Heal Naturally",
  intro: [
    "To reverse conditions like Type 2 diabetes, high blood pressure, or heart disease, changing your diet is only half the battle. How you move, sleep, and manage stress tells your body how to heal.",
    "At Madhavbaug, we design safe, customised lifestyle and exercise routines. Our goal is simple: help you rebuild your health so you can safely reduce your daily medications.",
  ],
};

// ---------- Why Generic Workouts Can Be Dangerous ----------
export const dangerSection = {
  eyebrow: "About",
  title: "Why Generic Workouts Can Be Dangerous",
  text: "If you have a heart condition or high blood sugar, jumping straight into intense gym workouts or random online exercise routines can put dangerous stress on your heart and blood vessels.",
  note: {
    title: "Safety Note",
    body: "Exercise is like medicine; the dose must be exactly right. Our doctors customise your activity plan based on your current health reports to ensure your heart rate stays in a completely safe zone.",
  },
  image: "/assets/lifestyle/danger.png",
};

// ---------- The 3 Simple Pillars of Madhavbaug Exercise (grid) ----------
export type Pillar = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

export const pillarsSection = {
  eyebrow: "Madhavbaug Exercise",
  title: "The 3 Simple Pillars of Madhavbaug Exercise",
  subtitle:
    "You do not need to lift heavy weights or run marathons. Our protocol uses three gentle types of movement to heal your body:",
  pillars: [
    {
      image: "/assets/lifestyle/pillar-cardio.png",
      title: "Safe Cardio",
      subtitle: "(Brisk Walking Or Cycling)",
      description:
        "30 to 45 minutes of daily, steady movement. This strengthens your heart muscle so it can pump blood with less effort.",
    },
    {
      image: "/assets/lifestyle/pillar-toning.png",
      title: "Simple Muscle Toning",
      subtitle: "Bodyweight Exercises",
      description:
        "Light movements like wall push-ups or chair squats 2 to 3 times a week. Active muscles naturally absorb excess sugar directly from your blood.",
    },
    {
      image: "/assets/lifestyle/pillar-yoga.png",
      title: "Yoga & Breathing",
      subtitle: "Relaxation",
      description:
        "15 minutes of daily Pranayama (like Anulom Vilom). This calms your nervous system and instantly helps lower high blood pressure.",
    },
  ] as Pillar[],
};

// ---------- Exercise Guides According to Your Condition (carousel) ----------
export type ConditionGuide = {
  title: string;
  intro: string;
  listIntro: string;
  items: { bold: string; rest: string }[];
  footer: string;
};

export const conditionSection = {
  eyebrow: "Madhavbaug Exercise",
  title: "Exercise Guides According to Your Condition",
  intro:
    "At Madhavbaug, every exercise and lifestyle plan is personalised according to your age, fitness level, medical condition, and treatment goals. Our physiotherapists and healthcare experts guide you through safe, practical habits that can be followed in everyday life.",
  image: "/assets/lifestyle/condition.png",
  guides: [
    {
      title: "Heart Disease",
      intro:
        "For patients with heart disease, exercise is prescribed as a clinical cardiac recovery tool rather than a one-size-fits-all fitness routine. Each programme is designed around your heart function and physical capacity and is supervised by trained physiotherapists.",
      listIntro: "The programme may include:",
      items: [
        { bold: "Cardiovascular exercises", rest: " to improve heart strength and circulation." },
        { bold: "Resistance training", rest: " to maintain healthy body weight and support metabolism." },
        { bold: "Pranayama and breathing exercises", rest: " to reduce stress, lower blood pressure, and decrease the workload on the heart." },
        { bold: "Guided physical activity", rest: " progression based on your recovery milestones." },
      ],
      footer:
        "Regular monitoring helps track improvements in exercise capacity and overall cardiac health.",
    },
    {
      title: "Obesity",
      intro:
        "Weight loss is most effective when healthy eating is combined with regular physical activity. Madhavbaug's obesity management programme focuses on gradually helping the body burn more fat and improving metabolism.",
      listIntro: "The programme may include:",
      items: [
        { bold: "Walking and aerobic exercises", rest: " to burn excess calories." },
        { bold: "Strength and resistance training", rest: " to preserve muscle mass during weight loss." },
        { bold: "Flexibility and mobility exercises", rest: " to improve movement and reduce strain on joints." },
        { bold: "Lifestyle coaching", rest: " to improve sleep, meal timing, stress management, and daily activity levels." },
      ],
      footer:
        "The goal is to achieve sustainable weight loss while improving energy levels and overall health.",
    },
    {
      title: "Type 2 Diabetes",
      intro:
        "For diabetes, movement works like natural medicine. A structured, doctor-guided routine helps your muscles use glucose efficiently and steadily improves your body's insulin sensitivity.",
      listIntro: "The programme may include:",
      items: [
        { bold: "Post-meal walks", rest: " to blunt sudden blood sugar spikes." },
        { bold: "Light resistance training", rest: " so active muscles pull more sugar from the blood." },
        { bold: "Breathing and yoga", rest: " to lower stress hormones that raise blood sugar." },
        { bold: "Consistent daily activity", rest: " tracked against your HbA1c and energy levels." },
      ],
      footer:
        "The aim is steady glycaemic control that supports a safe reduction in medication over time.",
    },
    {
      title: "Hypertension",
      intro:
        "For high blood pressure, the right kind of gentle, rhythmic movement helps relax blood vessels and reduce the daily strain on your heart, without dangerous spikes.",
      listIntro: "The programme may include:",
      items: [
        { bold: "Steady-state walking", rest: " to improve circulation and vascular tone." },
        { bold: "Pranayama and relaxation", rest: " to calm the nervous system and lower readings." },
        { bold: "Low-intensity mobility work", rest: " to keep you active without over-exertion." },
        { bold: "Heart-rate monitoring", rest: " to keep every session inside a safe zone." },
      ],
      footer:
        "Regular review helps normalise blood pressure and protect your heart and arteries long term.",
    },
  ] as ConditionGuide[],
};

// ---------- Your Ideal Daily Routine (carousel) ----------
export type RoutineCard = {
  image: string;
  time: string;
  whatToDo: string;
  whyItHelps: string;
};

export const routineSection = {
  eyebrow: "Exercise Routine",
  title: "Your Ideal Daily Routine",
  subtitle:
    "Aligning your habits with the sun improves digestion, sleep, and energy levels. Try this simple daily timeline:",
  cards: [
    {
      image: "/assets/lifestyle/routine-morning.png",
      time: "Morning",
      whatToDo: "Wake up & engage in 15 mins of calm breathing",
      whyItHelps: "Lowers morning stress hormones",
    },
    {
      image: "/assets/lifestyle/routine-postmeals.png",
      time: "Post-Meals",
      whatToDo: "Take a light, 10-minute stroll",
      whyItHelps: "Prevents sudden blood sugar spikes",
    },
    {
      image: "/assets/lifestyle/routine-afternoon.png",
      time: "Afternoon",
      whatToDo: "Avoid sleeping right after lunch",
      whyItHelps: "Keeps your digestion sharp and active",
    },
    {
      image: "/assets/lifestyle/routine-night.png",
      time: "Night",
      whatToDo: "Turn off screens 1 hour before bed",
      whyItHelps: "Signals your body to repair itself and that it is time to rest",
    },
  ] as RoutineCard[],
};

// ---------- When to Stop Exercising Immediately ----------
export const warningSection = {
  eyebrow: "Warning Signs",
  title: "When to Stop Exercising Immediately",
  intro: "Always listen to your body. Stop moving and rest if you experience:",
  signs: [
    "Chest pain, tightness, or pressure",
    "Sudden dizziness, lightheadedness, or cold sweats",
    "Severe shortness of breath that doesn't go away quickly",
  ],
  note: {
    title: "Medical Disclaimer",
    body: "Consult a doctor before starting any exercise routine, especially if you have a heart condition. Do not modify medications independently; all physical limits and treatment changes must be medically supervised.",
  },
  image: "/assets/lifestyle/whenstop.png",
};

// ---------- FAQs ----------
export const lifestyleFaqs: FaqItem[] = [
  {
    question: "Can I exercise if I've had a heart attack or angioplasty?",
    answer:
      "Yes, but only under medical guidance. Supervised, graded activity is one of the most powerful tools for cardiac recovery. Our doctors first assess your heart function and then design a safe, progressive plan - never start an intense routine on your own after a cardiac event.",
  },
  {
    question: "What if I have severe knee or joint pain?",
    answer:
      "We simply adapt the movement. Low-impact options like chair-based exercises, gentle wall push-ups, water walking, and seated breathing let you stay active without stressing painful joints. The goal is consistent, comfortable movement - not pain.",
  },
  {
    question: "How does the MIB Pulse app help me?",
    answer:
      "The MIB Pulse app connects you to your Madhavbaug care team between visits. You can track your heart rate, steps, and vitals, follow your personalised routine, and share readings so your coach can fine-tune your safe activity zone remotely.",
  },
  {
    question: "What should I do if my heart rate spikes too high while walking?",
    answer:
      "Slow down immediately to a gentle stroll until your breathing normalizes. Do not sit down abruptly, as this can cause blood to pool in your legs and make you dizzy. Use your smartwatch or the MIB Pulse app to track your heart rate, and let your Madhavbaug coach know so they can recalculate your safe walking pace.",
  },
  {
    question: "Can I lift weights at the gym while following this protocol?",
    answer:
      "Heavy lifting and breath-holding (straining) can dangerously spike blood pressure, so it is not recommended without clearance. We prefer light resistance and bodyweight movements. If you want to train at a gym, share your plan with your doctor so it can be made safe for your condition.",
  },
  {
    question: "Is it better to exercise in the morning or the evening?",
    answer:
      "Both work - consistency matters more than timing. Many patients find morning movement helps set a calm tone for the day, while a light post-meal walk in the evening helps control blood sugar. Choose the slot you can stick to comfortably every day.",
  },
];
