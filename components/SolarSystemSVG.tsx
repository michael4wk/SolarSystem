import React, { useMemo } from 'react';
import { PLANETS } from '../constants';
import { Planet, Language } from '../types';

interface SolarSystemSVGProps {
  onSelectPlanet: (planet: Planet) => void;
  selectedPlanetId: string | null;
  language: Language;
  showAsteroidBelt?: boolean;
  showKuiperBelt?: boolean;
}

const SolarSystemSVG: React.FC<SolarSystemSVGProps> = ({ 
  onSelectPlanet, 
  selectedPlanetId, 
  language,
  showAsteroidBelt = true,
  showKuiperBelt = true
}) => {
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

  // Generate Asteroid Belt (between Mars and Jupiter)
  const asteroidBelt = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const minR = 200;
      const maxR = 240;
      // Distribute randomly within the band
      const radius = minR + Math.random() * (maxR - minR);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { x, y, r: Math.random() * 1 + 0.5, opacity: Math.random() * 0.4 + 0.2 };
    });
  }, []);

  // Generate Kuiper Belt (beyond Neptune)
  const kuiperBelt = useMemo(() => {
    return Array.from({ length: 600 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const minR = 520;
      const maxR = 750;
      const radius = minR + Math.random() * (maxR - minR);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { x, y, r: Math.random() * 1.2 + 0.5, opacity: Math.random() * 0.3 + 0.1 };
    });
  }, []);

  return (
    <div className="w-full h-full bg-[#050b14] relative overflow-hidden flex items-center justify-center select-none">
      <style>
        {`
          @keyframes orbit-move {
            0% { offset-distance: 0%; animation-timing-function: ease-out; }
            50% { offset-distance: 50%; animation-timing-function: ease-in; }
            100% { offset-distance: 100%; }
          }
          @keyframes moon-move {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
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

        {/* Kuiper Belt */}
        {showKuiperBelt && (
          <g className="pointer-events-none" style={{ animation: 'spin 400s linear infinite' }}>
            {kuiperBelt.map((obj, i) => (
              <circle
                key={i}
                cx={obj.x}
                cy={obj.y}
                r={obj.r}
                fill="#94a3b8"
                opacity={obj.opacity}
              />
            ))}
          </g>
        )}

        {/* Asteroid Belt */}
        {showAsteroidBelt && (
          <g className="pointer-events-none" style={{ animation: 'spin 120s linear infinite' }}>
            {asteroidBelt.map((obj, i) => (
              <circle
                key={i}
                cx={obj.x}
                cy={obj.y}
                r={obj.r}
                fill="#a8a29e"
                opacity={obj.opacity}
              />
            ))}
          </g>
        )}

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
        {PLANETS.map((planet) => {
            const a = planet.orbitRadius;
            const e = planet.eccentricity;
            const b = a * Math.sqrt(1 - e * e);
            const c = a * e;
            
            // Generate Path Data for Ellipse
            // M (start x) (start y) A (rx) (ry) (x-axis-rotation) (large-arc-flag) (sweep-flag) (end x) (end y)
            const orbitPathData = `M ${a - c} 0 A ${a} ${b} 0 1 0 ${-(a + c)} 0 A ${a} ${b} 0 1 0 ${a - c} 0`;

            return (
              <g key={planet.id} transform={`rotate(${planet.argumentOfPerihelion || 0})`}>
                {/* Orbit Path - Dashed Ellipse */}
                <path
                  d={orbitPathData}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  strokeDasharray="4 4"
                  className="pointer-events-none"
                />

                {/* Moving Group along Path */}
                <g style={{ 
                    offsetPath: `path('${orbitPathData}')`,
                    animation: `orbit-move ${planet.orbitPeriod}s linear infinite`,
                    offsetRotate: '0deg' // Keep planet upright, do not rotate with path tangent
                }}>
                    
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

                    {/* Interactive Planet Body Group */}
                    <g 
                      className="cursor-pointer group outline-none"
                      onClick={() => onSelectPlanet(planet)}
                    >
                      {/* Invisible Hit Area for easier selection */}
                      <circle
                        r={Math.max(planet.radius * 2, 40)}
                        fill="transparent"
                      />

                      {/* Tilted System (Planet Body, Rings, Moons) */}
                      <g transform={`rotate(${planet.axialTilt || 0})`}>
                          {/* Planet Circle */}
                          <circle
                            r={planet.radius}
                            fill={planet.color}
                            filter="url(#planetGlow)"
                            className="transition-all duration-300 group-hover:filter-none group-hover:brightness-110"
                          />

                          {/* Planetary Rings */}
                          {planet.rings && (
                            <g opacity={planet.rings.opacity} className="pointer-events-none">
                                {planet.id === 'saturn' ? (
                                    // Saturn Special High-Fidelity Rings
                                    <>
                                        {/* C Ring (Inner - Darker) */}
                                        <ellipse
                                          rx={planet.radius * 1.35}
                                          ry={planet.radius * 1.35 * 0.4}
                                          fill="none"
                                          stroke={planet.rings.colors[0]}
                                          strokeWidth={planet.radius * 0.3}
                                        />
                                        {/* B Ring (Middle - Brightest & Widest) */}
                                        <ellipse
                                          rx={planet.radius * 1.72}
                                          ry={planet.radius * 1.72 * 0.4}
                                          fill="none"
                                          stroke={planet.rings.colors[1]}
                                          strokeWidth={planet.radius * 0.42}
                                        />
                                        {/* Cassini Division (Gap - Dark ring to emphasize separation) */}
                                        <ellipse
                                          rx={planet.radius * 1.95}
                                          ry={planet.radius * 1.95 * 0.4}
                                          fill="none"
                                          stroke="#000000"
                                          strokeOpacity="0.2"
                                          strokeWidth={planet.radius * 0.05}
                                        />
                                        {/* A Ring (Outer) */}
                                        <ellipse
                                          rx={planet.radius * 2.15}
                                          ry={planet.radius * 2.15 * 0.4}
                                          fill="none"
                                          stroke={planet.rings.colors[2]}
                                          strokeWidth={planet.radius * 0.3}
                                        />
                                        {/* Subtle highlight on B Ring */}
                                        <ellipse
                                          rx={planet.radius * 1.7}
                                          ry={planet.radius * 1.7 * 0.4}
                                          fill="none"
                                          stroke="white"
                                          strokeWidth="1"
                                          strokeOpacity="0.15"
                                        />
                                    </>
                                ) : (
                                    // Generic Rings for other planets
                                    <>
                                        <ellipse
                                          rx={planet.radius * (planet.rings.innerRadius + planet.rings.outerRadius) / 2}
                                          ry={planet.radius * (planet.rings.innerRadius + planet.rings.outerRadius) / 2 * 0.4}
                                          fill="none"
                                          stroke={planet.rings.colors[0]}
                                          strokeWidth={planet.radius * (planet.rings.outerRadius - planet.rings.innerRadius)}
                                        />
                                        {/* Detail ring for visual enhancement */}
                                        <ellipse
                                          rx={planet.radius * (planet.rings.innerRadius + planet.rings.outerRadius) / 2}
                                          ry={planet.radius * (planet.rings.innerRadius + planet.rings.outerRadius) / 2 * 0.4}
                                          fill="none"
                                          stroke="white"
                                          strokeWidth="0.5"
                                          strokeOpacity="0.3"
                                        />
                                    </>
                                )}
                            </g>
                          )}

                          {/* Moons */}
                          {planet.moons && planet.moons.map((moon, idx) => {
                              const dist = moon.distance;
                              // Moon path: Flattened ellipse to match the perspective (rx=dist, ry=dist*0.4)
                              const moonPathData = `M ${dist} 0 A ${dist} ${dist * 0.4} 0 1 0 ${-dist} 0 A ${dist} ${dist * 0.4} 0 1 0 ${dist} 0`;
                              
                              return (
                                <g key={idx} className="pointer-events-none">
                                    {/* Moon Orbit Path */}
                                    <path 
                                      d={moonPathData}
                                      fill="none" 
                                      stroke="white" 
                                      strokeOpacity="0.15" 
                                      strokeWidth="0.5" 
                                    />
                                    {/* Moving Moon */}
                                    <g style={{ 
                                        offsetPath: `path('${moonPathData}')`,
                                        animation: `moon-move ${moon.speed}s linear infinite ${moon.retrograde ? 'reverse' : 'normal'}`,
                                    }}>
                                        <circle 
                                          r={moon.radius} 
                                          fill={moon.color} 
                                          opacity="0.9"
                                        />
                                    </g>
                                </g>
                              );
                          })}
                      </g>
                      
                      {/* Label Group (Stays upright, counter-rotated against argumentOfPerihelion) */}
                      <g 
                        transform={`translate(0, ${planet.radius + 25}) rotate(-${planet.argumentOfPerihelion || 0})`}
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
            );
        })}
      </svg>
      
      <div className="absolute bottom-4 left-4 text-slate-500 text-xs pointer-events-none opacity-50 font-mono">
        {language === 'zh' ? '* 轨道大小和速度为可视化效果已做调整，非真实比例。' : '* Orbit scales and speeds adjusted for visualization purposes.'}
      </div>
    </div>
  );
};

export default SolarSystemSVG;