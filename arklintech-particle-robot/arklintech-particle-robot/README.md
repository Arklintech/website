# ARKLINTECH Particle Robot — Scroll-Driven React / HTML5 2D Canvas

Drop-in, dependency-free, scroll-driven particle reconstruction effect built with React + HTML5 2D Canvas.

## Files

- `src/ArkParticleRobot.tsx` — Scroll-driven 2D Canvas renderer + volumetric particle simulation
- `src/ArkParticleRobot.css` — Sticky viewport container + responsive styles
- `assets/arklintech-robot-particle-source.png` — High-definition front-facing particle robot source

## Integration

Copy `src/ArkParticleRobot.tsx`, `src/ArkParticleRobot.css`, and the `assets/` folder into your React / Next.js app.

```tsx
import ArkParticleRobot from './ArkParticleRobot';

export default function HeroSection() {
  return (
    <ArkParticleRobot
      source="/assets/arklintech-robot-particle-source.png"
      enableScrollDrive={true}
      speed={1.0}
      interaction={1.0}
      onProgressChange={(p) => {
        // Optional callback to synchronize page typography/HUD
      }}
    />
  );
}
```

## Scroll Choreography Milestones

Animation is continuously derived from normalized scroll progress:

- **0.00 — Cohesive Form**: Rock-solid, crystal-clear ARKLINTECH particle robot with glowing concentric eyes and sapphire forehead 'A' emblem.
- **0.20 — Living Particle Shimmer**: Micro-breathing oscillation and subtle ambient stardust displacement.
- **0.40 — Structural Fluidity**: Particles become fluid; outer shoulder ribbons enter laminar drift.
- **0.60 — Progressive Deconstruction**: Helmet shell and neck conduits begin separating while central face maintains cohesion.
- **0.80 — Major Dispersion**: Broad outward expansion; eyes and forehead crest dissolve last into orbital filaments.
- **1.00 — Volumetric Particle Field**: Substantially dissolved into a floating surrounding quantum field.

### Reverse Scroll:
Scrolling upward reverses the entire simulation deterministically — dispersed particles converge back to target positions and the robot reconstructs seamlessly.

## Key Features

- **Pure HTML5 2D Canvas**: Zero WebGL / Three.js / Babylon / external dependency overhead.
- **Regional Cohesion Weighting**: Facial features (eyes, forehead 'A', mouth grill) linger longer during dissolution to preserve recognizable robot anatomy.
- **No Layout Thrashing**: Scroll progress tracked outside React state and fed into `requestAnimationFrame`.
- **Exact Colors**: Preserves electric sapphire blue, glowing cyan, and luminous white/silver matrix points.
- **Accessible**: Automatic adaptation to `prefers-reduced-motion: reduce`.
- **Mobile Responsive**: Adapts density on 360×800, 390×844, and 430×932 viewports.
