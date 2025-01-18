import { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Toast from "components/Toast";
import { addBranch, editBranch, fetchBranch, selectAllBranch } from "store/slice/branch";
import { Button } from "antd";

const BranchForm = ({ onClose, isNewBranch, branchId }) => {
  const regexPattern = /^(?!\d)[^\W\d]+\S*$/;
  const numberRegexValidation = /^-?\d{1,6}(\.\d{1,5})?$/;

  const dispatch = useDispatch();

  const [openMessageDialog, setopenDialogMessage] = useState(false);
  const [branchFormData, setBranchData] = useState(null);
  const handleMessageDialogClose = () => {
    setopenDialogMessage(!openMessageDialog);
  };
  const branches = useSelector(selectAllBranch);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("error");

  useEffect(() => {
    if (isNewBranch === false) {
      const filterBranch = Array.isArray(branches) && branches?.filter((branch) => branch.id === branchId);
      setBranchData(filterBranch[0]);
    }
  }, [isNewBranch, branchId, branches]);

  useEffect(() => {
    dispatch(fetchBranch());
  }, [dispatch]);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (isNewBranch === true) {
      const data = {
        description: values.description,
        name: values.name,
        code: values.code
      };

      dispatch(addBranch(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            setToastSeverity("success");
            setToastMessage("Branch Added Successfully");
            setOpenToast(true);
            setTimeout(() => {
              onClose();
            }, 1000);
          } else {
            const errorMessage = res.data && res.data.ModulePermissionIds ? res.data.ModulePermissionIds : "An error occurred";
            setToastSeverity("error");
            setToastMessage(errorMessage);
            setOpenToast(true);
          }
        })
        .catch((errorMessage) => {
          setSubmitting(false);
          setToastMessage(errorMessage);
          setOpenToast(true);
          handleMessageDialogClose();
        });
    }

    if (isNewBranch === false) {
      const finalData = {
        id: branchId,
        data: {
          description: values.description,
          name: values.name,
          code: values.code
        }
      };

      dispatch(editBranch(finalData))
        .unwrap()
        .then((res) => {
          if (res.success) {
            setToastSeverity("success");
            setToastMessage("Branch edited Successfully");
            setOpenToast(true);
            setSubmitting(false);
            setTimeout(() => {
              onClose();
            }, 1000);
          } else {
            const errorMessage = res.data && res.data.ModulePermissionIds ? res.data.ModulePermissionIds : "An error occurred";
            setToastSeverity("error");
            setToastMessage(errorMessage);
            setOpenToast(true);
          }
        })
        .catch((errorMessage) => {
          setSubmitting(false);
          setToastMessage(errorMessage);
          setOpenToast(true);
        });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .matches(regexPattern, "Name must not contain numeric values, symbols, empty strings, space values, or leading spaces"),
    description: Yup.string().required("Required"),
    code: Yup.string().required("Required").matches(numberRegexValidation, "Code must be type number and less than 6 digits")
  });

  return (
    <Formik
      initialValues={
        isNewBranch === false
          ? {
              description: branchFormData?.description,
              name: branchFormData?.name,
              code: branchFormData?.code || ""
            }
          : {
              description: "",
              name: "",
              code: ""
            }
      }
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, { setSubmitting });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Grid container spacing={3} sx={{ margin: "20px" }}>
            <Grid item xs={10}>
              <TextField
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                fullWidth
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                name="code"
                label="Code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code}
                fullWidth
              />
            </Grid>
            <Grid item xs={10}>
              <Button type="primary" loading={isSubmitting} htmlType="submit" block>
                Submit
              </Button>
            </Grid>
          </Grid>
          <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} />
        </Form>
      )}
    </Formik>
  );
};

BranchForm.propTypes = {
  onClose: PropTypes.func,
  isNewBranch: PropTypes.bool,
  branchId: PropTypes.string,
  handleCloseForm: PropTypes.func
};

export default BranchForm;
