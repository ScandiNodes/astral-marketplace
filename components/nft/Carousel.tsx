"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showArrows?: boolean;
}

export function Carousel({
  title,
  subtitle,
  children,
  showArrows = true,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-h2 font-bold">{title}</h2>
          {subtitle && (
            <p className="text-small text-[var(--text-secondary)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {showArrows && (
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-1.5 rounded-full glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-hover)] transition-all duration-fast disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-1.5 rounded-full glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-hover)] transition-all duration-fast disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Scroll container — Spotify-style horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Wrapper for carousel items — ensures consistent sizing and snap
 */
export function CarouselItem({
  children,
  width = "240px",
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <div
      className="shrink-0"
      style={{ width, scrollSnapAlign: "start" }}
    >
      {children}
    </div>
  );
}
