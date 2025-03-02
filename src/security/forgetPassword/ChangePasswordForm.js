import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postResetPassword } from 'store/slice/resetPassword';
import Toast from 'components/Toast';
import { InputLabel, OutlinedInput, FormControl, Button, FormHelperText } from '@mui/material';

const validationSchema = Yup.object({
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const ChangePasswordForm = () => {
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleChangePassword = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await dispatch(postResetPassword(values)).unwrap();
      setToastMessage('Password Reset Successful');
      setToastSeverity('success');
      setOpenToast(true);
      navigate('/login');
    } catch (error) {
      setToastMessage('Oops, an error occurred. Please try again later.');
      setToastSeverity('error');
      setOpenToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="logintitle">Change Password</h2>
      <div className="formcomponent">
        <Formik
          initialValues={{ token, password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {[
                { name: 'password', label: 'New Password', type: 'password', placeholder: 'Enter your new password' },
                { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your new password' }
              ].map(({ name, label, type, placeholder }) => (
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
