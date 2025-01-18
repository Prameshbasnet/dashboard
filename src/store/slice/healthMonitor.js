import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getAxiosInstance } from "store/axios/AxiosInstance";

const AxiosInstance = getAxiosInstance("apiUrl");

export const fetchKioskAllDeviceHealthStatus = createAsyncThunk("devicehealthStatus/fetch", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/health-monitor/get-kiosk-device-health-status`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDeviceHealthStatusDetailById = createAsyncThunk("devicehealthStatusById/fetch", async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/health-monitor/get-kiosk-device-health?id=${id}`);
    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const addhealthMonitor = createAsyncThunk("healthMonitor/add", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/health-monitor`, values);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const edithealthMonitor = createAsyncThunk("healthMonitor/edit", async (values, thunkAPI) => {
  try {
    const response = await AxiosInstance.put(`/health-monitor/${values.id}`, values.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletehealthMonitor = createAsyncThunk("healthMonitor/delete", async (id, thunkAPI) => {
  try {
    const response = await AxiosInstance.delete(`/health-monitor/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const healthMonitorSlice = createSlice({
  name: "healthMonitorStatus",
  initialState: { allKioskDeviceHealthStatus: [], deviceHealthStatusDetailById: {} },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchKioskAllDeviceHealthStatus.fulfilled, (state, action) => {
      state.allKioskDeviceHealthStatus = action.payload.data;
    });

    builder.addCase(getDeviceHealthStatusDetailById.fulfilled, (state, action) => {
      state.deviceHealthStatusDetailById = action.payload.data;
    });
    builder.addCase(edithealthMonitor.fulfilled, (state, action) => {
      const index = state.findIndex((healthMonitor) => healthMonitor.id === action.payload.data.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.data
        };
      }
    });

    builder.addCase(deletehealthMonitor.fulfilled, (state, action) => {
      const index = state.findIndex((healthMonitor) => healthMonitor.id === action.payload.data.id);
      state.splice(index, 1);
    });
  }
});

export const selectAllhealthMonitor = (state) => state.healthMonitor.allKioskDeviceHealthStatus;

const { reducer } = healthMonitorSlice;
export default reducer;
