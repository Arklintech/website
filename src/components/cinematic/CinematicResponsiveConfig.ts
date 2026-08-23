import { DeviceMode, ResponsiveComposition } from './cinematic-types';

export function resolveDeviceMode(width: number, height: number): DeviceMode {
  const aspectRatio = width / (height || 1);

  if (width >= 2560 || aspectRatio >= 2.1) {
    return 'ULTRA_WIDE';
  }
  if (width >= 1440) {
    return 'DESKTOP';
  }
  if (width >= 1024) {
    return 'LAPTOP';
  }
  if (width >= 768) {
    return 'TABLET';
  }
  if (width >= 375) {
    return 'MOBILE';
  }
  return 'COMPACT_MOBILE';
}

export function resolveResponsiveComposition(
  width: number,
  height: number,
  devicePixelRatio: number = 1
): ResponsiveComposition {
  const deviceMode = resolveDeviceMode(width, height);

  // Full native screen resolution up to DPR 3.0 (iPhone Retina, MacBook Pro, 4K Display)
  const maxDpr = 3.0;
  const dpr = Math.min(Math.max(devicePixelRatio || 1, 1), maxDpr);

  switch (deviceMode) {
    case 'ULTRA_WIDE':
      return {
        deviceMode,
        dpr,
        focalPoint: { x: 0.5, y: 0.5 },
        safeMarginTop: 64,
        safeMarginBottom: 64,
        scaleModifier: 1.0,
        maxDpr,
      };

    case 'DESKTOP':
      return {
        deviceMode,
        dpr,
        focalPoint: { x: 0.5, y: 0.5 },
        safeMarginTop: 56,
        safeMarginBottom: 56,
        scaleModifier: 1.0,
        maxDpr,
      };

    case 'LAPTOP':
      return {
        deviceMode,
        dpr,
        focalPoint: { x: 0.5, y: 0.5 },
        safeMarginTop: 48,
        safeMarginBottom: 48,
        scaleModifier: 1.0,
        maxDpr,
      };

    case 'TABLET':
      return {
        deviceMode,
        dpr,
        focalPoint: { x: 0.5, y: 0.5 },
        safeMarginTop: 40,
        safeMarginBottom: 40,
        scaleModifier: 1.0,
        maxDpr,
      };

    case 'MOBILE':
      return {
        deviceMode,
        dpr,
        focalPoint: { x: 0.5, y: 0.5 },
        safeMarginTop: 32,
        safeMarginBottom: 32,
        scaleModifier: 1.0,
        maxDpr,
      };

    case 'COMPACT_MOBILE':
    default:
      return {
        deviceMode,
        dpr,
        focalPoint: { x: 0.5, y: 0.5 },
        safeMarginTop: 24,
        safeMarginBottom: 24,
        scaleModifier: 1.0,
        maxDpr,
      };
  }
}
