import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import menuReducer from "./slice/menu";
import roleReducer from "./slice/role";
import messageReducer from "./slice/message";
import chequeReducer from "./slice/cheque";
import kioskReducer from "./slice/kiosks";
import kioskTypeReducer from "./slice/kioskType";
import branchReducer from "./slice/branch";
import userReducer from "./slice/user";
import permissionsReducer from "./slice/module_permission";
import healthMonitorReducer from "./slice/healthMonitor";
import bulkImporterReducer from "./slice/bulkImporterSlice";
import { changePassword } from "./slice/change-password";
import dashboardReducer from "./slice/dashboard";
import sliderImageReducer from "./slice/sliderImage";
import restPasswordReducer from "./slice/resetPassword";

const reducer = {
  auth: authReducer,
  menu: menuReducer,
  role: roleReducer,
  message: messageReducer,
  cheque: chequeReducer,
  user: userReducer,
  permissions: permissionsReducer,
  kiosk: kioskReducer,
  kioskType: kioskTypeReducer,
  branch: branchReducer,
  healthMonitor: healthMonitorReducer,
  bulkImporter: bulkImporterReducer,
  changePassword: changePassword,
  dashboard: dashboardReducer,
  sliderImage: sliderImageReducer,
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
