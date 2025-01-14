import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createIndexedDBStorage from 'redux-persist-indexeddb-storage'; // Import IndexedDB storage
import authReducer from './slice/auth';
import menuReducer from './slice/menu';
import messageReducer from './slice/message';
import permissionsReducer from './slice/module_permission';
import dashboardReducer from './slice/dashboard';
import resetPasswordSlice from './slice/resetPassword';
import procodeReducer from './slice/pomocode';
import branchReducer from './slice/branch';

import { combineReducers } from 'redux';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  message: messageReducer,
  permissions: permissionsReducer,
  promocode: procodeReducer,
  branch: branchReducer,
  dashboard: dashboardReducer,
  resetPassword: resetPasswordSlice
});

const storage = createIndexedDBStorage('myIndexedDB');

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

export default store;
