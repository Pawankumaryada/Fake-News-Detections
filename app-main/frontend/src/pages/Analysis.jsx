import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "../index.css";

import {
  ArrowLeft,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  HelpCircle,
} from "lucide-react";

import { Button } from "../components/ui/button";

const API = "http://127.0.0.1:8000/api";

/* ---------------- SAFE HELPERS ---------------- */
const safeString = (v, fallback = "N/A") =>
  typeof v === "string" && v.trim() ? v : fallback;

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !isNaN(v) ? v : fallback;

export default function Analysis() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ANALYSIS ---------------- */
  useEffect(() => {
    if (id) fetchAnalysis();
    // eslint-disable-next-line
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const res = await axios.get(`${API}/analysis/${id}`);
      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load analysis");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SHARE ---------------- */
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  /* ---------------- LOADING ---------------- */
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
        Analysis not available
      </div>
    );
  }

  /* ---------------- BACKEND AUTHORITY ---------------- */
  const verdict = safeString(analysis.verdict).toUpperCase();
  const confidence = safeNumber(analysis.confidence);

const fakeSignals = safeNumber(analysis.breakdown?.fake_signals);
const realSignals = safeNumber(analysis.breakdown?.real_signals);

let fakePercent = 0;
let realPercent = 0;

if (analysis.verdict === "UNVERIFIED") {
  // Neutral visualization for uncertainty
  fakePercent = 50;
  realPercent = 50;
} else {
  const total = fakeSignals + realSignals || 1;
  fakePercent = Math.round((fakeSignals / total) * 100);
  realPercent = 100 - fakePercent;
}


  /* ---------------- UI HELPERS ---------------- */
  const verdictColor =
    verdict === "TRUE"
      ? "bg-green-600"
      : verdict === "FALSE"
      ? "bg-red-600"
      : "bg-yellow-500";

  const verdictIcon =
    verdict === "TRUE" ? "✅" : verdict === "FALSE" ? "❌" : "⚠️";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-2xl font-bold">Veritas AI</h1>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* VERDICT */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Verdict</h2>

          <div
            className={`inline-block px-10 py-4 text-white text-xl font-bold rounded ${verdictColor}`}
          >
            {verdictIcon} {verdict}
          </div>

          <p className="text-slate-600 text-sm">
            Based on ML + AI + source verification
          </p>
        </div>

        {/* CONFIDENCE BAR */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-3">Confidence Score</h3>
          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 bg-blue-600"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-slate-600">{confidence}% confidence</p>
        </div>

        {/* ML vs AI BREAKDOWN */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold">ML vs AI Signal Breakdown</h3>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Real Signals (ML / AI)</span>
              <span>{realPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded">
              <div
                className="h-3 bg-green-600 rounded"
                style={{ width: `${realPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Fake Signals</span>
              <span>{fakePercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded">
              <div
                className="h-3 bg-red-600 rounded"
                style={{ width: `${fakePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* UNVERIFIED EXPLANATION */}
        {verdict === "UNVERIFIED" && (
          <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">
                Why is this Unverified?
              </h3>
            </div>
            <p className="text-sm text-yellow-700">
              The system did not find enough reliable evidence to confidently
              classify this content as true or false. This may happen when
              trusted sources are missing, signals are balanced, or the claim is
              too recent. Manual verification is recommended.
            </p>
          </div>
        )}

        {/* FALSE EXPLANATION */}
        {verdict === "FALSE" && (
          <div className="border border-red-200 bg-red-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="text-red-600" />
              <h3 className="font-semibold text-red-800">
                AI Analysis Summary
              </h3>
            </div>
            <p className="text-sm text-red-700">
              This content shows strong indicators of misinformation, misleading
              claims, or unreliable sourcing. Please verify using trusted
              fact-checking platforms before sharing.
            </p>
          </div>
        )}

        {/* WIKIPEDIA BADGE */}
        <div className="bg-white border rounded-lg p-6 flex items-center gap-3">
          <Info className="text-blue-600" />
          <span className="text-sm">
            Cross-referenced with public knowledge sources (e.g. Wikipedia)
          </span>
          <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded">
            Wikipedia Verified
          </span>
        </div>

        {/* TIMESTAMP */}
        <div className="text-center text-xs text-slate-500">
          {new Date(analysis.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
