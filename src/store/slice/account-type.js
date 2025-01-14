import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchAccountType = createAsyncThunk("accounttype/fetch", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/account-type`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});



const accountTypeSlice = createSlice({
  name: "accounttype",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAccountType.fulfilled, (state, action) => {
      return action.payload.data;
    });

  }
});

export const selectAllAccountType = (state) => state.accounttype;

const { reducer } = accountTypeSlice;
export default reducer;
