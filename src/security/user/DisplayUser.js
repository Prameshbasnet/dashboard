import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Container, Paper, Box } from '@mui/material';
import { PlusCircleFilled } from '@ant-design/icons';
import UserTable from '../user/userTable';
import { useNavigate } from 'react-router-dom';
import DialogMessage from 'components/DialogMessage';
import Toast from 'components/Toast';
import { deleteUser, fetchAllUsers, selectAllUsers } from 'store/slice/user';
import { useDispatch, useSelector } from 'react-redux';

const User = () => {
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleNavigation = (isEdit = false, id = null) => {
    navigate(isEdit ? `/edit-user/${id}` : '/add-user');
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenMessageDialog(true);
  };

  const handleDeleteFinal = () => {
    dispatch(deleteUser(deleteId))
      .unwrap()
      .then(({ success, message }) => {
        setToastSeverity(success ? 'success' : 'error');
        setToastMessage(message);
        setOpenToast(true);
        setOpenMessageDialog(false);
      })
      .catch(() => {
        setToastSeverity('error');
        setToastMessage('An error occurred while deleting.');
        setOpenToast(true);
        setOpenMessageDialog(false);
      });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Users
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlusCircleFilled />}
            onClick={() => handleNavigation(false)}
            sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 'bold' }}
          >
            New User
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserTable users={users} handleEdit={(id) => handleNavigation(true, id)} handleDelete={handleDelete} />
          </Grid>
        </Grid>
      </Paper>
      <DialogMessage
        open={openMessageDialog}
        onClose={() => setOpenMessageDialog(false)}
        title={'Warning!!!'}
        message={'Are you sure you want to Delete?'}
        disagreeButton
        handlefunction={handleDeleteFinal}
      />
      <Toast open={openToast} onClose={() => setOpenToast(false)} severity={toastSeverity} message={toastMessage} />
    </Container>
  );
};

export default User;
