import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    message: null,
  },
  reducers: {

    setError: (state, action) => {
      state.message = action.payload
    },
  },
});

export const {
  setError,
} = errorSlice.actions;

export const selectError = (state: RootState): string | null => state.error.message;

export default errorSlice.reducer;
