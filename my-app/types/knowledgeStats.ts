
export const KNOWLEDGE_STATS = [
    "reading",
    "programming",
    "academicLearning",
    "handOnSkills",
    "bibleFluency",
    "generalKnowledge",

] as const;

export type KnowledgeStatKey = (typeof KNOWLEDGE_STATS)[number];

export type KnowledgeStat = {
    key: KnowledgeStatKey;
    xp: number;
    maxXp: number;
};

export const KNOWLEDGE_META: Record<
    KnowledgeStatKey,
    { label: string; description: string }
> = {
    reading: {
        label: "Reading",
        description: "Books, articles, and other written materials",
    },
    programming:{
        label: "Programming",
        description: "Coding, software development, and problem-solving",
    },
    academicLearning: {
        label: "Academic Learning",
        description: "Engineering material",
    },
    handOnSkills: {
        label: "Hands-On Skills",
        description: "Practical skills, DIY projects, and craftsmanship",
    },
    bibleFluency: {
        label: "Bible Fluency",
        description: "Understanding and interpreting the Bible",
    },
    generalKnowledge: {
        label: "General Knowledge",
        description: "Topics like history, politics, economics etc",

    },
};


