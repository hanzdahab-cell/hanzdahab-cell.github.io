import { useEffect } from 'react';
import Lenis from 'lenis';

const pageScrollLockOwners = new Set<string>();

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function useSmoothScroll() {
  useEffect(() => {
    // Only initialize on devices that support smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    // Expose for navigation: Lenis owns scrollTop, so plain window.scrollTo
    // gets overridden by its rAF loop — page changes must reset through it.
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

export function setPageScrollLocked(owner: string, locked: boolean) {
  if (locked) pageScrollLockOwners.add(owner);
  else pageScrollLockOwners.delete(owner);

  const pageScroller = document.getElementById('site-page-scroll');
  pageScroller?.setAttribute('data-scroll-locked', String(pageScrollLockOwners.size > 0));
}

export function scrollPageTo(top: number, behavior: ScrollBehavior = 'smooth') {
  const pageScroller = document.getElementById('site-page-scroll');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (pageScroller) {
    pageScroller.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : behavior });
    return;
  }

  if (window.__lenis) {
    if (behavior === 'auto' || prefersReducedMotion) window.__lenis.scrollTo(top, { immediate: true });
    else window.__lenis.scrollTo(top, { duration: 1.2 });
    return;
  }

  window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : behavior });
}

export function scrollPageElementIntoView(element: HTMLElement, offset = 0) {
  const pageScroller = document.getElementById('site-page-scroll');
  if (!pageScroller) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const top =
    element.getBoundingClientRect().top -
    pageScroller.getBoundingClientRect().top +
    pageScroller.scrollTop -
    offset;
  scrollPageTo(top);
}

export function scrollPageToProgress(progress: number) {
  const pageScroller = document.getElementById('site-page-scroll');
  const scrollableHeight = pageScroller
    ? pageScroller.scrollHeight - pageScroller.clientHeight
    : document.documentElement.scrollHeight - window.innerHeight;
  scrollPageTo(Math.max(0, progress) * Math.max(0, scrollableHeight));
}
