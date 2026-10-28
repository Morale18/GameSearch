import type { StatOverview, SubStatActivity } from "@/types/stats";

// How full a bar is, 0-100
export function xpPercent(xp: number, maxXp: number): number {
  return maxXp ? Math.min(100, (xp / maxXp) * 100) : 0;
}

// Adds up xp (and maxXp) across a list of stats
export function sumXp(stats: { xp: number; maxXp: number }[]): { xp: number; maxXp: number } {
  return {
    xp: stats.reduce((sum, s) => sum + s.xp, 0),
    maxXp: stats.reduce((sum, s) => sum + s.maxXp, 0),
  };
}

// Totals shown at the top of a stat detail page
export function summarizeOverview(overview: StatOverview<{ xp: number } & SubStatActivity>) {
  const { level, nextLevelXp, stats } = overview;
  const totalXp = stats.reduce((sum, s) => sum + s.xp, 0);
  const weeklyXp = stats.reduce((sum, s) => sum + s.weeklyXp, 0);
  const xpToGo = Math.max(0, nextLevelXp - totalXp);
  const weeksToGo = weeklyXp ? Math.ceil(xpToGo / weeklyXp) : 0;

  return {
    totalXp,
    weeklyXp,
    // Tiles under the ring on a detail page
    tiles: [
      { value: `+${weeklyXp}`, label: "This week" },
      { value: xpToGo, label: `To level ${level + 1}` },
      { value: weeksToGo ? `~${weeksToGo} wk` : "—", label: "At this pace" },
    ],
  };
}

// A sub-stat's share of its main stat, 0-100
export function percentOfTotal(xp: number, totalXp: number): number {
  return totalXp ? Math.round((xp / totalXp) * 100) : 0;
}
