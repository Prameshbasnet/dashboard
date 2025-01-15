import React, { useState } from 'react';
import Toast from 'components/Toast';
import ChangePasswordForm from './ChangePasswordForm';
import LoginCurve from '../../assets/images/Login/curve.png';
import PoweredByLogo from '../../assets/images/Login/logo.png';
import logo from '../../../src/assets/images/logo/logo.png';
import EfcuImage from '../../assets/images/Login/login.svg';

const ResetPasswordComp = () => {
  const [openToast, setOpenToast] = useState(false);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div className="loginbackground relative">
      <div className="md:hidden clientimg">
        <img src={logo} alt="clientlogo" />
      </div>
      <div className=" loginshadow">
        <div className="logingrid">
          <div className="leftsection">
            <div className="clientimg">
              <img src={logo} alt="clientlogo" />
            </div>
            <div className="textalignment">
              <div className="loginflex">
                <div className="topheadertext">Welcome Back</div>
                <div className="text-[#595959] self-stretch text-[12px] font-[400] leading-[20.13px]  text-center">
                  ---- EFCU Admin Panel ---
                </div>
              </div>
              <div className="productimage w-80">
                <img src={EfcuImage} alt="productimage" />
              </div>
            </div>
            <div className="logincurve">
              <img src={LoginCurve} alt="curve" />
            </div>
          </div>
          <div className="rightsection">
            <>
              <ChangePasswordForm />
            </>
            <div className="poweredby">
              <span className="poweredtext">Powered by:</span>
              <div>
                <img src={PoweredByLogo} alt="poweredby" className="poweredimg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-footer-mobile login-footer">© Copyright {new Date().getFullYear()} Pramesh Basnet</div>
      <Toast open={openToast} onClose={handleCloseToast} />
    </div>
  );
};

export default ResetPasswordComp;
