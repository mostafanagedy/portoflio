import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Github, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { PROJECTS } from '../data';
import { Skeleton } from '../components/Skeleton';

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

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0], index: number, key?: React.Key }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - py) * 8,
      y: (px - 0.5) * 10,
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative rounded-3xl overflow-hidden glass border-slate-200/50 dark:border-white/5 hover:border-primary/30 transition-all will-change-transform"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
      }}
      onMouseMove={handleMove}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.015 : 1})`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(96,165,250,0.22), transparent 45%)`,
        }}
      />
      <div className="relative aspect-[4/3] overflow-hidden">
        {!isImageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full z-10" />
        )}
        <img 
          src={project.image} 
          alt={project.title} 
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
          decoding="async"
          width={1200}
          height={900}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div className="flex gap-2">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white border border-slate-200/50 dark:border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors text-blue-950 dark:text-white">{project.title}</h3>
        <p className="text-sm text-blue-700/80 dark:text-slate-400 mb-6 line-clamp-2">{project.description}</p>
        <div className="flex items-center gap-4">
          <a href={project.link} className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
            Live Demo <ExternalLinkIcon className="w-3 h-3" />
          </a>
          <a href={project.github} className="flex items-center gap-2 text-xs font-semibold text-blue-500 dark:text-slate-400 hover:text-primary transition-colors">
            Source Code <Github className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const availableTags = ['all', ...Array.from(new Set(PROJECTS.flatMap((project) => project.tags)))];

  const filteredProjects = [...PROJECTS]
    .filter((project) => {
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      const matchesTag = tagFilter === 'all' || project.tags.includes(tagFilter);
      return matchesQuery && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      return 0; // featured/original order
    });

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Featured Projects" subtitle="Portfolio" icon={Layers} />

        <div className="glass rounded-2xl p-4 sm:p-5 mb-8 border border-white/10">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, stack, or keyword..."
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary/50"
            />
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary/50"
            >
              {availableTags.map((tag) => (
                <option key={tag} value={tag} className="bg-slate-900 text-slate-100">
                  {tag === 'all' ? 'All Stacks' : tag}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary/50"
            >
              <option value="featured" className="bg-slate-900 text-slate-100">Featured First</option>
              <option value="title-asc" className="bg-slate-900 text-slate-100">Title A-Z</option>
              <option value="title-desc" className="bg-slate-900 text-slate-100">Title Z-A</option>
            </select>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Showing {filteredProjects.length} of {PROJECTS.length} projects
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        {!filteredProjects.length && (
          <div className="text-center py-14">
            <p className="text-slate-300 text-sm">No projects match your current filters.</p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            data-magnetic="true"
            className="px-8 py-4 rounded-xl border border-blue-100 dark:border-white/10 font-medium hover:bg-blue-50 dark:hover:bg-white/5 transition-all inline-flex items-center gap-2 text-blue-900 dark:text-white"
          >
            View All Projects on GitHub <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

