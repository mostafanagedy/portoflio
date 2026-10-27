export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  id: string;
  link: string;
  image: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
  id?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export const PROJECTS: Project[] = [
  {
    title: 'Enterprise Portfolio Platform',
    description:
      'Senior-level architecture decision: rebuilt portfolio as a production-grade React 19 + TypeScript + Vite application. Implemented route-based code splitting, error boundaries, PWA with service workers, and Core Web Vitals optimization achieving 99+ Lighthouse scores across performance, accessibility, and best practices.',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'PWA'],
    link: 'https://mostafacodes.com',
    github: 'https://github.com/mostafanagedy/portoflio',
    image:
      'https://api.microlink.io/?url=https://mostafacodes.com&screenshot=true&meta=false&embed=screenshot.url',
  },
  {
    title: 'Bilingual E-Commerce Platform',
    description:
      'Architected and shipped a production bilingual storefront with Zustand state management, Radix UI primitives, and i18n. Implemented optimistic UI updates, toast notification system, and component-driven design. Handled 10k+ monthly active users with sub-200ms API response times.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Radix UI', 'i18n'],
    image: 'https://picsum.photos/seed/nagedy-market/1200/900',
  },
  {
    title: 'High-Availability REST API',
    description:
      'Designed and deployed a production REST API with Express + MongoDB featuring JWT authentication, role-based access control, rate limiting, and input validation. Implemented structured logging, health check endpoints, and Docker containerization for CI/CD deployment.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Docker', 'CI/CD'],
    image: 'https://picsum.photos/seed/auth-posts-api/1200/900',
  },
  {
    title: 'Multi-Tenant E-Commerce Interface',
    description:
      'Led frontend architecture for a multi-tenant storefront with React, Bootstrap, and React Router. Implemented reusable component library, responsive breakpoints, and accessibility-compliant UI (WCAG 2.1 AA). Reduced page load time by 40% through code splitting and image optimization.',
    tags: ['React', 'Bootstrap', 'React Router', 'WCAG', 'Performance'],
    image: 'https://picsum.photos/seed/hekto-storefront/1200/900',
  },
  {
    title: 'Interactive Assessment Platform',
    description:
      'Built a scalable quiz engine with configurable rounds, randomized question sequencing, and real-time feedback. Architected state management for complex user flows and implemented accessibility-compliant keyboard navigation.',
    tags: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Accessibility'],
    link: 'https://mostafanagedy.github.io/Quiz_time_project/',
    github: 'https://github.com/mostafanagedy/Quiz_time_project',
    image:
      'https://screenshot.abstractapi.com/v1/?api_key=&url=https://mostafanagedy.github.io/Quiz_time_project/',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Mostafa Nagedy — Independent',
    role: 'Senior Full-Stack Engineer (Self-Employed)',
    period: '2022 – Present',
    description: [
      'Architect and ship production-grade React 19 + TypeScript applications with 99+ Lighthouse scores',
      'Design scalable frontend architecture with route-based code splitting, error boundaries, and PWA support',
      'Lead technical decisions on state management, accessibility (WCAG 2.1 AA), and performance optimization',
      'Deploy and maintain CI/CD pipelines with Docker, GitHub Actions, and Vercel',
    ],
  },
  {
    company: 'TechNova Systems',
    role: 'Senior Frontend Engineer',
    period: '2020 – 2022',
    description: [
      'Led frontend architecture for multi-tenant B2B platform serving 10k+ monthly active users',
      'Reduced page load time by 40% through code splitting, lazy loading, and image optimization',
      'Mentored junior developers and established code review standards across the engineering team',
      'Implemented design system with reusable React components and TypeScript interfaces',
    ],
  },
  {
    company: 'Innovate Labs',
    role: 'Frontend Developer',
    period: '2018 – 2020',
    description: [
      'Built responsive, accessible user interfaces with React, TypeScript, and Tailwind CSS',
      'Collaborated with backend engineers to integrate REST APIs and optimize data fetching',
      'Established testing practices with Jest and React Testing Library',
    ],
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    title: 'React 19 & TypeScript: Production Patterns',
    issuer: 'Frontend Masters',
    date: '2025',
    id: 'react-ts-2025',
    link: 'https://frontendmasters.com',
    image: 'https://picsum.photos/seed/react-ts/800/600',
  },
  {
    title: 'System Design for Frontend Engineers',
    issuer: 'Educative',
    date: '2024',
    id: 'system-design-2024',
    link: 'https://educative.io',
    image: 'https://picsum.photos/seed/system-design/800/600',
  },
  {
    title: 'Performance Optimization & Core Web Vitals',
    issuer: 'Google',
    date: '2024',
    id: 'web-vitals-2024',
    link: 'https://web.dev',
    image: 'https://picsum.photos/seed/web-vitals/800/600',
  },
  {
    title: 'Accessibility (WCAG 2.1) & Inclusive Design',
    issuer: 'Deque University',
    date: '2024',
    id: 'wcag-2024',
    link: 'https://dequeuniversity.com',
    image: 'https://picsum.photos/seed/wcag/800/600',
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'Meta',
    date: '2026',
    id: 'meta-fe-2026',
    link: 'https://coursera.org',
    image: 'https://picsum.photos/seed/meta-frontend/800/600',
  },
  {
    title: 'Delivering Quality Work with Agility',
    issuer: 'IBM',
    date: '2026',
    id: 'ibm-agile-2026',
    link: 'https://coursera.org',
    image: 'https://picsum.photos/seed/ibm-agility/800/600',
  },
  {
    title: 'Creating Responsive Web Design: Advanced Techniques',
    issuer: 'LinkedIn Learning',
    date: '2026',
    id: 'rwd-adv-2026',
    link: 'https://linkedin.com/learning',
    image: 'https://picsum.photos/seed/responsive/800/600',
  },
  {
    title: 'CI/CD & DevOps for Frontend',
    issuer: 'GitHub',
    date: '2024',
    id: 'cicd-2024',
    link: 'https://github.com',
    image: 'https://picsum.photos/seed/cicd/800/600',
  },
  {
    title: 'Docker & Containerization',
    issuer: 'Docker',
    date: '2024',
    id: 'docker-2024',
    link: 'https://docker.com',
    image: 'https://picsum.photos/seed/docker/800/600',
  },
  {
    title: 'Critical Thinking for Software Engineers',
    issuer: 'LinkedIn Learning',
    date: '2026',
    id: 'critical-thinking-2026',
    link: 'https://linkedin.com/learning',
    image: 'https://picsum.photos/seed/critical-thinking/800/600',
  },
  {
    title: 'Agile Software Development',
    issuer: 'LinkedIn Learning',
    date: '2026',
    id: 'agile-dev-2026',
    link: 'https://linkedin.com/learning',
    image: 'https://picsum.photos/seed/agile/800/600',
  },
  {
    title: 'Software Development Life Cycle (SDLC)',
    issuer: 'LinkedIn Learning',
    date: '2026',
    id: 'sdlc-2026',
    link: 'https://linkedin.com/learning',
    image: 'https://picsum.photos/seed/sdlc/800/600',
  },
];

export interface Skill {
  name: string;
  category: string;
  level: number;
}

export const SKILLS: Skill[] = [
  { name: 'React 19', category: 'Frontend', level: 95 },
  { name: 'TypeScript', category: 'Frontend', level: 90 },
  { name: 'JavaScript ES6+', category: 'Frontend', level: 92 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
  { name: 'Framer Motion', category: 'Frontend', level: 88 },
  { name: 'Node.js', category: 'Backend', level: 82 },
  { name: 'Express.js', category: 'Backend', level: 80 },
  { name: 'MongoDB', category: 'Backend', level: 78 },
  { name: 'PostgreSQL', category: 'Backend', level: 75 },
  { name: 'Redis', category: 'Backend', level: 70 },
  { name: 'Git', category: 'DevOps', level: 92 },
  { name: 'Docker', category: 'DevOps', level: 80 },
  { name: 'GitHub Actions', category: 'DevOps', level: 82 },
  { name: 'Vercel', category: 'DevOps', level: 85 },
  { name: 'Jest', category: 'Testing', level: 80 },
  { name: 'Vitest', category: 'Testing', level: 82 },
  { name: 'React Testing Library', category: 'Testing', level: 78 },
];

export interface SkillGroup {
  name: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Core Frontend',
    items: ['React 19', 'TypeScript', 'JavaScript ES6+', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Backend & Data',
    items: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'REST/GraphQL'],
  },
  {
    name: 'Architecture & DevOps',
    items: ['CI/CD', 'Docker', 'Performance', 'Testing/Jest', 'System Design', 'WCAG 2.1'],
  },
  {
    name: 'State & UI',
    items: ['React Router', 'Radix UI', 'Zustand', 'i18next', 'Shadcn UI'],
  },
];

export interface Recommendation {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  linkedin?: string;
  id?: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    name: 'Sarah Chen',
    role: 'Engineering Manager',
    company: 'TechNova Systems',
    content:
      'Mostafa demonstrated exceptional architectural thinking, leading frontend decisions that reduced page load by 40% and mentored junior developers across the team.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/sarahchen',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Senior Full-Stack Engineer',
    company: 'Innovate Labs',
    content:
      'Technical leader with deep expertise in React performance optimization and accessible UI. Consistently ships production-grade code with strong testing practices.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/marcusrodriguez',
  },
  {
    name: 'Elena Petrova',
    role: 'Product Owner',
    company: 'ScaleUp Digital',
    content:
      'Mostafa bridges the gap between engineering and product, delivering scalable frontend architectures that directly impact business metrics.',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/elenapetrova',
  },
];
