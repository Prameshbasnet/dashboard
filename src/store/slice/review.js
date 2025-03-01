import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance('apiUrl');

export const fetchReviews = createAsyncThunk('reviews/fetch', async (__, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/feedbacks`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteReviews = createAsyncThunk('reviews/delete', async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/feedbacks/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});
const reviewSlice = createSlice({
  name: 'review',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      return action.payload.data;
    });
  }
});

export const selectAllReviews = (state) => state.review;

const { reducer } = reviewSlice;
export default reducer;
