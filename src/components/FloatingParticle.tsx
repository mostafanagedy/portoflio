import React from 'react';
import { motion } from 'motion/react';

interface FloatingParticleProps {
  delay: number;
  duration: number;
  x: string;
  y: string;
}

export const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay, duration, x, y }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-primary/30 pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ y: [-18, 18, -18], opacity: [0.35, 0.85, 0.35], scale: [1, 1.45, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);
