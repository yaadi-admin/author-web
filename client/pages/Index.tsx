import Header from '../components/Header';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { speakingReviews, Review } from '../data/reviews';

export const footerPictures = [
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-16-27-44%202.jpg?alt=media&token=4a2c7d9d-6807-41a2-baf7-bc87b5910f41",
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-18-00-54.jpg?alt=media&token=00f0e840-f8fa-408e-9277-d564ed5bb947",
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-36-43.jpg?alt=media&token=b3c94eb0-895f-47c7-862c-c81e1048d8e5",
  "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-49-44.jpg?alt=media&token=b3f5ee65-37b7-4db0-a9a5-41145eb1e6ce",
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
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-07-20-15-57-01.jpg?alt=media&token=d42bae63-e21c-4399-af29-15dfffa22460)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F1E6DB]/30 via-[#E0B2F1]/20 to-[#FFE4EE]/10"></div>
        </div>

      </section>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 mt-[-8%] sm:mt-[-10%] md:mt-[-12%] lg:mt-[-15%] xl:mt-[-2%]">
          
          {/* Medium and Desktop Navigation - Side by side */}
          <div className="hidden sm:flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 2xl:space-x-16 max-w-full">
            {/* Left Navigation */}
            <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-[100px]">
              <li>
                <a href="/about" className="font-helvetica text-md sm:text-sm md:text-lg lg:text-xl xl:text-4xl text-black hover:text-suelyn-pink transition">ABOUT</a>
              </li>
              <li>
                <a href="/author" className="font-helvetica text-md sm:text-sm md:text-lg lg:text-xl xl:text-4xl text-black hover:text-suelyn-pink transition">RESOURCES</a>
              </li>
            </ul>
            <h1 className="font-charm text-3xl sm:text-5xl md:text-7xl lg:text-[120px] xl:text-[180px] 2xl:text-[300px] font-bold text-black leading-none mb-2 md:mb-4 mt-[-5%]">
              SueLyn
            </h1>
            {/* Right Navigation */}
            <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-[100px]">
              <li>
                <a href="/blog" className="font-helvetica text-md sm:text-sm md:text-lg lg:text-xl xl:text-4xl text-black hover:text-suelyn-pink transition">BLOG</a>
              </li>
              <li>
                <a href="/workshops" className="font-helvetica text-md sm:text-sm md:text-lg lg:text-xl xl:text-4xl text-black hover:text-suelyn-pink transition">WORKSHOPS</a>
              </li>
            </ul>
          </div>
          
          {/* Mobile Title */}
          <div className="sm:hidden">
            <h1 className="font-charm text-4xl sm:text-5xl font-bold text-black leading-none mb-2">
              SueLyn
            </h1>
          </div>
          
          <h2 className="font-league-spartan text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-normal text-black sm:ml-[-3%] md:ml-[-5%] lg:ml-[-8%] xl:ml-[-16%] 2xl:ml-[-15%] sm:mt-[-1%] md:mt-[-2%] lg:mt-[-3%] xl:mt-[-2%] mt-2">
            Empowered Living
          </h2>
        </div>


      {/* Mission Statement Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE] mt-[5%]">
        <div className="container mx-auto text-center">
          <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal text-black/70 leading-tight max-w-5xl sm:max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2">
          Life may have knocked you down, but God has already made a way for you to rise again. This blog is a space to
          </p>
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-black leading-none">
              BREATHE, REFLECT
            </h3>
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-black leading-none mt-[1.5%]">
            RECLAIM YOUR IDENTITY
            </h3>
          </div>
        </div>
      </section>

      {/* Personal Section with Images */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE] overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left Images */}
            <div className="items-start w-full">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-44-37.jpg?alt=media&token=daaa56dc-96aa-4e0d-af3f-dea87a39a8ff"
                alt="SueLyn lifestyle image"
                className="w-full max-w-[400px] h-auto object-cover rounded-lg mb-4 mx-auto"
                style={{ marginTop: '-60%', marginBottom: '-50%', marginLeft: '-18%' }}
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-49-44.jpg?alt=media&token=b3f5ee65-37b7-4db0-a9a5-41145eb1e6ce"
                alt="SueLyn portrait"
                className="w-[200px] h-[250px] object-cover rounded-lg mx-auto"
                style={{ marginTop: '-130%', marginBottom: '-50%', marginRight: '-10%' }}
              />
            </div>

                         {/* Center Text */}
             <div
               className="flex flex-col items-center justify-center text-center lg:text-left px-2"
               style={{ marginRight: '-35%', paddingLeft: '20px', marginLeft: '10%' }}
             >
              <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black mb-3 md:mb-4 font-light leading-5 sm:leading-6 md:leading-7 lg:leading-8">
                You were never meant to stay broken. You were made to be Restored, Realigned, and Reborn.
              </p>
              <p className="font-helvetica text-2xl text-black mb-8 font-light leading-8">
                Life may have knocked you down, but God has made a way for you to rise.
                This is your space to breathe, reflect, and rediscover your true identity.
                Here, you’ll find strength for healing, purpose, and self-love.
                You’re not just surviving—you’re becoming whole and free.
              </p>
                                 <button
                 className="bg-white text-gray-600 px-8 py-1 md:py-2 rounded-lg border border-gray-500 hover:bg-gray-100 transition-colors text-lg sm:text-xl md:text-2xl font-light font-inter flex items-center gap-2 whitespace-nowrap"
                 style={{ marginRight: '-40%', marginTop: '10%' }}
               >
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
             <div className="flex flex-col items-center w-full" style={{ paddingLeft: '20px', marginLeft: '15%' }}>
                                <img
                   src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-17-36-43.jpg?alt=media&token=b3c94eb0-895f-47c7-862c-c81e1048d8e5"
                   alt="SueLyn empowerment"
                   className="w-full max-w-[320px] h-auto rounded-lg mx-auto"
                   style={{ marginTop: '40%', marginBottom: '-50%', marginRight: '-1%' }}
                 />
             </div>
          </div>
        </div>
      </section>

      {/* Continuous Background Text Section */}
      <section className="py-1 w-full marquee-container pb-[2%] sm:pb-[3%] md:pb-[2%] lg:pb-[10%] mt-[2.5%] relative overflow-hidden">
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
                  <span className="font-playfair text-4xl sm:text-4xl md:text-8xl lg:text-10xl xl:text-[180px] 2xl:text-[400px] font-bold text-black/30 leading-tight mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                    {marqueeText}
                  </span>
                </div>
              </div>
            </div>
            {/* Centered white text component */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white text-center drop-shadow-lg px-4">
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
      <section className="relative overflow-hidden w-full mt-[-20%] md:mt-[2.5%] h-32 md:h-48 mb-[-1%]">
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
          <div className="flex justify-center mb-8 md:mb-16 mt-[-40%]">
            <div className="w-80 pl-2 pr-2 pt-2  h-115 md:w-96 md:h-115 object-cover rounded-t-[32px] md:rounded-t-[200px] bg-transparent">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-16-27-44.jpg?alt=media&token=1f61da2d-744d-4caa-8554-e6bed7955288"
              alt="Suzanna Griffiths"
              className="w-64 h-115 md:w-96 md:h-115 object-cover rounded-t-[32px] md:rounded-t-[200px]"
            />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left side - About Text */}
            <div className="text-white pt-[5%] md:pt-[10%]">
              <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-normal mb-4 md:mb-6 ml-[5%] md:ml-[10%]">
                I'M SUZANNA
              </h3>
              <div className="mb-8 md:mb-12">
              {/* Desktop Layout - Original flex rows */}
              <div className="hidden md:block">
                <div className="mb-1 flex flex-row">
                  <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-4xl font-light italic text-white leading-tight max-w-2xl mt-[2%] mb-[1%] ml-[10%]">
                    I'm Called to Help You, Heal, Rise, and Walk in Wholeness While You Enjoy a Fulfilling Relationship and Marriage
                  </p>
                </div>

              </div>
              </div>
              <p className="font-helvetica text-lg md:text-2xl leading-relaxed">
                I’ve heard the lies that say “you’re too broken” or “you’re not enough.” But I also heard the still, small voice of God calling me to more - to healing, to wholeness, to purpose.
                <br />
                <br />
                Through heartbreak, setbacks, and deep soul work, I discovered that pain doesn’t disqualify you — it positions you.
              </p>
              <div className="flex justify-start mt-[5%]">
          <button className="bg-suelyn-cream text-gray-600 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-lg font-inter">
                More About Me
              </button>
          </div>
            </div>

            <div className="text-white hidden md:block">
              <p className="font-helvetica text-lg md:text-2xl mb-6 leading-relaxed">
              And now, I’ve made it my mission to remind women like you: your story is not over.
              You can be restored. You can realign. You can be reborn - again and again.
              <br />
              <br />
                Your healing is holy. Your voice is needed. Your purpose is still alive.
              </p>
              <p className="font-helvetica text-lg md:text-2xl leading-relaxed">
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
      <section className="relative speaking-section overflow-hidden min-h-[140vh]">
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
                  
                  <h3 className="font-playfair text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-6 md:mb-8 transition-all duration-700 ease-in-out">
                    "GROW, OVERCOME"
                  </h3>
                  
                  <p className="font-playfair text-lg md:text-2xl lg:text-3xl text-white font-medium leading-relaxed max-w-4xl mx-auto mb-6 md:mb-8 transition-all duration-700 ease-in-out">
                    {speakingReviews[currentReviewIndex].quote}
                  </p>
                  
                  <div className="font-playfair text-xl md:text-2xl text-white transition-all duration-700 ease-in-out">
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
      <section className="relative z-10 container mx-auto px-4 text-center text-black mt-[-5%] md:mt-[-22%]">
      <h2 className="font-playfair text-white text-6xl md:text-8xl lg:text-10xl xl:text-[280px] font-bold mb-[0%]">SPEAKING</h2>
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
                  <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 md:mb-4">
                    Redeemed From Inner Scars
                  </h3>
                  <p className="font-helvetica text-sm md:text-lg text-black mb-4 md:mb-6 leading-relaxed">
                  Through raw honesty and heartfelt reflection, Suzanna D. Griffiths invites readers on a journey of healing, faith, and self-discovery. Redeemed From Inner Scars is a powerful testament to overcoming trauma, reclaiming identity, and finding purpose beyond pain
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-6 md:mt-10">
                    <button onClick={() => window.location.href = '/author'} className="bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-xs md:text-sm">
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
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-4">
                  Build a Nation, Not Two Empires: A Practical Marriage Guide
                  </h3>
                  <p className="font-helvetica text-lg text-black mb-6 leading-relaxed">
                  What if marriage wasn’t just about two people but about building an entire nation? In Build A Nation, Not Two Empires, Suzanna D. Griffiths invites readers...
                  </p>
                  <div className="flex gap-4">
                  <button className="bg-white text-black px-6 py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-sm">
                      BUY NOW
                    </button>
                    <button className="bg-white text-black px-6 py-3 rounded border border-black hover:bg-gray-100 transition-colors font-inter text-sm">
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
            <div className="absolute inset-0 w-full h-screen">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="flippedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFAC24" />
                    <stop offset="50%" stopColor="#F84988" />
                    <stop offset="100%" stopColor="#F84988" />
                  </linearGradient>
                </defs>
                <path d="M0 0 L0 60 Q50 100 100 60 L100 0 Z" fill="url(#flippedGradient)"/>
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
      <footer className="border-t border-black/10 py-8 md:py-16 bg-gradient-to-b from-[#F84988] to-[#FFAC24]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
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
              <p className="font-jost text-xs md:text-sm font-bold text-black uppercase tracking-wider">
                © 2025 <span className="text-suelyn-purple">SueLyn Empowered Living</span>. All rights reserved
              </p>
            </div>

            {/* Design Credit */}
            <div className="text-center md:text-right">
              <p className="font-jost text-xs md:text-sm font-bold text-black uppercase tracking-wider">
                Designed by <span className="text-suelyn-purple">Narro: Web Services</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
