import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ChevronRight, 
  Award,
  Briefcase,
  Code2,
  Coffee
} from 'lucide-react';
import { Skeleton } from '../components/Skeleton';

const DYNAMIC_WORDS = [
  "Precision.",
  "Passion.",
  "Innovation.",
  "Creativity.",
  "Excellence.",
  "Scalability."
];

import { Recommendations } from '../components/Recommendations';

export const Home = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 3000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <section className="hero-section relative min-h-[calc(100svh-72px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 -left-16 md:-left-20 w-64 h-64 md:w-[400px] md:h-[400px] bg-primary/5 rounded-full blur-[80px] md:blur-[100px]"
            animate={{
              x: mousePosition.x / 40,
              y: mousePosition.y / 40,
            }}
            transition={{ type: 'spring', damping: 50, stiffness: 200 }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-16 md:-right-20 w-64 h-64 md:w-[400px] md:h-[400px] bg-secondary/5 rounded-full blur-[80px] md:blur-[100px]"
            animate={{
              x: -mousePosition.x / 40,
              y: -mousePosition.y / 40,
            }}
            transition={{ type: 'spring', damping: 50, stiffness: 200 }}
          />
        </div>

        <div className="hero-shell max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-0 grid grid-cols-1 min-[390px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-5 sm:mb-6">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-widest text-primary">Available for new opportunities</span>
            </div>
            <h1 className="hero-title text-[2rem] leading-[1.1] sm:text-5xl md:text-7xl font-semibold mb-5 sm:mb-6 min-h-[2.6em] md:min-h-[auto] text-blue-950 dark:text-white">
              Crafting <span className="text-primary">Digital</span> <br />
              Experiences with <br />
              <div className="relative inline-block h-[1.1em] sm:h-[1.2em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={DYNAMIC_WORDS[wordIndex]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-block text-primary"
                  >
                    {DYNAMIC_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
            <p className="text-[15px] sm:text-lg text-blue-700/80 dark:text-slate-400 mb-7 sm:mb-8 max-w-lg leading-relaxed">
              I'm a Full-Stack Developer specializing in building exceptional digital products that combine robust engineering with elegant design.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-4">
              <Link 
                to="/projects"
                data-magnetic="true"
                className="w-auto justify-center px-5 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                View My Work <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/certificates"
                data-magnetic="true"
                className="w-auto justify-center px-5 sm:px-8 py-3 sm:py-4 rounded-xl border border-slate-200 dark:border-white/10 font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center gap-2 text-blue-900 dark:text-white"
              >
                Certificates <Award className="w-4 h-4" />
              </Link>
              <a 
                href="https://www.buymeacoffee.com" 
                target="_blank" 
                rel="noopener noreferrer"
                data-magnetic="true"
                className="w-auto justify-center px-5 sm:px-8 py-3 sm:py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" /> Buy me a coffee
              </a>
            </div>
            
            <div className="mt-9 sm:mt-12 flex items-center gap-3 sm:gap-6">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 sm:p-3 rounded-xl glass hover:text-primary transition-all">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0] 
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative flex justify-center min-[390px]:justify-end md:justify-center items-center"
          >
            <div className="relative z-10 w-44 h-44 min-[390px]:w-48 min-[390px]:h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-slate-200/70 dark:border-white/15 shadow-[0_10px_30px_rgba(15,23,42,0.14)] dark:shadow-[0_10px_30px_rgba(2,6,23,0.5)] group">
              {!isProfileLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full z-10" variant="circle" />
              )}
              <img
                src="/profile-home.png"
                alt="Mostafa Nagedy profile"
                onLoad={() => setIsProfileLoaded(true)}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={640}
                height={640}
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
                className={`w-full h-full object-cover object-[50%_30%] contrast-[1.04] saturate-[1.06] dark:brightness-[0.98] transition-all duration-700 group-hover:scale-105 ${isProfileLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/8 via-transparent to-white/20 dark:to-white/10 pointer-events-none" />
            </div>
            
            {/* Decorative Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[110%] h-[110%] border border-dashed border-primary/30 rounded-full -z-10"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[120%] h-[120%] border border-dashed border-secondary/20 rounded-full -z-10"
            />
            
            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass p-4 rounded-2xl shadow-xl z-20 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-blue-500 dark:text-slate-400">Experience</p>
                  <p className="text-sm font-bold text-blue-900 dark:text-white">5+ Years</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 glass p-4 rounded-2xl shadow-xl z-20 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Code2 className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-blue-500 dark:text-slate-400">Projects</p>
                  <p className="text-sm font-bold text-blue-900 dark:text-white">50+ Completed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Recommendations />
    </>
  );
};


