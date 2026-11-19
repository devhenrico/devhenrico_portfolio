import { getSectionIdForRoute } from '@/constants/navigation';

export function scrollToLandingSection(sectionId: string) {
  const behavior = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    .matches
    ? 'instant'
    : 'smooth';

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior });
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
