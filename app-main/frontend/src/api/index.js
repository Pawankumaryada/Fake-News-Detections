import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://fake-news-backend-xom8.onrender.com",
});

export default api;

/* 🔥 RE-EXPORT ALL API MODULES 🔥 */
export * from "./text";
export * from "./gnews";
