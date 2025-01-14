import React, { useState } from "react";
import { InputLabel, OutlinedInput, FormControl, Button, FormHelperText } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/slice/change-password"; // Import the change password slice
import Toast from "components/Toast";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  temporaryPassword: Yup.string().required("Temporary password is required"),
  newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required")
});

const ChangePasswordForm = () => {
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePassword = (values, { setSubmitting }) => {
    setSubmitting(true);

    const payload = {
      email: values.email,
      temporaryPassword: values.temporaryPassword,
      newPassword: values.newPassword,
    };

    dispatch(changePassword(payload))
      .unwrap()
      .then(() => {
        setToastMessage("Password change successful.");
        setToastSeverity("success");
        setOpenToast(true);
        navigate("/login");
      })
      .catch((error) => {
        setToastMessage(error || "Oops, an error occurred. Please try again later.");
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
          initialValues={{ email: "", temporaryPassword: "", newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <FormControl fullWidth={true} error={Boolean(errors.email && touched.email)}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field as={OutlinedInput} id="email" name="email" type="email" placeholder="Enter your email" />
                {errors.email && touched.email && <FormHelperText error>{errors.email}</FormHelperText>}
              </FormControl>

              <FormControl
                fullWidth={true}
                error={Boolean(errors.temporaryPassword && touched.temporaryPassword)}
                style={{ marginTop: "20px" }}
              >
                <InputLabel htmlFor="temporaryPassword">Temporary Password</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="temporaryPassword"
                  name="temporaryPassword"
                  type="password"
                  placeholder="Enter your temporary password"
                />
                {errors.temporaryPassword && touched.temporaryPassword && (
                  <FormHelperText error>{errors.temporaryPassword}</FormHelperText>
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
  handleShowPassword: PropTypes.func,
};

export default ChangePasswordForm;