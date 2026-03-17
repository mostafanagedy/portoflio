import React from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Globe, Linkedin } from 'lucide-react';

const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
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

export const Contact = () => {
  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/75 dark:bg-slate-900/45 border border-slate-300/75 dark:border-white/15 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-blue-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500";

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Get In Touch" subtitle="Contact" icon={Send} />
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 text-blue-950 dark:text-white">Let's build something amazing together.</h3>
            <p className="text-blue-700/80 dark:text-slate-400 mb-8">
              Whether you have a specific project in mind or just want to chat about tech, I'm always open to new conversations.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@devfolio.com" },
                { icon: Globe, label: "Location", value: "San Francisco, CA" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/devfolio" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl glass border border-blue-100 dark:border-white/5 text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-500 uppercase font-semibold tracking-widest">{item.label}</p>
                    <p className="font-medium text-blue-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 rounded-3xl glass border border-blue-100 dark:border-white/5"
          >
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Name</label>
                  <input type="text" className={inputClass} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Email</label>
                  <input type="email" className={inputClass} placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Subject</label>
                <input type="text" className={inputClass} placeholder="Project Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Message</label>
                <textarea rows={4} className={`${inputClass} resize-none`} placeholder="Tell me about your project..." />
              </div>
              <button data-magnetic="true" className="w-full py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
