import type { StatKey } from "@/types/stats";

export const HOME_PAGE = "/";

// Stats that have their own breakdown page
export const STAT_PAGES = {
  discipline: "/discipline",
  knowledge: "/knowledge",
  physical: "/physical",
} as const satisfies Partial<Record<StatKey, string>>;

export function statPage(key: StatKey): string | undefined {
  return (STAT_PAGES as Partial<Record<StatKey, string>>)[key];
}
