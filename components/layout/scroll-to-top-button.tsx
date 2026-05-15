'use client';

import { useEffect, useState } from 'react';
import { IconArrowUp } from '@tabler/icons-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed right-5 bottom-5 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-white shadow-xl shadow-black/30 transition-all duration-300 hover:bg-neutral-800 active:scale-95 md:right-8 md:bottom-8 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <IconArrowUp className="h-4 w-4" />
    </button>
  );
}
