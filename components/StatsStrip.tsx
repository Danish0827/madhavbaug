import { stats } from "@/data/content";

export default function StatsStrip() {
  return (
    <section className="bg-white pb-16 ">
      <div className="mx-auto grid w-full container gap-5 px-3 sm:grid-cols-2 sm:px-5 lg:grid-cols-5 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-stat-card rounded-[30px] p-6 ring-1 ring-brand-purple/10"
          >
            <p className="font-display text-3xl text-ink">{stat.value}</p>
            <p className="font-display mt-3 text-xl text-ink">{stat.label}</p>
            <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
