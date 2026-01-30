import api from "./index";

export const analyzeText = async (text) => {
  const res = await api.post("/api/analyze/text", { text });
  return res.data;
};

export const getAnalysisById = async (id) => {
  const res = await api.get(`/api/analyze/${id}`);
  return res.data;
};
