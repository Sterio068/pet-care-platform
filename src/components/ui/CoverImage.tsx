import type { PetType, ArticleCategory } from "@/types";

interface ArticleCoverProps {
  title: string;
  category: ArticleCategory;
  variant?: "card" | "hero";
}

const CATEGORY_VISUAL: Record<
  ArticleCategory,
  { emoji: string; gradient: string; pattern: string }
> = {
  health: {
    emoji: "🩺",
    gradient: "from-red-100 via-pink-100 to-orange-100",
    pattern: "bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.15),transparent_40%)]",
  },
  food: {
    emoji: "🥣",
    gradient: "from-orange-100 via-amber-100 to-yellow-100",
    pattern: "bg-[radial-gradient(circle_at_80%_30%,rgba(234,88,12,0.15),transparent_40%)]",
  },
  behavior: {
    emoji: "🐾",
    gradient: "from-purple-100 via-violet-100 to-indigo-100",
    pattern: "bg-[radial-gradient(circle_at_50%_80%,rgba(139,92,246,0.15),transparent_40%)]",
  },
  grooming: {
    emoji: "✂️",
    gradient: "from-blue-100 via-sky-100 to-cyan-100",
    pattern: "bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.15),transparent_40%)]",
  },
  beginner: {
    emoji: "🌱",
    gradient: "from-green-100 via-emerald-100 to-teal-100",
    pattern: "bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_40%)]",
  },
};

export function ArticleCover({ category, variant = "card" }: ArticleCoverProps) {
  const v = CATEGORY_VISUAL[category];
  const height = variant === "hero" ? "h-60 md:h-72" : "h-36";
  const emojiSize = variant === "hero" ? "text-7xl" : "text-5xl";
  return (
    <div
      className={`relative overflow-hidden rounded-t-[20px] ${height} bg-gradient-to-br ${v.gradient} ${v.pattern} flex items-center justify-center`}
      aria-hidden="true"
    >
      <span className={`${emojiSize} drop-shadow-sm`}>{v.emoji}</span>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(255,255,255,0.3))]" />
    </div>
  );
}

interface BreedCoverProps {
  petType: PetType;
  name: string;
  variant?: "card" | "hero";
}

export function BreedCover({ petType, name, variant = "card" }: BreedCoverProps) {
  const emoji = petType === "dog" ? "🐶" : "🐱";
  const gradient =
    petType === "dog"
      ? "from-brand-100 via-orange-100 to-cream-100"
      : "from-accent-100 via-blue-100 to-cream-100";
  const height = variant === "hero" ? "h-48 md:h-56" : "h-32";
  const emojiSize = variant === "hero" ? "text-8xl" : "text-5xl";

  // 名稱首字母 / 首字作為裝飾
  const initial = name.charAt(0);

  return (
    <div
      className={`relative overflow-hidden rounded-t-[20px] ${height} bg-gradient-to-br ${gradient} flex items-center justify-center`}
      aria-hidden="true"
    >
      <span
        className="absolute top-2 right-3 text-[3rem] md:text-[4rem] font-black text-ink-900/5 select-none leading-none"
      >
        {initial}
      </span>
      <span className={`${emojiSize} drop-shadow-sm relative z-10`}>{emoji}</span>
    </div>
  );
}

interface ToolCoverProps {
  icon: string;
  color: string;
}

export function ToolCover({ icon, color }: ToolCoverProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-t-[20px] h-32 bg-gradient-to-br ${color} flex items-center justify-center`}
      aria-hidden="true"
    >
      <span className="text-5xl drop-shadow-sm">{icon}</span>
    </div>
  );
}
