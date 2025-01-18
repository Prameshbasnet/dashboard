import { Outlet, Navigate } from "react-router-dom";
import { checkIsAuthorized } from "utils/checkIsAuthorized";

const AuthorizedRoute = ({ allModulePerms, moduleName, permissionName = "CanView" }) => {
  const isAuthorized = checkIsAuthorized(allModulePerms, moduleName, permissionName);

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default AuthorizedRoute;
