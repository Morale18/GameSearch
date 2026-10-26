// Sub-stats that make up the main Discipline stat.
// Discipline XP = the sum of these sub-stats' XP.
export const DISCIPLINE_STATS = [
  "selfControl",
  "consistency",
  "timeManagement",
  "cleanliness",
  "screenTime",
] as const;

export type DisciplineStatKey = (typeof DISCIPLINE_STATS)[number];

export type DisciplineStat = {
  key: DisciplineStatKey;
  xp: number;
  maxXp: number;
};

export const DISCIPLINE_META: Record<
  DisciplineStatKey,
  { label: string; description: string }
> = {
  selfControl: {
    label: "Self Control",
    description: "Resisting temptations, sticking to limits",
  },
  consistency: {
    label: "Consistency",
    description: "Streaks, showing up every day",
  },
  timeManagement: {
    label: "Time Management",
    description: "Prioritizing tasks, using time effectively",
  },
  cleanliness: {
    label: "Cleanliness",
    description: "Keeping your space, body, and things in order",
  },
  screenTime: {
    label: "Screen Time",
    description: "Managing and limiting device usage",
  },
};
