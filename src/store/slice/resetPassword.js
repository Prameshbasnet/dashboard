/*eslint-disable*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance('identityUrl');

export const requestRestPassword = createAsyncThunk('reqestResetPassword/fetch', async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/reset-password`, values);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const postResetPassword = createAsyncThunk('reset-password/post', async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/reset-password/reset`, values);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const requestRestPasswordSlice = createSlice({
  name: 'requestRestPasswordSlice',
  initialState: [],
  reducers: {},
  extraReducers(builder) {}
});

export const selectAllKiosk = (state) => state.kiosk;

const { reducer } = requestRestPasswordSlice;
export default reducer;
