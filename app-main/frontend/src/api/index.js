import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://fake-news-backend-xom8.onrender.com",
});

/* ================= TEXT ANALYSIS ================= */
export async function analyzeText(text) {
  const res = await api.post("/api/analyze/text", { text });
  return res.data;
}

/* ================= FETCH RESULT BY ID ================= */
export async function getAnalysisById(id) {
  const res = await api.get(`/api/analyze/${id}`);
  return res.data;
}

export default api;
