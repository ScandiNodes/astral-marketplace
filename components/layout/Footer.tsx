"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl text-gradient-hero">✦</span>
              <span className="text-h4 font-bold">Astral</span>
            </div>
            <p className="text-small text-[var(--text-secondary)] max-w-[240px]">
              The Cosmic Marketplace. Trade NFTs on Terra with the lowest
              fees in Cosmos.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-small font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/explore", label: "Explore" },
                { href: "/launch", label: "Launchpad" },
                { href: "/create", label: "Create Collection" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-fast"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-small font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              {[
                { href: "https://app.solidcapa.com", label: "Solid Protocol" },
                { href: "https://solidcapa.com", label: "CAPA Token" },
                { href: "https://validator.solidcapa.com", label: "Validator" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-fast"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-small font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">
              Community
            </h4>
            <ul className="space-y-2">
              {[
                { href: "https://x.com/solid_capa", label: "X (Twitter)" },
                { href: "https://t.me/solidcapa", label: "Telegram" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-fast"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — Solid Protocol branding touch */}
        <div className="mt-12 pt-6 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-small text-[var(--text-muted)]">
            Astral &mdash; Built on Terra. Fees: 1.5%.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)]">Powered by</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-indigo/10 border border-accent-indigo/20">
              <span className="text-xs font-semibold text-accent-indigo">◆ SOLID</span>
              <span className="text-xs text-[var(--text-muted)]">&</span>
              <span className="text-xs font-semibold text-accent-violet">⬡ CAPA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
