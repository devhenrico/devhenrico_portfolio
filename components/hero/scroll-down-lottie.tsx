'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const ScrollDownLottie = () => {
  return (
    <div
      className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 opacity-80 motion-reduce:hidden sm:block"
      aria-hidden="true"
    >
      <DotLottieReact
        src="/assets/lottie/scroll-down-hint.json"
        loop
        autoplay
        className="h-full w-full"
      />
    </div>
  );
};
