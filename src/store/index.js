import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import menuReducer from './slice/menu';
import roleReducer from './slice/role';
import permissionsReducer from './slice/module_permission';
import { changePassword } from './slice/change-password';
import dashboardReducer from './slice/dashboard';
import restPasswordReducer from './slice/resetPassword';
import reviewReducer from './slice/review';

const reducer = {
  auth: authReducer,
  menu: menuReducer,
  role: roleReducer,
  permissions: permissionsReducer,
  changePassword: changePassword,
  dashboard: dashboardReducer,
  resetPassword: restPasswordReducer,
  review: reviewReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
