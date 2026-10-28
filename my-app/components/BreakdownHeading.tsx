type BreakdownHeadingProps = {
  // Show the key for the cream "this week" part of the bars
  showWeeklyKey?: boolean;
};

// "Made up of" heading above the sub-stat list on a detail page
export default function BreakdownHeading({ showWeeklyKey = false }: BreakdownHeadingProps) {
  return (
    <div className="flex items-baseline justify-between px-1">
      <h2 id="breakdown-heading" className="text-lg font-bold">
        Made up of
      </h2>
      {showWeeklyKey && (
        <span className="flex items-center gap-1.5 text-xs text-ql-muted">
          <span className="size-2.5 rounded-[3px] bg-ql-cream" aria-hidden />
          this week
        </span>
      )}
    </div>
  );
}
