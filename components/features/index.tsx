'use client';

import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CanvasRevealEffect } from '@/components/ui/effects/canvas-reveal-effect';

import {
  IconCode,
  IconStack2,
  IconUser,
  IconTerminal2,
} from '@tabler/icons-react';

export function FeaturesSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: 'Código Limpo',
      description:
        'Escrevo código organizado, legível e fácil de manter, seguindo boas práticas e padrões de desenvolvimento.',
      revealColor: [47, 164, 255],
      icon: <IconCode className="mb-2 h-10 w-10 text-white" />,
    },
    {
      title: 'Visão Completa',
      description:
        'Com experiência em frontend e backend, entendo o produto de ponta a ponta, da interface ao banco de dados.',
      revealColor: [47, 164, 255],
      icon: <IconStack2 className="mb-2 h-10 w-10 text-white" />,
    },
    {
      title: 'Foco no Usuário',
      description:
        'Desenvolvo interfaces responsivas, intuitivas e minimalistas, pensadas para uma navegação clara e agradável.',
      revealColor: [47, 164, 255],
      icon: <IconUser className="mb-2 h-10 w-10 text-white" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev < features.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [hasStarted, features.length]);

  return (
    <section ref={sectionRef} className="w-full bg-black py-20">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 bg-black px-8 lg:flex-row lg:gap-3">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            defaultIcon={<PhaseIcon />}
            isRevealed={idx < revealedCount}
            onHover={() => setRevealedCount(features.length)}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[feature.revealColor]}
              dotSize={2}
            />
            <div className="absolute inset-0 bg-black/50 mask-[radial-gradient(400px_at_center,white,transparent)]" />
          </Card>
        ))}
      </div>
    </section>
  );
}

const Card = ({
  title,
  icon,
  defaultIcon,
  children,
  description,
  isRevealed,
  onHover,
}: {
  title: string;
  icon: React.ReactNode;
  defaultIcon: React.ReactNode;
  children?: React.ReactNode;
  description?: string;
  isRevealed?: boolean;
  onHover?: () => void;
}) => {
  const [hovered, setHovered] = React.useState(false);

  const effectiveReveal = hovered || isRevealed;

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        onHover?.();
      }}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex h-112 w-full max-w-sm items-center justify-center border border-white/20 p-4 sm:h-120 lg:h-140"
    >
      <Icon className="absolute -top-3 -left-3 h-6 w-6 text-white" />
      <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-white" />
      <Icon className="absolute -top-3 -right-3 h-6 w-6 text-white" />
      <Icon className="absolute -right-3 -bottom-3 h-6 w-6 text-white" />

      <AnimatePresence>
        {effectiveReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default icon — absolutely centered when not revealed */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center transition duration-200 ${
          effectiveReveal ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        {defaultIcon}
      </div>

      {/* Revealed content */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center transition duration-200 ${
          effectiveReveal ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mx-auto flex w-full items-center justify-center text-center">
          {icon}
        </div>
        <h2
          className={`relative z-10 mt-4 text-center text-[1.65rem] font-bold text-white transition duration-200 sm:text-3xl ${
            effectiveReveal ? '-translate-y-2' : ''
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`relative z-10 mt-4 text-center text-sm font-normal text-neutral-300 transition duration-200 ${
              effectiveReveal ? '-translate-y-2' : ''
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const PhaseIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <IconTerminal2 className="h-16 w-16 text-white" strokeWidth={1.2} />
      </motion.div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
