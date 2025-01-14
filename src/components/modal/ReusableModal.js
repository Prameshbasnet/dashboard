import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { StyleBody, Style } from './Styles';

const ReusableModal = ({ open, onClose, children, title, scrollY, style }) => {
  return (
    <div>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            ...Style,
            ...style,
            overflowY: scrollY ? 'scroll' : 'unset',
            position: 'relative'
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h3" sx={{ textAlign: 'center', mt: 2 }}>
            {title}
          </Typography>
          <Box sx={StyleBody}>{children}</Box>
        </Box>
      </Modal>
    </div>
  );
};

ReusableModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  scrollY: PropTypes.bool,
  style: PropTypes.object
};

export default ReusableModal;
