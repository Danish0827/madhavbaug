/**
 * Static content for the /insurance page (no API — sourced from the Figma design).
 */

export const insurancePartners = [
  "SBI General Insurance Company Limited",
  "Manipalcigna Health Insurance Company Ltd",
  "Cholamandalam MS General Insurance Co. Ltd.",
  "Future Generali India Insurance Company Limited",
  "Universal Sompo General Insurance Company Limited",
  "Reliance General Insurance Company Limited",
  "Star Health and Allied Insurance Co Ltd",
  "Niva Bupa Health Insurance Company Limited",
  "Care Health Insurance",
  "Acko General Insurance Ltd",
  "Aditya Birla Insurance Ltd",
  "Bajaj Allianz General Insurance Company",
];

export const tpaPartners = [
  "Medi Assist Healthcare Services Limited",
  "MDIndia Healthcare Services (TPA) Pvt. Ltd.",
  "Paramount Health Services & Insurance TPA Pvt. Ltd.",
  "Ericson Insurance TPA Pvt Ltd",
  "HealthIndia Insurance TPA Services Pvt. Ltd.",
  "Family Health Plan Insurance TPA Limited",
  "Volo Health Insurance TPA",
  "Link-K Insurance TPA Private Limited",
  "Heritage Health Insurance TPA",
];

export const insuranceLocations = [
  "Madhavbaug Khopoli",
  "Madhavbaug Kondhali",
  "Madhavbaug Vizag",
  "Madhavbaug Vadodara",
  "Madhavbaug Kolhapur",
];

export type ClaimCard = {
  tab: string;
  title: string;
  caption: string;
  items: { subtitle: string; description: string }[];
};

export const claimCards: ClaimCard[] = [
  {
    tab: "Option 1",
    title: "Cashless Claims",
    caption: "We bill your insurance directly",
    items: [
      {
        subtitle: "How it works",
        description:
          "If your insurance company is partnered with our hospital branch, our on-site team handles all the paperwork for you. Your insurance provider settles the bill directly with us, so you don't have to pay out of pocket. Please note that certain items are non-payable, check with your insurance company beforehand.",
      },
      {
        subtitle: "Important Requirement",
        description:
          "Cashless approvals depend on policy terms and conditions, and admission depends on the doctors advise after examining the patient, which are processed inside a standard 3-hour window after registration. Please share your health insurance policy copy with our helpdesk at the time of planned check-in to ensure a smooth pre-authorisation processing flow.",
      },
    ],
  },
  {
    tab: "Option 2",
    title: "Reimbursement Claims",
    caption: "You pay now and your insurance reimburses you later",
    items: [
      {
        subtitle: "How it works",
        description:
          "If our hospital branch is not on your insurance company's direct network list, you simply pay for your treatment bills yourself during your stay, which are later paid back to you by your insurance company on submission of all the relevant documents and bills along with the discharge summary.",
      },
      {
        subtitle: "The Refund Process",
        description:
          "When you are discharged, we will hand you a complete, organised medical file. This includes your doctor's prescriptions, detailed bills, receipts, and a discharge summary. All payments must be cleared before check-out. You just submit this file to your insurance company, and they will reimburse your money directly to your bank account.",
      },
    ],
  },
];

export const admissionChecklist = [
  "Valid Government ID",
  "Health Insurance Policy Copy / TPA Card",
  "All past medical history, check-up reports, and doctor prescriptions",
  "Filled out pre-authorization form (provided at the reception desk)",
  "One passport-size photograph",
];
