import React, { useState } from 'react';
import { InputLabel, OutlinedInput, FormControl, IconButton, InputAdornment, Button, FormHelperText, Grid } from '@mui/material';
import { useFormik } from 'formik';
import Toast from 'components/Toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../../../src/assets/images/logo/logo.png';
import * as Yup from 'yup';
import LoginCurve from '../../assets/images/Login/curve.png';
import PoweredByLogo from '../../assets/images/Login/logo.png';

const AuthSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setToastMessage('Sign up successful');
      setToastSeverity('success');
      setOpenToast(true);
    }
  });

  const { errors, touched, handleChange, handleSubmit, values } = formik;

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
                <div className="topheadertext">Welcome</div>
              </div>
              <div className="producttext">
                <h1 className="productdesigntext">Dashboard</h1>
              </div>
              <div className="productimage w-72">
                <img src={logo} alt="Logo" />
              </div>
            </div>
            <div className="logincurve">
              <img src={LoginCurve} alt="curve" />
            </div>
          </div>
          <div className="rightsection">
            <div className="logintitle">Sign Up!</div>
            <div className="formcomponent">
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="full-name">Full Name</InputLabel>
                    <FormControl fullWidth={true}>
                      <OutlinedInput
                        id="full-name"
                        type="text"
                        value={values.fullName || ''}
                        name="fullName"
                        onChange={handleChange}
                        placeholder="Enter full name"
                        error={touched.fullName && Boolean(errors.fullName)}
                      />
                      {touched.fullName && errors.fullName && <FormHelperText error>{errors.fullName}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="email-signup">Email</InputLabel>
                    <FormControl fullWidth={true}>
                      <OutlinedInput
                        id="email-signup"
                        type="email"
                        value={values.email || ''}
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter email"
                        error={touched.email && Boolean(errors.email)}
                      />
                      {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                    <FormControl fullWidth={true}>
                      <OutlinedInput
                        id="password-signup"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password || ''}
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter password"
                        error={touched.password && Boolean(errors.password)}
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
                      {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="confirm-password-signup">Confirm Password</InputLabel>
                    <FormControl fullWidth={true}>
                      <OutlinedInput
                        id="confirm-password-signup"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={values.confirmPassword || ''}
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirm password"
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                              edge="end"
                              size="small"
                            >
                              {showConfirmPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.confirmPassword && errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>
                <div className="mt-6 rounded-[10px]">
                  <Button fullWidth size="large" type="submit" variant="contained" color="primary" className="loginbutton">
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
            <div className="poweredby">
              <span className="poweredtext">Powered by:</span>
              <div>
                <img src={PoweredByLogo} alt="poweredby" className="poweredimg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-footer-mobile login-footer">© Copyright {new Date().getFullYear()} Pramesh</div>
      <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} />
    </div>
  );
};

export default AuthSignUp;
