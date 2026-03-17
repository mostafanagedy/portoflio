import React from 'react';
import { motion } from 'motion/react';
import { User, Terminal, Cpu, Globe, Layers } from 'lucide-react';

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

export const About = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title="About Me" subtitle="Introduction" icon={User} />
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-blue-950 dark:text-white">I'm a Developer who loves to build things for the web.</h3>
            <p className="text-blue-700/80 dark:text-slate-400 leading-relaxed">
              My journey in tech began over 5 years ago when I first discovered the power of code to bring ideas to life. Since then, I've worked with startups and established companies to build scalable, user-centric applications.
            </p>
            <p className="text-blue-700/80 dark:text-slate-400 leading-relaxed">
              I believe that great software is the result of a deep understanding of user needs, combined with technical excellence and a passion for detail. I'm always looking for new challenges and opportunities to learn and grow.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <p className="text-primary font-semibold text-2xl">20+</p>
                <p className="text-sm text-blue-500">Happy Clients</p>
              </div>
              <div>
                <p className="text-secondary font-semibold text-2xl">100%</p>
                <p className="text-sm text-blue-500">Job Success</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { icon: Terminal, title: "Clean Code", desc: "Writing maintainable, readable code." },
              { icon: Cpu, title: "Performance", desc: "Optimizing for speed and efficiency." },
              { icon: Globe, title: "Scalability", desc: "Building systems that grow with you." },
              { icon: Layers, title: "Modern UI", desc: "Crafting beautiful, intuitive interfaces." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl glass border border-slate-200/50 dark:border-white/5 hover:border-primary/30 transition-all group">
                <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-2 text-blue-950 dark:text-white">{item.title}</h4>
                <p className="text-xs text-blue-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
