import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://fake-news-backend-xom8.onrender.com",
});

export default api;

/* ✅ NAMED EXPORTS (CRITICAL) */
export { analyzeText, getAnalysisById } from "./text";
