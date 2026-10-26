import StatBar from "@/components/StatBar";
import { getLevel, getStats } from "@/lib/data";
import { STAT_META, type StatKey } from "@/types/stats";

// Stats that have their own breakdown page
const DETAIL_PAGES: Partial<Record<StatKey, string>> = {
  discipline: "/discipline",
  knowledge: "/knowledge",
  physical: "/physical",
};

export default function Home() {
  const level = getLevel();
  const stats = getStats();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-10 flex items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Dashboard
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Welcome</h1>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Level
          </span>
          <span className="font-mono text-3xl font-bold tabular-nums text-zinc-100">
            {level}
          </span>
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-2">
        <h2 className="pt-5 text-lg font-semibold text-zinc-100">Stats</h2>
        <div className="divide-y divide-zinc-800">
          {stats.map((stat) => {
            const meta = STAT_META[stat.key];
            return (
              <StatBar
                key={stat.key}
                label={meta.label}
                description={meta.description}
                xp={stat.xp}
                maxXp={stat.maxXp}
                barClass={meta.bar}
                textClass={meta.text}
                href={DETAIL_PAGES[stat.key]}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
