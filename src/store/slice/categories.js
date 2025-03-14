import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance('apiUrl');

export const fetchCategories = createAsyncThunk('categories/fetch', async (__, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addCategory = createAsyncThunk('categories/add', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/categories`, data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editCategory = createAsyncThunk('categories/edit', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/categories/${data.id}`, data.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const categorySlice = createSlice({
  name: 'category',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload.data;
    });
  }
});

export const selectAllCategories = (state) => state.category;
const { reducer } = categorySlice;
export default reducer;
