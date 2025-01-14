import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

const DialogMessage = ({
  open,
  onClose,
  message,
  title,
  disagreeButton,
  handlefunction,
  message2,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "red" }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {message2 && <DialogContentText>{message2}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        {disagreeButton ? (
          <>
            <Button onClick={handlefunction}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </>
        ) : (
          <Button onClick={onClose} autoFocus>
            OK
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

DialogMessage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  title: PropTypes.string,
  disagreeButton: PropTypes.bool,
  handlefunction: PropTypes.func,
};

export default DialogMessage;
