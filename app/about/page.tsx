'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { DotBackground } from '@/components/ui/backgrounds/dot-background';
import { SharedNavbar } from '@/components/layout/shared-navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white transition-colors duration-300 dark:bg-black">
      <SharedNavbar />

      {/* Main Content with Dot Background */}
      <DotBackground className="min-h-screen px-4 pt-20 pb-20 sm:px-6 md:pb-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-10"
          >
            <h1 className="text-3xl leading-[1.1] font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-5xl dark:text-white">
              Conheça o seu{' '}
              <span className="inline-block bg-linear-to-bl from-cyan-400 to-white bg-clip-text text-transparent">
                Desenvolvedor Frontend
              </span>
            </h1>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mx-auto w-full max-w-md lg:mx-0"
            >
              {/* Top Right Corner Accent */}
              <div className="absolute -top-6 -right-6 z-0 h-24 w-24">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="overflow-visible"
                >
                  <motion.path
                    d="M 20 20 L 60 20 Q 80 20 80 40 L 80 80"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </svg>
              </div>

              {/* Bottom Left Corner Accent */}
              <div className="absolute -bottom-6 -left-6 z-0 h-24 w-24">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="overflow-visible"
                >
                  <motion.path
                    d="M 80 80 L 40 80 Q 20 80 20 60 L 20 20"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </svg>
              </div>

              <div className="group relative z-10 aspect-square w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800/60 dark:bg-neutral-900/40">
                <Image
                  src="/assets/images/henrico.png"
                  alt="Dev Henrico - Desenvolvedor Frontend"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-120"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-8"
            >
              <div className="space-y-6 text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-300">
                <p>
                  Sou Henrico, desenvolvedor Frontend focado em construir
                  experiências digitais modernas, responsivas e bem estruturadas
                  para pessoas e pequenos negócios. Crio interfaces limpas e
                  intuitivas que se destacam visualmente e funcionam
                  perfeitamente em qualquer dispositivo, com forte atenção aos
                  detalhes de UI/UX e à experiência do usuário. Minha abordagem
                  prioriza código limpo, componentização eficiente e arquitetura
                  organizada — garantindo que cada projeto seja escalável,
                  sólido e profissional. Com vivência em frontend, backend e
                  bancos de dados, tenho uma visão completa do produto, da
                  interface à camada de dados, o que me permite construir
                  soluções verdadeiramente alinhadas às necessidades reais de
                  cada negócio. Do conceito ao deploy, meu compromisso é
                  entregar produtos bem construídos que geram valor real e
                  duradouro.
                </p>
              </div>

              {/* Stats */}
              <div className="relative pt-8 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-neutral-600 before:to-transparent">
                <div className="grid grid-cols-2 gap-6">
                  <div className="group cursor-default">
                    <p className="text-3xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-cyan-500 dark:text-white dark:group-hover:text-cyan-400">
                      +4
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                      Anos de Aprendizado
                    </p>
                  </div>
                  <div className="group cursor-default">
                    <p className="text-3xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-cyan-500 dark:text-white dark:group-hover:text-cyan-400">
                      +12
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                      Projetos Construídos
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DotBackground>
    </main>
  );
}
