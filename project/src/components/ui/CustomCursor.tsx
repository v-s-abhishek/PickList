import React from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  position: { x: number; y: number };
  variant: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ position, variant }) => {
  const dotVariants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      mixBlendMode: 'difference',
      scale: 1,
    },
    link: {
      height: 16,
      width: 16,
      backgroundColor: '#8B5CF6',
      mixBlendMode: 'normal',
      scale: 1.2,
    },
    button: {
      height: 16,
      width: 16,
      backgroundColor: '#3B82F6',
      mixBlendMode: 'normal',
      scale: 1.5,
    },
  };

  const outlineVariants = {
    default: {
      height: 32,
      width: 32,
      border: '2px solid rgba(59, 130, 246, 0.3)',
      backgroundColor: 'transparent',
      mixBlendMode: 'difference',
      scale: 1,
    },
    link: {
      height: 48,
      width: 48,
      border: '2px solid #8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      mixBlendMode: 'normal',
      scale: 1.2,
    },
    button: {
      height: 64,
      width: 64,
      border: '2px solid #3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      mixBlendMode: 'normal',
      scale: 1.5,
    },
  };

  return (
    <>
      <motion.div
        className="cursor cursor-dot fixed pointer-events-none z-[9999]"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          position: 'fixed',
        }}
        variants={dotVariants}
        animate={variant}
        transition={{
          type: 'spring',
          stiffness: 750,
          damping: 50,
          mass: 0.5,
        }}
      />
      
      <motion.div
        className="cursor cursor-outline fixed pointer-events-none z-[9998]"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          position: 'fixed',
        }}
        variants={outlineVariants}
        animate={variant}
        transition={{
          type: 'spring',
          stiffness: 550,
          damping: 40,
          mass: 0.8,
        }}
      />
    </>
  );
};

export default CustomCursor;