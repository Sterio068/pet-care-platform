import type { PetType } from "@/types";

interface PetTypeToggleProps {
  value: PetType;
  onChange: (value: PetType) => void;
}

export function PetTypeToggle({ value, onChange }: PetTypeToggleProps) {
  return (
    <div className="inline-flex rounded-[14px] bg-cream-200 p-1">
      <button
        type="button"
        onClick={() => onChange("dog")}
        className={`flex items-center gap-2 px-5 py-2 rounded-[10px] text-sm font-semibold transition-all ${
          value === "dog"
            ? "bg-white text-brand-600 shadow-sm"
            : "text-ink-500 hover:text-ink-700"
        }`}
      >
        <span aria-hidden="true">🐶</span>
        <span>狗狗</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("cat")}
        className={`flex items-center gap-2 px-5 py-2 rounded-[10px] text-sm font-semibold transition-all ${
          value === "cat"
            ? "bg-white text-brand-600 shadow-sm"
            : "text-ink-500 hover:text-ink-700"
        }`}
      >
        <span aria-hidden="true">🐱</span>
        <span>貓咪</span>
      </button>
    </div>
  );
}
