// High-precision continent polygons in [lon, lat] (-180..180, -90..90)
// Then map to [x, y] in viewBox (0..500, 0..240)

function pointInPoly(pt, poly) {
  let [x, y] = pt;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    let [xi, yi] = poly[i];
    let [xj, yj] = poly[j];
    let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Key continental simplified boundaries in lon/lat
const continents = [
  // North America
  [
    [-168, 65], [-160, 71], [-140, 70], [-125, 69], [-85, 70], [-80, 60], [-60, 60], [-55, 50],
    [-65, 44], [-75, 35], [-80, 25], [-90, 20], [-80, 8], [-77, 8], [-83, 10], [-95, 17],
    [-105, 20], [-110, 30], [-120, 34], [-125, 48], [-135, 57], [-150, 60], [-165, 60], [-168, 65]
  ],
  // Alaska Peninsula
  [
    [-168, 65], [-155, 58], [-165, 54], [-168, 65]
  ],
  // Greenland
  [
    [-45, 83], [-20, 80], [-20, 70], [-35, 65], [-45, 60], [-55, 65], [-55, 75], [-45, 83]
  ],
  // South America
  [
    [-77, 8], [-60, 10], [-50, 0], [-35, -5], [-38, -15], [-45, -23], [-55, -35], [-65, -45],
    [-68, -55], [-75, -50], [-73, -40], [-70, -30], [-72, -18], [-80, -5], [-77, 8]
  ],
  // Europe
  [
    [-10, 36], [0, 43], [5, 44], [15, 38], [25, 40], [30, 45], [40, 45], [45, 50],
    [50, 60], [40, 68], [25, 71], [15, 68], [5, 60], [-5, 58], [-5, 48], [-10, 43], [-10, 36]
  ],
  // Scandinavia
  [
    [5, 58], [12, 56], [18, 60], [28, 70], [20, 71], [10, 64], [5, 58]
  ],
  // UK & Ireland
  [
    [-10, 52], [-6, 50], [1.5, 51], [0, 58], [-4, 59], [-8, 55], [-10, 52]
  ],
  // Africa
  [
    [-17, 15], [-17, 28], [-5, 36], [10, 37], [25, 32], [32, 31], [43, 12], [51, 12],
    [40, -5], [35, -20], [30, -30], [20, -35], [17, -34], [12, -15], [10, 0], [0, 5], [-10, 5], [-17, 15]
  ],
  // Madagascar
  [
    [44, -12], [50, -14], [47, -25], [43, -25], [44, -12]
  ],
  // Asia / Russia / China / India / Middle East
  [
    [32, 31], [40, 45], [50, 60], [60, 70], [80, 75], [100, 78], [130, 75], [170, 70], [180, 65],
    [170, 60], [140, 55], [130, 42], [122, 30], [110, 20], [100, 10], [104, 1], [98, 8],
    [90, 22], [80, 10], [77, 8], [68, 23], [60, 25], [55, 25], [50, 15], [43, 12], [35, 28], [32, 31]
  ],
  // India Subcontinent
  [
    [68, 24], [72, 21], [74, 15], [77, 8], [80, 13], [85, 20], [90, 24], [88, 27], [80, 30], [74, 32], [68, 24]
  ],
  // Sri Lanka
  [
    [80, 8], [82, 8], [81, 6], [80, 8]
  ],
  // Arabian Peninsula (UAE / Saudi)
  [
    [35, 28], [44, 30], [50, 28], [55, 26], [60, 23], [55, 17], [45, 13], [42, 16], [35, 28]
  ],
  // Southeast Asia (Malaysia, Thailand, Vietnam)
  [
    [98, 20], [108, 20], [108, 10], [104, 1.3], [100, 5], [98, 10], [98, 20]
  ],
  // Indonesia & Borneo
  [
    [95, 5], [105, -5], [115, -8], [120, -5], [115, 2], [105, 5], [95, 5]
  ],
  // Philippines
  [
    [120, 18], [126, 14], [124, 7], [120, 10], [120, 18]
  ],
  // Japan
  [
    [130, 32], [140, 36], [145, 44], [140, 45], [135, 38], [130, 32]
  ],
  // Australia
  [
    [114, -22], [122, -15], [136, -12], [142, -11], [152, -25], [153, -30], [148, -38],
    [140, -38], [135, -34], [128, -32], [115, -34], [113, -26], [114, -22]
  ],
  // Tasmania
  [
    [145, -41], [148, -41], [147, -44], [145, -41]
  ],
  // New Zealand
  [
    [172, -35], [178, -38], [175, -42], [170, -46], [167, -46], [172, -35]
  ]
];

// Let's sample on grid:
// lon: -180..180 -> x: 10..470 (width 460)
// lat: 85..-60 -> y: 15..175 (height 160)
const width = 460;
const height = 160;
const step = 4.2; // Density step

const dots = [];

for (let y = 15; y <= 175; y += step) {
  // convert y to lat
  const lat = 85 - ((y - 15) / height) * 145;
  for (let x = 10; x <= 470; x += step) {
    // convert x to lon
    const lon = -180 + ((x - 10) / width) * 360;

    let isLand = false;
    for (const poly of continents) {
      if (pointInPoly([lon, lat], poly)) {
        isLand = true;
        break;
      }
    }

    if (isLand) {
      dots.push([parseFloat(x.toFixed(1)), parseFloat(y.toFixed(1))]);
    }
  }
}

console.log(`Generated ${dots.length} accurate world dots.`);

// Format into React SVG JSX
let svgCircles = dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" />`).join('\n          ');

import fs from 'fs';
fs.writeFileSync('c:/Users/NEXAWAVE/Desktop/ZOQ/scripts/dots.txt', svgCircles);
console.log('Saved to dots.txt');
