import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, Send, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { RECOMMENDATIONS, Recommendation } from '../data';

export const Recommendations = () => {
  const [visitorRecs, setVisitorRecs] = useState<Recommendation[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClass = 'w-full rounded-2xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900/60 px-5 py-4 text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none';
  const labelClass = 'ml-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-400';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRec: Recommendation = {
        ...formData,
        name: formData.name.trim(),
        role: formData.role.trim(),
        company: formData.company.trim(),
        content: formData.content.trim(),
        image: `https://picsum.photos/seed/${formData.name}/200/200`
      };
      setVisitorRecs([newRec, ...visitorRecs]);
      setFormData({ name: '', role: '', company: '', content: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const allRecommendations = [...visitorRecs, ...RECOMMENDATIONS];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_40%),linear-gradient(to_bottom,rgba(15,23,42,0.03),transparent)] dark:bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_40%),linear-gradient(to_bottom,rgba(15,23,42,0.18),transparent)]" />
      <div className="pointer-events-none absolute left-10 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 text-center md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Recommendations</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white"
          >
            Professional Feedback
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base"
          >
            Clear, specific feedback from people who reviewed my work and collaboration style.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {allRecommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)] dark:border-white/10 dark:bg-slate-950/70 dark:shadow-[0_18px_60px_rgba(2,6,23,0.35)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-cyan-400 opacity-80" />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100 dark:bg-primary/20" />
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Quote className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                  Verified
                </span>
              </div>
              
              <p className="flex-grow text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {rec.content}
              </p>
              
              <div className="mt-6 flex items-center gap-4 border-t border-slate-200/70 pt-5 dark:border-white/10">
                <img 
                  src={rec.image} 
                  alt={rec.name} 
                  loading="lazy"
                  decoding="async"
                  width={80}
                  height={80}
                  sizes="40px"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-semibold text-slate-950 dark:text-white">{rec.name}</h4>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary/80">
                    {rec.role} {rec.company ? `@ ${rec.company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visitor Comment Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-4xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 dark:shadow-[0_24px_80px_rgba(2,6,23,0.35)] sm:p-8 md:p-10"
        >
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl">Share a Professional Recommendation</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Your feedback helps recruiters and partners understand the value of our collaboration.</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-500/20 dark:bg-emerald-900/20">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Respectful and verified feedback only</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={inputClass}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Role / Title</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className={inputClass}
                  placeholder="e.g. Engineering Manager"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Company (Optional)</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClass}
                placeholder="e.g. TechCorp"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className={labelClass}>Recommendation</label>
                <span className="text-[11px] text-slate-500">{formData.content.length}/600</span>
              </div>
              <textarea
                required
                maxLength={600}
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className={`${inputClass} resize-none`}
                placeholder="Describe your experience working with Mostafa, results delivered, and strengths you observed."
              />
              <p className="ml-1 text-xs text-slate-500">
                Tip: specific outcomes make testimonials stronger.
              </p>
            </div>
              <button 
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.content.trim()}
                data-magnetic="true"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-5 font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-50"
              >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                  Submitting Recommendation...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Submit Recommendation
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

