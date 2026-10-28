type StatBarProps = {
  label: string;
  description: string;
  xp: number;
  maxXp: number;
  // Hex color for the icon underline and bar fill
  color: string;
};

export default function StatBar({ label, description, xp, maxXp, color }: StatBarProps) {
  const percent = maxXp ? Math.min(100, (xp / maxXp) * 100) : 0;

  return (
    <div className="flex min-h-16 items-center gap-3 rounded-[20px] bg-ql-card px-3.5 py-2.5">
      {/* Icon placeholder until pixel art icons exist */}
      <span
        className="box-border flex size-[42px] shrink-0 items-center justify-center rounded-[14px] border-b-4 bg-ql-bg text-base font-bold text-ql-cream"
        style={{ borderColor: color }}
        aria-hidden
      >
        {label[0]}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[15px] font-semibold">{label}</h3>
          <span className="text-[15px] font-bold tabular-nums">{xp}</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded bg-ql-track"
          role="progressbar"
          aria-label={label}
          aria-valuenow={xp}
          aria-valuemin={0}
          aria-valuemax={maxXp}
        >
          <div className="h-full transition-all duration-700" style={{ width: `${percent}%`, backgroundColor: color }} />
        </div>
        <p className="truncate text-xs text-ql-dim">{description}</p>
      </div>
    </div>
  );
}
