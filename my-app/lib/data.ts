import { STATS, type Stat } from "@/types/stats";
import { DISCIPLINE_STATS, type DisciplineStat } from "@/types/disciplineStats";
import { KNOWLEDGE_STATS, type KnowledgeStat } from "@/types/knowledgeStats";
import {
  PHYSICAL_STATS,
  type PhysicalOverview,
  type PhysicalStat,
  type PhysicalStatKey,
  type PhysicalStatDetail,
} from "@/types/physicalStats";

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
// Static sample data for the Physical page until it's wired to the db
const PHYSICAL_SAMPLE: Record<PhysicalStatKey, Omit<PhysicalStatDetail, "key">> = {
  strength: {
    xp: 120,
    maxXp: 250,
    weeklyXp: 30,
    sources: [
      { label: "Lift session", xp: 15 },
      { label: "New PR", xp: 25 },
    ],
    last7Days: [true, false, true, false, true, false, true],
  },
  calesthenics: {
    xp: 85,
    maxXp: 250,
    weeklyXp: 20,
    sources: [
      { label: "Push-up set", xp: 5 },
      { label: "New skill unlocked", xp: 40 },
    ],
    last7Days: [false, true, false, true, false, true, false],
  },
  cardio: {
    xp: 140,
    maxXp: 250,
    weeklyXp: 40,
    sources: [
      { label: "Run 3+ miles", xp: 20 },
      { label: "Faster mile time", xp: 30 },
      { label: "7-day streak", xp: 50 },
    ],
    last7Days: [true, true, true, true, true, true, true],
  },
  recovery: {
    xp: 60,
    maxXp: 250,
    weeklyXp: 10,
    sources: [
      { label: "8 hours of sleep", xp: 10 },
      { label: "Stretch / mobility", xp: 5 },
    ],
    last7Days: [true, false, false, true, true, false, true],
  },
  hyrox: {
    xp: 45,
    maxXp: 250,
    weeklyXp: 10,
    sources: [
      { label: "HIIT workout", xp: 10 },
      { label: "Full simulation", xp: 50 },
    ],
    last7Days: [false, false, true, false, false, false, true],
  },
};

export function getPhysicalStats(): PhysicalStat[] {
  return PHYSICAL_STATS.map((key) => ({
    key,
    xp: PHYSICAL_SAMPLE[key].xp,
    maxXp: PHYSICAL_SAMPLE[key].maxXp,
  }));
}

export function getPhysicalOverview(): PhysicalOverview {
  return {
    level: 11,
    nextLevelXp: 880,
    stats: PHYSICAL_STATS.map((key) => ({ key, ...PHYSICAL_SAMPLE[key] })),
  };
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
