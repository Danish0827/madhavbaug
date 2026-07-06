// Content for the "Diet Plans" page (Figma node 446-464). Static, editable copy.

import type { FaqItem } from "@/components/FaqSection";

export const dietHero = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Patient Resources", href: "/lifestyle-exercise-guide" },
    { label: "Diet Plans" },
  ],
  title: "Personalized Diet Kits & Plans",
};

export const dietOverview = {
  eyebrow: "Overview",
  title: "Eat to Heal: Specialized Diet Plans for Disease Reversal",
  subtitle:
    "Discover scientifically designed, easy-to-follow nutritional diet plans tailored to lower blood sugar, manage blood pressure, and protect your heart.",
  body: "At Madhavbaug, we believe food is medicine. Our diet plans aren't about strict deprivation or starving yourself: they are designed by expert clinical nutritionists to nourish your body, boost your metabolism, and naturally reduce your dependency on daily medications.",
  cta: "Consult a Madhavbaug expert",
  image: "/assets/diet/overview.png",
};

export type DietBullet = { term: string; rest: string };

export type DietKit = {
  title: string;
  description: string;
  howItWorks: string;
  bullets: DietBullet[];
  images: string[];
  imageSide: "left" | "right";
};

export const dietKits: DietKit[] = [
  {
    title: "The Reverse Diet Kit (For Blockages & Heart Health)",
    description:
      "A heart-healthy meal plan packed with natural antioxidants to reduce inflammation and help clear blocked arteries.",
    howItWorks:
      "This simple 1000-calorie daily system delivers a powerful dose of antioxidants and 500 mg of vitamin C to stop buildup of the blockages and naturally repair your blood vessels.",
    imageSide: "right",
    images: ["/assets/diet/kit-reverse.png"],
    bullets: [
      { term: "Madhavprash:", rest: " A specialised, sugar-free Amla tonic fortified with Vitamins C and E to boost immunity and prevent arterial damage." },
      { term: "Cardiac Tea:", rest: " A caffeine-free blend of Arjuna (a natural heart-pumping tonic), cinnamon, and turmeric to improve circulation." },
      { term: "Heart-Healthy Main Meals:", rest: " Includes low-carb, high-fibre breakfast and lunch options like Rajma Flour Dosa, Soy Dhokla, Atta Mix (infused with Triphala and Shatavari), and Lentil Daal Mix." },
      { term: "Superfood Snacks:", rest: " Nuts Mix Chiwda, packed with omega-3-rich flaxseeds and pumpkin seeds to naturally lower bad cholesterol." },
    ],
  },
  {
    title: "The GO-BIPI Diet Kit (For Hypertension & BP Control)",
    description:
      "A low-salt, high-potassium meal plan designed to naturally relax your blood vessels and improve blood flow.",
    howItWorks:
      "Eating too much salt tightens your blood vessels and raises blood pressure. This kit replaces standard salt with daily potassium and controlled sodium to safely widen your blood vessels and naturally lower your readings.",
    imageSide: "left",
    images: ["/assets/diet/kit-gobipi.png"],
    bullets: [
      { term: "Celery Salt (Low-Sodium Salt):", rest: " A breakthrough alternative combining rock salt with celery and spinach. Celery contains a unique compound that acts as a natural calcium channel blocker to relax blood vessels." },
      { term: "Stress Relief Herbal Tea:", rest: " A soothing blend of green tea, Arjuna, Brahmi, and Jatamansi clinically shown to lower blood pressure numbers over time." },
      { term: "Nutritious Main Meals:", rest: " High-potassium, low-glycaemic Fortified Atta (with pea protein, barley, and millets) and Yellow Mung Daal Pre-Mix." },
      { term: "Wholesome Breakfast & Soups:", rest: " Fast-acting, nutrient-dense options like Dehydrated Sprouts Upma, Ghavan Mix, and instant Palak-Celery Soup." },
    ],
  },
  {
    title: "Swasthyam Diet Kit Pro (For Obesity and Weight Loss)",
    description:
      "A plant-based, nutrient-packed meal system designed to kickstart fat burning and control your appetite.",
    howItWorks:
      "The weight loss programme at Madhavbaug begins with langhana (personalised light dieting or therapeutic fasting) tailored to your appetite and needs. By replacing processed foods with metabolism-boosting whole grains, lean pulses, and natural spices, it helps clear your system and speeds up weight loss.",
    imageSide: "right",
    images: ["/assets/diet/kit-swasthyam.png"],
    bullets: [
      { term: "Metabolic Whole Grains:", rest: " A premium, fibre-rich selection of Hulled Barley, Oats, Quinoa, and ancient millets (Kodo, Foxtail, Adlay, and Pearl millet), alongside nutritious Red, Brown, and Black rice to keep you full for longer." },
      { term: "Protein-Packed Pulses:", rest: " Lean, easy-to-digest legumes including Mung, Masoor, Horse Gram, and Chickpeas to preserve muscle mass while losing fat." },
      { term: "Detoxifying Vegetables & Fruits:", rest: " A curated mix of low-calorie veggies (Pumpkin, Patol, Tinda, Karela, Taroi, Lauki, Radish, Green beans, Artichokes, Zucchini, Carrots, Peppers, Spinach, and Mushrooms) paired with fat-burning, vitamin-rich fruits (Pomegranate, Orange, amla, garcinia, grapefruit, and kiwi)." },
      { term: "Appetite & Fluid Control Rules:", rest: " Optimised to encourage an increased intake of fresh salads while keeping salt strictly limited to less than 5 grams per day and water intake managed to under 1.5 litres." },
      { term: "Fat-Burning Spices & Healthy Oils:", rest: " Infused with metabolic stimulants like trikatu, dalchini (cinnamon), turmeric, and garlic powder. Includes a controlled daily portion (maximum 20 ml) of healthy, cold-pressed or filtered cooking oils like mustard, flaxseed, or olive oil." },
    ],
  },
  {
    title: "Prameha Diet Kit (For Diabetes and Insulin Sensitivity Reversal)",
    description:
      "A scientifically designed dietary programme that helps regulate blood sugar levels, improve insulin sensitivity, and support the body's natural diabetes reversal process.",
    howItWorks:
      "The Prameha Diet Kit follows Ayurvedic principles combined with modern nutritional science to reduce excess glucose load, improve digestion, and support healthy insulin function. By focusing on low-glycaemic foods, fibre-rich vegetables, controlled healthy fats, and carefully selected fruits, the programme helps stabilise blood sugar levels while promoting sustainable lifestyle changes that support long-term diabetes management.",
    imageSide: "left",
    images: ["/assets/diet/kit-prameha-1.png", "/assets/diet/kit-prameha-2.png"],
    bullets: [
      { term: "Low Glycaemic Whole Grains & Smart Carbohydrates:", rest: " A carefully selected range of low-glycaemic, fibre-rich grains that release glucose slowly into the bloodstream, helping maintain stable blood sugar levels and preventing sudden sugar spikes." },
      { term: "Diabetes-Friendly Fruits:", rest: " Nutrient-rich fruits with a lower glycemic impact, including Apple, Pomegranate, Pear, Guava, Citrus fruits and mosambi (sweet lime), which provide essential vitamins, minerals, and antioxidants without causing significant blood sugar fluctuations." },
      { term: "Fibre-Rich Salads & Vegetables:", rest: " An abundance of fresh salads and high-fibre vegetables that support healthy digestion, improve satiety, and help regulate blood sugar levels. Patients are encouraged to consume a large bowl of salad before lunch and dinner, with a daily intake of approximately 250 grams." },
      { term: "Healthy Fat Guidelines:", rest: " A controlled daily intake of healthy oils and fats, limited to 15-20 ml per day. The diet promotes the use of filtered or cold-pressed oils while discouraging refined oils and repeatedly heated cooking oils that may contribute to inflammation and metabolic imbalance." },
      { term: "Protein-Rich Plant Foods:", rest: " Selected plant-based protein sources that help maintain muscle mass, improve satiety, and support healthy metabolism while remaining easy to digest." },
      { term: "Blood Sugar Supporting Lifestyle Rules:", rest: " Special emphasis is placed on consuming high-fibre foods; limiting high-glycaemic fruits such as mangoes, grapes, and overripe papaya; avoiding fried foods; and following structured meal practices that help reduce insulin resistance over time." },
      { term: "Ayurvedic Dietary Support:", rest: " The diet incorporates traditional dietary principles aimed at correcting metabolic imbalances associated with Prameha (diabetes), helping improve glucose utilisation and support overall metabolic health." },
    ],
  },
];

export const whyItWorks = {
  eyebrow: "Diet Kits & Plans",
  title: "Why Madhavbaug Diets & Nutritional Plans Actually Work",
  image: "/assets/diet/why-works.png",
  points: [
    { term: 'No "One-Size-Fits-All"', rest: " Every diet plan is customised based on your specific medical reports, age, and daily routine." },
    { term: "100% Regional & Realistic", rest: " We don't recommend expensive, hard-to-find superfoods. Our plans use standard, wholesome ingredients straight from your local Indian kitchen." },
    { term: "App-Tracked Success", rest: " Easily monitor your daily meals and sync them with our specialised MIBPulse app so our doctors can track your progress in real-time." },
  ],
};

export const dietFaqs: FaqItem[] = [
  {
    question: "Will I have to completely stop eating rice or traditional Indian breads (rotis)?",
    answer:
      "Not at all. We don't remove staples - we make them smarter. Your kit swaps refined white rice and plain wheat for low-glycaemic options like millets, red/brown rice and fortified multi-grain atta, so you keep eating familiar meals while keeping blood sugar and weight in check.",
  },
  {
    question: "Are these diet plans strictly vegetarian?",
    answer:
      "Our kits are primarily plant-based, as this is most effective for reversing heart, blood pressure and metabolic conditions. If you are non-vegetarian, your nutritionist can guide you on lean, low-fat additions that fit safely within your plan.",
  },
  {
    question: "Can I choose which diet kit to buy on my own?",
    answer:
      "We strongly recommend a consultation first. The right kit depends on your medical reports, current medications and condition. Our experts assess this and prescribe the kit that will actually move your health markers - so you invest in the plan that works for you.",
  },
  {
    question: "How long do I need to stay on these specialised diet kits?",
    answer:
      "Typically, the initial intensive phase lasts 90 days (3 months). This is because it takes roughly 21 days to break old metabolic habits and 90 days to structurally alter your metabolic rate and lifestyle. After the target weight, sugar, or blood pressure levels are stabilised, your doctor will safely transition you from the kit to a sustainable, customised long-term maintenance diet chart.",
  },
  {
    question: "I travel frequently for work. How do I manage these kits?",
    answer:
      "The kits are built for real life. Most items are pre-mixed, dehydrated or instant, so they are easy to carry and quick to prepare in a hotel or office. Your coach also gives you simple eating-out rules so you stay on track even on the road.",
  },
];
