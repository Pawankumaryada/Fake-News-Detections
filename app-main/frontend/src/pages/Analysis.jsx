import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Info,
  XCircle,
  ExternalLink,
} from "lucide-react";

import { getAnalysisById } from "../api";

/* ---------------- VERDICT UI MAP ---------------- */

const verdictStyles = {
  TRUE: { color: "bg-green-600", icon: <CheckCircle2 size={22} /> },
  FALSE: { color: "bg-red-600", icon: <XCircle size={22} /> },
  "LIKELY TRUE": { color: "bg-lime-600", icon: <CheckCircle2 size={22} /> },
  UNVERIFIED: { color: "bg-yellow-500", icon: <AlertTriangle size={22} /> },
  OPINION: { color: "bg-blue-500", icon: <Info size={22} /> },
  PREDICTION: { color: "bg-purple-500", icon: <HelpCircle size={22} /> },
};

export default function Analysis() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ANALYSIS ---------------- */

  useEffect(() => {
    if (!id) return;

    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysisById(id); // ✅ API layer
        setAnalysis(data);
      } catch (err) {
        console.error("Analysis fetch failed:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id, navigate]);

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Analysis not found
      </div>
    );
  }

  const verdictUI =
    verdictStyles[analysis.final_label] || verdictStyles.UNVERIFIED;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-black"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-xl font-bold mx-auto">
            Veritas AI – Fact Check
          </h1>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* CLAIM */}
        <div className="bg-white border rounded p-5">
          <h3 className="font-semibold mb-2">Claim</h3>
          <p className="text-slate-700">{analysis.input_text}</p>
        </div>

        {/* VERDICT */}
        <div className="text-center space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-8 py-4 text-white rounded-lg text-xl font-bold ${verdictUI.color}`}
          >
            {verdictUI.icon}
            {analysis.final_label}
          </div>
          <p className="text-sm text-slate-600">
            Claim type: <b>{analysis.claim_type}</b>
          </p>
        </div>

        {/* EXPLANATION */}
        {analysis.explanation && (
          <div className="bg-white border rounded p-6">
            <h3 className="font-semibold mb-2">Why is this the verdict?</h3>
            <p className="text-slate-700">{analysis.explanation}</p>
          </div>
        )}

        {/* HIGHLIGHT */}
        {analysis.highlighted_text && (
          <div className="border border-red-300 bg-red-50 p-4 rounded">
            <p className="text-red-800 text-sm">
              ❌ Incorrect phrase detected:{" "}
              <b>{analysis.highlighted_text}</b>
            </p>
          </div>
        )}

        {/* CONFIDENCE */}
        <div className="bg-white border rounded p-6">
          <h3 className="font-semibold mb-3">Confidence Breakdown</h3>

          <div className="w-full bg-slate-200 rounded h-3 overflow-hidden">
            <div
              className="h-3 bg-blue-600"
              style={{ width: `${analysis.final_score || 0}%` }}
            />
          </div>

          <p className="text-sm mt-2 text-slate-600">
            Final confidence: {analysis.final_score || 0}%
          </p>

          {analysis.confidence_breakdown && (
            <ul className="mt-4 text-sm space-y-1 text-slate-700">
              <li>
                Wikipedia match:{" "}
                {analysis.confidence_breakdown.wikipedia_match ? "Yes" : "No"}
              </li>
              <li>
                News confirmations:{" "}
                {analysis.confidence_breakdown.news_confirmation}
              </li>
              <li>
                Contradiction found:{" "}
                {analysis.confidence_breakdown.contradiction_found
                  ? "Yes"
                  : "No"}
              </li>
            </ul>
          )}
        </div>

        {/* SOURCES */}
        {analysis.ranked_sources?.length > 0 && (
          <div className="bg-white border rounded p-6">
            <h3 className="font-semibold mb-3">Verified Sources</h3>

            <ul className="space-y-2">
              {analysis.ranked_sources.map((s, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline flex items-center gap-1"
                  >
                    <ExternalLink size={14} />
                    {s.url}
                  </a>
                  <span className="text-slate-500">
                    Trust: {s.trust_score}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* WIKIDATA */}
        {analysis.wikidata_id && (
          <div className="text-center text-xs text-slate-500">
            Wikidata ID: {analysis.wikidata_id}
          </div>
        )}

        {/* TIMESTAMP */}
        <div className="text-center text-xs text-slate-400">
          {new Date(analysis.timestamp).toLocaleString()}
        </div>
      </main>
    </div>
  );
}
