'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroLoader() {
  const [helloIndex, setHelloIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [customDelay, setCustomDelay] = useState(500);

  const hellos = [
    'Olá 👋',
    'Hello 👋',
    'Hola 👋',
    '你好 👋',
    'Bonjour 👋',
    'مرحبا 👋',
    'Ciao 👋',
    'Привет 👋',
    'Hallo 👋',
  ];

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      const timeoutId = window.setTimeout(() => {
        setIsLoading(false);
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }

    const interval = setInterval(() => {
      setHelloIndex((prev) => {
        const nextIndex = prev + 1;

        if (nextIndex === 1) {
          setCustomDelay(200);
        }

        if (nextIndex === hellos.length - 1) {
          setCustomDelay(500);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasSeenIntro', 'true');
          }, 500);
        }

        if (nextIndex >= hellos.length) {
          clearInterval(interval);
          return prev;
        }

        return nextIndex;
      });
    }, customDelay);

    return () => clearInterval(interval);
  }, [customDelay, hellos.length]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black"
        >
          <motion.div
            key={helloIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'linear' }}
            className="text-5xl font-bold text-cyan-100 md:text-7xl"
          >
            {hellos[helloIndex]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
