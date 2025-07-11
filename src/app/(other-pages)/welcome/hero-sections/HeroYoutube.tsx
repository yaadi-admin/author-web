'use client';

import React from "react";
import { FaArrowRight } from 'react-icons/fa';

export function HeroYoutube({ active }: { active: boolean }) {
  // YouTube video ID - replace with your actual video ID
  const youtubeVideoId = "dQw4w9WgXcQ"; // Example video ID

  return (
    <div id="hero-youtube" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-gray-50 py-24`}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - YouTube Video */}
          <div className="relative w-full h-full">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                title="Featured Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Watch My Story
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              SueLyn Empowered Living is where faith meets personal transformation. Led by Suzanna Griffiths, this space is designed to help men and women heal from emotional wounds, align with God's Word, and walk in their divine purpose - boldly and whole.
            </p>
            
            {/* Call to Action Button */}
            <div className="pt-4">
              <button className="group inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300">
                <span>Read More</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 