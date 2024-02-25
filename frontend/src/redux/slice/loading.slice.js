import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   status: true,
   refresh: false,
};
const loadingSlice = createSlice({
   name: "loading",
   initialState,
   reducers: {
      loadingStart: (state) => {
         state.status = true;
      },
      loadingEnd: (state) => {
         state.status = false;
      },
      refresh: (state) => {
         state.refresh = !refresh;
      },
   },
});

export const { loadingStart, loadingEnd } = loadingSlice.actions;

export default loadingSlice.reducer;
