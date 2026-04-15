"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  search?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, search = false, className = "", ...props }, ref) => {
    const iconElement = search ? <Search size={16} /> : icon;

    return (
      <div className="relative">
        {iconElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
            {iconElement}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-[var(--glass-bg)] border border-[var(--glass-border)]
            rounded-md px-4 py-2.5 text-body text-[var(--text-primary)]
            placeholder:text-[var(--text-muted)]
            transition-all duration-fast ease-smooth
            hover:border-[var(--glass-hover)]
            focus:border-accent-indigo focus:shadow-glow focus:outline-none
            ${iconElement ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
