import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../index.css";
import { analyzeText, getTrending } from "../api";



import {
  Loader2,
  Link as LinkIcon,
  FileText,
  ShieldCheck,
  Flame,
  Tv,
  MessageCircle,
  Sparkles,
  Zap,
  Target,
  Globe,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  ArrowRight,
  Brain,
  Shield,
  TrendingUp,
  Cpu
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Skeleton } from "../components/ui/skeleton";


export default function Home() {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */
  const [activeTab, setActiveTab] = useState("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [stats, setStats] = useState({ analyses: 12547, accuracy: 96.2, claims: 8923 });

  /* ---------------- TRENDING ---------------- */
/* ---------------- TRENDING ---------------- */
useEffect(() => {
  const fetchTrending = async () => {
    try {
      const data = await getTrending();
      setTrending(data);
    } catch {
      setTrending([
        "Election misinformation surge detected",
        "Deepfake government announcement alerts",
        "Viral WhatsApp health forwards",
        "AI-generated political content spreading",
        "Financial scam claims trending",
      ]);
    } finally {
      setTrendingLoading(false);
    }
  };

  fetchTrending();
  const interval = setInterval(fetchTrending, 30000);
  return () => clearInterval(interval);
}, []);

/* ---------------- ANALYZE TEXT ---------------- */
const handleAnalyzeText = async () => {
  if (text.trim().length < 5) {
    toast.error("Text must be at least 5 characters");
    return;
  }

  setLoading(true);
  try {
    const result = await analyzeText(text);
    navigate(`/analysis/${result.id}`);
  } catch (e) {
    toast.error("Analysis failed");
  } finally {
    setLoading(false);
  }
};

  /* ---------------- ANALYZE URL ---------------- */
const handleAnalyzeURL = async () => {
  toast.info("URL analysis coming soon 🚧");
};


    setLoading(true);
    try {
      const res = await axios.post(`${API}/analyze/url`, { url });
      navigate(`/analysis/${res.data.id}`);
    } catch {
      toast.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Stats Bar */}
      <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border-b border-blue-200/30">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">{stats.analyses.toLocaleString()}</span>
                <span className="text-xs text-slate-600">Analyses Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">{stats.accuracy}%</span>
                <span className="text-xs text-slate-600">Accuracy Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">{stats.claims.toLocaleString()}</span>
                <span className="text-xs text-slate-600">Claims Detected</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">System Active</span>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Truth Verification</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
               Truth and Fact Here
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                nothing to worry 
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              Advanced artificial intelligence system analyzing text, images, and videos 
              to detect misinformation with <span className="font-semibold text-blue-600">96.2% accuracy</span>.
            </p>
          </div>

          {/* Analysis Card - Premium Version */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-blue-100/50 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  <Search className="w-6 h-6 text-blue-600 mr-3" />
                  Verify Content Instantly
                </h2>
                <p className="text-slate-600 mt-1">Paste text or enter URL for forensic analysis</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Multi-Model AI</div>
                  <div className="text-xs text-slate-500">Active</div>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger 
                  value="text" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-slate-200 rounded-lg"
                >
                  <div className="flex items-center justify-center space-x-2 py-2">
                    <FileText className="w-4 h-4" />
                    <span>Text Analysis</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="url"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-slate-200 rounded-lg"
                >
                  <div className="flex items-center justify-center space-x-2 py-2">
                    <LinkIcon className="w-4 h-4" />
                    <span>URL Analysis</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4 animate-in fade-in duration-300">
                {loading ? (
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                ) : (
                  <>
                    <div className="relative">
                      <Textarea
                        placeholder="Paste news article, social media post, or any suspicious content here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[200px] text-lg border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl resize-none"
                      />
                      <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                        <div className="text-xs text-slate-500">
                          {text.length}/5000 chars
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleAnalyzeText} 
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-3" />
                          Analyzing with AI...
                        </>
                      ) : (
                        <>
                          <span>Start  Analysing </span>
                          <ArrowRight className="ml-3 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </>
                )}
              </TabsContent>

              <TabsContent value="url" className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-4">
                  <Input
                    placeholder="https://example.com/news-article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-14 text-lg border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl"
                  />
                  <Button 
                    onClick={handleAnalyzeURL} 
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-3" />
                        Scanning URL...
                      </>
                    ) : (
                      <>
                        <span>Analyze URL Content</span>
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: CheckCircle, text: "Fact-Checking", color: "text-green-600" },
                  { icon: Shield, text: "Bias Detection", color: "text-blue-600" },
                  { icon: Cpu, text: "Deepfake Analysis", color: "text-purple-600" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <item.icon className={`w-5 h-5 mx-auto mb-2 ${item.color}`} />
                    <div className="text-sm font-medium">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Credibility Score",
                value: "0–100",
                description: "Forensic credibility assessment",
                icon: BarChart3,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Bias Detection",
                value: "Multi-Dimensional",
                description: "Political & emotional bias mapping",
                icon: Target,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Source Validation",
                value: "Publisher Rating",
                description: "Historical credibility analysis",
                icon: Globe,
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-8">
          {/* Trending Claims */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center">
                <Flame className="w-5 h-5 text-orange-500 mr-3" />
                Trending Claims
              </h3>
              <div className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                Live
              </div>
            </div>

            {trendingLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {trending.map((t, i) => (
                  <div 
                    key={i} 
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200 group cursor-pointer"
                    onClick={() => {
                      setText(t);
                      setActiveTab("text");
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                          {t}
                        </div>
                        <div className="flex items-center mt-2 space-x-3">
                          <div className="flex items-center text-xs text-slate-500">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </div>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="w-3 h-3 mr-1" />
                            Just now
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Updates every 30 seconds • {trending.length} active claims
              </div>
            </div>
          </div>

          {/* Live TV Monitoring */}
          <div
            className="bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 text-white rounded-2xl p-6 cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] group"
            onClick={() => navigate("/livetv")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Tv className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-blue-200 font-medium">LIVE MONITORING</div>
                  <h3 className="font-bold text-xl">TV Stream Analysis</h3>
                </div>
              </div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-blue-200 mb-6">
              Real-time fact-checking of live news broadcasts and streams
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-900"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-blue-900"></div>
                  <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-blue-900"></div>
                </div>
                <span className="text-sm text-blue-200">24+ channels active</span>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* AI Chat Assistant */}
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] group"
            onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xs text-purple-600 font-medium">AI ASSISTANT</div>
                <h3 className="font-bold text-xl">Ask Veritas AI</h3>
              </div>
            </div>
            <p className="text-slate-600 mb-6">
              Chat with our AI to verify any claim instantly
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  Try: "Is this news real?"
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4">Verification Performance</h3>
            <div className="space-y-3">
              {[
                { label: "Analysis Speed", value: "0.8s", unit: "avg response" },
                { label: "Accuracy Rate", value: "96.2%", unit: "verified claims" },
                { label: "False Positives", value: "1.8%", unit: "industry low" },
                { label: "Model Version", value: "Veritas v3.1", unit: "latest AI" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600">{stat.label}</span>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
