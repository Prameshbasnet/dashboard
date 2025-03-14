import { useEffect, useState } from 'react';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Toast from 'components/Toast';
import { Button } from 'antd';
import { addStock, editStock, fetchStocks } from 'store/slice/stocks';
import { fetchFoods, selectAllFoods } from 'store/slice/food';

const StockForm = ({ onClose, stockId, isNewStock, stockData }) => {
  const dispatch = useDispatch();
  const foods = useSelector(selectAllFoods);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');
  const [stockFormData, setStockFormData] = useState(stockData || null);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  useEffect(() => {
    if (!isNewStock && stockData) {
      setStockFormData(stockData);
    }
  }, [isNewStock, stockData]);

  const handleCloseToast = () => setOpenToast(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const requestData = {
      foodId: values.foodId,
      quantity: values.quantity,
      isAvailable: values.isAvailable === 'true'
    };

    const action = isNewStock ? addStock(requestData) : editStock({ id: stockId, data: requestData });

    dispatch(action)
      .unwrap()
      .then(() => {
        setToastSeverity('success');
        setToastMessage(isNewStock ? 'Stock Added Successfully' : 'Stock Updated Successfully');
        setOpenToast(true);
        setTimeout(() => {
          onClose();
          dispatch(fetchStocks());
        }, 1000);
      })
      .catch((error) => {
        setToastSeverity('error');
        setToastMessage(error.message || 'An error occurred');
        setOpenToast(true);
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    foodId: Yup.string().required('Food is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(0, 'Must be a positive number')
      .transform((value) => (isNaN(value) ? undefined : value)),
    isAvailable: Yup.string().required('Availability is required')
  });

  return (
    <Formik
      initialValues={{
        foodId: stockFormData?.foodId || '',
        quantity: stockFormData?.quantity?.toString() || '',
        isAvailable: stockFormData?.isAvailable?.toString() || 'true'
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleBlur, isSubmitting, setFieldValue }) => (
        <Form>
          <Grid container spacing={3} sx={{ margin: '20px', maxWidth: 500 }}>
            <Grid item xs={12}>
              <FormControl fullWidth error={touched.foodId && Boolean(errors.foodId)}>
                <InputLabel>Food Item</InputLabel>
                <Select
                  name="foodId"
                  label="Food Item"
                  value={values.foodId}
                  onChange={(e) => setFieldValue('foodId', e.target.value)}
                  onBlur={handleBlur}
                  variant="outlined"
                >
                  {foods.map((food) => (
                    <MenuItem key={food.id} value={food.id}>
                      {food.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{touched.foodId && errors.foodId}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="quantity"
                label="Quantity"
                type="number"
                variant="outlined"
                value={values.quantity}
                onChange={(e) => setFieldValue('quantity', e.target.value)}
                onBlur={handleBlur}
                error={touched.quantity && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={touched.isAvailable && Boolean(errors.isAvailable)}>
                <InputLabel>Stock Status</InputLabel>
                <Select
                  name="isAvailable"
                  label="Stock Status"
                  value={values.isAvailable}
                  onChange={(e) => setFieldValue('isAvailable', e.target.value)}
                  onBlur={handleBlur}
                  variant="outlined"
                >
                  <MenuItem value="true">Available</MenuItem>
                  <MenuItem value="false">Out of Stock</MenuItem>
                </Select>
                <FormHelperText error>{touched.isAvailable && errors.isAvailable}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="primary" htmlType="submit" loading={isSubmitting} style={{ width: '100%', height: 45 }}>
                {isNewStock ? 'Add Stock' : 'Update Stock'}
              </Button>
            </Grid>
          </Grid>
          <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} />
        </Form>
      )}
    </Formik>
  );
};

StockForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isNewStock: PropTypes.bool.isRequired,
  stockId: PropTypes.string,
  stockData: PropTypes.shape({
    foodId: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isAvailable: PropTypes.bool
  })
};

export default StockForm;
