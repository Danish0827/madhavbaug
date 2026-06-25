import { Sprout } from "lucide-react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** light = for use on dark/coloured backgrounds */
  tone?: "default" | "light";
};

/** The small leaf eyebrow used above every section heading. */
export default function SectionLabel({
  children,
  className = "",
  tone = "default",
}: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-base font-medium ${
        tone === "light" ? "text-white/80" : "text-eyebrow"
      } ${className}`}
    >
      <Sprout className="h-5 w-5" strokeWidth={2} />
      {children}
    </span>
  );
}
