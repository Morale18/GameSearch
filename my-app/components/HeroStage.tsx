import Image from "next/image";

type HeroStageProps = {
  level: number;
  xp: number;
  maxXp: number;
};

// Poster-style scene: sun, red horizon stripes and the pixel hero, with level and XP on top
export default function HeroStage({ level, xp, maxXp }: HeroStageProps) {
  const percent = maxXp ? Math.min(100, (xp / maxXp) * 100) : 0;

  return (
    <section
      aria-label={`Level ${level}`}
      className="relative h-[330px] overflow-hidden rounded-[26px] bg-ql-moss"
    >
      <span aria-hidden className="absolute left-1/2 top-[52px] -ml-[105px] size-[210px] rounded-full bg-ql-cream" />
      <span aria-hidden className="absolute inset-x-0 top-[176px] h-2.5 bg-ql-red" />
      <span aria-hidden className="absolute inset-x-0 top-[196px] h-2 bg-ql-red" />
      <span aria-hidden className="absolute inset-x-0 top-[212px] h-1.5 bg-ql-red" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 top-[226px] bg-ql-moss-dark" />
      <span aria-hidden className="absolute bottom-[92px] left-1/2 -ml-[60px] h-3.5 w-[120px] rounded-[50%] bg-ql-moss-shadow" />
      <Image
        src="/hero.svg"
        alt=""
        width={176}
        height={176}
        priority
        className="absolute bottom-24 left-1/2 -ml-[88px] animate-bob [image-rendering:pixelated]"
      />

      <p className="absolute left-[18px] top-4 flex items-baseline gap-1 text-ql-text">
        <span className="text-[15px] font-semibold">Lv</span>
        <span className="text-[40px] font-extrabold leading-none">{level}</span>
      </p>

      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 rounded-[18px] bg-ql-bg px-4 py-3.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-medium text-ql-muted">
            {Math.max(0, maxXp - xp)} XP to level {level + 1}
          </span>
          <span className="text-sm font-bold tabular-nums">
            <span className="text-ql-cream">{xp.toLocaleString("en-US")}</span>
            <span className="text-ql-dim"> / {maxXp.toLocaleString("en-US")} XP</span>
          </span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-[5px] bg-ql-track"
          role="progressbar"
          aria-label="XP to next level"
          aria-valuenow={xp}
          aria-valuemin={0}
          aria-valuemax={maxXp}
        >
          <div
            className="h-full rounded-[5px] bg-ql-red transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
