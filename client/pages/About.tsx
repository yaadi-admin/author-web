import Header from '../components/Header';
import { useState, useEffect, useCallback } from 'react';
import { footerPictures } from './Index';
import Footer from './footer';
import axios from 'axios';

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  // State for managing the marquee animation
  const [animationKey, setAnimationKey] = useState(0);
  
  // Newsletter form state
  const [newsletterForm, setNewsletterForm] = useState({
    firstName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


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

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Setup animation event listeners
  useEffect(() => {
    const marqueeElement = document.querySelector('.marquee-content');
    if (marqueeElement) {
      marqueeElement.addEventListener('animationend', handleAnimationError);
    }
    return cleanupAnimation;
  }, [handleAnimationError, cleanupAnimation]);

  // Handle newsletter form input changes
  const handleNewsletterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewsletterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterForm.firstName || !newsletterForm.email) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://sue-server-894877881089.europe-west1.run.app/api/suelyn/authenticate', {
        name: newsletterForm.firstName,
        email: newsletterForm.email,
        message: 'Newsletter subscription request from About page',
        title: 'Newsletter Subscription - About Page',
        function: 'sendContactEmail'
      });

      if (response.status === 200) {
        // Clear form after successful submission
        setNewsletterForm({ firstName: '', email: '' });
        alert('Thank you for joining the Empowered Space! We will keep you updated.');
      } else {
        throw new Error(response.data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('There was an error subscribing to our newsletter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Hero Content */}
        {/* <div className="relative z-10 text-center px-4 text-white">
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
        </div> */}
      </section>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 mt-[-15%] sm:mt-[-12%] md:mt-[-15%] lg:mt-[-30%] xl:mt-[-15%]">
        <div className="relative z-10 text-center px-4 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <h1 className="font-charm text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[150px] 2xl:text-[250px] font-bold text-white leading-none mb-2 md:mb-4">
                About
              </h1>
            </div>
            <h2 className="font-league-spartan text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl pt-2 font-normal text-black sm:ml-[-10%] md:ml-[-20%] lg:ml-[-30%] xl:ml-[-40%] 2xl:ml-[-60%] sm:mt-[-1%] md:mt-[-2%] lg:mt-[-3%] xl:mt-[-4%] 2xl:mt-[-6%]">
              Suzanna Griffiths
            </h2>
          </div>
        </div>
      </div>

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


      <section className="py-8 sm:py-12 md:py-16 md:mt-[-8%] px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto text-center">
          {/* We Serve Section */}
          <div>
                <p className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal text-black/70 leading-tight max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8">
                  Why SueLyn Empowered Living Was Born
                </p>
                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black mb-3 sm:mb-4 font-normal leading-6 sm:leading-7 md:leading-8">
                  SueLyn Empowered Living was born from real-life conversations — late-night talks, quiet tears, and breakthrough moments. Suzanna's transparency brings healing, hope, and connection. She doesn't hide her scars; she shows her healing.
                </p>
                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black mb-6 sm:mb-8 font-normal leading-6 sm:leading-7 md:leading-8">
                  This is more than a platform - it's a <b>movement</b> of truth-telling, healing, and purpose.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4">
                  <button 
                  onClick={() => {
                    window.location.href = '/author';
                  }}
                   className="group bg-[#F84988] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-inter text-xs sm:text-sm font-semibold flex items-center space-x-2">
                    <span>Explore My Book</span>
                  </button>
                  <button 
                  onClick={() => {
                    window.location.href = 'https://forms.gle/Ggpn61P2UcurTBtW6';
                  }}
                   className="group bg-suelyn-cream text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-black/20 hover:bg-[#F84988] hover:text-white transition-all duration-300 transform hover:-translate-y-1 font-inter text-xs sm:text-sm font-semibold flex items-center space-x-2">
                    <span>Book Suzanna to Speak</span>
                  </button>
                </div>
              </div>
        </div>
      </section>

      {/* Personal Section with Images */}
      <section className="py-8 sm:py-12 md:py-16 mt-[-5%] px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* Left Image */}
            <div className="flex-1 flex flex-col items-center lg:items-end">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.20.03.jpeg?alt=media&token=802d2350-0cb7-4e3f-b75d-c1ff6b11dd1e"
                alt="Suzanna Griffiths"
                className="w-40 sm:w-48 md:w-64 lg:w-80 object-cover rounded-lg mb-4"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.20.13.jpeg?alt=media&token=b4e5d3b3-aab9-424c-b4b2-fe33e76a1766"
                alt="Suzanna portrait"
                className="w-44 h-44 sm:w-28 sm:h-28 md:w-40 md:h-64 object-cover rounded-lg mt-[-15%] sm:mt-[-20%] md:mt-[-45%] ml-[-8%] sm:ml-[-10%] md:ml-[-12%]"
              />
            </div>

            {/* Center Text and Buttons */}
            <div className="flex-1 flex flex-col items-center text-left space-y-6 sm:space-y-8">
              


            <div className="flex flex-col items-center text-center">
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-black mb-4 mt-[5%] sm:mt-[8%] md:mt-[10%]">
              We Serve
            </h3>
            <div className="space-y-3 sm:space-y-4 w-full max-w-7xl">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 w-full">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                  <p className="font-helvetica text-sm sm:text-base md:text-lg text-black leading-relaxed text-left">
                  We serve adults who desire to embrace the whole self.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 w-full">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                  <p className="font-helvetica text-sm sm:text-base md:text-lg text-black leading-relaxed text-left">
                  Christian couples who are determined to enjoy marriage God's way.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 w-full">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                  <p className="font-helvetica text-sm sm:text-base md:text-lg text-black leading-relaxed text-left">
                  ⁠Couples who are experiencing prolonged turmoil linked to unsealed soul wounds.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 w-full">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 sm:mt-3"></div>
                  <p className="font-helvetica text-sm sm:text-base md:text-lg text-black leading-relaxed text-left">
                    <span>Anyone seeking clarity, restoration, and biblical truth</span> in their journey
                  </p>
                </div>
              </div>
            </div>
          </div>


              <div className="pt-6 sm:pt-8 border-t border-black/10 w-full">
                <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-center text-black leading-none mb-4 sm:mb-6">
                  OUR MISSION
                </h2>
                <p className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center font-normal text-black/80 leading-tight italic mb-6 sm:mb-8">
                  "SueLyn Empowered Living exists to help individuals overcome shame, doubt, and fear by rediscovering their God-given greatness through biblical truth and personal testimony."
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex flex-col items-center lg:items-start">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-07-18-00-54.jpg?alt=media&token=00f0e840-f8fa-408e-9277-d564ed5bb947"
                alt="Suzanna empowerment"
                className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Continuous Background Text Section */}
      <section className="py-1 w-full marquee-container mt-[-5%] relative overflow-hidden bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
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
                  {"GROW, OVERCOME, AND GET BACK UP ".repeat(20)}
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



      {/* Official Bio Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-b from-[#E0B2F1] to-[#E0B2F1]">
        <div className="container mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl font-normal text-black leading-none mb-4 sm:mb-6 md:mb-8">
              OFFICIAL BIO
            </h2>
            <p className="font-playfair text-sm sm:text-base md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-normal text-black/90 leading-tight max-w-4xl mx-auto">
              About Suzanna Griffiths
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left side - Long Image */}
            <div className="order-2 lg:order-1 mt-[27%]">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/PHOTO-2025-08-12-16-35-31.jpg?alt=media&token=a619ee82-a06b-409b-b13e-b114bdf4a349"
                alt="Suzanna Griffiths"
                className="w-full min-h-full object-contain rounded-lg"
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
                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  From the deep hills of rural Portland, Jamaica, hails a powerhouse of purpose, passion, and transformation. Suzanna Griffiths has suffered many forms of abuse, but with a resolute mind has cancelled evil words, healed emotionally, reidentified herself in Christ, and used all the courage inside her to soar past naysayers' expectations.
                </p>
                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  She has a belief that greatness is on the inside of all of us and has taken that passion into her corporate role where she has over 20 years of experience as an Environmental, Occupational Safety and Health (EOSH) leader.
                </p>
                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Suzanna predominantly uses coaching, mentorship and training to drive behavioural change, which is critical for the success of a positive workplace EOSH culture.
                </p>
                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Suzanna believes that humans as a whole are a composite being of physical, emotional, spiritual, and social elements that must align with the Word of God to ensure a fruitful, empowered, and purposeful life.
                </p>
                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  Suzanna studied Psychology, Sociology and Human Sexuality as she desired to understand human behaviours. She holds a BSc in Environmental Health and a plethora of post graduate international certifications.
                </p>

                <p className="font-helvetica text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
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
                        <p className="font-helvetica text-xs text-gray-600">Crafting the perfect blend</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-helvetica text-xs sm:text-sm text-black leading-relaxed">
                  She makes a mean sangria
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
                        <p className="font-helvetica text-xs text-black">Protector of souls</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-helvetica text-xs sm:text-sm text-black leading-relaxed">
                  Fiercely loyal. Once you’re her people, she protects your soul and spirit.
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
                        <h5 className="font-playfair text-xs sm:text-sm font-semibold text-black">Music Lover</h5>
                        <p className="font-helvetica text-xs text-black">African gospel, Country</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-helvetica text-xs sm:text-sm text-black leading-relaxed">
                  African gospel, Country
She thinks Latin dance is sensual…wants to learn someday.
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
                      <h4 className="font-inter text-xs font-semibold text-gray-900">Avid Shopper</h4>
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
                        <h5 className="font-playfair text-xs sm:text-sm font-semibold text-black">Avid Shopper</h5>
                        <p className="font-helvetica text-xs text-black">She loves to shop</p>
                      </div>
                    </div>
                  </div>

                  <p className="font-helvetica text-xs sm:text-sm text-black leading-relaxed">
                  She loves to shop.
                  </p><br />

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
              {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="bg-suelyn-cream text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors font-inter text-xs sm:text-sm">
                  Join Community
                </button>
                <button className="bg-suelyn-cream text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors font-inter text-xs sm:text-sm">
                  Learn More
                  <span className="ml-2 sm:ml-4">→</span>
                </button>
              </div> */}

              {/* Image gallery */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-2 sm:space-y-4">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.19.43.jpeg?alt=media&token=df10e00b-621e-4ef8-89af-b5908fde612c"
                    alt="Suzanna"
                    className="w-full h-auto rounded-lg"
                  />
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.19.31.jpeg?alt=media&token=cab0c754-cdf3-429d-986c-d2d42217bd3a"
                    alt="Suzanna"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-8">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.20.55.jpeg?alt=media&token=a0118b95-1f15-47d0-aa75-0104f07bad0e"
                    alt="Suzanna"
                    className="w-full h-auto rounded-lg"
                  />
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.14.55.jpeg?alt=media&token=0becff48-6d3c-4d19-9233-fa210f8f1c91"
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
            <form onSubmit={handleNewsletterSubmit} className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
              <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={newsletterForm.firstName}
                  onChange={handleNewsletterInputChange}
                  required
                  className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newsletterForm.email}
                  onChange={handleNewsletterInputChange}
                  required
                  className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-suelyn-cream text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-colors font-inter text-base sm:text-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'JOINING...' : 'JOIN THE FUN'}
                </button>
              </div>
            </form>

            {/* Image gallery row */}
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
