import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, Globe, Github, MessageSquare, Mail,
  CheckCircle, AlertCircle, Loader2, MapPin, Clock,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

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
    animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const INFO_CARDS = [
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/mostafanagedy',
    href: 'https://github.com/mostafanagedy',
    accent: 'from-slate-400/15 via-slate-300/10 to-transparent',
    gradient: 'from-slate-600 to-slate-800',
    glow: 'rgba(100,116,139,0.25)',
  },
  {
    icon: Globe,
    label: 'Portfolio',
    value: 'mostafacodes.com',
    href: 'https://mostafacodes.com',
    accent: 'from-cyan-400/15 via-blue-400/10 to-transparent',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(34,211,238,0.25)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Egypt — Remote Friendly',
    href: '#',
    accent: 'from-emerald-400/15 via-teal-400/10 to-transparent',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(52,211,153,0.25)',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Open to freelance & collab',
    href: '#',
    accent: 'from-amber-300/15 via-orange-300/10 to-transparent',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(251,191,36,0.25)',
  },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || status === 'loading') return;
    setStatus('loading');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

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
      <FloatingParticle delay={0}   duration={6}   x="8%"  y="15%" />
      <FloatingParticle delay={1}   duration={7}   x="88%" y="25%" />
      <FloatingParticle delay={2}   duration={8}   x="20%" y="75%" />
      <FloatingParticle delay={1.5} duration={6.5} x="75%" y="80%" />
      <FloatingParticle delay={0.5} duration={7.5} x="50%" y="10%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading title="Get In Touch" subtitle="Contact" icon={Send} />

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-14">

          {/* ── Left — Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white leading-snug mb-3"
              >
                Let&apos;s build something{' '}
                <span className="text-primary">polished</span> and{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  useful.
                </span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 dark:text-slate-400 leading-relaxed"
              >
                For collaborations, freelance work, or portfolio feedback — fill the form and I&apos;ll reply within 24 hours.
              </motion.p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {INFO_CARDS.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`${card.label}: ${card.value}`}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '50px' }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 120, damping: 20 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/60 shadow-[0_4px_24px_rgba(15,23,42,0.07)] backdrop-blur-xl overflow-hidden p-4 cursor-pointer"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />

                  {/* Corner Glow */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl pointer-events-none"
                    style={{ background: card.glow }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <div className="relative">
                    <motion.div
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${card.gradient} shadow-md mb-3`}
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <card.icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">{card.label}</p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-primary transition-colors leading-snug">{card.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/60 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-violet-500/5 pointer-events-none" />

            {/* Corner Glow */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-primary/10"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center min-h-[360px] text-center gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-slate-950 dark:text-white">Message Sent!</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-xs font-bold text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          Name <span className="text-primary">*</span>
                        </label>
                        <input id="contact-name" type="text" name="from_name" autoComplete="name" required className={inputClass} placeholder="Your name" />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          Email <span className="text-primary">*</span>
                        </label>
                        <input id="contact-email" type="email" name="from_email" autoComplete="email" required className={inputClass} placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Subject</label>
                      <input id="contact-subject" type="text" name="subject" className={inputClass} placeholder="Project inquiry" />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea id="contact-message" name="message" rows={4} required className={`${inputClass} resize-none`} placeholder="Tell me about the project, timeline, and goals..." />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Something went wrong. Please try again.
                      </motion.div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-slate-200/80 dark:bg-white/8" />

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.5)]"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
