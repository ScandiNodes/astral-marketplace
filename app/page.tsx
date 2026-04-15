"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, Globe } from "lucide-react";
import { Button, GlassCard, Badge } from "@/components/ui";
import { Container } from "@/components/layout";
import {
  NFTCard,
  NFTCardData,
  CollectionCard,
  CollectionCardData,
  Carousel,
  CarouselItem,
  ActivityFeed,
  ActivityItem,
} from "@/components/nft";

// Mock data — replace with API calls
const mockTrending: NFTCardData[] = [
  {
    contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
    tokenId: "1",
    name: "Cosmic Crystal #1",
    image: "https://images.unsplash.com/photo-1635492491273-455af7728453?w=400&h=400&fit=crop",
    collectionName: "CAPA Crystals",
    price: 250,
    currency: "SOLID",
    liked: false,
  },
  {
    contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
    tokenId: "2",
    name: "Prismatic Crystal #7",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    collectionName: "CAPA Crystals",
    price: 120,
    currency: "SOLID",
  },
  {
    contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
    tokenId: "3",
    name: "Radiant Crystal #42",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop",
    collectionName: "CAPA Crystals",
    price: 55,
    currency: "SOLID",
  },
  {
    contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
    tokenId: "4",
    name: "Charged Crystal #103",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
    collectionName: "CAPA Crystals",
    price: 30,
    currency: "SOLID",
  },
  {
    contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
    tokenId: "5",
    name: "Raw Crystal #512",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    collectionName: "CAPA Crystals",
    price: 15,
    currency: "SOLID",
  },
  {
    contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
    tokenId: "6",
    name: "Cosmic Crystal #3",
    image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400&h=400&fit=crop",
    collectionName: "CAPA Crystals",
    price: 300,
    currency: "SOLID",
  },
];

const mockCollections: CollectionCardData[] = [
  {
    contractAddr: "terra1htnzmetd2xlkgrqqdf3whu8wzwhtjlx7ahrk6qsxxneaktl63r9sx5v2uk",
    name: "CAPA Crystals",
    banner: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1635492491273-455af7728453?w=100&h=100&fit=crop",
    items: 1000,
    floorPrice: 15,
    volume: 12450,
    verified: true,
  },
  {
    contractAddr: "terra1example2",
    name: "Terra Punks",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=100&h=100&fit=crop",
    items: 5000,
    floorPrice: 8,
    volume: 8200,
    verified: true,
  },
  {
    contractAddr: "terra1example3",
    name: "Cosmos Apes",
    banner: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&h=300&fit=crop",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
    items: 3333,
    floorPrice: 22,
    volume: 45000,
    verified: false,
  },
];

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "sale",
    nftName: "Cosmic Crystal #1",
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
    nftName: "Prismatic Crystal #7",
    nftImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop",
    collectionName: "CAPA Crystals",
    price: 120,
    from: "terra1abc123def456ghi789jkl012mno345pqr678stu",
    timestamp: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: "3",
    type: "offer",
    nftName: "Charged Crystal #103",
    nftImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=80&h=80&fit=crop",
    collectionName: "CAPA Crystals",
    price: 28,
    from: "terra1xyz789abc012def345ghi678jkl901mno234pqr",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "4",
    type: "transfer",
    nftName: "Raw Crystal #512",
    nftImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop",
    collectionName: "CAPA Crystals",
    from: "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna",
    to: "terra18hhej6usenw44squvdr8fxxp0c83nlffva5mcl",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent-indigo/[0.06] rounded-full blur-[150px] pointer-events-none" />

        <Container className="py-20 sm:py-28 lg:py-36 text-center relative">
          <Badge variant="indigo" className="mb-6 animate-fade-in">
            <Sparkles size={12} />
            The leading NFT marketplace on Cosmos
          </Badge>

          <h1 className="text-display sm:text-[4rem] lg:text-[5rem] font-bold leading-[1.05] tracking-tight mb-6 animate-slide-up">
            Trade among
            <br />
            <span className="text-gradient-hero">the stars</span>
          </h1>

          <p className="text-h4 text-[var(--text-secondary)] font-normal max-w-[560px] mx-auto mb-10 animate-slide-up" style={{ animationDelay: "50ms" }}>
            Buy, sell and create NFTs with the lowest fees in Cosmos.
            Enforced royalties. Powered by <span className="text-accent-indigo font-medium">◆ Solid Protocol</span>.
          </p>

          <div
            className="flex items-center justify-center gap-3 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <Link href="/explore">
              <Button size="lg" pill>
                Explore
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/create">
              <Button variant="secondary" size="lg" pill>
                Create Collection
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="flex items-center justify-center gap-8 sm:gap-12 mt-16 animate-slide-up"
            style={{ animationDelay: "150ms" }}
          >
            {[
              { label: "Fee", value: "1.5%" },
              { label: "Collections", value: "12" },
              { label: "Volume", value: "65K SOLID" },
              { label: "Creators", value: "48" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-h3 sm:text-h2 font-bold text-[var(--text-primary)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ TRENDING NFTs ═══ */}
      <Container className="py-12">
        <Carousel title="Trending" subtitle="Most traded right now">
          {mockTrending.map((nft) => (
            <CarouselItem key={`${nft.contractAddr}-${nft.tokenId}`} width="220px">
              <NFTCard nft={nft} />
            </CarouselItem>
          ))}
        </Carousel>
      </Container>

      {/* ═══ TOP COLLECTIONS ═══ */}
      <Container className="py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-h2 font-bold">Top Collections</h2>
            <p className="text-small text-[var(--text-secondary)] mt-0.5">
              Sorted by volume
            </p>
          </div>
          <Link href="/explore">
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {mockCollections.map((col) => (
            <CollectionCard key={col.contractAddr} collection={col} />
          ))}
        </div>
      </Container>

      {/* ═══ WHY ASTRAL ═══ */}
      <Container className="py-16">
        <h2 className="text-h2 font-bold text-center mb-10">
          Why Astral?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {[
            {
              icon: Zap,
              title: "1.5% Fee",
              desc: "Lowest in Cosmos. Stargaze charges 4%, OpenSea 2.5%. We charge 1.5%.",
              color: "text-accent-amber",
            },
            {
              icon: Shield,
              title: "Enforced Royalties",
              desc: "Creator royalties always paid. On-chain, nobody can bypass it.",
              color: "text-accent-indigo",
            },
            {
              icon: Sparkles,
              title: "Launchpad",
              desc: "Launch your collection with gacha, fusion, and rewards — no code required.",
              color: "text-accent-violet",
            },
            {
              icon: Globe,
              title: "Cross-chain",
              desc: "NFTs from across Cosmos via IBC. Trade Stargaze NFTs directly on Terra.",
              color: "text-accent-cyan",
            },
          ].map((feature) => (
            <GlassCard key={feature.title} hover={false} padding="lg">
              <feature.icon size={24} className={`${feature.color} mb-3`} />
              <h3 className="text-h4 font-semibold mb-1.5">{feature.title}</h3>
              <p className="text-small text-[var(--text-secondary)]">
                {feature.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </Container>

      {/* ═══ RECENT ACTIVITY ═══ */}
      <Container className="py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-h2 font-bold">Recent Activity</h2>
          <Badge variant="success">Live</Badge>
        </div>
        <GlassCard hover={false}>
          <ActivityFeed items={mockActivity} />
        </GlassCard>
      </Container>

      {/* ═══ CTA ═══ */}
      <Container className="py-16">
        <div className="relative glass rounded-2xl overflow-hidden p-8 sm:p-12 text-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-hero opacity-[0.06] pointer-events-none" />

          <h2 className="text-h1 font-bold mb-3 relative">
            Ready to start?
          </h2>
          <p className="text-body text-[var(--text-secondary)] max-w-[420px] mx-auto mb-8 relative">
            Connect your wallet and start trading or create your own collection
            in minutes.
          </p>
          <div className="flex items-center justify-center gap-3 relative">
            <Link href="/explore">
              <Button size="lg" pill>
                Explore the market
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
