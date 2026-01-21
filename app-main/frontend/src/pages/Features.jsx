import React, { useState } from 'react';
import { 
  Zap, 
  Shield, 
  Brain, 
  BarChart3, 
  Clock, 
  Globe, 
  Bell, 
  Users, 
  Lock, 
  Download, 
  CheckCircle,
  TrendingUp,
  Cpu,
  MessageSquare,
  PieChart,
  Target,
  Settings,
  Play,
  Pause,
  ChevronRight,
  Star
} from 'lucide-react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState('ai-detection');

  const features = [
    {
      id: 'ai-detection',
      title: 'AI-Powered Detection',
      icon: <Brain className="w-8 h-8" />,
      description: 'Advanced machine learning algorithms that analyze patterns, sentiment, and sources to detect fake news in real-time.',
      capabilities: [
        'Natural Language Processing',
        'Sentiment Analysis',
        'Pattern Recognition',
        'Source Credibility Scoring'
      ],
      stats: {
        accuracy: '99.7%',
        speed: '50ms',
        coverage: '100+ sources'
      },
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'real-time',
      title: 'Real-time Analysis',
      icon: <Clock className="w-8 h-8" />,
      description: 'Monitor news and social media feeds in real-time with instant alerts and analysis.',
      capabilities: [
        'Live Monitoring',
        'Instant Alerts',
        'Trend Detection',
        'Volume Analysis'
      ],
      stats: {
        latency: '< 1 second',
        updates: 'Every 15 seconds',
        feeds: '5000+ sources'
      },
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'reports',
      title: 'Detailed Reports',
      icon: <BarChart3 className="w-8 h-8" />,
      description: 'Comprehensive reports with visual analytics, trend data, and actionable insights.',
      capabilities: [
        'Custom Reports',
        'Visual Analytics',
        'Export Formats',
        'Scheduled Reports'
      ],
      stats: {
        formats: 'PDF, CSV, Excel',
        templates: '50+',
        automation: '100%'
      },
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'alerts',
      title: 'Custom Alerts',
      icon: <Bell className="w-8 h-8" />,
      description: 'Set up personalized alerts for specific topics, keywords, or market movements.',
      capabilities: [
        'Keyword Monitoring',
        'Threshold Alerts',
        'Push Notifications',
        'Email Digests'
      ],
      stats: {
        channels: '5+',
        delivery: 'Instant',
        customization: 'Unlimited'
      },
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 'global',
      title: 'Global Coverage',
      icon: <Globe className="w-8 h-8" />,
      description: 'Monitor news from global sources with multi-language support and regional analysis.',
      capabilities: [
        'Multi-language Support',
        'Regional Analysis',
        'Currency Conversion',
        'Time Zone Support'
      ],
      stats: {
        languages: '40+',
        regions: '150+',
        currencies: '50+'
      },
      color: 'from-indigo-600 to-blue-600'
    },
    {
      id: 'security',
      title: 'Enterprise Security',
      icon: <Shield className="w-8 h-8" />,
      description: 'Bank-grade security with encryption, compliance, and enterprise-grade infrastructure.',
      capabilities: [
        'End-to-End Encryption',
        'GDPR Compliance',
        'SOC 2 Certified',
        'Audit Logs'
      ],
      stats: {
        encryption: 'AES-256',
        compliance: '10+ standards',
        uptime: '99.99%'
      },
      color: 'from-gray-800 to-gray-900'
    }
  ];

  const selectedFeature = features.find(f => f.id === activeFeature) || features[0];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Financial Analyst',
      company: 'Goldman Sachs',
      comment: 'Veritas AI has transformed how we verify market-moving news. The accuracy is unparalleled.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Portfolio Manager',
      company: 'BlackRock',
      comment: 'The real-time alerts have saved us millions by preventing bad investments based on fake news.',
      rating: 5
    },
    {
      name: 'Jessica Park',
      role: 'Risk Manager',
      company: 'JPMorgan Chase',
      comment: 'Enterprise security features give us confidence in handling sensitive market data.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      features: ['Basic AI Detection', 'Daily Reports', 'Email Support', '50 alerts/month'],
      color: 'border-gray-300',
      popular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      features: ['Advanced AI Detection', 'Real-time Analysis', 'Priority Support', 'Unlimited Alerts', 'Custom Reports'],
      color: 'border-indigo-500',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['All Pro Features', 'Dedicated Support', 'API Access', 'Custom Integrations', 'SLA Guarantee'],
      color: 'border-purple-500',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">POWERFUL FEATURES</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Everything You Need to Combat Fake News</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10">
              Advanced tools and features designed to protect your investments and reputation from misinformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Whitepaper</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Feature Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Features</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              Explore our comprehensive suite of tools designed to detect, analyze, and combat fake news.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                  activeFeature === feature.id
                    ? `bg-gradient-to-r ${feature.color} text-white transform -translate-y-1 shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                <div className="mb-3">{feature.icon}</div>
                <span className="text-sm font-medium text-center">{feature.title}</span>
              </button>
            ))}
          </div>
          
          {/* Feature Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`bg-gradient-to-r ${selectedFeature.color} p-3 rounded-xl`}>
                    {selectedFeature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedFeature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedFeature.description}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Key Capabilities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedFeature.capabilities.map((capability, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(selectedFeature.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{key.replace('-', ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`bg-gradient-to-br ${selectedFeature.color} p-12 flex items-center justify-center`}>
                <div className="text-white text-center">
                  <Cpu className="w-16 h-16 mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">See It in Action</h3>
                  <p className="mb-6 opacity-90">Experience how {selectedFeature.title} works with our interactive demo.</p>
                  <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto">
                    <Play className="w-5 h-5" />
                    <span>Launch Demo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Veritas AI Works</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Data Collection',
                description: 'Gather news from thousands of trusted and social sources',
                icon: '📡'
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Process through multiple AI models for comprehensive analysis',
                icon: '🤖'
              },
              {
                step: '3',
                title: 'Verification',
                description: 'Cross-reference with historical data and source credibility',
                icon: '✅'
              },
              {
                step: '4',
                title: 'Reporting',
                description: 'Generate actionable insights and real-time alerts',
                icon: '📊'
              }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.icon}
                </div>
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Industry Leaders</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Plan</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              Start with our free trial and upgrade as your needs grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 ${plan.color} ${plan.popular ? 'transform -translate-y-4' : ''}`}>
                {plan.popular && (
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 rounded-t-xl">
                    <span className="font-bold">MOST POPULAR</span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Protect Your Business?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of companies who trust Veritas AI to combat fake news and misinformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Schedule a Demo</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Talk to Sales</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;