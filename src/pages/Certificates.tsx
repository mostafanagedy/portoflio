import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink as ExternalLinkIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CERTIFICATES } from '../data';
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
      className="text-3xl sm:text-4xl md:text-5xl font-bold"
    >
      {title}
    </motion.h2>
  </div>
);

const CertificateCard = ({
  cert,
  index,
  onOpen
}: {
  cert: typeof CERTIFICATES[0],
  index: number,
  onOpen: (idx: number) => void,
  key?: React.Key
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - py) * 7,
      y: (px - 0.5) * 9,
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative rounded-[2rem] overflow-hidden glass border-t-2 border-t-primary/20 hover:border-primary/50 transition-all group flex flex-col will-change-transform"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
      }}
      onMouseMove={handleMove}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.012 : 1})`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(59,130,246,0.2), transparent 46%)`,
        }}
      />
      <div className="relative aspect-video overflow-hidden">
        {!isImageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full z-10" />
        )}
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
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center">
          <div className="p-2 bg-primary/20 backdrop-blur-md rounded-lg">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{cert.date}</span>
        </div>
      </div>
      <div className="p-6 sm:p-8 flex-grow flex flex-col">
        <button
          type="button"
          onClick={() => onOpen(index)}
          className="text-left text-xl font-bold mb-2 group-hover:text-primary hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary decoration-2 underline-offset-4"
        >
          {cert.title}
        </button>
        <p className="text-sm text-slate-400 mb-6">{cert.issuer}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-[10px] font-mono text-slate-500">ID: {cert.id}</span>
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="text-primary hover:underline flex items-center gap-1 text-xs font-bold"
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

  const issuers = useMemo(
    () => ['all', ...Array.from(new Set(CERTIFICATES.map((c) => c.issuer)))],
    []
  );

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

    const parseDate = (value: string) => {
      const parsed = Date.parse(value);
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'date-asc') return parseDate(a.date) - parseDate(b.date);
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'issuer-asc') return a.issuer.localeCompare(b.issuer);
      return parseDate(b.date) - parseDate(a.date);
    });

    return sorted;
  }, [query, issuerFilter, sortBy]);

  const activeCert = activeIndex !== null ? filteredCertificates[activeIndex] : null;

  const closeViewer = () => setActiveIndex(null);
  const openViewer = (idx: number) => setActiveIndex(idx);
  const goPrev = () => setActiveIndex((prev) => (prev === null ? null : (prev - 1 + filteredCertificates.length) % filteredCertificates.length));
  const goNext = () => setActiveIndex((prev) => (prev === null ? null : (prev + 1) % filteredCertificates.length));

  useEffect(() => {
    if (activeIndex === null) return;
    if (!filteredCertificates.length) {
      setActiveIndex(null);
      return;
    }
    if (activeIndex > filteredCertificates.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, filteredCertificates]);

  useEffect(() => {
    if (!activeCert) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCert, filteredCertificates.length]);

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Certifications" subtitle="Achievements" icon={Award} />

          <div className="glass rounded-2xl p-4 sm:p-5 mb-8 border border-white/10">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, issuer, or ID..."
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary/50"
              />
              <select
                value={issuerFilter}
                onChange={(e) => setIssuerFilter(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary/50"
              >
                {issuers.map((issuer) => (
                  <option key={issuer} value={issuer} className="bg-slate-900 text-slate-100">
                    {issuer === 'all' ? 'All Providers' : issuer}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary/50"
              >
                <option value="date-desc" className="bg-slate-900 text-slate-100">Newest First</option>
                <option value="date-asc" className="bg-slate-900 text-slate-100">Oldest First</option>
                <option value="title-asc" className="bg-slate-900 text-slate-100">Title A-Z</option>
                <option value="issuer-asc" className="bg-slate-900 text-slate-100">Provider A-Z</option>
              </select>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Showing {filteredCertificates.length} of {CERTIFICATES.length} certificates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert, i) => (
              <CertificateCard key={`${cert.id}-${i}`} cert={cert} index={i} onOpen={openViewer} />
            ))}
          </div>

          {!filteredCertificates.length && (
            <div className="text-center py-14">
              <p className="text-slate-300 text-sm">No certificates match your current filters.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md p-3 sm:p-6"
          >
            <div className="h-full max-w-6xl mx-auto rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden flex flex-col">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-white truncate">{activeCert.title}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    {activeIndex! + 1} / {filteredCertificates.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeCert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Open Tab
                  </a>
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="p-2 rounded-lg border border-white/15 text-white hover:bg-white/10"
                    aria-label="Close certificate viewer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 min-h-0">
                <iframe
                  key={activeCert.link}
                  src={`${activeCert.link}#toolbar=1&navpanes=0&view=FitH`}
                  title={activeCert.title}
                  className="w-full h-full bg-white"
                />
              </div>

              <div className="px-4 sm:px-6 py-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-slate-100 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-slate-100 hover:bg-white/10 transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

