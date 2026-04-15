"use client";

import { useState, useCallback } from "react";
import { useWallet } from "./useWallet";
import {
  buildListNftMsg,
  buildBuyNativeMsg,
  buildBuyCw20Msg,
  buildCancelListingMsg,
  buildMakeOfferNativeMsg,
  buildMakeOfferCw20Msg,
  buildAcceptOfferMsg,
  buildCancelOfferMsg,
} from "@/lib/contracts";

interface TxState {
  loading: boolean;
  txHash: string | null;
  error: string | null;
}

/**
 * Hook for marketplace contract interactions.
 * Provides list, buy, cancel, offer, accept functions with loading/error states.
 */
export function useMarketplace() {
  const { execute, connected, address } = useWallet();
  const [txState, setTxState] = useState<TxState>({
    loading: false,
    txHash: null,
    error: null,
  });

  const runTx = useCallback(
    async (fn: () => Promise<any>) => {
      if (!connected) {
        setTxState({ loading: false, txHash: null, error: "Wallet not connected" });
        return null;
      }

      setTxState({ loading: true, txHash: null, error: null });

      try {
        const result = await fn();
        setTxState({
          loading: false,
          txHash: result.transactionHash,
          error: null,
        });
        return result;
      } catch (e: any) {
        const error = e.message || "Transaction failed";
        setTxState({ loading: false, txHash: null, error });
        return null;
      }
    },
    [connected]
  );

  // ═══════ List NFT ═══════
  const listNft = useCallback(
    (params: {
      nftContract: string;
      tokenId: string;
      price: string;
      paymentType: "solid" | "usdc" | "luna";
      expiresInBlocks?: number;
    }) =>
      runTx(() => {
        const msg = buildListNftMsg(params);
        return execute(msg);
      }),
    [execute, runTx]
  );

  // ═══════ Buy with native tokens ═══════
  const buyNative = useCallback(
    (listingId: number, price: string, denom: string) =>
      runTx(() => {
        const msg = buildBuyNativeMsg(listingId, price, denom);
        return execute(msg);
      }),
    [execute, runTx]
  );

  // ═══════ Buy with SOLID (CW20) ═══════
  const buySolid = useCallback(
    (listingId: number, price: string) =>
      runTx(() => {
        const msg = buildBuyCw20Msg(listingId, price);
        return execute(msg);
      }),
    [execute, runTx]
  );

  // ═══════ Cancel listing ═══════
  const cancelListing = useCallback(
    (listingId: number) =>
      runTx(() => {
        const msg = buildCancelListingMsg(listingId);
        return execute(msg);
      }),
    [execute, runTx]
  );

  // ═══════ Make offer (native) ═══════
  const makeOfferNative = useCallback(
    (params: {
      nftContract: string;
      tokenId: string;
      price: string;
      denom: string;
      expiresInBlocks: number;
    }) =>
      runTx(() => {
        const msg = buildMakeOfferNativeMsg(params);
        return execute(msg);
      }),
    [execute, runTx]
  );

  // ═══════ Make offer (SOLID) ═══════
  const makeOfferSolid = useCallback(
    (params: {
      nftContract: string;
      tokenId: string;
      price: string;
      expiresInBlocks: number;
    }) =>
      runTx(() => {
        const msg = buildMakeOfferCw20Msg(params);
        return execute(msg);
      }),
    [execute, runTx]
  );

  // ═══════ Accept offer ═══════
  const acceptOffer = useCallback(
    (offerId: number) =>
      runTx(() => {
        const msg = buildAcceptOfferMsg(offerId);
        return execute(msg);
      }),
    [execute, runTx]
  );

  // ═══════ Cancel offer ═══════
  const cancelOffer = useCallback(
    (offerId: number) =>
      runTx(() => {
        const msg = buildCancelOfferMsg(offerId);
        return execute(msg);
      }),
    [execute, runTx]
  );

  return {
    // State
    ...txState,
    connected,
    address,

    // Actions
    listNft,
    buyNative,
    buySolid,
    cancelListing,
    makeOfferNative,
    makeOfferSolid,
    acceptOffer,
    cancelOffer,

    // Reset
    resetTx: () => setTxState({ loading: false, txHash: null, error: null }),
  };
}
