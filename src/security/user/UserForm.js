import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  FormGroup,
  FormControl,
  Select,
  Stack,
  Typography,
  MenuItem,
  InputLabel,
  Container,
  InputAdornment,
  Grid,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { addUser, editUser, selectAllUsers } from "store/slice/user";
import { useDispatch, useSelector } from "react-redux";
import Toast from "components/Toast";
import { fetchRoles, selectAllRole } from "store/slice/role";
import { handleResponse } from "utils/handleAPIResponse";
import { getValidationSchema } from "./userValidationSchema";

const AddUserForm = ({ isNewUser }) => {
  const users = useSelector(selectAllUsers);
  const roles = useSelector(selectAllRole);
  const validationSchema = getValidationSchema(isNewUser);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getUserDataById = (userId) => {
    return users?.find((user) => user.id === userId);
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const userData = isNewUser ? null : getUserDataById(id);

  const initialValues = {
    firstName: userData ? userData.firstName : "",
    middleName: userData ? userData.middleName : "",
    lastName: userData ? userData.lastName : "",
    gender: userData ? userData.gender : "",
    username: userData ? userData.userName : "",
    email: userData ? userData.email : "",
    phoneNumber: userData ? userData.phoneNumber : "",
    lockoutCount: userData ? userData.lockoutCount : "",
    title: userData ? userData.title : "",
    roleIds: userData ? userData.roles.map((ele) => ele.id) : [],
    userPassword: "",
    confirmPassword: ""
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const action = isNewUser ? await dispatch(addUser(values)) : await dispatch(editUser({ id, userData: values }));
        handleResponse(
          action,
          (successMessage) => {
            setToastMessage(successMessage);
            setToastSeverity("success");
            setOpenToast(true);
            setTimeout(() => {
              navigate("/user");
            }, 1000);
          },
          (errorMessage) => {
            setToastMessage(errorMessage);
            setToastSeverity("error");
            setOpenToast(true);
          }
        );
      } catch (error) {
        setToastMessage("User operation unsuccessful");
        setToastSeverity("error");
        setOpenToast(true);
      }
    }
  });

  const { errors, touched, handleChange, handleSubmit, values } = formik;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div style={{ width: "100%", padding: "50px" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {isNewUser ? "Add User" : "Edit User"}
        </Typography>
      </Stack>
      <Container component="main">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                id="firstName"
                label="First Name"
                name="firstName"
                fullWidth
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                id="middleName"
                label="Middle Name"
                name="middleName"
                value={values.middleName}
                error={touched.middleName && Boolean(errors.middleName)}
                helperText={touched.middleName && errors.middleName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                id="lastName"
                label="Last Name"
                name="lastName"
                fullWidth
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.gender && Boolean(errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select labelId="gender-label" id="gender" name="gender" value={values.gender} onChange={handleChange} label="Gender">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {touched.gender && errors.gender && <div style={{ color: "red" }}>{errors.gender}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                id="username"
                fullWidth
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                id="phoneNumber"
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                id="email"
                label="Email"
                fullWidth
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                id="title"
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                fullWidth
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.roleIds && Boolean(errors.roleIds)}
                helperText={touched.roleIds && errors.roleIds}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="roleIds"
                  multiple
                  name="roleIds"
                  value={values.roleIds || []}
                  onChange={handleChange}
                  label="Role"
                >
                  {roles?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.roleIds && errors.roleIds && <div style={{ color: "red", fontSize: "12px" }}>{errors.roleIds}</div>}
              </FormControl>
            </Grid>
            {isNewUser && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="userPassword"
                    fullWidth
                    label="Password"
                    name="userPassword"
                    type={showPassword ? "text" : "password"}
                    value={values.userPassword}
                    onChange={handleChange}
                    error={touched.userPassword && Boolean(errors.userPassword)}
                    helperText={touched.userPassword && errors.userPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="confirmPassword"
                    label="Confirm Password"
                    fullWidth
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <FormGroup style={{ justifyContent: "center" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="lockoutCount"
                  label="Lockout Count"
                  name="lockoutCount"
                  fullWidth
                  value={values.lockoutCount}
                  onChange={handleChange}
                  error={touched.lockoutCount && Boolean(errors.lockoutCount)}
                  helperText={touched.lockoutCount && errors.lockoutCount}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "1rem" }}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                {isNewUser ? "Submit" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} />
    </div>
  );
};

export default AddUserForm;
