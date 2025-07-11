'use client';

import React from "react";
import { FaBook, FaMicrophone, FaHeart, FaStar, FaArrowRight } from 'react-icons/fa';

export function HeroTwo({ active }: { active: boolean }) {
  // Corner content data for author services
  const cornerContent = [
    {
      position: 'top-left',
      icon: FaBook,
      title: 'Author & Writer',
      description: 'Published author with transformative books that guide readers on their spiritual journey',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      position: 'top-right',
      icon: FaMicrophone,
      title: 'Motivational Speaker',
      description: 'TEDx speaker and engaging presenter who captivates audiences worldwide',
      color: 'bg-gradient-to-br from-green-500 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-green-200'
    },
    {
      position: 'bottom-left',
      icon: FaHeart,
      title: 'Life Coach',
      description: 'Certified life coach helping individuals heal and find their divine purpose',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      position: 'bottom-right',
      icon: FaStar,
      title: 'Faith Leader',
      description: 'Spiritual mentor guiding others to align with God\'s Word and walk boldly',
      color: 'bg-gradient-to-br from-orange-500 to-orange-700',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200'
    }
  ];

  // Corner Content Component
  const CornerContent = ({ content }: { content: typeof cornerContent[0] }) => {
    const IconComponent = content.icon;
    
    const positionClasses = {
      'top-left': 'top-16 left-16 transform -translate-x-1/2 -translate-y-1/2',
      'top-right': 'top-16 right-16 transform translate-x-1/2 -translate-y-1/2',
      'bottom-left': 'bottom-16 left-16 transform -translate-x-1/2 translate-y-1/2',
      'bottom-right': 'bottom-16 right-16 transform translate-x-1/2 translate-y-1/2'
    };

    return (
      <div className={`absolute ${positionClasses[content.position as keyof typeof positionClasses]} w-64 z-20`}>
        <div className={`bg-gradient-to-br ${content.bgGradient} backdrop-blur-md rounded-3xl p-6 border ${content.borderColor} hover:shadow-2xl transition-all duration-500 hover:scale-105 group`}>
          <div className="text-center mb-4">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${content.color} text-white mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{content.title}</h3>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed text-center">{content.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div id="hero-two" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-gradient-to-br from-gray-50 to-white py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Centered Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-wide mb-8">
            I Serve You With
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A unique combination of faith, expertise, and passion to help you transform your life and walk in your divine purpose.
          </p>
        </div>
        
        {/* Main Content with Circular Image and Corner Text */}
        <div className="relative flex justify-center items-center min-h-[600px] mb-20">
          {/* Circular Background SVG that connects all boxes */}
          <div className="absolute inset-0 flex justify-center items-center">
            <svg 
              width="600" 
              height="600" 
              viewBox="0 0 600 600" 
              className="absolute z-10"
            >
              {/* Outer circle */}
              <circle 
                cx="300" 
                cy="300" 
                r="280" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                className="animate-pulse"
              />
              
              {/* Inner circle */}
              <circle 
                cx="300" 
                cy="300" 
                r="240" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="1" 
                strokeDasharray="3,3"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
              
              {/* Connecting lines to each corner */}
              <line x1="300" y1="300" x2="120" y2="120" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="300" y1="300" x2="480" y2="120" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="300" y1="300" x2="120" y2="480" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="300" y1="300" x2="480" y2="480" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="2,2" />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Central Circular Image */}
          <div className="relative w-96 h-96 rounded-full overflow-hidden border-8 border-white/30 backdrop-blur-sm z-30">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
              alt="SueLyn Empowered Living"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent"></div>
          </div>
          
          {/* Corner Content */}
          {cornerContent.map((content, index) => (
            <CornerContent key={index} content={content} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="group inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            <span className="text-lg">Discover My Services</span>
            <FaArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
} 