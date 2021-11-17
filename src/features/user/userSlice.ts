import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../../api/ApiClient";

export const register = createAsyncThunk("user/register", async ({email, name}: {email: string, name: string}) => {
  const userData = await ApiClient.register(email, name);
  return userData;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    name: "",
    slToken: "",
    status: "idle",
    isAuthenticated: false
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.slToken = action.payload.sl_token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state) => {
        state.status = "failed";
      })
  }
});

export default userSlice.reducer;