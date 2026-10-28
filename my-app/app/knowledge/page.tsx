import AttributeSummary from "@/components/AttributeSummary";
import StatBar from "@/components/StatBar";
import { getKnowledgeStats, getStats } from "@/lib/data";
import { KNOWLEDGE_META } from "@/types/knowledgeStats";
import { STAT_META } from "@/types/stats";

export default function KnowledgePage() {
  const meta = STAT_META.knowledge;
  const knowledge = getStats().find((s) => s.key === "knowledge")!;
  const subStats = getKnowledgeStats();

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-3.5 px-4 pb-6 pt-[18px]">
      <AttributeSummary
        name={meta.label}
        segments={subStats.map((stat, i) => ({
          label: KNOWLEDGE_META[stat.key].label,
          xp: stat.xp,
          color: meta.shades[i % meta.shades.length],
        }))}
        total={knowledge.xp}
        maxXp={knowledge.maxXp}
      />

      <section aria-labelledby="breakdown-heading" className="flex flex-col gap-2">
        <h2 id="breakdown-heading" className="px-1 text-lg font-bold">
          Made up of
        </h2>
        {subStats.map((stat, i) => (
          <StatBar
            key={stat.key}
            label={KNOWLEDGE_META[stat.key].label}
            description={KNOWLEDGE_META[stat.key].description}
            xp={stat.xp}
            maxXp={stat.maxXp}
            color={meta.shades[i % meta.shades.length]}
          />
        ))}
      </section>
    </main>
  );
}
