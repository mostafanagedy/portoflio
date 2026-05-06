import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Globe
} from 'lucide-react';

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
  link: string;
  github: string;
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
    title: "Quiz Time Project",
    description: "Interactive quiz game with configurable rounds, randomized questions, and instant feedback—built for a smooth, engaging knowledge challenge experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://mostafanagedy.github.io/Quiz_time_project/",
    github: "https://github.com/mostafanagedy/Quiz_time_project",
    image: "https://opengraph.githubassets.com/1/mostafanagedy/Quiz_time_project"
  },
  {
    title: "Mostafa Nagedy Portfolio",
    description: "Professional developer portfolio showcasing projects, skills, and contact information.",
    tags: ["React", "TypeScript", "Vite"],
    link: "https://it-s-my.vercel.app",
    github: "https://github.com/mostafanagedy/it-s-my",
    image: "https://opengraph.githubassets.com/1/mostafanagedy/it-s-my"
  },
  {
    title: "Nagedy Portfolio (Current)",
    description: "High-end responsive portfolio with animations, project showcase, and experience timeline.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    link: "https://portoflio-lime.vercel.app",
    github: "https://github.com/mostafanagedy/portoflio",
    image: "https://opengraph.githubassets.com/1/mostafanagedy/portoflio"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "TechNova Systems",
    role: "Senior Full-Stack Engineer",
    period: "2022 - Present",
    description: [
      "Architected and led the development of a microservices-based cloud platform serving 1M+ active users.",
      "Reduced infrastructure costs by 40% through strategic migration to serverless architectures.",
      "Mentored a team of 12 developers and implemented CI/CD best practices."
    ]
  },
  {
    company: "DataStream AI",
    role: "Software Architect",
    period: "2020 - 2022",
    description: [
      "Designed real-time data processing pipelines handling 50TB of daily ingest.",
      "Developed proprietary machine learning models for predictive maintenance in manufacturing.",
      "Collaborated with cross-functional teams to define product roadmaps and technical strategy."
    ]
  },
  {
    company: "Innovate Labs",
    role: "Frontend Developer",
    period: "2018 - 2020",
    description: [
      "Built highly interactive user interfaces using React and D3.js for complex data visualization.",
      "Improved application performance by 60% through code splitting and lazy loading techniques.",
      "Established the company's first design system, ensuring UI consistency across 5 different products."
    ]
  }
];

export const SKILLS = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"] },
  { name: "DevOps", items: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions"] },
  { name: "Tools", items: ["Figma", "Git", "Jira", "Postman", "Vercel"] }
];

export const CERTIFICATES: Certificate[] = [
  { title: "Introduction to Front-End Development", issuer: "Meta", date: "Feb 14, 2026", id: "SG1KDJJN4JLU", link: "/certificates/intro-front-end-development.pdf", image: "https://picsum.photos/seed/meta-frontend/800/600" },
  { title: "Delivering Quality Work with Agility", issuer: "IBM", date: "Feb 10, 2026", id: "ZWATD25QO1RP", link: "/certificates/delivering-quality-work-with-agility.pdf", image: "https://picsum.photos/seed/ibm-agility/800/600" },
  { title: "Agile Software Development", issuer: "LinkedIn Learning", date: "Feb 09, 2026", id: "99b1d9c9c936...", link: "/certificates/agile-software-development.pdf", image: "https://picsum.photos/seed/agile/800/600" },
  { title: "Building Website Interactivity with JavaScript", issuer: "LinkedIn Learning", date: "Mar 01, 2026", id: "91c78979408c...", link: "/certificates/building-website-interactivity-javascript.pdf", image: "https://picsum.photos/seed/js-interactivity/800/600" },
  { title: "C++ Essential Training", issuer: "LinkedIn Learning", date: "Feb 22, 2026", id: "b17e287e379f...", link: "/certificates/c-essential-training.pdf", image: "https://picsum.photos/seed/cpp/800/600" },
  { title: "HTML Essential Training", issuer: "LinkedIn Learning", date: "Mar 01, 2026", id: "4387914c94f6...", link: "/certificates/html-essential-training.pdf", image: "https://picsum.photos/seed/html/800/600" },
  { title: "JavaScript Essential Training", issuer: "LinkedIn Learning", date: "Feb 22, 2026", id: "3cf6a34efd98...", link: "/certificates/javascript-essential-training.pdf", image: "https://picsum.photos/seed/js-essential/800/600" },
  { title: "Software Development Life Cycle (SDLC)", issuer: "LinkedIn Learning", date: "Mar 01, 2026", id: "0b8a1a9e5a1d...", link: "/certificates/software-development-life-cycle-sdlc.pdf", image: "https://picsum.photos/seed/sdlc/800/600" },
  { title: "CSS Layouts: From Float to Flexbox and Grid", issuer: "LinkedIn Learning", date: "Feb 23, 2026", id: "dd26b1d72e03...", link: "/certificates/css-layouts-float-to-flexbox-grid.pdf", image: "https://picsum.photos/seed/css-layouts/800/600" },
  { title: "Communication within Teams", issuer: "LinkedIn Learning", date: "Feb 17, 2026", id: "b2028d7092ea...", link: "/certificates/communication-within-teams.pdf", image: "https://picsum.photos/seed/communication/800/600" },
  { title: "Creating a Responsive Web Design: Advanced Techniques", issuer: "LinkedIn Learning", date: "Mar 01, 2026", id: "34749da27be4...", link: "/certificates/responsive-web-design-advanced-techniques.pdf", image: "https://picsum.photos/seed/responsive/800/600" },
  { title: "Critical Thinking for Software Engineers", issuer: "LinkedIn Learning", date: "Feb 17, 2026", id: "b2e22ba92d61...", link: "/certificates/critical-thinking-software-engineers.pdf", image: "https://picsum.photos/seed/critical-thinking/800/600" },
  { title: "HTML, CSS, and JavaScript: Building the Web", issuer: "LinkedIn Learning", date: "Feb 22, 2026", id: "a1ea15729525...", link: "/certificates/html-css-javascript-building-web.pdf", image: "https://picsum.photos/seed/web-building/800/600" },
  { title: "Learning Software Version Control", issuer: "LinkedIn Learning", date: "Feb 08, 2026", id: "8b66b82f5ae6...", link: "/certificates/learning-software-version-control.pdf", image: "https://picsum.photos/seed/version-control/800/600" },
  { title: "Microsoft Entra ID for Python Developers", issuer: "LinkedIn Learning", date: "Feb 28, 2026", id: "69d98d4c758a...", link: "/certificates/microsoft-entra-id-python-developers.pdf", image: "https://picsum.photos/seed/entra-id/800/600" },
  { title: "Object-Oriented Programming with C++", issuer: "LinkedIn Learning", date: "Mar 01, 2026", id: "da2d8fae2e96...", link: "/certificates/object-oriented-programming-with-c.pdf", image: "https://picsum.photos/seed/oop-cpp/800/600" },
  { title: "Personal Branding Strategies", issuer: "LinkedIn Learning", date: "Feb 17, 2026", id: "3b62da7636c2...", link: "/certificates/personal-branding-strategies.pdf", image: "https://picsum.photos/seed/branding/800/600" },
  { title: "Tech Career Skills: Effective Technical Communication", issuer: "LinkedIn Learning", date: "Feb 17, 2026", id: "38bfedcbc13a...", link: "/certificates/tech-career-skills-effective-technical-communication.pdf", image: "https://picsum.photos/seed/tech-comm/800/600" }
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
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechNova Systems",
    content: "Mostafa is an exceptional engineer who consistently delivers high-quality code. His ability to bridge the gap between complex backend logic and intuitive frontend design is truly impressive.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "David Chen",
    role: "CTO",
    company: "DataStream AI",
    content: "Working with Mostafa was a game-changer for our architecture. He has a deep understanding of scalable systems and a passion for clean, maintainable code that inspired the whole team.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Designer",
    company: "Innovate Labs",
    content: "Mostafa has a rare eye for detail. He doesn't just implement designs; he enhances them. His technical expertise combined with his design sensibility makes him a unique asset to any creative project.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
  }
];


