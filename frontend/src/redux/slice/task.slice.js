import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   data: [],
   change: false,
};
const taskSlice = createSlice({
   name: "task",
   initialState,
   reducers: {
      taskFetched: (state, action) => {
         state.data = action.payload;
      },
      taskChanged: (state) => {
         state.change = !change;
      },
   },
});

export const { taskFetched, taskChanged } = taskSlice.actions;

export default taskSlice.reducer;
