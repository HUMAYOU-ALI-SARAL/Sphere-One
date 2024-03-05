import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { loadFromLocalStorage } from "@/utils/localStorage";
import { UserProfileType } from "@/types/user.type";
import { AccountBalanceType } from "@/types/blockchain.type";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isVerified: false,
    isAuthorized: false,
    authToken: loadFromLocalStorage("authToken"),
    profile: undefined,
    accountBalance: null,
  },
  reducers: {
    login: (state, action) => {
      state.authToken = action.payload.jwtToken;
      state.isVerified = action.payload.verified;
      state.isAuthorized = !!action.payload.id;
    },
    logout: (state) => {
      state.authToken = null;
      state.isVerified = false;
      state.isAuthorized = false;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },

    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },

    setUserProfile: (state, action) => {
      state.isAuthorized = !!action.payload.id;
      state.profile = action.payload;
    },

    setAccountBalance: (state, action) => {
      state.accountBalance = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setIsVerified,
  setAuthToken,
  setUserProfile,
  setAccountBalance,
} = userSlice.actions;

export const selectAuthToken = (state: RootState): string | null => state.user.authToken;
export const selectIsVerified = (state: RootState): boolean => state.user.isVerified;
export const selectIsAuthorized = (state: RootState): boolean => state.user.isAuthorized;
export const selectUserProfile = (state: RootState): UserProfileType | undefined => state.user.profile;
export const selectAccountBalance = (state: RootState): AccountBalanceType | null => state.user.accountBalance;

export default userSlice.reducer;
