import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export function Card({ children, className = "", padding = "md" }: CardProps) {
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  return (
    <div
      className={`rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)] shadow-[0_2px_12px_rgba(42,31,26,0.06)] ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
