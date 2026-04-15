"use client";

import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "./PriceTag";

export interface CollectionCardData {
  contractAddr: string;
  name: string;
  banner: string;
  avatar: string;
  items: number;
  floorPrice?: number;
  volume?: number;
  verified?: boolean;
}

interface CollectionCardProps {
  collection: CollectionCardData;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collection/${collection.contractAddr}`}
      className="group block bg-astral-nebula border border-[var(--glass-border)] rounded-lg overflow-hidden hover-lift hover:border-[var(--glass-hover)]"
    >
      {/* Banner */}
      <div className="relative h-28 bg-astral-nebula overflow-hidden">
        <Image
          src={collection.banner}
          alt={collection.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-slow ease-spring group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-astral-nebula/80 to-transparent" />
      </div>

      {/* Info */}
      <div className="relative px-4 pb-4 -mt-5">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full border-2 border-astral-nebula overflow-hidden mb-2 bg-astral-cosmos">
          <Image
            src={collection.avatar}
            alt=""
            width={40}
            height={40}
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-1.5 mb-1">
          <h4 className="text-body font-semibold text-[var(--text-primary)] truncate-1">
            {collection.name}
          </h4>
          {collection.verified && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent-indigo shrink-0"
            >
              <path
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <span>{collection.items.toLocaleString()} items</span>
          {collection.floorPrice !== undefined && (
            <>
              <span className="text-[var(--text-muted)]">·</span>
              <span>
                Floor: <PriceTag amount={collection.floorPrice} size="sm" />
              </span>
            </>
          )}
          {collection.volume !== undefined && (
            <>
              <span className="text-[var(--text-muted)]">·</span>
              <span>
                Vol: <PriceTag amount={collection.volume} size="sm" />
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
