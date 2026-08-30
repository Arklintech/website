'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface HeroRobotProps {
  className?: string;
}

export default function HeroRobot({ className = '' }: HeroRobotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);

  const [activeDirection, setActiveDirection] = useState<'forward' | 'reverse'>('forward');
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  // Preload and initialize both video elements
  useEffect(() => {
    const forward = forwardVideoRef.current;
    const reverse = reverseVideoRef.current;

    if (forward) {
      forward.muted = true;
      forward.defaultMuted = true;
      forward.playsInline = true;
    }
    if (reverse) {
      reverse.muted = true;
      reverse.defaultMuted = true;
      reverse.playsInline = true;
    }
  }, []);

  // Handle Forward Video Completion -> Immediately Trigger Reverse
  const handleForwardEnded = useCallback(() => {
    if (prefersReducedMotion) return;

    const reverse = reverseVideoRef.current;
    const forward = forwardVideoRef.current;

    if (reverse) {
      reverse.currentTime = 0;
      const playPromise = reverse.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      setActiveDirection('reverse');
    }

    if (forward) {
      setTimeout(() => {
        forward.currentTime = 0;
      }, 100);
    }
  }, [prefersReducedMotion]);

  // Handle Reverse Video Completion -> Immediately Trigger Forward
  const handleReverseEnded = useCallback(() => {
    if (prefersReducedMotion) return;

    const forward = forwardVideoRef.current;
    const reverse = reverseVideoRef.current;

    if (forward) {
      forward.currentTime = 0;
      const playPromise = forward.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      setActiveDirection('forward');
    }

    if (reverse) {
      setTimeout(() => {
        reverse.currentTime = 0;
      }, 100);
    }
  }, [prefersReducedMotion]);

  // Pause playback when hero is scrolled out of viewport to preserve GPU resources
  useEffect(() => {
    const container = containerRef.current;
    const forward = forwardVideoRef.current;
    const reverse = reverseVideoRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!prefersReducedMotion) {
            if (activeDirection === 'forward' && forward && forward.paused) {
              forward.play().catch(() => {});
            } else if (activeDirection === 'reverse' && reverse && reverse.paused) {
              reverse.play().catch(() => {});
            }
          }
        } else {
          if (forward && !forward.paused) forward.pause();
          if (reverse && !reverse.paused) reverse.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [activeDirection, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none overflow-visible flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Subtle atmospheric blue glow behind the robot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-radial from-[#0066FF]/20 via-[#004488]/8 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Reduced Motion / Error Fallback */}
      {hasError || prefersReducedMotion ? (
        <div className="relative w-full h-full flex items-center justify-center mix-blend-screen">
          <Image
            src="/assets/arklintech-robot-particle-source.png"
            alt="ARKLINTECH Particle Robot"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            className="object-contain object-center mix-blend-screen"
          />
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Video A: Forward Animation */}
          <video
            ref={forwardVideoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={handleForwardEnded}
            onError={() => setHasError(true)}
            poster="/assets/arklintech-robot-particle-source.png"
            className={`w-full h-full object-contain object-center pointer-events-none absolute inset-0 mix-blend-screen brightness-110 contrast-105 transition-opacity duration-200 ${
              activeDirection === 'forward' ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <source
              src="/assets/robot/ZAQVORO_Robot_Particles.webm"
              type="video/webm"
            />
          </video>

          {/* Video B: Reverse Animation */}
          <video
            ref={reverseVideoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={handleReverseEnded}
            onError={() => setHasError(true)}
            className={`w-full h-full object-contain object-center pointer-events-none absolute inset-0 mix-blend-screen brightness-110 contrast-105 transition-opacity duration-200 ${
              activeDirection === 'reverse' ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <source
              src="/assets/robot/ZAQVORO_Robot_Particles_reverse.webm"
              type="video/webm"
            />
          </video>
        </div>
      )}

      {/* Blueprint HUD Telemetry Annotations */}
      <div className="hidden xl:flex flex-col items-end gap-3 absolute right-0 sm:-right-4 top-1/4 z-20 font-mono text-[10px] text-right pointer-events-none">
        <div className="space-y-1">
          <div className="text-[#94A3B8] font-bold tracking-widest uppercase">
            ONE MACHINE
          </div>
          <div className="text-[#94A3B8] font-bold tracking-widest uppercase">
            ONE JOURNEY
          </div>
          <div className="text-[#0094F2] font-bold tracking-widest uppercase">
            ONE PURPOSE
          </div>
        </div>

        <div className="max-w-[130px] text-[9px] text-[#64748B] font-body leading-tight pt-2 border-t border-white/[0.08]">
          Building the future of intelligent systems.
        </div>

        <div className="pt-1">
          <span className="px-2 py-0.5 rounded bg-[#0A0F1D] border border-white/[0.1] text-[#38BDF8] font-bold text-[10px]">
            03 / 06
          </span>
        </div>
      </div>
    </div>
  );
}
