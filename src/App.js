import ScrollTop from 'components/ScrollTop';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';
import ThemeCustomization from 'assets/themes/index';
import GenerateQrCode from 'security/qrCode/GenerateQrCode';
import ChangePasswordComp from 'security/forgetPassword/ResetPasswordComp';
import ResetPasswordComp from 'security/forgetPassword/ResetPasswordComp';
import ChangeTemporaryPasswordComp from 'security/changePassword/ChangeTemporaryPasswordComp';
import AuthRegister from 'security/signUp/SignUp';
import Review from 'security/review/DisplayReview';
import DisplayCategories from 'security/categories/displayCategories';
import DisplayTables from 'security/tables/displayTables';
import DisplayStocks from 'security/stocks/displayStocks';
import DisplayFood from 'security/food/displayFood';

const DashboardDefault = Loadable(lazy(() => import('dashboard')));
const AuthLogin = Loadable(lazy(() => import('security/login/login')));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<DashboardDefault />} index />
        <Route path="/generate-qr-code" element={<GenerateQrCode />} />
        <Route path="/review" element={<Review />} />
        <Route path="/food" element={<DisplayFood />} />
        <Route path="/category" element={<DisplayCategories />} />
        <Route path="/table" element={<DisplayTables />} />
        <Route path="/stock" element={<DisplayStocks />} />
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
