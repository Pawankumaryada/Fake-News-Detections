import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [
      { term: 'Bitcoin analysis', timestamp: '2024-01-20T10:30:00' },
      { term: 'Tesla stock news', timestamp: '2024-01-19T14:45:00' },
      { term: 'Federal Reserve', timestamp: '2024-01-18T09:15:00' },
    ];
    setSearchHistory(savedHistory);
    
    // Mock trending searches
    setTrendingSearches([
      { term: 'Stock Market', count: 1250 },
      { term: 'Crypto Scam', count: 890 },
      { term: 'Election News', count: 760 },
      { term: 'Company Rumors', count: 540 },
    ]);
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) return;

    // Update search history
    const updatedHistory = [
      { term: query, timestamp: new Date().toISOString() },
      ...searchHistory.filter(item => item.term.toLowerCase() !== query.toLowerCase()).slice(0, 9)
    ];
    
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const removeFromHistory = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return {
    searchQuery,
    setSearchQuery,
    searchHistory,
    trendingSearches,
    handleSearch,
    clearHistory,
    removeFromHistory
  };
};

export default useSearch;