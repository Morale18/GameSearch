import AttributeSummary from "@/components/AttributeSummary";
import BreakdownHeading from "@/components/BreakdownHeading";
import PageShell from "@/components/PageShell";
import SubStatPhysical from "@/components/SubStatPhysical";
import { getPhysicalOverview } from "@/lib/data";
import { percentOfTotal, summarizeOverview } from "@/lib/xp";
import { PHYSICAL_META } from "@/types/physicalStats";
import { STAT_META } from "@/types/stats";

export default function PhysicalPage() {
  const meta = STAT_META.physical;
  const overview = getPhysicalOverview();
  const { level, nextLevelXp, stats } = overview;
  const { totalXp, tiles } = summarizeOverview(overview);

  return (
    <PageShell>
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
        tiles={tiles}
      />

      <section aria-labelledby="breakdown-heading" className="flex flex-col gap-2">
        <BreakdownHeading showWeeklyKey />
        {stats.map((stat, i) => (
          <SubStatPhysical
            key={stat.key}
            label={PHYSICAL_META[stat.key].label}
            description={PHYSICAL_META[stat.key].description}
            xp={stat.xp}
            maxXp={stat.maxXp}
            weeklyXp={stat.weeklyXp}
            percentOfTotal={percentOfTotal(stat.xp, totalXp)}
            sources={stat.sources}
            last7Days={stat.last7Days}
            color={meta.shades[i % meta.shades.length]}
            defaultOpen={i === 0}
          />
        ))}
      </section>
    </PageShell>
  );
}
