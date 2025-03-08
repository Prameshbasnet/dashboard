import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance;

export const fetchFoods = createAsyncThunk('foods/fetch', async (__, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/foods`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addFood = createAsyncThunk('foods/add', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/foods`, data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editFood = createAsyncThunk('foods/edit', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/foods/${data.id}`, data.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteFood = createAsyncThunk('foods/delete', async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/foods/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});
const foodSlice = createSlice({
  name: 'food',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      return action.payload.data;
    });
  }
});

export const selectAllFoods = (state) => state.food;
const { reducer } = foodSlice;
export default reducer;
