"use client";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className = "", narrow = false }: ContainerProps) {
  return (
    <div
      className={`
        mx-auto px-4 sm:px-6 lg:px-8
        ${narrow ? "max-w-[960px]" : "max-w-[1400px]"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
