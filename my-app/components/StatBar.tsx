import Link from "next/link";

type StatBarProps = {
  label: string;
  description: string;
  xp: number;
  maxXp: number;
  // Tailwind classes for the bar fill and label color
  barClass: string;
  textClass: string;
  // If set, the whole row links to a detail page
  href?: string;
};

export default function StatBar({
  label,
  description,
  xp,
  maxXp,
  barClass,
  textClass,
  href,
}: StatBarProps) {
  const percent = Math.min(100, Math.round((xp / maxXp) * 100));

  const content = (
    <>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${textClass}`}>
            {label}
            {href && (
              <span className="ml-2 text-zinc-600 transition-colors group-hover:text-zinc-300">
                →
              </span>
            )}
          </h3>
          <p className="text-xs text-zinc-500">{description}</p>
        </div>
        <span className="font-mono text-sm tabular-nums text-zinc-400">
          {xp} / {maxXp} XP
        </span>
      </div>

      <div
        className="h-3 w-full overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-label={label}
        aria-valuenow={xp}
        aria-valuemin={0}
        aria-valuemax={maxXp}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ${barClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group -mx-3 block rounded-lg px-3 py-5 transition-colors hover:bg-zinc-800/50"
      >
        {content}
      </Link>
    );
  }

  return <div className="py-5">{content}</div>;
}
