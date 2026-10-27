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
  defaultOpen = false,
}: SubStatPhysicalProps) {
  const [open, setOpen] = useState(defaultOpen);

  // Bar shows older XP in teal and this week's gain in gold
  const basePercent = Math.min(100, ((xp - weeklyXp) / maxXp) * 100);
  const weeklyPercent = Math.min(100 - basePercent, (weeklyXp / maxXp) * 100);
  const activeDays = last7Days.filter(Boolean).length;

  return (
    <div
      className={`rounded-2xl border bg-rpg-card transition-colors ${
        open ? "border-rpg-teal/40" : "border-rpg-border hover:border-rpg-teal/30"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full p-5 text-left"
      >
        <div className="flex items-center gap-4">
          {/* Icon placeholder until pixel art icons exist */}
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border-2 border-rpg-teal/60 bg-rpg-track font-pixel text-xl text-rpg-gold">
            {label[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-zinc-100">{label}</h3>
            <p className="truncate text-sm text-zinc-400">{description}</p>
          </div>
          <span
            className={`text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div
            className="flex h-2.5 flex-1 overflow-hidden rounded-sm bg-rpg-track"
            role="progressbar"
            aria-label={label}
            aria-valuenow={xp}
            aria-valuemin={0}
            aria-valuemax={maxXp}
          >
            <div className="h-full bg-rpg-teal" style={{ width: `${basePercent}%` }} />
            <div className="h-full bg-rpg-gold" style={{ width: `${weeklyPercent}%` }} />
          </div>
          <span className="w-16 text-right font-mono text-sm tabular-nums text-zinc-200">
            {xp} XP
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-rpg-gold">+{weeklyXp} XP this week</span>
          <span className="text-zinc-500">{percentOfTotal}% of total</span>
        </div>
      </button>

      {open && (
        <div className="mx-5 border-t border-rpg-border pb-5 pt-4">
          <h4 className="mb-2 text-sm font-semibold text-zinc-300">Earns XP from</h4>
          <ul className="space-y-1.5">
            {sources.map((source) => (
              <li key={source.label} className="flex items-center gap-3">
                <span className="size-2 rounded-[1px] bg-rpg-teal" aria-hidden />
                <span className="flex-1 text-zinc-200">{source.label}</span>
                <span className="font-mono tabular-nums text-rpg-gold">+{source.xp}</span>
              </li>
            ))}
          </ul>

          <div className="mb-2 mt-5 flex items-center justify-between text-sm">
            <h4 className="font-semibold text-zinc-300">Last 7 days</h4>
            <span className="text-zinc-500">{activeDays} of 7 active</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {last7Days.map((active, i) => {
              const isToday = i === last7Days.length - 1;
              const color = !active ? "bg-rpg-track" : isToday ? "bg-rpg-gold" : "bg-rpg-teal";
              return (
                <div
                  key={i}
                  className={`h-8 rounded-sm border border-rpg-border/60 ${color}`}
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
