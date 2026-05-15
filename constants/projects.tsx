import {
  IconClipboardCopy,
  IconTableColumn,
  IconSchool,
  IconCode,
} from '@tabler/icons-react';
import {
  FRSemijoiasHeader,
  EconoAppHeader,
  StreamPlayHeader,
  DaGymHeader,
} from '../components/projects/project-card-headers';

export const projects = [
  {
    id: 'dagym',
    title: 'DaGym',
    description:
      'Landing page fullstack para uma agência de desenvolvimento web, com design minimalista, animações fluidas, navegação por seções, carrossel dinâmico de depoimentos, vitrine de processos e serviços, e formulário de contato com validação de dados integrado a uma API REST.',
    header: <DaGymHeader />,
    icon: <IconCode className="h-4 w-4 text-neutral-500" />,
    link: 'https://www.dagym.dev/',
    liveDemo: 'https://www.dagym.dev/',
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
      'Interface de uma plataforma de streaming com layout moderno e responsivo, catálogo interativo de filmes e séries organizado por gênero, cards com animações fluidas de scroll, seção de planos de assinatura com comparativo de recursos e FAQ com accordion dinâmico.',
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
    id: 'econoapp',
    title: 'EconoApp',
    description:
      'Assistente financeiro pessoal via Telegram com inteligência artificial, capaz de interpretar mensagens de voz e texto em linguagem natural para registrar transações, gerenciar canais de venda com taxas automáticas e gerar relatórios visuais com gráficos de categorias.',
    header: <EconoAppHeader />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    link: 'https://github.com/devhenrico/econoapp',
    className: '',
    techStack: [
      {
        id: 1,
        name: 'NestJS',
        designation: 'Backend',
        image: '/assets/logos/nestjs-logo.svg',
      },
      {
        id: 2,
        name: 'TypeScript',
        designation: 'Linguagem',
        image: '/assets/logos/typescript-logo.svg',
      },
      {
        id: 3,
        name: 'Prisma',
        designation: 'ORM',
        image: '/assets/logos/prisma-logo.svg',
      },
      {
        id: 4,
        name: 'PostgreSQL',
        designation: 'Banco de Dados',
        image: '/assets/logos/postgresql-logo.svg',
      },
      {
        id: 5,
        name: 'Zod',
        designation: 'Validação',
        image: '/assets/logos/zod-logo.svg',
      },
      {
        id: 6,
        name: 'Vitest',
        designation: 'Teste',
        image: '/assets/logos/vitest-logo.svg',
      },
      {
        id: 7,
        name: 'Docker',
        designation: 'Containerização',
        image: '/assets/logos/docker-logo.svg',
      },
    ],
  },
  {
    id: 'fr-semijoias',
    title: 'FR Semijoias',
    description:
      'Plataforma de e-commerce para venda de semijoias, com catálogo, carrinho de compras e checkout integrado ao Mercado Pago. Conta com painel administrativo, gestão de produtos, controle de estoque, sistema de promoções e autenticação com verificação por e-mail.',
    header: <FRSemijoiasHeader />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    link: 'https://frsemijoias.ifhost.gru.br/',
    liveDemo: 'https://frsemijoias.ifhost.gru.br/',
    className: '',
    techStack: [
      {
        id: 1,
        name: 'PHP',
        designation: 'Backend',
        image: '/assets/logos/php-logo.svg',
      },
      {
        id: 2,
        name: 'MySQL',
        designation: 'Banco de Dados',
        image: '/assets/logos/mysql-logo.svg',
      },
      {
        id: 3,
        name: 'JavaScript',
        designation: 'Frontend',
        image: '/assets/logos/javascript-logo.svg',
      },
      {
        id: 4,
        name: 'Bootstrap',
        designation: 'Frontend',
        image: '/assets/logos/bootstrap-logo.svg',
      },
      {
        id: 5,
        name: 'HTML',
        designation: 'Frontend',
        image: '/assets/logos/html-logo.svg',
      },
      {
        id: 6,
        name: 'CSS',
        designation: 'Frontend',
        image: '/assets/logos/css-logo.svg',
      },
      {
        id: 7,
        name: 'Docker',
        designation: 'Containerização',
        image: '/assets/logos/docker-logo.svg',
      },
    ],
  },
];
