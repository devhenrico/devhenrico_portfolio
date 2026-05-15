import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TechnologiesSection } from '@/components/technologies';

describe('TechnologiesSection', () => {
  it('renders the technology groups and representative tools', () => {
    render(<TechnologiesSection />);

    expect(
      screen.getByRole('heading', { name: /Tecnologias/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText(/Linguagens/i)).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Ferramentas')).toBeInTheDocument();

    expect(screen.getAllByAltText('Next.js').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('Node.js').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('Git').length).toBeGreaterThan(0);
  });
});
