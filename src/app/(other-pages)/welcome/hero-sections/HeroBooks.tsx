'use client';

import React from "react";
import { FaArrowRight } from 'react-icons/fa';

export function HeroBooks({ active }: { active: boolean }) {
  // Books data for the author
  const books = [
    {
      id: 1,
      title: "Finding Your Divine Purpose",
      subtitle: "A Journey of Faith and Discovery",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Healing from Within",
      subtitle: "God's Restoration for Your Heart",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Walking in Boldness",
      subtitle: "Embracing Your Identity in Christ",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Faith Over Fear",
      subtitle: "Trusting God in Uncertain Times",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop&crop=center",
    }
  ];

  return (
    <div id="hero-books" className={`relative w-full ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 bg-gray-50 py-24`}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {books.map((book, index) => (
            <div 
              key={book.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Book Image */}
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Book Details */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {book.subtitle}
                </p>
                
                {/* Read More Button */}
                <button className="group inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium mt-4 transition-colors duration-300">
                  <span>Read More</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
} 