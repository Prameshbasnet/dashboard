import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import menuReducer from './slice/menu';
import roleReducer from './slice/role';
import userReducer from './slice/user';
import permissionsReducer from './slice/module_permission';
import { changePassword } from './slice/change-password';
import dashboardReducer from './slice/dashboard';
import restPasswordReducer from './slice/resetPassword';

const reducer = {
  auth: authReducer,
  menu: menuReducer,
  role: roleReducer,
  user: userReducer,
  permissions: permissionsReducer,
  changePassword: changePassword,
  dashboard: dashboardReducer,
  resetPassword: restPasswordReducer
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
