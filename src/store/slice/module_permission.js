import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getAxiosInstance } from "store/axios/AxiosInstance";

const AxiosInstance = getAxiosInstance("identityUrl");

export const getModulePermissions = createAsyncThunk("permissions/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/module-permissions`);
    return response.data.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: { data: [] },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getModulePermissions.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export const selectModulePermissions = (state) => state.permissions.data;

const { reducer } = permissionsSlice;
export default reducer;
