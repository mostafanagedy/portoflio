import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Github,
  ArrowRight,
  Globe,
  Mail,
  Download,
  MapPin,
  Circle,
} from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import { CERTIFICATES, PROJECTS } from '../data';
import { Recommendations } from '../components/Recommendations';

const ROLES = [
  'Frontend Developer',
  'React Specialist',
  'UI Engineer',
  'TypeScript Developer',
];

const STATS = [
  { value: PROJECTS.length + '+', label: 'Projects Shipped' },
  { value: CERTIFICATES.length + '+', label: 'Certifications' },
  { value: '2+', label: 'Years Building' },
];

export const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 34, damping: 34 });
  const springY = useSpring(mouseY, { stiffness: 34, damping: 34 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x * 14);
      mouseY.set(y * 14);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-[calc(100svh-72px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
      >
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Ambient Glow — mouse-tracked */}
        <motion.div
          className="absolute -z-10 hidden h-[420px] w-[420px] rounded-full bg-primary/[0.035] blur-[96px] pointer-events-none md:block"
          style={{ x: springX, y: springY, left: '36%', top: '24%' }}
        />

        <motion.div
          className="absolute -z-10 hidden h-[220px] w-[220px] rounded-full bg-slate-950/[0.04] blur-[70px] pointer-events-none dark:bg-white/[0.04] md:block"
          style={{ x: springX, y: springY, left: '54%', top: '48%' }}
        />

        {/* Top-right accent */}
        <div className="absolute top-0 right-0 w-px h-40 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block" />
        <div className="absolute top-0 right-0 w-40 h-px bg-gradient-to-l from-transparent via-primary/40 to-transparent hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left Column ── */}
            <div className="flex flex-col">

              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2.5 mb-8 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-widest uppercase">
                  Available for work
                </span>
              </motion.div>

              {/* Name */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm font-semibold text-primary tracking-[0.2em] uppercase mb-3"
              >
                Mostafa Nagedy
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-slate-950 dark:text-white mb-4"
              >
                Building{' '}
                <span className="relative inline-block">
                  <span className="text-primary">digital</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-primary/50 block"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
                <br />
                products that
                <br />
                <span className="text-slate-400 dark:text-slate-500">actually work.</span>
              </motion.h1>

              {/* Animated Role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-primary/60" />
                <div className="h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROLES[roleIndex]}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="block text-sm font-semibold text-slate-600 dark:text-slate-400 tracking-wide"
                    >
                      {ROLES[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mb-10"
              >
                I build React frontends, e-commerce interfaces, and practical
                Express/Mongo APIs with a strong focus on responsive UI and
                clean implementation.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  to="/projects"
                  data-magnetic="true"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  data-magnetic="true"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-sm font-semibold hover:border-primary/50 hover:text-primary dark:hover:border-primary/50 dark:hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </Link>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="h-px bg-slate-200 dark:bg-white/8 mb-8 origin-left"
              />

              {/* Social + Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-5"
              >
                <a
                  href="https://github.com/mostafanagedy"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://mostafacodes.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Website"
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <div className="h-4 w-px bg-slate-300 dark:bg-white/10" />
                <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  Egypt
                </span>
              </motion.div>
            </div>

            {/* ── Right Column ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex flex-col items-center gap-8 mt-4 md:mt-0"
            >
              {/* Profile Image — clean card */}
              <div className="relative w-full max-w-[340px] mx-auto">
                {/* Thin border frame */}
                <div className="absolute -inset-3 rounded-2xl border border-primary/15 hidden md:block" />
                <div className="absolute -inset-6 rounded-3xl border border-primary/8 hidden md:block" />

                <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-[4/5] shadow-[0_24px_80px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_80px_rgba(2,6,23,0.6)]">
                  {!isProfileLoaded && (
                    <Skeleton className="absolute inset-0 w-full h-full z-10" />
                  )}
                  <img
                    src="/profile-home.png"
                    alt="Mostafa Nagedy"
                    onLoad={() => setIsProfileLoaded(true)}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={640}
                    height={800}
                    className={`w-full h-full object-cover object-[50%_20%] transition-opacity duration-700 ${isProfileLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />

                  {/* Location tag — bottom left */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/10"
                  >
                    <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
                    <span className="text-xs font-medium text-white">Open to work</span>
                  </motion.div>
                </div>
              </div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="w-full max-w-[340px] grid grid-cols-3 divide-x divide-slate-200 dark:divide-white/8 border border-slate-200 dark:border-white/8 rounded-xl overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm"
              >
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex flex-col items-center py-4 px-2"
                  >
                    <span className="text-xl font-bold text-slate-950 dark:text-white tabular-nums">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-500 text-center leading-tight mt-0.5">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
      </section>

      <Recommendations />
    </>
  );
};
