import React, { useEffect, useState } from "react";
import { Stack, TextField, Checkbox, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { addRole, editRole, selectAllRole } from "../../store/slice/role";
import CustomLoadingButton from "components/CustomLoadingButton";
import Toast from "components/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { getModulePermissions, selectModulePermissions } from "store/slice/module_permission";

const RoleForm = ({ isNewRole }) => {
  const roles = useSelector(selectAllRole);
  const permissions = useSelector(selectModulePermissions);
  const regexPattern = /^(?!\d)[^\W\d]+\S*$/;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: roleId } = useParams();

  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("error");
  const [permissionValues, setPermissionValues] = useState({});
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    dispatch(getModulePermissions());
  }, []);

  useEffect(() => {
    if (!isNewRole && roleId) {
      const filterRole = roles?.find((role) => role.id === roleId);
      const initialPermissions = {};
      permissions.forEach((permission) => {
        initialPermissions[`${permission.moduleName}-${permission.permissionName}`] =
          filterRole?.modulePermissions?.some(
            (mp) => mp.moduleName === permission.moduleName && mp.permissionName === permission.permissionName
          ) || false;
      });
      setPermissionValues(initialPermissions);
      setIsActive(filterRole?.isActive);
    }
  }, [isNewRole, roleId, roles, permissions]);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const validate = (values) => {
    const validationErrors = {};
    if (!values.name) {
      validationErrors.name = "Required";
    } else if (!regexPattern.test(values.name)) {
      validationErrors.name = "Name must not contain numeric values, symbols, empty strings, space values, or leading spaces";
    }
    if (!values.description) {
      validationErrors.description = "Required";
    }
    setErrors(validationErrors);
    return validationErrors;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errors]);

  const handleSubmit = (values, { setSubmitting }) => {
    const combinedValues = {
      ...values,
      modulePermissionIds: Object.keys(permissionValues)
        .filter((key) => permissionValues[key])
        .map((key) => {
          const [moduleName, permissionName] = key.split("-");
          const foundPermission = permissions.find((perm) => perm.moduleName === moduleName && perm.permissionName === permissionName);
          return foundPermission ? foundPermission.modulePermissionId : null;
        })
        .filter(Boolean)
    };

    if (isNewRole) {
      const data = {
        isActive: values.active,
        description: values.description,
        name: values.name,
        modulePermissionIds: combinedValues.modulePermissionIds
      };

      dispatch(addRole(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            setToastSeverity("success");
            setToastMessage("Role Added Successfully");
            setOpenToast(true);
            setTimeout(() => {
              navigate("/role");
            }, 1000);
          } else {
            const errorMessage = res.data && res.data.ModulePermissionIds ? res.data.ModulePermissionIds : "An error occurred";
            setToastSeverity("error");
            setToastMessage(errorMessage);
            setOpenToast(true);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          setToastMessage(error ? error : "An error occurred");
          setOpenToast(true);
        });
    } else {
      const data = {
        isActive: values.active,
        description: values.description,
        name: values.name,
        modulePermissionIds: combinedValues.modulePermissionIds
      };

      const finalData = {
        id: roleId,
        data: data
      };

      dispatch(editRole(finalData))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setToastMessage("Role Edited Successfully");
          setToastSeverity("success");
          setOpenToast(true);
          setTimeout(() => {
            navigate("/role");
          }, 1000);
        })
        .catch((errorMessage) => {
          setSubmitting(false);
          setToastMessage(errorMessage);
          setOpenToast(true);
        });
    }
  };

  const categorizedPermissions = {};

  permissions.forEach((permission) => {
    if (!categorizedPermissions[permission.moduleName]) {
      categorizedPermissions[permission.moduleName] = [];
    }
    categorizedPermissions[permission.moduleName].push(permission.permissionName);
  });

  return (
    <div style={{ width: "100%", padding: "50px" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {isNewRole ? "Add Role" : "Edit Role"}
        </Typography>
      </Stack>
      {permissions && permissions.length > 0 ? (
        <Formik
          initialValues={
            isNewRole
              ? {
                  active: true,
                  description: "",
                  name: "",
                  ...permissionValues
                }
              : {
                  description: roles.find((role) => role.id === roleId)?.description || "",
                  name: roles.find((role) => role.id === roleId)?.name || "",
                  active: isActive,
                  ...permissionValues
                }
          }
          enableReinitialize
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, { setSubmitting });
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Stack spacing={2} sx={{ margin: "0 100px 0 100px" }}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  {!isNewRole && (
                    <Checkbox
                      id="active"
                      name="active"
                      checked={values.active}
                      onChange={handleChange}
                      style={{ marginRight: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #cccccc" }}
                    />
                  )}
                  {!isNewRole && <label htmlFor="active">Active</label>}
                </Stack>

                <Grid container spacing={3}>
                  {Object.entries(categorizedPermissions).map(([moduleName, permissions]) => (
                    <Grid item xs={12} md={4} key={moduleName}>
                      <div
                        style={{
                          border: "1px solid #e0e0e0",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          padding: "20px",
                          backgroundColor: "#ffffff",
                          borderRadius: "8px",
                          fontFamily: "Arial, sans-serif",
                          width: "100%"
                        }}
                      >
                        <h3
                          style={{
                            color: "#333333",
                            marginBottom: "20px",
                            borderBottom: "2px solid #e0e0e0",
                            paddingBottom: "10px",
                            fontWeight: "300"
                          }}
                        >
                          {moduleName}
                        </h3>
                        <div style={{ display: "grid", gridGap: "15px" }}>
                          {permissions.map((permission) => {
                            const permissionKey = `${moduleName}-${permission}`;
                            return (
                              <div key={permission} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Checkbox
                                  id={permissionKey}
                                  name={permissionKey}
                                  checked={permissionValues[permissionKey] || false}
                                  onChange={() => {
                                    setPermissionValues((prevState) => ({
                                      ...prevState,
                                      [permissionKey]: !prevState[permissionKey],
                                      name: values.name,
                                      description: values.description,
                                      active: values.active
                                    }));
                                  }}
                                  style={{ marginRight: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #cccccc" }}
                                />
                                <label htmlFor={permissionKey} style={{ color: "#555555", fontWeight: "normal", fontSize: "16px" }}>
                                  {permission}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
                <CustomLoadingButton isSubmitting={isSubmitting} name={"Submit"} />
              </Stack>
              <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} />
            </Form>
          )}
        </Formik>
      ) : (
        <p>Unable to fetch permissions from API</p>
      )}
    </div>
  );
};

RoleForm.propTypes = {
  isNewRole: PropTypes.bool,
  permissions: PropTypes.array
};

export default RoleForm;
