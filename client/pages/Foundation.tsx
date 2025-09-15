import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { footerPictures } from './Index';
import Footer from './footer';
import axios from 'axios';

export default function Foundation() {
  const [scrollY, setScrollY] = useState(0);
  // State for managing the marquee animation
  const [animationKey, setAnimationKey] = useState(0);
  const marqueeText = "SUELYN EMPOWERED LIVING FOUNDATION ".repeat(20);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {

      const response = await axios.post('https://sue-server-894877881089.europe-west1.run.app/api/suelyn/authenticate', {
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
        title: 'SueLyn Empowered Living Foundation',
        function: 'sendContactEmail'
      });

      if (response.status === 200) {
        // Clear form after successful submission
        setContactForm({ name: '', email: '', message: '' });
        alert('Thank you for your message! We will get back to you soon.');
      } else {
        throw new Error(response.data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE]">
      <Header whiteText={true} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

      </section>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <div className="relative z-10 text-center px-4 text-black">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <h1 className="font-charm text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[150px] 2xl:text-[250px] font-bold text-black leading-none mb-2 md:mb-4">
                Foundation
              </h1>
            </div>
            <h2 className="font-charm text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-normal text-black sm:ml-[-10%] md:ml-[-20%] lg:ml-[-30%] xl:ml-[-40%] 2xl:ml-[42%] sm:mt-[-1%] md:mt-[-2%] lg:mt-[-3%] xl:mt-[-4%] 2xl:mt-[-5%]">
              Inspired to Give
            </h2>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-t from-[#FFE4EE] via-[#FFE4EE] to-[#FFE4EE] h-[20vh] mt-[-20%] pb-[20%]"></section>

      {/* About/Mission Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE] mt-[-3%]">
        <div className="container mx-auto">
          <section className="py-16 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
            <div className="container mx-auto text-center">
              <div className="relative">
                {/* Background faded text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <p className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold text-black/30 transform rotate-[-5deg] mt-[20%]">
                    Foundation
                  </p>
                </div>

                {/* Main motto */}
                <div className="relative z-10">
                  <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-none mb-4">
                    SueLyn
                  </h2>
                  <p className="font-playfair text-lg sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-black leading-tight mb-4">
                    Empowered Living
                  </p>
                  {/* <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-none">
                Empowered Living
              </h2> */}
                </div>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-6">
            {/* Left side - Text */}
            <div className="space-y-6">
              <p className="font-playfair text-lg sm:text-4xl md:text-4xl font-light italic text-black leading-tight mb-4">
                Empowered to Rise. Inspired to Give.
              </p>
              <p className="font-helvetica text-2xl text-black leading-relaxed">
                At SueLyn Empowered Living Foundation, our mission is born from a heart that listens to God and a passion to see lives transformed. We believe that when one person is empowered, entire communities can be uplifted. This foundation stands as a testament to faith in action, meeting real needs, inspiring hope, and creating space for others to rise.&nbsp;
                <br /><br />
                With every step, we are committed to nurturing potential and walking alongside those who simply need a chance.
              </p>
            </div>

            {/* Right side - Image gallery */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-4">
                {/* <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3bcb43c2d08f89a125bec53b49f9f6707b3f05df?width=941"
                  alt="Suzanna"
                  className="w-full h-auto rounded-lg"
                /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-12%20at%2011.14.23.jpeg?alt=media&token=404c0109-03c1-46f2-93f4-5d6dbc3a69ad"
                  alt="Suzanna"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              {/* <div className="space-y-4 pt-8">
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
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Continuous Background Text Section */}
      <section className="py-1 w-full marquee-container relative overflow-hidden bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE]">
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

      <section className="py-24 px-4 bg-gradient-to-b from-[#FFE4EE] to-[#FFE4EE] mt-[-3%]">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-none mb-10 text-center">
              Gallery
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-22%20at%2011.32.24.jpeg?alt=media&token=73d758d5-b2ef-4516-9cb5-0e2f9051c16e"
                alt="Empowerment 1"
                className="rounded-lg object-cover w-full h-[28rem] aspect-[3/4] shadow-lg"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-22%20at%2011.33.34.jpeg?alt=media&token=7e1a651d-5b71-4617-ab6a-802fe87ec234"
                alt="Empowerment 2"
                className="rounded-lg object-cover w-full h-[28rem] aspect-[3/4] shadow-lg"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-22%20at%2011.32.43.jpeg?alt=media&token=9d835eea-f1d9-41f7-b192-eebe3806e674"
                alt="Empowerment 3"
                className="rounded-lg object-cover w-full h-[28rem] aspect-[3/4] shadow-lg"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/WhatsApp%20Image%202025-08-22%20at%2011.33.19.jpeg?alt=media&token=9f06a9c5-9ad9-4727-9c07-f313c9e380c9"
                alt="Empowerment 4"
                className="rounded-lg object-cover w-full h-[28rem] aspect-[3/4] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription Section with Gradient Arch */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden w-full bg-gradient-to-b from-[#F1E6DB] to-[#FFAC24]">

        <div className="relative z-10 container mx-auto px-4 text-center pt-[8%] sm:pt-[10%] md:pt-[2%]">
          <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal text-black leading-none mb-8 sm:mb-10 md:mb-12">
          CONTACT US
          </h3>
          <p className="font-playfair text-2xl max-w-4xl mx-auto font-normal text-black leading-none mb-8 sm:mb-10 md:mb-12">
Have a question or an idea for collaboration? We’d love to hear from you. Together, we can create opportunities and shape a brighter future.
          </p>
          
          {/* Signup form */}
          <div className="max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={contactForm.name}
                onChange={handleInputChange}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-black text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={handleInputChange}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-black text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
               <input
                type="text"
                name="message"
                placeholder="Message"
                value={contactForm.message}
                onChange={handleInputChange}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-black text-base sm:text-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#E6951A] transition-colors font-inter text-base sm:text-lg mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Sending...' : 'Contact Us'}
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
              <path d="M0 0 L0 30 Q50 80 100 30 L100 0 Z" fill="url(#flippedGradient)" />
            </svg>
          </div>

          <div className="relative z-10 container mx-auto px-4 mt-[-70px]">
            <div className="text-center mb-[5%]">
              <h3 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl font-normal text-white leading-none mt-[5%]">
              The Bible Is The Manual For Life
              </h3>
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