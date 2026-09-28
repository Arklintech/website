'use client';

import { useEffect } from 'react';

const ANIMATED_SVG_CONTENT = 'animate, animateMotion, animateTransform, svg [class*="animate-"]';

/**
 * Pauses SVG animations — SMIL (<animateMotion> etc.) and CSS keyframes on SVG shapes — while
 * their SVG is off-screen. Both run on the main thread every frame even when nothing is visible
 * (the glow filters make each frame expensive). Visible animations are untouched.
 *
 * Driven by IntersectionObserver only: toggling state on every scroll would force whole-page
 * style recalculation and cost more than it saves.
 */
export default function OffscreenAnimationPauser() {
  useEffect(() => {
    const observed = new Set<SVGSVGElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          const svg = target as SVGSVGElement;
          if (isIntersecting) {
            svg.removeAttribute('data-offscreen');
            svg.unpauseAnimations();
          } else {
            svg.setAttribute('data-offscreen', '');
            svg.pauseAnimations();
          }
        }
      },
      { rootMargin: '200px 0px' },
    );

    const scan = () => {
      observed.forEach((svg) => {
        if (!svg.isConnected) {
          io.unobserve(svg);
          observed.delete(svg);
        }
      });
      document.querySelectorAll<SVGElement>(ANIMATED_SVG_CONTENT).forEach((el) => {
        let svg = el.ownerSVGElement;
        while (svg?.ownerSVGElement) svg = svg.ownerSVGElement;
        if (svg && !observed.has(svg)) {
          observed.add(svg);
          io.observe(svg);
        }
      });
    };

    // Sections mount and swap client-side, so rescan after DOM changes (batched per frame).
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });

    scan();
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
