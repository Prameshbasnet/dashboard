import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Toast from 'components/Toast';
import DialogMessage from 'components/DialogMessage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviews, fetchReviews, selectAllReviews } from 'store/slice/review';
import ReviewTableComponent from './ReviewTable';

const Review = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews);
  const [reviewId, setReviewId] = useState('');
  const [openMessageDialog, setOpenDialogMessage] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleDelete = (id) => {
    setReviewId(id);
    setOpenDialogMessage(true);
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

  const handleDeleteFinal = async () => {
    try {
      const result = await dispatch(deleteReviews(reviewId)).unwrap();
      setToastSeverity('success');
      setToastMessage(result.message || 'Review deleted successfully');
      setOpenToast(true);
      dispatch(fetchReviews());
    } catch (error) {
      setToastSeverity('error');
      setToastMessage(error.message || 'Failed to delete review. Please try again later.');
      setOpenToast(true);
    } finally {
      setOpenDialogMessage(false);
      setReviewId('');
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const truncateMessage = (message, length = 50) => {
    if (!message) return '';
    return message.length > length ? `${message.substring(0, length)}...` : message;
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '32px',
        maxWidth: '1800px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Reviews Management
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
        truncateMessage={truncateMessage}
      />

      <DialogMessage
        open={openMessageDialog}
        onClose={() => setOpenDialogMessage(false)}
        title="Confirm Deletion"
        message={
          <Typography
            sx={{
              maxWidth: '600px',
              wordBreak: 'break-word',
              maxHeight: '300px',
              overflowY: 'auto',
              paddingRight: '12px',
              whiteSpace: 'pre-line'
            }}
          >
            Are you sure you want to delete this review? This action cannot be undone.
          </Typography>
        }
        disagreeButton
        handleConfirm={handleDeleteFinal}
        handleCancel={() => setOpenDialogMessage(false)}
      />

      <Toast
        open={openToast}
        onClose={handleCloseToast}
        severity={toastSeverity}
        message={
          <div
            style={{
              maxWidth: '500px',
              wordBreak: 'break-word',
              whiteSpace: 'pre-line',
              maxHeight: '300px',
              overflowY: 'auto',
              paddingRight: '8px'
            }}
          >
            {toastMessage}
          </div>
        }
        autoHideDuration={toastMessage?.length > 100 ? 10000 : 6000}
      />
    </div>
  );
};

export default Review;
