import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  suffix?: string;
}

export function Input({
  label,
  hint,
  suffix,
  className = "",
  id,
  ...rest
}: InputProps) {
  const inputId = id || label?.replace(/\s/g, "-").toLowerCase();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-ink-900 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`w-full rounded-[12px] border border-cream-300 bg-cream-50 px-4 py-2.5 text-base text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all ${suffix ? "pr-14" : ""} ${className}`}
          {...rest}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-500 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}
