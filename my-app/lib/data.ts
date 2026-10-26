import { STATS, type Stat } from "@/types/stats";
import { DISCIPLINE_STATS, type DisciplineStat } from "@/types/disciplineStats";
import { KNOWLEDGE_STATS, type KnowledgeStat } from "@/types/knowledgeStats";
import { PHYSICAL_STATS, PhysicalStat } from "@/types/physicalStats";

// Placeholder data until the database tables exist (see suggested SQL in db/schema.ts).
// When the tables are ready, replace the bodies of these functions with db queries —
// the pages only call these functions, so nothing else needs to change.

export function getLevel(): number {
  return 0;
}

export function getDisciplineStats(): DisciplineStat[] {
  return DISCIPLINE_STATS.map((key) => ({ key, xp: 0, maxXp: 25 }));
}

export function getKnowledgeStats(): KnowledgeStat[] {
  return KNOWLEDGE_STATS.map((key) => ({ key, xp: 0, maxXp: 25 }));
}
export function getPhysicalStats(): PhysicalStat[] {
  return PHYSICAL_STATS.map((key) => ({ key, xp: 0, maxXp: 25 }));
}

export function getStats(): Stat[] {
  const discipline = getDisciplineStats();
  const knowledge = getKnowledgeStats();
  const physical = getPhysicalStats();

  

  return STATS.map((key) => {
    // Discipline is built from its sub-stats instead of stored on its own
    if (key === "discipline") {
      return {
        key,
        xp: discipline.reduce((sum, s) => sum + s.xp, 0),
        maxXp: discipline.reduce((sum, s) => sum + s.maxXp, 0),
      };
    }
    // Knowledge is built from its sub-stats instead of stored on its own
    if (key === "knowledge") {
      return {
        key,
        xp: knowledge.reduce((sum, s) => sum + s.xp, 0),
        maxXp: knowledge.reduce((sum, s) => sum + s.maxXp, 0),
      };
    }
    if(key === "physical") {
      return {
        key,
        xp: physical.reduce((sum, s) => sum + s.xp, 0),
        maxXp: physical.reduce((sum, s) => sum + s.maxXp, 0),
      };
    }
    return { key, xp: 0, maxXp: 100 };
  });
}
