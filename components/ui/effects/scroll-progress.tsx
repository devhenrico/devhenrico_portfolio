'use client';

import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-neutral-800"
    >
      <motion.div
        data-slot="scroll-progress"
        className="h-full origin-left bg-linear-to-r from-cyan-500 to-cyan-200"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
