import React from 'react';
import { Shield, Search, Globe, Mail, Phone, Twitter, Linkedin, Github, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Veritas AI
                </h2>
                <p className="text-sm text-gray-400 mt-1">Deciphering Truth in the Age of Noise</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Advanced AI-powered platform for detecting misinformation, deepfakes, 
              and manipulated content across digital media.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">Verified Results</span>
              </div>
              <div className="flex items-center text-blue-400">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span className="text-sm">Real-time Alerts</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-400" />
              Quick Analysis
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  URL Fact Checker
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Image Verification
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Video Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  Social Media Scanner
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  News Source Rating
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-400" />
              Contact & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-300 font-medium">Support Email</p>
                  <a href="mailto:support@veritasai.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    support@veritasai.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-300 font-medium">Emergency Helpline</p>
                  <a href="tel:+919155549732" className="text-blue-400 hover:text-blue-300 transition-colors">
                    +91 91555 49732
                  </a>
                  <p className="text-sm text-gray-500 mt-1">24/7 Critical Response</p>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-gray-400 text-sm">
                  For urgent misinformation reports, 
                  <span className="text-red-400 font-medium"> contact us immediately</span>
                </p>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Informed</h3>
            <div className="space-y-6">
              {/* Social Links */}
              <div>
                <p className="text-gray-400 mb-4">Follow us for updates</p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-gray-800 hover:bg-blue-700 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-medium">
                    AI-Powered Analysis
                  </span>
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-medium">
                    Military-Grade Security
                  </span>
                  <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs font-medium">
                    ISO 27001 Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Veritas AI Technologies. All rights reserved.</p>
              <p className="mt-1">Combating misinformation through artificial intelligence.</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Data Protection
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                API Documentation
              </a>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex justify-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3 rounded-full border border-gray-700 flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">Protected by Veritas AI Security</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-xs text-green-400">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}