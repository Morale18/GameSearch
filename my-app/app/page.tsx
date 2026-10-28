import AttributeTile from "@/components/AttributeTile";
import HeroStage from "@/components/HeroStage";
import PageShell from "@/components/PageShell";
import { getLevel, getStats } from "@/lib/data";
import { statPage } from "@/lib/routes";
import { STAT_META } from "@/types/stats";

export default function Home() {
  const level = getLevel();
  const stats = getStats();
  const totalXp = stats.reduce((sum, s) => sum + s.xp, 0);
  const totalMaxXp = stats.reduce((sum, s) => sum + s.maxXp, 0);

  return (
    <PageShell gap="gap-4">
      <header className="flex flex-col gap-0.5">
        <p className="text-[13px] font-medium text-ql-muted">Dashboard</p>
        <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
      </header>

      <HeroStage level={level} xp={totalXp} maxXp={totalMaxXp} />

      <section aria-labelledby="attributes-heading" className="flex flex-col gap-2.5">
        <h2 id="attributes-heading" className="text-lg font-bold">
          Attributes
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {stats.map((stat) => {
            const meta = STAT_META[stat.key];
            return (
              <AttributeTile
                key={stat.key}
                label={meta.label}
                icon={meta.icon}
                xp={stat.xp}
                maxXp={stat.maxXp}
                barClass={meta.bar}
                href={statPage(stat.key)}
              />
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
