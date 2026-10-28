import { sumXp } from "@/lib/xp";
import { STATS, type Stat, type StatKey } from "@/types/stats";
import { DISCIPLINE_STATS, type DisciplineStat } from "@/types/disciplineStats";
import {
  KNOWLEDGE_STATS,
  type KnowledgeOverview,
  type KnowledgeStat,
  type KnowledgeStatKey,
  type KnowledgeStatDetail,
} from "@/types/knowledgeStats";
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

// Static sample data for the Knowledge page until it's wired to the db
const KNOWLEDGE_SAMPLE: Record<KnowledgeStatKey, Omit<KnowledgeStatDetail, "key">> = {
  reading: {
    xp: 110,
    maxXp: 250,
    weeklyXp: 25,
    sources: [
      { label: "Read 20 pages", xp: 10 },
      { label: "Finished a book", xp: 50 },
    ],
    last7Days: [true, true, false, true, true, false, true],
  },
  programming: {
    xp: 160,
    maxXp: 250,
    weeklyXp: 40,
    sources: [
      { label: "Coding session", xp: 15 },
      { label: "Shipped a feature", xp: 30 },
    ],
    last7Days: [true, true, true, false, true, true, true],
  },
  academicLearning: {
    xp: 90,
    maxXp: 250,
    weeklyXp: 20,
    sources: [
      { label: "Study session", xp: 10 },
      { label: "Aced an exam", xp: 40 },
    ],
    last7Days: [false, true, true, false, true, false, false],
  },
  handOnSkills: {
    xp: 40,
    maxXp: 250,
    weeklyXp: 5,
    sources: [
      { label: "Fixed something", xp: 15 },
      { label: "Finished a project", xp: 40 },
    ],
    last7Days: [false, false, false, false, false, true, false],
  },
  bibleFluency: {
    xp: 75,
    maxXp: 250,
    weeklyXp: 15,
    sources: [
      { label: "Read a chapter", xp: 5 },
      { label: "Memorized a verse", xp: 15 },
    ],
    last7Days: [true, false, true, true, false, true, true],
  },
  generalKnowledge: {
    xp: 55,
    maxXp: 250,
    weeklyXp: 10,
    sources: [
      { label: "Watched a documentary", xp: 10 },
      { label: "Learned a new topic", xp: 20 },
    ],
    last7Days: [false, true, false, false, true, false, true],
  },
};

export function getKnowledgeStats(): KnowledgeStat[] {
  return KNOWLEDGE_STATS.map((key) => ({
    key,
    xp: KNOWLEDGE_SAMPLE[key].xp,
    maxXp: KNOWLEDGE_SAMPLE[key].maxXp,
  }));
}

export function getKnowledgeOverview(): KnowledgeOverview {
  return {
    level: 12,
    nextLevelXp: 900,
    stats: KNOWLEDGE_STATS.map((key) => ({ key, ...KNOWLEDGE_SAMPLE[key] })),
  };
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

  // These stats are built from their sub-stats instead of stored on their own
  const fromSubStats: Partial<Record<StatKey, { xp: number; maxXp: number }>> = {
    discipline: sumXp(discipline),
    knowledge: sumXp(knowledge),
    physical: sumXp(physical),
  };

  return STATS.map((key) => ({ key, ...(fromSubStats[key] ?? { xp: 0, maxXp: 100 }) }));
}
