'use client';

import React from "react";
import { FaCircleCheck, FaPhoneFlip } from "react-icons/fa6";
import { FaCircleArrowRight } from 'react-icons/fa6';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const transitionClasses = 'transition-all duration-500 ease-in-out';
const containerClasses = `relative ${transitionClasses} w-full`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const transition = { duration: 0.6 };

export function HeroTwo({ active }: any) {
  const { push } = useRouter();

  return (
    <div id="hero-two" className={`${containerClasses} ${active ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20 relative"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={transition}
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-black/5 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-black/5 blur-3xl pointer-events-none"></div>
          
          <motion.span 
            className="inline-block border border-black/10 text-black px-6 py-2.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm bg-white/40"
            variants={fadeInUp}
            transition={transition}
          >
            Professional Mobile Car Detailing
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-light text-black leading-tight mb-8"
            variants={fadeInUp}
            transition={transition}
          >
            Our <span className="font-medium text-green-800/95">Story</span>
          </motion.h2>
          <motion.p 
            className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
            transition={transition}
          >
            Mystery Mobile Detailing is a premier mobile car detailing service dedicated to bringing showroom-quality results to your doorstep. Our passion for automotive care and commitment to excellence has made us the trusted choice for vehicle owners who value convenience without compromising on quality.
          </motion.p>
        </motion.div>
        
        {/* Mission and Values */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 mb-20 border border-black/5 relative overflow-hidden"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={transition}
        >
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-black/5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-black/5 blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <motion.div variants={fadeInUp} transition={transition}>
              <h3 className="text-3xl font-light text-black mb-6">Our Mission</h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                To provide exceptional mobile car detailing services that restore and maintain your vehicle's showroom shine. We bring professional-grade detailing directly to you, combining convenience with expert craftsmanship.
              </p>
              
              <h3 className="text-3xl font-light text-black mb-6">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become the most trusted name in mobile car detailing, known for our commitment to quality, customer satisfaction, and innovative detailing techniques that set new standards in the industry.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} transition={transition}>
              <h3 className="text-3xl font-light text-black mb-8">Our Values</h3>
              <div className="space-y-8">
                {['Quality First', 'Customer Satisfaction', 'Professional Expertise', 'Innovation', 'Environmental Care'].map((value, index) => (
                  <motion.div 
                    key={index} 
                    className="group flex items-start hover:scale-[1.02] transition-transform duration-300"
                    variants={fadeInUp}
                    transition={transition}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-800/95/10 flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110">
                      <FaCircleCheck className="text-green-800/95 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black group-hover:text-green-800/95 transition-colors duration-300 text-lg">{value}</h4>
                      <p className="text-gray-700 text-base leading-relaxed mt-2">
                        {
                          index === 0 ? "We use only premium products and techniques to deliver showroom-quality results for every vehicle." :
                          index === 1 ? "Your satisfaction is our top priority. We guarantee 100% satisfaction with our services." :
                          index === 2 ? "Our team consists of certified detailing professionals with years of experience in automotive care." :
                          index === 3 ? "We stay at the forefront of detailing technology and techniques to provide the best possible service." :
                          "We use eco-friendly products and water-saving techniques to minimize our environmental impact."
                        }
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Bottom CTA Section */}
        <motion.div 
          className="mt-16 bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 text-black flex flex-col sm:flex-row items-center justify-between border border-black/5 relative overflow-hidden"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={transition}
        >
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-black/5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-black/5 blur-3xl pointer-events-none"></div>
          
          <div className="mb-8 sm:mb-0 relative z-10">
            <h3 className="text-3xl font-light mb-3">Ready to transform your vehicle?</h3>
            <p className="max-w-xl text-gray-700 text-lg">Let us bring showroom-quality detailing to your doorstep. Schedule your service today!</p>
          </div>
          <div className="flex gap-6 relative z-10">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'tel:+16477063728'}
              className="group relative overflow-hidden border border-black/10 text-black font-medium rounded-full px-8 py-4 transition-all duration-300 hover:bg-black/5"
            >
              <span className="relative z-10 flex items-center">
                Call Us
                <FaPhoneFlip className="ml-3 w-5 h-5 transition-transform group-hover:rotate-12" />
              </span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => push('/products')}
              className="group relative overflow-hidden bg-black text-white font-medium rounded-full px-8 py-4 transition-all duration-300 hover:bg-green-800/95 hover:text-black"
            >
              <span className="relative z-10 flex items-center">
                View Services
                <FaCircleArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
