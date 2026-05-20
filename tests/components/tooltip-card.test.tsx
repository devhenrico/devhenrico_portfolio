import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tooltip } from '@/components/ui/cards/tooltip-card';

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('Tooltip', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps mobile click tooltips open for five seconds', () => {
    vi.useFakeTimers();
    mockMatchMedia(true);

    render(
      <Tooltip content={<div>Dados do card</div>}>
        <button type="button">Henrico</button>
      </Tooltip>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Henrico' }), {
      clientX: 40,
      clientY: 60,
    });

    expect(screen.getByText('Dados do card')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4999);
    });

    expect(screen.getByText('Dados do card')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.queryByText('Dados do card')).not.toBeInTheDocument();
  });

  it('closes mobile click tooltips when clicking outside', () => {
    vi.useFakeTimers();
    mockMatchMedia(true);

    render(
      <Tooltip content={<div>Dados do card</div>}>
        <button type="button">Desenvolvedor</button>
      </Tooltip>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Desenvolvedor' }), {
      clientX: 40,
      clientY: 60,
    });

    expect(screen.getByText('Dados do card')).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(screen.queryByText('Dados do card')).not.toBeInTheDocument();
  });

  it('closes mobile click tooltips when the page scrolls', () => {
    vi.useFakeTimers();
    mockMatchMedia(true);

    render(
      <Tooltip content={<div>Dados do card</div>}>
        <button type="button">Henrico</button>
      </Tooltip>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Henrico' }), {
      clientX: 40,
      clientY: 60,
    });

    expect(screen.getByText('Dados do card')).toBeInTheDocument();

    fireEvent.scroll(window);

    expect(screen.queryByText('Dados do card')).not.toBeInTheDocument();
  });
});
