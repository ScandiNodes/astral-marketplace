"use client";

interface PriceTagProps {
  amount: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-xs",
  md: "text-small",
  lg: "text-body",
};

const currencyIcons: Record<string, string> = {
  SOLID: "◆",
  USDC: "●",
  LUNA: "◎",
  CAPA: "⬡",
};

export function PriceTag({
  amount,
  currency = "SOLID",
  size = "md",
  className = "",
}: PriceTagProps) {
  const icon = currencyIcons[currency] || "◆";

  const formatted = amount >= 1000
    ? `${(amount / 1000).toFixed(amount >= 10000 ? 0 : 1)}K`
    : amount >= 1
      ? amount.toFixed(2)
      : amount.toFixed(4);

  return (
    <span
      className={`
        inline-flex items-center gap-1
        mono text-accent-cyan font-medium
        ${sizes[size]}
        ${className}
      `}
    >
      <span className="text-accent-indigo">{icon}</span>
      {formatted}
      <span className="text-[var(--text-muted)] font-normal">{currency}</span>
    </span>
  );
}
