// ═══════════════════════════════════════════
// ASTRAL — Contract Message Builders
// Builds CosmWasm execute messages for marketplace interactions
// ═══════════════════════════════════════════

import { MARKETPLACE_CONTRACT, SOLID_CONTRACT } from "./config";

/**
 * Build CW721 SendNft message to list an NFT on the marketplace.
 * The user calls this on the NFT's CW721 contract.
 */
export function buildListNftMsg(params: {
  nftContract: string;
  tokenId: string;
  price: string; // In smallest unit (e.g. "25000000" for 25 SOLID)
  paymentType: "solid" | "usdc" | "luna";
  expiresInBlocks?: number;
}) {
  const paymentMsg =
    params.paymentType === "solid"
      ? { cw20: { contract_addr: SOLID_CONTRACT } }
      : params.paymentType === "luna"
        ? { native: { denom: "uluna" } }
        : { native: { denom: "ibc/2C962DAB9F57FE0921435426AE75196009FAA1981BF86991203C8411F8980FDB" } };

  const listMsg = btoa(
    JSON.stringify({
      price: params.price,
      payment: paymentMsg,
      expires_in_blocks: params.expiresInBlocks || 0,
    })
  );

  return {
    contractAddress: params.nftContract,
    msg: {
      send_nft: {
        contract: MARKETPLACE_CONTRACT,
        token_id: params.tokenId,
        msg: listMsg,
      },
    },
  };
}

/**
 * Build BuyNft message for native token payment (LUNA/USDC).
 * User calls this on the marketplace contract with funds attached.
 */
export function buildBuyNativeMsg(listingId: number, price: string, denom: string) {
  return {
    contractAddress: MARKETPLACE_CONTRACT,
    msg: {
      buy_nft: {
        listing_id: listingId,
      },
    },
    funds: [{ denom, amount: price }],
  };
}

/**
 * Build CW20 Send message to buy with SOLID tokens.
 * User calls this on the SOLID CW20 contract.
 */
export function buildBuyCw20Msg(listingId: number, price: string) {
  const hookMsg = btoa(
    JSON.stringify({
      buy_nft: { listing_id: listingId },
    })
  );

  return {
    contractAddress: SOLID_CONTRACT,
    msg: {
      send: {
        contract: MARKETPLACE_CONTRACT,
        amount: price,
        msg: hookMsg,
      },
    },
  };
}

/**
 * Build CancelListing message.
 */
export function buildCancelListingMsg(listingId: number) {
  return {
    contractAddress: MARKETPLACE_CONTRACT,
    msg: {
      cancel_listing: {
        listing_id: listingId,
      },
    },
  };
}

/**
 * Build MakeOffer message with native tokens.
 */
export function buildMakeOfferNativeMsg(params: {
  nftContract: string;
  tokenId: string;
  price: string;
  denom: string;
  expiresInBlocks: number;
}) {
  return {
    contractAddress: MARKETPLACE_CONTRACT,
    msg: {
      make_offer: {
        nft_contract: params.nftContract,
        token_id: params.tokenId,
        expires_in_blocks: params.expiresInBlocks,
      },
    },
    funds: [{ denom: params.denom, amount: params.price }],
  };
}

/**
 * Build MakeOffer message with CW20 (SOLID) tokens.
 */
export function buildMakeOfferCw20Msg(params: {
  nftContract: string;
  tokenId: string;
  price: string;
  expiresInBlocks: number;
}) {
  const hookMsg = btoa(
    JSON.stringify({
      make_offer: {
        nft_contract: params.nftContract,
        token_id: params.tokenId,
        expires_in_blocks: params.expiresInBlocks,
      },
    })
  );

  return {
    contractAddress: SOLID_CONTRACT,
    msg: {
      send: {
        contract: MARKETPLACE_CONTRACT,
        amount: params.price,
        msg: hookMsg,
      },
    },
  };
}

/**
 * Build AcceptOffer message.
 */
export function buildAcceptOfferMsg(offerId: number) {
  return {
    contractAddress: MARKETPLACE_CONTRACT,
    msg: {
      accept_offer: {
        offer_id: offerId,
      },
    },
  };
}

/**
 * Build CancelOffer message.
 */
export function buildCancelOfferMsg(offerId: number) {
  return {
    contractAddress: MARKETPLACE_CONTRACT,
    msg: {
      cancel_offer: {
        offer_id: offerId,
      },
    },
  };
}

/**
 * Build SetRoyalty message (admin only).
 */
export function buildSetRoyaltyMsg(
  nftContract: string,
  recipient: string,
  royaltyBps: number
) {
  return {
    contractAddress: MARKETPLACE_CONTRACT,
    msg: {
      set_royalty: {
        nft_contract: nftContract,
        recipient,
        royalty_bps: royaltyBps,
      },
    },
  };
}
