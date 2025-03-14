import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance('apiUrl');

export const fetchTables = createAsyncThunk('tables/fetch', async (__, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/tables`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addTable = createAsyncThunk('tables/add', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/tables`, data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editTable = createAsyncThunk('tables/edit', async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/tables/${data.id}`, data.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTable = createAsyncThunk('tables/delete', async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/tables/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const tablesSlice = createSlice({
  name: 'tables',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTables.fulfilled, (state, action) => {
        return action.payload.data;
      })
      .addCase(addTable.fulfilled, (state, action) => {
        state.push(action.payload.data);
      });
  }
});

export const selectAllTables = (state) => state.table;
const { reducer } = tablesSlice;
export default reducer;
