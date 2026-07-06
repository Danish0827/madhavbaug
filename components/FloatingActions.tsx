import Link from "next/link";
import { MapPin, HeartPulse } from "lucide-react";

/** Floating quick actions (right edge) — labels expand on hover, per Figma. */
export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-4 z-30 flex flex-col items-end gap-3 lg:right-6">
      <FloatingButton
        href="/clinic-hospital-locator"
        label="Nearest Centres"
        className="btn-gradient text-white"
        icon={<MapPin className="h-5 w-5" />}
      />
      <FloatingButton
        href="#"
        label="Check Your Health Risk"
        className="bg-white text-brand-purple ring-1 ring-brand-purple/20"
        icon={<HeartPulse className="h-5 w-5" />}
      />
      <FloatingButton
        href="#"
        label="Chat With Us"
        className="bg-[#25d366] text-white"
        icon={<WhatsAppIcon className="h-6 w-6" />}
      />
    </div>
  );
}

function FloatingButton({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`group flex h-[52px] items-center overflow-hidden rounded-full shadow-lg transition-all duration-300 ${className}`}
    >
      <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="max-w-0 whitespace-nowrap pr-0 text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:pr-5 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3a3 3 0 0 0-1 2.2c0 1.3 1 2.6 1.1 2.8.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}
