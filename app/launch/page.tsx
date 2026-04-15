"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Button, Badge, GlassCard } from "@/components/ui";
import { Container } from "@/components/layout";
import { PriceTag } from "@/components/nft";

// Mock launches
const launches = [
  {
    id: "capa-crystals",
    name: "CAPA Crystals",
    image: "https://images.unsplash.com/photo-1635492491273-455af7728453?w=600&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1000&h=400&fit=crop",
    description:
      "1,000 unique crystals with 5 rarity tiers. Gacha mint with CAPA Boost.",
    mintPrice: 25,
    currency: "USDC",
    supply: 1000,
    minted: 0,
    status: "upcoming" as const,
    startsAt: "2026-04-20T19:00:00Z",
    template: "Gacha Mint",
  },
  {
    id: "terra-landscapes",
    name: "Terra Landscapes",
    image: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=600&h=600&fit=crop",
    banner: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=1000&h=400&fit=crop",
    description: "Generative landscapes inspired by the Terra blockchain.",
    mintPrice: 10,
    currency: "USDC",
    supply: 3333,
    minted: 0,
    status: "upcoming" as const,
    startsAt: "2026-05-01T18:00:00Z",
    template: "Simple Mint",
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusConfig = {
  live: { label: "LIVE", variant: "success" as const },
  upcoming: { label: "Upcoming", variant: "indigo" as const },
  ended: { label: "Ended", variant: "default" as const },
};

export default function LaunchpadPage() {
  return (
    <Container className="py-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-h1 font-bold mb-2">Launchpad</h1>
          <p className="text-body text-[var(--text-secondary)]">
            New collections launching on Astral. 2.5% fee for creators.
          </p>
        </div>
        <Link href="/create">
          <Button variant="secondary" pill>
            <Sparkles size={14} />
            Apply to launch
          </Button>
        </Link>
      </div>

      {/* Launches */}
      <div className="space-y-6">
        {launches.map((launch) => {
          const status = statusConfig[launch.status];
          return (
            <GlassCard
              key={launch.id}
              hover={true}
              padding="none"
              className="overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-80 h-48 md:h-auto relative bg-astral-nebula shrink-0">
                  <Image
                    src={launch.image}
                    alt={launch.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <Badge>{launch.template}</Badge>
                  </div>

                  <h2 className="text-h2 font-bold mb-2">{launch.name}</h2>
                  <p className="text-body text-[var(--text-secondary)] mb-4 max-w-lg">
                    {launch.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        Mint Price
                      </div>
                      <PriceTag
                        amount={launch.mintPrice}
                        currency={launch.currency}
                        size="lg"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        Supply
                      </div>
                      <div className="text-h4 font-semibold">
                        {launch.supply.toLocaleString("sv-SE")}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        Minted
                      </div>
                      <div className="text-h4 font-semibold">
                        {launch.minted}/{launch.supply}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-astral-dust rounded-full mb-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-hero rounded-full transition-all duration-slow"
                      style={{
                        width: `${(launch.minted / launch.supply) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Launch time + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-small text-[var(--text-secondary)]">
                      <Clock size={14} />
                      {launch.status === "upcoming"
                        ? `Starts ${formatDate(launch.startsAt)}`
                        : launch.status === "live"
                          ? "Mint is open!"
                          : "Ended"}
                    </div>
                    {launch.status === "live" && (
                      <Button pill>
                        Mint now
                        <ArrowRight size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </Container>
  );
}
