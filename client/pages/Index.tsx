import Header from '../components/Header';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { speakingReviews, Review } from '../data/reviews';
import Footer from './footer';
import { Link } from 'react-router-dom';

export const footerPictures = [
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.13.42.jpeg?alt=media&token=b8d6e1a3-f9c8-4f9f-9922-e1845f387b52",
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0178.jpg?alt=media&token=41ee0dfd-8d7f-447d-964d-27939d20834a",
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0070.jpg?alt=media&token=568de8dc-e8f7-45ee-a4c0-95f81ffd38fb",
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.15.23.jpeg?alt=media&token=dda25c8d-55da-4ba9-aa4d-2dd531d5ad04",
];

export default function Index() { 
  // State for managing the marquee animation
  const [animationKey, setAnimationKey] = useState(0);

  // State for review carousel
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

 

  // Memoized text content to prevent unnecessary re-renders
  const marqueeText = useMemo(() => {
    return "EMPOWERED LIVING ".repeat(100); // Repeat text to ensure smooth loop
  }, []);

  // Parallax effect for speaking section
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setScrollY(scrolled);
      
      const speakingSection = document.querySelector('.speaking-section');
      if (speakingSection) {
        const rect = speakingSection.getBoundingClientRect();
        const sectionTop = rect.top + scrolled;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (scrolled >= sectionTop - windowHeight && scrolled <= sectionTop + sectionHeight) {
          const progress = (scrolled - (sectionTop - windowHeight)) / (windowHeight + sectionHeight);
          setParallaxOffset(progress * 100); // Increased parallax movement
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll reviews
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % speakingReviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

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

  // Error handling for animation
  const handleAnimationError = useCallback(() => {
    console.warn('Marquee animation encountered an error, restarting...');
    setAnimationKey(prev => prev + 1);
  }, []);

  // Cleanup function for animation
  const cleanupAnimation = useCallback(() => {
    const marqueeElement = document.querySelector('.marquee-content');
    if (marqueeElement) {
      marqueeElement.removeEventListener('animationend', handleAnimationError);
    }
  }, [handleAnimationError]);

  // Setup animation event listeners
  useEffect(() => {
    const marqueeElement = document.querySelector('.marquee-content');
    if (marqueeElement) {
      marqueeElement.addEventListener('animationend', handleAnimationError);
    }

    return cleanupAnimation;
  }, [handleAnimationError, cleanupAnimation]);

  return (
    <div className="bg-gradient-to-b from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-full flex items-center justify-center overflow-hidden h-[40vh] xs:h-[50vh] sm:h-[50vh] md:h-[45vh] lg:h-[50vh] xl:h-[60vh] pt-24">
        {/* Hero Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 w-full h-[120%] transform -translate-y-[10%]"
            style={{
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0235.jpg?alt=media&token=a5612b0e-c68f-428f-8179-e9f4fdeee5ff)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              // transform: `translateY(${scrollY * 0.5}px)`,
              // willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F1E6DB]/30 via-[#E0B2F1]/20 to-[#FFE4EE]/10"></div>
        </div>
        
       
      </section>


       {/* Hero Content - Positioned above background */}
       <div className="relative z-10 text-center px-4 mt-[-8%] sm:mt-[-10%] md:mt-[-12%] lg:mt-[-15%] xl:mt-[-6%] max-w-[95vw] mx-auto">
          
          {/* Medium and Desktop Navigation - Side by side */}
          <div className="hidden sm:flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-8 2xl:space-x-10 3xl:space-x-8 max-w-full overflow-hidden">
            {/* Left Navigation */}
            <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-8">
              <li>
                <a href="/about" className="font-helvetica text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl text-black hover:text-suelyn-pink transition">ABOUT</a>
              </li>
              <li>
                <a href="/author" className="font-helvetica text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl text-black hover:text-suelyn-pink transition">RESOURCES</a>
              </li>
            </ul>
            <h1 className="font-charm text-3xl sm:text-5xl md:text-7xl lg:text-[80px] xl:text-[100px] 2xl:text-[140px] 3xl:text-[160px] font-bold text-black leading-none mb-2 md:mb-12">
              SueLyn
            </h1>
            {/* Right Navigation */}
            <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-8">
              <li>
                <a href="/blog" className="font-helvetica text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl text-black hover:text-suelyn-pink transition">BLOG</a>
              </li>
              <li>
                <a href="/workshops" className="font-helvetica text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl text-black hover:text-suelyn-pink transition">WORKSHOPS</a>
              </li>
            </ul>
          </div>
          
          {/* Mobile Title */}
          <div className="sm:hidden">
            <h1 className="font-charm text-4xl sm:text-5xl font-bold text-black leading-none mb-2">
              SueLyn
            </h1>
          </div>
          
          <h2 className="font-league-spartan text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl font-normal text-black sm:ml-[-2%] md:ml-[-3%] lg:ml-[-4%] xl:ml-[-6%] 2xl:ml-[-8%] 3xl:ml-[-22%] mt-[-4%]">
            Empowered Living
          </h2>
        </div>


      {/* Mission Statement Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE] mt-[5%]">
        <div className="container mx-auto text-center">
          <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-normal text-black/70 leading-tight max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2">
          Life may have knocked you down, but God has already made a way for you to rise again. This blog is a space to
          </p>
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-black leading-none">
              BREATHE, REFLECT
            </h3>
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-black leading-none mt-[1.5%]">
            RECLAIM YOUR IDENTITY
            </h3>
          </div>
        </div>
      </section>

      {/* Personal Section with Images */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE] overflow-hidden">
        <div className="container mx-auto">
          {/* Mobile Layout - Stacked */}
          <div className="block lg:hidden">
            {/* Mobile Title */}
            <div className="text-center mb-8">
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-black mb-4">
                RESTORED, REALIGNED, REBORN
              </h3>
            </div>
            
            {/* Mobile Images - Centered and stacked */}
            <div className="flex flex-col items-center space-y-6 mb-8">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-44-37.jpg?alt=media&token=daaa56dc-96aa-4e0d-af3f-dea87a39a8ff"
                alt="SueLyn lifestyle image"
                className="w-full max-w-[280px] h-auto object-cover rounded-lg"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-49-44.jpg?alt=media&token=b3f5ee65-37b7-4db0-a9a5-41145eb1e6ce"
                alt="SueLyn portrait"
                className="w-[180px] h-[220px] object-cover rounded-lg"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-36-43.jpg?alt=media&token=b3c94eb0-895f-47c7-862c-c81e1048d8e5"
                alt="SueLyn empowerment"
                className="w-full max-w-[280px] h-auto rounded-lg"
              />
            </div>
            
            {/* Mobile Text */}
            <div className="text-center px-2">
              <p className="font-helvetica text-base sm:text-lg text-black mb-4 font-light leading-6">
                You were never meant to stay broken. You were made to be Restored, Realigned, and Reborn.
              </p>
              <p className="font-helvetica text-sm sm:text-base text-black mb-6 font-light leading-6">
                Life may have knocked you down, but God has made a way for you to rise.
                This is your space to breathe, reflect, and rediscover your true identity.
                Here, you'll find strength for healing, purpose, and self-love.
                You're not just surviving—you're becoming whole and free.
              </p>
              <button 
              onClick={() => {
                window.location.href = '/blog';
              }}
              className="bg-white text-gray-600 px-6 py-3 rounded-lg border border-gray-500 hover:bg-gray-100 transition-colors text-base font-light font-inter flex items-center gap-2 mx-auto">
                
                JUMP RIGHT IN
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-4 h-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                
              </button>
            </div>
          </div>
          
          {/* Desktop Layout - Original 3-column grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left Images */}
            <div className="items-start w-full">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-44-37.jpg?alt=media&token=daaa56dc-96aa-4e0d-af3f-dea87a39a8ff"
                alt="SueLyn lifestyle image"
                className="w-full max-w-[400px] h-auto object-cover rounded-lg mb-4 mx-auto"
                style={{ 
                  marginTop: 'clamp(-30%, -45%, -60%)', 
                  marginBottom: 'clamp(-25%, -40%, -50%)', 
                  marginLeft: 'clamp(-8%, -15%, -18%)' 
                }}
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-49-44.jpg?alt=media&token=b3f5ee65-37b7-4db0-a9a5-41145eb1e6ce"
                alt="SueLyn portrait"
                className="w-[200px] h-[250px] object-cover rounded-lg mx-auto"
                style={{ 
                  marginTop: 'clamp(-60%, -100%, -130%)', 
                  marginBottom: 'clamp(-25%, -40%, -50%)', 
                  marginRight: 'clamp(-5%, -8%, -10%)' 
                }}
              />
            </div>

                         {/* Center Text */}
             <div className="flex flex-col items-center justify-center text-center lg:text-left px-2 lg:pr-8 xl:pr-12 2xl:pr-16">
              <p className="font-helvetica text-lg lg:text-xl xl:text-2xl text-black mb-3 md:mb-4 font-light leading-6 sm:leading-7 md:leading-8 mr-[-40%]">
                You were never meant to stay broken. You were made to be Restored, Realigned, and Reborn.
              </p>
              <p className="font-helvetica text-lg lg:text-xl xl:text-2xl text-black mb-6 md:mb-8 font-light leading-6 sm:leading-7 md:leading-8 mr-[-40%]">
                Life may have knocked you down, but God has made a way for you to rise.
                This is your space to breathe, reflect, and rediscover your true identity.
                Here, you’ll find strength for healing, purpose, and self-love.
                You’re not just surviving—you’re becoming whole and free.
              </p>
              <button
              onClick={() => {
                window.location.href = '/blog';
              }}
              className="bg-white text-gray-600 px-6 sm:px-8 py-2 md:py-3 rounded-lg border border-gray-500 hover:bg-gray-100 transition-colors text-base sm:text-lg md:text-xl xl:text-2xl font-light font-inter flex items-center gap-2 whitespace-nowrap mr-[-100%]">
                JUMP RIGHT IN
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-4 h-4 md:w-5 md:h-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right Image */}
            <div className="flex flex-col items-center w-full lg:pl-8 xl:pl-12 2xl:pl-16">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-36-43.jpg?alt=media&token=b3c94eb0-895f-47c7-862c-c81e1048d8e5"
                alt="SueLyn empowerment"
                className="w-full max-w-[320px] h-auto rounded-lg mx-auto"
                style={{ 
                  marginTop: 'clamp(15%, 30%, 40%)', 
                  marginBottom: 'clamp(-20%, -40%, -50%)', 
                  marginRight: 'clamp(-1%, -1%, -1%)' 
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Continuous Background Text Section */}
      <section className="py-1 w-full marquee-container pb-[2%] sm:pb-[3%] md:pb-[2%] lg:pb-[10%] mt-[8%] sm:mt-[5%] md:mt-[2.5%] relative overflow-hidden">
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


      {/* Gradient Curve Section - Top Part */}
      <section className="relative overflow-hidden w-full mt-[-5%] sm:mt-[-10%] md:mt-[2.5%] h-24 sm:h-32 md:h-48 mb-[-1%]">
        {/* Gradient curved background - full width arch */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F84988" />
                <stop offset="70%" stopColor="#F84988" />
                <stop offset="100%" stopColor="#F84988" />
              </linearGradient>
            </defs>
            {/* Mobile arch - 60% more curved */}
            <path className="block md:hidden" d="M0 100 L0 80 Q50 20 100 80 L100 100 Z" fill="url(#pinkGradient)"/>
            {/* Desktop arch - 60% more steep */}
            <path className="hidden md:block" d="M0 100 L0 80 Q50 -80 100 80 L100 100 Z" fill="url(#pinkGradient)"/>
          </svg>
        </div>
      </section>

      {/* About Section Content - Bottom Part */}
      <section className="relative py-12 md:py-24 bg-gradient-to-b from-[#F84988] to-[#FFAC24]">
        <div className="container mx-auto px-4">
          {/* Image positioned at top center of arch */}
          <div className="flex justify-center mb-8 md:mb-16 mt-[-15%] sm:mt-[-25%] md:mt-[-40%]">
            <div className="w-64 sm:w-72 md:w-120 lg:w-120 h-120 sm:h-120 md:h-120 object-cover rounded-t-[24px] sm:rounded-t-[28px] md:rounded-t-[32px] lg:rounded-t-[100px] xl:rounded-t-[200px] bg-transparent">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.15.39%20copy.jpeg?alt=media&token=25f9f13a-c9ba-4be8-ac2d-f553c22d688f"
              alt="Suzanna Griffiths"
              className="w-full h-full object-cover rounded-t-[24px] sm:rounded-t-[28px] md:rounded-t-[32px] lg:rounded-t-[100px] xl:rounded-t-[200px]"
            />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left side - About Text */}
            <div className="text-white pt-[2%] sm:pt-[3%] md:pt-[10%]">
              <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-4 md:mb-6 ml-[3%] sm:ml-[5%] md:ml-[10%]">
                I'M SUZANNA
              </h3>
              <div className="mb-8 md:mb-12">
              {/* Desktop Layout - Original flex rows */}
              <div className="hidden md:block">
                <div className="mb-1 flex flex-row">
                  <p className="font-playfair text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light italic text-white leading-tight max-w-2xl mt-[2%] mb-[1%] ml-[5%] sm:ml-[8%] md:ml-[10%]">
                    I'm Called to Help You, Heal, Rise, and Walk in Wholeness While You Enjoy a Fulfilling Relationship and Marriage
                  </p>
                </div>

              </div>
              </div>
              <p className="font-helvetica text-base sm:text-lg md:text-xl xl:text-2xl leading-relaxed">
                I’ve heard the lies that say “you’re too broken” or “you’re not enough.” But I also heard the still, small voice of God calling me to more - to healing, to wholeness, to purpose.
                <br />
                <br />
                Through heartbreak, setbacks, and deep soul work, I discovered that pain doesn’t disqualify you — it positions you.
              </p>
              <div className="flex justify-start mt-[3%] sm:mt-[4%] md:mt-[5%]">
          <button
          onClick={() => {
            window.location.href = '/about';
          }}
          className="bg-suelyn-cream text-gray-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-base sm:text-lg font-inter">
                More About Me
              </button>
          </div>
            </div>

            <div className="text-white hidden md:block">
              <p className="font-helvetica text-base sm:text-lg md:text-xl xl:text-2xl mb-6 leading-relaxed">
              And now, I’ve made it my mission to remind women like you: your story is not over.
              You can be restored. You can realign. You can be reborn - again and again.
              <br />
              <br />
                Your healing is holy. Your voice is needed. Your purpose is still alive.
              </p>
              <p className="font-helvetica text-base sm:text-lg md:text-xl xl:text-2xl leading-relaxed">
              As a certified leader, faith-fueled mentor, and bold storyteller, 
              I don’t just write — I walk this out every day. This blog is a reflection of my heart: unfiltered truths, 
              Spirit-led encouragement, and practical tools to help you rise. If you’ve ever felt stuck, overlooked, or 
              like your past disqualifies you - I’m here to tell you, God’s not done with you.
              </p>
            </div>

          </div>

        </div>
      </section>


            {/* Speaking Section with Parallax */}
      <section className="relative speaking-section overflow-hidden min-h-[80vh]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/1X1A0004.jpg?alt=media&token=24696ff6-d7d5-4598-b0df-b2828b939062')`,
            backgroundPosition: 'center 20%',
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
                  <div className="mb-6 md:mb-8 ">
                    {/* <img 
                      src={speakingReviews[currentReviewIndex].image}
                      alt={`${speakingReviews[currentReviewIndex].name} testimonial`}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full mx-auto object-cover transition-all duration-700 ease-in-out shadow-2xl border-4 border-white/20"
                    /> */}
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

      

      {/* Books Section */}
      <section className="py-12 md:py-24 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
      <section className="relative z-10 container mx-auto px-4 text-center text-black mt-[5%] md:mt-[-18%]">
      <h2 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[200px] font-bold mb-[0%]">SPEAKING</h2>
      </section>

      </section>

      <section className="py-8 md:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">

          {/* Book Listings */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-16">
            {/* First Book */}
            <div className="bg-white/50 rounded-lg p-4 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f4fb26806dcd9b009b5277358a543c628e3e9e97?width=484"
                  alt="Redeemed From Inner Scars book cover"
                  className="w-24 h-auto md:w-32 flex-shrink-0 mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 md:mb-4">
                    Redeemed From Inner Scars
                  </h3>
                  <p className="font-helvetica text-sm md:text-base lg:text-lg text-black mb-4 md:mb-6 leading-relaxed">
                  Through raw honesty and heartfelt reflection, Suzanna D. Griffiths invites readers on a journey of healing, faith, and self-discovery. Redeemed From Inner Scars is a powerful testament to overcoming trauma, reclaiming identity, and finding purpose beyond pain
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-6 md:mt-10">
                    <button onClick={() => window.location.href = 'https://www.amazon.com/REDEEMED-INNER-SCARS-SUZANNA-GRIFFITHS-ebook/dp/B0FKVLZ8F6/ref=sr_1_1?crid=3A45E7FQ4WKC9&dib=eyJ2IjoiMSJ9.rz77Qwi99DGWC_U9arw8VQ.3vaMyr9uVTOoQ-HUD5dDpqGrKfLpm64n2tiHOBb52RY&dib_tag=se&keywords=Redeemed+From+Inner+Scars&qid=1754248429&s=books&sprefix=redeemed+from+inner+scars%2Cstripbooks%2C111&sr=1-1'} className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-xs md:text-sm">
                      BUY NOW
                    </button>
                    <button onClick={() => window.location.href = '/author'} className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-xs md:text-sm">
                      VIEW MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Book */}
            <div className="bg-white/50 rounded-lg p-4 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/15038a927adb324e1f36cf74805e39703c06ec28?width=498"
                  alt="Build a Nation book cover"
                  className="w-24 h-auto md:w-32 flex-shrink-0 mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <h3 className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4">
                  Build a Nation, Not Two Empires: A Practical Marriage Guide
                  </h3>
                  <p className="font-helvetica text-sm md:text-base lg:text-lg text-black mb-6 leading-relaxed">
                  What if marriage wasn’t just about two people but about building an entire nation? In Build A Nation, Not Two Empires, Suzanna D. Griffiths invites readers...
                  </p>
                  <div className="flex gap-4">
                  <button
                  onClick={() => window.location.href = 'https://a.co/d/6D3Muou'}
                   className="bg-white text-black px-6 py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-sm">
                      BUY NOW
                    </button>
                    <button
                    onClick={() => window.location.href = '/author'}
                    className="bg-white text-black px-6 py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-sm">
                      VIEW MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
              <path d="M0 0 L0 30 Q50 80 100 30 L100 0 Z" fill="url(#flippedGradient)" />
            </svg>
          </div>

          <div className="relative z-10 container mx-auto px-4 mt-[-70px]">
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

            <div className="flex justify-center gap-1 overflow-x-auto">
              {footerPictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture}
                  alt={`Book ${index + 1}`}
                  className="w-40 sm:w-48 md:w-56 lg:w-60 h-60 sm:h-80 md:h-90 lg:h-100 object-cover flex-shrink-0 border-1 border-white rounded-lg"
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
