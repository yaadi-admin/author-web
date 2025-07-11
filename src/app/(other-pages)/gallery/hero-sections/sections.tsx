'use client';

import React, { useState } from "react";
import { FaCircleCheck, FaPhoneFlip } from "react-icons/fa6";
import { FaCircleArrowRight } from 'react-icons/fa6';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const transitionClasses = 'transition-all duration-500 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const transition = { duration: 0.6 };

// Sample gallery images - replace these with your actual images
const galleryImages = [
  {
    id: 1,
    src: "https://unsplash.com/photos/car-service-worker-polishing-vehicle-body-with-special-wax-from-scratches-close-up-professional-car-detailing-and-maintenance-concept-LwVJURJz3Ds",
    alt: "Exterior detailing showcase",
    category: "Exterior"
  },
  {
    id: 2,
    src: "https://unsplash.com/photos/car-detailing-wash-and-cleaning-concept-cropped-image-of-hand-of-male-professional-car-wash-worker-in-black-rubber-gloves-holding-the-gray-microfiber-and-polishing-the-car-hood-of-luxury-white-car-HbGRew5BTZ8",
    alt: "Interior cleaning results",
    category: "Interior"
  },
  {
    id: 3,
    src: "/images/gallery/detail-3.jpg",
    alt: "Paint correction work",
    category: "Paint Correction"
  },
  {
    id: 4,
    src: "/images/gallery/detail-4.jpg",
    alt: "Ceramic coating application",
    category: "Ceramic Coating"
  },
  {
    id: 5,
    src: "/images/gallery/detail-5.jpg",
    alt: "Engine bay detailing",
    category: "Engine Bay"
  },
  {
    id: 6,
    src: "/images/gallery/detail-6.jpg",
    alt: "Wheel and tire detailing",
    category: "Wheels & Tires"
  }
];

export function HeroTwo({ active }: any) {
  const { push } = useRouter();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'next'
      ? (selectedImage + 1) % filteredImages.length
      : (selectedImage - 1 + filteredImages.length) % filteredImages.length;
    
    setSelectedImage(newIndex);
  };

  return (
    <div id="hero-two" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">

        {/* Gallery Section */}
        <motion.div 
          className="text-center mb-12 relative"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={transition}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-light text-black leading-tight mb-8"
            variants={fadeInUp}
            transition={transition}
          >
            Our <span className="font-medium text-green-800/95">Gallery</span>
          </motion.h2>
          <motion.p 
            className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
            transition={transition}
          >
            Explore our portfolio of exceptional detailing work. Each image showcases our commitment to excellence and attention to detail.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={transition}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-green-800/95 text-black'
                  : 'bg-white/90 backdrop-blur-sm border border-black/10 text-black hover:bg-black/5'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={transition}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleImageClick(index)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">{image.category}</p>
                <p className="text-sm opacity-90">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-green-800/95 transition-colors duration-300"
                onClick={closeLightbox}
              >
                <IoClose size={32} />
              </button>
              
              <button
                className="absolute left-4 text-white hover:text-green-800/95 transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                <FaChevronLeft size={32} />
              </button>
              
              <button
                className="absolute right-4 text-white hover:text-green-800/95 transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
              >
                <FaChevronRight size={32} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-7xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  className="max-h-[90vh] w-auto mx-auto object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                  <p className="text-lg font-medium">{filteredImages[selectedImage].category}</p>
                  <p className="text-sm opacity-90">{filteredImages[selectedImage].alt}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
