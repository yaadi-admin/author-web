'use client';

import React, { useState, useRef } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendar, FaUser, FaClock } from 'react-icons/fa';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Finding Your Divine Purpose: A Journey of Faith",
    excerpt: "Discover how to align your life with God's plan and walk boldly in your calling. Learn practical steps to identify and pursue your divine purpose.",
    author: "Suzanna Griffiths",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Spiritual Growth"
  },
  {
    id: 2,
    title: "Healing from Emotional Wounds: God's Restoration",
    excerpt: "Explore biblical principles for emotional healing and restoration. Find hope and practical guidance for overcoming past hurts and trauma.",
    author: "Suzanna Griffiths",
    date: "December 12, 2024",
    readTime: "7 min read",
    category: "Emotional Healing"
  },
  {
    id: 3,
    title: "Walking in Boldness: Embracing Your Identity in Christ",
    excerpt: "Learn how to step into the boldness that comes from knowing your identity in Christ. Transform your mindset and live with confidence.",
    author: "Suzanna Griffiths",
    date: "December 10, 2024",
    readTime: "6 min read",
    category: "Identity"
  },
  {
    id: 4,
    title: "Aligning with God's Word: Practical Steps for Daily Living",
    excerpt: "Discover practical ways to align your thoughts, words, and actions with God's Word. Create lasting change in your daily life.",
    author: "Suzanna Griffiths",
    date: "December 8, 2024",
    readTime: "8 min read",
    category: "Biblical Living"
  },
  {
    id: 5,
    title: "Building Whole Relationships: God's Design for Connection",
    excerpt: "Learn God's principles for building healthy, whole relationships. Find guidance for marriage, family, and friendships.",
    author: "Suzanna Griffiths",
    date: "December 5, 2024",
    readTime: "9 min read",
    category: "Relationships"
  },
  {
    id: 6,
    title: "Overcoming Fear: Trusting God in Uncertain Times",
    excerpt: "Face your fears with faith and discover how to trust God completely. Learn to walk in peace regardless of circumstances.",
    author: "Suzanna Griffiths",
    date: "December 3, 2024",
    readTime: "6 min read",
    category: "Faith"
  }
];

export function HeroBlog({ active }: { active: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogPosts.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogPosts.length - 3 : prevIndex - 1
    );
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + 3);

  return (
    <div id="hero-blog" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-white py-20`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Latest from the Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights, encouragement, and practical wisdom for your journey of faith and personal transformation.
          </p>
        </div>

        {/* Blog Posts Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            <FaArrowLeft className="text-gray-600 text-lg" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            <FaArrowRight className="text-gray-600 text-lg" />
          </button>

          {/* Blog Posts Grid */}
          <div 
            ref={sliderRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-transform duration-500 ease-in-out"
          >
            {visiblePosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-gray-100">
                {/* Blog Post Image */}
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <FaArrowRight className="text-white text-2xl" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Blog Post Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <FaUser className="text-xs" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaCalendar className="text-xs" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaClock className="text-xs" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <button className="group inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200">
                    <span>Read More</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(blogPosts.length / 3) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * 3)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  Math.floor(currentIndex / 3) === i ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>View All Posts</span>
            <FaArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
        
      </div>
      
      {/* Utility Classes */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 