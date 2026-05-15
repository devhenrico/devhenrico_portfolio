'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { navigationLinks, socialLinks } from '@/constants/navigation';
import { navigateToLandingRoute } from '@/lib/section-navigation';

export const SharedNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (isLandingPage && navigateToLandingRoute(href)) {
      event.preventDefault();
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (isLandingPage) return false;
    return pathname === href;
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-neutral-200/20 bg-white/10 backdrop-blur-xl transition-colors duration-300 dark:border-neutral-800/20 dark:bg-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-sports text-2xl font-bold tracking-wider text-neutral-900 dark:text-white">
              devhenrico
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigationLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => handleLinkClick(event, item.href)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Social Links */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-neutral-400 transition-colors duration-300 hover:bg-neutral-100/50 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-800/30 dark:hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors duration-300 hover:bg-neutral-100/50 hover:text-neutral-900 dark:hover:bg-neutral-800/30 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute"
                  >
                    <IconX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute"
                  >
                    <IconMenu2 size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-neutral-200/20 bg-white/10 backdrop-blur-xl transition-colors duration-300 md:hidden dark:border-neutral-800/20 dark:bg-black/10"
          >
            <div className="space-y-2 px-4 py-4">
              {navigationLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleLinkClick(event, item.href)}
                  className={`block py-2.5 text-base font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 pt-2 transition-colors duration-300">
                <div
                  aria-hidden="true"
                  className="mb-4 h-px w-full bg-linear-to-r from-transparent via-neutral-600 to-transparent"
                />
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-neutral-100/50 p-2.5 text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:bg-neutral-900/30 dark:hover:text-white"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
