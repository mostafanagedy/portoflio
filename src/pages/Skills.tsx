import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Atom,
  Boxes,
  Code2,
  Database,
  GitBranch,
  Github,
  Globe,
  Layers,
  MonitorSmartphone,
  Move3d,
  PenTool,
  Send,
  Server,
  ServerCog,
  Share2,
  Sparkles,
  SquareCode,
  Triangle,
  WandSparkles,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SKILLS } from '../data';

const SectionHeading = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: any;
}) => (
  <div className="mb-12 md:mb-16 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
    >
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-xs font-bold uppercase tracking-widest text-primary">
        {subtitle}
      </span>
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

const SKILL_ICON_MAP: Record<string, { icon: LucideIcon; tone: string; level: number }> = {
  React: { icon: Atom, tone: 'text-cyan-400', level: 90 },
  TypeScript: { icon: SquareCode, tone: 'text-sky-400', level: 85 },
  JavaScript: { icon: Code2, tone: 'text-yellow-300', level: 90 },
  'Tailwind CSS': { icon: Wind, tone: 'text-cyan-300', level: 95 },
  Bootstrap: { icon: Layers, tone: 'text-violet-300', level: 80 },
  'Framer Motion': { icon: Move3d, tone: 'text-fuchsia-400', level: 80 },
  'Node.js': { icon: Server, tone: 'text-emerald-400', level: 78 },
  'Express.js': { icon: ServerCog, tone: 'text-slate-200', level: 72 },
  MongoDB: { icon: Database, tone: 'text-emerald-300', level: 74 },
  Mongoose: { icon: Database, tone: 'text-rose-300', level: 70 },
  JWT: { icon: Share2, tone: 'text-amber-300', level: 70 },
  'REST APIs': { icon: Share2, tone: 'text-pink-400', level: 78 },
  'React Router': { icon: GitBranch, tone: 'text-red-300', level: 84 },
  'Radix UI': { icon: Boxes, tone: 'text-indigo-300', level: 72 },
  Zustand: { icon: Atom, tone: 'text-orange-300', level: 75 },
  i18next: { icon: Globe, tone: 'text-blue-300', level: 68 },
  'Shadcn UI': { icon: Sparkles, tone: 'text-slate-100', level: 76 },
  Git: { icon: GitBranch, tone: 'text-orange-300', level: 92 },
  GitHub: { icon: Github, tone: 'text-slate-100', level: 88 },
  Postman: { icon: Send, tone: 'text-orange-400', level: 85 },
  Vercel: { icon: Triangle, tone: 'text-slate-100', level: 90 },
  Figma: { icon: PenTool, tone: 'text-pink-300', level: 82 },
};

const GROUP_META: Record<
  string,
  { icon: LucideIcon; accent: string; label: string; gradient: string }
> = {
  Frontend: {
    icon: MonitorSmartphone,
    accent: 'from-cyan-400/15 via-blue-400/10 to-transparent',
    label: 'UI, motion, components',
    gradient: 'from-cyan-500 to-blue-500',
  },
  Backend: {
    icon: ServerCog,
    accent: 'from-emerald-400/15 via-teal-400/10 to-transparent',
    label: 'APIs, data, logic',
    gradient: 'from-emerald-500 to-teal-500',
  },
  'State & UI': {
    icon: Layers,
    accent: 'from-violet-400/15 via-fuchsia-400/10 to-transparent',
    label: 'Routing, state, UI kits',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  Tools: {
    icon: WandSparkles,
    accent: 'from-amber-300/15 via-orange-300/10 to-transparent',
    label: 'Versioning, testing, delivery',
    gradient: 'from-amber-500 to-orange-500',
  },
};

type SkillBadgeProps = {
  key?: React.Key;
  skill: string;
  delay: number;
};

const SkillBadge = ({ skill, delay }: SkillBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const entry = SKILL_ICON_MAP[skill] ?? { icon: Code2, tone: 'text-primary', level: 70 };
  const Icon = entry.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ delay: delay * 0.05, type: 'spring', stiffness: 200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className="group relative flex items-center gap-3 rounded-2xl bg-slate-700/90 dark:bg-slate-800/90 text-white px-4 py-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.3)] border border-white/10 overflow-hidden cursor-pointer"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Skill Level Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        whileInView={{ width: `${entry.level}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
      />

      {/* Icon Container */}
      <motion.span
        aria-hidden="true"
        animate={{
          y: isHovered ? -2 : [0, -2, 0],
          rotate: isHovered ? 12 : [0, 8, 0],
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          y: { duration: isHovered ? 0.2 : 4.5 + delay, repeat: isHovered ? 0 : Infinity, ease: 'easeInOut' },
          rotate: { duration: isHovered ? 0.2 : 4.5 + delay, repeat: isHovered ? 0 : Infinity, ease: 'easeInOut' },
          scale: { duration: 0.2 },
        }}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 border border-white/20 shadow-inner"
        style={{ transform: 'translateZ(20px)' }}
      >
        <Icon className={`w-5 h-5 ${entry.tone} drop-shadow-[0_4px_8px_rgba(255,255,255,0.2)]`} />
        
        {/* Sparkle Effect on Hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>
        )}
      </motion.span>

      {/* Skill Name */}
      <span className="relative z-10 text-sm font-semibold tracking-wide">{skill}</span>

      {/* Skill Level Badge */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        className="ml-auto text-xs font-bold text-primary bg-white/20 px-2 py-0.5 rounded-full"
      >
        {entry.level}%
      </motion.span>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: isHovered ? ['-100%', '200%'] : '-100%',
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
};

const FloatingParticle = ({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-primary/30"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export const Skills = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Particles */}
      <FloatingParticle delay={0} duration={6} x="10%" y="20%" />
      <FloatingParticle delay={1} duration={7} x="85%" y="30%" />
      <FloatingParticle delay={2} duration={8} x="25%" y="70%" />
      <FloatingParticle delay={1.5} duration={6.5} x="70%" y="80%" />
      <FloatingParticle delay={0.5} duration={7.5} x="50%" y="15%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading title="My Expertise" subtitle="Skills" icon={Code2} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 overflow-visible">
          {SKILLS.map((skillGroup, i) => {
            const meta = GROUP_META[skillGroup.name] ?? GROUP_META.Frontend;
            const GroupIcon = meta.icon;

            return (
              <motion.div
                key={skillGroup.name}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 100, damping: 20 }}
                whileHover={{ y: -12, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative overflow-visible group"
              >
                {/* Floating Icon Badge */}
                <motion.div
                  className="absolute -top-6 -right-6 sm:-top-7 sm:-right-7 z-20 h-20 w-20 sm:h-24 sm:w-24 rounded-[1.5rem] bg-white/95 dark:bg-slate-950/90 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(37,99,235,0.25)] flex items-center justify-center"
                  animate={{
                    rotate: [12, 18, 12],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.1,
                    y: -5,
                  }}
                >
                  <motion.div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <GroupIcon className="w-7 h-7 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
                  </motion.div>
                </motion.div>

                {/* Card Container */}
                <motion.div
                  className="relative min-h-[380px] rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/60 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl overflow-hidden"
                  whileHover={{
                    boxShadow: '0 30px 100px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Animated Glow */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/40 blur-3xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Content */}
                  <div className="relative h-full p-7 sm:p-8 pt-16 flex flex-col">
                    <div className="mb-6">
                      <motion.p
                        className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/90"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.2 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </motion.p>
                      <motion.h3
                        className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3 }}
                      >
                        {skillGroup.name}
                      </motion.h3>
                      <motion.p
                        className="mt-2 text-sm text-slate-600 dark:text-slate-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.4 }}
                      >
                        {meta.label}
                      </motion.p>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid gap-3 flex-1 content-start">
                      {skillGroup.items.map((skill, index) => (
                        <SkillBadge key={skill} skill={skill} delay={index} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
