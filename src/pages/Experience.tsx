import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Download, CalendarDays, Building2, ChevronRight, MonitorSmartphone, ServerCog, Code2 } from 'lucide-react';
import { EXPERIENCES } from '../data';
import type { LucideIcon } from 'lucide-react';

const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: any }) => (
  <div className="mb-12 md:mb-16 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
    >
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-xs font-bold uppercase tracking-widest text-primary">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const FloatingParticle = ({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-primary/30 pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ y: [-18, 18, -18], opacity: [0.35, 0.85, 0.35], scale: [1, 1.45, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const EXP_META: { icon: LucideIcon; accent: string; gradient: string; glow: string }[] = [
  {
    icon: MonitorSmartphone,
    accent: 'from-cyan-400/15 via-blue-400/10 to-transparent',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(34,211,238,0.2)',
  },
  {
    icon: ServerCog,
    accent: 'from-emerald-400/15 via-teal-400/10 to-transparent',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(52,211,153,0.2)',
  },
  {
    icon: Code2,
    accent: 'from-violet-400/15 via-fuchsia-400/10 to-transparent',
    gradient: 'from-violet-500 to-fuchsia-500',
    glow: 'rgba(167,139,250,0.2)',
  },
];

const ExperienceCard = ({ exp, index }: { key?: React.Key; exp: typeof EXPERIENCES[0]; index: number }) => {
  const meta = EXP_META[index % EXP_META.length];
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '50px' }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 120, damping: 20 }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/60 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />

      {/* Animated Corner Glow */}
      <motion.div
        className="absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl pointer-events-none"
        style={{ background: meta.glow }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
              <CalendarDays className="w-3 h-3" />
              {exp.period}
            </span>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight leading-snug">
              {exp.role}
            </h3>
            <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              {exp.company}
            </p>
          </div>

          {/* Colored Icon Badge */}
          <motion.div
            className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${meta.gradient} shadow-lg shrink-0`}
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ transform: 'translateZ(16px)' }}
          >
            <Icon className="w-5 h-5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200/80 dark:bg-white/8 mb-5" />

        {/* Description */}
        <ul className="space-y-3">
          {exp.description.map((item, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + j * 0.06 }}
              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ exp, index }: { key?: React.Key; exp: typeof EXPERIENCES[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const leftX  = useTransform(scrollYProgress, [0, 0.6], [-30, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.6], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">

      {/* Left */}
      <motion.div style={{ opacity, x: leftX }} className="hidden md:block">
        {isEven ? <ExperienceCard exp={exp} index={index} /> : <div />}
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center pt-7">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: index * 0.1 }}
          className="relative z-10 shrink-0"
        >
          {/* Outer pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.35, ease: 'easeInOut' }}
          />
          {/* Floating dot */}
          <motion.div
            className="relative w-4 h-4 rounded-full bg-primary shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
          />
        </motion.div>
      </div>

      {/* Right */}
      <motion.div style={{ opacity, x: rightX }} className="hidden md:block">
        {!isEven ? <ExperienceCard exp={exp} index={index} /> : <div />}
      </motion.div>

      {/* Mobile */}
      <div className="md:hidden col-span-full pl-6 border-l-2 border-primary/20 relative">
        <div className="absolute -left-[5px] top-7 w-2.5 h-2.5 rounded-full bg-primary" />
        <ExperienceCard exp={exp} index={index} />
      </div>
    </div>
  );
};

export const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start center', 'end center'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">

      {/* Animated Background Blobs — same as About */}
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

      {/* Floating Particles — same as About */}
      <FloatingParticle delay={0}   duration={6}   x="8%"  y="15%" />
      <FloatingParticle delay={1}   duration={7}   x="88%" y="25%" />
      <FloatingParticle delay={2}   duration={8}   x="20%" y="75%" />
      <FloatingParticle delay={1.5} duration={6.5} x="75%" y="80%" />
      <FloatingParticle delay={0.5} duration={7.5} x="50%" y="10%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading title="Build Journey" subtitle="Experience" icon={Briefcase} />

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-14"
        >
          <a
            href="/resume.pdf"
            download="Mostafa_Nagedy_Resume.pdf"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-sm font-semibold hover:border-primary/50 hover:text-primary dark:hover:border-primary/50 dark:hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            Download Resume
          </a>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/8 -translate-x-1/2 hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/20"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {EXPERIENCES.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
