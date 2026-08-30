'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroRobotVideoProps {
  className?: string;
}

export default function HeroRobotVideo({ className = '' }: HeroRobotVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
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

  useEffect(() => {
    // Ensure video is properly configured and autoplays smoothly
    const video = videoRef.current;
    if (video && !prefersReducedMotion) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const attemptPlay = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay postponed or waiting for interaction
          });
        }
      };

      attemptPlay();
      video.addEventListener('loadedmetadata', attemptPlay);
      video.addEventListener('canplay', attemptPlay);

      return () => {
        video.removeEventListener('loadedmetadata', attemptPlay);
        video.removeEventListener('canplay', attemptPlay);
      };
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    // Lightweight IntersectionObserver to pause playback when off-screen
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused && !prefersReducedMotion) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none overflow-visible flex items-center justify-end ${className}`}
      aria-hidden="true"
    >
      {/* Subtle atmospheric blue radial glow behind the robot to blend into deep space */}
      <div className="absolute right-[5%] top-[15%] w-[480px] h-[480px] rounded-full bg-radial from-[#0099FF]/12 via-[#004488]/6 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* Static Fallback / Poster for Reduced Motion or Error */}
      {(hasError || prefersReducedMotion) ? (
        <div className="relative w-full h-full flex items-center justify-end">
          <Image
            src="/assets/robot/ZAQVORO_Robot_Poster.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
            className="object-contain object-right"
          />
        </div>
      ) : (
        /* Primary Master WebM VP9 Transparent Animation */
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          poster="/assets/robot/ZAQVORO_Robot_Poster.webp"
          className={`w-full h-full object-contain object-right pointer-events-none transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-95'
          }`}
        >
          <source
            src="/assets/robot/ZAQVORO_Robot_Particles.webm"
            type="video/webm"
          />
        </video>
      )}
    </div>
  );
}
