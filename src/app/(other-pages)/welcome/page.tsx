"use client";
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import FooterWelcome from './footer';
import { HeroBanner } from './hero-sections/HeroBanner';
import { HeroPanel } from './hero-sections/HeroPanel';
import { HeroTwo } from './hero-sections/HeroTwo';
import { HeroExperience } from './hero-sections/HeroExperience';
import { HeroBooks } from './hero-sections/HeroBooks';
import { HeroYoutube } from './hero-sections/HeroYoutube';
import { HeroTestimonial } from './hero-sections/HeroTestimonial';
import { HeroBlog } from './hero-sections/HeroBlog';
import { HeroNewsletter } from './hero-sections/HeroNewsletter';

// Simple fade-in animation
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function WelcomePage() {
  return (
    <Suspense>
      <div className="w-full">
        {/* Header Banner Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <HeroBanner active={true} />
          </motion.div>
        </section>

        {/* Hero Panel Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <HeroPanel active={true} />
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <HeroTwo active={true} />
          </motion.div>
        </section>

        {/* Experience Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <HeroExperience active={true} />
          </motion.div>
        </section>

        {/* Books Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <HeroBooks active={true} />
          </motion.div>
        </section>

        {/* YouTube Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <HeroYoutube active={true} />
          </motion.div>
        </section>

        {/* Testimonial Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <HeroTestimonial active={true} />
          </motion.div>
        </section>

        {/* Blog Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative"
          >
            <HeroBlog active={true} />
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative"
          >
            <HeroNewsletter active={true} />
          </motion.div>
        </section>

        {/* Footer Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="relative"
          >
            <FooterWelcome />
          </motion.div>
        </section>
      </div>
    </Suspense>
  );
}
