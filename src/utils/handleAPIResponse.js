export const handleResponse = (action, onSuccess, onError) => {
  if (action.type.endsWith("/fulfilled")) {
    const payload = action.payload;
    if (payload && payload.success) {
      const successMessage = payload.message || "Operation successful";
      onSuccess(successMessage);
    } else {
      onError("An error occurred");
    }
  } else if (action.type.endsWith("/rejected")) {
    const errorMessage = action.payload || "An error occurred";
    onError(errorMessage);
  } else {
    onError("An error occurred");
  }
};
