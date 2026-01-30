import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://fake-news-backend-xom8.onrender.com";

export default function RecentScams() {
  const [scams, setScams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState("Loading...");
  const [stats, setStats] = useState({ total: 0, high: 0, medium: 0, low: 0 });

  // Comprehensive mock scam data for fallback
  const mockScams = [
    {
      id: 1,
      title: "Fake COVID-19 Relief Fund Scam",
      description: "Scammers posing as government officials contacting individuals offering fake COVID-19 relief funds in exchange for personal information and processing fees.",
      severity: "HIGH",
      date: "2024-01-15",
      category: "Government Impersonation",
      region: "Global",
      reported_by: "Cybersecurity Task Force",
      tags: ["phishing", "identity-theft", "financial"]
    },
    {
      id: 2,
      title: "AI-Generated Deepfake Investment Scam",
      description: "Fraudsters using AI-generated deepfake videos of celebrities to promote fake investment opportunities on social media platforms.",
      severity: "HIGH",
      date: "2024-01-12",
      category: "Investment Fraud",
      region: "North America",
      reported_by: "SEC Alert System",
      tags: ["deepfake", "investment", "social-media"]
    },
    {
      id: 3,
      title: "WhatsApp Gold Subscription Scam",
      description: "Users receiving messages about 'WhatsApp Gold' premium version requiring payment for exclusive features. Official WhatsApp does not charge for usage.",
      severity: "MEDIUM",
      date: "2024-01-10",
      category: "App Scams",
      region: "Asia, Europe",
      reported_by: "WhatsApp Security",
      tags: ["messaging", "subscription", "fake-app"]
    },
    {
      id: 4,
      title: "Fake Job Offer Phishing Campaign",
      description: "Scammers sending fraudulent job offers via email to collect personal data, bank details, and upfront 'training fees' from job seekers.",
      severity: "MEDIUM",
      date: "2024-01-08",
      category: "Employment Fraud",
      region: "Global",
      reported_by: "FTC Consumer Alert",
      tags: ["phishing", "employment", "data-theft"]
    },
    {
      id: 5,
      title: "Cryptocurrency Wallet Drainer",
      description: "Malicious browser extensions and fake wallet apps designed to drain cryptocurrency wallets by mimicking legitimate services.",
      severity: "HIGH",
      date: "2024-01-05",
      category: "Cryptocurrency Fraud",
      region: "Global",
      reported_by: "Crypto Security Watch",
      tags: ["crypto", "wallet", "browser-extension"]
    },
    {
      id: 6,
      title: "Fake Tech Support Call Center",
      description: "International call centers pretending to be Microsoft/Apple support, convincing users to grant remote access and pay for unnecessary services.",
      severity: "MEDIUM",
      date: "2024-01-03",
      category: "Tech Support Scam",
      region: "India, USA",
      reported_by: "Microsoft Security",
      tags: ["tech-support", "remote-access", "cold-calling"]
    },
    {
      id: 7,
      title: "QR Code Phishing (Quishing)",
      description: "Attackers placing malicious QR codes in public places that redirect to phishing websites when scanned, stealing login credentials.",
      severity: "MEDIUM",
      date: "2024-01-01",
      category: "Physical-Digital Hybrid",
      region: "Europe, North America",
      reported_by: "Interpol Cybercrime",
      tags: ["qr-code", "phishing", "physical"]
    },
    {
      id: 8,
      title: "Fake Charity Donation Sites",
      description: "Fraudulent websites created during natural disasters or crises to collect donations that never reach intended recipients.",
      severity: "LOW",
      date: "2023-12-28",
      category: "Charity Fraud",
      region: "Global",
      reported_by: "Better Business Bureau",
      tags: ["charity", "donation", "website-fraud"]
    }
  ];

  // Fetch from backend API
  const fetchFromBackend = async () => {
    try {
      const response = await axios.get(`${API_BASE}/scams`, {
        timeout: 8000,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const processedScams = response.data.map(scam => ({
          ...scam,
          date: scam.date || new Date().toISOString().split('T')[0],
          severity: scam.severity || "MEDIUM"
        }));
        
        // Store in localStorage for offline use
        localStorage.setItem('cachedScams', JSON.stringify(processedScams));
        localStorage.setItem('cachedScamsTimestamp', Date.now());
        
        return {
          source: "Backend API",
          data: processedScams
        };
      }
    } catch (err) {
      console.log("Backend API failed:", err.message);
    }
    return null;
  };

  // Try cached data
  const getCachedData = () => {
    try {
      const cached = localStorage.getItem('cachedScams');
      const timestamp = localStorage.getItem('cachedScamsTimestamp');
      
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp);
        // Use cache if less than 24 hours old
        if (age < 24 * 60 * 60 * 1000) {
          return {
            source: "Cached Data (24h)",
            data: JSON.parse(cached)
          };
        }
      }
    } catch (err) {
      console.log("Cache read failed:", err.message);
    }
    return null;
  };

  // Try public API fallbacks
  const fetchFromPublicAPI = async () => {
    // Example: If you had a public scam database API
    // You can integrate with services like:
    // - FTC Consumer Alerts API
    // - Scamwatch API (Australia)
    // - Your own public endpoint
    
    // For now, return null - you can implement later
    return null;
  };

  // Calculate statistics
  const calculateStats = (scamList) => {
    const stats = {
      total: scamList.length,
      high: scamList.filter(s => s.severity === "HIGH").length,
      medium: scamList.filter(s => s.severity === "MEDIUM").length,
      low: scamList.filter(s => s.severity === "LOW").length,
    };
    setStats(stats);
  };

  useEffect(() => {
    const loadScams = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try sources in order of preference
        const sources = [
          fetchFromBackend,
          getCachedData,
          fetchFromPublicAPI
        ];

        let success = false;
        
        for (const source of sources) {
          try {
            const result = await (typeof source === 'function' ? source() : source);
            if (result && result.data && result.data.length > 0) {
              setScams(result.data);
              setDataSource(result.source);
              calculateStats(result.data);
              success = true;
              break;
            }
          } catch (err) {
            continue; // Try next source
          }
        }

        // If all sources fail, use mock data
        if (!success) {
          setScams(mockScams);
          setDataSource("Mock Data (Backend Offline)");
          calculateStats(mockScams);
          setError("Backend unavailable. Showing sample scam alerts.");
          
          // Store mock data in cache for future
          localStorage.setItem('cachedScams', JSON.stringify(mockScams));
          localStorage.setItem('cachedScamsTimestamp', Date.now());
        }

      } catch (err) {
        console.error("Failed to load scams:", err);
        setError("Unable to load scam data. Please check your connection.");
        setScams(mockScams.slice(0, 4)); // Show limited mock data
        setDataSource("Emergency Fallback");
        calculateStats(mockScams.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    loadScams();
    
    // Refresh every 5 minutes if backend is live
    const interval = setInterval(loadScams, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Severity color mapping
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "HIGH": return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
      case "MEDIUM": return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
      case "LOW": return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
    }
  };

  // Category color mapping
  const getCategoryColor = (category) => {
    const colors = {
      "Government Impersonation": "bg-purple-100 text-purple-800",
      "Investment Fraud": "bg-blue-100 text-blue-800",
      "App Scams": "bg-indigo-100 text-indigo-800",
      "Employment Fraud": "bg-amber-100 text-amber-800",
      "Cryptocurrency Fraud": "bg-cyan-100 text-cyan-800",
      "Tech Support Scam": "bg-orange-100 text-orange-800",
      "Physical-Digital Hybrid": "bg-pink-100 text-pink-800",
      "Charity Fraud": "bg-teal-100 text-teal-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🚨 Recent Scam Alerts
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                Source: {dataSource}
              </span>
              {error && (
                <span className="text-sm font-medium px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                  ⚠️ {error}
                </span>
              )}
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-gray-600">Total Alerts</div>
            </div>
            <div className="bg-white border rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-red-600">{stats.high}</div>
              <div className="text-xs text-gray-600">High Risk</div>
            </div>
            <div className="bg-white border rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
              <div className="text-xs text-gray-600">Medium Risk</div>
            </div>
            <div className="bg-white border rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.low}</div>
              <div className="text-xs text-gray-600">Low Risk</div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
          <span className="font-medium">Protect Yourself:</span> Never share personal information, verify sources independently, and report suspicious activity to authorities.
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading latest scam alerts...</p>
          <p className="text-sm text-gray-500 mt-2">Checking backend and cached data</p>
        </div>
      ) : (
        <>
          {/* Scam Alerts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {scams.map((scam) => {
              const severityColors = getSeverityColor(scam.severity);
              
              return (
                <div
                  key={scam.id || scam.title}
                  className={`border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ${severityColors.border}`}
                >
                  {/* Header with severity and category */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityColors.bg} ${severityColors.text}`}>
                        {scam.severity} RISK
                      </span>
                      {scam.category && (
                        <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(scam.category)}`}>
                          {scam.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {scam.region && <span className="mr-3">📍 {scam.region}</span>}
                      <span>📅 {scam.date}</span>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h2 className="font-bold text-xl text-gray-900 mb-3">
                    {scam.title}
                  </h2>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {scam.description}
                  </p>

                  {/* Tags and Metadata */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {scam.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-gray-500">
                        {scam.reported_by && (
                          <>Reported by: <span className="font-medium">{scam.reported_by}</span></>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          // You can implement reporting/flagging functionality
                          alert(`Reporting scam: ${scam.title}`);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      >
                        Report Similar →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🛡️ How to Protect Yourself</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-indigo-600 font-bold text-lg mb-2">1. Verify Independently</div>
                <p className="text-gray-700 text-sm">Contact organizations directly using official numbers/websites, not links provided in suspicious messages.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-indigo-600 font-bold text-lg mb-2">2. Check for Red Flags</div>
                <p className="text-gray-700 text-sm">Urgent requests, poor grammar, unsolicited contacts, and requests for payment via gift cards are common scam signs.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-indigo-600 font-bold text-lg mb-2">3. Report Suspicious Activity</div>
                <p className="text-gray-700 text-sm">Report scams to local authorities, FTC, or cybersecurity agencies to help prevent others from falling victim.</p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-500 border-t pt-6">
            <p>
              Scam data is updated regularly. {scams.length >= 4 ? "Showing " + scams.length + " recent alerts." : "Backend connection issues - showing cached/mock data."}
            </p>
            <div className="mt-3 flex justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
              >
                Refresh Data
              </button>
              <button
                onClick={() => alert("This would connect to your backend. Ensure it's running on http://127.0.0.1:8000")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Check Backend Connection
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
