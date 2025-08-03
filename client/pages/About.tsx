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
                About
              </h1>
            </div>
            <h2 className="font-league-spartan text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white ml-[-60%] mt-[-10%]">
              Suzanna Griffiths
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-t from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] h-[20vh] mt-[-20%] pb-[20%]"></section>

      {/* Mission Statement Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto text-center">
          <p className="font-playfair text-lg sm:text-xl md:text-3xl lg:text-4xl font-normal text-black/70 leading-tight max-w-4xl mx-auto mb-8">
            A bold storyteller, certified leader, and faith-fueled mentor who has turned trials into testimonies
          </p>
          <div className="mb-12">
            <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none">
              GROW, OVERCOME
            </h3>
            <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-black leading-tight max-w-2xl mt-[2%] mb-[-5%] ml-[-3%]">
              and get
            </p>
            <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none ml-4 sm:ml-8 md:ml-24 lg:ml-48">
              BACK UP
            </h3>
          </div>
        </div>
      </section>

      {/* Personal Section with Images */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f23911c57b35c55b16a3da69d3df3ad19cbde001?width=1240"
                  alt="Suzanna Griffiths"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3bcb43c2d08f89a125bec53b49f9f6707b3f05df?width=941"
                  alt="Suzanna portrait"
                  className="w-50 h-50 object-cover rounded-lg mt-[-30%] ml-[-15%]"
                />
              </div>
            </div>

            {/* Right side - Text */}
            <div className="mt-[-20%]">
              <p className="font-montserrat text-2xl text-black mb-4 font-normal leading-8">
                Suzanna D. Griffiths is the kind of woman who lights up a room, not just with her smile, but with purpose, passion, and power.
              </p>
              <p className="font-montserrat text-2xl text-black mb-8 font-normal leading-8">
                A bold storyteller, certified leader, and faith-fueled mentor, Suzanna has turned her trials into testimonies and her healing journey into a mission to uplift others. Her life is proof that brokenness can be transformed into beauty, and purpose can be found even in the deepest pain.
              </p>
              <button className="bg-suelyn-cream text-gray-600 px-6 py-3 rounded border border-gray-300 hover:bg-gray-100 transition-colors text-lg font-inter">
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Side image */}
          <div className="mt-[-5%] flex justify-end">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/cb8827ce947c674e0b468cb798d4e8d61410fc29?width=383"
              alt="Suzanna empowerment"
              className="w-96 h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Continuous Background Text Section */}
      <section className="py-16 w-full marquee-container bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="w-full overflow-hidden">
          <div className="relative w-full h-[180px] md:h-[240px]">
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
                  <span className="font-playfair text-8xl md:text-[150px] font-bold text-black leading-tight mx-8">
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
      <section className="py-24 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-9xl xl:text-9xl font-normal text-black leading-none mb-8">
              OFFICIAL BIO
            </h2>
            <p className="font-playfair text-lg sm:text-xl md:text-3xl lg:text-4xl font-normal text-black/90 leading-tight max-w-4xl mx-auto">
              About Suzanna Griffiths
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Long Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7cf07593ce043b7a08e4f1ca3e188ae94e312d73?width=3838"
                alt="Suzanna Griffiths"
                className="w-full h-[900px] object-cover rounded-lg"
                // Curve at the top removed: no extra styling or SVG
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7cf07593ce043b7a08e4f1ca3e188ae94e312d73?width=3838"
                alt="Suzanna Griffiths"
                className="w-full h-[400px] object-cover rounded-lg"
                // Curve at the top removed: no extra styling or SVG
              />
            </div>

            {/* Right side - Text Content */}
            <div className="order-1 lg:order-2 text-black">
              {/* About Suzanna Text Component */}
              <div className="mb-12">
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

              {/* Bio Text */}
              <div className="space-y-6">
                <p className="font-montserrat text-lg md:text-2xl leading-relaxed">
                From the deep hills of rural Portland, Jamaica, hails a powerhouse of purpose, passion, and transformation. Suzanna Griffiths has suffered many forms of abuse, but with a resolute mind has cancelled evil words, healed emotionally, reidentified herself in Christ, and used all the courage inside her to soar past naysayers' expectations.
                </p>
                <p className="font-montserrat text-lg md:text-2xl leading-relaxed">
                She has a belief that greatness is on the inside of all of us and has taken that passion into her corporate role where she has over 20 years of experience as an Environmental, Occupational Safety and Health (EOSH) leader. 
                </p>
                <p className="font-montserrat text-lg md:text-2xl leading-relaxed">
                Suzanna predominantly uses coaching, mentorship and training to drive behavioural change, which is critical for the success of a positive workplace EOSH culture.
                </p>
                <p className="font-montserrat text-lg md:text-2xl leading-relaxed">
                Suzanna believes that humans as a whole are a composite being of physical, emotional, spiritual, and social elements that must align with the Word of God to ensure a fruitful, empowered, and purposeful life.
                </p>
                <p className="font-montserrat text-lg md:text-2xl leading-relaxed">
                Suzanna studied Psychology, Sociology and Human Sexuality as she desired to understand human behaviours. She holds a BSc in Environmental Health and a plethora of post graduate international certifications.
                </p>

                <p className="font-montserrat text-lg md:text-2xl leading-relaxed">
                In order to walk in her calling of helping others to heal, realign and refocus their lives she enrolled for a MA in Counselling Psychology, however she has paused to be certified in Family Counselling, Marriage and Couples Therapy, Professional Emotion Coach and as an Empowerment Specialist.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Fun Stuff Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-black leading-none mb-8">
              THE FUN STUFF
            </h2>
            <p className="font-playfair text-lg sm:text-xl md:text-3xl lg:text-4xl font-normal text-black/70 leading-tight max-w-4xl mx-auto">
              "This is what it looks like to live it out, every day."
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <div className="space-y-6">
              <p className="font-montserrat text-2xl text-black leading-relaxed">
                Led by Suzanna Griffiths, this space is designed to help men and women heal from emotional wounds, align with God's Word, and walk in their divine purpose - boldly and whole.
              </p>
              <p className="font-montserrat text-2xl text-black leading-relaxed">
                Her life is proof that brokenness can be transformed into beauty, and purpose can be found even in the deepest pain.
              </p>
              <p className="font-montserrat text-2xl text-black leading-relaxed">
                Through heartbreak, setbacks, and deep soul work, I discovered that pain doesn't disqualify you — it positions you.
              </p>
              <div className="flex gap-4 mt-8">
                <button className="bg-suelyn-cream text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-inter text-sm">
                  Join Community
                </button>
                <button className="bg-suelyn-cream text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-inter text-sm">
                  Learn More
                  <span className="ml-4">→</span>
                </button>
              </div>
            </div>

            {/* Right side - Image gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
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
              <div className="space-y-4 pt-8">
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
      </section>

      {/* Join The Empowered Space Section with Flipped Arch */}
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
                JOIN THE EMPOWERED
              </h3>
              <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-4xl font-light italic text-white leading-tight max-w-2xl mt-[0%] mb-[0%] ml-[20%]">
                SPACE
              </p>
              <p className="font-playfair text-lg sm:text-xl md:text-3xl lg:text-3xl font-normal text-white leading-tight max-w-4xl mx-auto mb-8 mt-5">
                "Your healing is holy. Your voice is needed. Your purpose is still alive."
              </p>
            </div>

            {/* Signup form */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-4 text-white text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-suelyn-cream text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-inter text-lg whitespace-nowrap">
                  JOIN THE FUN
                </button>
              </div>
            </div>

            {/* Image gallery row */}
            <div className="flex justify-center gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <img
                  key={index}
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1179b95de6107e5b5b214d0f2ee7366adaac0a3d?width=586"
                  alt={`Gallery ${index + 1}`}
                  className="w-32 h-32 object-cover flex-shrink-0 border-2 border-white rounded-lg"
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
                © 2025 <span className="text-suelyn-purple">SueLyn Empowered Living</span>. All rights reserved
              </p>
            </div>

            {/* Design Credit */}
            <div className="text-right">
              <p className="font-jost text-sm font-bold text-black uppercase tracking-wider">
                Designed by <span className="text-suelyn-purple">Narro: Web Services</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
