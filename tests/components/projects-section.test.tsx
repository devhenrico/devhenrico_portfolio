import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectsSection } from '@/components/projects';
import { projects } from '@/constants/projects';

describe('ProjectsSection', () => {
  it('renders the projects heading and every configured project', () => {
    render(<ProjectsSection />);

    expect(
      screen.getByRole('heading', { name: /Projetos em destaque/i }),
    ).toBeInTheDocument();

    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it('renders project links from the project data', () => {
    render(<ProjectsSection />);

    for (const project of projects.filter((item) => item.link)) {
      expect(
        document.querySelector(`a[href="${project.link}"]`),
      ).toBeInTheDocument();
    }
  });
});
