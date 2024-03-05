import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";

import {
  CollectionsRequest,
  CollectionsResponse,
  NftsRequest,
  NftsResponse,
  AccountBalanceResponse,
  TransactionsRequest,
  TransactionsResponse,
  NftBidsRequest,
  NftListedInfoRequest,
  NftListedInfoResponse,
  NftBidsResponse,
  NftUserBidInfoRequest,
  NftUserBidInfoResponse,
  NftAllowanceResponse,
  NftAllowanceRequest,
  TokenAssociationResponse,
  TokenAssociationRequest,
  UserBidsRequest,
  NftsListingRequest,
  NftDealRequest,
  NftPriceHistoryRequest,
  NftPriceHistoryResponse,
  NftActivityHistoryResponse,
  NftActivityHistoryRequest,
  CollectionAttributesRequest,
  CollectionAttributesResponse,
  NftBidRequest,
} from "@/types/blockchain.type";

export const blockchainApi = createApi({
  reducerPath: "blockchainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/blockchain/",
    prepareHeaders: (headers, { getState }) => {
      const token: any = (getState() as RootState).user.authToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAccountBalance: builder.mutation<AccountBalanceResponse, any>({
      query: (accountId: string) => ({
        url: `/balance/${accountId}`,
        method: "GET",
      }),
    }),

    getNfts: builder.mutation<NftsResponse, NftsRequest>({
      query: (params: NftsRequest) => ({
        url: `/nfts`,
        method: "GET",
        params,
      }),
    }),

    getCollections: builder.mutation<CollectionsResponse, CollectionsRequest>({
      query: (params: CollectionsRequest) => ({
        url: `/nfts/collections`,
        method: "GET",
        params,
      }),
    }),

    getTransactions: builder.mutation<TransactionsResponse, TransactionsRequest>({
      query: (params: TransactionsRequest) => ({
        url: `/transactions`,
        method: "GET",
        params,
      }),
    }),
    getNftBids: builder.mutation<NftBidsResponse, NftBidsRequest>({
      query: (params: NftBidsRequest) => ({
        url: `/nft-market/bids`,
        method: "GET",
        params,
      }),
    }),

    getUserBids: builder.mutation<NftBidsResponse, UserBidsRequest>({
      query: (params: UserBidsRequest) => ({
        url: `/nft-market/bids/${params.accountId}`,
        method: "GET",
        params,
      }),
    }),

    getNftListedInfo: builder.mutation<NftListedInfoResponse, NftListedInfoRequest>({
      query: (params: NftListedInfoRequest) => ({
        url: `/nft-market/listed-info`,
        method: "GET",
        params,
      }),
    }),

    getNftUserBidInfo: builder.mutation<NftUserBidInfoResponse, NftUserBidInfoRequest>({
      query: (params: NftUserBidInfoRequest) => ({
        url: `/nft-market/bid`,
        method: "GET",
        params,
      }),
    }),

    checkNftAllowance: builder.mutation<NftAllowanceResponse, NftAllowanceRequest>({
      query: (params: NftAllowanceRequest) => ({
        url: `/nfts/allowance`,
        method: "GET",
        params,
      }),
    }),

    checkTokenAssociation: builder.mutation<TokenAssociationResponse, TokenAssociationRequest>({
      query: (params: TokenAssociationRequest) => ({
        url: `/tokens/association`,
        method: "GET",
        params,
      }),
    }),

    sendNftListing: builder.mutation<any, NftsListingRequest>({
      query: (data) => ({
        url: `/nft-market/items`,
        method: "POST",
        body: data,
      }),
    }),

    sendNftDeal: builder.mutation<any, NftDealRequest>({
      query: (data) => ({
        url: `/nft-market/deals`,
        method: "POST",
        body: data,
      }),
    }),

    sendNftBid: builder.mutation<any, NftBidRequest>({
      query: (data) => ({
        url: `/blockchain/nft-market/bids`,
        method: "POST",
        body: data,
      }),
    }),

    getNftPriceHistory: builder.mutation<NftPriceHistoryResponse, NftPriceHistoryRequest>({
      query: (params: NftPriceHistoryRequest) => ({
        url: `/nft-market/deals/price-history`,
        method: "GET",
        params,
      }),
    }),

    getNftActivityHistory: builder.mutation<NftActivityHistoryResponse, NftActivityHistoryRequest>({
      query: (params: NftActivityHistoryRequest) => ({
        url: `/nfts/activities`,
        method: "GET",
        params,
      }),
    }),

    getCollectionAttributes: builder.mutation<CollectionAttributesResponse, CollectionAttributesRequest>({
      query: (params: CollectionAttributesRequest) => ({
        url: `/nfts/collections/attributes`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetAccountBalanceMutation,
  useGetNftsMutation,
  useGetCollectionsMutation,
  useGetTransactionsMutation,
  useGetNftBidsMutation,
  useGetNftListedInfoMutation,
  useGetNftUserBidInfoMutation,
  useCheckNftAllowanceMutation,
  useCheckTokenAssociationMutation,
  useGetUserBidsMutation,
  useSendNftListingMutation,
  useGetNftPriceHistoryMutation,
  useSendNftDealMutation,
  useGetNftActivityHistoryMutation,
  useGetCollectionAttributesMutation,
  useSendNftBidMutation,
} = blockchainApi;
