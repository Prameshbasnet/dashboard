import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchDashboard = createAsyncThunk("dashboard/fetch", async (thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/dashboard`);
    return response.data.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { data: [], error: null },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export const selectDashboardData = (state) => state.dashboard.data;

const { reducer } = dashboardSlice;
export default reducer;
