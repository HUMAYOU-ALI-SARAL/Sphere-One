import {
  configureStore,
  ThunkAction,
  Action,
  ThunkMiddleware,
  Middleware,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { userApi } from "@/api/userApi";
import { blockchainApi } from "@/api/blockchainApi";
import userReducer, { userSlice, logout } from "@/reducers/user.slice";
import bladeReducer, { bladeSlice } from "@/reducers/blade.slice";
import errorReducer, { errorSlice } from "@/reducers/error.slice"; 
import { saveToLocalStorage } from "@/utils/localStorage";
import { handleErrors } from "@/utils/fetchQueryErrorHandler";

const reducer = {
  [userSlice.name]: userReducer,
  [bladeSlice.name]: bladeReducer,
  [errorSlice.name]: errorReducer,

  // API
  [userApi.reducerPath]: userApi.reducer,
  [blockchainApi.reducerPath]: blockchainApi.reducer,
};

const handleUnauthenticated: ThunkMiddleware = ({ dispatch }) => (next) => (action) => {
  const { meta, payload }: any = action;
  if (payload?.status === 401) {
    if (meta?.arg?.endpointName !== "login") {
      dispatch(logout());
      window.location.replace(`/auth/login?return=${window.location.pathname}`);
    }
    next(action);
  } else {
    next(action);
  }
};

export const rtkQueryErrorLogger: Middleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload: any = action.payload;
    if(payload?.data?.message != "User is not verified") {
      handleErrors(payload, dispatch);
    }
    
  }
  return next(action);
};


export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['blade/setWalletAccId', 'blade/setWalletSigner', 'blade/setWalletConnector'],
          // Ignore these field paths in all actions
          //ignoredActionPaths: [],
          // Ignore these paths in the state
          ignoredPaths: ['blade'],
        },
      }
    ).concat(
      userApi.middleware,
      blockchainApi.middleware,
      handleUnauthenticated,
      rtkQueryErrorLogger,
    ),
});



store.subscribe(() => saveToLocalStorage("authToken", store.getState().user.authToken));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
