import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ContactSection } from '@/components/contact';

describe('ContactSection', () => {
  it('renders contact fields and public contact information', () => {
    render(<ContactSection />);

    expect(
      screen.getByRole('heading', { name: /Vamos conversar/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument();
    expect(screen.getByText('henricosantos27@outlook.com')).toBeInTheDocument();
    expect(screen.getByText('@devhenrico')).toBeInTheDocument();
    expect(screen.getByText('/henrico-santos')).toBeInTheDocument();
  });

  it('copies the email address from the contact card', () => {
    render(<ContactSection />);

    fireEvent.click(screen.getByLabelText(/Copiar Email/i));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'henricosantos27@outlook.com',
    );
  });

  it('opens the confirmation dialog before sending a message', () => {
    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Henrico' },
    });
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'henrico@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Mensagem'), {
      target: { value: 'Quero conversar sobre um projeto.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/i }));

    expect(
      screen.getByRole('heading', { name: /Confirmar envio da mensagem/i }),
    ).toBeInTheDocument();
    expect(vi.mocked(navigator.clipboard.writeText)).not.toHaveBeenCalledWith(
      'henrico@example.com',
    );
  });
});
