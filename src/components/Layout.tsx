import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Twitter,
  Home,
  User,
  Code2,
  Briefcase,
  Layers,
  Award,
  Mail
} from 'lucide-react';
import { ChatBot } from './ChatBot';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setReducedMotion(reducedMotionQuery.matches);
    updateReducedMotion();
    reducedMotionQuery.addEventListener('change', updateReducedMotion);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveTags = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'];
      if (
        interactiveTags.includes(target.tagName) || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      reducedMotionQuery.removeEventListener('change', updateReducedMotion);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Outer Ring */}
      <motion.div
        className="custom-cursor-ring fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.55 : isClicking ? 0.9 : 1,
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(37, 99, 235, 0.6)' : 'rgba(37, 99, 235, 0.3)',
        }}
        transition={reducedMotion ? { duration: 0.08 } : { type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
      />
      {/* Secondary Hover Ring */}
      <motion.div
        className="custom-cursor-hover-ring fixed top-0 left-0 w-14 h-14 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePos.x - 28,
          y: mousePos.y - 28,
          scale: isHovering ? 1 : 0.7,
          opacity: isHovering ? 1 : 0,
        }}
        transition={reducedMotion ? { duration: 0.08 } : { type: 'spring', damping: 28, stiffness: 230, mass: 0.6 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="custom-cursor-dot fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 2,
          y: mousePos.y - 2,
          scale: isHovering ? 1.2 : isClicking ? 1.5 : 1,
        }}
        transition={reducedMotion ? { duration: 0.06 } : { type: 'spring', damping: 35, stiffness: 450, mass: 0.2 }}
      />
      {/* Trailing Glow */}
      {!reducedMotion && (
        <motion.div
          className="custom-cursor-glow fixed top-0 left-0 w-40 h-40 bg-primary/5 rounded-full pointer-events-none z-[9998] hidden md:block blur-3xl"
          animate={{
            x: mousePos.x - 80,
            y: mousePos.y - 80,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 150, mass: 1 }}
        />
      )}
    </>
  );
};

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Skills', href: '/skills', icon: Code2 },
    { name: 'Experience', href: '/experience', icon: Briefcase },
    { name: 'Projects', href: '/projects', icon: Layers },
    { name: 'Certificates', href: '/certificates', icon: Award },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === 'light'
          ? 'bg-slate-100/95 py-2.5 sm:py-3 border-b border-slate-200'
          : isScrolled
            ? 'glass py-3 sm:py-4 border-b border-slate-200/50 dark:border-white/5'
            : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-2 md:gap-3 group shrink-0" aria-label="Nagedy Home">
          <img
            src="/brand/logo-mark.svg"
            alt="Nagedy logo"
            width={36}
            height={36}
            className="w-10 h-10 rounded-xl p-1 bg-white/75 dark:bg-slate-900/60 border border-blue-300/60 dark:border-blue-300/30 shadow-sm md:hidden"
            loading="eager"
            decoding="async"
          />
          <img
            src={theme === 'dark' ? '/brand/logo-wordmark-light.svg' : '/brand/logo-wordmark.svg'}
            alt="Nagedy wordmark"
            width={48}
            height={48}
            className="hidden md:block h-10 lg:h-11 2xl:h-12 w-auto drop-shadow-[0_2px_8px_rgba(37,99,235,0.35)]"
            loading="eager"
            decoding="async"
          />
          <span className="text-xl leading-none font-extrabold tracking-tight text-blue-600 dark:text-white group-hover:text-primary transition-colors md:hidden">
            NAGEDY
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`
              }
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              {link.name}
            </NavLink>
          ))}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass hover:text-primary transition-all"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button data-magnetic="true" className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all">
            Resume
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-300/70 dark:border-white/10 text-slate-700 dark:text-white"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-300/70 dark:border-white/10 text-slate-700 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/35 dark:bg-slate-900/40 backdrop-blur-2xl border-t border-white/60 dark:border-white/15 shadow-[0_12px_40px_rgba(15,23,42,0.12)] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-lg font-semibold transition-colors flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                      isActive
                        ? 'text-primary bg-white/45 border border-primary/25 dark:bg-primary/15'
                        : 'text-slate-800 hover:bg-white/40 dark:text-slate-200 dark:hover:bg-white/10'
                    }`
                  }
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.name}
                </NavLink>
              ))}
              <button data-magnetic="true" className="w-full mt-2 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20">
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Layout = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic="true"]'));
    if (!elements.length) return;

    const handleMove = (event: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      const moveX = Math.max(Math.min(relX * 0.14, 8), -8);
      const moveY = Math.max(Math.min(relY * 0.14, 8), -8);
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleLeave = (el: HTMLElement) => {
      el.style.transform = 'translate(0, 0)';
    };

    const listeners = elements.map((el) => {
      const onMove = (event: Event) => handleMove(event as MouseEvent, el);
      const onLeave = () => handleLeave(el);
      el.style.willChange = 'transform';
      el.style.transition = 'transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)';
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return { el, onMove, onLeave };
    });

    return () => {
      listeners.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        el.style.transform = '';
        el.style.willChange = '';
        el.style.transition = '';
      });
    };
  }, [location.pathname]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress((scrollTop / scrollHeight) * 100);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[120] h-1 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-primary to-blue-500 shadow-[0_0_14px_rgba(37,99,235,0.55)]"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </div>
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      {/* Floating Home Button */}
      <AnimatePresence>
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50"
          >
            <Link
              to="/"
              className="flex items-center justify-center w-14 h-14 rounded-full glass border border-slate-200/70 dark:border-white/10 text-slate-800 dark:text-white shadow-xl hover:scale-105 transition-transform group"
              title="Go to Home"
            >
              <Home className="w-6 h-6 text-primary" />
              <span className="absolute left-full ml-4 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-white/10 hidden md:block">
                Back to Home
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bot */}
      <ChatBot />

      <main className="pt-16 sm:pt-20">
        <Outlet />
      </main>
      <footer className="py-10 md:py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-slate-500">
            Â© {new Date().getFullYear()} NAG-DEY. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <div className="flex items-center gap-4">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-500 hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};


