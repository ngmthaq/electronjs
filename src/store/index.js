import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common/common.redux";
import authReducer from "./auth/auth.redux";

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
  },
});

export default store;
