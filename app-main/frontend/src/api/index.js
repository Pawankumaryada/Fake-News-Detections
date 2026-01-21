import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

/* ================= TEXT ANALYSIS ================= */
export async function analyzeText(text) {
  const res = await api.post("/api/analyze/text", { text });
  return res.data;
}

/* ================= FETCH RESULT ================= */
export async function getAnalysisById(id) {
  const res = await api.get(`/api/analyze/${id}`)

  return res.data;
}

export default api;
