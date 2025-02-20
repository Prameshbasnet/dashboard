import React, { useState, useEffect } from 'react';
import { Stack, Typography, Button, Grid } from '@mui/material';
import { PlusCircleFilled } from '@ant-design/icons';
import UserTable from '../user/userTable'; // Ensure this matches the actual file name casing
import { useNavigate } from 'react-router-dom';
import DialogMessage from 'components/DialogMessage';
import Toast from 'components/Toast';
import { deleteUser, fetchAllUsers, selectAllUsers } from 'store/slice/user';
import { useDispatch, useSelector } from 'react-redux';

const User = () => {
  const users = useSelector(selectAllUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [openMessageDialog, setopenDialogMessage] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [toastSeverity, setToastSeverity] = useState('success');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const addUser = (isEdit = false, id = null) => {
    if (isEdit) {
      setDeleteId(id);
      navigate(`/edit-user/${id}`);
    } else {
      setDeleteId(null);
      navigate('/add-user');
    }
  };

  const handleEdit = (id) => {
    addUser(true, id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setopenDialogMessage(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleDeleteFinal = () => {
    dispatch(deleteUser(deleteId))
      .unwrap()
      .then((res) => {
        const { success, message } = res;
        if (success) {
          setToastSeverity('success');
          setToastMessage(message);
          setOpenToast(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          setToastSeverity('error');
          setToastMessage(message);
          setOpenToast(true);
        }
        setDeleteId(null);
        setopenDialogMessage(false);
      })
      .catch(() => {
        setToastSeverity('error');
        setToastMessage('An error occurred while deleting.');
        setOpenToast(true);
        setDeleteId(null);
        setopenDialogMessage(false);
      });
  };

  useEffect(() => {
    if (users?.length > 0) {
      setIsLoading(false);
    }
  }, [users]);

  return (
    <div style={{ width: '100%', padding: '50px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} width={'80%'}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Button variant="primary" startIcon={<PlusCircleFilled />} onClick={() => addUser(false)}>
          New User
        </Button>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <UserTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
        </Grid>
      </Grid>
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

export default User;
