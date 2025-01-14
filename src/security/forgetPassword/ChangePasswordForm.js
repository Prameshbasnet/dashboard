import React, { useState } from "react";
import { InputLabel, OutlinedInput, FormControl, Button, FormHelperText } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeForgotPassword } from "../../store/slice/resetPassword"; // Import the correct thunk
import Toast from "components/Toast";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  confirmationCode: Yup.string().required("Confirmation code is required"),
  newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required")
});

const ChangePasswordForm = () => {
  const [openToast, setOpenToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const handleChangePassword = (values, { setSubmitting }) => {
    setSubmitting(true);

    const payload = {
      email: values.email,
      confirmationCode: values.confirmationCode,
      newPassword: values.newPassword,
    };

    dispatch(changeForgotPassword(payload))
      .unwrap()
      .then(() => {
        setToastMessage("Password Reset Successful");
        setToastSeverity("success");
        setOpenToast(true);
        setTimeout(() => navigate("/login"), 3000); // Redirect after a short delay
      })
      .catch((error) => {
        setToastMessage(error || "Oops, an error occurred. Please try again later");
        setToastSeverity("error");
        setOpenToast(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div>
      <div className="logintitle" style={{ fontSize: "24px" }}>Change Password</div>
      <div className="formcomponent">
        <Formik
          initialValues={{ email: "", confirmationCode: "", newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ errors, touched, isSubmitting, handleChange }) => (
            <Form>
              <FormControl fullWidth={true} error={Boolean(errors.email && touched.email)}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {errors.email && touched.email && <FormHelperText error>{errors.email}</FormHelperText>}
              </FormControl>

              <FormControl
                fullWidth={true}
                error={Boolean(errors.confirmationCode && touched.confirmationCode)}
                style={{ marginTop: "20px" }}
              >
                <InputLabel htmlFor="confirmationCode">Confirmation Code</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="confirmationCode"
                  name="confirmationCode"
                  type="text"
                  placeholder="Enter your confirmation code"
                  onChange={handleChange}
                />
                {errors.confirmationCode && touched.confirmationCode && (
                  <FormHelperText error>{errors.confirmationCode}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth={true}
                error={Boolean(errors.newPassword && touched.newPassword)}
                style={{ marginTop: "20px" }}
              >
                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  onChange={handleChange}
                />
                {errors.newPassword && touched.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}
              </FormControl>

              <FormControl
                fullWidth={true}
                error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                style={{ marginTop: "20px" }}
              >
                <InputLabel htmlFor="confirmPassword">Confirm New Password</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <FormHelperText error>{errors.confirmPassword}</FormHelperText>
                )}
              </FormControl>

              <div className="mt-6 rounded-[10px]">
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  style={{ marginTop: "20px" }}
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
  handleShowPassword: PropTypes.func
};

export default ChangePasswordForm;