import React from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { EXPERIENCES } from '../data';

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

export const Experience = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Work History" subtitle="Experience" icon={Briefcase} />
        
        <div className="max-w-4xl mx-auto space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800 md:left-1/2 md:-ml-px" />
              
              <div className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right">
                  <div className={`p-6 sm:p-8 rounded-3xl glass border border-blue-100 dark:border-white/5 w-full ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-xs font-semibold text-primary mb-2 block tracking-wider uppercase">{exp.period}</span>
                    <h3 className="text-xl font-semibold mb-1 tracking-tight text-blue-950 dark:text-white">{exp.role}</h3>
                    <p className="text-blue-600 dark:text-slate-400 font-medium mb-4">{exp.company}</p>
                    <ul className="space-y-3">
                      {exp.description.map((item, j) => (
                        <li key={j} className="text-sm text-blue-700/80 dark:text-slate-400 flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] top-8 w-2 h-2 rounded-full bg-primary md:left-1/2 md:ml-[-4px]" />
                
                <div className="md:w-1/2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
