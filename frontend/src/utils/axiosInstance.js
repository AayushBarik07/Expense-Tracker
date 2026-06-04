import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  timeout: 10000,
  headers: {
    "Content-type" : "application/json",
    Accept: "application/json",  
  },
});

// Request Interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || "";
    const isAuthRequest =
      url.includes("/api/v1/auth/login") ||
      url.includes("/api/v1/auth/register") ||
      url.includes("/api/v1/auth/upload-image");

    if (status === 401 && !isAuthRequest) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    else if (status === 500) {
      console.error("Server error:", error.response.data);
      alert("An unexpected error occurred. Please try again later.");
    }
    else if (error.code === "ECONNABORTED") {
      console.error("Request timeout:", error.message);
      alert("The request took too long. Please check your internet connection and try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;