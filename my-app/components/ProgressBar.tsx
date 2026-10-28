import { xpPercent } from "@/lib/xp";

type ProgressBarProps = {
  label: string;
  xp: number;
  maxXp: number;
  // Hex color for the fill
  color: string;
  // XP from this week, drawn in cream at the end of the fill (already included in xp)
  weeklyXp?: number;
};

export default function ProgressBar({ label, xp, maxXp, color, weeklyXp = 0 }: ProgressBarProps) {
  const basePercent = xpPercent(xp - weeklyXp, maxXp);
  const weeklyPercent = Math.min(100 - basePercent, xpPercent(weeklyXp, maxXp));

  return (
    <span
      className="flex h-2 overflow-hidden rounded bg-ql-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={xp}
      aria-valuemin={0}
      aria-valuemax={maxXp}
    >
      <span
        className="h-full transition-all duration-700"
        style={{ width: `${basePercent}%`, backgroundColor: color }}
      />
      {weeklyPercent > 0 && (
        <span className="h-full bg-ql-cream transition-all duration-700" style={{ width: `${weeklyPercent}%` }} />
      )}
    </span>
  );
}
