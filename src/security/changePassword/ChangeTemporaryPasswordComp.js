import React, { useState } from 'react';
import Toast from 'components/Toast';
import LoginCurve from '../../assets/images/Login/curve.png';
import PoweredByLogo from '../../assets/images/Login/logo.png';
import logo from '../../../src/assets/images/logo/logo.png';
import ChangeTemporaryPassword from './ChangeTemporaryPassword';
import Image from '../../assets/images/Login/login.svg';

const ChangeTemporaryPasswordComp = () => {
  const [openToast, setOpenToast] = useState(false);

  return (
    <div className="loginbackground relative">
      {/* Mobile Client Logo */}
      <div className="md:hidden clientimg">
        <img src={logo} alt="Client company logo" />
      </div>

      <div className="loginshadow">
        <div className="logingrid">
          {/* Left Section */}
          <div className="leftsection">
            <div className="clientimg">
              <img src={logo} alt="Client company logo" />
            </div>
            <div className="textalignment">
              <div className="loginflex">
                <div className="topheadertext">Welcome Back</div>
                <div className="text-[#595959] self-stretch text-[12px] font-[400] leading-[20.13px] text-center">Admin</div>
              </div>
              <div className="productimage w-80">
                <img src={Image} alt="Illustration representing login access" />
              </div>
            </div>
            <div className="logincurve">
              <img src={LoginCurve} alt="Decorative curved design" />
            </div>
          </div>

          {/* Right Section */}
          <div className="rightsection">
            <ChangeTemporaryPassword />

            <div className="poweredby">
              <span className="poweredtext">Powered by:</span>
              <div>
                <img src={PoweredByLogo} alt="Company branding logo" className="poweredimg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="login-footer-mobile login-footer">© Copyright {new Date().getFullYear()} Pramesh Basnet</div>

      {/* Toast Notification */}
      <Toast open={openToast} onClose={() => setOpenToast(false)} />
    </div>
  );
};

export default ChangeTemporaryPasswordComp;
