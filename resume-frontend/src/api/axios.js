import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  // Don't send auth header on login/register endpoints
  if (config.url && config.url.includes("/auth/")) {
    return config;
  }
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
