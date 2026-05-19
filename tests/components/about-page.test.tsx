import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('renders the about page content and social links', () => {
    render(<AboutPage />);

    expect(screen.getByText('devhenrico')).toBeInTheDocument();
    expect(
      screen.getAllByText(/Desenvolvedor Frontend/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText('+4')).toBeInTheDocument();
    expect(screen.getByText('+12')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/devhenrico',
    );
  });

  it('toggles the mobile menu', () => {
    render(<AboutPage />);

    fireEvent.click(screen.getByLabelText('Toggle menu'));

    expect(screen.getAllByText('Projetos').length).toBeGreaterThan(1);
    expect(screen.getAllByText('Contato').length).toBeGreaterThan(1);
  });
});
