import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://fake-news-backend-xom8.onrender.com"; // your backend

export default function VerifyNews() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/predict`, {
        text: text,
      });

      setResult(res.data);
    } catch (err) {
      setError("Verification failed. Backend not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        🛡️ Verify News
      </h1>

      <textarea
        rows="6"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste news or claim here..."
        className="w-full border rounded-lg p-4 focus:ring-indigo-500"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Analyzing..." : "Verify"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2
            className={`text-xl font-bold ${
              result.label === "FAKE" ? "text-red-600" : "text-green-600"
            }`}
          >
            {result.label === "FAKE" ? "❌ Fake News" : "✅ Real News"}
          </h2>

          <p className="mt-2">
            Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong>
          </p>

          {result.explanation && (
            <p className="mt-2 text-gray-700">
              {result.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
