// ═══════════════════════════════════════════
// ASTRAL — API Client
// Fetches data from the Python REST API
// ═══════════════════════════════════════════

import { API_BASE } from "./config";

async function fetchAPI<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(path, API_BASE);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 10 }, // ISR: revalidate every 10 seconds
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

export interface Collection {
  contract_addr: string;
  name: string;
  symbol: string;
  total_supply: number;
  creator: string;
  royalty_bps: number;
  royalty_recipient: string;
  floor_price: string | null;
  volume_total: string | null;
  volume_24h: string | null;
  num_listed: number;
  num_owners: number;
}

export interface NFT {
  contract_addr: string;
  token_id: string;
  owner: string;
  name: string;
  image: string;
  metadata_uri: string;
  traits: Array<{ trait_type: string; value: string }>;
  listing?: ListingData | null;
  offers?: OfferData[];
  history?: EventData[];
}

export interface ListingData {
  listing_id: number;
  seller: string;
  nft_contract: string;
  token_id: string;
  price: string;
  denom: string;
  status: string;
  created_at: number;
}

export interface OfferData {
  offer_id: number;
  buyer: string;
  nft_contract: string;
  token_id: string;
  price: string;
  denom: string;
  status: string;
  expires_at: number;
}

export interface EventData {
  id: number;
  type: string;
  nft_contract: string;
  token_id: string;
  from_addr: string;
  to_addr: string;
  price: string;
  denom: string;
  tx_hash: string;
  block_height: number;
  timestamp: string;
  name?: string;
  image?: string;
  collection_name?: string;
}

export interface MarketStats {
  collections: number;
  active_listings: number;
  total_sales: number;
  total_volume: string;
  users: number;
  fee_bps: number;
}

// ═══════════════════════════════════════════
// API FUNCTIONS
// ═══════════════════════════════════════════

export async function getCollections(limit = 50): Promise<Collection[]> {
  return fetchAPI<Collection[]>("/api/collections", { limit: String(limit) });
}

export async function getCollection(addr: string): Promise<Collection> {
  return fetchAPI<Collection>(`/api/collections/${addr}`);
}

export async function getCollectionNFTs(
  addr: string,
  opts?: { limit?: number; offset?: number }
): Promise<NFT[]> {
  return fetchAPI<NFT[]>(`/api/collections/${addr}/nfts`, {
    limit: String(opts?.limit || 30),
    offset: String(opts?.offset || 0),
  });
}

export async function getNFT(addr: string, tokenId: string): Promise<NFT> {
  return fetchAPI<NFT>(`/api/nfts/${addr}/${tokenId}`);
}

export async function getListings(opts?: {
  limit?: number;
  offset?: number;
  sort?: string;
  collection?: string;
}): Promise<ListingData[]> {
  const params: Record<string, string> = {
    limit: String(opts?.limit || 30),
    offset: String(opts?.offset || 0),
  };
  if (opts?.sort) params.sort = opts.sort;
  if (opts?.collection) params.collection = opts.collection;
  return fetchAPI<ListingData[]>("/api/listings", params);
}

export async function getUserProfile(addr: string) {
  return fetchAPI<{
    address: string;
    owned: NFT[];
    listings: ListingData[];
    offers: OfferData[];
    owned_count: number;
    listed_count: number;
  }>(`/api/user/${addr}`);
}

export async function getActivity(opts?: {
  limit?: number;
  type?: string;
}): Promise<EventData[]> {
  const params: Record<string, string> = {
    limit: String(opts?.limit || 20),
  };
  if (opts?.type) params.type = opts.type;
  return fetchAPI<EventData[]>("/api/activity", params);
}

export async function getStats(): Promise<MarketStats> {
  return fetchAPI<MarketStats>("/api/stats");
}
