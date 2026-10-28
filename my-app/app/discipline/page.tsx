import AttributeSummary from "@/components/AttributeSummary";
import StatBar from "@/components/StatBar";
import { getDisciplineStats, getStats } from "@/lib/data";
import { DISCIPLINE_META } from "@/types/disciplineStats";
import { STAT_META } from "@/types/stats";

export default function DisciplinePage() {
  const meta = STAT_META.discipline;
  const discipline = getStats().find((s) => s.key === "discipline")!;
  const subStats = getDisciplineStats();

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-3.5 px-4 pb-6 pt-[18px]">
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
        <h2 id="breakdown-heading" className="px-1 text-lg font-bold">
          Made up of
        </h2>
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
    </main>
  );
}
