import {
  Certificate,
  CERTIFICATES,
  Experience,
  EXPERIENCES,
  Project,
  PROJECTS,
  Recommendation,
  RECOMMENDATIONS,
  Skill,
  SKILLS,
} from '../data';

export interface Repository {
  getProjects: () => Project[];
  getProjectById: (id: string) => Project | undefined;
  getSkills: () => Skill[];
  getExperiences: () => Experience[];
  getCertificates: () => Certificate[];
  getCertificateById: (id: string) => Certificate | undefined;
  getRecommendations: () => Recommendation[];
  searchProjects: (query: string) => Project[];
  filterProjectsByTag: (tag: string) => Project[];
}

export class MemoryRepository implements Repository {
  private projects: Project[];
  private skills: Skill[];
  private experiences: Experience[];
  private certificates: Certificate[];
  private recommendations: Recommendation[];

  constructor() {
    this.projects = [...PROJECTS];
    this.skills = [...SKILLS];
    this.experiences = [...EXPERIENCES];
    this.certificates = [...CERTIFICATES];
    this.recommendations = [...RECOMMENDATIONS];
  }

  getProjects = (): Project[] => [...this.projects];

  getProjectById = (id: string): Project | undefined => this.projects.find((p) => p.title === id);

  getSkills = (): Skill[] => [...this.skills];

  getExperiences = (): Experience[] => [...this.experiences];

  getCertificates = (): Certificate[] => [...this.certificates];

  getCertificateById = (id: string): Certificate | undefined =>
    this.certificates.find((c) => c.title === id);

  getRecommendations = (): Recommendation[] => [...this.recommendations];

  searchProjects = (query: string): Project[] => {
    const lower = query.toLowerCase().trim();
    if (!lower) return this.getProjects();
    return this.projects.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lower))
    );
  };

  filterProjectsByTag = (tag: string): Project[] => {
    if (tag === 'all') return this.getProjects();
    return this.projects.filter((p) => p.tags.includes(tag));
  };

  addProject = (project: Omit<Project, 'id'>) => {
    this.projects.push({ ...project, id: crypto.randomUUID() });
  };

  addCertificate = (certificate: Omit<Certificate, 'id'>) => {
    this.certificates.push({ ...certificate, id: crypto.randomUUID() });
  };

  addRecommendation = (recommendation: Omit<Recommendation, 'id'>) => {
    this.recommendations.push({ ...recommendation, id: crypto.randomUUID() });
  };
}

export const repository = new MemoryRepository();
