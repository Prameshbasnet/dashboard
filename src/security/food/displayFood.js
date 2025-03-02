import { useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Toast from 'components/Toast';
import { Button } from 'antd';
import { addFood, editFood, fetchFoods, selectAllFoods } from '../../store/slice/food';

const FoodForm = ({ onClose, isNewFood, foodId }) => {
  const regexPattern = /^(?!\d)[^\W\d]+\S*$/;
  const numberRegexValidation = /^-?\d{1,6}(\.\d{1,5})?$/;
  const dispatch = useDispatch();
  const foods = useSelector(selectAllFoods);

  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');
  const [branchFormData, setBranchData] = useState(null);

  useEffect(() => {
    if (!isNewFood) {
      const filterFood = foods?.find((food) => food.id === foodId);
      setBranchData(filterFood);
    }
  }, [isNewFood, foodId, foods]);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const handleCloseToast = () => setOpenToast(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      description: values.description,
      name: values.name,
      code: values.code
    };

    const action = isNewFood ? addFood(data) : editFood({ id: foodId, data });

    dispatch(action)
      .unwrap()
      .then((res) => {
        if (res.success) {
          setToastSeverity('success');
          setToastMessage(isNewFood ? 'Food Added Successfully' : 'Food Edited Successfully');
          setOpenToast(true);
          setTimeout(onClose, 1000);
        } else {
          setToastSeverity('error');
          setToastMessage(res.data?.ModulePermissionIds || 'An error occurred');
          setOpenToast(true);
        }
      })
      .catch((errorMessage) => {
        setSubmitting(false);
        setToastMessage(errorMessage);
        setOpenToast(true);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .matches(regexPattern, 'Name must not contain numeric values, symbols, empty strings, space values, or leading spaces'),
    description: Yup.string().required('Required'),
    code: Yup.string().required('Required').matches(numberRegexValidation, 'Code must be type number and less than 6 digits')
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

FoodForm.propTypes = {
  onClose: PropTypes.func,
  isNewFood: PropTypes.bool,
  foodId: PropTypes.string
};

export default FoodForm;
