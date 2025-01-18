import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fix the import
import { decodeBase64Data } from "utils/decode";

const API_URL = process.env.REACT_APP_API_URL;
const IDENTITY_URL = process.env.REACT_APP_IDENTITY_URL;

const getBaseUrl = (service) => {
  const baseUrls = {
    apiUrl: API_URL,
    identityUrl: IDENTITY_URL
  };
  return baseUrls[service];
};

const getAxiosInstance = (service) => {
  const instance = axios.create({
    baseURL: getBaseUrl(service)
  });

  instance.interceptors.request.use(
    (config) => {
      // Do not attach token for '/login' endpoint
      if (config.url === "/login") {
        return config;
      }

      const token = getAccessToken();
      if (token) {
        if (isTokenExpired(token)) {
          // Token is expired, redirect to login
          redirectToLogin();
        } else {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // Handle 401 as a success case for specific API if needed
        if (error.response.status === 401) {
          console.warn("Received 401 Unauthorized response.");

          // Check if the specific API treats 401 as a success
          if (error.response.config.url.includes("YOUR_API_PATH_THAT_RETURNS_401_AS_SUCCESS")) {
            return Promise.resolve(error.response); // Consider it a success and resolve
          } else {
            // Only redirect to login for non-success 401 responses
            // redirectToLogin();
          }
        } else if (axios.isCancel(error)) {
          console.warn("Request canceled:", error.message);
        } else {
          console.error("API error:", error);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const getAccessToken = () => {
  const base64EncodedData = localStorage.getItem("token");
  const decodedData = decodeBase64Data(base64EncodedData);

  if (decodedData) {
    const { token } = decodedData;
    return token;
  } else {
    // No token found, redirect to login
    return null;
  }
};

const   isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return decodedToken.exp < currentTime; // Check if token has expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

const redirectToLogin = () => {
  // Clear token from local storage
  localStorage.removeItem("token");
  // Redirect to login page using window.location.href or window.location.assign
  window.location.assign("/login"); // or window.location.href = "/login";
};

export { getAxiosInstance, getAccessToken };
