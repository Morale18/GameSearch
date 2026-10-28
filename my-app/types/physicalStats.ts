import type { StatOverview, SubStatActivity } from "./stats";

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
export type PhysicalStatDetail = PhysicalStat & SubStatActivity;

export type PhysicalOverview = StatOverview<PhysicalStatDetail>;
