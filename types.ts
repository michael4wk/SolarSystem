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
  orbitRadius: number; // Distance from sun
  orbitPeriod: number; // Duration of one orbit in seconds (scaled)
  temperature: string;
  en: PlanetContent;
  zh: PlanetContent;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
