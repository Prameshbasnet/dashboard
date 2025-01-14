import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure this is installed: `npm install jwt-decode`
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

let isRefreshing = false;
let refreshSubscribers = [];

// Add a subscriber to wait for the refreshed token
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Notify all queued requests with the new token
const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

// Function to decode the token and check expiration
const checkTokenExpiration = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Return true if expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Assume expired if decoding fails
  }
};

// Function to handle redirection to /login
const redirectToLogin = (message = "Redirecting to login...") => {
  console.warn(message);
  Cookies.remove("refreshToken");
  localStorage.removeItem("accessToken");
  window.location.href = "/login"; // Redirect to login
};

// Function to refresh the token
const refreshToken = async () => {
  console.log("Attempting to refresh token");
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    redirectToLogin("Refresh token missing. Redirecting to login...");
    throw new Error("No refresh token available.");
  }

  try {
    // Send the refresh token as a query parameter
    const response = await axios.post(`${API_URL}/auth/refresh-token?refreshToken=${refreshToken}`);
    const { accessToken } = response.data.data;

    // Update tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    console.log("Token refreshed successfully");
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    redirectToLogin("Failed to refresh token. Redirecting to login...");
    throw error;
  }
};

// Function to create the Axios instance
const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000, // Optional: set a timeout
  });

  // Attach Authorization header to all requests
  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken && config.url !== "/auth/login") {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle 401 responses and retry with refreshed token
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newAccessToken = await refreshToken();
            isRefreshing = false;
            onTokenRefreshed(newAccessToken); // Notify all subscribers
          } catch (refreshError) {
            isRefreshing = false;
            redirectToLogin("Token refresh failed. Redirecting to login...");
            return Promise.reject(refreshError);
          }
        }

        // Queue requests while refreshing
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          });
        });
      }

      if (error.response?.status === 401) {
        redirectToLogin("Invalid token detected. Redirecting to login...");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Function to start token refresh interval
const startTokenRefreshInterval = () => {
  setInterval(async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (checkTokenExpiration(accessToken)) {
        console.log("Token expired. Attempting background refresh...");
        try {
          await refreshToken(); // Refresh token in the background
        } catch (error) {
          redirectToLogin("Background token refresh failed. Redirecting to login...");
        }
      } else {
        try {
          // Attempt decoding the token to check for tampering
          jwtDecode(accessToken);
        } catch (error) {
          console.error("Invalid token detected:", error);
          redirectToLogin("Tampered token detected. Redirecting to login...");
        }
      }
    }
  }, 6 * 1 * 1000); // Adjusted to 6 minutes for better reliability
};

// Start the background refresh
startTokenRefreshInterval();

export { getAxiosInstance };
