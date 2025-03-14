import { useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Toast from 'components/Toast';
import { Button } from 'antd';
import { addCategory, editCategory, fetchCategories, selectAllCategories } from 'store/slice/categories';

const CategoryForm = ({ onClose, categoryId, isNewCategories, categoryData }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  console.log(categories);

  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');
  const [categoriesFormData, setCategoriesFormData] = useState(categoryData || null);

  useEffect(() => {
    if (!isNewCategories && categoryData) {
      setCategoriesFormData(categoryData);
    }
  }, [isNewCategories, categoryData]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCloseToast = () => setOpenToast(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      categoryName: values.categoryName,
      categoryDescription: values.categoryDescription
    };

    const action = isNewCategories ? addCategory(data) : editCategory({ id: categoryId, data });

    dispatch(action)
      .unwrap()
      .then((res) => {
        if (res.success) {
          setToastSeverity('success');
          setToastMessage(isNewCategories ? 'Categories Added Successfully' : 'Categories Edited Successfully');
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
    categoryName: Yup.string().required('Required'),
    categoryDescription: Yup.string().required('Required')
  });

  return (
    <Formik
      initialValues={{
        categoryName: categoriesFormData?.categoryName || '',
        categoryDescription: categoriesFormData?.categoryDescription || ''
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
                name="categoryName"
                label="Category Name"
                value={values.categoryName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.categoryName && Boolean(errors.categoryName)}
                helperText={touched.categoryName && errors.categoryName}
                fullWidth
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                name="categoryDescription"
                label="Category Description"
                value={values.categoryDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.categoryDescription && Boolean(errors.categoryDescription)}
                helperText={touched.categoryDescription && errors.categoryDescription}
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

CategoryForm.propTypes = {
  onClose: PropTypes.func,
  isNewCategories: PropTypes.bool,
  categoryId: PropTypes.string,
  categoryData: PropTypes.object
};

export default CategoryForm;
