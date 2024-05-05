import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: { value: null },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export const selectToken = (state) => state.token.value; // select the value property

export default tokenSlice.reducer;
