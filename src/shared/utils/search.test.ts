import { describe, it, expect } from 'vitest';
import { searchProjects } from './search';
import type { Project } from '@/data';

const mockProjects: Project[] = [
  {
    title: 'React Dashboard',
    description: 'A dashboard built with React',
    tags: ['React', 'TypeScript'],
    image: 'https://example.com/img1.jpg',
  },
  {
    title: 'Node API',
    description: 'Backend API with Node.js',
    tags: ['Node.js', 'Express'],
    image: 'https://example.com/img2.jpg',
  },
  {
    title: 'Python ML',
    description: 'Machine learning with Python',
    tags: ['Python', 'ML'],
    image: 'https://example.com/img3.jpg',
  },
];

describe('searchProjects', () => {
  it('should return all projects with score 0 for empty query', () => {
    const results = searchProjects(mockProjects, '');
    expect(results).toHaveLength(3);
    results.forEach((r) => expect(r.score).toBe(0));
  });

  it('should filter projects by title', () => {
    const results = searchProjects(mockProjects, 'React');
    expect(results).toHaveLength(1);
    expect(results[0]!.item.title).toBe('React Dashboard');
  });

  it('should filter projects by description', () => {
    const results = searchProjects(mockProjects, 'Backend');
    expect(results).toHaveLength(1);
    expect(results[0]!.item.title).toBe('Node API');
  });

  it('should filter projects by tags', () => {
    const results = searchProjects(mockProjects, 'Python');
    expect(results).toHaveLength(1);
    expect(results[0]!.item.title).toBe('Python ML');
  });

  it('should be case insensitive', () => {
    const results = searchProjects(mockProjects, 'react');
    expect(results).toHaveLength(1);
    expect(results[0]!.item.title).toBe('React Dashboard');
  });

  it('should return empty array for no matches', () => {
    const results = searchProjects(mockProjects, 'nonexistent');
    expect(results).toHaveLength(0);
  });
});
