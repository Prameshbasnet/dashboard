import { useEffect, useState } from 'react';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Toast from 'components/Toast';
import { Button } from 'antd';
import { addTable, editTable } from 'store/slice/tables';

const TableForm = ({ onClose, isNewTable, tableData }) => {
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');
  const [formData, setFormData] = useState({
    tableName: '',
    tableNumber: '',
    capacity: '',
    status: ''
  });

  const statusOptions = ['Available', 'Occupied', 'Reserved'];

  useEffect(() => {
    if (tableData) {
      setFormData({
        tableName: tableData.tableName || '',
        tableNumber: tableData.tableNumber?.toString() || '',
        capacity: tableData.capacity?.toString() || '',
        status: tableData.status || ''
      });
    }
  }, [tableData]);

  const handleCloseToast = () => setOpenToast(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const tablePayload = {
      tableName: values.tableName,
      tableNumber: Number(values.tableNumber),
      capacity: Number(values.capacity),
      status: values.status
    };

    const action = isNewTable ? addTable(tablePayload) : editTable({ id: tableData?.id, data: tablePayload });

    dispatch(action)
      .unwrap()
      .then(() => {
        setToastSeverity('success');
        setToastMessage(isNewTable ? 'Table created successfully' : 'Table updated successfully');
        setOpenToast(true);
        setTimeout(onClose, 1500);
      })
      .catch((error) => {
        setToastSeverity('error');
        setToastMessage(error.message || 'Operation failed');
        setOpenToast(true);
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    tableName: Yup.string().required('Table name is required'),
    tableNumber: Yup.number().required('Table number is required').positive('Must be positive number').integer('Must be whole number'),
    capacity: Yup.number().required('Capacity is required').positive('Must be positive number').integer('Must be whole number'),
    status: Yup.string().required('Status is required').oneOf(statusOptions, 'Invalid status')
  });

  return (
    <Formik initialValues={formData} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Grid container spacing={2} sx={{ p: 3, width: 400 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="tableName"
                label="Table Name"
                variant="outlined"
                value={values.tableName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tableName && Boolean(errors.tableName)}
                helperText={touched.tableName && errors.tableName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="tableNumber"
                label="Table Number"
                type="number"
                variant="outlined"
                value={values.tableNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tableNumber && Boolean(errors.tableNumber)}
                helperText={touched.tableNumber && errors.tableNumber}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="capacity"
                label="Capacity"
                type="number"
                variant="outlined"
                value={values.capacity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.capacity && Boolean(errors.capacity)}
                helperText={touched.capacity && errors.capacity}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                <InputLabel>Status</InputLabel>
                <Select name="status" label="Status" value={values.status} onChange={handleChange} onBlur={handleBlur} variant="outlined">
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.status && errors.status}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button type="primary" htmlType="submit" loading={isSubmitting} style={{ height: 45, flex: 1 }}>
                {isNewTable ? 'Create Table' : 'Update Table'}
              </Button>
              <Button style={{ height: 45, flex: 1 }} onClick={onClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>

          <Toast open={openToast} onClose={handleCloseToast} severity={toastSeverity} message={toastMessage} autoHideDuration={3000} />
        </Form>
      )}
    </Formik>
  );
};

TableForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isNewTable: PropTypes.bool.isRequired,
  tableData: PropTypes.shape({
    id: PropTypes.string,
    nodeName: PropTypes.string,
    nodeNumber: PropTypes.number,
    capacity: PropTypes.number,
    status: PropTypes.string
  })
};

export default TableForm;
