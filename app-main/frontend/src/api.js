// src/api.js
import axios from "axios";

const API_BASE_URL = "https://fake-news-backend-xom8.onrender.com";

console.log("API URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Add interceptors for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.message);
    return Promise.reject(error);
  }
);

// Export all API functions
export const analyzeText = async (text) => {
  try {
    console.log("Calling analyzeText...");
    const response = await api.post("/api/analyze/text", { text });
    console.log("analyzeText response:", response.data);
    return response.data;
  } catch (error) {
    console.error("analyzeText failed:", error);
    throw error;
  }
};

export const getAnalysisById = async (id) => {
  try {
    console.log("Calling getAnalysisById for:", id);
    const response = await api.get(`/api/analyze/${id}`);
    console.log("getAnalysisById response:", response.data);
    return response.data;
  } catch (error) {
    console.error("getAnalysisById failed:", error);
    throw error;
  }
};

export const getTrending = async () => {
  try {
    console.log("Calling getTrending...");
    const response = await api.get("/api/trending");
    console.log("getTrending response:", response.data);
    return response.data;
  } catch (error) {
    console.error("getTrending failed:", error);
    // Return default data
    return [
      "Election misinformation surge detected",
      "Deepfake government announcement alerts",
      "Viral WhatsApp health forwards",
      "AI-generated political content spreading",
      "Financial scam claims trending",
    ];
  }
};

// Export the axios instance as default
export default api;
