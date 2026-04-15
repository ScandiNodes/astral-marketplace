"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface WalletAddressProps {
  address: string;
  truncate?: boolean;
  copyable?: boolean;
  className?: string;
}

export function WalletAddress({
  address,
  truncate = true,
  copyable = true,
  className = "",
}: WalletAddressProps) {
  const [copied, setCopied] = useState(false);

  const display = truncate
    ? `${address.slice(0, 10)}...${address.slice(-4)}`
    : address;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 mono text-[var(--text-secondary)] ${className}`}
    >
      <span>{display}</span>
      {copyable && (
        <button
          onClick={handleCopy}
          className="p-0.5 rounded hover:text-[var(--text-primary)] transition-colors duration-fast"
          title="Copy address"
        >
          {copied ? (
            <Check size={12} className="text-semantic-success" />
          ) : (
            <Copy size={12} />
          )}
        </button>
      )}
    </span>
  );
}
