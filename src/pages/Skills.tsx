import React from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { SKILLS } from '../data';

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

export const Skills = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <SectionHeading title="My Expertise" subtitle="Skills" icon={Code2} />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SKILLS.map((skillGroup, i) => (
                        <motion.div
                            key={skillGroup.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 sm:p-8 rounded-3xl glass border-t-2 border-t-primary/10"
                        >
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-950 dark:text-white">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {skillGroup.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-white/5 text-xs font-medium text-blue-700 dark:text-slate-300 border border-blue-100 dark:border-white/5 hover:border-primary/30 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
