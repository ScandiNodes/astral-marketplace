"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui";

interface NavbarProps {
  walletAddress?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function Navbar({ walletAddress, onConnect, onDisconnect }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 8)}...${addr.slice(-4)}`;

  const navLinks = [
    { href: "/explore", label: "Explore" },
    { href: "/launch", label: "Launchpad" },
    { href: "/create", label: "Create" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(7,7,13,0.8)] backdrop-blur-[20px] border-b border-[var(--glass-border)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl text-gradient-hero">✦</span>
            <span className="text-h4 font-bold text-[var(--text-primary)]">
              Astral
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-body text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md transition-colors duration-fast"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <Button
              variant="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={18} />
            </Button>

            {/* Wallet */}
            {walletAddress ? (
              <button
                onClick={onDisconnect}
                className="glass rounded-full px-3 py-1.5 text-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-hover)] transition-all duration-fast flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-semantic-success" />
                <span className="mono">{truncateAddress(walletAddress)}</span>
              </button>
            ) : (
              <Button size="sm" pill onClick={onConnect}>
                <Wallet size={14} />
                Connect
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Search bar (expandable) */}
      {searchOpen && (
        <div className="border-t border-[var(--glass-border)] bg-[rgba(7,7,13,0.95)] animate-slide-down">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                autoFocus
                type="text"
                placeholder="Search collections, NFTs, addresses..."
                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg pl-10 pr-4 py-2.5 text-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-accent-indigo focus:outline-none transition-all duration-fast"
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--glass-border)] bg-[rgba(7,7,13,0.95)] animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-body text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md transition-colors duration-fast"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
