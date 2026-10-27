export const PHYSICAL_STATS = [
    "strength",
    "calesthenics",
    "cardio",
    "recovery",
    "hyrox",
] as const;

export type PhysicalStatKey = (typeof PHYSICAL_STATS)[number];

export type PhysicalStat = {
    key: PhysicalStatKey;
    xp: number;
    maxXp: number;
};

export const PHYSICAL_META: Record<
    PhysicalStatKey,
    { label: string; description: string }
> = {
    strength: {
        label: "Strength",
        description: "Lifts, PRs, and weight training",
    },
    calesthenics: {
        label: "Calesthenics",
        description: "Bodyweight exercises and calisthenics",
    },
    cardio: {
        label: "Cardio",
        description: "Running, cycling, and cardiovascular activities",
    },
    recovery: {
        label: "Recovery",
        description: "Rest, sleep, and recovery practices",
    },
    hyrox: {
        label: "Hyrox",
        description: "High-intensity interval training (HIIT) workouts",
    },
};

// Extra info shown on the Physical detail page
export type XpSource = {
    label: string;
    xp: number;
};

export type PhysicalStatDetail = PhysicalStat & {
    // XP gained in the last 7 days (already included in xp)
    weeklyXp: number;
    sources: XpSource[];
    // Oldest → today
    last7Days: boolean[];
};

export type PhysicalOverview = {
    level: number;
    // XP needed to reach the next level
    nextLevelXp: number;
    stats: PhysicalStatDetail[];
};
