import Link from "next/link";
import SubStatPhysical from "@/components/SubStatPhysical";
import { getPhysicalOverview } from "@/lib/data";
import { PHYSICAL_META, type PhysicalStatKey } from "@/types/physicalStats";

// Teal shades used to tell sub-stats apart in the total bar and legend
const SUB_STAT_COLORS: Record<PhysicalStatKey, string> = {
  strength: "#a9dccb",
  calesthenics: "#7cc8b2",
  cardio: "#5fb8a0",
  recovery: "#3f8f7b",
  hyrox: "#2f6c5d",
};

const SEGMENTS = 20;

export default function PhysicalPage() {
  const { level, nextLevelXp, stats } = getPhysicalOverview();
  const totalXp = stats.reduce((sum, s) => sum + s.xp, 0);
  const weeklyXp = stats.reduce((sum, s) => sum + s.weeklyXp, 0);

  // Color each filled segment by whichever sub-stat's slice of XP it falls in
  const xpPerSegment = nextLevelXp / SEGMENTS;
  const segments = Array.from({ length: SEGMENTS }, (_, i) => {
    const midpoint = (i + 0.5) * xpPerSegment;
    if (midpoint > totalXp) return null;
    let running = 0;
    for (const stat of stats) {
      running += stat.xp;
      if (midpoint <= running) return SUB_STAT_COLORS[stat.key];
    }
    return null;
  });

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        ← Dashboard
      </Link>

      <header className="mb-6 flex items-center gap-5">
        {/* Icon placeholder framed with pixel corner brackets */}
        <div className="relative size-28 shrink-0 p-2">
          <span className="absolute left-0 top-0 size-4 border-l-4 border-t-4 border-rpg-gold" />
          <span className="absolute right-0 top-0 size-4 border-r-4 border-t-4 border-rpg-gold" />
          <span className="absolute bottom-0 left-0 size-4 border-b-4 border-l-4 border-rpg-gold" />
          <span className="absolute bottom-0 right-0 size-4 border-b-4 border-r-4 border-rpg-gold" />
          <div className="flex size-full items-center justify-center rounded-md border border-rpg-border bg-[#14211d] bg-[linear-gradient(#1f2e29_1px,transparent_1px),linear-gradient(90deg,#1f2e29_1px,transparent_1px)] bg-[size:8px_8px] font-pixel text-4xl text-rpg-gold">
            P
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-pixel text-xs tracking-[0.2em] text-rpg-teal">ATTRIBUTE · PHY</p>
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">Physical</h1>
            <span className="font-pixel text-2xl text-rpg-gold">LV {level}</span>
          </div>
          <p className="mt-1 text-zinc-400">
            The total of the {stats.length} sub-stats below.
          </p>
        </div>
      </header>

      {/* Double border gives the panel a framed, game-UI feel */}
      <section className="mb-8 rounded-2xl border border-rpg-border bg-rpg-bg p-1.5">
        <div className="rounded-xl border border-rpg-border/70 bg-rpg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-pixel text-base tracking-widest text-rpg-gold">TOTAL</h2>
              <p className="text-sm text-zinc-400">Toward level {level + 1}</p>
            </div>
            <p className="font-mono text-xl tabular-nums">
              <span className="font-bold text-zinc-100">{totalXp}</span>
              <span className="text-zinc-500"> / {nextLevelXp} XP</span>
            </p>
          </div>

          <div
            className="mt-5 flex h-8 gap-1"
            role="progressbar"
            aria-label="Total physical XP"
            aria-valuenow={totalXp}
            aria-valuemin={0}
            aria-valuemax={nextLevelXp}
          >
            {segments.map((color, i) => (
              <div
                key={i}
                className="flex-1 rounded-[2px] bg-rpg-track"
                style={color ? { backgroundColor: color } : undefined}
              />
            ))}
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {stats.map((stat) => (
              <li key={stat.key} className="flex items-center gap-3">
                <span
                  className="size-3.5 rounded-[2px]"
                  style={{ backgroundColor: SUB_STAT_COLORS[stat.key] }}
                />
                <span className="flex-1 text-zinc-300">{PHYSICAL_META[stat.key].label}</span>
                <span className="font-mono tabular-nums text-zinc-400">{stat.xp}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-rpg-border pt-4">
            <span className="text-zinc-400">
              {Math.max(0, nextLevelXp - totalXp)} XP to level {level + 1}
            </span>
            <span className="font-semibold text-rpg-gold">⌃ +{weeklyXp} this week</span>
          </div>
        </div>
      </section>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-zinc-100">Breakdown</h2>
        <span className="text-sm text-zinc-500">Tap a stat for details</span>
      </div>

      <div className="space-y-4">
        {stats.map((stat, i) => (
          <SubStatPhysical
            key={stat.key}
            label={PHYSICAL_META[stat.key].label}
            description={PHYSICAL_META[stat.key].description}
            xp={stat.xp}
            maxXp={stat.maxXp}
            weeklyXp={stat.weeklyXp}
            percentOfTotal={totalXp ? Math.round((stat.xp / totalXp) * 100) : 0}
            sources={stat.sources}
            last7Days={stat.last7Days}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </main>
  );
}
