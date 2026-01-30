import axios from "axios";

// Make ABSOLUTELY SURE this is your Render backend URL
const API_BASE_URL = "https://fake-news-backend-xom8.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add this to verify the URL
console.log("API Base URL configured as:", API_BASE_URL);

// Rest of your API functions remain the same...
export async function analyzeText(text) {
  const res = await api.post("/api/analyze/text", { text });
  return res.data;
}

// ... rest of the code
