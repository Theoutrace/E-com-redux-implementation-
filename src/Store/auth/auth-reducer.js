import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { login: false, email: null, idToken: null },
  reducers: {
    login(state, action) {
      state.login = true;
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
    },

    logout(state) {
      state.login = false;
      state.email = null;
      state.idToken = null;
    },
  },
});


export const authReducer = authSlice.actions
export default authSlice.reducer