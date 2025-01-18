import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("identityUrl");

export const changePassword = createAsyncThunk("auth/changePassword", async (passwordData, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/auth/change-password`, passwordData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    throw new Error(message);
  }
});

const passwordSlice = createSlice({
  name: "password",
  initialState: { success: false, error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changePassword.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const selectChangePasswordSuccess = (state) => state.password.success;
export const selectChangePasswordError = (state) => state.password.error;

const { reducer } = passwordSlice;
export default reducer;
