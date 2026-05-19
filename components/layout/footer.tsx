import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

const socialLinks = [
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
];

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-6 px-4 py-8 sm:px-6 md:flex-row md:gap-0 md:px-8">
        {/* Left: Copyright */}
        <p className="whitespace-nowrap text-center text-sm text-neutral-500 sm:text-sm dark:text-neutral-500">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://github.com/devhenrico"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-medium transition-colors duration-300 hover:text-neutral-900 dark:hover:text-white/90"
          >
            Dev Henrico
          </a>
          . Todos os direitos reservados.
        </p>

        {/* Right: Actions & Socials */}
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white"
                aria-label={social.label}
              >
                <social.icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
