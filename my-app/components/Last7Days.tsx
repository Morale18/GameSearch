type Last7DaysProps = {
  // Oldest → today
  days: boolean[];
  // Hex color for active days (today is always cream)
  color: string;
};

export default function Last7Days({ days, color }: Last7DaysProps) {
  const activeDays = days.filter(Boolean).length;

  return (
    <>
      <div className="mt-1 flex items-center justify-between text-[13px]">
        <h4 className="font-semibold text-ql-text">Last 7 days</h4>
        <span className="text-ql-muted">
          {activeDays} of {days.length} active
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((active, i) => {
          const isToday = i === days.length - 1;
          return (
            <div
              key={i}
              className={`h-8 rounded-lg ${!active ? "bg-ql-track" : isToday ? "bg-ql-cream" : ""}`}
              style={active && !isToday ? { backgroundColor: color } : undefined}
              title={isToday ? "Today" : `${days.length - 1 - i}d ago`}
            />
          );
        })}
      </div>
    </>
  );
}
