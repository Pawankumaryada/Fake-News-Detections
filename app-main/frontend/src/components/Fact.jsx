import React, { useState, useEffect } from 'react';
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
  FileText,
  PieChart,
  Zap,
  Shield,
  Globe,
  Calendar,
  ChevronRight,
  Info,
  Loader2
} from 'lucide-react';

const Analysis = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock analysis data
  const analysisData = [
    {
      id: 1,
      title: 'Tesla Stock Analysis Q4 2024',
      confidence: 94,
      status: 'verified',
      risk: 'low',
      timestamp: '2024-01-20T10:30:00',
      analysisType: 'stock',
      summary: 'Comprehensive analysis of Tesla stock performance with AI-powered sentiment analysis.',
      tags: ['Stock', 'Technology', 'EV'],
      metrics: {
        accuracy: 96,
        reliability: 92,
        completeness: 88
      }
    },
    {
      id: 2,
      title: 'Crypto Market Manipulation Alert',
      confidence: 87,
      status: 'suspicious',
      risk: 'high',
      timestamp: '2024-01-20T09:15:00',
      analysisType: 'crypto',
      summary: 'Detected coordinated manipulation patterns in major cryptocurrency markets.',
      tags: ['Crypto', 'Alert', 'Blockchain'],
      metrics: {
        accuracy: 91,
        reliability: 85,
        completeness: 82
      }
    },
    {
      id: 3,
      title: 'Federal Reserve Announcement Impact',
      confidence: 92,
      status: 'verified',
      risk: 'medium',
      timestamp: '2024-01-19T14:45:00',
      analysisType: 'economic',
      summary: 'Analysis of market impact following recent Federal Reserve policy announcements.',
      tags: ['Economics', 'Policy', 'Market'],
      metrics: {
        accuracy: 94,
        reliability: 90,
        completeness: 86
      }
    },
    {
      id: 4,
      title: 'Tech Earnings Season Preview',
      confidence: 89,
      status: 'pending',
      risk: 'low',
      timestamp: '2024-01-19T11:20:00',
      analysisType: 'earnings',
      summary: 'Preview of major technology company earnings with predictive analysis.',
      tags: ['Earnings', 'Technology', 'Forecast'],
      metrics: {
        accuracy: 88,
        reliability: 85,
        completeness: 90
      }
    },
    {
      id: 5,
      title: 'Social Media Sentiment Analysis',
      confidence: 85,
      status: 'verified',
      risk: 'medium',
      timestamp: '2024-01-18T16:30:00',
      analysisType: 'sentiment',
      summary: 'Real-time analysis of social media sentiment across financial platforms.',
      tags: ['Social Media', 'Sentiment', 'Real-time'],
      metrics: {
        accuracy: 87,
        reliability: 83,
        completeness: 85
      }
    },
    {
      id: 6,
      title: 'Global Market Correlation Study',
      confidence: 91,
      status: 'verified',
      risk: 'low',
      timestamp: '2024-01-18T13:10:00',
      analysisType: 'global',
      summary: 'Analysis of cross-market correlations and global economic interdependencies.',
      tags: ['Global', 'Correlation', 'Markets'],
      metrics: {
        accuracy: 93,
        reliability: 89,
        completeness: 91
      }
    }
  ];

  const categories = ['all', 'stock', 'crypto', 'economic', 'earnings', 'sentiment', 'global'];
  const timeframes = ['1h', '24h', '7d', '30d', '90d'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </span>
        );
      case 'suspicious':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Suspicious
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'high':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High Risk
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium Risk
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Low Risk
          </span>
        );
      default:
        return null;
    }
  };

  const handleRunAnalysis = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Analysis completed! Check the new results.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Analysis Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400">Advanced financial analysis powered by artificial intelligence</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Run New Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Analyses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
              </div>
              <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% this month</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Accuracy</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">94.2%</p>
              </div>
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+2.4% improved</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span>-3 from yesterday</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Coverage</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">markets</p>
              </div>
              <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-blue-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+5 new markets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Timeframe:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTimeframe === timeframe
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search analyses..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Analysis Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {analysisData.map((analysis) => (
            <div key={analysis.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusBadge(analysis.status)}
                      {getRiskBadge(analysis.risk)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{analysis.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{analysis.confidence}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Confidence</div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">{analysis.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {analysis.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">{analysis.metrics.accuracy}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{analysis.metrics.reliability}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Reliability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{analysis.metrics.completeness}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Completeness</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(analysis.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {analysis.analysisType}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="flex items-center space-x-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
              View All Activity
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { action: 'New analysis completed', time: '10 minutes ago', user: 'AI System' },
              { action: 'Risk assessment updated', time: '2 hours ago', user: 'John Doe' },
              { action: 'Market data refreshed', time: '5 hours ago', user: 'System' },
              { action: 'Export generated', time: '1 day ago', user: 'Sarah Chen' },
              { action: 'API integration updated', time: '2 days ago', user: 'System' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;