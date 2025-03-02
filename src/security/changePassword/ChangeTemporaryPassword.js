import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../store/slice/change-password';
import Toast from 'components/Toast';
import { InputLabel, OutlinedInput, FormControl, Button, FormHelperText } from '@mui/material';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  temporaryPassword: Yup.string().required('Temporary password is required'),
  newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const ChangePasswordForm = () => {
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePassword = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const payload = {
        email: values.email,
        temporaryPassword: values.temporaryPassword,
        newPassword: values.newPassword
      };

      await dispatch(changePassword(payload)).unwrap();
      setToastMessage('Password change successful.');
      setToastSeverity('success');
      setOpenToast(true);
      navigate('/login');
    } catch (error) {
      const errorMessage = error?.message || 'Oops, an error occurred. Please try again later.';
      setToastMessage(errorMessage);
      setToastSeverity('error');
      setOpenToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="logintitle" style={{ fontSize: 24 }}>
        Change Password
      </div>
      <div className="formcomponent">
        <Formik
          initialValues={{ email: '', temporaryPassword: '', newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {[
                { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email' },
                { name: 'temporaryPassword', type: 'password', label: 'Temporary Password', placeholder: 'Enter your temporary password' },
                { name: 'newPassword', type: 'password', label: 'New Password', placeholder: 'Enter your new password' },
                { name: 'confirmPassword', type: 'password', label: 'Confirm New Password', placeholder: 'Confirm your new password' }
              ].map(({ name, type, label, placeholder }) => (
                <FormControl key={name} fullWidth error={Boolean(errors[name] && touched[name])} sx={{ marginTop: 2 }}>
                  <InputLabel htmlFor={name}>{label}</InputLabel>
                  <Field as={OutlinedInput} id={name} name={name} type={type} placeholder={placeholder} />
                  {errors[name] && touched[name] && <FormHelperText>{errors[name]}</FormHelperText>}
                </FormControl>
              ))}

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ marginTop: 2 }}
              >
                Change Password
              </Button>

              <div className="mt-4 text-center">
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Toast open={openToast} onClose={() => setOpenToast(false)} severity={toastSeverity} message={toastMessage} />
    </div>
  );
};

ChangePasswordForm.propTypes = {
  handleShowPassword: PropTypes.func
};

export default ChangePasswordForm;
