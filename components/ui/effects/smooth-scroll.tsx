'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: !reduceMotion,
      }}
    >
      <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
