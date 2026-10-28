import type { XpSource } from "@/types/stats";

// What a sub-stat earns XP from
export default function XpSourceList({ sources }: { sources: XpSource[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {sources.map((source) => (
        <li key={source.label} className="flex justify-between text-sm">
          <span className="text-ql-soft">{source.label}</span>
          <span className="font-bold tabular-nums text-ql-cream">+{source.xp}</span>
        </li>
      ))}
    </ul>
  );
}
