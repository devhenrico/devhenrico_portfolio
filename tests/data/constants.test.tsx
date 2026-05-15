import { describe, expect, it } from 'vitest';
import {
  backendItems,
  frontendItems,
  navigationLinks,
  navItems,
  programmingLanguageItems,
  toolsItems,
} from '@/constants';
import { projects } from '@/constants/projects';

describe('portfolio constants', () => {
  it('defines the expected landing navigation links', () => {
    expect(navigationLinks.map((item) => item.href)).toEqual([
      '/home',
      '/about',
      '/projects',
      '/technologies',
      '/contact',
    ]);
    expect(navItems.map((item) => item.link)).toEqual([
      '/home',
      '/about',
      '/projects',
      '/technologies',
    ]);
  });

  it('keeps technology ids unique inside each group', () => {
    const groups = [
      frontendItems,
      programmingLanguageItems,
      backendItems,
      toolsItems,
    ];

    for (const group of groups) {
      const ids = group.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('defines project cards with the required public-facing fields', () => {
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.header).toBeTruthy();
      expect(project.techStack.length).toBeGreaterThan(0);
    }
  });
});
