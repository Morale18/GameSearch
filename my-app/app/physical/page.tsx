import AttributeSummary from "@/components/AttributeSummary";
import SubStatPhysical from "@/components/SubStatPhysical";
import { getPhysicalOverview } from "@/lib/data";
import { PHYSICAL_META } from "@/types/physicalStats";
import { STAT_META } from "@/types/stats";

export default function PhysicalPage() {
  const meta = STAT_META.physical;
  const { level, nextLevelXp, stats } = getPhysicalOverview();
  const totalXp = stats.reduce((sum, s) => sum + s.xp, 0);
  const weeklyXp = stats.reduce((sum, s) => sum + s.weeklyXp, 0);
  const xpToGo = Math.max(0, nextLevelXp - totalXp);
  const weeksToGo = weeklyXp ? Math.ceil(xpToGo / weeklyXp) : 0;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-3.5 px-4 pb-6 pt-[18px]">
      <AttributeSummary
        name={meta.label}
        chip={{ text: `Lv ${level}`, className: meta.chip }}
        segments={stats.map((stat, i) => ({
          label: PHYSICAL_META[stat.key].label,
          xp: stat.xp,
          color: meta.shades[i % meta.shades.length],
        }))}
        total={totalXp}
        maxXp={nextLevelXp}
        tiles={[
          { value: `+${weeklyXp}`, label: "This week" },
          { value: xpToGo, label: `To level ${level + 1}` },
          { value: weeksToGo ? `~${weeksToGo} wk` : "—", label: "At this pace" },
        ]}
      />

      <section aria-labelledby="breakdown-heading" className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between px-1">
          <h2 id="breakdown-heading" className="text-lg font-bold">
            Made up of
          </h2>
          <span className="flex items-center gap-1.5 text-xs text-ql-muted">
            <span className="size-2.5 rounded-[3px] bg-ql-cream" aria-hidden />
            this week
          </span>
        </div>

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
            color={meta.shades[i % meta.shades.length]}
            defaultOpen={i === 0}
          />
        ))}
      </section>
    </main>
  );
}
