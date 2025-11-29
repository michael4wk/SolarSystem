export type Language = 'en' | 'zh';

export interface PlanetContent {
  name: string;
  description: string; // Short "Copilot" style summary
  detail: string; // Scientific detail
  facts: string[];
  type: string;
  feature: string; // Short label for SVG visualization
}

export interface Planet {
  id: string;
  color: string;
  radius: number; // Relative size for visualization
  orbitRadius: number; // Distance from sun (Semi-major axis for ellipse)
  orbitPeriod: number; // Duration of one orbit in seconds (scaled)
  eccentricity: number; // 0 = circle, < 1 = ellipse
  argumentOfPerihelion: number; // Rotation of the orbit in degrees
  rotationPeriodHours: number; // Real rotation period in hours
  orbitalPeriodDays: number; // Real orbital period in Earth days
  distanceAU: number; // Distance from Sun in AU
  texture: string; // Path to texture image
  photo?: string; // Path to high-res photo/render (optional, defaults to texture if missing)
  axialTilt?: number; // Axial tilt in degrees (visual rotation)
  rings?: {
    colors: string[];
    innerRadius: number; // Multiplier of planet radius
    outerRadius: number; // Multiplier of planet radius
    opacity: number;
  };
  moons: { name: string; radius: number; distance: number; speed: number; color: string; retrograde?: boolean }[];
  temperature: string;
  en: PlanetContent;
  zh: PlanetContent;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
