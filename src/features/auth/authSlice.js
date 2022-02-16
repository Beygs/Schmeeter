import { apiSlice } from "features/api/apiSlice";

const { createSlice, createSelector } = require("@reduxjs/toolkit");

const initialState = {
  auth: false,
  id: "",
};

export const selectMeResult = apiSlice.endpoints.getMe.select();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin(state, action) {
      state.auth = true;
      state.id = action.payload.userId;
    },
    authLogout(state, action) {
      state.auth = false;
      state.id = "";
    },
  },
});

export default authSlice.reducer;

export const {
  authLogin,
  authLogout
} = authSlice.actions;

export const selectAuth = (state) => state.auth.auth;
