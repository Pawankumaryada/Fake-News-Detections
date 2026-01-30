import api from "./index";

export async function analyzeText(text) {
  const res = await api.post("/api/analyze/text", { text });
  return res.data;
}

export async function getAnalysisById(id) {
  const res = await api.get(`/api/analyze/${id}`);
  return res.data;
}
