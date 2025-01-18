import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { getAxiosInstance } from "store/axios/AxiosInstance";

const AxiosInstance = getAxiosInstance("apiUrl");
const BANK_NAME = process.env.REACT_APP_BANK_NAME;

export const fetchNormalChequeBulkImporter = createAsyncThunk("normalChequeBulkImporter/fetch", async (kioskId, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/bulk-importer/get-nomal-cheque/${kioskId}`);

    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchExpressChequeBulkImporter = createAsyncThunk("expressChequeBulkImporter/fetch", async (kioskId, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/bulk-importer/get-express-cheque/${kioskId}`);

    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchBanksOwnChequeImporter = createAsyncThunk("banksOwnChequeImporter/fetch", async (kioskId, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/bulk-importer/get-own-cheque/${kioskId}`);

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

export const editBulkImportCheque = createAsyncThunk("BulkImportChequench/edit", async (values, thunkAPI) => {
  try {
    let response;
    if (BANK_NAME === "NIMB") {
      response = await AxiosInstance.put(`/bulk-importer/approve-cheque/${values.id}`, values.values);
    } else {
      response = await AxiosInstance.put(`/bulk-importer/update-cheque-data/${values.id}`, values.values);
    }

    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const requestDownloadFile = createAsyncThunk("requestdownloadZipFile/post", async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/bulk-importer/get-data-for-download`, data);

    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const downloadFile1 = createAsyncThunk("downloadZipFile/post", async (data, thunkAPI) => {
  try {
    const response = await AxiosInstance.post(`/bulk-importer/download-zip-file`, data);

    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const downloadFile = createAsyncThunk("downloadZipFile/post", async (data, thunkAPI) => {
  try {
    const config = {
      responseType: "blob"
    };
    const response = await AxiosInstance.post(`/bulk-importer/download-zip-file`, data, config);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", data?.fileName);
    document.body.appendChild(link);
    link.click();
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

//get image by id
export const fetchChequeDetailById = createAsyncThunk("chequeDetailById/fetch", async (chequeId, thunkAPI) => {
  try {
    const response = await AxiosInstance.get(`/bulk-importer/get-image-show/${chequeId}`);

    return { ...response.data };
  } catch (error) {
    const message = (error.response && error.response.data.data) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

const bulkImporterSlice = createSlice({
  name: "bulkImporter",
  initialState: {
    normalCheque: [],
    expressCheque: [],
    banksOwnCheque: [],
    chequeDetailById: {}
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNormalChequeBulkImporter.fulfilled, (state, action) => {
      state.normalCheque = action.payload.data;
    });

    builder.addCase(fetchExpressChequeBulkImporter.fulfilled, (state, action) => {
      state.expressCheque = action.payload.data;
    });

    builder.addCase(fetchBanksOwnChequeImporter.fulfilled, (state, action) => {
      state.banksOwnCheque = action.payload.data;
    });

    builder.addCase(fetchChequeDetailById.fulfilled, (state, action) => {
      state.chequeDetailById = action.payload.data;
    });
  }
});

const { reducer } = bulkImporterSlice;
export default reducer;
