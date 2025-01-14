import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh", width: "100%" }}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
