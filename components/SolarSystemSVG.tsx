import React, { useMemo } from 'react';
import { PLANETS } from '../constants';
import { Planet, Language } from '../types';

interface SolarSystemSVGProps {
  onSelectPlanet: (planet: Planet) => void;
  selectedPlanetId: string | null;
  language: Language;
}

const SolarSystemSVG: React.FC<SolarSystemSVGProps> = ({ onSelectPlanet, selectedPlanetId, language }) => {
  // Generate realistic star field
  const stars = useMemo(() => {
    return Array.from({ length: 500 }).map((_, i) => ({
      x: Math.random() * 3000 - 1500,
      y: Math.random() * 3000 - 1500,
      r: Math.random() < 0.9 ? Math.random() * 0.8 + 0.2 : Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      animationDelay: Math.random() * 5 + 's'
    }));
  }, []);

  return (
    <div className="w-full h-full bg-[#050b14] relative overflow-hidden flex items-center justify-center select-none">
      <style>
        {`
          @keyframes orbit-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes counter-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}
      </style>

      <svg
        viewBox="-650 -650 1300 1300"
        className="w-full h-full max-w-[100vw] max-h-[100vh] outline-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="sunGradient" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" />
            <stop offset="20%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="spaceGlow" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#050b14" stopOpacity="0" />
          </radialGradient>

          {/* Expanded filter region to prevent square clipping */}
          <filter id="sunGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Deep Space Background Glow */}
        <rect x="-1500" y="-1500" width="3000" height="3000" fill="url(#spaceGlow)" className="pointer-events-none" />

        {/* Starfield */}
        <g className="pointer-events-none">
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="white"
              opacity={star.opacity}
              className={star.r > 1.2 ? "star-animate" : ""}
              style={{ animationDelay: star.animationDelay }}
            />
          ))}
        </g>

        {/* Sun */}
        <g className="pointer-events-none">
            {/* Outer corona */}
            <circle cx="0" cy="0" r="100" fill="url(#sunGradient)" opacity="0.3" />
            {/* Core */}
            <circle cx="0" cy="0" r="60" fill="#fbbf24" filter="url(#sunGlowFilter)" />
            {/* Sun Label */}
             <text x="0" y="5" textAnchor="middle" fill="#78350f" fontSize="14" fontWeight="bold" letterSpacing="1px" className="opacity-80" style={{ mixBlendMode: 'overlay' }}>
                {language === 'zh' ? '太阳' : 'SUN'}
            </text>
        </g>
       
        {/* Planets */}
        {PLANETS.map((planet) => (
          <g key={planet.id}>
            {/* Orbit Path - Dashed for scientific look */}
            <circle
              cx="0"
              cy="0"
              r={planet.orbitRadius}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeOpacity="0.15"
              strokeDasharray="4 4"
              className="pointer-events-none"
            />

            {/* Rotating Orbit Group (Pure CSS Animation) */}
            <g style={{ 
                animation: `orbit-rotate ${planet.orbitPeriod}s linear infinite`,
                transformOrigin: '0 0' // Explicitly rotate around Sun center
            }}>
              
              {/* Planet Position - Translate out to radius */}
              <g transform={`translate(${planet.orbitRadius}, 0)`}>
                
                {/* Selection Indicator Ring */}
                {selectedPlanetId === planet.id && (
                   <circle
                     r={planet.radius * 1.5 + 15}
                     fill="none"
                     stroke="white"
                     strokeWidth="1"
                     opacity="0.4"
                     className="animate-pulse pointer-events-none"
                   />
                )}

                {/* Interactive Planet Body */}
                <g 
                  className="cursor-pointer group outline-none"
                  onClick={() => onSelectPlanet(planet)}
                >
                  {/* Invisible Hit Area for easier selection */}
                  <circle
                    r={Math.max(planet.radius * 1.5, 30)}
                    fill="transparent"
                  />

                  {/* Planet Circle */}
                  <circle
                    r={planet.radius}
                    fill={planet.color}
                    filter="url(#planetGlow)"
                    className="transition-all duration-300 group-hover:filter-none group-hover:brightness-110"
                  />

                  {/* Saturn Rings */}
                  {planet.id === 'saturn' && (
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={planet.radius * 2.2}
                      ry={planet.radius * 0.6}
                      fill="none"
                      stroke="#fcd34d"
                      strokeWidth="2"
                      strokeOpacity="0.8"
                      transform="rotate(-25)"
                      className="pointer-events-none"
                    />
                  )}
                  
                  {/* Label Group (Counter-rotated via CSS to match orbit) */}
                  <g style={{ 
                      animation: `counter-rotate ${planet.orbitPeriod}s linear infinite`,
                      transformOrigin: '0 0' // Rotate around planet center
                  }}>
                      {/* Label Position - Offset below planet */}
                      <g 
                        transform={`translate(0, ${planet.radius + 20})`}
                        className={`transition-opacity duration-300 ${selectedPlanetId === planet.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      >
                         {/* Text Background */}
                         <rect 
                            x="-60" 
                            y="-10" 
                            width="120" 
                            height="20" 
                            rx="10"
                            fill="#0f172a"
                            fillOpacity="0.8"
                            className="pointer-events-none"
                         />
                         
                         {/* Centered Text */}
                         <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="white"
                            fontSize="11"
                            fontWeight="500"
                            className="pointer-events-none select-none"
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,1)' }}
                          >
                             {planet[language].name} <tspan fill="#94a3b8" fontSize="10">· {planet[language].feature}</tspan>
                          </text>
                      </g>
                  </g>

                </g>
              </g>
            </g>
          </g>
        ))}
      </svg>
      
      <div className="absolute bottom-4 left-4 text-slate-500 text-xs pointer-events-none opacity-50 font-mono">
        {language === 'zh' ? '* 轨道大小和速度为可视化效果已做调整，非真实比例。' : '* Orbit scales and speeds adjusted for visualization purposes.'}
      </div>
    </div>
  );
};

export default SolarSystemSVG;