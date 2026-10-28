import Image from "next/image";

type Segment = { label: string; xp: number; color: string };

type AttributeSummaryProps = {
  name: string;
  // Text and Tailwind classes for the chip beside the name, e.g. "Lv 11"
  chip?: { text: string; className: string };
  // Sub-stats drawn as arcs around the ring, in order
  segments: Segment[];
  total: number;
  // XP that fills the whole ring
  maxXp: number;
  tiles?: { value: string | number; label: string }[];
};

const RADIUS = 104;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function AttributeSummary({ name, chip, segments, total, maxXp, tiles }: AttributeSummaryProps) {
  const lengths = segments.map((s) => (maxXp ? (CIRCUMFERENCE * s.xp) / maxXp : 0));
  const arcs = segments.map((s, i) => ({
    color: s.color,
    // Leave a small gap between arcs
    dash: Math.max(0, lengths[i] - 3),
    // Start each arc where the previous ones end
    offset: -lengths.slice(0, i).reduce((sum, l) => sum + l, 0),
  }));

  return (
    <section className="flex flex-col gap-3.5 rounded-[28px] bg-ql-card p-[18px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-semibold text-ql-muted">Attribute</p>
          <h1 className="text-[30px] font-extrabold tracking-tight">{name}</h1>
        </div>
        {chip && (
          <span className={`flex h-[34px] items-center rounded-full px-3.5 text-[15px] font-bold ${chip.className}`}>
            {chip.text}
          </span>
        )}
      </div>

      <div className="relative mx-auto size-[236px]">
        <svg
          role="img"
          aria-label={`${name} ${total} of ${maxXp} XP: ${segments.map((s) => `${s.label} ${s.xp}`).join(", ")}`}
          width="236"
          height="236"
          viewBox="0 0 236 236"
          className="-rotate-90"
        >
          <circle cx="118" cy="118" r={RADIUS} fill="none" stroke="#3A3631" strokeWidth="16" />
          {arcs.map((arc, i) =>
            arc.dash > 0 ? (
              <circle
                key={i}
                cx="118"
                cy="118"
                r={RADIUS}
                fill="none"
                stroke={arc.color}
                strokeWidth="16"
                strokeDasharray={`${arc.dash.toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`}
                strokeDashoffset={arc.offset.toFixed(1)}
              />
            ) : null,
          )}
        </svg>
        <span aria-hidden className="absolute left-1/2 top-11 -ml-[50px] size-[100px] rounded-full bg-ql-moss" />
        <span aria-hidden className="absolute left-1/2 top-[118px] -ml-[50px] h-1.5 w-[100px] bg-ql-red" />
        <Image
          src="/hero.svg"
          alt=""
          width={116}
          height={116}
          className="absolute left-1/2 top-[30px] -ml-[58px] animate-bob [image-rendering:pixelated]"
        />
        <span className="absolute inset-x-0 top-[152px] flex flex-col items-center">
          <span className="text-[28px] font-extrabold leading-none tracking-tight tabular-nums">{total}</span>
          <span className="text-xs font-medium text-ql-muted">of {maxXp} XP</span>
        </span>
      </div>

      {tiles && (
        <div className="grid grid-cols-3 gap-2 text-center">
          {tiles.map((tile) => (
            <span key={tile.label} className="flex flex-col gap-0.5 rounded-2xl bg-ql-bg px-1 py-2.5">
              <span className="text-lg font-extrabold tabular-nums">{tile.value}</span>
              <span className="text-[11px] text-ql-muted">{tile.label}</span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
