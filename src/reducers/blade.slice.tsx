import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { AccountId } from "@hashgraph/sdk";
import type { BladeConnector, BladeSigner } from '@bladelabs/blade-web3.js';

export const bladeSlice = createSlice({
  name: "blade",
  initialState: {
    walletAccId: null,
    walletConnector: null,
    walletSigner: null,
    isLoading: false,
    hasBladeExtension: null,
    hasWalletSession: false,
  },
  reducers: {
    setWalletAccId: (state, action) => {
      console.log("setWalletAccId", action.payload);
      state.walletAccId = action.payload;
    },
    setWalletConnector: (state, action) => {
      state.walletConnector = action.payload;
    },
    setWalletSigner: (state, action) => {
      state.walletSigner = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHasBladeExtension: (state, action) => {
      state.hasBladeExtension = action.payload;
    },
    setHasWalletSession: (state, action) => {
      state.hasWalletSession = action.payload;
    },
  },
});

export const {
  setWalletAccId,
  setHasBladeExtension,
  setHasWalletSession,
  setIsLoading,
  setWalletConnector,
  setWalletSigner,
} = bladeSlice.actions;

export const selectWalletAccId = (state: RootState): AccountId | null => state.blade.walletAccId;
export const selectWalletConnector = (state: RootState): BladeConnector | null => state.blade.walletConnector;
export const selectWalletSigner = (state: RootState): BladeSigner | null => state.blade.walletSigner;
export const selectIsLoading = (state: RootState): boolean => state.blade.isLoading;
export const selectHasBladeExtension = (state: RootState): null | boolean => state.blade.hasBladeExtension;
export const selectHasWalletSession = (state: RootState): boolean => state.blade.hasWalletSession;

export default bladeSlice.reducer;
