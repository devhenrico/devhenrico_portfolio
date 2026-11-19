import {
  IconCode,
  IconDownload,
  IconHeart,
  IconSchool,
} from '@tabler/icons-react';
import {
  ConstruindoSaberesHeader,
  DaGymHeader,
  DownloadYouTubeHeader,
  StreamPlayHeader,
} from '../components/projects/project-card-headers';

export const projects = [
  {
    id: 'dagym',
    title: 'DaGym',
    description:
      'Site de uma agência de desenvolvimento web, com serviços, depoimentos e formulário de contato.',
    header: <DaGymHeader />,
    icon: <IconCode className="h-4 w-4 text-neutral-500" />,
    link: 'https://dagym.vercel.app/',
    liveDemo: 'https://dagym.vercel.app/',
    className: '',
    techStack: [
      {
        id: 1,
        name: 'React',
        designation: 'Frontend',
        image: '/assets/logos/react-logo.svg',
      },
      {
        id: 2,
        name: 'TypeScript',
        designation: 'Frontend',
        image: '/assets/logos/typescript-logo.svg',
      },
      {
        id: 3,
        name: 'Tailwind CSS',
        designation: 'Frontend',
        image: '/assets/logos/tailwind-logo.svg',
      },
      {
        id: 4,
        name: 'Node.js',
        designation: 'Backend',
        image: '/assets/logos/nodejs-logo.svg',
      },
      {
        id: 5,
        name: 'Express',
        designation: 'Backend',
        image: '/assets/logos/expressjs-logo.svg',
      },
      {
        id: 6,
        name: 'Prisma',
        designation: 'Backend',
        image: '/assets/logos/prisma-logo.svg',
      },
      {
        id: 7,
        name: 'MongoDB',
        designation: 'Backend',
        image: '/assets/logos/mongodb-logo.svg',
      },
      {
        id: 8,
        name: 'Vite',
        designation: 'Frontend',
        image: '/assets/logos/vite-logo.svg',
      },
      {
        id: 9,
        name: 'Shadcn UI',
        designation: 'Frontend',
        image: '/assets/logos/shadcn-logo.svg',
      },
      {
        id: 10,
        name: 'Zod',
        designation: 'Backend',
        image: '/assets/logos/zod-logo.svg',
      },
    ],
  },
  {
    id: 'streamplay',
    title: 'StreamPlay',
    description:
      'Interface de streaming com catálogo interativo de filmes e séries, planos de assinatura e FAQ.',
    header: <StreamPlayHeader />,
    icon: <IconSchool className="h-4 w-4 text-neutral-500" />,
    link: 'https://streamplaydev.vercel.app/',
    liveDemo: 'https://streamplaydev.vercel.app/',
    className: '',
    techStack: [
      {
        id: 1,
        name: 'HTML',
        designation: 'Frontend',
        image: '/assets/logos/html-logo.svg',
      },
      {
        id: 2,
        name: 'CSS',
        designation: 'Frontend',
        image: '/assets/logos/css-logo.svg',
      },
      {
        id: 3,
        name: 'JavaScript',
        designation: 'Frontend',
        image: '/assets/logos/javascript-logo.svg',
      },
    ],
  },
  {
    id: 'download-youtube',
    title: 'Download YouTube',
    description:
      'Aplicação web para baixar vídeos do YouTube em MP4 e extrair áudio em MP3 com yt-dlp e FFmpeg.',
    header: <DownloadYouTubeHeader />,
    icon: <IconDownload className="h-4 w-4 text-neutral-500" />,
    link: 'https://github.com/devhenrico/download-youtube',
    className: '',
    techStack: [
      {
        id: 1,
        name: 'Python',
        designation: 'Backend',
        image: '/assets/logos/techstack-generator/python-icon.svg',
      },
      {
        id: 2,
        name: 'HTML',
        designation: 'Frontend',
        image: '/assets/logos/html-logo.svg',
      },
      {
        id: 3,
        name: 'JavaScript',
        designation: 'Frontend',
        image: '/assets/logos/javascript-logo.svg',
      },
      {
        id: 4,
        name: 'SCSS',
        designation: 'Estilos',
        image: '/assets/logos/techstack-generator/sass-icon.svg',
      },
    ],
  },
  {
    id: 'construindo-saberes',
    title: 'Clínica Construindo Saberes',
    description:
      'Site de uma clínica infantil multidisciplinar que apresenta suas especialidades e oferece agendamento pelo WhatsApp.',
    header: <ConstruindoSaberesHeader />,
    icon: <IconHeart className="h-4 w-4 text-neutral-500" />,
    link: 'https://clinicaconstruindosaberes.com.br/',
    liveDemo: 'https://clinicaconstruindosaberes.com.br/',
    className: '',
    techStack: [
      {
        id: 1,
        name: 'Next.js',
        designation: 'Framework',
        image: '/assets/logos/nextjs-logo.svg',
      },
      {
        id: 2,
        name: 'Tailwind CSS',
        designation: 'Estilos',
        image: '/assets/logos/tailwind-logo.svg',
      },
      {
        id: 3,
        name: 'React',
        designation: 'Frontend',
        image: '/assets/logos/react-logo.svg',
      },
      {
        id: 4,
        name: 'shadcn/ui',
        designation: 'Componentes',
        image: '/assets/logos/shadcn-logo.svg',
      },
      {
        id: 5,
        name: 'TypeScript',
        designation: 'Linguagem',
        image: '/assets/logos/typescript-logo.svg',
      },
      {
        id: 6,
        name: 'GSAP',
        designation: 'Animações',
        image: '/assets/logos/gsap-logo.svg',
      },
      {
        id: 7,
        name: 'Zod',
        designation: 'Validação',
        image: '/assets/logos/zod-logo.svg',
      },
    ],
  },
];
