"use client";

import { useState, useCallback, useEffect } from "react";
import { CHAIN_ID } from "@/lib/config";

/**
 * Simplified wallet hook using Keplr directly.
 * In production, use @cosmos-kit/react for multi-wallet support.
 */

interface WalletState {
  address: string | null;
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    connected: false,
    connecting: false,
    error: null,
  });

  // Check if Keplr is available
  const getKeplr = useCallback(() => {
    if (typeof window === "undefined") return null;
    // Support both Keplr and Vultisig (via window.xfi.keplr)
    return (window as any).keplr || (window as any).xfi?.keplr || null;
  }, []);

  // Auto-connect if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem("astral_wallet_connected");
    if (wasConnected === "true") {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(async () => {
    setState((s) => ({ ...s, connecting: true, error: null }));

    try {
      const keplr = getKeplr();
      if (!keplr) {
        throw new Error("Please install Keplr or Vultisig wallet");
      }

      // Suggest Terra chain if not already added
      try {
        await keplr.enable(CHAIN_ID);
      } catch {
        // Chain might need to be added
        await keplr.experimentalSuggestChain(getTerraChainInfo());
        await keplr.enable(CHAIN_ID);
      }

      const offlineSigner = keplr.getOfflineSigner(CHAIN_ID);
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0].address;
      localStorage.setItem("astral_wallet_connected", "true");

      setState({
        address,
        connected: true,
        connecting: false,
        error: null,
      });
    } catch (e: any) {
      setState({
        address: null,
        connected: false,
        connecting: false,
        error: e.message || "Failed to connect",
      });
    }
  }, [getKeplr]);

  const disconnect = useCallback(() => {
    localStorage.removeItem("astral_wallet_connected");
    setState({
      address: null,
      connected: false,
      connecting: false,
      error: null,
    });
  }, []);

  /**
   * Sign and broadcast a CosmWasm execute message.
   */
  const execute = useCallback(
    async (msg: {
      contractAddress: string;
      msg: Record<string, unknown>;
      funds?: Array<{ denom: string; amount: string }>;
    }) => {
      const keplr = getKeplr();
      if (!keplr || !state.address) {
        throw new Error("Wallet not connected");
      }

      const { SigningCosmWasmClient } = await import(
        "@cosmjs/cosmwasm-stargate"
      );
      const offlineSigner = keplr.getOfflineSignerAuto(CHAIN_ID);
      const client = await SigningCosmWasmClient.connectWithSigner(
        "https://terra-rpc.publicnode.com",
        offlineSigner,
        { gasPrice: { amount: "0.015", denom: "uluna" } as any }
      );

      const result = await client.execute(
        state.address,
        msg.contractAddress,
        msg.msg,
        "auto",
        undefined,
        msg.funds
      );

      return result;
    },
    [getKeplr, state.address]
  );

  return {
    ...state,
    connect,
    disconnect,
    execute,
  };
}

/**
 * Terra chain info for Keplr suggest chain.
 */
function getTerraChainInfo() {
  return {
    chainId: CHAIN_ID,
    chainName: "Terra",
    rpc: "https://terra-rpc.publicnode.com",
    rest: "https://terra-rest.publicnode.com",
    bip44: { coinType: 330 },
    bech32Config: {
      bech32PrefixAccAddr: "terra",
      bech32PrefixAccPub: "terrapub",
      bech32PrefixValAddr: "terravaloper",
      bech32PrefixValPub: "terravaloperpub",
      bech32PrefixConsAddr: "terravalcons",
      bech32PrefixConsPub: "terravalconspub",
    },
    currencies: [
      { coinDenom: "LUNA", coinMinimalDenom: "uluna", coinDecimals: 6 },
    ],
    feeCurrencies: [
      {
        coinDenom: "LUNA",
        coinMinimalDenom: "uluna",
        coinDecimals: 6,
        gasPriceStep: { low: 0.015, average: 0.025, high: 0.04 },
      },
    ],
    stakeCurrency: {
      coinDenom: "LUNA",
      coinMinimalDenom: "uluna",
      coinDecimals: 6,
    },
  };
}
