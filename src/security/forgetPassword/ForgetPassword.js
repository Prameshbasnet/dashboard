import React, { useState } from 'react';
import { InputLabel, OutlinedInput, FormControl, Button, FormHelperText } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Toast from 'components/Toast'; // Import the Toast component
import { requestRestPassword } from 'store/slice/resetPassword';

const validationSchema = Yup.object({
  Email: Yup.string().email('Invalid email address').required('Email is required')
});

const ForgetPassword = ({ handleShowPassword }) => {
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');

  const handleResetPassword = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(requestRestPassword(values))
      .unwrap()
      .then(() => {
        setToastSeverity('success');
        setToastMessage('Password reset request successful. Please check your email.');
        setOpenToast(true);
        setTimeout(() => {
          handleShowPassword(false);
        }, 5000);
      })
      .catch((error) => {
        setToastSeverity('error');
        setToastMessage(error || 'Failed to reset password. Please try again.');
        setOpenToast(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div className="logintitle" style={{ fontSize: '24px' }}>
        Reset Password
      </div>
      <div className="formcomponent">
        <Formik initialValues={{ Email: '' }} validationSchema={validationSchema} onSubmit={handleResetPassword}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <FormControl fullWidth={true} error={Boolean(errors.Email && touched.Email)}>
                <InputLabel htmlFor="Email">Email</InputLabel>
                <Field as={OutlinedInput} id="Email" name="Email" type="email" placeholder="Enter your email" />
                {errors.Email && touched.Email && <FormHelperText error>{errors.Email}</FormHelperText>}
              </FormControl>
              <div className="mt-6 rounded-[10px]">
                <Button fullWidth size="large" type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Reset Password
                </Button>
              </div>
              <div className="mt-4 text-center">
                <Button onClick={() => handleShowPassword(false)}>Back to Login</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Toast open={openToast} onClose={() => setOpenToast(false)} severity={toastSeverity} message={toastMessage} />
    </div>
  );
};

ForgetPassword.propTypes = {
  handleShowPassword: PropTypes.func.isRequired
};

export default ForgetPassword;
