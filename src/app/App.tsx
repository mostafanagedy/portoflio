import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useTheme } from '@/shared/hooks/useTheme';
import { Skeleton } from '@/components/Skeleton';

const Home = React.lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })));
const About = React.lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Skills = React.lazy(() => import('@/pages/Skills').then((m) => ({ default: m.Skills })));
const Experience = React.lazy(() =>
  import('@/pages/Experience').then((m) => ({ default: m.Experience }))
);
const Projects = React.lazy(() =>
  import('@/pages/Projects').then((m) => ({ default: m.Projects }))
);
const Certificates = React.lazy(() =>
  import('@/pages/Certificates').then((m) => ({ default: m.Certificates }))
);
const Contact = React.lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));

export default function App() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [error, setError] = useState<Error | null>(null);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950">
        <Skeleton className="w-48 h-8" />
      </div>
    );
  }

  const handleError = (err: Error) => {
    setError(err);
  };

  return (
    <BrowserRouter>
      <ErrorBoundary onError={handleError} fallback={<AppErrorFallback error={error} />}>
        <React.Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center bg-slate-950">
              <Skeleton className="w-48 h-8" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="skills" element={<Skills />} />
              <Route path="experience" element={<Experience />} />
              <Route path="projects" element={<Projects />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

function AppErrorFallback({ error }: { error: Error | null }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-screen">
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        Application Error
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
        {error?.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
      >
        Reload Application
      </button>
    </div>
  );
}
