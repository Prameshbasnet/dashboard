import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../axios/AxiosInstance";
import { setMessage } from "./message";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchSliderImagesByKioskId = createAsyncThunk("slider-images/fetch", async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/slider-image/kiosk-id?id=${id}`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addSliderImages = createAsyncThunk("slider-images/add", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/slider-image?kioskId=${values.id}`, values.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const editSliderImages = createAsyncThunk("slider-images/edit", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/slider-image/${values.id}`, values.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteSliderImages = createAsyncThunk("slider-images/delete", async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/slider-image/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const sliderImageSlice = createSlice({
  name: "slider-images",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSliderImagesByKioskId.fulfilled, (state, action) => {
      return action.payload.data;
    });

    builder.addCase(addSliderImages.fulfilled, (state, action) => {
      state.push(action.payload.data);
    });

    builder.addCase(editSliderImages.fulfilled, (state, action) => {
      const index = state.findIndex((branch) => branch.id === action.payload.data.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.data
        };
      }
    });

    builder.addCase(deleteSliderImages.fulfilled, (state, action) => {
      const index = state.findIndex((branch) => branch.id === action.payload.data.id);
      state.splice(index, 1);
    });
  }
});

export const selectAllSliderImages = (state) => state.sliderImages;

const { reducer } = sliderImageSlice;
export default reducer;
