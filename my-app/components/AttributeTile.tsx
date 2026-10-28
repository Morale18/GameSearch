import Image from "next/image";
import Link from "next/link";
import { xpPercent } from "@/lib/xp";

type AttributeTileProps = {
  label: string;
  icon: string;
  xp: number;
  maxXp: number;
  // Tailwind class for the bar fill
  barClass: string;
  // If set, the tile links to a detail page
  href?: string;
};

export default function AttributeTile({ label, icon, xp, maxXp, barClass, href }: AttributeTileProps) {
  const percent = xpPercent(xp, maxXp);

  const content = (
    <>
      <span className="flex size-[38px] items-center justify-center rounded-full bg-ql-raised">
        <Image src={icon} alt="" width={20} height={20} />
      </span>
      <span className="text-[19px] font-extrabold leading-none tabular-nums">{xp}</span>
      <span
        className="block h-1 w-[70%] overflow-hidden rounded-sm bg-ql-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={xp}
        aria-valuemin={0}
        aria-valuemax={maxXp}
      >
        <span
          className={`block h-full rounded-sm transition-all duration-500 ${barClass}`}
          style={{ width: `${percent}%` }}
        />
      </span>
      <span className="w-full truncate text-center text-[11px] font-semibold text-ql-dim">{label}</span>
    </>
  );

  const className =
    "flex flex-col items-center gap-1.5 rounded-[18px] bg-ql-card px-1 pb-2.5 pt-3 text-ql-text";

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${label}, ${xp} of ${maxXp} XP`}
        className={`${className} transition-transform active:scale-95`}
      >
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
