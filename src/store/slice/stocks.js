import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance('apiUrl');

export const fetchStocks = createAsyncThunk('stocks/fetch', async (__, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/stocks`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addStock = createAsyncThunk('stocks/add', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/stocks`, data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editStock = createAsyncThunk('stocks/edit', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/stocks/${data.id}`, data.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteStock = createAsyncThunk('stocks/delete', async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/stocks/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStocks.fulfilled, (state, action) => {
      return action.payload.data;
    });
  }
});

export const selectAllStocks = (state) => state.stock;
const { reducer } = stocksSlice;
export default reducer;
