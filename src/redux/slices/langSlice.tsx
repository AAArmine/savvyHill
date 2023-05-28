import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const langSlice = createSlice({
  name: "lang",
  initialState: {
    lang: 1,
  },
  reducers: {
    changeLang: (state, action: PayloadAction<number>) => {
      state.lang = action.payload;
    },
  },
});
export const { changeLang } = langSlice.actions;
export default langSlice.reducer;
