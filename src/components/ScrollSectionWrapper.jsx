import React from 'react';
import { motion } from 'motion/react';

const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  }
};

export default function ScrollSectionWrapper({ 
  children, 
  className = "", 
  delay = 0,
  id,
  margin = "0px",
  amount = 0.05
}) {
  return (
    <motion.div
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin, amount }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
