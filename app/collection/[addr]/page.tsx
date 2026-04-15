"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, ExternalLink, Share2 } from "lucide-react";
import { Button, Badge, GlassCard } from "@/components/ui";
import { Container } from "@/components/layout";
import { NFTGrid, NFTCardData, PriceTag, WalletAddress, ActivityFeed, ActivityItem } from "@/components/nft";

type Tab = "items" | "activity" | "about";

// Mock data — replace with API calls based on params.addr
const mockCollection = {
  name: "CAPA Crystals",
  description:
    "1,000 unique crystals with 5 rarity tiers. Gacha mint, fusion, altar, and SOLID rewards. The first NFT collection in the Solid Protocol ecosystem.",
  banner:
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&h=400&fit=crop",
  avatar:
    "https://images.unsplash.com/photo-1635492491273-455af7728453?w=200&h=200&fit=crop",
  contractAddr:
    "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
  creator: "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna",
  items: 1000,
  owners: 312,
  floorPrice: 15,
  volume: 12450,
  listed: 87,
  verified: true,
};

const mockItems: NFTCardData[] = Array.from({ length: 12 }, (_, i) => ({
  contractAddr: mockCollection.contractAddr,
  tokenId: String(i + 1),
  name: `Crystal #${i + 1}`,
  image: `https://images.unsplash.com/photo-${
    [
      "1635492491273-455af7728453",
      "1618005182384-a83a8bd57fbe",
      "1614850523296-d8c1af93d400",
      "1620641788421-7a1c342ea42e",
      "1558618666-fcd25c85f82e",
      "1633177317976-3f9bc45e1d1d",
    ][i % 6]
  }?w=400&h=400&fit=crop`,
  collectionName: mockCollection.name,
  price: Math.round((Math.random() * 200 + 10) * 100) / 100,
  currency: "SOLID",
}));

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "sale",
    nftName: "Crystal #1",
    nftImage: "https://images.unsplash.com/photo-1635492491273-455af7728453?w=80&h=80&fit=crop",
    collectionName: "CAPA Crystals",
    price: 250,
    from: "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna",
    to: "terra18hhej6usenw44squvdr8fxxp0c83nlffva5mcl",
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: "2",
    type: "listing",
    nftName: "Crystal #7",
    nftImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop",
    collectionName: "CAPA Crystals",
    price: 120,
    from: "terra1abc123def456ghi789jkl012mno345pqr678stu",
    timestamp: new Date(Date.now() - 600000).toISOString(),
  },
];

export default function CollectionPage() {
  const [tab, setTab] = useState<Tab>("items");

  const tabs: { id: Tab; label: string }[] = [
    { id: "items", label: `Items (${mockCollection.items})` },
    { id: "activity", label: "Activity" },
    { id: "about", label: "About" },
  ];

  return (
    <>
      {/* Banner */}
      <div className="relative h-48 sm:h-64 bg-astral-nebula overflow-hidden">
        <Image
          src={mockCollection.banner}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-astral-void via-astral-void/30 to-transparent" />
      </div>

      <Container>
        {/* Avatar + Info */}
        <div className="relative -mt-12 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-xl border-4 border-astral-void overflow-hidden bg-astral-cosmos shadow-lg">
              <Image
                src={mockCollection.avatar}
                alt={mockCollection.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>

            {/* Name + creator */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-h1 font-bold">{mockCollection.name}</h1>
                {mockCollection.verified && (
                  <Badge variant="indigo">Verified</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-small text-[var(--text-secondary)]">
                <span>By</span>
                <WalletAddress address={mockCollection.creator} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="icon">
                <Share2 size={18} />
              </Button>
              <Button variant="icon">
                <ExternalLink size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Items", value: mockCollection.items.toLocaleString() },
            { label: "Owners", value: mockCollection.owners.toLocaleString() },
            {
              label: "Floor",
              value: mockCollection.floorPrice,
              isSolid: true,
            },
            { label: "Volume", value: mockCollection.volume, isSolid: true },
            {
              label: "Listed",
              value: `${mockCollection.listed} (${Math.round(
                (mockCollection.listed / mockCollection.items) * 100
              )}%)`,
            },
          ].map((stat) => (
            <GlassCard key={stat.label} hover={false} padding="sm">
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                {stat.label}
              </div>
              {stat.isSolid ? (
                <PriceTag amount={stat.value as number} size="lg" />
              ) : (
                <div className="text-h4 font-semibold">{stat.value}</div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-[var(--glass-border)] mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`
                px-4 py-3 text-body font-medium
                border-b-2 transition-all duration-fast
                ${
                  tab === t.id
                    ? "text-[var(--text-primary)] border-accent-indigo"
                    : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "items" && (
          <div className="mb-12">
            <NFTGrid nfts={mockItems} />
          </div>
        )}

        {tab === "activity" && (
          <GlassCard hover={false} className="mb-12">
            <ActivityFeed items={mockActivity} />
          </GlassCard>
        )}

        {tab === "about" && (
          <div className="max-w-2xl mb-12">
            <GlassCard hover={false} padding="lg">
              <h3 className="text-h3 font-semibold mb-3">Description</h3>
              <p className="text-body text-[var(--text-secondary)] mb-6">
                {mockCollection.description}
              </p>
              <h4 className="text-h4 font-semibold mb-2">Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Contract</span>
                  <WalletAddress address={mockCollection.contractAddr} />
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Standard</span>
                  <span>CW-721</span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Chain</span>
                  <span>Terra (phoenix-1)</span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-[var(--text-muted)]">Royalty</span>
                  <span>5%</span>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </Container>
    </>
  );
}
