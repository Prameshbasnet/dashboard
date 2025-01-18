import React, { useState } from 'react';
import Toast from 'components/Toast';
import NIMB_logo from '../../../src/assets/images/TU.png';
import siddhartha_logo from '../../../src/assets/images/TU.png';
import Machha_Puchre_logo from '../../../src/assets/images/TU.png';
import ChangePasswordForm from './ChangePasswordForm';
import ProductImage from '../../assets/images/Login/logo.png';
import LoginCurve from '../../assets/images/Login/curve.png';
import PoweredByLogo from '../../assets/images/Login/gentech.png';

const BANK_NAME = process.env.REACT_APP_BANK_NAME;

const ResetPasswordComp = () => {
  const [openToast, setOpenToast] = useState(false);

  const logo = BANK_NAME === 'NIMB' ? NIMB_logo : BANK_NAME === 'MACHHA_PUCHCHHRE' ? Machha_Puchre_logo : siddhartha_logo;

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
                  Self-service machine for banking transactions.
                </div>
              </div>
              <div className="producttext">
                <h1 className="productdesigntext">KIOSK</h1>
              </div>
              <div className="productimage">
                <img src={ProductImage} alt="productimage" />
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
