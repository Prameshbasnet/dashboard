import * as Yup from "yup";

const regexPattern = /^(?!\d)[^\W\d]+\S*$/;

export const getValidationSchema = (isNewUser) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .matches(regexPattern, "Name must not contain numeric values, symbols, empty strings, space values, or leading spaces")
      .required("First name is required"),
    lastName: Yup.string()
      .matches(regexPattern, "Last Name must not contain numeric values, symbols, empty strings, space values, or leading spaces")
      .required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    lockoutCount: Yup.number()
      .required("Lockout count is required")
      .min(1, "Lockout count must be greater than zero")
      .integer("Lockout count must be an integer"),
    title: Yup.string().required("Title is required"),
    roleIds: Yup.array().min(1, "At least one role is required").required(),
    ...(isNewUser && {
      userPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d)(?!.*\s).*$/,
          "Password must contain at least one special character, one uppercase letter, one digit, and no spaces"
        ),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("userPassword"), null], "Passwords must match")
    })
  });
};
