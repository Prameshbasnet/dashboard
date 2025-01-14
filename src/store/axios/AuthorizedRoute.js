/* eslint-disable */
import { Outlet, Navigate } from "react-router-dom";
import { checkIsAuthorized } from "utils/checkIsAuthorized";

const AuthorizedRoute = ({ allModulePerms, moduleName, permissionName = "CanView" }) => {
  const token = localStorage.getItem("accessToken");

  // Check if the user is authorized for the specific module and permission
  const isAuthorized = token && checkIsAuthorized(allModulePerms, moduleName, permissionName);

  // Redirect to login if no token or the user is not authorized
  if (!token || !isAuthorized) {
    return <Navigate to="/login" />;
  }

  // Render child routes if token exists and user is authorized
  return <Outlet />;
};

export default AuthorizedRoute;
