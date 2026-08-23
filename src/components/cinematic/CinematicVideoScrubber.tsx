'use client';

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface CinematicVideoScrubberRef {
  seekTo: (progress: number) => void;
  playDirect: () => void;
  pauseDirect: () => void;
  getVideoElement: () => HTMLVideoElement | null;
}

interface CinematicVideoScrubberProps {
  src?: string;
  isDirectPlayback?: boolean;
}

const CinematicVideoScrubber = forwardRef<CinematicVideoScrubberRef, CinematicVideoScrubberProps>(
  ({ src = '/cinematic/master/zaqvoro-cinematic-4k.mp4', isDirectPlayback = false }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const lastTimeRef = useRef<number>(0);

    const seekTo = (progress: number) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const targetTime = Math.min(video.duration, Math.max(0, progress * video.duration));
      if (Math.abs(targetTime - lastTimeRef.current) > 0.02) {
        video.currentTime = targetTime;
        lastTimeRef.current = targetTime;
      }
    };

    const playDirect = () => {
      const video = videoRef.current;
      if (video) {
        video.play().catch(() => {});
      }
    };

    const pauseDirect = () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
      }
    };

    useImperativeHandle(ref, () => ({
      seekTo,
      playDirect,
      pauseDirect,
      getVideoElement: () => videoRef.current,
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (isDirectPlayback) {
        video.loop = true;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }, [isDirectPlayback]);

    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-z-black pointer-events-none select-none">
        <video
          ref={videoRef}
          src={src}
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </div>
    );
  }
);

CinematicVideoScrubber.displayName = 'CinematicVideoScrubber';

export default CinematicVideoScrubber;
