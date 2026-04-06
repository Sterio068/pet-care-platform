interface RatingBarProps {
  label: string;
  value: number;
  max?: number;
}

export function RatingBar({ label, value, max = 5 }: RatingBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ink-700 w-20 shrink-0">{label}</span>
      <div className="flex gap-1 flex-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${i < value ? "bg-brand-500" : "bg-cream-300"}`}
          />
        ))}
      </div>
      <span className="text-xs text-ink-500 w-8 text-right">{value}/{max}</span>
    </div>
  );
}
