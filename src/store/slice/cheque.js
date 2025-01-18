import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  { getAxiosInstance, getAccessToken } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchCheques = createAsyncThunk("cheques/fetch", async (bodyData, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/reports/cheques`, bodyData);
    return response.data.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const downloadExcel = createAsyncThunk("cheques/downloadExcel", async (bodyData, thunkAPI) => {
  try {
    const token = getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: "blob"
    };
    const response = await AxiosInstance.post(`/reports/cheques/export-to-excel`, bodyData, config);

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "cheque_data.xlsx");
    document.body.appendChild(link);
    link.click();

    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

const chequeSlice = createSlice({
  name: "cheque",
  initialState: { data: [] },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCheques.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

// Selector function to select all cheque data from the state
export const selectAllCheque = (state) => state.cheque.data;

const { reducer } = chequeSlice;
export default reducer;
