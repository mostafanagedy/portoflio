import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink as ExternalLinkIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CERTIFICATES } from '../data';
import { Skeleton } from '../components/Skeleton';

const ITEMS_PER_PAGE = 6;

const CARD_ACCENTS = [
  { accent: 'from-cyan-400/15 via-blue-400/10 to-transparent',     gradient: 'from-cyan-500 to-blue-500',       glow: 'rgba(34,211,238,0.2)'   },
  { accent: 'from-emerald-400/15 via-teal-400/10 to-transparent',  gradient: 'from-emerald-500 to-teal-500',    glow: 'rgba(52,211,153,0.2)'   },
  { accent: 'from-violet-400/15 via-fuchsia-400/10 to-transparent',gradient: 'from-violet-500 to-fuchsia-500',  glow: 'rgba(167,139,250,0.2)'  },
  { accent: 'from-amber-300/15 via-orange-300/10 to-transparent',  gradient: 'from-amber-500 to-orange-500',   glow: 'rgba(251,191,36,0.2)'   },
  { accent: 'from-rose-400/15 via-pink-400/10 to-transparent',     gradient: 'from-rose-500 to-pink-500',      glow: 'rgba(251,113,133,0.2)'  },
  { accent: 'from-sky-400/15 via-indigo-400/10 to-transparent',    gradient: 'from-sky-500 to-indigo-500',     glow: 'rgba(56,189,248,0.2)'   },
];

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
      className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
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

const CertificateCard = ({
  cert,
  index,
  globalIndex,
  onOpen,
}: {
  cert: typeof CERTIFICATES[0];
  index: number;
  globalIndex: number;
  onOpen: (idx: number) => void;
  key?: React.Key;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const color = CARD_ACCENTS[globalIndex % CARD_ACCENTS.length];

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 7, y: (px - 0.5) * 9, glowX: px * 100, glowY: py * 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '50px' }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 120, damping: 20 }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 }); }}
      onMouseMove={handleMove}
      className="group relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/60 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden flex flex-col"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />

      {/* Animated Corner Glow */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: color.glow }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4 + (globalIndex % 3), repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mouse Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(59,130,246,0.15), transparent 50%)`,
        }}
      />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {!isImageLoaded && <Skeleton className="absolute inset-0 w-full h-full z-10" />}
        <img
          src={cert.image}
          alt={cert.title}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
          decoding="async"
          width={1280}
          height={720}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

        {/* Issuer Badge */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <motion.div
            className={`px-2.5 py-1 rounded-lg bg-gradient-to-r ${color.gradient} shadow-lg`}
            style={{ transform: 'translateZ(12px)' }}
          >
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{cert.issuer}</span>
          </motion.div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{cert.date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 sm:p-6 flex-grow flex flex-col">
        <button
          type="button"
          onClick={() => onOpen(globalIndex)}
          className="text-left text-base font-bold mb-1 text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-snug"
        >
          {cert.title}
        </button>

        <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-white/8 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400">ID: {cert.id.slice(0, 16)}</span>
          <button
            type="button"
            onClick={() => onOpen(globalIndex)}
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Open PDF <ExternalLinkIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [issuerFilter, setIssuerFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [page, setPage] = useState(1);

  const issuers = useMemo(() => ['all', ...Array.from(new Set(CERTIFICATES.map((c) => c.issuer)))], []);

  const filteredCertificates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const list = CERTIFICATES.filter((cert) => {
      const matchesQuery =
        !normalizedQuery ||
        cert.title.toLowerCase().includes(normalizedQuery) ||
        cert.issuer.toLowerCase().includes(normalizedQuery) ||
        cert.id.toLowerCase().includes(normalizedQuery);
      const matchesIssuer = issuerFilter === 'all' || cert.issuer === issuerFilter;
      return matchesQuery && matchesIssuer;
    });

    const parseDate = (v: string) => { const p = Date.parse(v); return isNaN(p) ? 0 : p; };
    return [...list].sort((a, b) => {
      if (sortBy === 'date-asc')   return parseDate(a.date) - parseDate(b.date);
      if (sortBy === 'title-asc')  return a.title.localeCompare(b.title);
      if (sortBy === 'issuer-asc') return a.issuer.localeCompare(b.issuer);
      return parseDate(b.date) - parseDate(a.date);
    });
  }, [query, issuerFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filteredCertificates.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const activeCert = activeIndex !== null ? filteredCertificates[activeIndex] : null;

  const closeViewer = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((p) => p === null ? null : (p - 1 + filteredCertificates.length) % filteredCertificates.length);
  const goNext = () => setActiveIndex((p) => p === null ? null : (p + 1) % filteredCertificates.length);

  useEffect(() => { setPage(1); }, [query, issuerFilter, sortBy]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  useEffect(() => {
    if (activeIndex !== null && activeIndex > filteredCertificates.length - 1) setActiveIndex(0);
  }, [activeIndex, filteredCertificates]);

  useEffect(() => {
    if (!activeCert) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [activeCert, filteredCertificates.length]);

  const inputClass = 'w-full rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary/50 transition-colors';

  return (
    <>
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
          <SectionHeading title="Certifications" subtitle="Achievements" icon={Award} />

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/60 backdrop-blur-xl p-4 sm:p-5 mb-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative grid gap-3 sm:gap-4 md:grid-cols-3">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, issuer, or ID..." className={inputClass} />
              <select value={issuerFilter} onChange={(e) => setIssuerFilter(e.target.value)} className={inputClass}>
                {issuers.map((issuer) => (
                  <option key={issuer} value={issuer} className="bg-white dark:bg-slate-900">
                    {issuer === 'all' ? 'All Providers' : issuer}
                  </option>
                ))}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={inputClass}>
                <option value="date-desc" className="bg-white dark:bg-slate-900">Newest First</option>
                <option value="date-asc"  className="bg-white dark:bg-slate-900">Oldest First</option>
                <option value="title-asc" className="bg-white dark:bg-slate-900">Title A-Z</option>
                <option value="issuer-asc"className="bg-white dark:bg-slate-900">Provider A-Z</option>
              </select>
            </div>
            <p className="relative mt-3 text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredCertificates.length} of {CERTIFICATES.length} certificates
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((cert, i) => (
              <CertificateCard
                key={`${cert.id}-${i}`}
                cert={cert}
                index={i}
                globalIndex={(currentPage - 1) * ITEMS_PER_PAGE + i}
                onOpen={setActiveIndex}
              />
            ))}
          </div>

          {!filteredCertificates.length && (
            <div className="text-center py-14">
              <p className="text-slate-500 dark:text-slate-400 text-sm">No certificates match your current filters.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredCertificates.length > ITEMS_PER_PAGE && (
            <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-slate-500 dark:text-slate-400">Page {currentPage} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-primary/50 hover:text-primary transition-colors disabled:opacity-40">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-primary/50 hover:text-primary transition-colors disabled:opacity-40">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="h-full max-w-6xl mx-auto rounded-2xl border border-white/10 bg-slate-900/90 overflow-hidden flex flex-col"
            >
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-white truncate">{activeCert.title}</h3>
                  <p className="text-[11px] text-slate-400">{activeIndex! + 1} / {filteredCertificates.length}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={activeCert.link} target="_blank" rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
                    Open Tab
                  </a>
                  <button type="button" onClick={closeViewer}
                    className="p-2 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors"
                    aria-label="Close certificate viewer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 min-h-0">
                <iframe key={activeCert.link} src={`${activeCert.link}#toolbar=1&navpanes=0&view=FitH`}
                  title={activeCert.title} className="w-full h-full bg-white" />
              </div>

              <div className="px-4 sm:px-6 py-3 border-t border-white/10 flex items-center justify-between">
                <button type="button" onClick={goPrev}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-slate-100 hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button type="button" onClick={goNext}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-slate-100 hover:bg-white/10 transition-colors">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
