import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Toast from 'components/Toast';
import DialogMessage from 'components/DialogMessage';
import { useDispatch } from 'react-redux';
import { decodeBase64Data } from 'utils/decode';
import { deleteReviews, fetchReviews, selectAllReviews } from 'store/slice/review';
import ReviewTableComponent from './ReviewTable';
import { useSelector } from 'react-redux';

const Review = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews);
  const [reviewId, setReviewId] = useState('');
  const [openMessageDialog, setopenDialogMessage] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  console.log(toastSeverity);

  let allModulePerms;
  console.log(allModulePerms);

  const localToken = localStorage.getItem('token');
  const decodedData = decodeBase64Data(localToken);
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  if (decodedData) {
    const { modulePermission } = decodedData;
    allModulePerms = modulePermission;
  }

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  const handleDelete = (id) => {
    setReviewId(id);
    setopenDialogMessage(true);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleDeleteFinal = () => {
    dispatch(deleteReviews(reviewId))
      .unwrap()
      .then((res) => {
        if (res.success) {
          setToastSeverity('success');
          setToastMessage(res.message);
          setOpenToast(true);
        } else {
          setToastSeverity('error');
          setToastMessage(res.message);
          setOpenToast(true);
        }
        setopenDialogMessage(false);
      })
      .catch((error) => {
        setReviewId('');
        setToastSeverity('error');
        setToastMessage(error.message);
        setOpenToast(true);
      });
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div style={{ width: '100%', padding: '50px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Reviews
        </Typography>
      </Stack>
      <ReviewTableComponent
        reviews={reviews}
        sortedInfo={sortedInfo}
        handleChange={handleChange}
        searchText={searchText}
        searchedColumn={searchedColumn}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleDelete={handleDelete}
      />
      <DialogMessage
        open={openMessageDialog}
        onClose={() => setopenDialogMessage(!openMessageDialog)}
        title={'Warning!!!'}
        message={'Are you sure you want to Delete?'}
        disagreeButton
        handlefunction={handleDeleteFinal}
      />
      <Toast open={openToast} onClose={handleCloseToast} severity="success" message={toastMessage} />
    </div>
  );
};

export default Review;
