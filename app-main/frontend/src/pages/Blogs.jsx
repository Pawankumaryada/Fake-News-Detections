import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Search, Filter, TrendingUp, Shield, Brain, Zap, Eye, BarChart, Clock, User, Calendar, Tag, ExternalLink, BookOpen } from 'lucide-react';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'detection-techniques',
    'case-studies',
    'ai-models',
    'market-manipulation',
    'verification-tools',
    'regulatory-updates'
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'How AI Detects Fake Financial News in Real-Time',
      excerpt: 'Exploring the machine learning models that analyze news sentiment, source credibility, and market impact patterns to identify fraudulent information.',
      author: 'Dr. Sarah Chen',
      date: '2024-01-20',
      category: 'ai-models',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800',
      tags: ['AI Detection', 'Real-time Analysis', 'Machine Learning'],
      verificationLevel: 'high',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: 'The Anatomy of a Pump-and-Dump Scheme',
      excerpt: 'A detailed breakdown of how fake news is used to artificially inflate stock prices before insiders sell their holdings at peak values.',
      author: 'Michael Rodriguez',
      date: '2024-01-18',
      category: 'case-studies',
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800',
      tags: ['Market Manipulation', 'Case Study', 'Scam Detection'],
      verificationLevel: 'high',
      difficulty: 'advanced'
    },
    {
      id: 3,
      title: '5 Red Flags of Fake Financial News',
      excerpt: 'Learn to identify common patterns and suspicious indicators that suggest news might be fabricated or manipulated.',
      author: 'Alex Thompson',
      date: '2024-01-15',
      category: 'detection-techniques',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
      tags: ['Red Flags', 'Verification', 'Best Practices'],
      verificationLevel: 'medium',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: 'Blockchain Verification for Financial News',
      excerpt: 'How decentralized verification systems can provide immutable proof of news authenticity and source credibility.',
      author: 'Jessica Williams',
      date: '2024-01-12',
      category: 'verification-tools',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?auto=format&fit=crop&w=800',
      tags: ['Blockchain', 'Verification', 'Decentralized'],
      verificationLevel: 'high',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'The Role of NLP in Fake News Detection',
      excerpt: 'How Natural Language Processing algorithms analyze writing patterns, sentiment anomalies, and linguistic markers to spot fabricated content.',
      author: 'Robert Kim',
      date: '2024-01-10',
      category: 'ai-models',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800',
      tags: ['NLP', 'Sentiment Analysis', 'Linguistics'],
      verificationLevel: 'high',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: 'Recent Regulatory Actions Against Fake News Spreaders',
      excerpt: 'Analysis of recent SEC and global regulatory body actions against individuals and organizations spreading fraudulent financial information.',
      author: 'David Park',
      date: '2024-01-08',
      category: 'regulatory-updates',
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?auto=format&fit=crop&w=800',
      tags: ['Regulation', 'SEC', 'Compliance'],
      verificationLevel: 'medium',
      difficulty: 'beginner'
    },
    {
      id: 7,
      title: 'Social Media Amplification of Fake Financial News',
      excerpt: 'How algorithmic amplification on platforms like Twitter and Reddit accelerates the spread of false financial information.',
      author: 'Lisa Wang',
      date: '2024-01-05',
      category: 'market-manipulation',
      readTime: '14 min read',
      image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=800',
      tags: ['Social Media', 'Amplification', 'Virality'],
      verificationLevel: 'medium',
      difficulty: 'intermediate'
    },
    {
      id: 8,
      title: 'Building Your Own Fake News Detection Toolkit',
      excerpt: 'Practical guide to assembling tools and resources for verifying financial news before making investment decisions.',
      author: 'James Wilson',
      date: '2024-01-03',
      category: 'verification-tools',
      readTime: '13 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
      tags: ['Toolkit', 'Practical Guide', 'Resources'],
      verificationLevel: 'high',
      difficulty: 'beginner'
    }
  ];

  const detectionTools = [
    {
      name: 'Source Credibility Analyzer',
      description: 'Checks news source reputation and historical accuracy',
      icon: <Shield className="w-6 h-6" />,
      accuracy: '98%'
    },
    {
      name: 'Sentiment Anomaly Detector',
      description: 'Identifies unnatural sentiment patterns in financial news',
      icon: <Brain className="w-6 h-6" />,
      accuracy: '95%'
    },
    {
      name: 'Cross-Verification Engine',
      description: 'Compares information across multiple reliable sources',
      icon: <CheckCircle className="w-6 h-6" />,
      accuracy: '99%'
    },
    {
      name: 'Pattern Recognition AI',
      description: 'Detects manipulation patterns from historical data',
      icon: <Eye className="w-6 h-6" />,
      accuracy: '96%'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getVerificationBadge = (level) => {
    const styles = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      high: 'High Verification',
      medium: 'Medium Verification',
      low: 'Low Verification'
    };

    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[level]}`}>
        <CheckCircle className="inline w-3 h-3 mr-1" />
        {labels[level]}
      </span>
    );
  };

  const getDifficultyBadge = (level) => {
    const styles = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-purple-100 text-purple-800',
      advanced: 'bg-orange-100 text-orange-800'
    };

    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[level]}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-full mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fake News Detection in Finance</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert analysis, detection techniques, and tools to identify and combat fake financial news.
            Protect your investments from misinformation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-red-600 mb-2">42%</div>
            <div className="text-gray-600">Financial News Contains Inaccuracies</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">$2.3B</div>
            <div className="text-gray-600">Lost to Fake News Annually</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
            <div className="text-gray-600">Detection Accuracy with AI</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">75K+</div>
            <div className="text-gray-600">Articles Analyzed Daily</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search detection techniques, case studies, or tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detection Tools */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Detection Tools</h2>
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detectionTools.map((tool, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-red-600 mb-4">{tool.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Accuracy</span>
                  <span className="font-bold text-green-600">{tool.accuracy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-10 text-white">
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">FEATURED ANALYSIS</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-red-100 mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{filteredPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                      <span>Read Analysis</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div 
                  className="h-64 lg:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${filteredPosts[0].image})` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Research & Analysis</h2>
            <BookOpen className="w-6 h-6 text-gray-500" />
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No articles found. Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {getVerificationBadge(post.verificationLevel)}
                      {getDifficultyBadge(post.difficulty)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center space-x-1">
                        <span>Read More</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Verification Checklist */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <div className="flex items-center mb-8">
            <CheckCircle className="w-8 h-8 text-green-600 mr-4" />
            <h2 className="text-2xl font-bold text-gray-900">5-Step News Verification Checklist</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Source Check', description: 'Verify author credentials and publication reputation' },
              { step: '2', title: 'Cross-Reference', description: 'Compare with multiple reliable sources' },
              { step: '3', title: 'Date Verification', description: 'Ensure information is current and not outdated' },
              { step: '4', title: 'Sentiment Analysis', description: 'Look for emotional manipulation or bias' },
              { step: '5', title: 'Fact Check', description: 'Verify statistics and data points with official sources' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Protected Against Fake News</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get weekly updates on new detection techniques, case studies, and tools to protect your investments from misinformation.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Subscribe for Protection
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              No spam. Real protection. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Recent Case Studies */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Fake News Cases</h2>
            <BarChart className="w-6 h-6 text-gray-500" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                company: 'XYZ Corp',
                impact: '-32%',
                timeframe: '24 hours',
                method: 'False Acquisition Rumors',
                status: 'SEC Investigation Ongoing'
              },
              {
                company: 'TechStart Inc',
                impact: '+180%',
                timeframe: '3 days',
                method: 'Fake Product Launch',
                status: 'Class Action Lawsuit Filed'
              },
              {
                company: 'BioPharma Ltd',
                impact: '-45%',
                timeframe: '1 week',
                method: 'False Trial Results',
                status: 'CEO Charged with Fraud'
              }
            ].map((caseStudy, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{caseStudy.company}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    caseStudy.impact.startsWith('+') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {caseStudy.impact}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Timeframe:</span>
                    <span className="font-medium">{caseStudy.timeframe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method:</span>
                    <span className="font-medium">{caseStudy.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-blue-600">{caseStudy.status}</span>
                  </div>
                </div>
                <button className="w-full mt-6 text-red-600 hover:text-red-700 font-medium text-sm flex items-center justify-center space-x-2">
                  <span>View Full Case Study</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;