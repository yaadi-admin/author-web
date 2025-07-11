import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useViewportScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div style={{
      position: 'fixed',
      bottom: 0,  
      left: 0,
      right: 0,
      height: '5px',
      background: 'linear-gradient(90deg, #006A4E 0%, #006A4E 50%, #006A4E 100%)',
      scaleX: scaleX,
      transformOrigin: '0% 0%',
      boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.3)'
    }}
    />
  );
};

export default ScrollProgressBar;
