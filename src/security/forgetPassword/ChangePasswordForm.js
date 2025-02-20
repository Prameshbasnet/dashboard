import React, { useState } from 'react';
import { InputLabel, OutlinedInput, FormControl, Button, FormHelperText } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import PropTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useLocation
import { useDispatch } from 'react-redux';
import { postResetPassword } from 'store/slice/resetPassword';
import Toast from 'components/Toast';

// Validation schema using Yup
const validationSchema = Yup.object({
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const ChangePasswordForm = () => {
  const [openToast, setOpenToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const { token } = useParams(); // Get the token from URL params
  const handleChangePassword = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(postResetPassword(values))
      .unwrap()
      .then(() => {
        setToastMessage('Password Reset Successful');
        setToastSeverity('success');
        setOpenToast(true);
        navigate('/login');
      })
      .catch(() => {
        setToastMessage(' Opps error occured . Please Try Again later');
        setToastSeverity('error');
        setOpenToast(true);
      });
    setSubmitting(false);
  };
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div>
      <div className="logintitle" style={{ fontSize: '24px' }}>
        Change Password
      </div>
      <div className="formcomponent">
        <Formik
          initialValues={{ token: token, password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <FormControl fullWidth={true} error={Boolean(errors.password && touched.password)}>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <Field as={OutlinedInput} id="password" name="password" type="password" placeholder="Enter your new password" />
                {errors.password && touched.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </FormControl>

              <FormControl
                fullWidth={true}
                error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                style={{ marginTop: '20px' }}
              >
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                />
                {errors.confirmPassword && touched.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
              </FormControl>

              <div className="mt-6 rounded-[10px]">
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  style={{ marginTop: '20px' }}
                >
                  Change Password
                </Button>
              </div>
              <div className="mt-4 text-center">
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} />
    </div>
  );
};

ChangePasswordForm.propTypes = {
  handleShowPassword: PropTypes.func.isRequired
};

export default ChangePasswordForm;
