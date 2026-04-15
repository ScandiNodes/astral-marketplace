// ═══════════════════════════════════════════
// ASTRAL — Utility Functions
// ═══════════════════════════════════════════

/**
 * Truncate a Terra address for display.
 * "terra1cqc26lnatzxvu0z5nd4yx8m4ecllkm7jlj6nna" → "terra1cqc2...6nna"
 */
export function truncateAddress(addr: string, start = 10, end = 4): string {
  if (addr.length <= start + end + 3) return addr;
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
}

/**
 * Format a token amount from micro-units to human readable.
 * "25000000" → "25.00" (for 6 decimal tokens like SOLID/CAPA)
 */
export function formatTokenAmount(
  amount: string | number,
  decimals = 6,
  displayDecimals = 2
): string {
  const num = typeof amount === "string" ? parseInt(amount, 10) : amount;
  if (isNaN(num) || num === 0) return "0";
  const value = num / Math.pow(10, decimals);

  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toFixed(displayDecimals);
}

/**
 * Format a token amount for LUNA (6 decimals).
 */
export function formatLuna(amount: string | number): string {
  return formatTokenAmount(amount, 6, 2);
}

/**
 * Format a token amount for SOLID (6 decimals).
 */
export function formatSolid(amount: string | number): string {
  return formatTokenAmount(amount, 6, 2);
}

/**
 * Relative time string.
 * "2024-01-15T10:30:00Z" → "5m ago"
 */
export function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

/**
 * Calculate fee breakdown for a sale.
 */
export function calculateFees(
  price: number,
  feeBps: number,
  royaltyBps: number
) {
  const fee = Math.floor((price * feeBps) / 10000);
  const royalty = Math.floor((price * royaltyBps) / 10000);
  const sellerReceives = price - fee - royalty;

  return {
    fee,
    royalty,
    sellerReceives,
    feePercent: (feeBps / 100).toFixed(2),
    royaltyPercent: (royaltyBps / 100).toFixed(1),
  };
}

/**
 * Open a Terra Finder URL for a transaction.
 */
export function getTxUrl(txHash: string): string {
  return `https://finder.terra.money/mainnet/tx/${txHash}`;
}

/**
 * Open a Terra Finder URL for a contract.
 */
export function getContractUrl(addr: string): string {
  return `https://finder.terra.money/mainnet/address/${addr}`;
}
