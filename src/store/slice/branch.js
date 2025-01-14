import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchBranch = createAsyncThunk("branch/fetch", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/branch`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addBranch = createAsyncThunk("branch/add", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/branch`, values);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editBranch = createAsyncThunk("branch/edit", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/branch/${values.id}`, values.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteBranch = createAsyncThunk("branch/delete", async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/branch/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const BranchSlice = createSlice({
  name: "branch",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBranch.fulfilled, (state, action) => {
      return action.payload.data;
    });

    builder.addCase(addBranch.fulfilled, (state, action) => {
      state.push(action.payload.data);
    });

    builder.addCase(editBranch.fulfilled, (state, action) => {
      const index = state.findIndex((branch) => branch.id === action.payload.data.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.data
        };
      }
    });

    builder.addCase(deleteBranch.fulfilled, (state, action) => {
      const index = state.findIndex((branch) => branch.id === action.payload.data.id);
      state.splice(index, 1);
    });
  }
});

export const selectAllBranch = (state) => state.branch;
const { reducer } = BranchSlice;
export default reducer;
