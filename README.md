# 🚀 Dev Henrico — Portfólio (Website Minimalista)

> Portfólio minimalista construído com Next.js, React, TypeScript e Tailwind CSS. Apresenta animações fluidas com GSAP e Motion, design dark com acentos em cyan, carregamento lazy de seções, formulário de contato com anti-spam e showcase completo de projetos e tecnologias.

**🌐 Website:** [devhenrico.me](https://devhenrico.me)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Páginas e Seções](#-páginas-e-seções)
- [Funcionalidades](#-funcionalidades)
- [Tech Stack](#-tech-stack)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Começando](#-começando)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts](#-scripts)
- [Testes](#-testes)
- [Deploy](#-deploy)

---

## 🔍 Visão Geral

Portfólio desenvolvido do zero com foco em performance e experiência visual. A aplicação utiliza uma arquitetura de **Single Page Application com scroll suave** na rota principal (`/`), enquanto a página `/about` têm rota própria. Sections são carregadas de forma **lazy** com `next/dynamic` para garantir um FCP/LCP otimizado.

---

## 📄 Páginas e Seções

### Rota `/` — Landing Page

A página principal é uma SPA com scroll navegável entre seções:

| Seção            | Rota interna    | Descrição                                                                                                                                                                  |
| ---------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**         | `/home`         | Apresentação com foto, título animado com `FlipWords`, badge de disponibilidade, stack de tecnologias e botões de ação (ver projetos e baixar/visualizar currículo em PDF) |
| **Diferenciais** | —               | Cards interativos com `CanvasRevealEffect` que revelam os diferenciais: Código Limpo, Visão Completa e Foco no Usuário                                                     |
| **Projetos**     | `/projects`     | Grid de projetos com `BentoGrid`, headers customizados por projeto e badges de tech stack                                                                                  |
| **Tecnologias**  | `/technologies` | Showcase de todas as tecnologias dominadas, agrupadas em: Frontend, Linguagens, Backend e Ferramentas                                                                      |
| **Contato**      | `/contact`      | Formulário de contato com EmailJS, sistema de cooldown anti-spam e confetti de celebração ao enviar                                                                        |
| **Footer**       | —               | CTA final e links sociais (GitHub e LinkedIn)                                                                                                                              |

### Rota `/about` — Página Sobre

Página separada com layout de duas colunas: foto com acentos SVG animados e biografia com diferenciais. Exibe estatísticas (+4 anos de aprendizado, +10 projetos construídos) e utiliza o componente `DotBackground`.

---

## ✨ Funcionalidades

### Navegação e Layout

- **Scroll suave** via `Lenis` para toda a aplicação
- **Floating Navbar** com floating dock e navegação por âncoras/seções
- **URL routing** — links como `/home`, `/projects`, `/technologies`, `/contact` fazem scroll até a seção correspondente com retry automático para garantir que a seção já foi renderizada
- **Scroll Progress Bar** no topo da página
- **Intro Loader** animado na primeira carga
- **Scroll to Top Button** no canto inferior direito

### Hero Section

- Layout de duas colunas (imagem + conteúdo) responsivo
- Foto com blur de entrada animada e skeleton loader enquanto carrega
- Título dinâmico com ícones rotativos e `FlipWords`
- Badge de "Disponível para Oportunidades" com dot pulsante
- Botão de download de currículo com dropdown (baixar PDF / visualizar no navegador)
- Animações de grid lines via GSAP (`expo.inOut`)
- Relógio local em tempo real sobreposto à foto (`HeroClock`)
- Animação de scroll down via LottieFiles

### Formulário de Contato

- Integração com **EmailJS** via variáveis de ambiente
- **Sistema de cooldown anti-spam** com escalonamento progressivo:
  - 1ª mensagem → cooldown de 2 minutos
  - 2ª mensagem → cooldown de 5 minutos
  - 3ª+ mensagens → cooldown de 10 minutos
  - Reset automático após 1 hora de inatividade
- Estado persistido no `localStorage`
- Modal de confirmação antes do envio (Radix UI `AlertDialog`)
- Feedback visual com `AnimatedAlert` (sucesso/erro)
- **Confetti** ao enviar com sucesso (`canvas-confetti`)
- Countdown em tempo real durante o cooldown

### Design & Animações

- Tema escuro fixo com acentos em `cyan-400/500`
- Spotlight animado no background (`SpeedInsights`)
- `CanvasRevealEffect` nos cards da seção Features
- `Spotlight` como background da landing page
- Micro-animações com **Motion (Framer Motion)**
- Animações de entrada com **GSAP** (`@gsap/react`)
- Animações 3D preparadas com **Three.js** e **React Three Fiber**
- Gradientes lineares e radiais como acentos visuais
- Tipografia com fonte **Inter** (Google Fonts via `next/font`)
- **Web Vitals Reporter** integrado para monitoramento de performance

---

## 🛠 Tech Stack

### Core

| Tecnologia   | Versão | Uso                              |
| ------------ | ------ | -------------------------------- |
| Next.js      | 16     | Framework principal (App Router) |
| React        | 19     | Biblioteca de UI                 |
| TypeScript   | 5      | Tipagem estática                 |
| Tailwind CSS | 4      | Estilização utilitária           |

### Animações

| Biblioteca                   | Uso                                            |
| ---------------------------- | ---------------------------------------------- |
| Motion (Framer Motion)       | Animações de componentes                       |
| GSAP                         | Animações de performance (grid lines, entrada) |
| Lenis                        | Scroll suave global                            |
| @lottiefiles/dotlottie-react | Animação de scroll down                        |

### UI & Componentes

| Biblioteca          | Uso                                              |
| ------------------- | ------------------------------------------------ |
| @tabler/icons-react | Ícones                                           |
| Radix UI            | Primitivos acessíveis (AlertDialog, Label, Slot) |
| Lucide React        | Ícones complementares                            |
| Sonner              | Toasts e notificações                            |
| canvas-confetti     | Efeito confetti pós-envio                        |

### 3D & Gráficos

| Biblioteca         | Uso                           |
| ------------------ | ----------------------------- |
| Three.js           | Renderização 3D               |
| @react-three/fiber | Integração Three.js com React |

### Integração

| Serviço               | Uso                                       |
| --------------------- | ----------------------------------------- |
| EmailJS               | Envio de e-mails do formulário de contato |
| Vercel Analytics      | Analytics de visitantes                   |
| Vercel Speed Insights | Monitoramento de performance              |

### Testes

| Ferramenta             | Uso                                   |
| ---------------------- | ------------------------------------- |
| Vitest                 | Testes unitários e de componentes     |
| @testing-library/react | Renderização de componentes em testes |
| Playwright             | Testes E2E (end-to-end)               |
| jsdom                  | Ambiente DOM para testes unitários    |

---

## 📁 Estrutura do Projeto

```
devhenrico-portfolio/
├── app/                              # App Router (Next.js)
│   ├── about/                        # Rota /about (página Sobre)
│   ├── contact/                      # Rota /contact (página Contato)
│   ├── home/                         # Rota /home (página Home)
│   ├── projects/                     # Rota /projects (página Projetos)
│   ├── technologies/                 # Rota /technologies (página Tecnologias)
│   ├── global-error.tsx              # Erro global (fora do layout)
│   ├── error.tsx                     # Página de erro
│   ├── globals.css                   # Estilos globais e tokens de design
│   ├── layout.tsx                    # Layout raiz (metadata SEO, fontes, providers)
│   ├── loading.tsx                   # Loading state global
│   └── page.tsx                      # Landing page (SPA com seções)
│
├── components/
│   ├── contact/                      # Formulário e informações de contato
│   │   ├── contact-form.tsx          # Form com EmailJS, cooldown e confetti
│   │   ├── contact-info.tsx          # Links sociais e e-mail
│   │   └── index.tsx
│   ├── features/                     # Seção de diferenciais com CanvasRevealEffect
│   │   └── index.tsx
│   ├── hero/                         # Seção hero completa
│   │   ├── hero-clock.tsx            # Relógio local em tempo real
│   │   ├── hero-content.tsx          # Layout principal, animações GSAP
│   │   ├── index.tsx
│   │   └── scroll-down-lottie.tsx
│   ├── layout/                       # Componentes de layout globais
│   │   ├── cta-section.tsx           # Pre-footer CTA
│   │   ├── footer.tsx
│   │   ├── intro-loader.tsx          # Loader animado de entrada
│   │   ├── scroll-to-top-button.tsx
│   │   ├── shared-navbar.tsx         # Navbar compartilhado entre / e /about
│   │   └── web-vitals.tsx            # Reporter de Core Web Vitals
│   ├── projects/                     # Seção de projetos
│   │   ├── index.tsx
│   │   ├── minimal-project-card.tsx  # Card individual de projeto
│   │   └── project-card-headers.tsx  # Headers visuais customizados por projeto
│   ├── technologies/                 # Seção de tecnologias
│   │   ├── index.tsx
│   │   └── tech-grid.tsx             # Grid de tecnologias por categoria
│   └── ui/                           # Design system de componentes
│       ├── backgrounds/              # Spotlight, DotBackground
│       ├── buttons/                  # HoverBorderGradient
│       ├── cards/                    # TooltipCard, BentoGrid
│       ├── effects/                  # CanvasRevealEffect, ScrollProgress, SmoothScroll
│       ├── layout/                   # Componentes de layout reutilizáveis
│       ├── misc/                     # AnimatedAlert, AnimatedTooltip, Lottie
│       ├── primitives/               # AlertDialog, Input, Label, Sonner
│       └── text/                     # FlipWords
│
├── constants/
│   ├── hero.ts                       # Palavras rotativas e tech stack do hero
│   ├── index.tsx                     # Re-exportações dos constantes
│   ├── navigation.tsx                # Links de navegação, sociais e mapa de seções
│   ├── projects.tsx                  # Dados dos 4 projetos do portfólio
│   └── technologies.ts               # Dados de todas as tecnologias (4 categorias)
│
├── hooks/
│   └── use-outside-click.tsx
│
├── lib/
│   ├── fonts.ts                      # Configuração da fonte Inter
│   ├── section-navigation.ts         # Lógica de scroll para seção por rota
│   └── utils.ts                      # Utilitário cn() para classnames
│
├── public/
│   └── assets/
│       ├── curriculo/                # devhenrico.pdf
│       ├── images/                   # devhenrico.png, preview.png (OG)
│       ├── logos/                    # Logos SVG de tecnologias
│       ├── lottie/                   # Animações Lottie (scroll-down-hint.json)
│       └── projects/                 # Screenshots dos projetos (dagym, econoapp, fr-semijoias, streamplay)
│
├── tests/
│   ├── components/                   # Testes unitários (Vitest + Testing Library)
│   ├── data/                         # Dados mock para testes
│   ├── e2e/                          # Testes E2E (Playwright)
│   ├── hooks/                        # Testes de hooks customizados
│   ├── lib/                          # Testes de utilitários
│   └── pages/                        # Testes de páginas
│
├── types/
│   └── index.ts                      # Tipos TypeScript globais
│
├── .env                              # Variáveis de ambiente (não commitado)
├── .env.example                      # Modelo de variáveis de ambiente
├── .gitignore                        # Arquivos ignorados pelo Git
├── .prettierrc                       # Config de formatação (Prettier)
├── components.json                   # Config do shadcn/ui
├── eslint.config.mjs                 # Config do ESLint
├── next.config.ts                    # Config Next.js (otimização de imagens, compressão)
├── postcss.config.mjs                # Config do PostCSS (Tailwind)
├── tailwind.config.ts                # Config Tailwind CSS
├── tsconfig.json                     # Config TypeScript
├── vitest.config.ts                  # Config de testes unitários
├── vitest.setup.ts                   # Setup global dos testes (mocks, matchers)
├── playwright.config.ts              # Config de testes E2E
└── package.json
```

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/devhenrico/cjblack.dev-minimalistic-portfolio.git
cd cjblack.dev-minimalistic-portfolio

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do EmailJS

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# EmailJS — necessário para o formulário de contato funcionar
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

### Como obter as credenciais do EmailJS

1. Crie uma conta em [emailjs.com](https://www.emailjs.com/)
2. Crie um **Service** (conecte sua conta de e-mail)
3. Crie um **Template** de e-mail com as variáveis: `{{name}}`, `{{email}}`, `{{title}}`, `{{time}}`, `{{message}}`
4. Copie o **Service ID**, **Template ID** e **Public Key**

---

## 📜 Scripts

| Comando               | Descrição                                                |
| --------------------- | -------------------------------------------------------- |
| `npm run dev`         | Inicia o servidor de desenvolvimento em `localhost:3000` |
| `npm run build`       | Gera o build de produção                                 |
| `npm run start`       | Inicia o servidor de produção                            |
| `npm run lint`        | Executa o ESLint                                         |
| `npm run format`      | Formata o código com Prettier                            |
| `npm test`            | Executa todos os testes unitários (Vitest)               |
| `npm run test:watch`  | Executa testes em modo watch                             |
| `npm run test:e2e`    | Executa testes E2E (Playwright)                          |
| `npm run test:e2e:ui` | Abre a UI interativa do Playwright                       |

---

## 🧪 Testes

O projeto possui duas camadas de testes:

### Testes Unitários — Vitest + Testing Library

Testam componentes React de forma isolada com jsdom como ambiente de DOM.

```bash
npm test           # roda uma vez
npm run test:watch # modo watch (interativo)
```

### Testes E2E — Playwright

Testam o fluxo completo da aplicação no Chromium. O Playwright inicia o servidor `next dev` automaticamente antes de rodar os testes.

```bash
npm run test:e2e    # modo CLI
npm run test:e2e:ui # modo visual interativo
```

---

## 🚢 Deploy

O projeto está configurado para deploy na **Vercel** com zero configuração adicional.

### Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Via GitHub

1. Conecte o repositório no [dashboard da Vercel](https://vercel.com/dashboard)
2. Configure as variáveis de ambiente na aba **Environment Variables**
3. Qualquer push para a branch `main` fará deploy automático

### Configurações de produção aplicadas

- **Compressão** habilitada (`compress: true`)
- **Otimização de imagens** com formatos AVIF e WebP
- **`poweredByHeader`** desativado
- **Otimização de pacotes** para `@tabler/icons-react`, `motion` e `three`
- LCP image com `priority` para preload correto

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Henrico da Silva Santos (devhenrico)**

- 🐙 **GitHub:** [@devhenrico](https://github.com/devhenrico)
- 💼 **LinkedIn:** [/henrico-santos](https://www.linkedin.com/in/henrico-santos)
- 📧 **Email:** [henricosantos27@outlook.com](mailto:henricosantos27@outlook.com)
