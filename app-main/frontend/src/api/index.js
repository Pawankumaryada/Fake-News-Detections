import axios from "axios";

/* ================= BASE URL ================= */

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:8000"
    : "https://fake-news-backend-xom8.onrender.com";

/* ================= AXIOS INSTANCE ================= */

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= TEXT ANALYSIS ================= */

export async function analyzeText(text) {
  const res = await api.post("/api/analyze/text", { text });
  return res.data;
}

/* ================= FETCH RESULT ================= */

export async function getAnalysisById(id) {
  const res = await api.get(`/api/analyze/${id}`);
  return res.data;
}

export default api;
