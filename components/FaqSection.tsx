import SectionLabel from "@/components/ui/SectionLabel";
import Accordion from "@/components/treatment/Accordion";

export type FaqItem = { question: string; answer: string };

/**
 * Site-wide FAQ section. Renders the standard leaf eyebrow + heading and the
 * shared Accordion. Reused on every page that shows FAQs — pass data via props.
 */
export default function FaqSection({
  items,
  eyebrow = "FAQs",
  title = "Frequently Asked Questions",
  className = "",
  defaultOpen = 0,
  id,
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  className?: string;
  defaultOpen?: number;
  id?: string;
}) {
  if (!items?.length) return null;
  return (
    <section id={id} className={`px-5 py-14 sm:px-8 lg:px-20 lg:py-10 ${className}`}>
      <div className="mx-auto w-full container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel>{eyebrow}</SectionLabel>
          </div>
          <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">{title}</h2>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
          <Accordion
            items={items.map((q) => ({ title: q.question, body: q.answer }))}
            defaultOpen={defaultOpen}
          />
        </div>
      </div>
    </section>
  );
}
