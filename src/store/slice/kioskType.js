import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getAxiosInstance } from "store/axios/AxiosInstance";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchKioskType = createAsyncThunk("kioskType/fetch", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/kiosk-type`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const kioskTypeSlice = createSlice({
  name: "kioskType",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchKioskType.fulfilled, (state, action) => {
      return action.payload.data;
    });
  }
});

export const selectAllKioskType = (state) => state.kioskType;

const { reducer } = kioskTypeSlice;
export default reducer;
