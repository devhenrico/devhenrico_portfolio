import type { Metadata } from 'next';
import { inter } from '@/lib/fonts';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { SmoothScroll } from '@/components/ui/effects/smooth-scroll';
import { WebVitalsReporter } from '@/components/layout/web-vitals';
import { Toaster } from '@/components/ui/primitives/sonner';
import { ScrollToTopButton } from '@/components/layout/scroll-to-top-button';

export const metadata: Metadata = {
  metadataBase: new URL('https://devhenrico.me'),
  title: 'Dev Henrico | Desenvolvedor Frontend',
  description:
    'Portfólio de Henrico da Silva Santos (Dev Henrico), desenvolvedor frontend de São Paulo especializado em Next.js, React e interfaces modernas.',
  keywords: [
    'dev henrico',
    'devhenrico.me',
    'henrico da silva santos',
    'desenvolvedor frontend',
    'desenvolvedor frontend sao paulo',
    'desenvolvedor react',
    'desenvolvedor next.js',
    'frontend developer',
    'react developer',
    'next.js developer',
    'portfolio frontend',
    'portfolio desenvolvedor',
    'interfaces modernas',
  ],
  authors: [{ name: 'Henrico da Silva Santos', url: 'https://devhenrico.me' }],
  creator: 'Henrico da Silva Santos',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://devhenrico.me',
    title: 'Dev Henrico | Desenvolvedor Frontend',
    description:
      'Portfólio de um Desenvolvedor Frontend focado em interfaces modernas, responsivas e bem estruturadas.',
    siteName: 'Dev Henrico Portfólio',
    images: [
      {
        url: '/assets/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'Dev Henrico Portfólio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Henrico | Desenvolvedor Frontend',
    description:
      'Portfólio de Henrico da Silva Santos, desenvolvedor frontend especializado em Next.js, React e interfaces modernas.',
    images: ['/assets/images/preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} dark`}
      data-scroll-behavior="smooth"
    >
      <head />
      <body className={inter.className}>
        <WebVitalsReporter />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTopButton />
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
