import api from "./index";

export const analyzeText = async (text) => {
  const res = await api.post("/analyze/text", { text });
  return res.data;
};

export const getAnalysisById = async (id) => {
  const res = await api.get(`/analyze/${id}`);
  return res.data;
};
