export const checkIsAuthorized = (allModulePerms, moduleName, permissionName = "CanView") => {
  const isPermAvailableList = allModulePerms.filter(
    (item) => item.Module?.toLowerCase() == moduleName?.toLowerCase() && item.Permission?.toLowerCase() == permissionName?.toLowerCase()
  );
  return isPermAvailableList.length > 0 ? true : false;
};