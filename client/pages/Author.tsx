import Header from '../components/Header';
import { useState, useEffect, useCallback } from 'react';
import { speakingReviews, Review } from '../data/reviews';

export default function Author() {
  // State for review carousel
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  // State for managing the marquee animation
  const [animationKey, setAnimationKey] = useState(0);
  const marqueeText = "My Books ".repeat(20);

  // Auto-scroll reviews
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % speakingReviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Review carousel navigation
  const nextReview = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentReviewIndex((prev) => (prev + 1) % speakingReviews.length);
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 10000);
  }, []);

  const prevReview = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentReviewIndex((prev) => (prev - 1 + speakingReviews.length) % speakingReviews.length);
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 10000);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE]">
      <Header whiteText={true} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 w-full h-[120%] transform -translate-y-[10%]"
            style={{
              backgroundImage: 'url(https://api.builder.io/api/v1/image/assets/TEMP/7cf07593ce043b7a08e4f1ca3e188ae94e312d73?width=3838)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <h1 className="font-charm text-[200px] md:text-[300px] font-bold text-white leading-none mb-2 md:mb-4">
                Author
              </h1>
            </div>
            <h2 className="font-league-spartan text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white ml-[-60%] mt-[-6%]">
              Suzanna Griffiths
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-t from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] h-[20vh] mt-[-20%] pb-[20%]"></section>

      {/* The Empowered Living Collection Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          {/* Section Title with Orange Background */}
          <div className="relative mb-[12%]">
            <div className="absolute inset-0 bg-[#FFAC24] h-24 transform -skew-y-1"></div>
            <div className="relative z-10 flex items-center h-24">
              <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none ml-8">
                The Empowered Living Collection
              </h2>
            </div>
          </div>

          {/* Book Listings */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* First Book */}
            <div className="bg-white/50 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex gap-6 items-start">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f4fb26806dcd9b009b5277358a543c628e3e9e97?width=484"
                  alt="Redeemed From Inner Scars book cover"
                  className="w-32 h-auto flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-4">
                    Redeemed From Inner Scars
                  </h3>
                  <p className="font-montserrat text-lg text-black mb-6 leading-relaxed">
                  Through raw honesty and heartfelt reflection, Suzanna D. Griffiths invites readers on a journey of healing, faith, and self-discovery. Redeemed From Inner Scars is a powerful testament to overcoming trauma, reclaiming identity, and finding purpose beyond pain. With biblical insights, personal stories, and guided activities, this book offers encouragement and tools to rise above the past and walk confidently into a life of restoration and hope.
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => window.open('https://www.amazon.com/REDEEMED-INNER-SCARS-SUZANNA-GRIFFITHS-ebook/dp/B0FKVLZ8F6/ref=sr_1_1?crid=3A45E7FQ4WKC9&dib=eyJ2IjoiMSJ9.rz77Qwi99DGWC_U9arw8VQ.3vaMyr9uVTOoQ-HUD5dDpqGrKfLpm64n2tiHOBb52RY&dib_tag=se&keywords=Redeemed+From+Inner+Scars&qid=1754248429&s=books&sprefix=redeemed+from+inner+scars%2Cstripbooks%2C111&sr=1-1', '_blank')} className="bg-white text-black px-6 py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-sm">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Book */}
            <div className="bg-white/50 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex gap-6 items-start">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/15038a927adb324e1f36cf74805e39703c06ec28?width=498"
                  alt="Build a Nation book cover"
                  className="w-32 h-auto flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-4">
                    Build a Nation, Not Two Empires: A Practical Marriage Guide
                  </h3>
                  <p className="font-montserrat text-lg text-black mb-6 leading-relaxed">
                  What if marriage wasn’t just about two people but about building an entire nation? In Build A Nation, Not Two Empires, Suzanna D. Griffiths invites readers into a powerful, spirit-filled exploration of marriage that blends personal testimony with biblical truth. Through raw honesty, divine insight, and lessons learned from both brokenness and restoration, Suzanna challenges traditional views of relationships and offers a new framework rooted in purpose, prayer, and partnership.
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-white text-black px-6 py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-sm">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Text */}
        </div>
      </section>


      {/* Continuous Background Text Section */}
      <section className="py-16 w-full marquee-container bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB] pb-[2%]">
        <div className="w-full overflow-hidden">
          <div className="relative w-full h-[180px] md:h-[240px]">
            <div
              className="absolute top-1/2 left-0 w-full"
              style={{ transform: "translateY(-50%)" }}
            >
              <div className="w-full overflow-hidden">
                <div
                  key={animationKey}
                  className="marquee-content whitespace-nowrap opacity-30 animate-continuous-marquee"
                  style={{
                    animationDuration: '30s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                  }}
                >
                  <span className="font-playfair text-8xl md:text-[150px] font-bold text-black leading-tight mx-8">
                    {marqueeText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            @keyframes continuous-marquee {
              0% { 
                transform: translateX(100%); 
              }
              100% { 
                transform: translateX(-100%); 
              }
            }
            
            .animate-continuous-marquee {
              animation-name: continuous-marquee;
            }
            
            /* Ensure smooth rendering */
            .marquee-content {
              will-change: transform;
              backface-visibility: hidden;
              transform: translateZ(0);
            }
          `}
        </style>
      </section>


      {/* Testimonial Section with Dark Background */}
      <section className="py-24 relative overflow-hidden bg-gray-800">
        <div className="container mx-auto px-4 text-center text-white">
          {/* Review Carousel */}
          <div className="mb-12 relative h-[450px]">
            <div className="flex items-center justify-center">
              {/* Left Arrow */}
              <button 
                onClick={prevReview}
                className="absolute left-4 md:left-8 lg:left-16 z-20 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors duration-300 backdrop-blur-sm"
                aria-label="Previous review"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Review Content */}
              <div className="max-w-4xl mx-auto px-8 transition-all duration-500 ease-in-out">
                <img 
                  src={speakingReviews[currentReviewIndex].image}
                  alt={`${speakingReviews[currentReviewIndex].name} testimonial`}
                  className="w-32 h-32 rounded-full mx-auto mb-8 object-cover transition-all duration-500 ease-in-out"
                />
                <h3 className="font-playfair text-4xl font-bold text-white mb-6 transition-all duration-500 ease-in-out">"GROW, OVERCOME"</h3>
                <p className="font-playfair text-xl md:text-2xl text-white font-bold leading-normal max-w-3xl mx-auto mb-6 transition-all duration-500 ease-in-out">
                  {speakingReviews[currentReviewIndex].quote}
                </p>
                <div className="font-playfair text-2xl text-white transition-all duration-500 ease-in-out">
                  <p className="font-bold">- {speakingReviews[currentReviewIndex].name}</p>
                  {speakingReviews[currentReviewIndex].role && speakingReviews[currentReviewIndex].company && (
                    <p className="text-lg opacity-80 mt-2">
                      {speakingReviews[currentReviewIndex].role}, {speakingReviews[currentReviewIndex].company}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={nextReview}
                className="absolute right-4 md:right-8 lg:right-16 z-20 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors duration-300 backdrop-blur-sm"
                aria-label="Next review"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Review Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {speakingReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoScrolling(false);
                    setCurrentReviewIndex(index);
                    // Resume auto-scroll after 10 seconds of inactivity
                    setTimeout(() => setIsAutoScrolling(true), 10000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentReviewIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where to Buy Section */}
      <section className="py-24 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-black leading-none mb-6">
              Where to Buy
            </h2>
            <p className="font-montserrat text-xl text-black/70 max-w-2xl mx-auto">
              Available in Hardcover and Kindle formats at your favorite retailers
            </p>
          </div>

          {/* Retailers Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Amazon */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="w-88 h-44 mx-auto mb-4 rounded-full flex items-center justify-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/Customer-logo_Amazon-1-1024x512.png.webp?alt=media&token=47ed2e79-b57c-4f92-93d7-13add26cbb76" alt="Amazon" className="w-88 h-44" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-black mb-2">Amazon</h3>
              <p className="font-montserrat text-sm text-black/60 mb-4">Hardcover & Kindle</p>
              <button onClick={() => window.open('https://www.amazon.com/REDEEMED-INNER-SCARS-SUZANNA-GRIFFITHS-ebook/dp/B0FKVLZ8F6/ref=sr_1_1?crid=3A45E7FQ4WKC9&dib=eyJ2IjoiMSJ9.rz77Qwi99DGWC_U9arw8VQ.3vaMyr9uVTOoQ-HUD5dDpqGrKfLpm64n2tiHOBb52RY&dib_tag=se&keywords=Redeemed+From+Inner+Scars&qid=1754248429&s=books&sprefix=redeemed+from+inner+scars%2Cstripbooks%2C111&sr=1-1', '_blank')} className="bg-white text-black px-6 py-2 rounded hover:bg-[#E6951A] transition-colors font-inter text-sm font-bold">
                SHOP NOW
              </button>
            </div>

            {/* Barnes & Noble */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="w-88 h-44 mx-auto mb-4 rounded-full flex items-center justify-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/d554c6a6-fa21-42b4-9366-d88a26fd41af_removalai_preview.png?alt=media&token=b36b6586-3ef3-4ff2-9465-6bc0bd521d96" alt="Book Jungle Jamaica" className="w-88 h-44" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-black mb-2">Book Jungle Jamaica</h3>
              <p className="font-montserrat text-sm text-black/60 mb-4">Hardcover</p>
              <button onClick={() => window.open('https://bookjunglejamaica.com/product/redeemed-from-inner-scars/', '_blank')} className="bg-white text-black px-6 py-2 rounded hover:bg-[#E6951A] transition-colors font-inter text-sm font-bold">
                SHOP NOW
              </button>
            </div>

            {/* Bookshop.org */}
            {/* <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FFAC24]/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#FFAC24]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-bold text-black mb-2">Bookshop.org</h3>
              <p className="font-montserrat text-sm text-black/60 mb-4">Support Local Bookstores</p>
              <button className="bg-[#FFAC24] text-black px-6 py-2 rounded hover:bg-[#E6951A] transition-colors font-inter text-sm font-bold">
                SHOP NOW
              </button>
            </div> */}

            {/* Direct from Author */}
            {/* <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FFAC24]/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#FFAC24]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-bold text-black mb-2">Signed Copies</h3>
              <p className="font-montserrat text-sm text-black/60 mb-4">Direct from Author</p>
              <button className="bg-[#FFAC24] text-black px-6 py-2 rounded hover:bg-[#E6951A] transition-colors font-inter text-sm font-bold">
                ORDER NOW
              </button>
            </div> */}
          </div>

          {/* Format Availability */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg">
            <h3 className="font-playfair text-3xl font-bold text-black mb-6">Available Formats</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-[#FFAC24]/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#FFAC24]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-1.75-1z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-playfair text-xl font-bold text-black">Hardcover</h4>
                  <p className="font-montserrat text-sm text-black/60">Premium quality, perfect for collectors</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-[#FFAC24]/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#FFAC24]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-playfair text-xl font-bold text-black">Kindle</h4>
                  <p className="font-montserrat text-sm text-black/60">Instant digital access, read anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription Section with Gradient Arch */}
      <section className="py-24 relative overflow-hidden w-full bg-gradient-to-t from-[#FFE4EE] to-[#F1E6DB]">
        {/* Gradient curved background - full width arch */}
        <div className="absolute inset-0 w-screen left-1/2 transform -translate-x-1/2">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="subscriptionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F84988" />
                <stop offset="50%" stopColor="#F84988" />
                <stop offset="100%" stopColor="#FFAC24" />
              </linearGradient>
            </defs>
            <path d="M0 100 L0 60 Q50 0 100 60 L100 100 Z" fill="url(#subscriptionGradient)"/>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-[12%]">
          <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white leading-none mb-12">
          JOIN THE EMPOWERED
          SPACE
          </h3>
          
          {/* Signup form */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button className="bg-white text-black px-8 py-4 rounded-lg hover:bg-[#E6951A] transition-colors font-inter text-lg mt-6">
              Join the Empowered Space
            </button>
          </div>
        </div>
      </section>

      {/* "GROW, OVERCOME, and get BACK UP" Section */}
      <section className="py-24 mt-[-7%]">
      <div className="relative py-24 overflow-hidden w-full">
            {/* Flipped arch background - full width */}
            <div className="absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 h-screen">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="flippedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFAC24" />
                    <stop offset="50%" stopColor="#F84988" />
                    <stop offset="100%" stopColor="#F84988" />
                  </linearGradient>
                </defs>
                <path d="M0 0 L0 40 Q50 100 100 40 L100 0 Z" fill="url(#flippedGradient)"/>
              </svg>
            </div>

            <div className="relative z-10 container mx-auto px-4 mt-[-100px]">
              <div className="text-center mb-[5%]">
              <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl font-normal text-white leading-none mt-[5%]">
              RESTORED, REALIGNED,
            </h3>
            <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-4xl font-light italic text-white leading-tight max-w-2xl mt-[0%] mb-[0%] ml-[20%]">
              REBORN
            </p>
            <p className="font-playfair text-lg sm:text-xl md:text-3xl lg:text-3xl font-normal text-white leading-tight max-w-4xl mx-auto mb-8 mt-5">
          "this is what it looks like to live it out, every day."
          </p>
              </div>

              <div className="flex justify-center gap-1 overflow-x-auto pb-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <img
                    key={index}
                    src="https://api.builder.io/api/v1/image/assets/TEMP/1179b95de6107e5b5b214d0f2ee7366adaac0a3d?width=586"
                    alt={`Book ${index + 1}`}
                    className="w-100 h-100 object-cover flex-shrink-0 border-2 border-white rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-16 bg-gradient-to-b from-[#F84988] to-[#FFAC24]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Social Links */}
            <div className="flex gap-6">
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.23 5.924a8.212 8.212 0 0 1-2.357.646 4.115 4.115 0 0 0 1.804-2.27 8.221 8.221 0 0 1-2.606.996A4.103 4.103 0 0 0 16.616 3c-2.27 0-4.103 1.834-4.103 4.103 0 .322.036.635.106.935a11.645 11.645 0 0 1-8.457-4.287 4.096 4.096 0 0 0-.556 2.063c0 1.424.724 2.679 1.825 3.415a4.066 4.066 0 0 1-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.109 4.109 0 0 1-1.853.07c.522 1.63 2.038 2.816 3.833 2.85A8.236 8.236 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22.23 5.924z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="font-jost text-sm font-bold text-black uppercase tracking-wider">
                © 2023 <span className="text-[#8B5CF6]">SUZANNA GRIFFITS</span>. ALL RIGHTS RESERVED
              </p>
            </div>

            {/* Design Credit */}
            <div className="text-right">
              <p className="font-jost text-sm font-bold text-black uppercase tracking-wider">
                POWERED BY: <span className="text-[#8B5CF6]">EMPOWERED LIVING</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
