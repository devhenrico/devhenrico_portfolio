import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useOutsideClick } from '@/hooks/use-outside-click';

function OutsideClickFixture({ onOutside }: { onOutside: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onOutside);

  return (
    <div>
      <div ref={ref}>
        <button>Inside</button>
      </div>
      <button>Outside</button>
    </div>
  );
}

describe('useOutsideClick', () => {
  it('calls the callback only when the interaction happens outside the ref', () => {
    const onOutside = vi.fn();
    render(<OutsideClickFixture onOutside={onOutside} />);

    fireEvent.mouseDown(screen.getByText('Inside'));
    expect(onOutside).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByText('Outside'));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });
});
