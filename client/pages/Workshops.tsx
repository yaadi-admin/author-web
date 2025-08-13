import Header from '../components/Header';
import { useState, useEffect, useCallback } from 'react';
import { speakingReviews, Review } from '../data/reviews';
import { footerPictures } from './Index';

// Workshop data object
const workshopData = [
  {
    id: 1,
    date: "October 25th, 2025",
    title: "Redeemed For a Purpose Workshop & Book Launch",
    description: "Join us for an inspiring workshop and book launch as we explore the journey of healing, purpose, and transformation. This event is a must-attend for anyone looking to find their place in the world and live a life of purpose.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-12-22-41-35.jpg?alt=media&token=26d01e57-7952-4fa4-a118-6d4d30056501",
    isActive: true,
    url: "https://caribtix.vbotickets.com/event/Redeemed_For_A_Purpose/167873"
  },
  {
    id: 2,
    date: "November 15th, 2025",
    title: "This Event is Coming Soon",
    description: "An exciting new workshop focused on building resilience and overcoming life's challenges. Details coming soon - stay tuned for more information.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/coming-soon-letter-hanging-door-600nw-2497993761.webp?alt=media&token=ab00d3a3-6e03-4828-9552-14cb58f298aa",
    isActive: false,
    comingSoon: true,
    url: "#"
  },
  {
    id: 3,
    date: "December 5th, 2025",
    title: "Another Amazing Workshop",
    description: "A special end-of-year workshop designed to help you reflect, reset, and prepare for the new year ahead. Join us for this powerful session of transformation.",
    image: "https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/coming-soon-letter-hanging-door-600nw-2497993761.webp?alt=media&token=ab00d3a3-6e03-4828-9552-14cb58f298aa",
    isActive: false,
    comingSoon: true,
    url: "#"
  }
];

export default function Workshops() {
  const [scrollY, setScrollY] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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
      <section className="relative min-h-[40vh] sm:h-[50vh] md:h-[45vh] lg:h-[50vh] xl:h-[60vh] flex items-center justify-center overflow-hidden pt-24">
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
      <div className="relative z-10 text-center px-4 mt-[-15%] sm:mt-[-12%] md:mt-[-15%] lg:mt-[-20%] xl:mt-[-14%]">
        <div className="relative z-10 text-center px-4 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <h1 className="font-charm text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[150px] 2xl:text-[225px] font-bold text-white leading-none mb-2 md:mb-4">
                Engagements
              </h1>
            </div>
            <h2 className="font-league-spartan text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl pt-2 font-normal text-black sm:ml-[-10%] md:ml-[-20%] lg:ml-[-30%] xl:ml-[-40%] 2xl:ml-[42%] sm:mt-[-1%] md:mt-[-2%] lg:mt-[-3%] xl:mt-[-4%] 2xl:mt-[-5%]">
              Transformative Sessions
            </h2>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-t from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] h-[10vh] sm:h-[15vh] md:h-[20vh] mt-[-10%] sm:mt-[-15%] md:mt-[-20%] pb-[10%] sm:pb-[15%] md:pb-[20%]"></section>

      {/* Workshops Listings Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-[#FFE4EE]">
        <div className="container mx-auto">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-black text-center mb-8 sm:mb-12 md:mb-16">
            Workshops
          </h2>
          
          <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
            {workshopData.map((workshop, index) => (
              <div 
                key={workshop.id}
                className={`relative flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-stretch ${
                  index === 0 ? 'opacity-100' : index === 1 ? 'opacity-50' : 'opacity-30'
                } transition-opacity duration-500`}
              >
                <div className="flex-shrink-0 lg:w-80">
                  <img 
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover rounded-lg border-2 border-[#F84988] min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-[#F84988] font-helvetica text-sm sm:text-base md:text-lg font-semibold mb-2">
                    {workshop.date}
                  </div>
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {workshop.title}
                  </h3>
                  <p className="font-helvetica text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    {workshop.description}
                  </p>
                  {!workshop.comingSoon && <button onClick={() => window.open(workshop.url, '_blank')} className="bg-[#F84988] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#e03a7a] transition-colors font-helvetica text-xs sm:text-sm flex items-center gap-2 self-start">
                    Buy Tickets
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>}
                </div>
                
                {/* Coming Soon Badge */}
                {workshop.comingSoon && (
                  <div className="absolute top-0 right-0 bg-[#F84988] text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full font-helvetica text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shadow-lg z-10">
                    <span>★</span>
                    <span className="hidden sm:inline">COMING SOON</span>
                    <span className="sm:hidden">SOON</span>
                    <span>★</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empowered Living Quote Section */}
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

      {/* Book Suzanna Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-b from-[#F1E6DB] to-[#FFAC24] relative overflow-hidden">
        
        <div className="relative z-10 container mx-auto">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-black text-center mb-8 sm:mb-12 md:mb-16">
            Book Suzanna
          </h2>

          <p className="font-playfair text-center sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black font-medium leading-relaxed max-w-4xl mx-auto mb-6 md:mb-8 transition-all duration-700 ease-in-out">
          Let’s Connect!
          If you have a question, need support, or just want to share what’s on your heart, reach out. I’m here and excited to hear from you.
          </p>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Left Floating Image */}
            {/* <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.15.11.jpeg?alt=media&token=ffa533c9-f9a9-4db1-9447-e412759ad613"
                alt="Suzanna portrait"
                className="w-32 h-60 md:w-40 md:h-60 lg:w-48 lg:h-60 object-cover border-4 border-white shadow-lg"
              />
            </div> */}
            
            {/* Right Floating Image */}
            {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.19.31.jpeg?alt=media&token=cab0c754-cdf3-429d-986c-d2d42217bd3a"
                alt="Suzanna on couch"
                className="w-28 h-36 md:w-36 md:h-48 lg:w-44 lg:h-60 object-cover rounded-lg shadow-lg"
              />
            </div> */}
            
            {/* Main Form */}
            <div className="relative z-30 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 max-w-4xl mx-auto mt-[10%] sm:mt-[15%] md:mt-[20%] lg:mt-[0%]">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                      First Name:*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="FIRST NAME"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F84988] focus:border-transparent text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                      Last Name:*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="LAST NAME"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F84988] focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Your Email:*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F84988] focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                    What's up? Tell us how we can help:*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F84988] focus:border-transparent text-gray-900 resize-none"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="PHONE"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F84988] focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      required
                      className="mt-1 h-4 w-4 text-[#F84988] focus:ring-[#F84988] border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-black">
                      I affirm that I've reviewed and accepted SueLyn Empowered Living Terms and Conditions and Privacy Policy.*
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="communications"
                      name="communications"
                      className="mt-1 h-4 w-4 text-[#F84988] focus:ring-[#F84988] border-gray-300 rounded"
                    />
                    <label htmlFor="communications" className="text-sm text-black">
                      By checking this box, I agree to receive communications, including email, calls, and text messages from SueLyn Empowered Living regarding announcements and company updates. Reply to any messages with STOP at any time to stop receiving messages and request for help by replying HELP. The frequency of messages varies. Message and data rates may apply.
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-black text-white px-8 py-4 rounded-lg hover:bg-[#e03a7a] transition-colors font-helvetica text-lg flex items-center gap-2 shadow-lg w-full md:w-auto justify-center"
                  >
                    SEND
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden w-full bg-gradient-to-b from-[#FFAC24] to-[#FFAC24] mt-[-10%]">
        <div className="relative z-10 container mx-auto px-4 text-center pt-[6%] sm:pt-[8%] md:pt-[10%] lg:pt-[6%]">
          <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-normal text-black leading-none mb-8 sm:mb-10 md:mb-12">
          JOIN THE EMPOWERED SPACE
          </h3>
          
          {/* Signup form */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-black/70 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-black text-sm sm:text-base md:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-black/70 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-black text-sm sm:text-base md:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#E6951A] transition-colors font-inter text-sm sm:text-base md:text-lg mt-4 sm:mt-6">
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
                <path d="M0 0 L0 40 Q50 80 100 40 L100 0 Z" fill="url(#flippedGradient)"/>
              </svg>
            </div>

            <div className="relative z-10 container mx-auto px-4 mt-[-50px]">
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
      <footer className="border-t border-black/10 py-8 sm:py-12 md:py-16 bg-gradient-to-b from-[#F84988] to-[#FFAC24]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8">
            {/* Social Links */}
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                    <path d="M22.23 5.924a8.212 8.212 0 0 1-2.357.646 4.115 4.115 0 0 0 1.804-2.27 8.221 8.221 0 0 1-2.606.996A4.103 4.103 0 0 0 16.616 3c-2.27 0-4.103 1.834-4.103 4.103 0 .322.036.635.106.935a11.645 11.645 0 0 1-8.457-4.287 4.096 4.096 0 0 0-.556 2.063c0 1.424.724 2.679 1.825 3.415a4.066 4.066 0 0 1-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.109 4.109 0 0 1-1.853.07c.522 1.63 2.038 2.816 3.833 2.85A8.236 8.236 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22.23 5.924z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="font-jost text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
                © 2023 <span className="text-[#8B5CF6]">SUZANNA GRIFFITS</span>. ALL RIGHTS RESERVED
              </p>
            </div>

            {/* Design Credit */}
            <div className="text-center md:text-right">
              <p className="font-jost text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
                POWERED BY: <span className="text-[#8B5CF6]">EMPOWERED LIVING</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
