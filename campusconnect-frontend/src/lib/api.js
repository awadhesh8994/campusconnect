import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👉 from .env
  withCredentials: true,                // only if you use cookies
});

export default API;
