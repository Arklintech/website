'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;

    try {
      // On macOS and iOS Safari, the system trackpad provides native momentum scrolling.
      // Intercepting with smoothWheel creates double-inertia lag and stuttering on MacBooks.
      const isApple = typeof navigator !== 'undefined' && /Macintosh|Mac OS X|iPhone|iPad|iPod/.test(navigator.userAgent);

      lenis = new Lenis({
        duration: isApple ? 0.5 : 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: !isApple, // Native hardware-accelerated momentum on macOS trackpads
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
        infinite: false,
      });

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Connect GSAP ticker with Lenis raf
      const updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(500, 33); // Safe lag smoothing prevents hitching on frame drops

      return () => {
        gsap.ticker.remove(updateTicker);
        lenis?.destroy();
      };
    } catch (e) {
      console.warn('Smooth scroll initialization bypassed:', e);
    }
  }, []);

  return <>{children}</>;
}
