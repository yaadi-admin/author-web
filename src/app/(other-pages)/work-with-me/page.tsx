"use client";
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, Variants } from 'framer-motion';
import ScrollProgressBar from './ScrollProgressBar';
// import { HeroData } from './hero';
// import Hero from './hero';
import FooterWelcome from './footer';
import { HeroOneMobile } from './hero-sections/mobile-section';
import { HeroBanner } from './hero-sections/HeroBanner';
import { HeroPanel } from './hero-sections/HeroPanel';
import { HeroTwo } from './hero-sections/HeroTwo';

// Desktop slide variants
const slideInFromLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
};
const slideInFromRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};
const variants: { [key: string]: Variants } = {
  slideInFromLeft,
  slideInFromRight,
};

// Mobile vertical variants
const mobileVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function WelcomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [animationType, setAnimationType] = useState('slideInFromLeft');

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setAnimationType(window.innerWidth >= 1024 ? 'slideInFromLeft' : 'fadeUp');
      }
    };
    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  return (
    <Suspense>
      <div className="w-full">
        {/* <ScrollProgressBar /> */}

        {/* Header Banner Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={mobileVariants}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <HeroBanner active={true} />
          </motion.div>
        </section>

        {/* Top Hero Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={mobileVariants}
            transition={{ duration: 0.5 }}
            className="relative"
          >
          <HeroPanel active={true} />
          </motion.div>
        </section>

        {/* Products Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={mobileVariants}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <HeroTwo active={true} />
          </motion.div>
        </section>

        {/* Footer Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={mobileVariants}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <FooterWelcome  />
          </motion.div>
        </section>
      </div>
    </Suspense>
  );
}

type MotionWrapperProps = {
  children: React.ReactNode;
  variants: Variants | { [key: string]: Variants };
  animation?: string;
  threshold?: number;
  isMobile?: boolean;
};

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variants,
  animation = 'slideInFromLeft',
  threshold = 0.1,
  isMobile = false,
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="exit"
      variants={((variants as Record<string, Variants>)[animation] ?? variants) as Variants}
      transition={{ duration: 0.5 }}
      drag={isMobile ? 'y' : false}
      dragConstraints={{ top: 0, bottom: 0 }}
    >
      {children}
    </motion.div>
  );
};
