import AttributeSummary from "@/components/AttributeSummary";
import BreakdownHeading from "@/components/BreakdownHeading";
import PageShell from "@/components/PageShell";
import StatBar from "@/components/StatBar";
import { getDisciplineStats, getStats } from "@/lib/data";
import { DISCIPLINE_META } from "@/types/disciplineStats";
import { STAT_META } from "@/types/stats";

export default function DisciplinePage() {
  const meta = STAT_META.discipline;
  const discipline = getStats().find((s) => s.key === "discipline")!;
  const subStats = getDisciplineStats();

  return (
    <PageShell>
      <AttributeSummary
        name={meta.label}
        segments={subStats.map((stat, i) => ({
          label: DISCIPLINE_META[stat.key].label,
          xp: stat.xp,
          color: meta.shades[i % meta.shades.length],
        }))}
        total={discipline.xp}
        maxXp={discipline.maxXp}
      />

      <section aria-labelledby="breakdown-heading" className="flex flex-col gap-2">
        <BreakdownHeading />
        {subStats.map((stat, i) => (
          <StatBar
            key={stat.key}
            label={DISCIPLINE_META[stat.key].label}
            description={DISCIPLINE_META[stat.key].description}
            xp={stat.xp}
            maxXp={stat.maxXp}
            color={meta.shades[i % meta.shades.length]}
          />
        ))}
      </section>
    </PageShell>
  );
}
