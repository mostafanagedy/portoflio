import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import type { Project } from '@/data';

interface SearchResult<T> {
  item: T;
  score: number;
}

const fuseOptions: IFuseOptions<Project> = {
  keys: ['title', 'description', 'tags'],
  threshold: 0.3,
  includeScore: true,
};

export function searchProjects(projects: Project[], query: string): SearchResult<Project>[] {
  if (!query.trim()) {
    return projects.map((item) => ({ item, score: 0 }));
  }

  const fuse = new Fuse<Project>(projects, fuseOptions);
  return fuse.search(query).map((result) => ({
    item: result.item,
    score: result.score ?? 0,
  }));
}

export type { SearchResult };
