import type { ReactNode } from "react";

interface ResultCardProps {
  title: string;
  children: ReactNode;
  accentColor?: "brand" | "accent" | "warning";
}

export function ResultCard({
  title,
  children,
  accentColor = "brand",
}: ResultCardProps) {
  const accents = {
    brand: "border-brand-200 bg-gradient-to-br from-brand-50 to-cream-50",
    accent: "border-accent-200 bg-gradient-to-br from-accent-50 to-cream-50",
    warning: "border-yellow-200 bg-gradient-to-br from-yellow-50 to-cream-50",
  };
  return (
    <div
      className={`border-2 rounded-[20px] p-6 ${accents[accentColor]}`}
    >
      <h3 className="text-sm font-bold text-ink-700 uppercase tracking-wide mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}
