export const STATS = [
  "discipline",
  "knowledge",
  "strength",
  "body",
  "happiness",
] as const;

export type StatKey = (typeof STATS)[number];

export type Stat = {
  key: StatKey;
  xp: number;
  // XP needed to fill the bar
  maxXp: number;
};

// Display info for each stat. Colors are Tailwind classes so they get picked up at build time.
export const STAT_META: Record<
  StatKey,
  { label: string; description: string; bar: string; text: string }
> = {
  discipline: {
    label: "Discipline",
    description: "Consistency, habits, showing up",
    bar: "bg-amber-400",
    text: "text-amber-400",
  },
  knowledge: {
    label: "Knowledge",
    description: "Grades, new things learned",
    bar: "bg-sky-400",
    text: "text-sky-400",
  },
  strength: {
    label: "Strength",
    description: "Workouts, lifts, PRs",
    bar: "bg-rose-400",
    text: "text-rose-400",
  },
  body: {
    label: "Body",
    description: "Cardio, mile times, health",
    bar: "bg-emerald-400",
    text: "text-emerald-400",
  },
  happiness: {
    label: "Happiness",
    description: "Mood, rest, relationships",
    bar: "bg-violet-400",
    text: "text-violet-400",
  },
};
