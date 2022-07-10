import { createSlice } from "@reduxjs/toolkit";

const name = "common";

const initialState = {
  isCallingApi: false,
  isLoading: false,
  error: null,
};

const reducers = {
  request: (state) => ({
    ...state,
    isCallingApi: true,
    isLoading: false,
    error: null,
  }),
  requestWithLoading: (state) => ({
    ...state,
    isCallingApi: true,
    isLoading: true,
    error: null,
  }),
  setter: (state, action) => ({ ...state, ...action.payload }),
  reset: () => initialState,
};

const commonSlice = createSlice({ name, initialState, reducers });

const getter = (state) => state.common;

const mutators = commonSlice.actions;

export { getter, mutators };

export default commonSlice.reducer;
