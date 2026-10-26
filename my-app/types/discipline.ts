// Sub-stats that make up the main Discipline stat.
// Discipline XP = the sum of these sub-stats' XP.
export const DISCIPLINE_STATS = [
  "selfControl",
  "consistency",
  "accountability",
  "cleanliness",
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
  accountability: {
    label: "Accountability",
    description: "Owning results, following through on commitments",
  },
  cleanliness: {
    label: "Cleanliness",
    description: "Keeping your space, body, and things in order",
  },
};
