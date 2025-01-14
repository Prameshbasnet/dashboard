import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAxiosInstance } from 'store/axios/AxiosInstance';
const AxiosInstance = getAxiosInstance("apiUrl");

// Async thunk to handle the forgot password request
export const requestRestPassword = createAsyncThunk(
  'auth/requestRestPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/auth/forgot-password', {
        email: payload.email,  // Assuming the API expects "email" field
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Something went wrong. Please try again.');
    }
  }
);

// Async thunk to handle the change password request
export const changeForgotPassword = createAsyncThunk(
  'auth/changeForgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/auth/change-forgot-password', {
        email: payload.email,
        confirmationCode: payload.confirmationCode,
        newPassword: payload.newPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Something went wrong. Please try again.');
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling requestRestPassword
      .addCase(requestRestPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(requestRestPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Password reset request successful. Please check your email.";
      })
      .addCase(requestRestPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling changeForgotPassword
      .addCase(changeForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Password changed successfully. Please log in with your new password.";
      })
      .addCase(changeForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resetPasswordSlice.reducer;
