"use client";

import { useState } from "react";
import type { XpSource } from "@/types/physicalStats";

type SubStatPhysicalProps = {
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

export default function SubStatPhysical({
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
}: SubStatPhysicalProps) {
  const [open, setOpen] = useState(defaultOpen);

  // Bar shows older XP in the sub-stat color and this week's gain in cream
  const basePercent = Math.min(100, ((xp - weeklyXp) / maxXp) * 100);
  const weeklyPercent = Math.min(100 - basePercent, (weeklyXp / maxXp) * 100);
  const activeDays = last7Days.filter(Boolean).length;

  return (
    <div className={`rounded-[20px] transition-colors ${open ? "bg-ql-raised" : "bg-ql-card"}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-16 w-full items-center gap-3 px-3.5 py-2.5 text-left"
      >
        {/* Icon placeholder until pixel art icons exist */}
        <span
          className="box-border flex size-[42px] shrink-0 items-center justify-center rounded-[14px] border-b-4 bg-ql-bg text-base font-bold text-ql-cream"
          style={{ borderColor: color }}
          aria-hidden
        >
          {label[0]}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-[15px] font-semibold">{label}</span>
            <span className="text-[15px] font-bold tabular-nums">{xp}</span>
          </span>
          <span
            className="flex h-2 overflow-hidden rounded bg-ql-track"
            role="progressbar"
            aria-label={label}
            aria-valuenow={xp}
            aria-valuemin={0}
            aria-valuemax={maxXp}
          >
            <span className="h-full" style={{ width: `${basePercent}%`, backgroundColor: color }} />
            <span className="h-full bg-ql-cream" style={{ width: `${weeklyPercent}%` }} />
          </span>
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

          <ul className="flex flex-col gap-2.5">
            {sources.map((source) => (
              <li key={source.label} className="flex justify-between text-sm">
                <span className="text-[#D8CDBA]">{source.label}</span>
                <span className="font-bold tabular-nums text-ql-cream">+{source.xp}</span>
              </li>
            ))}
          </ul>

          <div className="mt-1 flex items-center justify-between text-[13px]">
            <h4 className="font-semibold text-ql-text">Last 7 days</h4>
            <span className="text-ql-muted">{activeDays} of 7 active</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {last7Days.map((active, i) => {
              const isToday = i === last7Days.length - 1;
              return (
                <div
                  key={i}
                  className={`h-8 rounded-lg ${active ? "" : "bg-ql-track"}`}
                  style={active ? { backgroundColor: isToday ? "#DCC9A9" : color } : undefined}
                  title={isToday ? "Today" : `${last7Days.length - 1 - i}d ago`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
