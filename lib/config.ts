// ═══════════════════════════════════════════
// ASTRAL — Configuration
// ═══════════════════════════════════════════

export const CHAIN_ID = "phoenix-1";
export const CHAIN_NAME = "terra2";

export const LCD_ENDPOINT = "https://terra-rest.publicnode.com";
export const RPC_ENDPOINT = "https://terra-rpc.publicnode.com";

// API endpoint — server-side indexer + API
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://88.99.136.96:8082";

// Contract addresses (set after deployment)
export const MARKETPLACE_CONTRACT = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT || "";

// Token contracts
export const SOLID_CONTRACT = "terra10aa3zdkrc7jwuf8ekl3zq7e7m42vmzqehcmu74e4egc7xkm5kr2s0muyst";
export const CAPA_CONTRACT = "terra1t4p3u8khpd7f8qzurwyafxt648dya6mp6vur3vaapswt6m24gkuqrfdhar";
export const CAPA_GOV_CONTRACT = "terra1sf66d5vap897xlvv2hlcp4l20y4pp42r6ala4snk8mgd246jvufqwe0cnm";

// USDC IBC denom
export const USDC_DENOM = "ibc/2C962DAB9F57FE0921435426AE75196009FAA1981BF86991203C8411F8980FDB";

// CW721 code_id for new collections
export const CW721_CODE_ID = 3815;

// Fee info
export const MARKETPLACE_FEE_BPS = 150; // 1.5%
export const MAX_ROYALTY_BPS = 1500; // 15%

// CAPA discount tiers
export const CAPA_DISCOUNT_TIERS = [
  { minStake: 50_000, feeBps: 75, label: "0.75%" },
  { minStake: 10_000, feeBps: 100, label: "1.0%" },
  { minStake: 1_000, feeBps: 125, label: "1.25%" },
  { minStake: 0, feeBps: 150, label: "1.5%" },
] as const;
