import type { TechItem } from '@/types';

export const heroRotatingWords = [
  'Ideias',
  'Códigos',
  'Interfaces',
  'Desafios',
] as const;

export const heroTechStack: TechItem[] = [
  {
    id: 1,
    name: 'React',
    designation: 'Biblioteca de UI',
    image: 'https://techstack-generator.vercel.app/react-icon.svg',
  },
  {
    id: 2,
    name: 'Next.js',
    designation: 'Framework React',
    image: '/assets/logos/nextjs-logo.svg',
  },
  {
    id: 3,
    name: 'TypeScript',
    designation: 'Tipagem Estática',
    image: 'https://techstack-generator.vercel.app/ts-icon.svg',
  },
  {
    id: 4,
    name: 'C#',
    designation: 'Linguagem de Programação',
    image: 'https://techstack-generator.vercel.app/csharp-icon.svg',
  },
  {
    id: 5,
    name: 'Tailwind CSS',
    designation: 'Framework CSS',
    image: '/assets/logos/tailwind-logo.svg',
  },
];
