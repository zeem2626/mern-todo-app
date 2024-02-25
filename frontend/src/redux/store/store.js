import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../slice/user.slice.js";
import loadingReducers from "../slice/loading.slice.js";
import taskReducers from "../slice/task.slice.js";

const store = configureStore({
   reducer: {
      user: userReducers,
      loading: loadingReducers,
      task: taskReducers,
   },
});

export default store;
