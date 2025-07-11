'use client';

import React, { useState } from "react";
import { FaCircleArrowRight, FaCircleCheck, FaPhoneFlip, FaCar, FaWrench, FaShieldHalved, FaStar } from 'react-icons/fa6';
import { Modal } from 'rizzui';
import toast from 'react-hot-toast';
import { serverTimestamp } from "firebase/firestore";
import { Service, services } from '@/app/(other-pages)/products/services';

const transitionClasses = 'transition-opacity transition-transform duration-300 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

export function HeroBooks({ active }: { active: boolean }) {
  // Selected product for popup
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Handle booking button click
  const handleBookNow = (product: any) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  // Books data
  const books = [
    {
      id: 1,
      title: "The Art of Leadership",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=200&fit=crop&crop=center",
      description: "A comprehensive guide to effective leadership in the modern business world, covering essential skills and strategies.",
      price: "$24.99"
    },
    {
      id: 2,
      title: "Digital Transformation",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop&crop=center",
      description: "Navigate the complexities of digital transformation with practical insights and proven methodologies.",
      price: "$29.99"
    },
    {
      id: 3,
      title: "Innovation Strategy",
      author: "Emma Rodriguez",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center",
      description: "Discover how to build and sustain innovation within your organization through strategic frameworks.",
      price: "$27.99"
    },
    {
      id: 4,
      title: "Future of Work",
      author: "David Thompson",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop&crop=center",
      description: "Explore the evolving workplace landscape and prepare your organization for the challenges ahead.",
      price: "$22.99"
    }
  ];

  return (
    <div id="hero-two" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
      {/* Books Display Section */}
      <div className="relative py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <div 
                key={book.id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Book Image */}
                <div className="relative h-[350px] overflow-hidden">
                  <img 
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Book Details */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {book.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
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