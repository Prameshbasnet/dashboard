import React from "react";
import { LoadingButton } from "@mui/lab";

function CustomLoadingButton({ isSubmitting, name }) {
  const myStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #000000",
    marginBottom: "2rem"
  };

  return (
    <LoadingButton
      fullWidth
      size="medium"
      type="submit"
      variant="contained"
      loading={isSubmitting}
      className="custom-button"
      style={myStyle}
    >
      {name}
    </LoadingButton>
  );
}

export default CustomLoadingButton;
