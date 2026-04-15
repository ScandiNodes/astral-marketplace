"use client";

import Image from "next/image";
import { WalletAddress } from "./WalletAddress";
import { PriceTag } from "./PriceTag";
import { ShoppingCart, Tag, Gavel, ArrowRightLeft } from "lucide-react";

type ActivityType = "sale" | "listing" | "offer" | "transfer";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  nftName: string;
  nftImage: string;
  collectionName: string;
  price?: number;
  from: string;
  to?: string;
  timestamp: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  compact?: boolean;
}

const typeConfig: Record<
  ActivityType,
  { icon: typeof ShoppingCart; label: string; color: string }
> = {
  sale: { icon: ShoppingCart, label: "Sale", color: "text-semantic-success" },
  listing: { icon: Tag, label: "Listed", color: "text-accent-cyan" },
  offer: { icon: Gavel, label: "Offer", color: "text-accent-violet" },
  transfer: { icon: ArrowRightLeft, label: "Transfer", color: "text-[var(--text-secondary)]" },
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ActivityFeed({ items, compact = false }: ActivityFeedProps) {
  return (
    <div className="divide-y divide-[var(--glass-border)]">
      {items.map((item) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;

        return (
          <div
            key={item.id}
            className="flex items-center gap-3 py-3 px-1 hover:bg-[var(--glass-bg)] rounded-md transition-colors duration-fast"
          >
            {/* NFT thumbnail */}
            {!compact && (
              <div className="w-10 h-10 rounded-md overflow-hidden bg-astral-nebula shrink-0">
                <Image
                  src={item.nftImage}
                  alt={item.nftName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            )}

            {/* Type icon */}
            <div className={`shrink-0 ${config.color}`}>
              <Icon size={16} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-medium ${config.color}`}>
                  {config.label}
                </span>
                <span className="text-small font-medium text-[var(--text-primary)] truncate-1">
                  {item.nftName}
                </span>
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                <WalletAddress address={item.from} copyable={false} />
                {item.to && (
                  <>
                    <span className="mx-1">→</span>
                    <WalletAddress address={item.to} copyable={false} />
                  </>
                )}
              </div>
            </div>

            {/* Price + time */}
            <div className="text-right shrink-0">
              {item.price !== undefined && (
                <PriceTag amount={item.price} size="sm" />
              )}
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                {timeAgo(item.timestamp)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
