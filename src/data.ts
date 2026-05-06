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
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export const PROJECTS: Project[] = [
  {
    title: 'Nagedy Portfolio (Current)',
    description:
      'Current portfolio rebuild focused on premium motion, responsive navigation fixes, skill visualization, project filtering, and certificate browsing.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Motion'],
    link: 'https://portoflio-lime.vercel.app',
    github: 'https://github.com/mostafanagedy/portoflio',
    image: 'https://api.microlink.io/?url=https://portoflio-lime.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
  },
  {
    title: 'Nagedy Market',
    description:
      'Bilingual product storefront with product details, category browsing, language switching, toast feedback, and a component-driven UI powered by state management.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Radix UI'],
    image: 'https://picsum.photos/seed/nagedy-market/1200/900',
  },
  {
    title: 'Auth & Posts REST API',
    description:
      'Practice backend API with Express and MongoDB featuring auth, users, and post routes, plus password hashing and JWT-based authentication.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    image: 'https://picsum.photos/seed/auth-posts-api/1200/900',
  },
  {
    title: 'Hekto Storefront',
    description:
      'Multi-page e-commerce interface built with React, Bootstrap, and React Router to practice catalog layouts, product presentation, and reusable storefront sections.',
    tags: ['React', 'Bootstrap', 'React Router'],
    image: 'https://picsum.photos/seed/hekto-storefront/1200/900',
  },
  {
    title: 'Quiz Time Project',
    description:
      'Interactive quiz game with configurable rounds, randomized questions, and instant feedback built for a smooth, engaging challenge experience.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://mostafanagedy.github.io/Quiz_time_project/',
    github: 'https://github.com/mostafanagedy/Quiz_time_project',
    image: 'https://screenshot.abstractapi.com/v1/?api_key=&url=https://mostafanagedy.github.io/Quiz_time_project/',
  },
  {
    title: 'CRUD Practice App',
    description:
      'Vanilla JavaScript CRUD exercise centered on form handling, client-side data updates, and keeping UI state in sync with user actions.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://picsum.photos/seed/crud-practice-app/1200/900',
  },
  {
    title: 'Fetch Tasks Lab',
    description:
      'Collection of small fetch-driven browser tasks focused on asynchronous data loading, promise handling, and rendering remote results in the DOM.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    image: 'https://picsum.photos/seed/fetch-tasks-lab/1200/900',
  },
  {
    title: 'Mostafa Nagedy Portfolio',
    description:
      'Earlier portfolio iteration used to refine personal branding, project presentation, and deployment workflow before the current redesign.',
    tags: ['React', 'TypeScript', 'Vite'],
    link: 'https://it-s-my.vercel.app',
    github: 'https://github.com/mostafanagedy/it-s-my',
    image: 'https://api.microlink.io/?url=https://it-s-my.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Portfolio & Storefront Builds',
    role: 'Frontend-Focused Full-Stack Developer',
    period: '2025 - Present',
    description: [
      'Built and iterated on portfolio and storefront interfaces in React, TypeScript, and Vite, including the current portfolio, Nagedy Market, and Hekto practice builds.',
      'Handled routing, responsive layouts, motion, dark/light theming, and reusable UI sections across multi-page interfaces.',
      'Worked with Tailwind CSS, Bootstrap, Zustand, Radix UI, and Vercel deployment while improving polish from one iteration to the next.',
    ],
  },
  {
    company: 'Auth & Data Practice',
    role: 'Node.js Backend Developer',
    period: '2025',
    description: [
      'Created an Express API connected to MongoDB with separate auth, users, and posts routes.',
      'Defined Mongoose models for users and posts, added password hashing with bcryptjs, and used JWT for authenticated flows.',
      'Used environment-based configuration and modular server structure to keep the codebase easier to extend.',
    ],
  },
  {
    company: 'Frontend Labs & Problem Solving',
    role: 'JavaScript Developer',
    period: '2024 - 2025',
    description: [
      'Built browser-based quiz, CRUD, and fetch exercises to practice DOM state, async requests, and data rendering.',
      'Strengthened CSS layout and interaction skills through repeated small builds instead of one-off demos.',
      'Kept sharpening fundamentals with academic OOP projects in C++ such as student and hospital system exercises.',
    ],
  },
];

export const SKILLS = [
  { name: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Framer Motion'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'REST APIs'] },
  { name: 'State & UI', items: ['React Router', 'Radix UI', 'Zustand', 'i18next', 'Shadcn UI'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Vercel', 'Figma'] },
];

export const CERTIFICATES: Certificate[] = [
  { title: 'Introduction to Front-End Development', issuer: 'Meta', date: 'Feb 14, 2026', id: 'SG1KDJJN4JLU', link: '/certificates/intro-front-end-development.pdf', image: 'https://picsum.photos/seed/meta-frontend/800/600' },
  { title: 'Delivering Quality Work with Agility', issuer: 'IBM', date: 'Feb 10, 2026', id: 'ZWATD25QO1RP', link: '/certificates/delivering-quality-work-with-agility.pdf', image: 'https://picsum.photos/seed/ibm-agility/800/600' },
  { title: 'Agile Software Development', issuer: 'LinkedIn Learning', date: 'Feb 09, 2026', id: '99b1d9c9c936...', link: '/certificates/agile-software-development.pdf', image: 'https://picsum.photos/seed/agile/800/600' },
  { title: 'Building Website Interactivity with JavaScript', issuer: 'LinkedIn Learning', date: 'Mar 01, 2026', id: '91c78979408c...', link: '/certificates/building-website-interactivity-javascript.pdf', image: 'https://picsum.photos/seed/js-interactivity/800/600' },
  { title: 'C++ Essential Training', issuer: 'LinkedIn Learning', date: 'Feb 22, 2026', id: 'b17e287e379f...', link: '/certificates/c-essential-training.pdf', image: 'https://picsum.photos/seed/cpp/800/600' },
  { title: 'HTML Essential Training', issuer: 'LinkedIn Learning', date: 'Mar 01, 2026', id: '4387914c94f6...', link: '/certificates/html-essential-training.pdf', image: 'https://picsum.photos/seed/html/800/600' },
  { title: 'JavaScript Essential Training', issuer: 'LinkedIn Learning', date: 'Feb 22, 2026', id: '3cf6a34efd98...', link: '/certificates/javascript-essential-training.pdf', image: 'https://picsum.photos/seed/js-essential/800/600' },
  { title: 'Software Development Life Cycle (SDLC)', issuer: 'LinkedIn Learning', date: 'Mar 01, 2026', id: '0b8a1a9e5a1d...', link: '/certificates/software-development-life-cycle-sdlc.pdf', image: 'https://picsum.photos/seed/sdlc/800/600' },
  { title: 'CSS Layouts: From Float to Flexbox and Grid', issuer: 'LinkedIn Learning', date: 'Feb 23, 2026', id: 'dd26b1d72e03...', link: '/certificates/css-layouts-float-to-flexbox-grid.pdf', image: 'https://picsum.photos/seed/css-layouts/800/600' },
  { title: 'Communication within Teams', issuer: 'LinkedIn Learning', date: 'Feb 17, 2026', id: 'b2028d7092ea...', link: '/certificates/communication-within-teams.pdf', image: 'https://picsum.photos/seed/communication/800/600' },
  { title: 'Creating a Responsive Web Design: Advanced Techniques', issuer: 'LinkedIn Learning', date: 'Mar 01, 2026', id: '34749da27be4...', link: '/certificates/responsive-web-design-advanced-techniques.pdf', image: 'https://picsum.photos/seed/responsive/800/600' },
  { title: 'Critical Thinking for Software Engineers', issuer: 'LinkedIn Learning', date: 'Feb 17, 2026', id: 'b2e22ba92d61...', link: '/certificates/critical-thinking-software-engineers.pdf', image: 'https://picsum.photos/seed/critical-thinking/800/600' },
  { title: 'HTML, CSS, and JavaScript: Building the Web', issuer: 'LinkedIn Learning', date: 'Feb 22, 2026', id: 'a1ea15729525...', link: '/certificates/html-css-javascript-building-web.pdf', image: 'https://picsum.photos/seed/web-building/800/600' },
  { title: 'Learning Software Version Control', issuer: 'LinkedIn Learning', date: 'Feb 08, 2026', id: '8b66b82f5ae6...', link: '/certificates/learning-software-version-control.pdf', image: 'https://picsum.photos/seed/version-control/800/600' },
  { title: 'Microsoft Entra ID for Python Developers', issuer: 'LinkedIn Learning', date: 'Feb 28, 2026', id: '69d98d4c758a...', link: '/certificates/microsoft-entra-id-python-developers.pdf', image: 'https://picsum.photos/seed/entra-id/800/600' },
  { title: 'Object-Oriented Programming with C++', issuer: 'LinkedIn Learning', date: 'Mar 01, 2026', id: 'da2d8fae2e96...', link: '/certificates/object-oriented-programming-with-c.pdf', image: 'https://picsum.photos/seed/oop-cpp/800/600' },
  { title: 'Personal Branding Strategies', issuer: 'LinkedIn Learning', date: 'Feb 17, 2026', id: '3b62da7636c2...', link: '/certificates/personal-branding-strategies.pdf', image: 'https://picsum.photos/seed/branding/800/600' },
  { title: 'Tech Career Skills: Effective Technical Communication', issuer: 'LinkedIn Learning', date: 'Feb 17, 2026', id: '38bfedcbc13a...', link: '/certificates/tech-career-skills-effective-technical-communication.pdf', image: 'https://picsum.photos/seed/tech-comm/800/600' },
];

export interface Recommendation {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    name: 'Project Review',
    role: 'Technical Feedback',
    company: 'Portfolio Work',
    content: 'Mostafa shows strong attention to UI detail, clear structure, and a good balance between visuals and functionality.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Learning Journey',
    role: 'Skill Progress',
    company: 'Self-Directed',
    content: 'His portfolio communicates growth clearly and makes it easy to understand the stack, certificates, and project focus.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Portfolio Direction',
    role: 'Brand Quality',
    company: 'Personal Brand',
    content: 'The site feels more credible when the writing is specific, the links are real, and the structure is easy to scan.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
  },
];
