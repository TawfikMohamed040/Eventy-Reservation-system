import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
}; 

const credentialSlice = createSlice({
  name: "credentials",
  initialState, 
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    }
  },
});

export const { setCredentials, logout } = credentialSlice.actions;
export default credentialSlice.reducer;
