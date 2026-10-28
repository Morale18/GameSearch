export const STATS = [
  "discipline",
  "knowledge",
  "physical",
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
// `shades` color the sub-stats on a detail page, lightest first.
export const STAT_META: Record<
  StatKey,
  { label: string; description: string; icon: string; bar: string; chip: string; shades: string[] }
> = {
  discipline: {
    label: "Discipline",
    description: "Consistency, habits, showing up",
    icon: "/icons/discipline.svg",
    bar: "bg-stat-discipline",
    chip: "bg-stat-discipline text-ql-bg",
    shades: ["#DCC9A9", "#B9A788", "#97876B", "#776A54", "#5E5443", "#4A4235"],
  },
  knowledge: {
    label: "Knowledge",
    description: "Grades, new things learned",
    icon: "/icons/knowledge.svg",
    bar: "bg-stat-knowledge",
    chip: "bg-stat-knowledge text-ql-bg",
    shades: ["#7E9BB0", "#668397", "#526B7C", "#425663", "#36464F", "#2B383F"],
  },
  physical: {
    label: "Physical",
    description: "Workouts, lifts, PRs",
    icon: "/icons/physical.svg",
    bar: "bg-stat-physical",
    chip: "bg-stat-physical text-ql-bg",
    shades: ["#C4483A", "#A13B30", "#7F3027", "#62261F", "#4B1D18"],
  },
  body: {
    label: "Body",
    description: "Cardio, mile times, health",
    icon: "/icons/body.svg",
    bar: "bg-stat-body",
    chip: "bg-stat-body text-ql-bg",
    shades: ["#7F9C7F", "#678567", "#4E6851", "#3F5642"],
  },
  happiness: {
    label: "Happiness",
    description: "Mood, rest, relationships",
    icon: "/icons/happiness.svg",
    bar: "bg-stat-happiness",
    chip: "bg-stat-happiness text-ql-bg",
    shades: ["#D1A24A", "#AD863D", "#8A6A31", "#6A5126"],
  },
};

// One way a sub-stat earns XP, shown on the stat detail pages
export type XpSource = {
  label: string;
  xp: number;
};

// Extra info shown for a sub-stat on its detail page
export type SubStatActivity = {
  // XP gained in the last 7 days (already included in xp)
  weeklyXp: number;
  sources: XpSource[];
  // Oldest → today
  last7Days: boolean[];
};

// Everything a stat detail page needs
export type StatOverview<T> = {
  level: number;
  // XP needed to reach the next level
  nextLevelXp: number;
  stats: T[];
};
