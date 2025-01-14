import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance("identityUrl");

// Async thunk to handle the change password request
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (payload, thunkAPI) => {
    try {
      const response = await AxiosInstance.post('/auth/change-password', {
        email: payload.email,
        temporaryPassword: payload.temporaryPassword,
        newPassword: payload.newPassword,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        'Something went wrong. Please try again.';
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || 'Password change successful.';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default changePasswordSlice.reducer;
