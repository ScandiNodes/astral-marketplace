"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  ExternalLink,
  ShoppingCart,
  Tag,
  Clock,
  ArrowRightLeft,
} from "lucide-react";
import { Button, Badge, GlassCard, Modal } from "@/components/ui";
import { Container } from "@/components/layout";
import {
  PriceTag,
  WalletAddress,
  Carousel,
  CarouselItem,
  NFTCard,
  NFTCardData,
} from "@/components/nft";

// Mock data — ersätts med on-chain query
const mockNFT = {
  contractAddr:
    "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
  tokenId: "1",
  name: "Cosmic Crystal #1",
  image:
    "https://images.unsplash.com/photo-1635492491273-455af7728453?w=800&h=800&fit=crop",
  collectionName: "CAPA Crystals",
  description:
    "The rarest crystal tier. Only 2% chance to mint a Cosmic Crystal. Grants access to all exclusive features in Solid Protocol.",
  owner: "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna",
  price: 250,
  currency: "SOLID",
  royalty: 5,
  traits: [
    { trait_type: "Tier", value: "Cosmic", rarity: "2%" },
    { trait_type: "Origin", value: "Genesis Mint", rarity: "50%" },
    { trait_type: "Aura", value: "Golden Crown", rarity: "2%" },
    { trait_type: "Element", value: "Void", rarity: "8%" },
  ],
  history: [
    {
      type: "listing" as const,
      price: 250,
      from: "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna",
      time: "2h ago",
    },
    {
      type: "transfer" as const,
      from: "terra18hhej6usenw44squvdr8fxxp0c83nlffva5mcl",
      to: "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna",
      time: "1d ago",
    },
    {
      type: "mint" as const,
      from: "terra18hhej6usenw44squvdr8fxxp0c83nlffva5mcl",
      time: "3d ago",
    },
  ],
};

const moreFromCollection: NFTCardData[] = Array.from({ length: 6 }, (_, i) => ({
  contractAddr: mockNFT.contractAddr,
  tokenId: String(i + 10),
  name: `Crystal #${i + 10}`,
  image: `https://images.unsplash.com/photo-${
    [
      "1618005182384-a83a8bd57fbe",
      "1614850523296-d8c1af93d400",
      "1620641788421-7a1c342ea42e",
      "1558618666-fcd25c85f82e",
      "1633177317976-3f9bc45e1d1d",
      "1534796636912-3b95b3ab5986",
    ][i]
  }?w=400&h=400&fit=crop`,
  collectionName: "CAPA Crystals",
  price: Math.round((Math.random() * 200 + 10) * 100) / 100,
  currency: "SOLID",
}));

export default function NFTDetailPage() {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const historyIcons = {
    listing: Tag,
    transfer: ArrowRightLeft,
    mint: ShoppingCart,
    sale: ShoppingCart,
  };

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ═══ LEFT: Image ═══ */}
        <div className="lg:col-span-3">
          <div className="glass rounded-xl overflow-hidden">
            <div className="aspect-nft relative bg-astral-nebula">
              <Image
                src={mockNFT.image}
                alt={mockNFT.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>

          {/* Properties */}
          <div className="mt-6">
            <h3 className="text-h3 font-semibold mb-3">Properties</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {mockNFT.traits.map((trait) => (
                <GlassCard
                  key={trait.trait_type}
                  hover={false}
                  padding="sm"
                  className="text-center"
                >
                  <div className="text-xs text-accent-indigo uppercase tracking-wider mb-0.5">
                    {trait.trait_type}
                  </div>
                  <div className="text-body font-medium">{trait.value}</div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {trait.rarity}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="mt-6">
            <h3 className="text-h3 font-semibold mb-3">History</h3>
            <GlassCard hover={false} padding="none">
              <div className="divide-y divide-[var(--glass-border)]">
                {mockNFT.history.map((event, i) => {
                  const Icon =
                    historyIcons[event.type as keyof typeof historyIcons] || Clock;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <Icon size={16} className="text-[var(--text-muted)] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-small font-medium capitalize">
                          {event.type === "listing"
                            ? "Listed"
                            : event.type === "transfer"
                              ? "Transferred"
                              : event.type === "mint"
                                ? "Minted"
                                : "Sold"}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] ml-2">
                          by{" "}
                          <WalletAddress
                            address={event.from}
                            copyable={false}
                          />
                        </span>
                      </div>
                      {"price" in event && event.price && (
                        <PriceTag amount={event.price} size="sm" />
                      )}
                      <span className="text-xs text-[var(--text-muted)] shrink-0">
                        {event.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ═══ RIGHT: Details panel ═══ */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            {/* Collection link */}
            <Link
              href={`/collection/${mockNFT.contractAddr}`}
              className="text-small text-accent-cyan hover:text-[var(--text-primary)] transition-colors duration-fast"
            >
              {mockNFT.collectionName}
            </Link>

            {/* Name */}
            <h1 className="text-h1 font-bold mt-1 mb-2">{mockNFT.name}</h1>

            {/* Owner */}
            <div className="flex items-center gap-2 text-small text-[var(--text-secondary)] mb-6">
              <span>Owner:</span>
              <WalletAddress address={mockNFT.owner} />
            </div>

            {/* Price card */}
            <GlassCard hover={false} padding="lg" className="mb-4">
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                Price
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <PriceTag
                  amount={mockNFT.price}
                  currency={mockNFT.currency}
                  size="lg"
                  className="text-h2 font-bold"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() => setBuyModalOpen(true)}
                >
                  <ShoppingCart size={16} />
                  Buy now
                </Button>
                <Button variant="secondary" size="lg">
                  Make offer
                </Button>
              </div>
            </GlassCard>

            {/* Actions */}
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
              >
                <Heart
                  size={14}
                  fill={liked ? "currentColor" : "none"}
                  className={liked ? "text-accent-rose" : ""}
                />
                {liked ? "Liked" : "Like"}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 size={14} />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink size={14} />
                On-chain
              </Button>
            </div>

            {/* Description */}
            <GlassCard hover={false}>
              <h3 className="text-h4 font-semibold mb-2">Description</h3>
              <p className="text-small text-[var(--text-secondary)]">
                {mockNFT.description}
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--glass-border)] space-y-1.5">
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Contract</span>
                  <WalletAddress address={mockNFT.contractAddr} />
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Token ID</span>
                  <span className="mono">{mockNFT.tokenId}</span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Royalty</span>
                  <span>{mockNFT.royalty}%</span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Standard</span>
                  <span>CW-721</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* More from collection */}
      <div className="mt-12">
        <Carousel title="More from this collection">
          {moreFromCollection.map((nft) => (
            <CarouselItem
              key={`${nft.contractAddr}-${nft.tokenId}`}
              width="220px"
            >
              <NFTCard nft={nft} />
            </CarouselItem>
          ))}
        </Carousel>
      </div>

      {/* Buy modal */}
      <Modal
        open={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        title="Confirm purchase"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-astral-nebula">
              <Image
                src={mockNFT.image}
                alt={mockNFT.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-small text-[var(--text-muted)]">
                {mockNFT.collectionName}
              </div>
              <div className="font-semibold">{mockNFT.name}</div>
            </div>
          </div>

          <div className="glass rounded-md p-3 space-y-2">
            <div className="flex justify-between text-small">
              <span className="text-[var(--text-secondary)]">Price</span>
              <PriceTag amount={mockNFT.price} />
            </div>
            <div className="flex justify-between text-small">
              <span className="text-[var(--text-secondary)]">
                Marketplace fee (1.5%)
              </span>
              <PriceTag amount={mockNFT.price * 0.015} />
            </div>
            <div className="flex justify-between text-small">
              <span className="text-[var(--text-secondary)]">
                Royalty ({mockNFT.royalty}%)
              </span>
              <PriceTag amount={mockNFT.price * (mockNFT.royalty / 100)} />
            </div>
            <div className="border-t border-[var(--glass-border)] pt-2 flex justify-between text-body font-semibold">
              <span>Total</span>
              <PriceTag
                amount={
                  mockNFT.price * (1 + 0.015 + mockNFT.royalty / 100)
                }
                size="lg"
              />
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={() => setBuyModalOpen(false)}>
            <ShoppingCart size={16} />
            Confirm purchase
          </Button>
        </div>
      </Modal>
    </Container>
  );
}
