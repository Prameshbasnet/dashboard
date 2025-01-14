import * as Yup from "yup";

const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d)(?!.*\s).*$/,
      "Password must contain at least one special character, one uppercase letter, one digit, and no spaces"
    ),
  confirmPassword: Yup.string()
    .required("Confirm New Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
});

export default passwordValidationSchema;
