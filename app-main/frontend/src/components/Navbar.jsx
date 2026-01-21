import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Search, Bell, User, LogOut, Settings, TrendingUp,
  BarChart3, Shield, AlertTriangle, Globe, ChevronDown,
  Home, BookOpen, Tv, History, Mail, Info, HelpCircle,
  Award, Zap, Moon, Sun, Clock, TrendingUp as TrendingUpIcon,
  CheckCircle, X as XIcon, MessageSquare 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      console.log('🔍 Navbar Auth Check:', { token, userData });
      
      if (token && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          console.log('✅ User data loaded:', parsedUserData);
          setIsAuthenticated(true);
          setUser(parsedUserData);
        } catch (error) {
          console.error('❌ Error parsing user data:', error);
          // Clear corrupted data
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        console.log('⚠️ No auth data found');
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
    
    // Listen for auth changes
    const handleStorageChange = () => {
      console.log('🔄 Storage changed, re-checking auth...');
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for login/logout
    window.addEventListener('auth-change', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { path: '/fact', label: 'Fact', icon: <BarChart3 className="w-4 h-4" /> },
    /*{ path: '/history', label: 'History', icon: <History className="w-4 h-4" /> },*/
    { path: '/livetv', label: 'Live TV', icon: <Tv className="w-4 h-4" /> },
    { path: '/blogs', label: 'Blogs', icon: <BookOpen className="w-4 h-4" /> },
    { 
      path: '/features', 
      label: 'Features', 
      icon: <Zap className="w-4 h-4" />,
      /*
      submenu: [
        { path: '/features/ai-detection', label: 'AI Detection' },
        { path: '/features/real-time', label: 'Real-time Analysis' },
        { path: '/features/reports', label: 'Detailed Reports' },
        { path: '/features/alerts', label: 'Custom Alerts' }
      ]*/
    },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

    const quickActions = [
    { label: 'Quick Analysis', icon: <TrendingUp className="w-4 h-4" />, path: '/analysis/quick' },
    { label: 'Verify News', icon: <Shield className="w-4 h-4" />, path: '/verify-news' },
    { label: 'Recent Scams', icon: <AlertTriangle className="w-4 h-4" />, path: '/recent-scams' },
    { label: 'Global News', icon: <Globe className="w-4 h-4" />, path: '/global-news' },]

  const notifications = [
    { id: 1, title: 'New scam alert detected', message: 'Fake news detected in financial sector', time: '5 min ago', unread: true, type: 'alert' },
    { id: 2, title: 'Weekly report generated', message: 'Your weekly analysis report is ready', time: '2 hours ago', unread: true, type: 'success' },
    { id: 3, title: 'System update completed', message: 'Veritas AI system updated to v2.1.0', time: '1 day ago', unread: false, type: 'info' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const trendingSearches = [
    { term: 'Stock Market', count: 1250 },
    { term: 'Crypto Scam', count: 890 },
    { term: 'Election News', count: 760 },
    { term: 'Company Rumors', count: 540 },
  ];

  const searchHistory = [
    { term: 'Bitcoin analysis', timestamp: '2024-01-20T10:30:00' },
    { term: 'Tesla stock news', timestamp: '2024-01-19T14:45:00' },
    { term: 'Federal Reserve', timestamp: '2024-01-18T09:15:00' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) setUserMenuOpen(false);
      if (notificationOpen && !event.target.closest('.notification-menu')) setNotificationOpen(false);
      if (searchOpen && !event.target.closest('.search-menu')) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen, notificationOpen, searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchOpen(false);
  };

  const handleLogout = () => {
    console.log('🚪 User logging out...');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setUserMenuOpen(false);
    
    // Trigger auth change event
    window.dispatchEvent(new Event('auth-change'));
    window.dispatchEvent(new Event('storage'));
    
    navigate('/');
    console.log('✅ Logout successful');
  };

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <MessageSquare className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAvatarInitials = () => {
    if (!user || !user.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-24 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>AI Detection Accuracy: <strong>99.7%</strong></span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Analyzing 50,000+ articles daily</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/support" className="hover:text-indigo-200 transition-colors flex items-center">
              <HelpCircle className="w-4 h-4 inline mr-1" />
              Support
            </Link>
            <Link to="/pricing" className="hover:text-indigo-200 transition-colors">
              Pricing
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Trusted by 500+ companies</span>
            </div>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white dark:bg-gray-900'} border-b dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Veritas<span className="text-indigo-600 dark:text-indigo-400">AI</span></span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block -mt-1">Fake News Detection</span>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative search-menu">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-4 z-50">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search news, topics, or companies..."
                        className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        autoFocus
                      />
                      <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                        →
                      </button>
                    </form>
                    
                    <div className="mt-4 space-y-4">
                      {trendingSearches.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Trending Searches:</p>
                          <div className="flex flex-wrap gap-2">
                            {trendingSearches.map((item) => (
                              <button
                                key={item.term}
                                onClick={() => handleQuickSearch(item.term)}
                                className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors duration-200 flex items-center"
                              >
                                <TrendingUpIcon className="w-3 h-3 mr-1" />
                                {item.term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {searchHistory.length > 0 && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Recent Searches</p>
                            <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              Clear all
                            </button>
                          </div>
                          <div className="space-y-1">
                            {searchHistory.slice(0, 5).map((item, index) => (
                              <div key={index} className="flex items-center justify-between group">
                                <button
                                  onClick={() => handleQuickSearch(item.term)}
                                  className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 w-full text-left py-1"
                                >
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span>{item.term}</span>
                                </button>
                                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500">
                                  <XIcon className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 hidden md:block"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="relative notification-menu">
                <button 
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        <div className="flex items-center space-x-2">
                          {unreadCount > 0 && (
                            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                              Mark all as read
                            </button>
                          )}
                          <button onClick={() => setNotificationOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {notifications.length === 0 ? (
                          <div className="text-center py-8">
                            <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notification) => (
                            <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                              <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                                <div className="flex items-center space-x-3 mt-2">
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                  {notification.unread && <span className="text-xs text-blue-600 dark:text-blue-400">New</span>}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      
                      {notifications.length > 0 && (
                        <div className="mt-4 pt-4 border-t dark:border-gray-700">
                          <Link
                            to="/notifications"
                            className="block text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                            onClick={() => setNotificationOpen(false)}
                          >
                            View all notifications
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {isAuthenticated && user ? (
                <div className="relative user-menu">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getAvatarInitials()}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                        {user.role || 'Member'}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 hidden md:block" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{user.name || 'User'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email || 'No email'}</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                            {user.subscription || 'Free Plan'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <User className="w-4 h-4" /><span>My Profile</span>
                        </Link>
                        <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <BarChart3 className="w-4 h-4" /><span>Dashboard</span>
                        </Link>
                        <Link to="/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Settings className="w-4 h-4" /><span>Settings</span>
                        </Link>
                      </div>
                      
                      <div className="border-t dark:border-gray-700 py-2">
                        <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <LogOut className="w-4 h-4" /><span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button onClick={handleLogin} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                    Sign In
                  </button>
                  <button onClick={handleSignup} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-200">
                    Get Started Free
                  </button>
                </div>
              )}

              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="px-4 py-3">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Link key={action.label} to={action.path} onClick={() => setIsOpen(false)} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      {action.icon}
                      <span className="text-sm font-medium dark:text-gray-300">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t dark:border-gray-800">
                <div className="space-y-3">
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-3 py-2">
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        My Profile
                      </Link>
                      <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { handleLogin(); setIsOpen(false); }} className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        Sign In
                      </button>
                      <button onClick={() => { handleSignup(); setIsOpen(false); }} className="block w-full text-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90">
                        Start Free Trial
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="hidden lg:block bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Quick Actions:</span>
              <div className="flex items-center space-x-2">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.path} className="flex items-center space-x-2 text-sm px-3 py-1.5 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg border dark:border-gray-600 transition-colors duration-200">
                    {action.icon}
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  System Status: <span className="font-medium dark:text-green-400">All Systems Operational</span>
                </span>
              </div>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;