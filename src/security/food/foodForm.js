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
  const dispatch = useDispatch();
  const foods = useSelector(selectAllFoods);
  const [foodData, setFoodData] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
  const codeRegex = /^\d{1,6}$/;

  useEffect(() => {
    if (!isNewFood) {
      const foundFood = foods?.find((food) => food.id === foodId);
      setFoodData(foundFood);
    }
  }, [isNewFood, foodId, foods]);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = {
      description: values.description,
      name: values.name.trim(),
      code: values.code,
      price: parseFloat(values.price)
    };

    const action = isNewFood ? addFood(formData) : editFood({ id: foodId, data: formData });

    dispatch(action)
      .unwrap()
      .then((res) => {
        if (res.success) {
          setToast({
            open: true,
            message: isNewFood ? 'Food Added Successfully' : 'Food Updated Successfully',
            severity: 'success'
          });
          setTimeout(onClose, 1000);
        } else {
          setToast({
            open: true,
            message: res.data?.message || 'Operation failed',
            severity: 'error'
          });
        }
      })
      .catch((error) => {
        setSubmitting(false);
        setToast({
          open: true,
          message: error.message || 'An unexpected error occurred',
          severity: 'error'
        });
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required').matches(nameRegex, 'Letters and single spaces only, no leading/trailing spaces').trim(),
    description: Yup.string().required('Required'),
    code: Yup.string().required('Required').matches(codeRegex, 'Must be a 1-6 digit number'),
    price: Yup.number()
      .required('Required')
      .positive('Must be positive')
      .max(9999.99, 'Maximum price is Rs9999.99')
      .test('decimal', 'Maximum 2 decimal places', (value) => (value ? /^\d+(\.\d{1,2})?$/.test(value.toString()) : true))
  });

  return (
    <>
      <Formik
        initialValues={{
          description: foodData?.description || '',
          name: foodData?.name || '',
          code: foodData?.code || '',
          price: foodData?.price || ''
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Grid container spacing={3} sx={{ p: 3 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Food Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="code"
                  label="Product Code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code && errors.code}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="price"
                  label="Price (Rs)"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  fullWidth
                  inputProps={{
                    step: '0.01'
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="primary" htmlType="submit" loading={isSubmitting} block size="large">
                  {isNewFood ? 'Add Food Item' : 'Update Food Item'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Toast
        open={toast.open}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        severity={toast.severity}
        message={toast.message}
      />
    </>
  );
};

FoodForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isNewFood: PropTypes.bool,
  foodId: PropTypes.string
};

FoodForm.defaultProps = {
  isNewFood: true,
  foodId: null
};

export default FoodForm;
