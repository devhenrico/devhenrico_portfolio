import { getSectionIdForRoute } from '@/constants/navigation';

export function scrollToLandingSection(sectionId: string) {
  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }

  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior: 'smooth' });
  return true;
}

export function navigateToLandingRoute(href: string) {
  const sectionId = getSectionIdForRoute(href);

  if (!sectionId || !scrollToLandingSection(sectionId)) {
    return false;
  }

  window.history.pushState(null, '', href);
  return true;
}
