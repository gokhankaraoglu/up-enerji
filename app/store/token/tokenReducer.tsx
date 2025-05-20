import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface TokenState {
  token?: string;
}

const initialState: TokenState = {
  token: undefined,
};

const tokenSlice: Slice<TokenState> = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
