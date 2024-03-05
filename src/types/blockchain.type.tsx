import { number } from "yup";

export interface AccountBalanceType {
  hbarBalance: number;
  balanceInUSD: number;
}

export interface AccountBalanceResponse extends AccountBalanceType { }

export interface NftsResponse {
  isLastPage: boolean;
  nfts: Nft[];
}

export interface NftsRequest {
  accountId?: string;
  tokenId?: string,
  serialNumber?: number,
  page?: number;
  pageSize?: number;
  orderDirection?: "asc" | "desc";
  orderBy?: string;
  nftCreator?: string;
  searchQuery?: string;
  isMarketListed?: boolean;
  type?: NftRequestTypes;
};

export interface NftsListingRequest {
  nfts: Nft[];
  price: number;
  isListed: boolean;
  listingEndTimestamp: number;
};

export interface NftBidsRequest {
  tokenId: string,
  serialNumber: number,
  page?: number;
  pageSize?: number;
};

export type Bid = {
  amount: bigint;
  amountInUsd: number;
  ownerEvmAddress: string;
  ownerAccountId: string;
  username: string;
  serialNumber: number;
  tokenId: string;
  nft: Nft;
  active?: boolean;
  bidEndTimestamp: number;
};

export interface NftBidsResponse {
  bids: Bid[];
};

export interface NftListedInfoRequest {
  tokenId: string,
  serialNumber: number,
};

export interface NftAllowanceResponse {
  hasAllowance: boolean;
};

export interface NftAllowanceRequest {
  ownerId: string;
  spenderId: string;
  tokenId: string;
  serialNumber: number;
};

export interface TokenAssociationRequest {
  accountId: string;
  tokenId: string;
};

export interface TokenAssociationResponse {
  isAssociated: boolean;
};

export interface NftUserBidInfoResponse {
  bid: Bid;
};

export interface NftUserBidInfoRequest {
  accountId: string;
  tokenId: string,
  serialNumber: number,
};

export interface NftListedInfo {
  isListed: boolean;
  owner: string;
  price: bigint;
  serialNumber: number;
  token: string;
  listingEndTimestamp: number;
};

export enum UserBidsType {
  RECEIVED_BIDS = "received",
  SENT_BIDS = "sent",
};

export interface UserBidsRequest {
  accountId: string;
  type: UserBidsType;
  page?: number;
  pageSize?: number;
};

export interface NftListedInfoResponse extends NftListedInfo { };

export interface CollectionsResponse {
  isLastPage: boolean;
  collections: NftCollection[];
};

export interface CollectionsRequest {
  accountId?: string;
  tokenId?: string;
  page?: number;
  pageSize?: number;
  orderDirection?: "asc" | "desc";
  orderBy?: string;
  nftCreator?: string;
  searchQuery?: string;
};

export interface TransactionsRequest {
  accountId?: string;
  page?: number;
  pageSize?: number;
  orderDirection?: "asc" | "desc";
  orderBy?: string;
};

export interface TransactionsResponse {
  isLastPage: boolean;
  transactions: Transaction[];
};

export enum TransactionTypes {
  RECEIVED_NFT = "received_nft",
  TRANSFERRED_NFT = "transferred_nft",
  RECEIVED_HBAR = "received_hbar",
  TRANSFERRED_HBAR = "transferred_hbar",
};

export interface Transaction {
  amount: number;
  transaction: {
    payer_account_id: string;
    result: number;
    id: string;
    charged_tx_fee: number;
    consensus_timestamp: number;
    transfers: Transfer[];
    type: TransactionTypes;
  }
};

export interface TransactionUi extends Transaction {
  detailsOpen: boolean;
};

export type Transfer = {
  type: string;
  sender_account_id: number;
  receiver_account_id: number;
  amount: number;
  token: {
    symbol: string;
    decimals: number;
    name: string;
    token_id: number;
  } | null,
  nft: {
    serial_number: number;
  } | null
}

export type NftMetadataAttribute = {
  trait_type: string;
  value: string;
};

export type NftMetadata = {
  name: string;
  image: string;
  type: string;
  description: string;
  attributes: NftMetadataAttribute[];
};

export type NftCollectionMetadata = {
  name: string;
  image: string;
  description: string;
};

export type NftCollection = {
  token_id: string;
  name: string;
  symbol?: string;
  created_timestamp?: string;
  total_supply: number;
  max_supply: number;
  total_items?: number;
  minted_count?: number;
  floor_price?: number;
  best_offer?: number;
  listed?: number;
  owners?: number;
  royalty_fee?: number;
  royalty_fee_collector?: string;
  entity?: {
    memo: string;
  };
  metadata?: NftCollectionMetadata;
};

export interface Nft {
  token_id: string;
  account_id: string;
  serial_number: number;
  metadata: NftMetadata;
  created_timestamp: string;
  history: AccountNftHistory;
  token: NftCollection;
  youAreOwner?: boolean,
  owner?: NftOwner;
  checked?: boolean;
  price?: bigint;
};

type NftOwner = {
  accountId: string;
  firstName: string;
  lastName: string;
  id: number;
  username: string
};

type AccountNftHistory = {
  account_id: number;
  start_timestamp: string;
  end_timestamp: string;
}[];

export interface NftAchievement {
  image: string;
  id: number;
  claimed: boolean;
}

export type NftTransfer = {
  is_approval: boolean;
  receiver_account_id: string;
  sender_account_id: string;
  serial_number: number;
  token_id: string;
};

export type CryptoTransfer = {
  account: string;
  amount: number;
  is_approval: boolean;
};

export enum NftRequestTypes {
  HOT_AUCTIONS = "hot_auctions",
  RECENT_LISTINGS = "recent_listings",
}

export interface NftDealRequest {
  ownerId: string;
  buyerId: string;
  transactionId: string;
  price: bigint;
  tokenId: string;
  serialNumber: number;
}

export interface NftBidRequest {
  transactionId: string;
  bidEndTimestamp: number;
}

export interface NftPriceHistoryRequest {
  timestamp: number
  tokenId: string;
  serialNumber: number;
}

export type NftPriceHistory = {
  price: bigint;
  timestamp: number;
}

export interface NftPriceHistoryResponse {
  history: NftPriceHistory[];
}

export interface NftActivityHistoryRequest {
  tokenId: string;
  serialNumber: number;
}

export interface NftActivityHistoryResponse {
  history: NftActivityHistory[];
}

export enum NftActivityEventTypes {
  SALE = "sale",
  TRANSFER = "transfer",
  MINT = "mint",
}

export type NftActivityHistory = {
  eventType: NftActivityEventTypes;
  price: bigint;
  from: {
    accountId: string;
    username: string;
  };
  to: {
    accountId: string;
    username: string;
  };
  timestamp: number;
}

export interface CollectionAttributesRequest {
  tokenId: string;
}

export interface CollectionAttributesResponse {
  attributes: CollectionAttribute[];
}

export type CollectionAttribute = {
  type: string,
  items: CollectionItemAttribute[],
}

export type CollectionItemAttribute = {
  value: string,
  selected?: boolean,
  isTrend: boolean,
}