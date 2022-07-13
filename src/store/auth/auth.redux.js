import { createSlice } from "@reduxjs/toolkit";
import { KeyConstant } from "../../const";
import { getStorage } from "../../helpers";

const name = "auth";

const initialState = {
  isLoggedIn: Boolean(getStorage(KeyConstant.LOCAL_STORAGE.authorize)),
  token: getStorage(KeyConstant.LOCAL_STORAGE.authorize),
};

const reducers = {
  login: (state, action) => ({
    ...state,
    isLoggedIn: true,
    token: action.payload.token,
  }),

  logout: (state) => ({
    ...state,
    isLoggedIn: false,
    token: null,
  }),
};

const authSlice = createSlice({ name, initialState, reducers });

const mutators = authSlice.actions;

const getter = (state) => state.auth;

export { mutators, getter };

export default authSlice.reducer;
