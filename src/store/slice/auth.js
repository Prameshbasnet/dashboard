import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getAxiosInstance } from "store/axios/AxiosInstance";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

const AxiosInstance = getAxiosInstance();

const initialState = {
  token: "",
  role: "",
  modulePermissions: [
    { Module: "BIN", Permission: "CanView" },
    { Module: "SuperAdmin", Permission: "CanView" },
    { Module: "CDN", Permission: "ExportToExcel" },
    { Module: "BC", Permission: "CanView" },
    { Module: "CS", Permission: "ExportToExcel" },
    { Module: "CDE", Permission: "CanView" },
    { Module: "CS", Permission: "CanView" },
    { Module: "BIN", Permission: "CanView" },
    { Module: "CRenew", Permission: "CanView" },
    { Module: "CDT", Permission: "CanView" },
    { Module: "CR", Permission: "CanView" },
    { Module: "BIN", Permission: "Update" },
    { Module: "SuperAdmin", Permission: "Create" },
    { Module: "Admin", Permission: "CanView"},
    { Module: "KH", Permission: "CanView" },
    { Module: "CNew", Permission: "ExportToExcel" },
    { Module: "CRenew", Permission: "ExportToExcel" },
    { Module: "CDM", Permission: "CanView" },
    { Module: "CDT", Permission: "ExportToExcel" },
    { Module: "CDM", Permission: "ExportToExcel" },
    { Module: "CDE", Permission: "ExportToExcel" },
    { Module: "CReplace", Permission: "CanView" },
    { Module: "CDN", Permission: "CanView" },
    { Module: "Master", Permission: "Update" },
    { Module: "BIE", Permission: "Update" },
    { Module: "ST", Permission: "ExportToExcel" },
    { Module: "BIE", Permission: "CanView" },
    { Module: "BC", Permission: "ExportToExcel" },
    { Module: "BIE", Permission: "ZipFileDownload" },
    { Module: "CR", Permission: "ExportToExcel" },
    { Module: "CReplace", Permission: "ExportToExcel" },
    { Module: "EmailService", Permission: "CanView" },
    { Module: "Admin", Permission: "Delete" },
    { Module: "ST", Permission: "CanView" },
    { Module: "BI", Permission: "ExportToExcel" },
    { Module: "CNew", Permission: "CanView" },
    { Module: "EmailService", Permission: "Update" },
    { Module: "BIN", Permission: "ZipFileDownload" }
    ],
  userName: "",
};

export const loginUser = createAsyncThunk("auth/login", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/auth/login`, values);
    const data = response.data.message;
    const idToken = response.data.data.idToken;
    const accessToken = response.data.data.accessToken;
    const refreshToken = response.data.data.refreshToken;

    if (response.data.code === 422 || response.data.code === 401) {
      return { code: response.data.code, data }; // Return the message directly
    }
  
    // Decode the idToken to get user details and permissions
    const decodedToken = jwtDecode(idToken);
    const role = decodedToken["cognito:groups"] ? decodedToken["cognito:groups"][0] : null;
    const email = decodedToken.email;

    // Save the tokens in cookies and localStorage
    Cookies.set("idToken", idToken);
    Cookies.set("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", role);
    localStorage.setItem("userName", email);
       
    // Dispatch the saveToken action to update the Redux store
    thunkAPI.dispatch(
      saveToken({
        token: accessToken,
        userName: email,
        role,
        permissions: initialState.modulePermissions,
      })
    );
      
    return {
      token: accessToken,
      userName: email,
      role,
      permissions: initialState.modulePermissions,
    };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.permissions = action.payload.permissions;
    },
    signOut: (state) => {
      state.token = "";
      state.role = "";
      state.permissions = [];
      Cookies.remove("idToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.data) {
        // Handle specific cases like "New password required" or "Incorrect email or password"
        state.loginMessage = action.payload.data;
      } else {
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.role = action.payload.role;
        state.permissions = action.payload.permissions;
      }
    });
  },
});

export const { saveToken, signOut } = authSlice.actions;
export default authSlice.reducer;
