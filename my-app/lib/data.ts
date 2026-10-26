import { STATS, type Stat } from "@/types/stats";
import { DISCIPLINE_STATS, type DisciplineStat } from "@/types/discipline";

// Placeholder data until the database tables exist (see suggested SQL in db/schema.ts).
// When the tables are ready, replace the bodies of these functions with db queries —
// the pages only call these functions, so nothing else needs to change.

export function getLevel(): number {
  return 0;
}

export function getDisciplineStats(): DisciplineStat[] {
  return DISCIPLINE_STATS.map((key) => ({ key, xp: 0, maxXp: 25 }));
}

export function getStats(): Stat[] {
  const discipline = getDisciplineStats();

  return STATS.map((key) => {
    // Discipline is built from its sub-stats instead of stored on its own
    if (key === "discipline") {
      return {
        key,
        xp: discipline.reduce((sum, s) => sum + s.xp, 0),
        maxXp: discipline.reduce((sum, s) => sum + s.maxXp, 0),
      };
    }
    return { key, xp: 0, maxXp: 100 };
  });
}
