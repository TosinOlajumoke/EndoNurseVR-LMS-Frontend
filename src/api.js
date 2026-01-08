// Centralized API configuration file
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://endonursevr-lms-backend.onrender.com"
).replace(/\/+$/, "");
