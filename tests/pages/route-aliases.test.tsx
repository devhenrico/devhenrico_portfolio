import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import ContactPage from '@/app/contact/page';
import HomeRoutePage from '@/app/home/page';
import ProjectsPage from '@/app/projects/page';
import TechnologiesPage from '@/app/technologies/page';
import { sectionRouteMap } from '@/constants/navigation';

describe('route aliases', () => {
  it('keeps section routes pointing at the landing page component', () => {
    expect(HomeRoutePage).toBe(HomePage);
    expect(ContactPage).toBe(HomePage);
    expect(ProjectsPage).toBe(HomePage);
    expect(TechnologiesPage).toBe(HomePage);
  });

  it('defines the section route scroll targets in one place', () => {
    expect(sectionRouteMap).toEqual({
      '/home': 'home',
      '/projects': 'projects',
      '/technologies': 'technologies',
      '/contact': 'contact',
    });
  });
});
