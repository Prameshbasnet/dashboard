import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getAxiosInstance } from "store/axios/AxiosInstance";

const AxiosInstance = getAxiosInstance("identityUrl");

export const loginUser = createAsyncThunk("auth/loginUser", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/Auth`, values);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || ""
  
  },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("userName", action.payload.userName);
      state.userName = action.payload.userName;
    },
    signOut: (state) => {
      state.token = "";
      state.modulePermissions = [];
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { saveToken, saveModulePermissions, signOut } = authSlice.actions;
export default authSlice.reducer;
