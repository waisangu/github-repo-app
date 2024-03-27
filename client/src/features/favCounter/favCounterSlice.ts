import { createSlice } from "@reduxjs/toolkit";
import { FavCounterState } from "../../types/types";

const initialState: FavCounterState = {
  value: 0,
};

const favCounterSlice = createSlice({
  name: "favCounter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = favCounterSlice.actions;

export default favCounterSlice.reducer;
