type SubStatIconProps = {
  label: string;
  // Hex color for the underline
  color: string;
};

// Icon placeholder until pixel art icons exist
export default function SubStatIcon({ label, color }: SubStatIconProps) {
  return (
    <span
      className="box-border flex size-[42px] shrink-0 items-center justify-center rounded-[14px] border-b-4 bg-ql-bg text-base font-bold text-ql-cream"
      style={{ borderColor: color }}
      aria-hidden
    >
      {label[0]}
    </span>
  );
}
