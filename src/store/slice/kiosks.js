import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchKiosks = createAsyncThunk("kiosk/fetch", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/kiosk`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addKiosk = createAsyncThunk("kiosk/add", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/kiosk`, values);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editKiosk = createAsyncThunk("kiosk/edit", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/kiosk/${values.id}`, values.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteKiosk = createAsyncThunk("kiosk/delete", async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/kiosk/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const kioskSlice = createSlice({
  name: "kiosk",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchKiosks.fulfilled, (state, action) => {
      return action.payload.data;
    });

    builder.addCase(addKiosk.fulfilled, (state, action) => {
      state.push(action.payload.data);
    });

    builder.addCase(editKiosk.fulfilled, (state, action) => {
      const index = state.findIndex((kiosk) => kiosk.id === action.payload.data.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.data
        };
      }
    });

    builder.addCase(deleteKiosk.fulfilled, (state, action) => {
      const index = state.findIndex((kiosk) => kiosk.id === action.payload.data.id);
      state.splice(index, 1);
    });
  }
});

export const selectAllKiosk = (state) => state.kiosk;

const { reducer } = kioskSlice;
export default reducer;
