import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import commonSlice from "./commonSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonSlice,
  },
});
export default store;
