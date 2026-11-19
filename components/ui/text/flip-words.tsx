'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  onWordChange,
}: {
  words: readonly string[];
  duration?: number;
  className?: string;
  onWordChange?: (index: number) => void;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const reduceMotion = usePrefersReducedMotion();

  const startAnimation = useCallback(() => {
    const nextIndex = words.indexOf(currentWord) + 1;
    const word = words[nextIndex] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
    if (onWordChange) {
      onWordChange(nextIndex >= words.length ? 0 : nextIndex);
    }
  }, [currentWord, words, onWordChange]);

  useEffect(() => {
    if (reduceMotion || isAnimating) return;
    const timer = setTimeout(startAnimation, duration);
    return () => clearTimeout(timer);
  }, [reduceMotion, isAnimating, duration, startAnimation]);

  if (reduceMotion) {
    return <span className={className}>{currentWord}</span>;
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: 'blur(8px)',
          scale: 2,
          position: 'absolute',
        }}
        className={cn(
          'relative z-10 inline-block px-2 text-left text-neutral-900 dark:text-neutral-100',
          className,
        )}
        key={currentWord}
      >
        {currentWord.split(' ').map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split('').map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};
