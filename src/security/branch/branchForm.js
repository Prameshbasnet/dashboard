import { useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Toast from 'components/Toast';
import { addBranch, editBranch, fetchBranch, selectAllBranch } from 'store/slice/branch';
import { Button } from 'antd';

const BranchForm = ({ onClose, isNewBranch, branchId }) => {
  const dispatch = useDispatch();
  const branches = useSelector(selectAllBranch);

  const [branchFormData, setBranchData] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');

  useEffect(() => {
    if (!isNewBranch) {
      const branch = branches?.find((branch) => branch.id === branchId);
      setBranchData(branch || {});
    }
  }, [isNewBranch, branchId, branches]);

  useEffect(() => {
    dispatch(fetchBranch());
  }, [dispatch]);

  const handleCloseToast = () => setOpenToast(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const action = isNewBranch ? addBranch(values) : editBranch({ id: branchId, data: values });

    try {
      const res = await dispatch(action).unwrap();
      setToastSeverity(res.success ? 'success' : 'error');
      setToastMessage(res.success ? 'Branch successfully processed' : res.data?.ModulePermissionIds || 'An error occurred');
      setOpenToast(true);

      if (res.success) {
        setTimeout(onClose, 1000);
      }
    } catch (error) {
      setSubmitting(false);
      setToastMessage(error);
      setOpenToast(true);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .matches(/^(?!\d)[^\W\d]+\S*$/, 'Name must not contain numbers, symbols, or leading spaces'),
    description: Yup.string().required('Required'),
    code: Yup.string()
      .required('Required')
      .matches(/^-?\d{1,6}(\.\d{1,5})?$/, 'Code must be a number with up to 6 digits')
  });

  return (
    <Formik
      initialValues={{
        description: branchFormData?.description || '',
        name: branchFormData?.name || '',
        code: branchFormData?.code || ''
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Grid container spacing={3} sx={{ margin: '20px' }}>
            {['name', 'description', 'code'].map((field) => (
              <Grid item xs={10} key={field}>
                <TextField
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={values[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched[field] && Boolean(errors[field])}
                  helperText={touched[field] && errors[field]}
                  fullWidth
                />
              </Grid>
            ))}
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
  onClose: PropTypes.func.isRequired,
  isNewBranch: PropTypes.bool.isRequired,
  branchId: PropTypes.string
};

export default BranchForm;
