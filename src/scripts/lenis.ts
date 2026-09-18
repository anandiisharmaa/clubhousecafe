import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis | null {
  // Respect user preference for reduced motion
  if (typeof window === 'undefined') return null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  // Preserve native touch scrolling on mobile and touch devices
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
  if (isTouchDevice) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  try {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's internal ticker for buttery 60/120fps synchronization
    gsap.ticker.add((time: number) => {
      lenisInstance?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return lenisInstance;
  } catch (e) {
    console.warn('Lenis initialization skipped:', e);
    return null;
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
