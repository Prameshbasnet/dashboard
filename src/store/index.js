import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import menuReducer from './slice/menu';
import permissionsReducer from './slice/module_permission';
import { changePassword } from './slice/change-password';
import dashboardReducer from './slice/dashboard';
import restPasswordReducer from './slice/resetPassword';
import reviewReducer from './slice/review';
import foodReducer from './slice/food';
import categoryReducer from './slice/categories';
import tableReducer from './slice/tables';
import stockReducer from './slice/stocks';

const reducer = {
  auth: authReducer,
  menu: menuReducer,
  permissions: permissionsReducer,
  changePassword: changePassword,
  dashboard: dashboardReducer,
  resetPassword: restPasswordReducer,
  review: reviewReducer,
  food: foodReducer,
  category: categoryReducer,
  table: tableReducer,
  stock: stockReducer
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
