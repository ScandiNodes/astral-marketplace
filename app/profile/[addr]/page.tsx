"use client";

import { useState } from "react";
import { Copy, ExternalLink, Settings } from "lucide-react";
import { Button, Badge, GlassCard } from "@/components/ui";
import { Container } from "@/components/layout";
import { NFTGrid, NFTCardData, WalletAddress, PriceTag, ActivityFeed, ActivityItem } from "@/components/nft";

type Tab = "collected" | "listed" | "activity" | "liked";

// Mock data
const mockProfile = {
  address: "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna",
  collected: 23,
  listed: 5,
  volume: 1250,
};

const mockNFTs: NFTCardData[] = Array.from({ length: 8 }, (_, i) => ({
  contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
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
      "1534796636912-3b95b3ab5986",
      "1614854262318-831574f15f1f",
    ][i]
  }?w=400&h=400&fit=crop`,
  collectionName: "CAPA Crystals",
  price: i < 5 ? Math.round((Math.random() * 200 + 10) * 100) / 100 : undefined,
  currency: "SOLID",
}));

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("collected");

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "collected", label: "Collected", count: mockProfile.collected },
    { id: "listed", label: "Listed", count: mockProfile.listed },
    { id: "activity", label: "Activity" },
    { id: "liked", label: "Liked" },
  ];

  return (
    <Container className="py-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {/* Avatar (generated from address) */}
        <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-h2 font-bold">
          ✦
        </div>

        <div className="flex-1">
          <WalletAddress
            address={mockProfile.address}
            truncate={false}
            className="text-h3 font-bold text-[var(--text-primary)]"
          />
        </div>

        <Button variant="secondary" size="sm">
          <Settings size={14} />
          Edit profile
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <GlassCard hover={false} padding="sm" className="text-center">
          <div className="text-h3 font-bold">{mockProfile.collected}</div>
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            Collected
          </div>
        </GlassCard>
        <GlassCard hover={false} padding="sm" className="text-center">
          <div className="text-h3 font-bold">{mockProfile.listed}</div>
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            Listed
          </div>
        </GlassCard>
        <GlassCard hover={false} padding="sm" className="text-center">
          <PriceTag amount={mockProfile.volume} size="lg" className="justify-center text-h3 font-bold" />
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            Volume
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--glass-border)] mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`
              flex items-center gap-1.5 px-4 py-3 text-body font-medium
              border-b-2 transition-all duration-fast
              ${
                tab === t.id
                  ? "text-[var(--text-primary)] border-accent-indigo"
                  : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
              }
            `}
          >
            {t.label}
            {t.count !== undefined && (
              <span className="text-xs text-[var(--text-muted)] bg-[var(--glass-bg)] rounded-full px-1.5 py-0.5">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {(tab === "collected" || tab === "listed" || tab === "liked") && (
        <NFTGrid nfts={tab === "listed" ? mockNFTs.slice(0, 5) : mockNFTs} />
      )}

      {tab === "activity" && (
        <GlassCard hover={false}>
          <div className="py-8 text-center text-[var(--text-muted)]">
            Ingen aktivitet ännu.
          </div>
        </GlassCard>
      )}
    </Container>
  );
}
