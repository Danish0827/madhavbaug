// Content for the standalone Obesity Care landing page (/lp/obesity-care).
// Copy sourced from the client's Obesity Care LP script.

import type { FaqItem } from "@/components/FaqSection";

export const obesityHero = {
  h1: "When Weight Gain Starts Making Everyday Life More Difficult.",
  h2: "Madhavbaug offers an integrated approach to obesity care that combines modern diagnostics with research-backed Ayurvedic care.",
  support:
    "Whether you're struggling with long-term weight gain, belly fat, weight gain while undergoing treatment for another health condition, diabetes, high BP or cholesterol, Madhavbaug offers a structured, doctor-supervised obesity consultation. By combining modern diagnostic evaluation with research-backed Ayurvedic care, we create personalised, non-invasive care plans focused on your overall metabolic health - not just your weight - wherever clinically appropriate.",
  primaryCta: "Book Obesity Consultation",
  secondaryCta: "Find Nearest Clinic",
};

export const trustStats = [
  { value: "35+", label: "Years of Expertise" },
  { value: "10 Lakh+", label: "Patients Treated" },
  { value: "200+", label: "Research Papers" },
  { value: "350+", label: "Clinics Across India" },
];

export const whySection = {
  intro:
    "Many people spend years trying different diets, gyms and weight-loss programmes, only to regain the weight. Lasting weight management begins with understanding what's contributing to your weight gain - not just trying another diet.",
  suitableTitle: "This consultation may be suitable if you:",
  suitable: [
    "Have struggled with repeated weight gain.",
    "Have belly fat along with diabetes, high blood pressure or cholesterol.",
    "Have experienced weight gain while managing another long-term health condition or its treatment.",
    "Feel excess weight is affecting your energy, mobility or daily routine.",
    "Are looking for an Ayurvedic, doctor-supervised, non-invasive approach to obesity care.",
    "Want to focus on long-term health rather than temporary weight loss.",
  ],
};

export const careModel = {
  title: "The Madhavbaug Integrated Obesity Care Model",
  intro:
    "Rather than focusing only on symptomatic weight loss, Madhavbaug follows a holistic, doctor-supervised obesity care approach that aims to address the underlying metabolic imbalance. Depending on your clinical assessment, your personalised care plan may include:",
  items: [
    "Panchakarma therapies, wherever clinically appropriate",
    "Personalised dietary guidance with the Swasthya Kit",
    "Exercise and lifestyle recommendations",
    "Continuous progress monitoring through the MIB Pulse App and PowerMap",
    "Research-backed Ayurvedic herbal medications, where suitable",
  ],
};

export const evaluate = {
  title: "Obesity Isn't Just About Weight",
  intro:
    "Weight gain is often connected with diabetes, BP, cholesterol, fatty liver, sleep, stress and lifestyle. Because better care begins with understanding the complete picture, we evaluate:",
  items: [
    "Weight History",
    "Belly Fat",
    "BMI",
    "Diabetes",
    "Blood Pressure",
    "Cholesterol",
    "Fatty Liver",
    "Lifestyle & Stress",
  ],
};

export type RightForYouCard = { title: string; description: string };

export const rightForYou: RightForYouCard[] = [
  { title: "Belly Fat / Abdominal Obesity", description: "Understand what's driving stubborn belly fat and how it affects your metabolic health." },
  { title: "Long-Term Weight Gain", description: "For weight that keeps returning despite repeated diets and weight-loss programmes." },
  { title: "Weight Gain with Diabetes", description: "When excess weight is closely linked with blood sugar and insulin resistance." },
  { title: "Weight Gain During Ongoing Medical Treatment", description: "Weight gained while managing another long-term condition or its treatment." },
  { title: "Weight Gain with BP or Cholesterol", description: "Because weight, blood pressure and cholesterol are often connected." },
  { title: "Low Stamina & Lifestyle Imbalance", description: "When excess weight is affecting your energy, mobility and daily routine." },
  { title: "Booking for a Parent or Family Member", description: "Helping families make informed, supported decisions together." },
];

export const steps = [
  { title: "Submit Enquiry", description: "Fill the short form and request a callback." },
  { title: "Team Contacts You", description: "Our care team reaches out to understand your needs." },
  { title: "Clinic Mapping", description: "We help identify your nearest Madhavbaug clinic." },
  { title: "Appointment Confirmation", description: "Receive your confirmation and reports checklist." },
  { title: "Doctor Assessment", description: "Meet the doctor for a complete health evaluation." },
  { title: "Personalised Guidance", description: "Get a care plan based on your reports and health." },
];

export const popularLocations = [
  "Dadar",
  "Thane",
  "Mulund",
  "Borivali",
  "Andheri",
  "Navi Mumbai",
  "Kalyan",
];

export const bookingForLovedOne = {
  title: "Booking For A Parent Or Loved One?",
  intro:
    "Many consultations are booked by children, spouses and caregivers looking after their loved ones. If you're booking for a family member, we'll help you prepare everything needed for a smooth consultation.",
  points: [
    "Bring available reports",
    "Carry the current medicine list",
    "Receive appointment reminders on WhatsApp",
    "Choose the most convenient clinic for follow-up",
  ],
};

export const obesityFaqs: FaqItem[] = [
  { question: "Is this obesity consultation right for me?", answer: "This consultation is designed for people struggling with long-term weight gain, belly fat or obesity, especially when it is associated with diabetes, high blood pressure, high cholesterol or other long-term health conditions. It may also be suitable if excess weight is affecting your energy, mobility or daily routine, or if you're looking for a doctor-supervised, non-invasive Ayurvedic approach to improving your metabolic health." },
  { question: "How is Madhavbaug's obesity consultation different from a typical weight-loss programme?", answer: "Unlike programmes that focus only on reducing weight, Madhavbaug evaluates your overall metabolic health. The consultation combines modern diagnostic evaluation with research-backed Ayurvedic care, personalised lifestyle guidance and doctor supervision to understand what's contributing to your weight gain before recommending a personalised care plan wherever clinically appropriate." },
  { question: "Is this a guaranteed weight-loss programme?", answer: "No. Every person's health condition is different. The consultation is designed to understand your weight, metabolic health and associated risk factors before recommending an individualised care plan. Individual results vary depending on your health condition, medical history and adherence to the recommended plan." },
  { question: "Can this consultation help if I have diabetes, high blood pressure or high cholesterol along with obesity?", answer: "Yes. Weight gain is often connected with conditions such as diabetes, hypertension and high cholesterol. During your consultation, these factors are evaluated together so the doctor can recommend a personalised approach based on your complete health profile." },
  { question: "What happens during my obesity consultation?", answer: "Your doctor reviews your weight history, BMI, belly fat, diabetes status, blood pressure, cholesterol, lifestyle, stress levels and other relevant health information. Based on this evaluation, you may receive personalised guidance that combines research-backed Ayurvedic care, lifestyle recommendations and follow-up support wherever clinically appropriate." },
  { question: "Why does Madhavbaug focus on metabolic health instead of just weight?", answer: "Weight gain is often influenced by multiple factors including diabetes, blood pressure, cholesterol, fatty liver, sleep, stress and lifestyle habits. By understanding these interconnected factors, the consultation focuses on supporting better long-term metabolic health rather than simply reducing body weight." },
  { question: "What reports or information should I bring to my appointment?", answer: "Please carry any relevant medical reports related to diabetes, blood pressure, cholesterol or other ongoing health conditions, along with your current medicine list. Sharing your weight history and lifestyle habits also helps the doctor better understand your overall health." },
  { question: "Will I need to stop taking my current medicines?", answer: "No. You should never stop or change prescribed medicines without consulting your treating doctor. Your existing medications will be reviewed during your consultation as part of your overall health assessment." },
  { question: "Can I book this consultation for my parents or another family member?", answer: "Yes. Many consultations are booked by family members. Our team will help you prepare the necessary reports, medicine list and appointment details to make the consultation as smooth as possible." },
  { question: "What happens after I book my consultation?", answer: "After you submit your enquiry, our team will contact you, help identify the nearest Madhavbaug clinic, confirm your appointment and guide you on what to bring before meeting the doctor for your assessment." },
  { question: "Will I receive a personalised treatment plan?", answer: "Every patient is different. After reviewing your medical history, reports, lifestyle and metabolic health, the doctor may recommend a personalised, non-invasive obesity care plan wherever clinically appropriate." },
  { question: "Does the consultation include diet and lifestyle guidance?", answer: "Yes. Lifestyle management forms an important part of the consultation. Depending on your health profile, your doctor may provide personalised guidance related to diet, daily routine, physical activity and other lifestyle factors that influence metabolic health." },
  { question: "How do I find the nearest Madhavbaug obesity clinic?", answer: "Simply submit your enquiry and share your PIN code or preferred location. Our team will help you schedule your consultation at the nearest Madhavbaug clinic." },
  { question: "Can obesity increase the risk of diabetes and heart-related health problems?", answer: "Excess weight is often associated with conditions such as diabetes, high blood pressure, high cholesterol and other metabolic health risks. That's why the consultation evaluates these interconnected health factors together rather than focusing on weight alone." },
  { question: "Why should I book an obesity consultation now instead of trying another diet?", answer: "Many people spend years trying different diets and weight-loss programmes without understanding what's contributing to repeated weight gain. A structured doctor-supervised consultation helps evaluate your overall metabolic health and provides personalised guidance based on your individual condition, helping you make more informed decisions about your long-term health." },
];

export const finalCta = {
  title: "Take the First Step Towards Better Metabolic Health.",
  description:
    "Book a Madhavbaug obesity consultation to understand your weight, metabolic health and connected lifestyle risks through an integrated approach combining modern diagnostics with research-backed Ayurvedic care.",
  cta: "Book Obesity Consultation",
};

export const disclaimer =
  "Do not stop or change prescribed medicines without consulting your doctor. Suitability depends on reports, medical history and doctor evaluation. Individual results may vary.";

export const navLinks = [
  { label: "Why Madhavbaug", href: "#why" },
  { label: "Our Approach", href: "#approach" },
  { label: "Right For You", href: "#right-for-you" },
  { label: "Find a Clinic", href: "#find-clinic" },
  { label: "FAQs", href: "#faqs" },
];
