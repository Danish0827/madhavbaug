// Content for the "Board of Directors" page (Figma node 489-653 / 491-4).
// Static, editable copy. Director photos are placeholders in the design.

export type BoardMember = {
  name: string;
  role: string;
  bio: string;
  /** Which side the photo sits on at desktop widths (zig-zag layout). */
  imageSide: "left" | "right";
  readMore?: { label: string; href: string };
};

export const boardHero = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Board of Directors" },
  ],
  pillTitle: "Board of Directors",
  heading:
    "Our Board Members: Guided by Purpose, Committed to Responsible Healthcare",
  description:
    "At Madhavbaug, our medical expertise is backed by strong leadership and a clear vision for the future. Our Board of Directors brings together a wealth of experience in medicine, healthcare operations, finance, and corporate management. Together, their guidance ensures we deliver responsible patient care, maintain strict operational standards, and grow sustainably.",
};

// ---------- Executive Leadership (The Core Founders / Promoters) ----------
export const executiveLeaders: BoardMember[] = [
  {
    name: "Dr Rohit Madhav Sane",
    role: "Founder, Managing Director & Chief Executive Officer (CEO)",
    bio: "Dr Rohit Madhav Sane is the Founder, Managing Director, and CEO of Madhavbaug. He holds an MBBS degree and a Fellowship in Cardiac Rehabilitation, bringing over 20 years of experience in healthcare, clinical operations, and chronic disease care. Dr Sane is the mind behind Madhavbaug's unique approach to treating chronic diseases by focusing heavily on non-surgical treatments, healthy lifestyle changes, and Ayurvedic care. His leadership continues to shape the company's medical direction, new services, and patient-first philosophy.",
    imageSide: "right",
    readMore: { label: "Read more about Dr Rohit Sane", href: "/founder" },
  },
  {
    name: "Dr Vidyut Bipin Ghag",
    role: "Whole-Time Director",
    bio: "Dr Vidyut Bipin Ghag is the Whole-Time Director of Madhavbaug. She holds a BAMS degree from Ayurved Mahavidyalay in Sion, Mumbai, and a two-year post-graduate diploma in healthcare administration from the Welingkar Institute. She is also formally certified in medicolegal matters. With over 20 years at Madhavbaug, Dr Ghag brings extensive experience in healthcare management, clinical operations, medical training, and standardising processes. Her diverse background directly supports the organisation's focus on structured medical practices, strong compliance, and consistent patient care across its growing healthcare network.",
    imageSide: "left",
    readMore: { label: "Read more about Dr Vidyut Bipin Ghag", href: "#" },
  },
];

// ---------- Independent & Non-Executive Directors (Governance Pillars) ----------
export const independentDirectors: BoardMember[] = [
  {
    name: "Mr Ratnakar Rai",
    role: "Non-Executive Independent Director",
    bio: "Mr Ratnakar Rai is a Non-Executive Independent Director of the company. He is a commerce graduate from the University of Bombay, holds a Diploma in Business Management from the All India Council for Management Studies, and has completed an Executive Business Management Program from the Welingkar Institute of Management Development & Research, Mumbai. With more than 20 years of experience in corporate liaisoning, accounts, finance, and business management, Mr Rai brings a highly valuable commercial and governance perspective to the board. His experience supports the company's continuous focus on financial discipline, compliance awareness, and structured business oversight.",
    imageSide: "right",
  },
  {
    name: "Dr Mahesh Kshirsagar",
    role: "Non-Executive Independent Director",
    bio: "Dr Mahesh Kshirsagar is a Non-Executive Independent Director of the company. He holds an MBBS degree from the Maharashtra Institute of Medical Sciences & Research, which is affiliated with Swami Ramanand Teerth Marathwada University, Nanded. With over 15 years of dedicated experience in the medical field, Dr Kshirsagar brings an essential clinical perspective to the board. His background in medical practice, public health exposure, and healthcare delivery contributes deeply to board discussions on clinical governance, patient safety, and healthcare quality standards.",
    imageSide: "left",
  },
  {
    name: "Dr Sushrut Dambal",
    role: "Non-Executive Independent Director",
    bio: "Dr Sushrut Dambal is a Non-Executive Independent Director of the company. He holds an MD in anaesthesiology from Dr Babasaheb Ambedkar Marathwada University. With over 15 years of extensive experience in acute care, anaesthesiology, and intensive care settings, Dr Dambal brings a critical clinical and risk-management perspective to the Board. His experience strongly supports Board-level evaluations regarding patient safety metrics, clinical systems, healthcare quality, and institutional risk oversight.",
    imageSide: "right",
  },
];
