import type { ReactNode } from 'react';
import type { Variants } from 'motion/react';

export interface HeroContentProps {
  containerVariants: Variants;
  imageVariants: Variants;
  itemVariants: Variants;
}

export interface SectionProps {
  itemVariants: Variants;
}

export interface ProjectProps {
  id: number | string;
  title: string;
  description: string;
  link: string;
  techStack: TechItem[];
  header?: ReactNode;
}

export interface TechItem {
  id: number;
  name: string;
  image: string;
  designation: string;
  imageClassName?: string;
}

export interface ContactCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  href: string;
  copyable?: boolean;
  clickable?: boolean;
}
