'use client';

import React from 'react';
import { motion } from 'motion/react';
import { IconArrowRight } from '@tabler/icons-react';

export function PreFooterCTA() {
  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const element = document.getElementById('contact');
    if (!element) return;

    event.preventDefault();
    window.history.pushState(null, '', '/contact');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-14 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-neutral-600 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-neutral-600 to-transparent"
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.5px,transparent_1.5px)] bg-size-[32px_32px]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Tem um projeto em mente?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Posso ajudar a criar sites, sistemas, dashboards e aplicações web
            com estrutura organizada, navegação fluida e atenção aos detalhes
            que tornam a experiência mais clara e eficiente.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              onClick={handleContactClick}
              className="group relative z-20 inline-flex h-12 min-w-44 cursor-pointer items-center justify-between gap-3 rounded-full bg-white pr-2 pl-5 font-semibold text-black transition-all duration-300 hover:bg-neutral-200"
            >
              <span className="text-left">Começar agora</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-neutral-800">
                <IconArrowRight className="h-4 w-4" />
              </span>
            </a>

            <a
              href="mailto:henricosantos27@outlook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-800 bg-black p-6 font-semibold text-white transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900"
            >
              Entrar em contato
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
