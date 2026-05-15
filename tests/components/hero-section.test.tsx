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

    fireEvent.click(screen.getByText(/Baixar/i));

    expect(screen.getByText('Baixar CV')).toBeInTheDocument();
    expect(screen.getByText('Abrir CV')).toBeInTheDocument();
  });
});
