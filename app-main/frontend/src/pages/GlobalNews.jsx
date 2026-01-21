import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GlobalNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiSource, setApiSource] = useState("NewsAPI");

  // Fallback news data
  const fallbackNews = [
    {
      title: "AI Tools Now Detect 95% of Deepfake Content",
      description: "New artificial intelligence systems can identify manipulated media with unprecedented accuracy, helping combat misinformation.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      source: { name: "TechNews" }
    },
    {
      title: "Global Coalition Forms to Combat Election Misinformation",
      description: "International alliance launches to protect democratic processes from disinformation campaigns ahead of major elections.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1551135049-8a33b2fb2d3e?w-800&auto=format&fit=crop",
      source: { name: "World Affairs" }
    },
    {
      title: "Social Media Platforms Enhance Content Moderation",
      description: "Major platforms deploy new AI algorithms to detect and remove false information while preserving free speech.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w-800&auto=format&fit=crop",
      source: { name: "Digital Watch" }
    },
    {
      title: "Digital Literacy Programs Expand in Schools Worldwide",
      description: "Educational systems incorporate media literacy to help students identify credible sources and combat misinformation.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w-800&auto=format&fit=crop",
      source: { name: "Education Today" }
    },
    {
      title: "New Verification Tools for Journalists and Fact-Checkers",
      description: "Open-source tools launched to help media professionals verify user-generated content and viral claims.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w-800&auto=format&fit=crop",
      source: { name: "Media Innovation" }
    },
    {
      title: "Public Trust in News Media Shows Gradual Recovery",
      description: "Recent surveys indicate increasing public confidence in established news organizations amid misinformation challenges.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w-800&auto=format&fit=crop",
      source: { name: "Media Trust Index" }
    }
  ];

  const tryNewsAPI = async () => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    if (!apiKey || apiKey === "your_newsapi_key_here") return null;
    
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?language=en&pageSize=12&apiKey=${apiKey}`,
        { timeout: 10000 }
      );
      if (res.data.articles && res.data.articles.length > 0) {
        return {
          source: "NewsAPI",
          data: res.data.articles.filter(article => article.title && article.url)
        };
      }
    } catch (err) {
      console.log("NewsAPI failed:", err.message);
    }
    return null;
  };

  const tryNewsDataIO = async () => {
    const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
    if (!apiKey) return null;
    
    try {
      const res = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&country=us,gb&language=en&size=12`,
        { timeout: 10000 }
      );
      if (res.data.results && res.data.results.length > 0) {
        const formattedArticles = res.data.results.map(item => ({
          title: item.title,
          description: item.description,
          url: item.link,
          urlToImage: item.image_url,
          source: { name: item.source_id || "NewsData.io" }
        }));
        return { source: "NewsData.io", data: formattedArticles };
      }
    } catch (err) {
      console.log("NewsData.io failed:", err.message);
    }
    return null;
  };

  const tryMediastack = async () => {
    const apiKey = import.meta.env.VITE_MEDIASTACK_API_KEY;
    if (!apiKey) return null;
    
    try {
      const res = await axios.get(
        `http://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&limit=12`,
        { timeout: 10000 }
      );
      if (res.data.data && res.data.data.length > 0) {
        const formattedArticles = res.data.data.map(item => ({
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.image,
          source: { name: item.source || "MediaStack" }
        }));
        return { source: "MediaStack", data: formattedArticles };
      }
    } catch (err) {
      console.log("MediaStack failed:", err.message);
    }
    return null;
  };

  const tryRSSFeed = async () => {
    try {
      // Using a proxy to avoid CORS issues
      const res = await axios.get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml",
        { timeout: 10000 }
      );
      
      if (res.data.items && res.data.items.length > 0) {
        const formattedArticles = res.data.items.slice(0, 12).map(item => ({
          title: item.title,
          description: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          url: item.link,
          urlToImage: item.enclosure?.link || `https://picsum.photos/800/400?random=${Math.random()}`,
          source: { name: "BBC News" }
        }));
        return { source: "BBC RSS", data: formattedArticles };
      }
    } catch (err) {
      console.log("RSS feed failed:", err.message);
    }
    return null;
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      // Try APIs in order of preference
      const apiAttempts = [
        tryNewsAPI,
        tryNewsDataIO,
        tryMediastack,
        tryRSSFeed
      ];
      
      for (const attempt of apiAttempts) {
        try {
          const result = await attempt();
          if (result && result.data.length > 0) {
            setNews(result.data);
            setApiSource(result.source);
            setLoading(false);
            return;
          }
        } catch (err) {
          continue; // Try next API
        }
      }
      
      // All APIs failed, use fallback
      setNews(fallbackNews);
      setApiSource("Fallback Data");
      setError("News APIs unavailable. Showing sample data.");
      setLoading(false);
    };

    fetchNews();
    
    // Refresh news every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            🌍 Global News Feed
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
              Source: {apiSource}
            </span>
            {error && (
              <span className="text-sm font-medium px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                ⚠️ {error}
              </span>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
          <span className="font-medium">Auto-refresh:</span> Every 15 minutes
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Fetching latest news from multiple sources...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {news.slice(0, 6).map((item, index) => (
              <a
                key={index}
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <div className="h-48 w-full overflow-hidden bg-gray-100">
                  {item.urlToImage ? (
                    <img 
                      src={item.urlToImage} 
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/800/400?random=${index}`;
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {item.source?.name || "Unknown"}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                    {item.description || "No description available."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Click to read full story</span>
                    <span className="text-indigo-500 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Additional News List */}
          {news.length > 6 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">More Headlines</h2>
              <div className="space-y-4">
                {news.slice(6, 12).map((item, index) => (
                  <a
                    key={index + 6}
                    href={item.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-white transition-colors group"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📄</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">{item.source?.name}</span>
                        <span className="text-xs text-indigo-500 group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>
          News powered by multiple APIs with automatic fallback systems. 
          For live updates, ensure API keys are configured in <code>.env</code> file.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            NewsAPI
          </a>
          <a href="https://newsdata.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            NewsData.io
          </a>
          <a href="https://mediastack.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            MediaStack
          </a>
          <a href="https://feeds.bbci.co.uk" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            BBC RSS
          </a>
        </div>
      </div>
    </div>
  );
}