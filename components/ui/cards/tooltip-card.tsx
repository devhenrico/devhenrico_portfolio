'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

  const calculatePosition = useCallback(
    (mouseX: number, mouseY: number) => {
      if (typeof window === 'undefined') {
        return { x: mouseX + 12, y: mouseY + 12 };
      }

      const tooltip = contentRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const offset = 12;
      const padding = 12;

      const tooltipWidth = 240;
      const tooltipHeight = tooltip?.scrollHeight || height || 120;

      let finalX = mouseX + offset;
      let finalY = mouseY + offset;

      if (finalX + tooltipWidth > viewportWidth - padding) {
        finalX = mouseX - tooltipWidth - offset;
      }

      if (finalX < padding) {
        finalX = padding;
      }

      if (finalY + tooltipHeight > viewportHeight - padding) {
        finalY = mouseY - tooltipHeight - offset;
      }

      if (finalY < padding) {
        finalY = padding;
      }

      return { x: finalX, y: finalY };
    },
    [height],
  );

  const updateMousePosition = (mouseX: number, mouseY: number) => {
    lastMouseRef.current = { x: mouseX, y: mouseY };
    const newPosition = calculatePosition(mouseX, mouseY);
    positionX.set(newPosition.x);
    positionY.set(newPosition.y);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(true);
    updateMousePosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return;
    updateMousePosition(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    updateMousePosition(touch.clientX, touch.clientY);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
      } else {
        updateMousePosition(e.clientX, e.clientY);
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    if (isVisible && contentRef.current) {
      const { x, y } = lastMouseRef.current;
      const newPosition = calculatePosition(x, y);
      positionX.set(newPosition.x);
      positionY.set(newPosition.y);
    }
  }, [calculatePosition, height, isVisible, positionX, positionY]);

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isVisible && (
              <motion.div
                key={String(isVisible)}
                initial={{ height: 0, opacity: 1 }}
                animate={{ height, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                className="pointer-events-none fixed z-9999 min-w-60 overflow-hidden rounded-md border border-transparent bg-white shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-900 dark:shadow-white/10 dark:ring-white/5"
                style={{
                  top: positionY,
                  left: positionX,
                }}
              >
                <div
                  ref={contentRef}
                  className="p-2 text-sm text-neutral-600 md:p-4 dark:text-neutral-400"
                >
                  {content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
