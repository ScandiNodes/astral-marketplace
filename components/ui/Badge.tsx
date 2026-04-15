"use client";

type BadgeVariant = "default" | "indigo" | "cyan" | "violet" | "rose" | "amber" | "success" | "error";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[var(--glass-bg)] text-[var(--text-secondary)] border-[var(--glass-border)]",
  indigo: "bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20",
  cyan: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  violet: "bg-accent-violet/10 text-accent-violet border-accent-violet/20",
  rose: "bg-accent-rose/10 text-accent-rose border-accent-rose/20",
  amber: "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
  success: "bg-semantic-success/10 text-semantic-success border-semantic-success/20",
  error: "bg-semantic-error/10 text-semantic-error border-semantic-error/20",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5
        text-xs font-medium uppercase tracking-wider
        border rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
