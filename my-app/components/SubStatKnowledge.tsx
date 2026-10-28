"use client";

import { useState } from "react";
import Last7Days from "@/components/Last7Days";
import ProgressBar from "@/components/ProgressBar";
import SubStatIcon from "@/components/SubStatIcon";
import XpSourceList from "@/components/XpSourceList";
import type { XpSource } from "@/types/stats";

type SubStatKnowledgeProps = {
  label: string;
  description: string;
  xp: number;
  maxXp: number;
  weeklyXp: number;
  // Share of the main stat's XP, 0-100
  percentOfTotal: number;
  sources: XpSource[];
  // Oldest → today
  last7Days: boolean[];
  // Hex color for this sub-stat (matches its arc in the ring)
  color: string;
  defaultOpen?: boolean;
};

export default function SubStatKnowledge({
  label,
  description,
  xp,
  maxXp,
  weeklyXp,
  percentOfTotal,
  sources,
  last7Days,
  color,
  defaultOpen = false,
}: SubStatKnowledgeProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-[20px] transition-colors ${open ? "bg-ql-raised" : "bg-ql-card"}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-16 w-full items-center gap-3 px-3.5 py-2.5 text-left"
      >
        <SubStatIcon label={label} color={color} />
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-[15px] font-semibold">{label}</span>
            <span className="text-[15px] font-bold tabular-nums">{xp}</span>
          </span>
          <ProgressBar label={label} xp={xp} maxXp={maxXp} weeklyXp={weeklyXp} color={color} />
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-2.5 pb-3.5 pl-[66px] pr-3.5">
          <p className="text-[13px] text-ql-muted">
            {description} ·{" "}
            <span className="font-semibold text-ql-cream">
              {weeklyXp ? `+${weeklyXp} this week` : "no XP yet this week"}
            </span>{" "}
            · {percentOfTotal}% of total
          </p>
          <XpSourceList sources={sources} />
          <Last7Days days={last7Days} color={color} />
        </div>
      )}
    </div>
  );
}
