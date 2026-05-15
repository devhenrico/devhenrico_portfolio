import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
});

const strippedProps = new Set([
  'animate',
  'asChild',
  'exit',
  'initial',
  'layout',
  'mode',
  'transition',
  'variants',
  'viewport',
  'whileHover',
  'whileInView',
  'whileTap',
]);

function cleanProps(props: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !strippedProps.has(key)),
  );
}

type MotionMockProps = Record<string, unknown> & {
  children?: React.ReactNode;
};

function motionElement(tag: string) {
  const Component = React.forwardRef<HTMLElement, MotionMockProps>(
    ({ children, ...props }, ref) =>
      React.createElement(
        tag,
        { ...cleanProps(props), ref },
        children as React.ReactNode,
      ),
  );

  Component.displayName = `MockMotion.${tag}`;
  return Component;
}

const motion = new Proxy(
  {},
  {
    get: (_target, tag: string) => motionElement(tag),
  },
);

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  motion,
  useMotionTemplate: () => '',
  useMotionValue: (initial = 0) => ({
    get: () => initial,
    set: vi.fn(),
  }),
  useSpring: (value: unknown) => value,
  useTransform: (value: unknown) => value,
}));

type NextImageMockProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  fill?: boolean;
  priority?: boolean;
  src: string | { src: string };
};

vi.mock('next/image', () => ({
  default: (input: NextImageMockProps) => {
    const { alt = '', src, ...props } = input;
    delete props.fill;
    delete props.priority;
    delete props.sizes;

    return React.createElement('img', {
      ...props,
      alt,
      src: typeof src === 'string' ? src : src.src,
    });
  },
}));

type NextLinkMockProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  children?: React.ReactNode;
  href: string | { pathname?: string };
  prefetch?: boolean;
};

vi.mock('next/link', () => ({
  default: (input: NextLinkMockProps) => {
    const { children, href, ...props } = input;
    delete props.prefetch;

    return React.createElement(
      'a',
      {
        ...props,
        href: typeof href === 'string' ? href : href.pathname,
      },
      children,
    );
  },
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock('next/dynamic', () => ({
  default: (
    _loader: () => Promise<unknown>,
    options?: { loading?: React.ComponentType },
  ) => {
    const DynamicComponent = () =>
      options?.loading ? React.createElement(options.loading) : null;
    return DynamicComponent;
  },
}));

vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'font-inter',
    variable: 'font-inter-variable',
  }),
}));

vi.mock('gsap', () => ({
  default: {
    fromTo: vi.fn(),
    registerPlugin: vi.fn(),
  },
}));

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(() => Promise.resolve({ text: 'OK' })),
  },
}));

vi.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: () => React.createElement('div', { 'data-testid': 'lottie' }),
}));

vi.mock('@vercel/analytics/next', () => ({
  Analytics: () => null,
}));

vi.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => null,
}));

class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  configurable: true,
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(navigator, 'clipboard', {
  configurable: true,
  writable: true,
  value: {
    writeText: vi.fn(),
  },
});

if (!window.HTMLCanvasElement.prototype.getContext) {
  Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
}
