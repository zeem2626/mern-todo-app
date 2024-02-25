import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  data: null,
  status: false
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    loginUser: (state, action)=>{
      state.data = action.payload;
      state.status = true;
    },
    logoutUser: (state)=>{
      state.data = null;
      state.status = false;
    },
  }
})

export const {loginUser, logoutUser} = userSlice.actions;

export default userSlice.reducer;