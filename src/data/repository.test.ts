import { describe, it, expect, beforeEach } from 'vitest';
import { repository } from './repository';
import type { Project, Certificate, Recommendation } from '../data';

describe('MemoryRepository', () => {
  beforeEach(() => {
    // Reset repository state - since it's a singleton, we test read operations
  });

  it('should return all projects', () => {
    const projects = repository.getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should find project by title', () => {
    const projects = repository.getProjects();
    const first = projects[0]!;
    const found = repository.getProjectById(first.title);
    expect(found).toBeDefined();
    expect(found?.title).toBe(first.title);
  });

  it('should return undefined for non-existent project', () => {
    const found = repository.getProjectById('Non-existent Title');
    expect(found).toBeUndefined();
  });

  it('should return all skills', () => {
    const skills = repository.getSkills();
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('should return all experiences', () => {
    const experiences = repository.getExperiences();
    expect(Array.isArray(experiences)).toBe(true);
    expect(experiences.length).toBeGreaterThan(0);
  });

  it('should return all certificates', () => {
    const certificates = repository.getCertificates();
    expect(Array.isArray(certificates)).toBe(true);
    expect(certificates.length).toBeGreaterThan(0);
  });

  it('should find certificate by title', () => {
    const certificates = repository.getCertificates();
    const first = certificates[0]!;
    const found = repository.getCertificateById(first.title);
    expect(found).toBeDefined();
    expect(found?.title).toBe(first.title);
  });

  it('should return all recommendations', () => {
    const recommendations = repository.getRecommendations();
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.length).toBeGreaterThan(0);
  });

  it('should search projects by query', () => {
    const results = repository.searchProjects('React');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((p) => {
      const match =
        p.title.toLowerCase().includes('react') ||
        p.description.toLowerCase().includes('react') ||
        p.tags.some((t) => t.toLowerCase().includes('react'));
      expect(match).toBe(true);
    });
  });

  it('should filter projects by tag', () => {
    const results = repository.filterProjectsByTag('React');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((p) => {
      expect(p.tags).toContain('React');
    });
  });

  it('should return all projects for "all" tag', () => {
    const all = repository.filterProjectsByTag('all');
    const allProjects = repository.getProjects();
    expect(all.length).toBe(allProjects.length);
  });

  it('should add a new project', () => {
    const initialLength = repository.getProjects().length;
    const newProject: Omit<Project, 'id'> = {
      title: 'Test Project',
      description: 'A test project',
      tags: ['Test'],
      image: 'https://example.com/test.jpg',
    };
    repository.addProject(newProject);
    expect(repository.getProjects().length).toBe(initialLength + 1);
    const added = repository.getProjectById('Test Project');
    expect(added).toBeDefined();
    expect(added?.tags).toContain('Test');
  });

  it('should add a new certificate', () => {
    const initialLength = repository.getCertificates().length;
    const newCert: Omit<Certificate, 'id'> = {
      title: 'Test Certificate',
      issuer: 'Test Issuer',
      date: '2024-01-01',
      link: 'https://example.com/cert',
      image: 'https://example.com/cert.jpg',
    };
    repository.addCertificate(newCert);
    expect(repository.getCertificates().length).toBe(initialLength + 1);
  });

  it('should add a new recommendation', () => {
    const initialLength = repository.getRecommendations().length;
    const newRec: Omit<Recommendation, 'id'> = {
      name: 'Test Person',
      role: 'Test Role',
      company: 'Test Co',
      content: 'Great work!',
      image: 'https://example.com/person.jpg',
    };
    repository.addRecommendation(newRec);
    expect(repository.getRecommendations().length).toBe(initialLength + 1);
  });
});
