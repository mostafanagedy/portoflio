import { motion } from 'motion/react';
import { User, Terminal, Cpu, Globe, Layers } from 'lucide-react';
import { CERTIFICATES, PROJECTS } from '../data';
import { SectionHeading } from '../components/SectionHeading';
import { FloatingParticle } from '../components/FloatingParticle';

const FEATURE_CARDS = [
  {
    icon: Terminal,
    title: 'Frontend Architecture',
    desc: 'Scalable React 19, strict TypeScript, design systems, and modular component libraries.',
    accent: 'from-cyan-400/15 via-blue-400/10 to-transparent',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(34,211,238,0.25)',
  },
  {
    icon: Cpu,
    title: 'Performance Engineering',
    desc: 'Core Web Vitals optimization, route-based code splitting, and sub-second response times.',
    accent: 'from-emerald-400/15 via-teal-400/10 to-transparent',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(52,211,153,0.25)',
  },
  {
    icon: Globe,
    title: 'Full-Stack Integration',
    desc: 'Production RESTful APIs with Node.js/Express, secure JWT/OAuth flows, and resilient databases.',
    accent: 'from-violet-400/15 via-fuchsia-400/10 to-transparent',
    gradient: 'from-violet-500 to-fuchsia-500',
    glow: 'rgba(167,139,250,0.25)',
  },
  {
    icon: Layers,
    title: 'Quality & Accessibility',
    desc: 'Automated testing suites (Vitest/RTL), CI/CD automation, and strict WCAG 2.1 compliance.',
    accent: 'from-amber-300/15 via-orange-300/10 to-transparent',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(251,191,36,0.25)',
  },
];

const STATS = [
  { value: `${PROJECTS.length}+`, label: 'Production Projects', color: 'text-primary' },
  { value: `${CERTIFICATES.length}+`, label: 'Certifications', color: 'text-secondary' },
  { value: '6+', label: 'Years Experience', color: 'text-emerald-400' },
];

export const About = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Particles */}
      <FloatingParticle delay={0} duration={6} x="8%" y="15%" />
      <FloatingParticle delay={1} duration={7} x="88%" y="25%" />
      <FloatingParticle delay={2} duration={8} x="20%" y="75%" />
      <FloatingParticle delay={1.5} duration={6.5} x="75%" y="80%" />
      <FloatingParticle delay={0.5} duration={7.5} x="50%" y="10%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading title="About Me" subtitle="Introduction" icon={User} />

        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* ── Left — Text + Stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Headline */}
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white leading-snug"
            >
              Engineering resilient, high-performance web systems from{' '}
              <span className="text-primary">architecture</span> to{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                production delivery
              </span>
              .
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              I am a Senior Frontend & Full-Stack Engineer specializing in React 19, TypeScript, and
              modern web architectures. Over the past 6+ years, I have architected and delivered
              production platforms, high-conversion storefronts, and modular design systems that
              serve thousands of active users with sub-second responsiveness.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              My engineering philosophy pairs deep UI craftsmanship — smooth micro-interactions,
              strict accessibility (WCAG 2.1 AA), and fluid motion — with bulletproof backend
              integrations. I emphasize clean architecture, comprehensive test coverage (Vitest /
              RTL), and automated CI/CD pipelines to build software that scales reliably.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-2"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="relative p-4 rounded-2xl glass border border-slate-200/80 dark:border-white/8 text-center overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className={`text-2xl font-bold ${stat.color} tabular-nums`}>{stat.value}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-1 leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — Feature Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {FEATURE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '50px' }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 20 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/60 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                {/* Animated Corner Glow */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                  style={{ background: card.glow }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Hover Box Shadow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  whileHover={{ boxShadow: `0 20px 60px ${card.glow}` }}
                />

                <div className="relative p-6">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg mb-4`}
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{ transform: 'translateZ(16px)' }}
                  >
                    <card.icon className="w-5 h-5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
                  </motion.div>

                  <h4 className="font-bold text-slate-950 dark:text-white mb-2 tracking-tight">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
