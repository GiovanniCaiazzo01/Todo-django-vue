import { errorBus } from "@/lib/mitt/error-bus";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authtoken");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error?.message);
    let correlationId = undefined;
    const status = error.response?.status;
    const statusText = error.response?.statusText;
    const url = error.config?.url;
    const isServerError =
      status >= 500 || statusText === "Internal Server Error";
    if (isServerError) {
      correlationId =
        error.response?.headers?.["x-correlation-id"] ??
        error.response?.data?.traceId;

      errorBus.emit("apiError", {
        status,
        url,
        correlationId,
        message: "Internal server error, please try again later",
      });
    }

    return Promise.reject(error);
  },
);

export default api;
