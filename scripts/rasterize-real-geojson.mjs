import fs from 'fs';

function pointInPolygon(point, vs) {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInFeature(point, geometry) {
  if (geometry.type === 'Polygon') {
    return pointInPolygon(point, geometry.coordinates[0]);
  } else if (geometry.type === 'MultiPolygon') {
    for (const poly of geometry.coordinates) {
      if (pointInPolygon(point, poly[0])) return true;
    }
  }
  return false;
}

async function main() {
  console.log('Downloading official World-110m GeoJSON...');
  const res = await fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson');
  const data = await res.json();
  console.log(`Loaded ${data.features.length} countries.`);

  // Projection setup:
  // Lon: -180..180 -> Width: 520 (x: 10..510)
  // Lat: 85..-60 -> Height: 220 (y: 10..210)
  const W = 520;
  const H = 220;
  const step = 3.6; // High density grid

  const dots = [];

  for (let y = 10; y <= 210; y += step) {
    const lat = 85 - ((y - 10) / 200) * 145;
    for (let x = 10; x <= 510; x += step) {
      const lon = -180 + ((x - 10) / 500) * 360;

      let isLand = false;
      for (const feature of data.features) {
        if (pointInFeature([lon, lat], feature.geometry)) {
          isLand = true;
          break;
        }
      }

      if (isLand) {
        dots.push([parseFloat(x.toFixed(1)), parseFloat(y.toFixed(1))]);
      }
    }
  }

  console.log(`Rasterized ${dots.length} authentic Earth dots from real GeoJSON!`);

  // Hub coordinates on this exact projection:
  // x = 10 + ((lon + 180)/360) * 500
  // y = 10 + ((85 - lat)/145) * 200

  // 1. UK (London): lon -0.12, lat 51.5
  const ukX = (10 + ((-0.12 + 180) / 360) * 500).toFixed(1);
  const ukY = (10 + ((85 - 51.5) / 145) * 200).toFixed(1);

  // 2. UAE (Dubai): lon 55.27, lat 25.2
  const uaeX = (10 + ((55.27 + 180) / 360) * 500).toFixed(1);
  const uaeY = (10 + ((85 - 25.2) / 145) * 200).toFixed(1);

  // 3. India (Mumbai/Central): lon 78.96, lat 20.59
  const indX = (10 + ((78.96 + 180) / 360) * 500).toFixed(1);
  const indY = (10 + ((85 - 20.59) / 145) * 200).toFixed(1);

  // 4. Singapore: lon 103.82, lat 1.35
  const sgX = (10 + ((103.82 + 180) / 360) * 500).toFixed(1);
  const sgY = (10 + ((85 - 1.35) / 145) * 200).toFixed(1);

  console.log(`Hub coordinates: UK(${ukX}, ${ukY}), UAE(${uaeX}, ${uaeY}), India(${indX}, ${indY}), SG(${sgX}, ${sgY})`);

  const circlesMarkup = dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.15" />`).join('\n          ');

  const componentContent = `'use client';

import React from 'react';

export default function GlobalPresenceMap() {
  return (
    <div className="w-full space-y-3">
      {/* Title */}
      <div className="font-mono text-xs font-bold text-z-white uppercase tracking-wider pb-1 border-b border-z-border/50 flex items-center justify-between">
        <span>GLOBAL PRESENCE</span>
        <span className="text-[10px] text-z-cyan-400 font-normal">4 ACTIVE HUBS</span>
      </div>

      {/* Real GeoJSON Dotted World Map Graphic */}
      <div className="relative w-full aspect-[2.35/1] overflow-hidden rounded-lg bg-z-surface-2/80 border border-z-border p-2.5 flex items-center justify-center shadow-inner">
        <svg
          viewBox="0 0 520 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Technical Coordinates Grid */}
          <line x1="0" y1="110" x2="520" y2="110" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.4" />
          <line x1="260" y1="0" x2="260" y2="220" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.4" />
          <line x1="130" y1="0" x2="130" y2="220" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.2" />
          <line x1="390" y1="0" x2="390" y2="220" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.2" />

          {/* Authentic High-Resolution Landmass Dots */}
          <g fill="#A0B5C4" opacity="0.85">
          ${circlesMarkup}
          </g>

          {/* =================================================================
              ACTIVE HUBS WITH AUTHENTIC GEO POSITIONS & ILLUMINATED PULSES
              ================================================================= */}
          
          {/* UK Hub */}
          <g>
            <circle cx="${ukX}" cy="${ukY}" r="6" fill="#28B8F2" fillOpacity="0.3" className="animate-ping" />
            <circle cx="${ukX}" cy="${ukY}" r="3" fill="#159BD7" />
            <circle cx="${ukX}" cy="${ukY}" r="1.5" fill="#FFFFFF" />
          </g>

          {/* UAE Hub */}
          <g>
            <circle cx="${uaeX}" cy="${uaeY}" r="6" fill="#28B8F2" fillOpacity="0.3" className="animate-ping" />
            <circle cx="${uaeX}" cy="${uaeY}" r="3" fill="#159BD7" />
            <circle cx="${uaeX}" cy="${uaeY}" r="1.5" fill="#FFFFFF" />
          </g>

          {/* India Subcontinent Hub */}
          <g>
            <circle cx="${indX}" cy="${indY}" r="7" fill="#159BD7" fillOpacity="0.4" className="animate-ping" />
            <circle cx="${indX}" cy="${indY}" r="3.5" fill="#28B8F2" />
            <circle cx="${indX}" cy="${indY}" r="1.8" fill="#FFFFFF" />
          </g>

          {/* Singapore Hub */}
          <g>
            <circle cx="${sgX}" cy="${sgY}" r="6" fill="#28B8F2" fillOpacity="0.3" className="animate-ping" />
            <circle cx="${sgX}" cy="${sgY}" r="3" fill="#159BD7" />
            <circle cx="${sgX}" cy="${sgY}" r="1.5" fill="#FFFFFF" />
          </g>

          {/* Connecting Active Network Arcs */}
          <path
            d="M ${ukX} ${ukY} Q 290 65 ${uaeX} ${uaeY}"
            stroke="#28B8F2"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M ${uaeX} ${uaeY} Q 345 90 ${indX} ${indY}"
            stroke="#28B8F2"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M ${indX} ${indY} Q 380 110 ${sgX} ${sgY}"
            stroke="#28B8F2"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Hub Location Labels - Exact Alignment Matching Reference Crop */}
      <div className="flex items-center justify-between font-mono text-[11px] text-z-muted pt-1 px-1 font-semibold">
        <span className="text-z-white hover:text-z-cyan-400 transition-colors">India</span>
        <span className="text-z-white hover:text-z-cyan-400 transition-colors">UAE</span>
        <span className="text-z-white hover:text-z-cyan-400 transition-colors">UK</span>
        <span className="text-z-white hover:text-z-cyan-400 transition-colors">Singapore</span>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync('c:/Users/NEXAWAVE/Desktop/ZOQ/src/components/layout/GlobalPresenceMap.tsx', componentContent);
  console.log('Successfully wrote real GeoJSON GlobalPresenceMap.tsx!');
}

main().catch(console.error);
