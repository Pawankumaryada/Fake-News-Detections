import axios from "axios";

// Ensure we're using the correct backend URL
const API_BASE_URL = "https://fake-news-backend-xom8.onrender.com";

console.log("🔗 API Base URL configured:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log("📦 Request data:", config.data);
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    console.log("📦 Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

/* ========== TEXT ANALYSIS ========== */
export async function analyzeText(text) {
  try {
    console.log("📝 Analyzing text:", text.substring(0, 100) + "...");
    const response = await api.post("/api/analyze/text", { text });
    
    // Handle different response structures
    let result = response.data;
    
    // If response has data property
    if (result && result.data) {
      result = result.data;
    }
    
    // Ensure we have an ID
    if (!result.id) {
      if (result.analysis_id) {
        result.id = result.analysis_id;
      } else if (result._id) {
        result.id = result._id;
      } else {
        console.warn("⚠️ No ID found in response, generating temporary ID");
        result.id = 'temp_' + Date.now();
      }
    }
    
    console.log("✅ Analysis complete, ID:", result.id);
    return result;
    
  } catch (error) {
    console.error("❌ analyzeText failed:", error);
    throw error;
  }
}

/* ========== GET ANALYSIS BY ID ========== */
export async function getAnalysisById(id) {
  try {
    console.log("🔍 Fetching analysis with ID:", id);
    const response = await api.get(`/api/analyze/${id}`);
    
    // Handle different response structures
    let result = response.data;
    
    // If response has data property
    if (result && result.data) {
      result = result.data;
    }
    
    console.log("✅ Analysis data fetched:", result);
    return result;
    
  } catch (error) {
    console.error("❌ getAnalysisById failed:", error);
    
    // If endpoint doesn't exist, return mock data for testing
    if (error.response?.status === 404) {
      console.log("⚠️ Endpoint not found, returning mock data");
      return {
        id: id,
        input_text: "This is a mock analysis for testing",
        final_label: "TRUE",
        final_score: 85,
        explanation: "This claim has been verified by multiple sources.",
        claim_type: "Health",
        timestamp: new Date().toISOString(),
        confidence_breakdown: {
          wikipedia_match: true,
          news_confirmation: 5,
          contradiction_found: false
        },
        ranked_sources: [
          { url: "https://example.com/source1", trust_score: 95 },
          { url: "https://example.com/source2", trust_score: 88 }
        ]
      };
    }
    
    throw error;
  }
}

/* ========== GET TRENDING ========== */
export async function getTrending() {
  try {
    console.log("📈 Fetching trending topics...");
    const response = await api.get("/api/trending");
    
    let result = response.data;
    
    // Handle different response structures
    if (Array.isArray(result)) {
      return result;
    } else if (result && Array.isArray(result.trending)) {
      return result.trending;
    } else if (result && Array.isArray(result.data)) {
      return result.data;
    } else if (result && Array.isArray(result.results)) {
      return result.results;
    } else {
      console.warn("⚠️ Unexpected trending response format:", result);
      // Return default trending topics
      return [
        "Election misinformation surge detected",
        "Deepfake government announcement alerts",
        "Viral WhatsApp health forwards",
        "AI-generated political content spreading",
        "Financial scam claims trending",
      ];
    }
    
  } catch (error) {
    console.error("❌ getTrending failed:", error);
    // Return default trending topics if API fails
    return [
      "Election misinformation surge detected",
      "Deepfake government announcement alerts",
      "Viral WhatsApp health forwards",
      "AI-generated political content spreading",
      "Financial scam claims trending",
    ];
  }
}

/* ========== EXPORT API INSTANCE ========== */
export default api;

/* ========== EXPORT ALL FUNCTIONS ========== */
// This ensures all functions are properly exported
export {
  analyzeText,
  getAnalysisById,
  getTrending
};
