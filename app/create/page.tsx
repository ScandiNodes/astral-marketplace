"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, Info, ArrowRight } from "lucide-react";
import { Button, GlassCard, Input, Badge } from "@/components/ui";
import { Container } from "@/components/layout";

type LaunchTemplate = "simple" | "gacha" | "fusion" | "rewards";

const templates: {
  id: LaunchTemplate;
  name: string;
  desc: string;
  badge: string;
}[] = [
  {
    id: "simple",
    name: "Simple Mint",
    desc: "Fixed supply, fixed price, whitelist support. Perfect for PFP collections.",
    badge: "Popular",
  },
  {
    id: "gacha",
    name: "Gacha Mint",
    desc: "Random rarity tiers on mint. CAPA Boost mechanics available.",
    badge: "Advanced",
  },
  {
    id: "fusion",
    name: "Fusion",
    desc: "Burn 2 of same tier → get 1 higher tier. Deflationary supply.",
    badge: "Unique",
  },
  {
    id: "rewards",
    name: "Rewards Collection",
    desc: "Holders receive automatic token distributions. Configure token and frequency.",
    badge: "DeFi",
  },
];

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<LaunchTemplate | null>(null);
  const [step, setStep] = useState(1);

  return (
    <Container narrow className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 font-bold mb-2">Create Collection</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Launch your NFT collection on Terra. No coding required.
          Fee: 2.5% of mint revenue.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {["Template", "Details", "Artwork", "Deploy"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-small font-semibold
                ${
                  i + 1 <= step
                    ? "bg-accent-indigo text-white"
                    : "glass text-[var(--text-muted)]"
                }
              `}
            >
              {i + 1}
            </div>
            <span
              className={`text-small hidden sm:inline ${
                i + 1 <= step
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {label}
            </span>
            {i < 3 && (
              <div
                className={`w-8 h-px ${
                  i + 1 < step ? "bg-accent-indigo" : "bg-[var(--astral-dust)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Choose template */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-h2 font-semibold mb-4">Choose Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`
                  text-left glass rounded-lg p-5 transition-all duration-normal ease-spring
                  ${
                    selectedTemplate === tmpl.id
                      ? "border-accent-indigo shadow-glow"
                      : "hover:border-[var(--glass-hover)]"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-h4 font-semibold">{tmpl.name}</h3>
                  <Badge variant="violet">{tmpl.badge}</Badge>
                </div>
                <p className="text-small text-[var(--text-secondary)]">
                  {tmpl.desc}
                </p>
              </button>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button
              disabled={!selectedTemplate}
              onClick={() => setStep(2)}
            >
              Next
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Collection details */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-h2 font-semibold mb-4">Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-small font-medium mb-1.5">
                Collection Name *
              </label>
              <Input placeholder="T.ex. Cosmic Creatures" />
            </div>

            <div>
              <label className="block text-small font-medium mb-1.5">
                Description
              </label>
              <textarea
                placeholder="Tell us about your collection..."
                rows={3}
                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-md px-4 py-2.5 text-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-accent-indigo focus:outline-none transition-colors duration-fast resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-small font-medium mb-1.5">
                  Supply *
                </label>
                <Input type="number" placeholder="1000" />
              </div>
              <div>
                <label className="block text-small font-medium mb-1.5">
                  Mint Price (USDC) *
                </label>
                <Input type="number" placeholder="25" />
              </div>
            </div>

            <div>
              <label className="block text-small font-medium mb-1.5">
                Royalty (%)
              </label>
              <Input type="number" placeholder="5" min={0} max={15} />
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Enforced on-chain on every sale. Max 15%.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)}>
              Next
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Upload artwork */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-h2 font-semibold mb-4">Artwork</h2>

          {/* Upload zone */}
          <div className="glass rounded-xl border-dashed border-2 border-[var(--astral-dust)] hover:border-accent-indigo/50 transition-colors duration-normal p-12 text-center cursor-pointer">
            <Upload
              size={32}
              className="mx-auto text-[var(--text-muted)] mb-3"
            />
            <p className="text-body font-medium mb-1">
              Drag and drop images here
            </p>
            <p className="text-small text-[var(--text-muted)]">
              PNG, JPG, GIF, SVG, WEBP. Max 10 MB per file.
            </p>
            <Button variant="secondary" size="sm" className="mt-4">
              <ImageIcon size={14} />
              Choose files
            </Button>
          </div>

          <GlassCard hover={false} padding="sm">
            <div className="flex items-start gap-2">
              <Info
                size={16}
                className="text-accent-cyan shrink-0 mt-0.5"
              />
              <p className="text-small text-[var(--text-secondary)]">
                Images are uploaded to IPFS (permanent storage). Filenames
                determine order. Metadata is generated automatically.
              </p>
            </div>
          </GlassCard>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={() => setStep(4)}>
              Next
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Deploy */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-h2 font-semibold mb-4">Review &amp; Deploy</h2>

          <GlassCard hover={false} padding="lg">
            <h3 className="text-h4 font-semibold mb-3">Summary</h3>
            <div className="space-y-2.5">
              {[
                { label: "Template", value: templates.find((t) => t.id === selectedTemplate)?.name || "" },
                { label: "Supply", value: "1,000" },
                { label: "Mint Price", value: "25 USDC" },
                { label: "Royalty", value: "5%" },
                { label: "Launchpad Fee", value: "2.5% of mint revenue" },
                { label: "Network Fee", value: "~5 LUNA (one-time)" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between text-small"
                >
                  <span className="text-[var(--text-secondary)]">
                    {row.label}
                  </span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard hover={false} padding="sm" className="border-accent-amber/20 bg-accent-amber/5">
            <div className="flex items-start gap-2">
              <Info size={16} className="text-accent-amber shrink-0 mt-0.5" />
              <p className="text-small text-accent-amber">
                Deploying creates a CW721 contract on Terra mainnet.
                Review all details carefully — this cannot be undone.
              </p>
            </div>
          </GlassCard>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={() => setStep(3)}>
              Back
            </Button>
            <Button size="lg">Deploy to Terra</Button>
          </div>
        </div>
      )}
    </Container>
  );
}
