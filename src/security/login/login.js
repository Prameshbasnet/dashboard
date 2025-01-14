import React, { useEffect, useState } from 'react';
import EfcuImage from '../../assets/images/Login/login.svg';
import LoginCurve from '../../assets/images/Login/curve.png';
import PoweredByLogo from '../../assets/images/Login/logo.png';
import { InputLabel, OutlinedInput, FormControl, Button, IconButton, InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { signOut } from '../../store/slice/auth';
import Toast from 'components/Toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ForgetPassword from 'security/forgetPassword/ForgetPassword';
import logo from '../../../src/assets/images/logo/logo.png';
import { deleteIndexedDB } from 'utils/deleteIndexDB';

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequestForm, setShowPasswordRequestForm] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  // const [toastMessage, setToastMessage] = useState('');
  const [toastMessage] = useState('');
  // const [toastSeverity, setToastSeverity] = useState('success');
  const [toastSeverity] = useState('success');

  // Commenting out validation schema
  /*
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });
  */

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    // Commenting out validation schema reference
    // validationSchema: validationSchema,
    onSubmit: async () => {
      // Direct login for now without API call or validation
      navigate('/');

      // Commenting out the actual login logic
      /*
      setToastSeverity('info');
      setToastMessage('Logging in...');
      setOpenToast(true);

      try {
        const resultAction = await dispatch(
          loginUser({
            email: values.userName, // Change userName to email for API
            password: values.password
          })
        ).unwrap();
        if (resultAction.code === 422 && resultAction.data == 'New password required.') {
          navigate('/change-temporary-password');
        } else if (resultAction.code === 401 && resultAction.data == 'Incorrect email or password.') {
          setToastMessage('Incorrect email or password.');
          setToastSeverity('error');
        } else {
          setToastMessage('Login successful');
          setToastSeverity('success');
          navigate('/');
        }
      } catch (error) {
        setToastMessage(error || 'Login failed. Please try again.');
        setToastSeverity('error');
      } finally {
        setOpenToast(true);
      }
      */
    }
  });

  useEffect(() => {
    const cleanupAuthState = async () => {
      try {
        await dispatch(signOut());
        await deleteIndexedDB('myIndexedDB'); // Ensure IndexedDB is cleared
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };

    cleanupAuthState(); // Call the cleanup function on mount
  }, [dispatch]);

  const { handleChange, handleSubmit, values } = formik;

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleShowForgetPassword = (bool) => {
    setShowPasswordRequestForm(bool);
  };

  return (
    <div className="loginbackground relative">
      <div className="md:hidden clientimg">
        <img src={logo} alt="clientlogo" />
      </div>
      <div className="loginshadow">
        <div className="logingrid">
          <div className="leftsection">
            <div className="clientimg">
              <img src={logo} alt="clientlogo" />
            </div>
            <div className="textalignment">
              <div className="loginflex">
                <div className="topheadertext">Welcome Back</div>
                <div className="text-[#595959] self-stretch text-[12px] font-[400] leading-[20.13px] text-center">----Admin Panel---</div>
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
            {showPasswordRequestForm ? (
              <ForgetPassword handleShowPassword={handleShowForgetPassword} />
            ) : (
              <>
                <div className="logintitle">Login!</div>
                <div className="formcomponent">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="logincomponent">
                      <InputLabel htmlFor="user-name">User Name</InputLabel>
                      <FormControl fullWidth>
                        <OutlinedInput
                          id="user-name"
                          type="text"
                          value={values.userName || ''}
                          name="userName"
                          onChange={handleChange}
                          placeholder="Enter username"
                          // Commented error validation
                          // error={touched.userName && Boolean(errors.userName)}
                        />
                        {/*
                        {touched.userName && errors.userName && (
                          <FormHelperText error>{errors.userName}</FormHelperText>
                        )}
                        */}
                      </FormControl>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <FormControl fullWidth>
                        <OutlinedInput
                          id="password-login"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password || ''}
                          name="password"
                          onChange={handleChange}
                          placeholder="Enter password"
                          // Commented error validation
                          // error={touched.password && Boolean(errors.password)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {/*
                        {touched.password && errors.password && (
                          <FormHelperText error>{errors.password}</FormHelperText>
                        )}
                        */}
                      </FormControl>
                    </div>
                    <div className="mt-6 rounded-[10px]">
                      <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                        Login
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            )}

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
      <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} />
    </div>
  );
};

export default AuthLogin;
