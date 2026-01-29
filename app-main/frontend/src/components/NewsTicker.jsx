import { useState, useEffect } from "react";
import "../index.css";

export default function NewsTicker() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("NewsData.io");

  // Fallback news items
  const fallbackNews = [
    "🔴 Breaking: AI tools now detecting 95% of deepfake content automatically",
    "🚨 Alert: Social platforms report 40% increase in election misinformation",
    "🤖 Technology: New browser extensions verify news credibility in real-time",
    "📱 Update: WhatsApp limits message forwarding to combat viral misinformation",
    "🌐 Global: International coalition forms to combat state-sponsored disinformation",
    "🔍 Tip: Always check publication date and author credentials",
    "📊 Statistics: 72% of adults verify news before sharing, up from 45%",
    "🎓 Education: Digital literacy now mandatory in schools across 30 countries"
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get API key from environment variables
        const API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;
        
        if (!apiKey || apiKey === "your_newsdata_api_key_here") {
          throw new Error("Please add your NewsData.io API key to .env file");
        }

        // Fetch news from NewsData.io API
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&country=us,gb&language=en&category=technology,politics&size=10`
        );

        // Check response status
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        
        // Check if we got results
        if (data.results && data.results.length > 0) {
          const formattedNews = data.results.slice(0, 8).map((article, index) => {
            // Clean up title and add emoji based on category
            let emoji = "📰";
            if (article.category && article.category.includes("technology")) emoji = "🤖";
            if (article.category && article.category.includes("politics")) emoji = "🏛️";
            
            const cleanTitle = article.title
              .replace(/[^\w\s.,!?\-']/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
            
            return `${emoji} ${cleanTitle.substring(0, 90)}...`;
          });
          
          setNewsItems(formattedNews);
          setSource("NewsData.io");
        } else {
          // No results, use fallback
          throw new Error("No news articles found");
        }
        
      } catch (error) {
        console.error("News API Error:", error.message);
        setError(error.message);
        setNewsItems(fallbackNews);
        setSource("Fallback News");
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchNews();
    
    // Refresh news every 10 minutes (600000ms)
    const intervalId = setInterval(fetchNews, 10 * 60 * 1000);
    
    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="ticker">
        <div className="ticker-content loading">
          <span className="loading-text">
            <span className="loading-dot">●</span>
            <span className="loading-dot">●</span>
            <span className="loading-dot">●</span>
            Loading latest news from {source}...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="ticker">
      <div className="ticker-header">
        <span className="source-badge">{source}</span>
        {error && (
          <span className="error-badge" title={error}>
            ⚠️ Using cached news
          </span>
        )}
      </div>
      
      <div className="ticker-content">
        {newsItems.map((item, index) => (
          <span 
            key={index} 
            className="ticker-item"
            title="Click to pause"
            onClick={(e) => {
              const content = e.currentTarget.closest('.ticker-content');
              if (content.style.animationPlayState === 'paused') {
                content.style.animationPlayState = 'running';
              } else {
                content.style.animationPlayState = 'paused';
              }
            }}
          >
            {item} |
          </span>
        ))}
      </div>
    </div>
  );
}
