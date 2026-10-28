import ProgressBar from "@/components/ProgressBar";
import SubStatIcon from "@/components/SubStatIcon";

type StatBarProps = {
  label: string;
  description: string;
  xp: number;
  maxXp: number;
  // Hex color for the icon underline and bar fill
  color: string;
};

export default function StatBar({ label, description, xp, maxXp, color }: StatBarProps) {
  return (
    <div className="flex min-h-16 items-center gap-3 rounded-[20px] bg-ql-card px-3.5 py-2.5">
      <SubStatIcon label={label} color={color} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[15px] font-semibold">{label}</h3>
          <span className="text-[15px] font-bold tabular-nums">{xp}</span>
        </div>
        <ProgressBar label={label} xp={xp} maxXp={maxXp} color={color} />
        <p className="truncate text-xs text-ql-dim">{description}</p>
      </div>
    </div>
  );
}
