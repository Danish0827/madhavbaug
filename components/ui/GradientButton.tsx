import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  withArrow?: boolean;
  className?: string;
};

export default function GradientButton({
  href = "#",
  children,
  variant = "solid",
  withArrow = true,
  className = "",
}: Props) {
  const base =
    "group inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap";

  const variants: Record<string, string> = {
    solid: "btn-gradient text-white px-5 py-3 shadow-md shadow-brand-purple/20 hover:shadow-lg hover:shadow-brand-purple/30",
    outline:
      "border border-brand-purple/40 text-brand-purple px-5 py-3 hover:bg-brand-purple/5",
    ghost: "text-brand-purple px-2 py-1 hover:underline",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      {withArrow && (
        <span
          className={
            variant === "solid"
              ? "flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5"
              : "transition-transform group-hover:translate-x-0.5"
          }
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </Link>
  );
}
