import Link from "next/link";
import StatBar from "@/components/StatBar";
import { getDisciplineStats, getStats } from "@/lib/data";
import { DISCIPLINE_META } from "@/types/disciplineStats";
import { STAT_META } from "@/types/stats";

export default function DisciplinePage() {
  const meta = STAT_META.discipline;
  const discipline = getStats().find((s) => s.key === "discipline")!;
  const subStats = getDisciplineStats();

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
          Your discipline is the total of the four stats below.
        </p>
      </header>

      <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-2">
        <StatBar
          label="Total"
          description="Sum of all discipline stats"
          xp={discipline.xp}
          maxXp={discipline.maxXp}
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
              label={DISCIPLINE_META[stat.key].label}
              description={DISCIPLINE_META[stat.key].description}
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
