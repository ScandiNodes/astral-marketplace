"use client";

import { NFTCard, NFTCardData } from "./NFTCard";
import { NFTCardSkeleton } from "@/components/ui";

interface NFTGridProps {
  nfts: NFTCardData[];
  loading?: boolean;
  skeletonCount?: number;
  onLike?: (contractAddr: string, tokenId: string) => void;
}

export function NFTGrid({
  nfts,
  loading = false,
  skeletonCount = 8,
  onLike,
}: NFTGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <NFTCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-4xl mb-4 opacity-30">✦</div>
        <h3 className="text-h3 font-semibold text-[var(--text-secondary)] mb-2">
          No NFTs found
        </h3>
        <p className="text-body text-[var(--text-muted)]">
          Try adjusting your filters or search for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 stagger-children">
      {nfts.map((nft) => (
        <NFTCard
          key={`${nft.contractAddr}-${nft.tokenId}`}
          nft={nft}
          onLike={onLike ? () => onLike(nft.contractAddr, nft.tokenId) : undefined}
        />
      ))}
    </div>
  );
}
