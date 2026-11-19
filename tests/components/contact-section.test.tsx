import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import emailjs from '@emailjs/browser';
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
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it('keeps the message available for retry if sending fails', async () => {
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error('network error'));
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Henrico' },
    });
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'henrico@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Mensagem'), {
      target: { value: 'Mensagem de teste.' },
    });

    const submit = screen.getByRole('button', { name: 'Enviar mensagem' });
    fireEvent.click(submit);
    const dialog = screen.getByRole('alertdialog');
    expect(within(dialog).getByText('henrico@example.com')).toBeInTheDocument();
    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Enviar mensagem' }),
    );

    expect(await within(dialog).findByRole('alert')).toHaveTextContent(
      'Não foi possível enviar',
    );
    expect(
      within(dialog).getByRole('button', { name: 'Enviar mensagem' }),
    ).toHaveAttribute('aria-disabled', 'false');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancelar' }));
    await waitFor(() => expect(submit).toHaveFocus());
    expect(screen.getByLabelText('Mensagem')).toHaveValue('Mensagem de teste.');
  });
});
