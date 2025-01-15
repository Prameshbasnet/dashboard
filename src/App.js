import ScrollTop from 'components/ScrollTop';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';
import ThemeCustomization from 'assets/themes/index';
import { useSelector } from 'react-redux';
import AuthorizedRoute from 'store/axios/AuthorizedRoute';
import AccountSettings from 'security/settings/AccountSettings';
import ChangePasswordComp from 'security/forgetPassword/ResetPasswordComp';
import ResetPasswordComp from 'security/forgetPassword/ResetPasswordComp';
import ChangeTemporaryPasswordComp from 'security/changePassword/ChangeTemporaryPasswordComp';
import SuperAdminRoute from 'utils/checkIsSuperAdmin';
import AuthRegister from 'security/signUp/SignUp';

const DashboardDefault = Loadable(lazy(() => import('dashboard')));
const AuthLogin = Loadable(lazy(() => import('security/login/login')));

const AppRoutes = () => {
  const allModulePerms = useSelector((state) => state?.auth?.permissions);
  const moduleName = useSelector((state) => state?.auth?.role);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<DashboardDefault />} index />
        <Route element={<AuthorizedRoute allModulePerms={allModulePerms} moduleName={moduleName} />}>
          <Route element={<SuperAdminRoute moduleName={moduleName} />}>
            <Route path="/account-settings" element={<AccountSettings />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/reset-password" element={<ChangePasswordComp />} />
      <Route path="/reset-password/:token" element={<ResetPasswordComp />} />
      <Route path="/change-temporary-password" element={<ChangeTemporaryPasswordComp />} />
      <Route path="/register" element={<AuthRegister />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <AppRoutes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
