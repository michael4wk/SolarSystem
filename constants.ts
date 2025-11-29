import { Planet } from './types';

// Visual scaling factors
// Real scale is impossible on screen, but we maintain relative order and 'feel'.
// Inner planets are faster and closer. Outer planets are slow and huge.

export const SUN_DATA: Planet = {
    id: 'sun',
    color: '#fbbf24',
    radius: 60,
    orbitRadius: 0,
    orbitPeriod: 0,
    eccentricity: 0,
    argumentOfPerihelion: 0,
    axialTilt: 0,
    rotationPeriodHours: 609.12, // ~25 days
    orbitalPeriodDays: 0,
    distanceAU: 0,
    texture: '/textures/2k_sun.jpg',
    photo: '/renders/sun.png',
    moons: [],
    temperature: '5,500°C',
    en: {
        name: 'Sun',
        description: 'The star at the center of our solar system.',
        detail: 'A nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light and infrared radiation.',
        facts: ['99.86% of solar system mass', 'G-type main-sequence star', '4.6 billion years old'],
        type: 'Star',
        feature: 'Star'
    },
    zh: {
        name: '太阳',
        description: '太阳系中心的恒星。',
        detail: '一个近乎完美的球体，由核心的核聚变反应加热至白炽状态，主要以可见光和红外辐射的形式辐射能量。',
        facts: ['占太阳系99.86%质量', 'G型主序星', '46亿年历史'],
        type: '恒星',
        feature: '恒星'
    }
};

export const PLANETS: Planet[] = [
  {
    id: 'mercury',
    color: '#a1a1aa', // Mercury Grey
    radius: 7,        // Smallest
    orbitRadius: 70, 
    orbitPeriod: 12,  // Fast
    eccentricity: 0.2056,
    argumentOfPerihelion: 77,
    axialTilt: 0,
    rotationPeriodHours: 1407.6,
    orbitalPeriodDays: 88,
    distanceAU: 0.39,
    texture: '/textures/2k_mercury.jpg',
    photo: '/renders/mercury.png',
    moons: [],
    temperature: '-180°C ~ 430°C',
    en: {
      name: 'Mercury',
      description: 'The swift, cratered messenger.',
      detail: 'Closest to the Sun and the smallest planet. It has no atmosphere to retain heat, causing extreme temperature fluctuations.',
      facts: ['Year is 88 days', 'Shrinking as it cools', 'Most cratered planet'],
      type: 'Terrestrial',
      feature: 'Swift'
    },
    zh: {
      name: '水星',
      description: '敏捷的信使，满布陨石坑。',
      detail: '离太阳最近也是最小的行星。它没有大气层来保持热量，导致极端的昼夜温差。',
      facts: ['一年仅88天', '正在冷却收缩', '陨石坑最多'],
      type: '类地行星',
      feature: '极速'
    }
  },
  {
    id: 'venus',
    color: '#fde047', // Pale Yellow
    radius: 14,        // Earth size-ish
    orbitRadius: 100,
    orbitPeriod: 20,
    eccentricity: 0.0068,
    argumentOfPerihelion: 131,
    axialTilt: 177,
    rotationPeriodHours: -5832.5,
    orbitalPeriodDays: 224.7,
    distanceAU: 0.72,
    texture: '/textures/2k_venus_surface.jpg',
    photo: '/renders/venus.png',
    moons: [],
    temperature: '465°C',
    en: {
      name: 'Venus',
      description: 'The hottest planet, shrouded in clouds.',
      detail: 'Similar in size to Earth but with a toxic atmosphere of carbon dioxide. The greenhouse effect makes it hotter than Mercury.',
      facts: ['Spins backwards', 'Longer day than year', 'Hottest surface'],
      type: 'Terrestrial',
      feature: 'Hottest'
    },
    zh: {
      name: '金星',
      description: '最热的行星，云层笼罩。',
      detail: '大小与地球相似，但拥有剧毒的二氧化碳大气层。温室效应使其比水星更热。',
      facts: ['逆向自转', '度日如年', '表面温度最高'],
      type: '类地行星',
      feature: '最热'
    }
  },
  {
    id: 'earth',
    color: '#3b82f6', // Earth Blue
    radius: 15,
    orbitRadius: 140,
    orbitPeriod: 30,  // Reference point
    eccentricity: 0.0167,
    argumentOfPerihelion: 102,
    axialTilt: 23,
    rotationPeriodHours: 23.9,
    orbitalPeriodDays: 365.2,
    distanceAU: 1.00,
    texture: '/textures/2k_earth_daymap.jpg',
    photo: '/renders/earth.png',
    moons: [
      { name: 'Moon', radius: 4, distance: 28, speed: 8, color: '#e5e5e5' }
    ],
    temperature: '-88°C ~ 58°C',
    en: {
      name: 'Earth',
      description: 'Our home, the blue marble.',
      detail: 'The only known planet to harbor life, with liquid water covering 70% of its surface and a protective magnetic field.',
      facts: ['Supports life', 'One natural moon', 'Densest planet'],
      type: 'Terrestrial',
      feature: 'Life'
    },
    zh: {
      name: '地球',
      description: '我们的家园，蓝色弹珠。',
      detail: '已知唯一孕育生命的星球，表面70%覆盖着液态水，并拥有保护性的磁场。',
      facts: ['孕育生命', '拥有月球', '密度最大'],
      type: '类地行星',
      feature: '生命'
    }
  },
  {
    id: 'mars',
    color: '#ef4444', // Mars Red
    radius: 10,        // Smaller than Earth
    orbitRadius: 180,
    orbitPeriod: 45,
    eccentricity: 0.0934,
    argumentOfPerihelion: 336,
    axialTilt: 25,
    rotationPeriodHours: 24.6,
    orbitalPeriodDays: 687,
    distanceAU: 1.52,
    texture: '/textures/2k_mars.jpg',
    photo: '/renders/mars.png',
    moons: [
      { name: 'Phobos', radius: 2, distance: 18, speed: 4, color: '#a8a29e' },
      { name: 'Deimos', radius: 1.5, distance: 24, speed: 6, color: '#d6d3d1' }
    ],
    temperature: '-140°C ~ 20°C',
    en: {
      name: 'Mars',
      description: 'The dusty red planet.',
      detail: 'Known for its red color due to iron oxide (rust). Home to the largest volcano (Olympus Mons) in the solar system.',
      facts: ['Two moons', 'Ancient water', 'Huge dust storms'],
      type: 'Terrestrial',
      feature: 'Red'
    },
    zh: {
      name: '火星',
      description: '布满尘埃的红色星球。',
      detail: '因氧化铁（铁锈）而呈现红色。拥有太阳系中最大的火山——奥林帕斯山。',
      facts: ['两颗卫星', '远古水源遗迹', '巨大沙尘暴'],
      type: '类地行星',
      feature: '赤红'
    }
  },
  {
    id: 'jupiter',
    color: '#d97706', // Jupiter Brown/Orange
    radius: 45,       // Huge
    orbitRadius: 260,
    orbitPeriod: 100, // Slow
    eccentricity: 0.0489,
    argumentOfPerihelion: 14,
    axialTilt: 3,
    rotationPeriodHours: 9.9,
    orbitalPeriodDays: 4333,
    distanceAU: 5.20,
    texture: '/textures/2k_jupiter.jpg',
    photo: '/renders/jupiter.png',
    rings: {
        colors: ['#a1a1aa'],
        innerRadius: 1.4,
        outerRadius: 1.8,
        opacity: 0.2
    },
    moons: [
      { name: 'Io', radius: 3, distance: 55, speed: 5, color: '#facc15' },
      { name: 'Europa', radius: 2.8, distance: 65, speed: 8, color: '#bfdbfe' },
      { name: 'Ganymede', radius: 4, distance: 80, speed: 12, color: '#9ca3af' }
    ],
    temperature: '-110°C',
    en: {
      name: 'Jupiter',
      description: 'King of planets, the gas giant.',
      detail: 'The largest planet, composed mostly of hydrogen and helium. Famous for its Great Red Spot, a centuries-old storm.',
      facts: ['Shortest day', '79+ moons', 'Strongest magnetosphere'],
      type: 'Gas Giant',
      feature: 'Giant'
    },
    zh: {
      name: '木星',
      description: '行星之王，气态巨行星。',
      detail: '最大的行星，主要由氢和氦组成。以其“大红斑”——一个存在数百年的风暴而闻名。',
      facts: ['自转最快', '79+卫星', '磁场最强'],
      type: '气态巨行星',
      feature: '巨大'
    }
  },
  {
    id: 'saturn',
    color: '#fcd34d', // Saturn Gold
    radius: 38,       // Large
    orbitRadius: 350,
    orbitPeriod: 150,
    eccentricity: 0.0565,
    argumentOfPerihelion: 92,
    axialTilt: 27,
    rotationPeriodHours: 10.7,
    orbitalPeriodDays: 10759,
    distanceAU: 9.58,
    texture: '/textures/2k_saturn.jpg',
    photo: '/renders/saturn.png',
    rings: {
        colors: ['#5a5346', '#d6c8a8', '#9e9176'], // Darker inner, Bright main, Outer band
        innerRadius: 1.2,
        outerRadius: 2.3,
        opacity: 0.9
    },
    moons: [
      { name: 'Titan', radius: 3.8, distance: 60, speed: 10, color: '#fbbf24' },
      { name: 'Enceladus', radius: 2, distance: 48, speed: 6, color: '#f1f5f9' }
    ],
    temperature: '-140°C',
    en: {
      name: 'Saturn',
      description: 'The jewel of the solar system.',
      detail: 'Distinguished by its complex ring system made of ice and rock. It is the least dense planet—it would float in water.',
      facts: ['Spectacular rings', 'Hexagon storm', 'Least dense'],
      type: 'Gas Giant',
      feature: 'Rings'
    },
    zh: {
      name: '土星',
      description: '太阳系的宝石。',
      detail: '以其由冰和岩石组成的复杂环系而著称。它是密度最小的行星——甚至可以漂浮在水上。',
      facts: ['壮观光环', '六边形风暴', '密度最小'],
      type: '气态巨行星',
      feature: '光环'
    }
  },
  {
    id: 'uranus',
    color: '#22d3ee', // Uranus Cyan
    radius: 25,
    orbitRadius: 440,
    orbitPeriod: 220, // Very slow
    eccentricity: 0.0457,
    argumentOfPerihelion: 170,
    axialTilt: 98,
    rotationPeriodHours: -17.2,
    orbitalPeriodDays: 30687,
    distanceAU: 19.22,
    texture: '/textures/2k_uranus.jpg',
    photo: '/renders/uranus.png',
    rings: {
        colors: ['#cffafe'],
        innerRadius: 1.5,
        outerRadius: 2.0,
        opacity: 0.3
    },
    moons: [
       { name: 'Titania', radius: 2.5, distance: 38, speed: 9, color: '#e2e8f0' }
    ],
    temperature: '-195°C',
    en: {
      name: 'Uranus',
      description: 'The tilted ice giant.',
      detail: 'Rotates on its side, rolling around the Sun. It has a cold atmosphere containing methane, giving it a blue-green hue.',
      facts: ['Rotates on side', 'Coldest atmosphere', 'Icy mantle'],
      type: 'Ice Giant',
      feature: 'Tilted'
    },
    zh: {
      name: '天王星',
      description: '躺着的冰巨星。',
      detail: '侧身自转，就像在轨道上滚动一样。大气中含有甲烷，使其呈现蓝绿色。',
      facts: ['侧向自转', '大气最冷', '冰质地幔'],
      type: '冰巨星',
      feature: '躺平'
    }
  },
  {
    id: 'neptune',
    color: '#3b82f6', // Neptune Deep Blue
    radius: 25,
    orbitRadius: 520,
    orbitPeriod: 300, // Slowest
    eccentricity: 0.0113,
    argumentOfPerihelion: 44,
    axialTilt: 28,
    rotationPeriodHours: 16.1,
    orbitalPeriodDays: 60190,
    distanceAU: 30.05,
    texture: '/textures/2k_neptune.jpg',
    photo: '/renders/neptune.png',
    rings: {
        colors: ['#bfdbfe'],
        innerRadius: 1.5,
        outerRadius: 2.0,
        opacity: 0.2
    },
    moons: [
       { name: 'Triton', radius: 3, distance: 40, speed: 11, color: '#f8fafc', retrograde: true }
    ],
    temperature: '-200°C',
    en: {
      name: 'Neptune',
      description: 'The windy, distant blue world.',
      detail: 'The most distant major planet. Known for supersonic winds and a deep blue color caused by methane.',
      facts: ['Supersonic winds', 'Longest orbit', 'Dark spots'],
      type: 'Ice Giant',
      feature: 'Windy'
    },
    zh: {
      name: '海王星',
      description: '遥远且多风的蓝色世界。',
      detail: '距离最远的主要行星。以超音速风暴和因甲烷而产生的深蓝色而闻名。',
      facts: ['超音速风', '公转最长', '大暗斑'],
      type: '冰巨星',
      feature: '狂风'
    }
  },
  {
    id: 'pluto',
    color: '#d1d5db', // Pluto Grey/White
    radius: 8,        // Tiny (smaller than Mercury)
    orbitRadius: 590, // Furthest out
    orbitPeriod: 400, // Very slow
    eccentricity: 0.2488,
    argumentOfPerihelion: 224,
    axialTilt: 120,
    rotationPeriodHours: 153.3,
    orbitalPeriodDays: 90560,
    distanceAU: 39.48,
    texture: '/textures/2k_pluto.jpg', // Now we have a texture!
    photo: '/renders/pluto.png', // Or fallback if download failed
    moons: [
       { name: 'Charon', radius: 4, distance: 15, speed: 14, color: '#9ca3af' }
    ],
    temperature: '-225°C',
    en: {
      name: 'Pluto',
      description: 'The dwarf planet at the edge.',
      detail: 'Once the 9th planet, reclassified as a dwarf planet in 2006. It has a heart-shaped glacier and orbits in the Kuiper Belt.',
      facts: ['Dwarf planet', 'Heart-shaped glacier', '5 moons'],
      type: 'Dwarf Planet',
      feature: 'Dwarf'
    },
    zh: {
      name: '冥王星',
      description: '边缘地带的矮行星。',
      detail: '曾是第九大行星，2006年被重新归类为矮行星。它拥有一颗心形冰川，运行在柯伊伯带中。',
      facts: ['矮行星', '心形冰川', '5颗卫星'],
      type: '矮行星',
      feature: '矮星'
    }
  }
];
