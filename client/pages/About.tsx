import Header from '../components/Header';
import { useState, useEffect } from 'react';

export default function About() {
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE]">
      <Header whiteText={true} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
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
              <h1 className="font-charm text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[180px] 2xl:text-[300px] font-bold text-white leading-none mb-2 md:mb-4">
                About
              </h1>
            </div>
            <h2 className="font-league-spartan text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-normal text-white sm:ml-[-10%] md:ml-[-20%] lg:ml-[-30%] xl:ml-[-40%] 2xl:ml-[-60%] sm:mt-[-1%] md:mt-[-2%] lg:mt-[-3%] xl:mt-[-4%] 2xl:mt-[-6%]">
              Suzanna Griffiths
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-t from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] h-[10vh] sm:h-[15vh] md:h-[20vh] mt-[-10%] sm:mt-[-15%] md:mt-[-20%] pb-[10%] sm:pb-[15%] md:pb-[20%]"></section>

      {/* Mission Statement Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto text-center">

          {/* <div className="mb-12">
            <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none">
              GROW, OVERCOME
            </h3>
            <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-black leading-tight max-w-2xl mt-[2%] mb-[-5%] ml-[-3%]">
              and get
            </p>
            <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none ml-4 sm:ml-8 md:ml-24 lg:ml-48">
              BACK UP
            </h3>
          </div> */}
        </div>
      </section>

      {/* Personal Section with Images */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left side - Images */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f23911c57b35c55b16a3da69d3df3ad19cbde001?width=1240"
                  alt="Suzanna Griffiths"
                  className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3bcb43c2d08f89a125bec53b49f9f6707b3f05df?width=941"
                  alt="Suzanna portrait"
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-50 lg:h-50 object-cover rounded-lg mt-[-15%] sm:mt-[-20%] md:mt-[-25%] lg:mt-[-30%] ml-[-8%] sm:ml-[-10%] md:ml-[-12%] lg:ml-[-15%]"
                />
              </div>

              {/* We Serve Section */}
              <div>
                <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-black mb-4 mt-[5%] sm:mt-[8%] md:mt-[10%]">
                  We Serve
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                    <p className="font-montserrat text-sm sm:text-base md:text-lg text-black leading-relaxed">
                      <span className="">Christian couples & married women</span> seeking deeper connection and spiritual growth
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                    <p className="font-montserrat text-sm sm:text-base md:text-lg text-black leading-relaxed">
                      <span className="">Men seeking emotional and spiritual healing</span> to break free from past wounds
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                    <p className="font-montserrat text-sm sm:text-base md:text-lg text-black leading-relaxed">
                      <span className="">Pastors, counselors, and psychologists</span> looking for biblical wisdom in their practice
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                    <p className="font-montserrat text-sm sm:text-base md:text-lg text-black leading-relaxed">
                      <span className="">Anyone seeking clarity, restoration, and biblical truth</span> in their journey
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button className="group bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-inter text-xs sm:text-sm font-semibold flex items-center space-x-2">
                  <span>Explore My Book</span>
                </button>
                <button className="group bg-suelyn-cream text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-black/20 hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1 font-inter text-xs sm:text-sm font-semibold flex items-center space-x-2">
                  <span>Book Suzanna to Speak</span>
                </button>
              </div>

            </div>

            {/* Right side - Text and Mission Content */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              {/* Original personal text */}
              <div>
                <p className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal text-black/70 leading-tight max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8">
                  Why SueLyn Empowered Living Was Born
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black mb-3 sm:mb-4 font-normal leading-6 sm:leading-7 md:leading-8">
                  SueLyn Empowered Living was born from real-life conversations — late-night talks, quiet tears, and breakthrough moments. Suzanna's transparency brings healing, hope, and connection. She doesn't hide her scars; she shows her healing.
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black mb-6 sm:mb-8 font-normal leading-6 sm:leading-7 md:leading-8">
                  This is more than a platform - it's a <b>movement</b> of truth-telling, healing, and purpose.
                </p>
                <button className="group bg-suelyn-cream text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-black/20 hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1 font-inter text-xs sm:text-sm font-semibold flex items-center space-x-2">
                  LEARN MORE
                </button>
              </div>

              {/* Mission Statement */}
              <div className="pt-6 sm:pt-8 border-t border-black/10">
                <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-black leading-none mb-4 sm:mb-6">
                  OUR MISSION
                </h2>
                <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-black/80 leading-tight italic mb-6 sm:mb-8">
                  "SueLyn Empowered Living exists to help individuals overcome shame, doubt, and fear by rediscovering their God-given greatness through biblical truth and personal testimony."
                </p>
              </div>
            </div>
          </div>

          {/* Side image */}
          <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center lg:justify-end">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/cb8827ce947c674e0b468cb798d4e8d61410fc29?width=383"
              alt="Suzanna empowerment"
              className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 h-auto rounded-lg"
            />
          </div>
        </div>
      </section>



      {/* Continuous Background Text Section */}
      <section className="py-8 sm:py-12 md:py-16 w-full marquee-container bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="w-full overflow-hidden">
          <div className="relative w-full h-[80px] sm:h-[120px] md:h-[150px] lg:h-[180px] xl:h-[240px]">
            <div
              className="absolute top-1/2 left-0 w-full"
              style={{ transform: "translateY(-50%)" }}
            >
              <div className="w-full overflow-hidden">
                <div
                  className="marquee-content whitespace-nowrap opacity-30 animate-continuous-marquee"
                  style={{
                    animationDuration: '30s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                  }}
                >
                  <span className="font-playfair text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[120px] 2xl:text-[150px] font-bold text-black leading-tight mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                    {"Grow Overcome Back Up ".repeat(20)}
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
            
            .marquee-content {
              will-change: transform;
              backface-visibility: hidden;
              transform: translateZ(0);
            }
          `}
        </style>
      </section>

      {/* Official Bio Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl font-normal text-black leading-none mb-4 sm:mb-6 md:mb-8">
              OFFICIAL BIO
            </h2>
            <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-normal text-black/90 leading-tight max-w-4xl mx-auto">
              About Suzanna Griffiths
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left side - Long Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7cf07593ce043b7a08e4f1ca3e188ae94e312d73?width=3838"
                alt="Suzanna Griffiths"
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] object-cover rounded-lg"
              />
            </div>

            {/* Right side - Text Content */}
            <div className="order-1 lg:order-2 text-black">
              {/* About Suzanna Text Component */}
              <div className="mb-8 sm:mb-10 md:mb-12">
                {/* Desktop Layout - Complex flex rows */}
                <div className="hidden md:block">
                  <div className="mb-1 flex flex-row">
                    <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-4xl font-light italic text-black leading-tight max-w-2xl mt-[2%] mb-[1%]">
                      With over
                    </p>
                    <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl font-normal text-black leading-none ml-[1%]">
                      20 Years
                    </h3>
                  </div>

                  <div className="mb-1 flex flex-row">
                    <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl font-normal text-black leading-none">
                      Experience
                    </h3>
                    <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-4xl font-light italic text-black leading-tight max-w-2xl mt-[0%] mb-[0%] ml-[2%]">
                      in Leadership
                    </p>
                  </div>
                </div>

                {/* Mobile Layout - Simple stacked */}
                <div className="md:hidden text-center">
                  <p className="font-playfair text-lg sm:text-xl font-light italic text-black leading-tight mb-2">
                    With over
                  </p>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-normal text-black leading-none mb-2">
                    20 Years
                  </h3>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-normal text-black leading-none mb-2">
                    Experience
                  </h3>
                  <p className="font-playfair text-lg sm:text-xl font-light italic text-black leading-tight">
                    in Leadership
                  </p>
                </div>
              </div>

              {/* Bio Text */}
              <div className="space-y-4 sm:space-y-6">
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  From the deep hills of rural Portland, Jamaica, hails a powerhouse of purpose, passion, and transformation. Suzanna Griffiths has suffered many forms of abuse, but with a resolute mind has cancelled evil words, healed emotionally, reidentified herself in Christ, and used all the courage inside her to soar past naysayers' expectations.
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  She has a belief that greatness is on the inside of all of us and has taken that passion into her corporate role where she has over 20 years of experience as an Environmental, Occupational Safety and Health (EOSH) leader.
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Suzanna predominantly uses coaching, mentorship and training to drive behavioural change, which is critical for the success of a positive workplace EOSH culture.
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Suzanna believes that humans as a whole are a composite being of physical, emotional, spiritual, and social elements that must align with the Word of God to ensure a fruitful, empowered, and purposeful life.
                </p>
                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Suzanna studied Psychology, Sociology and Human Sexuality as she desired to understand human behaviours. She holds a BSc in Environmental Health and a plethora of post graduate international certifications.
                </p>

                <p className="font-montserrat text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  In order to walk in her calling of helping others to heal, realign and refocus their lives she enrolled for a MA in Counselling Psychology, however she has paused to be certified in Family Counselling, Marriage and Couples Therapy, Professional Emotion Coach and as an Empowerment Specialist.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Fun Stuff Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal text-black leading-none mb-4 sm:mb-6 md:mb-8">
              THE FUN STUFF
            </h2>
            <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-normal text-black/70 leading-tight max-w-4xl mx-auto">
              "Suzanna Says…Everything that has happened to us, the Lord would have loaded with purpose - to shape and prepare us for a greater calling."
            </p>
          </div>

          {/* Main content grid - Cards and Images */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
            {/* Left side - Instagram-style Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Hidden Talent Card */}
              <div className="bg-gradient-to-br from-[#FFE4EE] to-[#F1E6DB] rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full">
                {/* Card Header */}
                <div className="p-2 sm:p-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#F84988] to-[#FFAC24] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-inter text-xs font-semibold text-gray-900">Hidden Talent</h4>
                      <p className="font-inter text-xs text-gray-500">Suzanna Griffiths</p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-4">
                  <div className="bg-gradient-to-br from-[#FFE4EE] to-[#F1E6DB] rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#F84988] to-[#FFAC24] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-playfair text-xs sm:text-sm font-semibold text-gray-900">Sangria Master</h5>
                        <p className="font-montserrat text-xs text-gray-600">Crafting the perfect blend</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-montserrat text-xs sm:text-sm text-black leading-relaxed">
                    She makes a mean sangria that brings people together and creates unforgettable moments of joy and connection.
                  </p>

                  {/* Card Footer */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#F84988]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-inter text-xs text-gray-500">Talent</span>
                        </div>
                      </div>
                      <span className="font-inter text-xs text-gray-400">Just now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fun Fact Card */}
              <div className="bg-gradient-to-br from-[#FFE4EE] to-[#F1E6DB] rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full">
                {/* Card Header */}
                <div className="p-2 sm:p-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FFAC24] to-[#F84988] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-inter text-xs font-semibold text-gray-900">Fun Fact</h4>
                      <p className="font-inter text-xs text-black">Suzanna Griffiths</p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-4">
                  <div className="bg-gradient-to-br from-[#F1E6DB] to-[#FFE4EE] rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FFAC24] to-[#F84988] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-playfair text-xs sm:text-sm font-semibold text-gray-900">Fiercely Loyal</h5>
                        <p className="font-montserrat text-xs text-black">Protector of souls</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-montserrat text-xs sm:text-sm text-black leading-relaxed">
                    Once you're her people, she protects your soul and spirit with unwavering dedication and fierce loyalty.
                  </p>

                  {/* Card Footer */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#FFAC24]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-inter text-xs text-black">Loyalty</span>
                        </div>
                      </div>
                      <span className="font-inter text-xs text-black">Just now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Fun Fact Cards - Simplified for mobile */}
              <div className="bg-gradient-to-br from-[#FFE4EE] to-[#F1E6DB] rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full">
                {/* Card Header */}
                <div className="p-2 sm:p-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FFAC24] to-[#F84988] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-inter text-xs font-semibold text-gray-900">Fun Fact</h4>
                      <p className="font-inter text-xs text-black">Suzanna Griffiths</p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-4">
                  <div className="bg-gradient-to-br from-[#F1E6DB] to-[#FFE4EE] rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FFAC24] to-[#F84988] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-playfair text-xs sm:text-sm font-semibold text-black">Fiercely Loyal</h5>
                        <p className="font-montserrat text-xs text-black">Protector of souls</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-montserrat text-xs sm:text-sm text-black leading-relaxed">
                    Once you're her people, she protects your soul and spirit with unwavering dedication and fierce loyalty.
                  </p>

                  {/* Card Footer */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#FFAC24]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-inter text-xs text-black">Loyalty</span>
                        </div>
                      </div>
                      <span className="font-inter text-xs text-black">Just now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fourth Fun Fact Card */}
              <div className="bg-gradient-to-br from-[#FFE4EE] to-[#F1E6DB] rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full">
                {/* Card Header */}
                <div className="p-2 sm:p-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FFAC24] to-[#F84988] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-inter text-xs font-semibold text-gray-900">Fun Fact</h4>
                      <p className="font-inter text-xs text-black">Suzanna Griffiths</p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-4">
                  <div className="bg-gradient-to-br from-[#F1E6DB] to-[#FFE4EE] rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FFAC24] to-[#F84988] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-playfair text-xs sm:text-sm font-semibold text-black">Fiercely Loyal</h5>
                        <p className="font-montserrat text-xs text-black">Protector of souls</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-montserrat text-xs sm:text-sm text-black leading-relaxed">
                    Once you're her people, she protects your soul and spirit with unwavering dedication and fierce loyalty.
                  </p>

                  {/* Card Footer */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#FFAC24]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-inter text-xs text-black">Loyalty</span>
                        </div>
                      </div>
                      <span className="font-inter text-xs text-black">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Buttons and Image gallery */}
            <div className="space-y-6 sm:space-y-8">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="bg-suelyn-cream text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors font-inter text-xs sm:text-sm">
                  Join Community
                </button>
                <button className="bg-suelyn-cream text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors font-inter text-xs sm:text-sm">
                  Learn More
                  <span className="ml-2 sm:ml-4">→</span>
                </button>
              </div>

              {/* Image gallery */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-2 sm:space-y-4">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/3bcb43c2d08f89a125bec53b49f9f6707b3f05df?width=941"
                    alt="Suzanna"
                    className="w-full h-auto rounded-lg"
                  />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/cb8827ce947c674e0b468cb798d4e8d61410fc29?width=383"
                    alt="Suzanna"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-8">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/40d6bfce6b71d50c24fdb15e3287730608df80de?width=383"
                    alt="Suzanna"
                    className="w-full h-auto rounded-lg"
                  />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/40d6bfce6b71d50c24fdb15e3287730608df80de?width=383"
                    alt="Suzanna"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join The Empowered Space Section with Flipped Arch */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 mt-[-5%] sm:mt-[-7%]">
        <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden w-full">
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
              <path d="M0 0 L0 40 Q50 100 100 40 L100 0 Z" fill="url(#flippedGradient)" />
            </svg>
          </div>

          <div className="relative z-10 container mx-auto px-4 mt-[-50px] sm:mt-[-75px] md:mt-[-100px]">
            <div className="text-center mb-[3%] sm:mb-[5%]">
              <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-normal text-white leading-none mt-[3%] sm:mt-[5%]">
                JOIN THE EMPOWERED
              </h3>
              <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-4xl font-light italic text-white leading-tight max-w-2xl mt-[0%] mb-[0%] ml-[10%] sm:ml-[15%] md:ml-[20%]">
                SPACE
              </p>
              <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-normal text-white leading-tight max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8 mt-3 sm:mt-4 md:mt-5">
                "Your healing is holy. Your voice is needed. Your purpose is still alive."
              </p>
            </div>

            {/* Signup form */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
              <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-suelyn-cream text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-colors font-inter text-base sm:text-lg whitespace-nowrap">
                  JOIN THE FUN
                </button>
              </div>
            </div>

            {/* Image gallery row */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <img
                  key={index}
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1179b95de6107e5b5b214d0f2ee7366adaac0a3d?width=586"
                  alt={`Gallery ${index + 1}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover flex-shrink-0 border-2 border-white rounded-lg"
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
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.23 5.924a8.212 8.212 0 0 1-2.357.646 4.115 4.115 0 0 0 1.804-2.27 8.221 8.221 0 0 1-2.606.996A4.103 4.103 0 0 0 16.616 3c-2.27 0-4.103 1.834-4.103 4.103 0 .322.036.635.106.935a11.645 11.645 0 0 1-8.457-4.287 4.096 4.096 0 0 0-.556 2.063c0 1.424.724 2.679 1.825 3.415a4.066 4.066 0 0 1-1.859-.514v.052c0 1.988 1.414 3.647 3.292 4.023a4.109 4.109 0 0 1-1.853.07c.522 1.63 2.038 2.816 3.833 2.85A8.236 8.236 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.35 8.35 0 0 0 22.23 5.924z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="text-black hover:text-suelyn-pink transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="font-jost text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
                © 2025 <span className="text-suelyn-purple">SueLyn Empowered Living</span>. All rights reserved
              </p>
            </div>

            {/* Design Credit */}
            <div className="text-center md:text-right">
              <p className="font-jost text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
                Designed by <span className="text-suelyn-purple">Narro: Web Services</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
