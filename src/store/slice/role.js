import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { getAxiosInstance } from 'store/axios/AxiosInstance';

const AxiosInstance = getAxiosInstance('authUrl');

export const fetchRoles = createAsyncThunk('roles/fetch', async (__, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/roles`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addRole = createAsyncThunk('roles/add', async (userData, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/roles`, userData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editRole = createAsyncThunk('roles/edit', async ({ id, data }, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/roles/${id}`, data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteRole = createAsyncThunk('roles/delete', async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const roleSlice = createSlice({
  name: 'role',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      return action.payload.data;
    });

    builder.addCase(addRole.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(editRole.fulfilled, (state, action) => {
      const index = state.findIndex((role) => role.id === action.payload.data.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.data
        };
      }
    });

    builder.addCase(deleteRole.fulfilled, (state, action) => {
      const index = state.findIndex((role) => role.id === action.payload.data.id);
      state.splice(index, 1);
    });
  }
});

export const selectAllRole = (state) => state.role;

const { reducer } = roleSlice;
export default reducer;
