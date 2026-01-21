import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';

const LiveTV = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSource, setSelectedSource] = useState('aajtak');
  const [streamQuality, setStreamQuality] = useState('720p');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState('good');
  const [copied, setCopied] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  // Simple icon components
  const PlayIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
  const PauseIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
  const VolumeUpIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
  const VolumeOffIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;
  const FullscreenIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>;
  const RefreshIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>;
  const CopyIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>;
  const CheckIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
  const ExternalLinkIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>;
  const UsersIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
  const TVIcon = () => <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>;
  const SettingsIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
  const AlertIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;
  const RadioIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"/></svg>;
  const YoutubeIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;
  const VideoIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>;
  const WifiIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>;

  // Indian News Channels with reliable YouTube live stream URLs
  const channelConfigs = {
    aajtak: {
      id: 'aajtak',
      name: 'Aaj Tak',
      viewers: '1.8M',
      category: 'hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Aaj_Tak_logo.svg/2560px-Aaj_Tak_logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/ZOiisHRNof0',
      watchUrl: 'https://www.youtube.com/watch?v=ZOiisHRNof0',
      quality: ['360p', '480p', '720p', '1080p'],
      isLive: true
    },
    republic: {
      id: 'republic',
      name: 'Republic Bharat',
      viewers: '1.5M',
      category: 'hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Republic_World_logo.svg/2560px-Republic_World_logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/5QmvkTtoA0U',
      watchUrl: 'https://www.youtube.com/watch?v=5QmvkTtoA0U',
      quality: ['360p', '720p', '1080p'],
      isLive: true
    },
    ndtv: {
      id: 'ndtv',
      name: 'NDTV India',
      viewers: '1.2M',
      category: 'hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/NDTV_India_logo.svg/1200px-NDTV_India_logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/0kpIDriEjc4',
      watchUrl: 'https://www.youtube.com/watch?v=0kpIDriEjc4',
      quality: ['360p', '720p'],
      isLive: true
    },
    abp: {
      id: 'abp',
      name: 'ABP News',
      viewers: '1.3M',
      category: 'hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ABP_News_Logo.svg/2560px-ABP_News_Logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/nyd-xznCpJc',
      watchUrl: 'https://www.youtube.com/watch?v=nyd-xznCpJc',
      quality: ['360p', '480p', '720p'],
      isLive: true
    },
    timesnow: {
      id: 'timesnow',
      name: 'Times Now',
      viewers: '950K',
      category: 'english',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Times_Now_logo.svg/2560px-Times_Now_logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/8VjUkPcNWFw',
      watchUrl: 'https://www.youtube.com/watch?v=8VjUkPcNWFw',
      quality: ['360p', '720p', '1080p'],
      isLive: true
    },
    indiaToday: {
      id: 'indiaToday',
      name: 'India Today',
      viewers: '1.1M',
      category: 'english',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/India_Today_logo.svg/2560px-India_Today_logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/_OY_-i2U0XQ',
      watchUrl: 'https://www.youtube.com/watch?v=_OY_-i2U0XQ',
      quality: ['360p', '480p', '720p'],
      isLive: true
    },
    wion: {
      id: 'wion',
      name: 'WION',
      viewers: '850K',
      category: 'english',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/WION_logo.svg/2560px-WION_logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/s4aDVth0l5g',
      watchUrl: 'https://www.youtube.com/watch?v=s4aDVth0l5g',
      quality: ['360p', '720p', '1080p'],
      isLive: true
    },
    news18: {
      id: 'news18',
      name: 'News18 India',
      viewers: '1.4M',
      category: 'hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/News18.svg/2560px-News18.svg.png',
      streamUrl: 'https://www.youtube.com/embed/R5O5u8rCtz4',
      watchUrl: 'https://www.youtube.com/watch?v=R5O5u8rCtz4',
      quality: ['360p', '720p'],
      isLive: true
    },
    zeeNews: {
      id: 'zeeNews',
      name: 'Zee News',
      viewers: '1.2M',
      category: 'hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Zee_News_2019.svg/2560px-Zee_News_2019.svg.png',
      streamUrl: 'https://www.youtube.com/embed/6UOITn8rAHA',
      watchUrl: 'https://www.youtube.com/watch?v=6UOITn8rAHA',
      quality: ['360p', '480p', '720p'],
      isLive: true
    },
    tv9: {
      id: 'tv9',
      name: 'TV9 Bharatvarsh',
      viewers: '980K',
      category: 'hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/TV9_Bharatvarsh_Logo.svg/2560px-TV9_Bharatvarsh_Logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/dXW_tB9CIMI',
      watchUrl: 'https://www.youtube.com/watch?v=dXW_tB9CIMI',
      quality: ['360p', '720p'],
      isLive: true
    },
    ddNews: {
      id: 'ddNews',
      name: 'DD News',
      viewers: '2.1M',
      category: 'government',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/DD_News_logo.svg/1200px-DD_News_logo.svg.png',
      streamUrl: 'https://www.youtube.com/embed/RX5m86bTtPA',
      watchUrl: 'https://www.youtube.com/watch?v=RX5m86bTtPA',
      quality: ['360p', '480p', '720p'],
      isLive: true
    }
  };

  // Current stream configuration
  const currentConfig = channelConfigs[selectedSource] || channelConfigs.aajtak;

  // Fix: Initialize component only once
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setBuffering(true);
      // Set a timeout to auto-start buffering after mount
      const timer = setTimeout(() => {
        if (!userInteracted) {
          setBuffering(false);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array - runs only once on mount

  // Fix: Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []); // Empty dependency array

  // Fix: Handle copy timeout cleanup
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copied]); // Only runs when copied changes

  // Event handlers with useCallback to prevent unnecessary re-renders
  const handlePlayPause = useCallback(() => {
    setUserInteracted(true);
    setIsPlaying(prev => !prev);
    setPlaybackError(false);
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  }, []);

  const handleMuteToggle = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }, []);

  const handleQualityChange = useCallback((quality) => {
    setStreamQuality(quality);
  }, []);

  const handleSourceChange = useCallback((sourceId) => {
    if (sourceId === selectedSource) return;
    
    setIsPlaying(false);
    setBuffering(true);
    setPlaybackError(false);
    setSelectedSource(sourceId);
    
    // Auto-play after switching channel if user has already interacted
    if (userInteracted) {
      const timer = setTimeout(() => {
        setBuffering(false);
        setIsPlaying(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setBuffering(false);
    }
  }, [selectedSource, userInteracted]);

  const handleRefreshStream = useCallback(() => {
    setBuffering(true);
    setIsPlaying(false);
    
    const timer = setTimeout(() => {
      setBuffering(false);
      setIsPlaying(true);
      setPlaybackError(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentConfig.watchUrl);
      setCopied(true);
    } catch (err) {
      console.error('Copy error:', err);
    }
  }, [currentConfig.watchUrl]);

  const handlePlayerReady = useCallback(() => {
    setBuffering(false);
    setPlaybackError(false);
    
    if (userInteracted && !isPlaying) {
      setIsPlaying(true);
    }
  }, [userInteracted, isPlaying]);

  const handlePlayerError = useCallback((error) => {
    console.error('Player error:', error);
    setBuffering(false);
    setPlaybackError(true);
    setIsPlaying(false);
  }, []);

  const handleUserInteraction = useCallback(() => {
    if (!userInteracted) {
      setUserInteracted(true);
      setIsPlaying(true);
      setBuffering(true);
      
      // Auto-stop buffering after interaction
      const timer = setTimeout(() => {
        setBuffering(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [userInteracted]);

  // Get unique categories
  const categories = useCallback(() => {
    return ['all', ...new Set(Object.values(channelConfigs).map(ch => ch.category))];
  }, []);

  // Get filtered channels based on active tab
  const filteredChannels = useCallback(() => {
    return Object.values(channelConfigs).filter(channel => 
      activeTab === 'all' || channel.category === activeTab
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-3 rounded-xl">
                <TVIcon />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Live Indian News TV</h1>
                <p className="text-gray-400">24/7 live news coverage from reliable Indian channels</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
                <UsersIcon />
                <span>{currentConfig.viewers} viewers</span>
              </div>
              {!userInteracted && (
                <div className="bg-yellow-600/20 text-yellow-400 px-4 py-2 rounded-lg text-sm flex items-center">
                  <AlertIcon />
                  <span className="ml-2">Click play to start stream</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player Container */}
          <div className="lg:col-span-2">
            <div 
              ref={containerRef}
              className="bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-gray-800 relative"
              onClick={handleUserInteraction}
            >
              {/* Playback Error Overlay */}
              {playbackError && (
                <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
                  <div className="text-center p-8 max-w-md">
                    <AlertIcon />
                    <h3 className="text-2xl font-bold mb-2 mt-4">Stream Error</h3>
                    <p className="text-gray-400 mb-6">
                      Unable to play the stream. Please try another channel.
                    </p>
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={handleRefreshStream}
                        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Try Another Stream
                      </button>
                      <button
                        onClick={() => window.open(currentConfig.watchUrl, '_blank')}
                        className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Watch on YouTube
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Initial Play Button Overlay */}
              {!userInteracted && !playbackError && (
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-10 cursor-pointer"
                  onClick={handleUserInteraction}
                >
                  <div className="text-center p-8">
                    <div className="bg-red-600 hover:bg-red-700 p-8 rounded-full transition-all duration-300 hover:scale-110 mb-6 inline-block cursor-pointer">
                      <PlayIcon />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Start Live Stream</h3>
                    <p className="text-gray-400 mb-2">Click the play button to start watching</p>
                    <p className="text-sm text-gray-500">Currently selected: {currentConfig.name}</p>
                  </div>
                </div>
              )}

              {/* Buffering Overlay */}
              {buffering && userInteracted && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-xl font-semibold mb-2">Connecting to stream...</div>
                    <div className="text-gray-400">{currentConfig.name}</div>
                  </div>
                </div>
              )}

              {/* Stream Status Indicator */}
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse flex items-center">
                    <RadioIcon />
                    <span className="ml-1">LIVE</span>
                  </div>
                  <div className="bg-black/80 px-3 py-1 rounded-full text-sm flex items-center border border-gray-700">
                    <YoutubeIcon />
                    <span className="ml-1 font-medium">{currentConfig.name}</span>
                  </div>
                </div>
              </div>

              {/* Stream Quality Indicator */}
              <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center space-x-2">
                  <div className="relative group">
                    <div className="bg-black/70 hover:bg-black/90 px-3 py-1 rounded-lg text-sm flex items-center space-x-2 border border-gray-700 cursor-pointer">
                      <SettingsIcon />
                      <span>{streamQuality.toUpperCase()}</span>
                    </div>
                    <div className="absolute right-0 mt-2 w-32 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                      {currentConfig.quality.map((quality) => (
                        <div
                          key={quality}
                          onClick={() => handleQualityChange(quality)}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors cursor-pointer ${
                            streamQuality === quality ? 'text-red-400' : 'text-gray-300'
                          }`}
                        >
                          {quality.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* React Player */}
              {userInteracted && currentConfig.streamUrl && (
                <div className="relative aspect-video">
                  <ReactPlayer
                    ref={playerRef}
                    url={currentConfig.streamUrl}
                    playing={isPlaying}
                    muted={isMuted}
                    volume={volume / 100}
                    width="100%"
                    height="100%"
                    controls={false}
                    onBuffer={() => setBuffering(true)}
                    onBufferEnd={() => setBuffering(false)}
                    onError={handlePlayerError}
                    onReady={handlePlayerReady}
                    config={{
                      youtube: {
                        playerVars: {
                          autoplay: userInteracted ? 1 : 0,
                          controls: 0,
                          modestbranding: 1,
                          rel: 0,
                          showinfo: 0,
                          playsinline: 1
                        }
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  />

                  {/* Custom Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handlePlayPause}
                          className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-200 hover:scale-105"
                        >
                          {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={handleMuteToggle}
                            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                          >
                            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                          </button>
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="w-24 accent-red-600 hover:accent-red-500"
                            />
                            <span className="text-sm w-8 font-medium">{volume}%</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-300 hidden md:block">
                          <span className="text-green-400">●</span> Live • {currentConfig.viewers} viewers • YouTube
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleRefreshStream}
                          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                          title="Refresh stream"
                        >
                          <RefreshIcon />
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                          title="Copy stream link"
                        >
                          {copied ? <CheckIcon /> : <CopyIcon />}
                        </button>
                        <button
                          onClick={() => window.open(currentConfig.watchUrl, '_blank')}
                          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                          title="Open in new tab"
                        >
                          <ExternalLinkIcon />
                        </button>
                        <button
                          onClick={handleFullscreen}
                          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                        >
                          <FullscreenIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stream Navigation */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Available News Channels</h2>
                  <p className="text-gray-400">Click any channel to switch streams instantly</p>
                </div>
                <div className="text-sm text-gray-400">
                  {Object.keys(channelConfigs).length} channels available
                </div>
              </div>
              
              {/* Horizontal Stream Scroller */}
              <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {filteredChannels().map((channel) => (
                    <div
                      key={channel.id}
                      onClick={() => handleSourceChange(channel.id)}
                      className={`flex-shrink-0 w-72 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                        selectedSource === channel.id
                          ? 'border-red-500 bg-gradient-to-br from-gray-800 to-gray-900'
                          : 'border-gray-700 bg-gray-900 hover:border-gray-600 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center">
                            <YoutubeIcon />
                          </div>
                          <div>
                            <div className="font-bold text-lg">{channel.name}</div>
                            <div className="text-sm text-gray-400 capitalize flex items-center">
                              <span className="px-2 py-1 bg-gray-800 rounded text-xs mr-2">
                                {channel.category}
                              </span>
                              <span className="flex items-center">
                                <UsersIcon />
                                <span className="ml-1">{channel.viewers}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedSource === channel.id
                            ? 'bg-red-600 text-white'
                            : 'bg-green-600/20 text-green-400'
                        }`}>
                          {selectedSource === channel.id ? 'NOW PLAYING' : 'LIVE'}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {channel.quality.slice(0, 3).map((q, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-800/50 rounded text-xs">
                              {q}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">
                          Click to watch
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mt-6">
                {categories().map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {tab === 'all' ? 'All Channels' : 
                     tab === 'hindi' ? 'Hindi' : 
                     tab === 'english' ? 'English' : 
                     tab === 'government' ? 'Government' : 
                     tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Stream Info */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Current Stream Info</h2>
                <WifiIcon />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <span className="text-gray-400">Channel:</span>
                  <span className="font-bold text-lg">{currentConfig.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <span className="text-gray-400">Status:</span>
                  <span className="flex items-center text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Broadcasting Live
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <span className="text-gray-400">Viewers:</span>
                  <span className="font-medium">{currentConfig.viewers}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <span className="text-gray-400">Quality:</span>
                  <span className="font-medium text-red-400">{streamQuality.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={handleRefreshStream}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 p-4 rounded-lg text-left flex items-center justify-between transition-all duration-200 border border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <RefreshIcon />
                    </div>
                    <div>
                      <div className="font-bold">Refresh Stream</div>
                      <div className="text-sm text-gray-400">Get latest broadcast</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={handleCopyLink}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 p-4 rounded-lg text-left flex items-center justify-between transition-all duration-200 border border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      {copied ? <CheckIcon /> : <CopyIcon />}
                    </div>
                    <div>
                      <div className="font-bold">Copy Stream Link</div>
                      <div className="text-sm text-gray-400">Share with others</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => window.open(currentConfig.watchUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 p-4 rounded-lg text-left flex items-center justify-between transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <ExternalLinkIcon />
                    </div>
                    <div>
                      <div className="font-bold">Watch on YouTube</div>
                      <div className="text-sm">Open in YouTube app</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;