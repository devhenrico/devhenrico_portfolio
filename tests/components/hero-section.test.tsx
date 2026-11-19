import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroSection } from '@/components/hero';

describe('HeroSection', () => {
  it('renders the main hero identity, navigation, and calls to action', () => {
    render(<HeroSection />);

    expect(screen.getByText('devhenrico')).toBeInTheDocument();
    expect(screen.getByText('Henrico da Silva Santos')).toBeInTheDocument();
    expect(screen.getByText('Ver Projetos')).toBeInTheDocument();
    expect(screen.getByText(/Baixar/i)).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toHaveAttribute(
      'src',
      '/assets/images/devhenrico.png',
    );
  });

  it('opens the curriculum actions when the curriculum button is clicked', () => {
    render(<HeroSection />);

    const button = screen.getByRole('button', { name: 'Baixar Currículo' });
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    const download = screen.getByRole('link', { name: /Baixar CV/ });
    expect(download).toHaveAttribute('download', 'devhenrico.pdf');
    expect(screen.getByRole('link', { name: /Abrir CV/ })).toHaveAttribute(
      'target',
      '_blank',
    );

    download.focus();
    fireEvent.keyDown(download, { key: 'Escape' });
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(download).not.toBeInTheDocument();
  });
});
