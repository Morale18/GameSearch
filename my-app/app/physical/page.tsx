import Link from "next/link";
import StatBar from "@/components/StatBar";
import { getPhysicalStats, getStats } from "@/lib/data";
import { PHYSICAL_META } from "@/types/physicalStats";
import { STAT_META } from "@/types/stats";

export default function PhysicalPage() {
  const meta = STAT_META.physical;
  const physical = getStats().find((s) => s.key === "physical")!;
  const subStats = getPhysicalStats();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        ← Dashboard
      </Link>

      <header className="mb-10 border-b border-zinc-800 pb-6">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">Stat</p>
        <h1 className={`text-4xl font-bold tracking-tight ${meta.text}`}>{meta.label}</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Your physical stat is the total of the stats below.
        </p>
      </header>

      <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-2">
        <StatBar
          label="Total"
          description="Sum of all physical stats"
          xp={physical.xp}
          maxXp={physical.maxXp}
          barClass={meta.bar}
          textClass={meta.text}
        />
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-2">
        <h2 className="pt-5 text-lg font-semibold text-zinc-100">Breakdown</h2>
        <div className="divide-y divide-zinc-800">
          {subStats.map((stat) => (
            <StatBar
              key={stat.key}
              label={PHYSICAL_META[stat.key].label}
              description={PHYSICAL_META[stat.key].description}
              xp={stat.xp}
              maxXp={stat.maxXp}
              barClass={meta.bar}
              textClass="text-zinc-200"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
