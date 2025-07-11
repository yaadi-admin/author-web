'use client';

import React, { useState } from "react";
import { FaArrowRight, FaCheck, FaStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export function HeroNewsletter({ active }: { active: boolean }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call - replace with actual newsletter signup logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
  ];

  return (
    <div id="hero-newsletter" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-gray-50 py-20`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Newsletter Content */}
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Stay Connected
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Join our community and receive weekly insights on faith, healing, and personal transformation. Get exclusive content, prayer requests, and updates from SueLyn Empowered Living.
            </p>
            
            {/* Newsletter Signup Form */}
            <div className="pt-4">
              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSignup} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  
                  {/* Email and Submit */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <FaArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="flex items-center space-x-3 text-green-600 bg-green-50 p-4 rounded-lg">
                  <FaCheck className="text-2xl" />
                  <span className="font-semibold">Successfully subscribed! Check your email for confirmation.</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-8 text-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaStar className="text-2xl text-yellow-300" />
                  <h3 className="text-2xl font-bold">Weekly Inspiration</h3>
                </div>
                <p className="text-green-100">
                  Receive powerful messages of hope, healing scriptures, and practical tools for your spiritual journey.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-green-200" />
                    <span className="text-sm">Prayer Requests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-green-200" />
                    <span className="text-sm">Life Coaching</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-green-200" />
                    <span className="text-sm">Healing Tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-green-200" />
                    <span className="text-sm">Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Follow Us on Social Media
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected with our community for daily inspiration, live events, and real-time updates on your spiritual journey.
            </p>
            
            {/* Social Media Buttons */}
            <div className="flex justify-center items-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`group p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="text-2xl text-gray-600 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
            
            {/* Additional Info */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span>Daily Devotionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span>Live Prayer Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span>Community Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 