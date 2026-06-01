import Link from "next/link";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  align = "left",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${
        isCentered ? "text-center md:block" : ""
      }`}
    >
      <div className={isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold text-brand-600">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-extrabold leading-tight text-ink-900 md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-ink-500 md:text-base">
            {description}
          </p>
        )}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex w-fit items-center gap-1 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
        >
          {actionLabel}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
