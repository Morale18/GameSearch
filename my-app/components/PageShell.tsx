type PageShellProps = {
  children: React.ReactNode;
  // Tailwind gap class between sections
  gap?: string;
};

// Shared page width and padding for every screen
export default function PageShell({ children, gap = "gap-3.5" }: PageShellProps) {
  return <main className={`mx-auto flex w-full max-w-xl flex-col px-4 pb-6 pt-[18px] ${gap}`}>{children}</main>;
}
