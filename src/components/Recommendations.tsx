import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, Send, MessageSquare, ShieldCheck } from 'lucide-react';
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
    <section className="py-16 md:py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Achievements</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4"
          >
            Recommendations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-blue-700/70 dark:text-slate-400 max-w-2xl mx-auto"
          >
            What people say about working with me.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {allRecommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 sm:p-8 rounded-3xl relative group hover:border-primary/30 transition-all flex flex-col"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform">
                <Quote className="w-5 h-5 text-white" />
              </div>
              
              <p className="text-blue-800/80 dark:text-slate-300 italic mb-8 flex-grow leading-relaxed text-sm">
                "{rec.content}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50 dark:border-white/5">
                <img 
                  src={rec.image} 
                  alt={rec.name} 
                  loading="lazy"
                  decoding="async"
                  width={80}
                  height={80}
                  sizes="40px"
                  className="w-10 h-10 rounded-full object-cover border border-primary/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-semibold text-sm text-blue-950 dark:text-white">{rec.name}</h4>
                  <p className="text-[10px] text-blue-500 uppercase tracking-wider font-medium">
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
          className="max-w-3xl mx-auto glass p-5 sm:p-8 md:p-10 rounded-3xl border-slate-200/50 dark:border-white/5"
        >
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-blue-950 dark:text-white">Share a Professional Recommendation</h3>
                <p className="text-sm text-blue-700/70 dark:text-slate-400">Your feedback helps recruiters and partners understand the value of our collaboration.</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Respectful and verified feedback only</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-slate-500 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all text-blue-900 dark:text-white"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-slate-500 ml-1">Role / Title</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all text-blue-900 dark:text-white"
                  placeholder="e.g. Engineering Manager"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-slate-500 ml-1">Company (Optional)</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all text-blue-900 dark:text-white"
                placeholder="e.g. TechCorp"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-slate-500 ml-1">Recommendation</label>
                <span className="text-[11px] text-blue-500/90 dark:text-slate-500">{formData.content.length}/600</span>
              </div>
              <textarea 
                required
                maxLength={600}
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all resize-none text-blue-900 dark:text-white"
                placeholder="Describe your experience working with Mostafa, results delivered, and strengths you observed."
              />
              <p className="text-xs text-blue-600/80 dark:text-slate-500 ml-1">
                Tip: specific outcomes make testimonials stronger.
              </p>
            </div>
              <button 
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.content.trim()}
                data-magnetic="true"
                className="w-full py-5 rounded-xl bg-primary text-white font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
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

