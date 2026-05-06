import {
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code2,
  Github,
  Home,
  Layers,
  Mail,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ChatBot } from "./ChatBot";

const PAGE_FLOW = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Code2 },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: Layers },
  { name: "Certificates", href: "/certificates", icon: Award },
  { name: "Contact", href: "/contact", icon: Mail },
];

const PAGE_SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "4%" : "-4%",
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? "-3%" : "3%",
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

// ── Page Loader ────────────────────────────────────────────────────────────
const PageLoader = ({ pageName }: { pageName: string }) => (
  <motion.div
    key="page-loader"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.18, ease: 'easeInOut' }}
    className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center"
  >
    {/* Backdrop */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white/60 dark:bg-slate-950/70 backdrop-blur-sm"
    />

    {/* Center Card */}
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col items-center gap-4 px-10 py-8 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
    >
      {/* Spinner */}
      <div className="relative w-10 h-10">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary/20"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-[6px] rounded-full border-2 border-transparent border-t-primary/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Page Name */}
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide"
      >
        {pageName}
      </motion.p>

      {/* Progress Bar */}
      <motion.div className="w-24 h-0.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>
    </motion.div>
  </motion.div>
);

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const pointerFineQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const updateReducedMotion = () =>
      setReducedMotion(reducedMotionQuery.matches);
    updateReducedMotion();
    reducedMotionQuery.addEventListener("change", updateReducedMotion);

    if (!pointerFineQuery.matches) {
      return () => {
        reducedMotionQuery.removeEventListener("change", updateReducedMotion);
      };
    }

    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsClicking(e.buttons > 0);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactiveTags = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"];
      setIsHovering(
        interactiveTags.includes(target.tagName) ||
          Boolean(target.closest("button")) ||
          Boolean(target.closest("a")) ||
          target.classList.contains("interactive"),
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      reducedMotionQuery.removeEventListener("change", updateReducedMotion);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] hidden pointer-events-none md:block will-change-transform"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isClicking ? 0.8 : isHovering ? 1.3 : 1,
        rotate: isHovering ? 15 : 0,
        opacity: isHovering ? 0.7 : 1,
      }}
      transition={
        reducedMotion
          ? { duration: 0.08 }
          : { type: "tween", duration: 0.14, ease: "easeOut" }
      }
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: isHovering ? 'drop-shadow(0 0 6px rgba(37,99,235,0.8))' : 'drop-shadow(0 2px 4px rgba(37,99,235,0.4))' }}
      >
        <g fill="#2563EB">
          <path d="M18 22 L64 10 L64 84 Q64 87 62 89 L34 114 Q32.5 115.5 31 115.5 Q28.5 115.5 28.5 112.5 L28.5 46 L18 35 Z" />
          <path d="M74 22 L102 12 L112 22 L112 84 Q112 86.5 110.5 88.5 L82 116 L74 123 Z" />
          <rect x="66" y="40" width="8" height="22" rx="2" transform="skewX(-15)" fill="#60A5FA" />
        </g>
      </svg>
    </motion.div>
  );
};

const Navbar = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === "light"
          ? "border-b border-slate-200 bg-slate-100/95 py-2.5 sm:py-3"
          : isScrolled
            ? "glass border-b border-slate-200/50 py-3 sm:py-4 dark:border-white/5"
            : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-2 group md:gap-3"
          aria-label="Nagedy Home"
        >
          <img
            src="/brand/logo-mark.svg"
            alt="Nagedy logo"
            width={36}
            height={36}
            className="h-10 w-10 rounded-xl border border-blue-300/60 bg-white/75 p-1 shadow-sm dark:border-blue-300/30 dark:bg-slate-900/60 md:hidden"
            loading="eager"
            decoding="async"
          />
          <img
            src={
              theme === "dark"
                ? "/brand/logo-wordmark-light.svg"
                : "/brand/logo-wordmark.svg"
            }
            alt="Nagedy wordmark"
            width={48}
            height={48}
            className="hidden h-10 w-auto drop-shadow-[0_2px_8px_rgba(37,99,235,0.35)] md:block lg:h-11 2xl:h-12"
            loading="eager"
            decoding="async"
          />
          <span className="text-xl font-extrabold leading-none tracking-tight text-blue-600 transition-colors group-hover:text-primary dark:text-white md:hidden">
            NAGEDY
          </span>
        </Link>

        <div className="hidden items-center gap-5 xl:flex 2xl:gap-6">
          {PAGE_FLOW.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary dark:text-slate-400"
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="glass rounded-xl p-2 transition-all hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/contact"
            data-magnetic="true"
            className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-white transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Contact me"
          >
            Let&apos;s Talk
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="relative z-[70] rounded-xl border border-slate-300/70 bg-slate-100 p-2 text-slate-700 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-slate-900/60 dark:text-white"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            className="relative z-[70] rounded-xl border border-slate-300/70 bg-slate-100 p-2 text-slate-700 touch-manipulation dark:border-white/10 dark:bg-slate-900/50 dark:text-white"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-pressed={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -12, scaleY: 0.96 }}
              className="fixed top-[72px] left-4 right-4 z-[999] origin-top overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.35)] dark:bg-slate-900/95 xl:hidden"
            >
              <div className="flex max-h-[calc(100svh-6rem)] flex-col gap-3 overflow-y-auto p-4 sm:p-6">
                {PAGE_FLOW.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                        isActive
                          ? "border border-primary/20 bg-white/10 text-primary"
                          : "text-slate-100 hover:bg-white/5"
                      }`
                    }
                  >
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-magnetic="true"
                  className="mt-2 w-full rounded-xl bg-primary py-3 text-center font-bold text-white shadow-lg shadow-primary/20"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export const Layout = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentPageIndex = useMemo(
    () => Math.max(PAGE_FLOW.findIndex((page) => page.href === location.pathname), 0),
    [location.pathname],
  );
  const previousPageIndexRef = useRef(currentPageIndex);
  const [pageDirection, setPageDirection] = useState(1);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let activeEl: HTMLElement | null = null;

    const resetActive = () => {
      if (!activeEl) return;
      activeEl.style.transform = "";
      activeEl.style.willChange = "";
      activeEl = null;
    };

    const handleMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const nextEl = target?.closest<HTMLElement>('[data-magnetic="true"]') ?? null;

      if (nextEl !== activeEl) {
        resetActive();
        activeEl = nextEl;
        if (activeEl) {
          activeEl.style.transition =
            "transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)";
          activeEl.style.willChange = "transform";
        }
      }

      if (!activeEl) return;

      const rect = activeEl.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      const moveX = Math.max(Math.min(relX * 0.14, 8), -8);
      const moveY = Math.max(Math.min(relY * 0.14, 8), -8);
      activeEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", resetActive);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", resetActive);
      resetActive();
    };
  }, [location.pathname]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress((scrollTop / scrollHeight) * 100);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [location.pathname]);

  useEffect(() => {
    const lastIndex = previousPageIndexRef.current;
    const delta = currentPageIndex - lastIndex;

    if (delta === 0) return;

    if (Math.abs(delta) === PAGE_FLOW.length - 1) {
      setPageDirection(delta > 0 ? -1 : 1);
    } else {
      setPageDirection(delta > 0 ? 1 : -1);
    }

    previousPageIndexRef.current = currentPageIndex;
  }, [currentPageIndex]);

  const previousPage =
    PAGE_FLOW[(currentPageIndex - 1 + PAGE_FLOW.length) % PAGE_FLOW.length];
  const nextPage = PAGE_FLOW[(currentPageIndex + 1) % PAGE_FLOW.length];
  const currentPage = PAGE_FLOW[currentPageIndex];
  const [isNavigating, setIsNavigating] = useState(false);
  const loaderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show loader briefly on every route change
  useEffect(() => {
    setIsNavigating(true);
    if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
    loaderTimerRef.current = setTimeout(() => setIsNavigating(false), 500);
    return () => {
      if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-[120] h-1">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-primary to-blue-500 shadow-[0_0_14px_rgba(37,99,235,0.55)]"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </div>

      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <AnimatePresence>
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="fixed bottom-5 left-5 z-50 md:bottom-8 md:left-8"
          >
            <Link
              to="/"
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-slate-200/70 text-slate-800 shadow-xl transition-transform hover:scale-105 glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:text-white"
              aria-label="Go to Home"
            >
              <Home className="h-6 w-6 text-primary" />
              <span className="pointer-events-none absolute left-full ml-4 hidden -translate-x-2 whitespace-nowrap rounded-xl border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-xl transition-all group-hover:translate-x-0 group-hover:opacity-100 md:block">
                Back to Home
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatBot />

      {/* Page Transition Loader */}
      <AnimatePresence>
        {isNavigating && <PageLoader pageName={currentPage.name} />}
      </AnimatePresence>

      <main className="relative overflow-x-clip pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-primary/[0.06] via-primary/[0.03] to-transparent dark:from-white/[0.04] dark:via-white/[0.015]" />
        <div className="relative z-10">
          <AnimatePresence mode="wait" initial={false} custom={pageDirection}>
            <motion.div
              key={location.pathname}
              custom={pageDirection}
              variants={PAGE_SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              className="min-h-[calc(100vh-5rem)]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <div className="fixed bottom-5 left-1/2 z-[70] w-[min(92vw,36rem)] -translate-x-1/2 md:bottom-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
          className="glass rounded-2xl border border-slate-200/70 px-3 py-2.5 shadow-[0_18px_50px_rgba(15,23,42,0.14)] dark:border-white/10 dark:shadow-[0_18px_50px_rgba(2,6,23,0.4)]"
        >
          <div className="flex items-center gap-2">

            {/* Prev Button */}
            <Link
              to={previousPage.href}
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-500 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:text-primary"
              aria-label={`Go to ${previousPage.name}`}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>

            {/* Pages */}
            <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2">
              {PAGE_FLOW.map((page, index) => {
                const Icon = page.icon;
                const isActive = index === currentPageIndex;
                return (
                  <Link
                    key={page.href}
                    to={page.href}
                    aria-label={page.name}
                    className="group relative flex items-center justify-center"
                  >
                    <motion.div
                      animate={{
                        width: isActive ? 80 : 36,
                        backgroundColor: isActive ? 'rgb(37 99 235)' : 'transparent',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      className={`flex h-9 items-center justify-center gap-1.5 overflow-hidden rounded-xl border transition-colors ${
                        isActive
                          ? 'border-primary shadow-[0_0_16px_rgba(37,99,235,0.4)]'
                          : 'border-slate-200/80 bg-white/60 hover:border-primary/40 hover:bg-primary/5 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-primary/40'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                        isActive ? 'text-white ml-2.5' : 'text-slate-500 dark:text-slate-400 group-hover:text-primary'
                      }`} />
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden whitespace-nowrap pr-2.5 text-[11px] font-bold text-white"
                          >
                            {page.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Tooltip */}
                    {!isActive && (
                      <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-800 md:block">
                        {page.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            <Link
              to={nextPage.href}
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-500 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:text-primary"
              aria-label={`Go to ${nextPage.name}`}
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

          </div>
        </motion.div>
      </div>

      <footer className="border-t border-white/5 py-10 md:py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} NAG-DEY. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/projects"
              className="text-xs text-slate-500 transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className="text-xs text-slate-500 transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mostafanagedy"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <Link
              to="/"
              className="text-slate-500 transition-colors hover:text-white"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="text-slate-500 transition-colors hover:text-white"
              aria-label="Contact"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
