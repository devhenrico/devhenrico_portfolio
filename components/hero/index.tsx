'use client';

import { Variants } from 'motion/react';
import { Spotlight } from '@/components/ui/backgrounds/spotlight-new';
import { SharedNavbar } from '@/components/layout/shared-navbar';
import { HeroContent } from './hero-content';

export function HeroSection({
  onCVDropdownChange,
}: {
  onCVDropdownChange?: (isOpen: boolean) => void;
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, rotate: -2 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-384 flex-col px-4 pt-16 sm:px-6 md:pt-0 lg:px-8"
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />

      {/* Header Navigation */}
      <SharedNavbar />

      {/* Hero Content */}
      <HeroContent
        containerVariants={containerVariants}
        itemVariants={itemVariants}
        imageVariants={imageVariants}
        onCVDropdownChange={onCVDropdownChange}
      />
    </section>
  );
}
