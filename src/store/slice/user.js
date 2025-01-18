import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getAxiosInstance } from "store/axios/AxiosInstance";

const AxiosInstance = getAxiosInstance("identityUrl");

export const fetchAllUsers = createAsyncThunk("users/fetch", async (bodyData, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/users`, bodyData);
    return response?.data?.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const addUser = createAsyncThunk("users/add", async (userData, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/users`, userData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editUser = createAsyncThunk("users/edit", async ({ id, userData }, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk("users/delete", async (userId, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { data: [] },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload.id);
      });
  }
});

export const selectAllUsers = (state) => state.user.data;

const { reducer } = userSlice;
export default reducer;
