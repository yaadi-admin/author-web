'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaBook, FaMicrophone, FaCalendar, FaTv, FaStar, FaAward, FaGlobe } from 'react-icons/fa';

export function HeroPanel({ active }: { active: boolean }) {
  const { push } = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState<number | null>(null);
  
  const featuredServices = [
    {
      id: 1,
      name: "Author",
      icon: FaBook,
      description: "A 13-point blueprint that has helped to deliver real influence, build purposeful communities, and demonstrate thought leadership",
      badge: "Bestselling",
      stats: "50+ Publications",
      highlight: "Thought Leadership Expert"
    },
    {
      id: 2,
      name: "Speaker",
      icon: FaMicrophone,
      description: "A TEDx speaker who is a highly engaging, knowledgeable, and master storyteller. She captivates diverse audiences all over the world.",
      badge: "TEDx Speaker",
      stats: "100+ Events",
      highlight: "Global Keynote Speaker"
    },
    {
      id: 3,
      name: "Event Host",
      icon: FaCalendar,
      description: "Serving clients all over the world with authenticity, passion, zest and energy, setting the tone no matter the audience or subject matter.",
      badge: "Premium Host",
      stats: "200+ Events",
      highlight: "International Event Specialist"
    },
    {
      id: 4,
      name: "TV Host",
      icon: FaTv,
      description: "A quirky combination of earthy wit, adaptability and ebullience grounded in excellence, grace and elegance.",
      badge: "TV Personality",
      stats: "15+ Shows",
      highlight: "Broadcast Media Expert"
    }
  ];
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handlePanelInteraction = (index: number) => {
    setActivePanel(index);
  };
  
  const handlePanelLeave = () => {
    setActivePanel(null);
  };
  
  const handlePanelClick = (service: any, index: number) => {
    switch(service.name.toLowerCase()) {
      case 'author':
        push('/about-us');
        break;
      case 'speaker':
        push('/work-with-me');
        break;
      case 'event host':
        push('/gallery');
        break;
      case 'tv host':
        push('/about-us');
        break;
      default:
        push('/about-us');
    }
  };

  return (
    <div 
      id="hero-panel" 
      className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 min-h-screen`}
    >
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full pt-20 gap-4 px-4 pb-8">
        {featuredServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div 
              key={service.id}
              className={`relative transition-all duration-500 ease-in-out overflow-hidden rounded-xl shadow-lg cursor-pointer
                         ${activePanel === index 
                            ? 'flex-[5] min-h-[280px]' 
                            : 'flex-[1] min-h-[100px]'}`}
              onClick={() => handlePanelInteraction(index)}
            >
              {/* Background */}
              <div className="absolute inset-0 w-full h-full">
                {/* Hover overlay - only when active */}
                {activePanel === index && (
                  <div className="absolute inset-0 bg-black/30 z-10 transition-opacity duration-500"></div>
                )}
                {/* Bottom overlay for text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
                  alt={service.name}
                  className={`w-full h-full object-cover transition-all duration-700
                            ${activePanel === index ? 'scale-105' : 'scale-100 brightness-95'}`}
                />
              </div>
              
              {/* Collapsed State */}
              <div className={`absolute inset-0 p-4 z-20 flex 
                             ${activePanel === index 
                                ? 'opacity-0' 
                                : 'items-center justify-center opacity-100'}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl drop-shadow-lg">
                    {service.name}
                  </h3>
                </div>
              </div>
              
              {/* Expanded State */}
              <div className={`absolute inset-0 p-6 z-20 flex flex-col justify-end transition-all duration-500
                             ${activePanel === index ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                <div className="w-full max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/30">
                      {service.badge}
                    </span>
                    <FaStar className="text-yellow-400 w-3 h-3" />
                  </div>
                  <h3 className="text-white font-bold text-3xl mb-2 drop-shadow-lg">
                    {service.name}
                  </h3>
                  <p className="text-white/90 text-sm mb-3 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-white/80 text-xs">
                    <span className="flex items-center gap-1">
                      <FaAward className="w-3 h-3" />
                      {service.stats}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaGlobe className="w-3 h-3" />
                      {service.highlight}
                    </span>
                  </div>
                  <button 
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg px-5 py-2.5 flex items-center hover:bg-white/30 transition-all duration-300 shadow-lg"
                    onClick={() => handlePanelClick(service, index)}
                  >
                    <span className="font-medium">Learn More</span>
                    <FaArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen pt-20 gap-4 px-8">
        {featuredServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div 
              key={service.id}
              className={`relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer rounded-xl
                         ${activePanel === index ? 'flex-[3]' : activePanel !== null ? 'flex-[0.7]' : 'flex-1'}`}
              onMouseEnter={() => handlePanelInteraction(index)}
              onMouseLeave={handlePanelLeave}
              onClick={() => handlePanelClick(service, index)}
            >
              {/* Background */}
              <div className="absolute inset-0 w-full h-full">
                {/* Hover overlay - only when active */}
                {activePanel === index && (
                  <div className="absolute inset-0 bg-black/30 z-10 transition-opacity duration-500"></div>
                )}
                {/* Bottom overlay for text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/dfee8cfc-38ba-4989-a2dc-4db6237f6343_removalai_preview.png?alt=media&token=2595d0d3-fc66-481d-9840-2e9a49090e57"
                  alt={service.name}
                  className={`w-full h-full object-cover transition-all duration-700
                            ${activePanel === index ? 'scale-105 filter-none' : 'scale-100 brightness-95 filter blur-[0.3px]'}`}
                />
              </div>
              
              {/* Vertical Title */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-500 whitespace-nowrap
                             ${activePanel === index ? 'opacity-0' : activePanel !== null ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-white font-bold text-2xl transform -rotate-90 drop-shadow-lg">
                  {service.name}
                </h3>
              </div>
              
              {/* Default State */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 z-20 transition-all duration-500
                             ${activePanel === null ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/30">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
                    {service.name}
                  </h3>
                  <div className="h-0.5 w-10 bg-white/50 mx-auto rounded-full"></div>
                </div>
              </div>
              
              {/* Active State */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 z-20 transition-all duration-500
                             ${activePanel === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="w-full max-w-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/30 font-medium">
                      {service.badge}
                    </span>
                    <FaStar className="text-yellow-400 w-4 h-4" />
                  </div>
                  <h3 className="text-white font-bold text-4xl mb-3 drop-shadow-lg">
                    {service.name}
                  </h3>
                  <p className="text-white/90 text-base max-w-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4 mb-5 text-white/80 text-sm">
                    <span className="flex items-center gap-1.5">
                      <FaAward className="w-4 h-4" />
                      {service.stats}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaGlobe className="w-4 h-4" />
                      {service.highlight}
                    </span>
                  </div>
                  <button 
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg px-6 py-3 flex items-center hover:bg-white/30 transition-all duration-300 shadow-lg"
                    onClick={() => handlePanelClick(service, index)}
                  >
                    <span className="font-medium">Learn More</span>
                    <FaArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 