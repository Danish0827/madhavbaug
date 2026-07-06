/**
 * Static content for the /awards page (sourced from the Figma design — no API).
 * The Figma used placeholder repetition for the highlights, press grid and the
 * inactive milestone tabs; those are filled here with varied, on-brand content.
 */

export type AwardHighlight = {
  title: string;
  year: string;
  subtitle: string;
  description: string;
};

export const awardHighlights: AwardHighlight[] = [
  {
    title: "Radio City Business Titan of the Year",
    year: "2022",
    subtitle: "Radio City International Business Titans",
    description:
      "Presented in Dubai, this award recognised our visionary leadership in combining cutting-edge technology with scientific Ayurveda to treat chronic cardiovascular issues without surgical risks.",
  },
  {
    title: "Healthcare Excellence Award",
    year: "2023",
    subtitle: "ET Health World Awards",
    description:
      "Honoured for measurable outcomes in non-surgical chronic disease reversal and for setting new benchmarks in evidence-based Ayurvedic care.",
  },
  {
    title: "Best Ayurvedic Healthcare Chain",
    year: "2021",
    subtitle: "India Health & Wellness Awards",
    description:
      "Recognised for scaling standardised, doctor-led Ayurvedic treatment protocols across a nationwide network of clinics and hospitals.",
  },
  {
    title: "Innovation in Cardiac Rehabilitation",
    year: "2023",
    subtitle: "National Healthcare Summit",
    description:
      "Awarded for our proprietary, data-driven approach to improving cardiac exercise tolerance and ejection fraction without invasive surgery.",
  },
  {
    title: "Most Trusted Wellness Brand",
    year: "2022",
    subtitle: "Economic Times Best Brands",
    description:
      "Acknowledged for earning the trust of over a million patients and families through transparent, research-backed chronic care.",
  },
];

export type MilestoneCard = {
  title: string;
  presentedBy: string;
  description: string;
  image?: string;
};

export type MilestoneTab = { label: string; cards: MilestoneCard[] };

export const milestoneTabs: MilestoneTab[] = [
  {
    label: "Clinical Excellence",
    cards: [
      {
        title: "Excellence in Non-Surgical Cardiac Care",
        presentedBy: "Presented By: Indian Medical Association",
        description:
          "Recognised for consistently improving cardiac outcomes and helping high-risk patients avoid invasive procedures through evidence-based protocols.",
      },
      {
        title: "Best Diabetes Reversal Programme",
        presentedBy: "Presented By: National Health Council",
        description:
          "Awarded for our Comprehensive Diabetes Care programme that has helped thousands lower HbA1c and reduce their dependence on medication.",
      },
    ],
  },
  {
    label: "Corporate & Leadership",
    cards: [
      {
        title: "Visionary Leadership in Integrative Medicine",
        presentedBy: "Presented By: World Health Congress",
        description:
          "Recognises our leadership's dedication to scaling evidence-based Ayurveda and building a network of over 300 specialised clinics across India.",
        image: "/assets/awards/milestone-a.png",
      },
      {
        title: "Healthcare Brand of the Year",
        presentedBy: "Presented By: Brands Academy India",
        description:
          "Awarded for earning unmatched patient trust and establishing a highly reliable corporate framework for non-surgical medical care.",
        image: "/assets/awards/milestone-b.png",
      },
    ],
  },
  {
    label: "Innovation & Technology",
    cards: [
      {
        title: "Digital Health Innovation Award",
        presentedBy: "Presented By: FICCI Healthcare Excellence",
        description:
          "Honoured for the mibPULSE platform, bringing structured, doctor-led remote care and real-time health tracking to patients across India.",
      },
      {
        title: "Best Use of Data in Healthcare",
        presentedBy: "Presented By: CII Health-Tech Summit",
        description:
          "Recognised for using advanced diagnostics and continuous monitoring to make Ayurvedic treatment measurable, safe, and highly effective.",
      },
    ],
  },
];

export type PressRelease = { title: string; source: string; href: string };

export const pressReleases: PressRelease[] = [
  {
    title:
      "Madhavbaug Imparts Scientific Evidence-Based Disease Reversal Training to Uttarakhand Govt. Doctors",
    source: "(TOI): Feb 23, 2023",
    href: "#",
  },
  {
    title: "Madhavbaug Crosses One Million Patients in Non-Surgical Chronic Care",
    source: "(ET): Jan 10, 2024",
    href: "#",
  },
  {
    title: "How Madhavbaug is Reversing Type 2 Diabetes Without Surgery",
    source: "(TOI): Aug 5, 2023",
    href: "#",
  },
  {
    title: "Scientific Ayurveda: Madhavbaug Publishes 200+ Peer-Reviewed Studies",
    source: "(Mint): Nov 18, 2023",
    href: "#",
  },
  {
    title: "Madhavbaug Expands to 350+ Clinics Across India",
    source: "(Business Standard): Mar 2, 2024",
    href: "#",
  },
  {
    title: "Dr Rohit Sane on Bridging Modern Diagnostics with Ayurveda",
    source: "(TOI): Jul 12, 2023",
    href: "#",
  },
];

export const recognitionStats = [
  { number: "1 Million +", label: "Lives Impacted" },
  { number: "80%+", label: "Medication Reduction Rate" },
  { number: "350+", label: "Clinics Nationwide" },
];
