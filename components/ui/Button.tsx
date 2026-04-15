"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-indigo text-white hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-glow",
  secondary:
    "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-hover)]",
  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]",
  danger:
    "bg-semantic-error/10 text-semantic-error hover:bg-semantic-error/20 border border-semantic-error/20",
  icon: "bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] !p-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-small gap-1.5",
  md: "px-4 py-2 text-body gap-2",
  lg: "px-6 py-3 text-body gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      pill = false,
      loading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-fast ease-spring
          disabled:opacity-40 disabled:pointer-events-none
          ${variants[variant]}
          ${sizes[size]}
          ${pill ? "rounded-full" : "rounded-md"}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
