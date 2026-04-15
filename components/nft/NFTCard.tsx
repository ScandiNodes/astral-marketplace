"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PriceTag } from "./PriceTag";

export interface NFTCardData {
  contractAddr: string;
  tokenId: string;
  name: string;
  image: string;
  collectionName: string;
  price?: number;
  currency?: string;
  liked?: boolean;
}

interface NFTCardProps {
  nft: NFTCardData;
  onLike?: () => void;
}

export function NFTCard({ nft, onLike }: NFTCardProps) {
  return (
    <Link
      href={`/nft/${nft.contractAddr}/${nft.tokenId}`}
      className="group block bg-astral-nebula border border-[var(--glass-border)] rounded-lg overflow-hidden hover-lift hover:border-[var(--glass-hover)]"
    >
      {/* Image */}
      <div className="aspect-nft relative bg-astral-nebula">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-slow ease-spring group-hover:scale-105"
        />

        {/* Like button overlay */}
        {onLike && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLike();
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-[var(--text-secondary)] hover:text-accent-rose transition-colors duration-fast opacity-0 group-hover:opacity-100"
          >
            <Heart
              size={14}
              fill={nft.liked ? "currentColor" : "none"}
              className={nft.liked ? "text-accent-rose" : ""}
            />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-[var(--text-muted)] truncate-1 mb-0.5">
          {nft.collectionName}
        </p>
        <h4 className="text-body font-medium text-[var(--text-primary)] truncate-1 mb-1.5">
          {nft.name}
        </h4>
        {nft.price !== undefined && (
          <PriceTag amount={nft.price} currency={nft.currency} />
        )}
      </div>
    </Link>
  );
}
