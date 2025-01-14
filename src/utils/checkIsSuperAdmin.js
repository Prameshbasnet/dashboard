import { Outlet, Navigate } from 'react-router-dom';

const SuperAdminRoute = ({ moduleName }) => {
  const token = localStorage.getItem('accessToken');

  // Check if the user is a SuperAdmin
  const isSuperAdmin = moduleName === 'SuperAdmin';

  // If no token is found or the user is not a SuperAdmin, redirect to login
  if (!token || !isSuperAdmin) {
    return <Navigate to="/login" />;
  }

  // If token exists and the user is a SuperAdmin, render the Outlet
  return <Outlet />;
};

export default SuperAdminRoute;
