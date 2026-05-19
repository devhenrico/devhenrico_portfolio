'use client';

import { motion, Variants } from 'motion/react';
import { BentoGrid, BentoGridItem } from '@/components/ui/layout/bento-grid';
import { AnimatedTooltip } from '@/components/ui/misc/animated-tooltip';
import {
  IconServer,
  IconTools,
  IconLayoutDashboard,
  IconTerminal2,
} from '@tabler/icons-react';
import {
  backendItems,
  toolsItems,
  frontendItems,
  programmingLanguageItems,
} from '@/constants';

export const TechGrid = () => {
  const items = [
    {
      title: 'Frontend',
      description: (
        <span className="text-sm font-normal text-neutral-400 sm:text-base md:text-lg">
          Criação de interfaces responsivas e bem acabadas, com foco em
          experiência do usuário e performance.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
            <AnimatedTooltip
              items={frontendItems}
              itemClassName="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15"
            />
          </div>
        </div>
      ),
      className: 'md:col-span-1',
      icon: <IconLayoutDashboard className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Linguagens de Programação',
      description: (
        <span className="text-sm font-normal text-neutral-400 sm:text-base md:text-lg">
          Fundamentos para escrever código claro, estruturado e adaptável em
          diferentes contextos de desenvolvimento.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
            <AnimatedTooltip
              items={programmingLanguageItems}
              itemClassName="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15"
            />
          </div>
        </div>
      ),
      className: 'md:col-span-1',
      icon: <IconTerminal2 className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Backend',
      description: (
        <span className="text-sm font-normal text-neutral-400 sm:text-base md:text-lg">
          Criação de serviços, APIs e integrações com foco em dados, segurança,
          escalabilidade e manutenção eficiente.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
            <AnimatedTooltip
              items={backendItems}
              itemClassName="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15"
            />
          </div>
        </div>
      ),
      className: 'md:col-span-1',
      icon: <IconServer className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Ferramentas',
      description: (
        <span className="text-sm font-normal text-neutral-400 sm:text-base md:text-lg">
          Fluxo de desenvolvimento, organização do código, validação,
          padronização, autenticação e deploy de aplicações.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
            <AnimatedTooltip
              items={toolsItems}
              itemClassName="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15"
            />
          </div>
        </div>
      ),
      className: 'md:col-span-1',
      icon: <IconTools className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const bentoVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <BentoGrid className="mx-auto max-w-full gap-6 md:auto-rows-[26rem] md:grid-cols-2 md:gap-8">
      {items.map((item, i) => (
        <motion.div key={i} variants={bentoVariants} className={item.className}>
          <BentoGridItem
            title={item.title}
            description={item.description}
            header={item.header}
            className="h-full"
            icon={item.icon}
          />
        </motion.div>
      ))}
    </BentoGrid>
  );
};
