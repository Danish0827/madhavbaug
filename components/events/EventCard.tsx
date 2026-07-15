import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { MbEvent } from "@/lib/events";

/**
 * Event card for the listing grid. Shows the featured image with a date chip
 * and category badge, then title, time and location. Links to the detail page.
 */
export default function EventCard({ event }: { event: MbEvent }) {
  const href = `/events/${event.slug}`;
  const cat = event.categories[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="relative block h-52 w-full overflow-hidden bg-surface-lav">
        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 400px"
          />
        )}
        {/* Date chip */}
        {event.day && (
          <div className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-white/95 text-center shadow-md backdrop-blur">
            <span className="font-display text-xl leading-none text-brand-purple">{event.day}</span>
            <span className="text-[11px] font-medium uppercase text-gray-500">{event.mon}</span>
          </div>
        )}
        {cat && (
          <span className="absolute right-4 top-4 rounded-full bg-brand-purple px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            {cat.name}
          </span>
        )}
        {!event.isUpcoming && (
          <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
            Past event
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <Link href={href}>
          <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-brand-purple">
            {event.title}
          </h3>
        </Link>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-brand-purple" />
            {event.dateLabel}
            {event.weekday && <span className="text-gray-400">· {event.weekday}</span>}
          </p>
          {event.time && (
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-brand-purple" />
              {event.time}
            </p>
          )}
          {event.location && (
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
              <span className="line-clamp-2">{event.location}</span>
            </p>
          )}
        </div>

        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-medium text-brand-purple hover:underline"
        >
          View Details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
