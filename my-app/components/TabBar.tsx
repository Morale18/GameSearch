"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME_PAGE, STAT_PAGES } from "@/lib/routes";
import { STAT_META } from "@/types/stats";

// Stroke icon paths, drawn in currentColor so the active tab can recolor them
const TABS = [
  { href: HOME_PAGE, label: "Home", paths: ["M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"] },
  {
    href: STAT_PAGES.discipline,
    label: STAT_META.discipline.label,
    paths: ["M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18z", "M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10z", "M12 11v2"],
  },
  {
    href: STAT_PAGES.knowledge,
    label: STAT_META.knowledge.label,
    paths: ["M2 4.5h6a4 4 0 0 1 4 4V20a3 3 0 0 0-3-3H2z", "M22 4.5h-6a4 4 0 0 0-4 4V20a3 3 0 0 1 3-3h7z"],
  },
  { href: STAT_PAGES.physical, label: STAT_META.physical.label, paths: ["M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"] },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 bg-ql-bg px-4 pb-[18px] pt-2">
      <nav
        aria-label="Main"
        className="mx-auto grid h-16 max-w-xl grid-cols-4 items-center rounded-full bg-ql-raised px-1.5"
      >
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              className={`mx-0.5 flex h-12 items-center justify-center rounded-full transition-colors ${
                active ? "bg-ql-cream text-ql-bg" : "text-ql-muted hover:text-ql-text"
              }`}
            >
              <svg
                aria-hidden
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {tab.paths.map((d) => (
                  <path key={d} d={d} />
                ))}
              </svg>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
