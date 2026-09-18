import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin explicitly to avoid bundler tree-shaking
gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  if (typeof window === 'undefined') return;

  const mm = gsap.matchMedia();

  // 1. Navbar Scroll Transformation (Universal)
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: {
        className: 'scrolled',
        targets: navbar,
      },
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 300) {
          navbar.classList.add('nav-hide');
        } else {
          navbar.classList.remove('nav-hide');
        }
      },
    });
  }

  // 2. Desktop-Only Cinematic Choreography (1024px+ and no reduced motion)
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    // --- Hero Entrance Timeline ---
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const heroImage = document.querySelector('.hero-media-wrapper');
    const heroBadge = document.querySelector('.hero-eyebrow');
    const heroTitle = document.querySelector('.hero-title');
    const heroItalic = document.querySelector('.hero-title-italic');
    const heroSubtext = document.querySelector('.hero-subtext');
    const heroCtas = document.querySelector('.hero-actions');

    if (heroImage) {
      heroTl.fromTo(
        heroImage,
        { scale: 1.12, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' },
        0
      );
    }

    if (heroBadge) {
      heroTl.fromTo(
        heroBadge,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.3
      );
    }

    if (heroTitle && heroItalic) {
      heroTl.fromTo(
        [heroTitle, heroItalic],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
        0.5
      );
    }

    if (heroSubtext) {
      heroTl.fromTo(
        heroSubtext,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.8
      );
    }

    if (heroCtas) {
      heroTl.fromTo(
        heroCtas,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        1.0
      );
    }


    // --- Hero Parallax on Scroll ---
    if (heroImage) {
      gsap.to(heroImage, {
        yPercent: 18,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // --- About Section Word Sequence & Parallax ---
    const aboutWords = document.querySelectorAll('.about-pillar-word');
    if (aboutWords.length > 0) {
      gsap.fromTo(
        aboutWords,
        { opacity: 0.18, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about-pillars',
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.5,
          },
        }
      );
    }

    // About floating images subtle parallax
    const aboutImage1 = document.querySelector('.about-float-img-1');
    const aboutImage2 = document.querySelector('.about-float-img-2');
    if (aboutImage1) {
      gsap.to(aboutImage1, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
    if (aboutImage2) {
      gsap.to(aboutImage2, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }


    // --- Signature Cinematic Story Transitions ---
    const storySection = document.querySelector('#signature-story');
    const storyPanels = document.querySelectorAll('.story-panel');
    if (storySection && storyPanels.length > 0) {
      storyPanels.forEach((panel, i) => {
        const title = panel.querySelector('.story-panel-title');
        const img = panel.querySelector('.story-panel-img');
        if (title) {
          gsap.fromTo(
            title,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 70%',
              },
            }
          );
        }
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 75%',
              },
            }
          );
        }
      });
    }

    // --- Asymmetric Gallery Parallax ---
    const galleryCols = document.querySelectorAll('.gallery-col-offset');
    galleryCols.forEach((col, index) => {
      const speed = index % 2 === 0 ? -35 : 35;
      gsap.to(col, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: '#gallery',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // --- Editorial Section Heading Reveals (21st.dev / Editorial style) ---
    const sectionHeadings = document.querySelectorAll('section:not(#hero) h2');
    sectionHeadings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

  // 3. Mobile & Tablet Graceful Interactions (< 1024px)
  mm.add('(max-width: 1023px)', () => {
    // Reveal elements cleanly on scroll without pinning or horizontal scroll traps
    const revealItems = document.querySelectorAll('.mobile-reveal');
    revealItems.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
          },
        }
      );
    });
  });

  // Refresh ScrollTrigger when images load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}
