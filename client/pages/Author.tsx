import Header from '../components/Header';
import { useState, useEffect, useCallback } from 'react';
import { speakingReviews, Review } from '../data/reviews';
import { footerPictures } from './Index';
import Footer from './footer';

export default function Author() {
  // State for review carousel
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  // State for managing the marquee animation
  const [animationKey, setAnimationKey] = useState(0);
  const marqueeText = "MY BOOKS ".repeat(20);

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
      <section className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Hero Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 w-full h-[120%] transform -translate-y-[10%]"
            style={{
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-07-20-15-57-01.jpg?alt=media&token=d42bae63-e21c-4399-af29-15dfffa22460)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

      </section>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 mt-[-15%] sm:mt-[-12%] md:mt-[-15%] lg:mt-[-20%] xl:mt-[-15%]">
        <div className="relative z-10 text-center px-4 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <h1 className="font-charm text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[150px] 2xl:text-[250px] font-bold text-white leading-none mb-2 md:mb-4">
                Resources
              </h1>
            </div>
            <h2 className="font-league-spartan text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl pt-2 font-normal text-black sm:ml-[-10%] md:ml-[-20%] lg:ml-[-30%] xl:ml-[-40%] 2xl:ml-[-60%] sm:mt-[-1%] md:mt-[-2%] lg:mt-[-3%] xl:mt-[-4%] 2xl:mt-[-6%]">
              Suzanna Griffiths
            </h2>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-t from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] h-[10vh] sm:h-[15vh] md:h-[20vh] mt-[-10%] sm:mt-[-15%] md:mt-[-20%] pb-[10%] sm:pb-[15%] md:pb-[20%]"></section>

      {/* The Empowered Living Collection Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          {/* Section Title with Orange Background */}
          <div className="relative mb-[8%] sm:mb-[10%] md:mb-[12%]">
            <div className="absolute inset-0 bg-[#FFAC24] h-16 sm:h-20 md:h-24 transform -skew-y-1"></div>
            <div className="relative z-10 flex items-center h-16 sm:h-20 md:h-24">
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal text-black leading-none ml-4 sm:ml-6 md:ml-8">
                The Empowered Living Collection
              </h2>
            </div>
          </div>

          {/* Book Listings */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-8 sm:mb-12 md:mb-16">
            {/* First Book */}
            <div className="bg-white/50 rounded-lg p-4 sm:p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f4fb26806dcd9b009b5277358a543c628e3e9e97?width=484"
                  alt="Redeemed From Inner Scars book cover"
                  className="w-24 h-auto sm:w-28 md:w-32 flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">
                    Redeemed From Inner Scars
                  </h3>
                  <p className="font-helvetica text-sm sm:text-base md:text-lg text-black mb-4 sm:mb-6 leading-relaxed">
                  Through raw honesty and heartfelt reflection, Suzanna D. Griffiths invites readers on a journey of healing, faith, and self-discovery. Redeemed From Inner Scars is a powerful testament to overcoming trauma, reclaiming identity, and finding purpose beyond pain. With biblical insights, personal stories, and guided activities, this book offers encouragement and tools to rise above the past and walk confidently into a life of restoration and hope.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button onClick={() => window.open('https://www.amazon.com/REDEEMED-INNER-SCARS-SUZANNA-GRIFFITHS-ebook/dp/B0FKVLZ8F6/ref=sr_1_1?crid=3A45E7FQ4WKC9&dib=eyJ2IjoiMSJ9.rz77Qwi99DGWC_U9arw8VQ.3vaMyr9uVTOoQ-HUD5dDpqGrKfLpm64n2tiHOBb52RY&dib_tag=se&keywords=Redeemed+From+Inner+Scars&qid=1754248429&s=books&sprefix=redeemed+from+inner+scars%2Cstripbooks%2C111&sr=1-1', '_blank')} className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-xs sm:text-sm">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Book */}
            <div className="bg-white/50 rounded-lg p-4 sm:p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/15038a927adb324e1f36cf74805e39703c06ec28?width=498"
                  alt="Build a Nation book cover"
                  className="w-24 h-auto sm:w-28 md:w-32 flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">
                    Build a Nation, Not Two Empires: A Practical Marriage Guide
                  </h3>
                  <p className="font-helvetica text-sm sm:text-base md:text-lg text-black mb-4 sm:mb-6 leading-relaxed">
                  What if marriage wasn't just about two people but about building an entire nation? In Build A Nation, Not Two Empires, Suzanna D. Griffiths invites readers into a powerful, spirit-filled exploration of marriage that blends personal testimony with biblical truth. Through raw honesty, divine insight, and lessons learned from both brokenness and restoration, Suzanna challenges traditional views of relationships and offers a new framework rooted in purpose, prayer, and partnership.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                    onClick={() => window.location.href = 'https://a.co/d/6D3Muou'}
                    className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-xs sm:text-sm">
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
      <section className="py-1 w-full marquee-container pb-[2%] sm:pb-[3%] md:pb-[2%] lg:pb-[1%] mt-[-10%] relative overflow-hidden bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="w-full overflow-hidden relative">
          {/* Marquee background */}
          <div className="relative w-full h-[80px] sm:h-[120px] md:h-[150px] lg:h-[180px] xl:h-[400px]">
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
                  <span className="font-playfair text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[120px] 2xl:text-[200px] font-bold text-black/30 leading-tight mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                  {marqueeText}
                  </span>
                </div>
              </div>
            </div>
            {/* Centered white text component */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white text-center drop-shadow-lg px-4">
                RESTORED. REALIGNED. REBORN.
              </span>
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
      <section className="relative speaking-section overflow-hidden min-h-[50vh]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-07%20at%2018.00.54.jpeg?alt=media&token=29bccf0b-c40f-40f1-abb0-aea30d22f568')`
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/70"></div>
        
        {/* Content */}
        <div className="relative z-10 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center text-white">
            {/* Review Carousel */}
            <div className="mb-8 md:mb-12 relative min-h-[400px] md:min-h-[500px] flex items-center">
              <div className="w-full">
                {/* Left Arrow */}
                <button 
                  onClick={prevReview}
                  className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                  aria-label="Previous review"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Review Content */}
                <div className="max-w-4xl mx-auto px-16 md:px-24 transition-all duration-700 ease-in-out">
                  <div className="mb-6 md:mb-8">
                    <img 
                      src={speakingReviews[currentReviewIndex].image}
                      alt={`${speakingReviews[currentReviewIndex].name} testimonial`}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full mx-auto object-cover transition-all duration-700 ease-in-out shadow-2xl border-4 border-white/20"
                    />
                  </div>
                  
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-6 md:mb-8 transition-all duration-700 ease-in-out">
                    "GROW, OVERCOME"
                  </h3>
                  
                  <p className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-medium leading-relaxed max-w-4xl mx-auto mb-6 md:mb-8 transition-all duration-700 ease-in-out">
                    {speakingReviews[currentReviewIndex].quote}
                  </p>
                  
                  <div className="font-playfair text-lg sm:text-xl md:text-xl xl:text-2xl text-white transition-all duration-700 ease-in-out">
                    <p className="font-bold mb-2">- {speakingReviews[currentReviewIndex].name}</p>
                    {speakingReviews[currentReviewIndex].role && speakingReviews[currentReviewIndex].company && (
                      <p className="text-lg md:text-xl opacity-80">
                        {speakingReviews[currentReviewIndex].role}, {speakingReviews[currentReviewIndex].company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Arrow */}
                <button 
                  onClick={nextReview}
                  className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                  aria-label="Next review"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Review Indicators */}
            {/* <div className="flex justify-center space-x-3">
              {speakingReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoScrolling(false);
                    setCurrentReviewIndex(index);
                    // Resume auto-scroll after 10 seconds of inactivity
                    setTimeout(() => setIsAutoScrolling(true), 10000);
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentReviewIndex 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Where to Buy Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#FFE4EE] to-[#F1E6DB]">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-black leading-none mb-4 sm:mb-6">
              Where to Buy
            </h2>
            <p className="font-helvetica text-base sm:text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
              Available in Hardcover and Kindle formats at your favorite retailers
            </p>
          </div>

          {/* Retailers Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            {/* Amazon */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/Customer-logo_Amazon-1-1024x512.png.webp?alt=media&token=47ed2e79-b57c-4f92-93d7-13add26cbb76" alt="Amazon" className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12" />
              </div>
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-black mb-2">Amazon</h3>
              <p className="font-helvetica text-xs sm:text-sm text-black/60 mb-4">Hardcover & Kindle</p>
              <button onClick={() => window.open('https://www.amazon.com/REDEEMED-INNER-SCARS-SUZANNA-GRIFFITHS-ebook/dp/B0FKVLZ8F6/ref=sr_1_1?crid=3A45E7FQ4WKC9&dib=eyJ2IjoiMSJ9.rz77Qwi99DGWC_U9arw8VQ.3vaMyr9uVTOoQ-HUD5dDpqGrKfLpm64n2tiHOBb52RY&dib_tag=se&keywords=Redeemed+From+Inner+Scars&qid=1754248429&s=books&sprefix=redeemed+from+inner+scars%2Cstripbooks%2C111&sr=1-1', '_blank')} className="bg-white text-black px-4 sm:px-6 py-2 rounded hover:bg-[#E6951A] transition-colors font-inter text-xs sm:text-sm font-bold">
                SHOP NOW
              </button>
            </div>

            {/* Barnes & Noble */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/d554c6a6-fa21-42b4-9366-d88a26fd41af_removalai_preview.png?alt=media&token=b36b6586-3ef3-4ff2-9465-6bc0bd521d96" alt="Book Jungle Jamaica" className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12" />
              </div>
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-black mb-2">Book Jungle Jamaica</h3>
              <p className="font-helvetica text-xs sm:text-sm text-black/60 mb-4">Hardcover</p>
              <button onClick={() => window.open('https://bookjunglejamaica.com/product/redeemed-from-inner-scars/', '_blank')} className="bg-white text-black px-4 sm:px-6 py-2 rounded hover:bg-[#E6951A] transition-colors font-inter text-xs sm:text-sm font-bold">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Format Availability */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 sm:p-8 text-center shadow-lg">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">Available Formats</h3>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFAC24]/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFAC24]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-1.75-1z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-playfair text-lg sm:text-xl font-bold text-black">Hardcover</h4>
                  <p className="font-helvetica text-xs sm:text-sm text-black/60">Premium quality, perfect for collectors</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFAC24]/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFAC24]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-playfair text-lg sm:text-xl font-bold text-black">Kindle</h4>
                  <p className="font-helvetica text-xs sm:text-sm text-black/60">Instant digital access, read anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription Section with Gradient Arch */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden w-full bg-gradient-to-b from-[#F1E6DB] to-[#FFAC24]">

        <div className="relative z-10 container mx-auto px-4 text-center pt-[8%] sm:pt-[10%] md:pt-[12%]">
          <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal text-white leading-none mb-8 sm:mb-10 md:mb-12">
          JOIN THE EMPOWERED
          SPACE
          </h3>
          
          {/* Signup form */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#E6951A] transition-colors font-inter text-base sm:text-lg mt-4 sm:mt-6">
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
              <svg className="w-full h-full" viewBox="0 0 100 120" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="flippedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFAC24" />
                    <stop offset="50%" stopColor="#F84988" />
                    <stop offset="100%" stopColor="#F84988" />
                  </linearGradient>
                </defs>
                <path d="M0 0 L0 50 Q50 95 100 50 L100 0 Z" fill="url(#flippedGradient)"/>
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
          "This is what it looks like to live it out, everyday."
          </p>
              </div>

              <div className="flex justify-center gap-1 overflow-x-auto pb-4">
                {footerPictures.map((_, index) => (
                  <img
                    key={index}
                    src={footerPictures[index]}
                    alt={`Book ${index + 1}`}
                    className="w-60 h-100 object-contain flex-shrink-0 border-2 border-white rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
