import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchPromoCode = createAsyncThunk("promocode/fetch", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/promo-codes`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addPromoCode = createAsyncThunk("promocode/add", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/promo-codes`, values);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editPromoCode = createAsyncThunk("promocode/edit", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/promo-codes/${values.id}`, values.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletePromoCode = createAsyncThunk("promocode/delete", async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/promo-codes/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const promocodeSlice = createSlice({
  name: "promocode",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPromoCode.fulfilled, (state, action) => {
      return action.payload.data;
    });

    builder.addCase(addPromoCode.fulfilled, (state, action) => {
      state.push(action.payload.data);
    });

    builder.addCase(editPromoCode.fulfilled, (state, action) => {
      const index = state.findIndex((branch) => branch.id === action.payload.data.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.data
        };
      }
    });

    builder.addCase(deletePromoCode.fulfilled, (state, action) => {
      const index = state.findIndex((branch) => branch.id === action.payload.data.id);
      state.splice(index, 1);
    });
  }
});

export const selectAllPromoCode = (state) => state.promocode;

const { reducer } = promocodeSlice;
export default reducer;
