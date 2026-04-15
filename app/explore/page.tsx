"use client";

import { useState } from "react";
import { SlidersHorizontal, Grid3x3, LayoutList } from "lucide-react";
import { Button, Input, Badge } from "@/components/ui";
import { Container } from "@/components/layout";
import { NFTGrid, NFTCardData } from "@/components/nft";

type SortOption = "recent" | "price_asc" | "price_desc" | "popular";
type Category = "all" | "art" | "gaming" | "collectibles" | "utility";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "art", label: "Art" },
  { id: "gaming", label: "Gaming" },
  { id: "collectibles", label: "Collectibles" },
  { id: "utility", label: "Utility" },
];

const sortOptions: { id: SortOption; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "price_asc", label: "Price: Low → High" },
  { id: "price_desc", label: "Price: High → Low" },
  { id: "popular", label: "Popular" },
];

// Mock data
const mockNFTs: NFTCardData[] = Array.from({ length: 20 }, (_, i) => ({
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
      "1550745165-9bc0b252726f",
      "1617791160505-6f00504e3519",
    ][i % 10]
  }?w=400&h=400&fit=crop`,
  collectionName: "CAPA Crystals",
  price: Math.round((Math.random() * 200 + 10) * 100) / 100,
  currency: "SOLID",
}));

export default function ExplorePage() {
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortOption>("recent");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = mockNFTs.filter((nft) =>
    search
      ? nft.name.toLowerCase().includes(search.toLowerCase()) ||
        nft.collectionName.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 font-bold mb-2">Explore</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Discover NFTs from across the Terra ecosystem
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Search */}
        <div className="w-full sm:w-80">
          <Input
            search
            placeholder="Search NFTs, collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`
                px-3 py-1.5 rounded-full text-small font-medium
                transition-all duration-fast ease-spring
                ${
                  category === cat.id
                    ? "bg-accent-indigo text-white"
                    : "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-hover)]"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:ml-auto">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-md px-3 py-2 text-small text-[var(--text-secondary)] focus:border-accent-indigo focus:outline-none transition-colors duration-fast appearance-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex items-center glass rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors duration-fast ${
                viewMode === "grid"
                  ? "bg-[var(--glass-active)] text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors duration-fast ${
                viewMode === "list"
                  ? "bg-[var(--glass-active)] text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-small text-[var(--text-muted)]">
          {filtered.length} results
        </p>
      </div>

      {/* Grid */}
      <NFTGrid nfts={filtered} />
    </Container>
  );
}
