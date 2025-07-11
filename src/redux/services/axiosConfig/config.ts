/**
 * Axios Client Configuration with Interceptors
 * 
 * This module exports a pre-configured Axios instance (`axiosClient`) for interacting with the ReqRes API.
 * 
 * Features:
 * - Sets a base URL and default headers for every request.
 * - Adds a custom `x-api-key` header for API access.
 * - Includes a request interceptor to:
 *   - Check for internet connectivity before sending requests.
 *   - Automatically attach a Bearer token from cookies (if available), except for authentication endpoints (`/login`, `/register`).
 * - Includes a response interceptor to:
 *   - Handle `401 Unauthorized` responses by clearing local storage and removing the access token cookie.
 *
 * Dependencies:
 * - `axios` for HTTP client.
 * - `js-cookie` for accessing cookies.
 *
 * Usage:
 * ```ts
 * import axiosClient from './path/to/axiosClient';
 * 
 * axiosClient.get('/users')
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 * ```
 * 
 * @module axiosClient
 */



import Cookies from "js-cookie";
import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export const API_BASE_URL = "https://reqres.in/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

// Request interceptor
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!navigator?.onLine) {
    console.warn("No internet connection");
    return config;
  }

  // Skip authorization header for auth endpoints
  const authEndpoints = ["/login", "/register"];
  const isAuthEndpoint = authEndpoints.some((endpoint) =>
    config.url?.includes(endpoint)
  );

  if (!isAuthEndpoint) {
    const token = Cookies.get("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.clear();
      Cookies.remove("accessToken");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
