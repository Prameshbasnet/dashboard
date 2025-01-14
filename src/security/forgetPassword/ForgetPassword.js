import React, { useState } from "react";
import { InputLabel, OutlinedInput, FormControl, Button, FormHelperText } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Toast from "components/Toast"; // Import the Toast component
import { requestRestPassword } from "store/slice/resetPassword"; // Import the reset password slice
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required")
});

const ForgetPassword = ({ handleShowPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("error");
  const [isRequestInProgress, setIsRequestInProgress] = useState(false); // Track if a request is in progress

  const handleResetPassword = (values, { setSubmitting }) => {
    if (isRequestInProgress) return; // Prevent multiple submissions

    setIsRequestInProgress(true);
    setSubmitting(true);

    dispatch(requestRestPassword(values))
      .unwrap()
      .then(() => {
        setToastSeverity("success");
        setToastMessage("Password reset request successful. Please check your email.");
        setOpenToast(true);
        setTimeout(() => {
          navigate("/reset-password"); // Navigate to the reset password page
        }, 3000);
      })
      .catch((error) => {
        setToastSeverity("error");
        setToastMessage(error || "Failed to reset password. Please try again.");
        setOpenToast(true);
      })
      .finally(() => {
        setIsRequestInProgress(false);
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div className="logintitle" style={{ fontSize: "24px" }}>
        Reset Password
      </div>
      <div className="formcomponent">
        <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={handleResetPassword}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <FormControl fullWidth={true} error={Boolean(errors.email && touched.email)}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field as={OutlinedInput} id="email" name="email" type="email" placeholder="Enter your email" />
                {errors.email && touched.email && <FormHelperText error>{errors.email}</FormHelperText>}
              </FormControl>
              <div className="mt-6 rounded-[10px]">
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || isRequestInProgress} // Disable button if already submitting
                >
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
