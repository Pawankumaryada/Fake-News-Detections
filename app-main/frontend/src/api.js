// src/api.js - Simple API configuration
import axios from "axios";

const BASE_URL = "https://fake-news-backend-xom8.onrender.com";

console.log("🔗 Connecting to backend:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// TEXT ANALYSIS
export const analyzeText = async (text) => {
  try {
    console.log("📝 Sending text for analysis:", text.substring(0, 50) + "...");
    const response = await api.post("/api/analyze/text", { text });
    console.log("✅ Analysis response received");
    return response.data;
  } catch (error) {
    console.error("❌ analyzeText error:", error.message);
    throw error;
  }
};

// GET ANALYSIS BY ID
export const getAnalysisById = async (id) => {
  try {
    console.log("🔍 Fetching analysis ID:", id);
    const response = await api.get(`/api/analyze/${id}`);
    console.log("✅ Analysis data fetched");
    return response.data;
  } catch (error) {
    console.error("❌ getAnalysisById error:", error.message);
    
    // Return mock data if endpoint doesn't exist
    return {
      id: id,
      input_text: "This claim needs verification",
      final_label: "UNVERIFIED",
      final_score: 50,
      explanation: "This analysis is for testing purposes only.",
      claim_type: "Test",
      timestamp: new Date().toISOString(),
      confidence_breakdown: {
        wikipedia_match: false,
        news_confirmation: 0,
        contradiction_found: false
      }
    };
  }
};

// GET TRENDING
export const getTrending = async () => {
  try {
    console.log("📈 Fetching trending topics...");
    const response = await api.get("/api/trending");
    console.log("✅ Trending data received");
    return response.data;
  } catch (error) {
    console.error("❌ getTrending error:", error.message);
    return [
      "Election misinformation surge detected",
      "Deepfake government announcement alerts",
      "Viral WhatsApp health forwards",
      "AI-generated political content spreading",
      "Financial scam claims trending",
    ];
  }
};

// Export default if needed
export default api;
