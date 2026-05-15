import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
  IconCpu,
  IconHome,
  IconUser,
} from '@tabler/icons-react';

export const sectionRouteMap = {
  '/home': 'home',
  '/projects': 'projects',
  '/technologies': 'technologies',
  '/contact': 'contact',
} as const;

export type SectionRoute = keyof typeof sectionRouteMap;

export const getSectionIdForRoute = (href: string) =>
  sectionRouteMap[href as SectionRoute];

export const navigationLinks = [
  { href: '/home', label: 'Início' },
  { href: '/about', label: 'Sobre' },
  { href: '/projects', label: 'Projetos' },
  { href: '/technologies', label: 'Tecnologias' },
  { href: '/contact', label: 'Contato' },
] as const;

export const socialLinks = [
  {
    href: 'https://github.com/devhenrico',
    icon: IconBrandGithub,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/henrico-santos',
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
  },
] as const;

export const navItems = [
  {
    name: 'Home',
    link: '/home',
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'About',
    link: '/about',
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'Projects',
    link: '/projects',
    icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'Technologies',
    link: '/technologies',
    icon: <IconCpu className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
] as const;
