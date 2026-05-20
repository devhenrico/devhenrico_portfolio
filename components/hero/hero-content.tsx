'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  IconBulb,
  IconPalette,
  IconTargetArrow,
  IconCode,
  IconArrowNarrowDown,
  IconDownload,
  IconEye,
  IconChevronDown,
} from '@tabler/icons-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HoverBorderGradient } from '@/components/ui/buttons/hover-border-gradient';
import { AnimatedTooltip } from '@/components/ui/misc/animated-hero-tooltip';
import { Tooltip } from '@/components/ui/cards/tooltip-card';
import { FlipWords } from '@/components/ui/text/flip-words';
import { heroRotatingWords, heroTechStack } from '@/constants/hero';
import { navigateToLandingRoute } from '@/lib/section-navigation';
import type { HeroContentProps } from '@/types';
import { HeroClock } from './hero-clock';
import { ScrollDownLottie } from './scroll-down-lottie';

export const HeroContent = ({
  containerVariants,
  itemVariants,
  onCVDropdownChange,
}: HeroContentProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridLinesRef = React.useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [showCVOptions, setShowCVOptions] = useState(false);
  const cvDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cvDropdownRef.current &&
        !cvDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCVOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    onCVDropdownChange?.(showCVOptions);

    return () => onCVDropdownChange?.(false);
  }, [onCVDropdownChange, showCVOptions]);

  useGSAP(
    () => {
      if (!gridLinesRef.current) return;

      const lines = gridLinesRef.current.children;

      gsap.fromTo(
        [lines[0], lines[1]],
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.8,
          ease: 'expo.inOut',
          stagger: 0.3,
          delay: 0.2,
        },
      );

      gsap.fromTo(
        [lines[2], lines[3]],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.8,
          ease: 'expo.inOut',
          stagger: 0.3,
          delay: 0.5,
        },
      );

      const highlights = gridLinesRef.current.querySelectorAll(
        '.bg-linear-to-b, .bg-linear-to-r',
      );
      gsap.fromTo(
        highlights,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          delay: 1.5,
          stagger: 0.4,
          ease: 'power2.out',
        },
      );
    },
    { scope: containerRef },
  );

  const handleProjectsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (navigateToLandingRoute('/projects')) {
      event.preventDefault();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-1 flex-col items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background/Grid Lines */}
      <div ref={gridLinesRef} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 h-full w-px origin-top bg-black opacity-0">
          <div className="absolute top-0 h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent md:top-20" />
        </div>
        <div className="bg-black-500 absolute inset-y-0 right-0 h-full w-px origin-bottom opacity-0">
          <div className="absolute top-0 h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent md:top-20" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-auto origin-left bg-black opacity-0">
          <div className="absolute inset-x-0 mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-cyan-500 to-transparent md:w-40" />
        </div>
      </div>
      <div className="flex h-full w-full flex-col justify-center py-6 md:py-10">
        {/* Two Column Layout: Image Left, Content Right */}
        <div className="mx-auto w-full md:max-w-272 lg:max-w-284 xl:max-w-292">
          <div className="grid w-full max-w-280 grid-cols-1 items-center justify-center gap-12 px-0 sm:px-4 md:grid-cols-[minmax(280px,440px)_minmax(0,640px)] md:gap-10 lg:gap-12">
            {/* Left Column - Image */}
            <div className="flex justify-center">
              <div className="relative h-85 w-full max-w-70 overflow-hidden rounded-2xl bg-neutral-900 sm:h-100 sm:max-w-[320px] md:h-105 md:max-w-85 lg:h-130 lg:max-w-105 xl:h-145 xl:max-w-115">
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={
                    isImageLoaded ? { opacity: 1, filter: 'blur(0px)' } : {}
                  }
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative h-full w-full"
                >
                  <Image
                    src="/assets/images/devhenrico.png"
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-2xl object-cover shadow-2xl"
                    loading="eager"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </motion.div>
                {isImageLoaded && <HeroClock />}
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500/20 border-t-cyan-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="-mx-3 flex w-[calc(100%+1.5rem)] max-w-160 flex-col items-start text-left sm:mx-0 sm:w-full">
              {/* Hover Border Gradient Badge */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex w-full justify-center md:w-auto md:justify-start"
              >
                <HoverBorderGradient
                  containerClassName="group rounded-full"
                  className="flex items-center gap-2 text-xs font-medium transition-colors duration-500 group-hover:text-cyan-400 sm:text-sm"
                  activeOnClick
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
                  </span>
                  Disponível para Oportunidades
                </HoverBorderGradient>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="relative z-10 mb-6 w-full bg-linear-to-b from-white to-neutral-500 bg-clip-text text-[1.7rem] leading-[1.1] font-bold tracking-tight text-transparent sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
              >
                <div className="flex flex-nowrap items-center justify-start gap-1.5 sm:gap-2">
                  <span className="me-1 inline-block whitespace-nowrap text-white sm:me-2">
                    Transformando
                  </span>

                  <motion.div
                    key={currentWordIndex}
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 rounded-lg border border-neutral-800 bg-neutral-900/50 p-1 text-cyan-400"
                  >
                    {currentWordIndex === 0 && (
                      <IconBulb
                        className="h-4 w-4 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                        stroke={2}
                      />
                    )}
                    {currentWordIndex === 1 && (
                      <IconCode
                        className="h-4 w-4 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                        stroke={2}
                      />
                    )}
                    {currentWordIndex === 2 && (
                      <IconPalette
                        className="h-4 w-4 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                        stroke={2}
                      />
                    )}
                    {currentWordIndex === 3 && (
                      <IconTargetArrow
                        className="h-4 w-4 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                        stroke={2}
                      />
                    )}
                  </motion.div>

                  <div className="min-w-17.5 sm:min-w-25 md:min-w-30 lg:min-w-40 xl:min-w-45">
                    <FlipWords
                      words={[...heroRotatingWords]}
                      duration={2500}
                      className="m-0! p-0! font-bold whitespace-nowrap text-white"
                      onWordChange={setCurrentWordIndex}
                    />
                  </div>
                </div>

                <div className="block whitespace-nowrap">
                  <span className="inline-block text-white">
                    em Novas Experiências
                  </span>
                </div>

                <div className="block whitespace-nowrap">
                  <span className="inline-block bg-linear-to-bl from-cyan-400 to-white bg-clip-text text-transparent">
                    Modernas e funcionais
                  </span>
                </div>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="relative z-10 mb-6 max-w-2xl text-lg font-normal text-neutral-600 md:mb-8 md:text-xl dark:text-neutral-300"
              >
                Sou{' '}
                <Tooltip
                  content={
                    <div className="space-y-2">
                      <div className="pb-2">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                          Dev Henrico
                        </p>
                        <div className="mt-2 h-px w-full bg-linear-to-r from-transparent via-neutral-600 to-transparent" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          São Paulo, Brasil 🇧🇷
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Nascido em: 27 de julho de 2006
                        </p>
                      </div>
                    </div>
                  }
                  containerClassName="inline"
                >
                  <span className="cursor-default font-semibold text-cyan-100 underline decoration-cyan-100/30 decoration-dashed underline-offset-4 transition-all hover:text-cyan-300 hover:decoration-cyan-300">
                    Henrico da Silva Santos
                  </span>
                </Tooltip>
                ,{' '}
                <Tooltip
                  content={
                    <div className="space-y-3">
                      <div className="pb-2">
                        <h3 className="mb-1 text-base font-semibold text-white">
                          FATEC Ferraz de Vasconcelos
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Ferraz de Vasconcelos, São Paulo
                        </p>
                        <div className="mt-2 h-px w-full bg-linear-to-r from-transparent via-neutral-600 to-transparent" />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-neutral-300">
                            Curso
                          </p>
                          <p className="text-sm text-white">
                            Análise e Desenvolvimento de Sistemas (ADS)
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs font-medium text-neutral-300">
                              Área
                            </p>
                            <p className="text-sm text-white">Desenvolvedor</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-neutral-300">
                              Conclusão
                            </p>
                            <p className="text-sm text-white">2028</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  containerClassName="inline"
                >
                  <span className="cursor-default font-semibold text-cyan-100 underline decoration-cyan-100/30 decoration-dashed underline-offset-4 transition-all hover:text-cyan-300 hover:decoration-cyan-300">
                    Desenvolvedor Frontend
                  </span>
                </Tooltip>{' '}
                com foco em interfaces minimalistas, código limpo e soluções
                intuitivas para projetos com identidade.
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex w-full flex-col items-start gap-6"
              >
                {/* Responsive Action Buttons */}
                <div className="w-full">
                  <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* View Projects Button */}
                    <a
                      href="/projects"
                      onClick={handleProjectsClick}
                      className="block w-full scroll-smooth"
                    >
                      <div className="group relative inline-flex h-12 w-full overflow-hidden rounded-full p-px focus:outline-none">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#083344_50%,#22d3ee_100%)]" />
                        <span className="group inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300">
                          <span>Ver Projetos</span>
                          <IconArrowNarrowDown className="h-4 w-4" />
                        </span>
                      </div>
                    </a>

                    {/* Download Curriculum / CV Options Button */}
                    <div className="relative block w-full" ref={cvDropdownRef}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowCVOptions(!showCVOptions)}
                        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 text-sm font-bold text-black shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-300"
                      >
                        <IconDownload className="h-4 w-4" />
                        <span>Baixar Currículo</span>
                        <IconChevronDown
                          className={`h-4 w-4 transition-transform duration-500 ${showCVOptions ? 'rotate-180' : ''}`}
                        />
                      </motion.div>

                      <AnimatePresence mode="wait">
                        {showCVOptions && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute top-full left-0 z-100 mt-3 w-full min-w-55 overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.85)] ring-1 ring-black/60 will-change-transform"
                          >
                            <button
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/assets/curriculo/devhenrico.pdf';
                                link.download = 'devhenrico.pdf';
                                link.click();
                                setShowCVOptions(false);
                              }}
                              className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm text-neutral-300 transition-all duration-300 hover:bg-white/7 hover:text-white"
                            >
                              <div className="rounded-lg border border-white/5 bg-white/5 p-2.5 transition-colors group-hover:border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:text-cyan-400">
                                <IconDownload size={20} />
                              </div>
                              <div className="flex flex-col items-start text-left">
                                <span className="text-sm font-bold text-white">
                                  Baixar CV
                                </span>
                                <span className="text-[11px] text-neutral-400 group-hover:text-neutral-300">
                                  Documento PDF
                                </span>
                              </div>
                            </button>

                            <button
                              onClick={() => {
                                window.open(
                                  '/assets/curriculo/devhenrico.pdf',
                                  '_blank',
                                );
                                setShowCVOptions(false);
                              }}
                              className="group mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm text-neutral-300 transition-all duration-300 hover:bg-white/7 hover:text-white"
                            >
                              <div className="rounded-lg border border-white/5 bg-white/5 p-2.5 transition-colors group-hover:border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:text-cyan-400">
                                <IconEye size={20} />
                              </div>
                              <div className="flex flex-col items-start text-left">
                                <span className="text-sm font-bold text-white">
                                  Abrir CV
                                </span>
                                <span className="text-[11px] text-neutral-400 group-hover:text-neutral-300">
                                  Visualização no navegador
                                </span>
                              </div>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center md:justify-start">
                  <AnimatedTooltip items={heroTechStack} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <ScrollDownLottie />
    </motion.div>
  );
};
