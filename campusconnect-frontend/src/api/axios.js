// frontend/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://campus-connect-backend-wpxg.onrender.com/api",
});

export default instance;
