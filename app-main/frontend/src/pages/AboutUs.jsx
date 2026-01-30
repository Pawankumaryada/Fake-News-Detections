import React from 'react';
import { Target, Users, BarChart3, Shield, Globe, Award, TrendingUp, Heart, CheckCircle, Brain, Zap, Lock, MessageSquare, Star, ThumbsUp, Quote } from 'lucide-react';
import axios from "axios";
import { useState } from "react";

import { getAnalysisById } from "../api";

const About = () => {

  // 🔹 STEP 2: Feedback state (already added)
  const [fbName, setFbName] = useState("");
  const [fbCompany, setFbCompany] = useState("");
  const [fbEmail, setFbEmail] = useState("");
  const [fbRating, setFbRating] = useState(0);
  const [fbMessage, setFbMessage] = useState("");
  const [sending, setSending] = useState(false);

  // 🔹 STEP 3: ADD THIS HERE (submit handler)
  const submitFeedback = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/feedback", {
        name: fbName,
        company: fbCompany,
        email: fbEmail,
        rating: fbRating,
        message: fbMessage,
      });

      alert("✅ Feedback sent successfully!");

      setFbName("");
      setFbCompany("");
      setFbEmail("");
      setFbRating(0);
      setFbMessage("");
    } catch (err) {
      alert("❌ Failed to send feedback");
    } finally {
      setSending(false);
    }
  };

  const teamMembers = [
    {
      name: 'Manish',
      role: 'CEO & Founder',
      expertise: 'AI & Natural Language Processing Expert',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400',
      quote: 'At Veritas AI, we believe that truth should be accessible to everyone. Our mission is to combat misinformation with cutting-edge technology.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Vinay',
      role: 'CTO',
      expertise: 'Machine Learning & Big Data Specialist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400',
      quote: 'We\'ve built the most advanced fake news detection system using deep learning models that analyze patterns humans can\'t see.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Pawan',
      role: 'Head of Research',
      expertise: 'Data Science & Algorithm Development',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400',
      quote: 'Our algorithms continuously learn and adapt to new misinformation tactics, staying ahead of emerging threats.',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const milestones = [
    { year: '2023', title: 'Company Founded', description: 'Veritas AI established with vision to combat fake news' },
    { year: '2023', title: 'Beta Launch', description: 'First version of detection platform launched' },
    { year: '2024', title: 'AI Breakthrough', description: 'Proprietary detection algorithm achieved 98% accuracy' },
    { year: '2024', title: 'Enterprise Partnerships', description: 'Onboarded first corporate clients including Skyreti Pvt. Ltd.' },
    { year: '2024', title: 'Industry Recognition', description: 'Awarded "Best AI Innovation in Media Verification"' }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Truth Above All',
      description: 'We prioritize factual accuracy over everything else in our detection algorithms.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Digital Integrity',
      description: 'Protecting information integrity in an era of rampant misinformation.'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Ethics',
      description: 'Transparent AI models that explain their reasoning for every detection.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Impact',
      description: 'Making truth accessible across languages and cultural contexts.'
    }
  ];

  const technologies = [
    {
      name: 'Natural Language Processing',
      description: 'Analyzes linguistic patterns and semantic structures',
      accuracy: '97%'
    },
    {
      name: 'Deep Learning Models',
      description: 'Neural networks trained on millions of verified articles',
      accuracy: '98.5%'
    },
    {
      name: 'Source Verification',
      description: 'Real-time credibility assessment of information sources',
      accuracy: '99.2%'
    },
    {
      name: 'Sentiment Analysis',
      description: 'Detects emotional manipulation in content',
      accuracy: '96.8%'
    }
  ];

  // Skyreti Pvt. Ltd. Feedback
  const skyretiFeedback = {
    company: 'Skyreti Pvt. Ltd.',
    rating: '4.9/5.0',
    feedback: 'Veritas AI has revolutionized how we verify financial news. Their detection system has prevented multiple misinformation incidents that could have impacted our investment decisions.',
    representative: 'Nitesh Goswami, CEO',
    date: 'December 2025'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">AI-Powered Truth Detection</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">About Veritas AI</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10">
              We're pioneers in artificial intelligence-powered fake news detection, 
              dedicated to restoring trust in digital information.
            </p>
            <div className="inline-flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold">99.7%</div>
                <div className="text-indigo-200">Detection Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50M+</div>
                <div className="text-indigo-200">Articles Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-indigo-200">Enterprise Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Story */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                <span className="font-bold text-indigo-600">Veritas AI</span> was founded in 2025 by Manish, Vinay, and Pawan - three visionary technologists 
                who recognized the growing threat of misinformation in the digital age. Witnessing how fake news 
                could manipulate markets, influence elections, and erode public trust, they set out to create a solution.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                What started as a research project in natural language processing has grown into the most advanced 
                fake news detection platform in the industry. Today, Veritas AI serves financial institutions, 
                media companies, and government agencies worldwide.
              </p>
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-6 rounded-xl border border-indigo-100 mt-8">
                <div className="flex items-center space-x-4">
                  <Zap className="w-8 h-8 text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Our Mission</h3>
                    <p className="text-gray-600">
                      To create a digital ecosystem where truth prevails, using artificial intelligence to separate fact from fiction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <Lock className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Why We're Different</h3>
                <p className="text-indigo-100">
                  Unlike traditional fact-checking, Veritas AI uses real-time AI analysis that learns and adapts 
                  to new misinformation tactics as they emerge. Our system doesn't just flag content - it explains 
                  why something might be misleading.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founders Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet The Founders</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Three visionary leaders combining decades of AI expertise to combat misinformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <div 
                    className="h-72 bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex space-x-4">
                      <a href={member.linkedin} className="bg-white p-2 rounded-full hover:bg-gray-100">
                        <span className="text-xs font-semibold">LI</span>
                      </a>
                      <a href={member.twitter} className="bg-white p-2 rounded-full hover:bg-gray-100">
                        <span className="text-xs font-semibold">TW</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.expertise}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-start space-x-3">
                      <Quote className="w-5 h-5 text-gray-400 mt-1" />
                      <p className="text-gray-600 italic">"{member.quote}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skyreti Pvt. Ltd. Testimonial */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
                    <div className="text-2xl font-bold text-indigo-600">SR</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{skyretiFeedback.company}</h3>
                  <div className="flex items-center justify-center lg:justify-start space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 font-bold text-gray-700">{skyretiFeedback.rating}</span>
                  </div>
                  <p className="text-gray-500">{skyretiFeedback.representative}</p>
                  <p className="text-gray-400 text-sm">{skyretiFeedback.date}</p>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <div className="flex items-center mb-4">
                  <ThumbsUp className="w-8 h-8 text-green-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">Client Testimonial</h4>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <MessageSquare className="w-6 h-6 text-indigo-600 mb-3" />
                  <p className="text-gray-700 text-lg italic mb-4">"{skyretiFeedback.feedback}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Verified Enterprise Client</div>
                        <div className="text-gray-500">Financial Services Sector</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">✓ Contract Renewed for 2025</div>
                      <div className="text-xs text-gray-500">Enterprise Plan</div>
                    </div>
                  </div>
                </div>
                
                {/* Feedback Form */}
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h4>
                  <form className="space-y-4" onSubmit={submitFeedback}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder=" Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={fbEmail}
                      onChange={(e) => setFbEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
/>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Rating:</span>
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (<Star
                           key={star}
                           onClick={() => setFbRating(star)}
                          className={`w-5 h-5 cursor-pointer ${
                           star <= fbRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        />
                        ))}

                        </div>
                      </div>
                    </div>
                    <textarea
                      placeholder="Your feedback about Veritas AI..."
                      rows="4"
                      value={fbMessage}
                      onChange={(e) => setFbMessage(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
  type="submit"
  disabled={sending}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg"
>
  {sending ? "Sending..." : "Submit Feedback"}
</button>
                    <a
  href={`https://wa.me/919905843993?text=${encodeURIComponent(
    `Feedback for Veritas AI\n\nName: ${fbName}\nCompany: ${fbCompany}\nEmail: ${fbEmail}\nRating: ${fbRating}/5\n\n${fbMessage}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="block text-center text-green-600 font-semibold mt-2"
>
  Send via WhatsApp
</a>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Technology */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our AI Technology Stack</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-indigo-600 mb-4">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tech.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Accuracy Rate</span>
                  <span className="font-bold text-green-600">{tech.accuracy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-indigo-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                  <div className="text-indigo-600">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Recognition */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white mb-20">
          <div className="text-center mb-10">
            <Award className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-3xl font-bold mb-4">Industry Recognition</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Trusted by leading organizations and recognized by industry authorities for excellence in AI-powered verification.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'AI Innovation Award 2024', icon: '🏆' },
              { name: 'Forbes AI 50', icon: '📊' },
              { name: 'TechCrunch Disrupt Finalist', icon: '⚡' },
              { name: 'ISO 27001 Certified', icon: '🔐' }
            ].map((award, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{award.icon}</div>
                <h3 className="font-bold">{award.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join the Fight Against Misinformation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Partner with Veritas AI to protect your organization from fake news and build trust with your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Request Enterprise Demo</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors duration-200 border border-gray-300 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Join Our Research Team</span>
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Contact: founders@veritas-ai.com | +1 (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
