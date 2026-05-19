'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { IntroLoader } from '@/components/layout/intro-loader';
import { Spotlight } from '@/components/ui/backgrounds/spotlight-new';
import { HeroSection } from '@/components/hero';
import { ScrollProgress } from '@/components/ui/effects/scroll-progress';
import { getSectionIdForRoute } from '@/constants/navigation';
import { scrollToLandingSection } from '@/lib/section-navigation';
import { cn } from '@/lib/utils';

const FeaturesSection = dynamic(
  () => import('@/components/features').then((mod) => mod.FeaturesSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const ProjectsSection = dynamic(
  () => import('@/components/projects').then((mod) => mod.ProjectsSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const TechnologiesSection = dynamic(
  () =>
    import('@/components/technologies').then((mod) => mod.TechnologiesSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const ContactSection = dynamic(
  () => import('@/components/contact').then((mod) => mod.ContactSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const PreFooterCTA = dynamic(
  () =>
    import('@/components/layout/cta-section').then((mod) => mod.PreFooterCTA),
  {
    loading: () => <div className="h-40" />,
  },
);
const Footer = dynamic(
  () => import('@/components/layout/footer').then((mod) => mod.Footer),
  {
    loading: () => <div className="h-20" />,
  },
);

const dividerOffsets = {
  center: '',
  lower: 'translate-y-10 md:translate-y-12',
  higher: '-translate-y-16 md:-translate-y-18',
  lowest: 'translate-y-20 md:translate-y-22',
} as const;

function SectionDivider({
  offset = 'center',
  className,
}: {
  offset?: keyof typeof dividerOffsets;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative z-0 -my-12 flex h-24 w-full items-center justify-center transition-opacity duration-200 md:-my-16 md:h-32',
        dividerOffsets[offset],
        className,
      )}
    >
      <div className="h-px w-3/4 bg-linear-to-r from-transparent via-cyan-500 to-transparent md:w-40" />
    </div>
  );
}

export default function Home() {
  const pathname = usePathname();
  const [isHeroCVDropdownOpen, setIsHeroCVDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const targetId = getSectionIdForRoute(pathname);

    if (!targetId) return;

    let timeout: ReturnType<typeof setTimeout>;
    let attempts = 0;

    const scrollToSection = () => {
      attempts += 1;

      if (scrollToLandingSection(targetId)) {
        return;
      }

      if (attempts < 20) {
        timeout = setTimeout(scrollToSection, 100);
      }
    };

    timeout = setTimeout(scrollToSection, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-black px-4 text-white transition-colors duration-300 sm:px-10">
      <IntroLoader />

      <ScrollProgress className="bg-linear-to-r from-transparent via-cyan-500 to-transparent" />

      <Spotlight />
      <div className="w-full">
        <div
          className={cn(
            'relative',
            isHeroCVDropdownOpen ? 'z-20' : 'z-auto',
          )}
        >
          <HeroSection onCVDropdownChange={setIsHeroCVDropdownOpen} />
        </div>
        <SectionDivider
          className={isHeroCVDropdownOpen ? 'invisible' : undefined}
        />
        <FeaturesSection />
        <SectionDivider offset="lower" />
        <ProjectsSection />
        <SectionDivider offset="higher" />
        <TechnologiesSection />
        <SectionDivider offset="lowest" />
        <ContactSection />
        <PreFooterCTA />
        <Footer />
      </div>
    </main>
  );
}
