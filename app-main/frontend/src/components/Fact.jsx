import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Share2,
  Filter,
  Search,
  Zap,
  Shield,
  Globe,
  Calendar,
  ChevronRight,
  Info,
  Loader2,
} from "lucide-react";

const API = "http://127.0.0.1:8000/api";

const Fact = () => {
  const [loading, setLoading] = useState(true);
  const [facts, setFacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  const categories = [
    "all",
    "stock",
    "crypto",
    "economic",
    "earnings",
    "sentiment",
    "global",
  ];

  const timeframes = ["1h", "24h", "7d", "30d", "90d"];

  /* ---------------- FETCH LIVE FACTS ---------------- */

  const fetchFacts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API}/facts?category=${selectedCategory}&timeframe=${selectedTimeframe}&search=${search}`
      );
      const data = await res.json();
      setFacts(data);
    } catch (err) {
      console.error("Failed to load facts", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- AUTO REFRESH ---------------- */

  useEffect(() => {
    fetchFacts();
    const interval = setInterval(fetchFacts, 30000); // every 30 sec
    return () => clearInterval(interval);
  }, [selectedCategory, selectedTimeframe, search]);

  /* ---------------- BADGES ---------------- */

  const getStatusBadge = (label) => {
    if (label === "TRUE" || label === "VERIFIED") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" /> Verified
        </span>
      );
    }
    if (label === "FALSE") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" /> False
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
        <Clock className="w-3 h-3 mr-1" /> Unverified
      </span>
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Live Fact Dashboard</h1>
              <p className="text-gray-600">
                Real-time AI-powered fact verification
              </p>
            </div>
          </div>

          <button
            onClick={fetchFacts}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 flex flex-wrap gap-4 justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === c
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {c === "all" ? "All Categories" : c.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {timeframes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeframe(t)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedTimeframe === t
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facts..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* RESULTS */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          </div>
        ) : facts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No facts found
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {facts.map((fact) => (
              <div
                key={fact.id}
                className="bg-white rounded-xl shadow border p-6"
              >
                <div className="flex justify-between mb-3">
                  {getStatusBadge(fact.final_label)}
                  <span className="text-indigo-600 font-bold">
                    {fact.confidence || fact.final_score}%
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2">{fact.title}</h3>
                <p className="text-gray-600 mb-4">{fact.summary}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(fact.created_at).toLocaleString()}
                  </div>
                  <span className="capitalize">{fact.category}</span>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="text-indigo-600 flex items-center gap-1">
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Fact;
