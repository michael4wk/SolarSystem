import { Planet } from './types';

// Visual scaling factors
// Real scale is impossible on screen, but we maintain relative order and 'feel'.
// Inner planets are faster and closer. Outer planets are slow and huge.

export const PLANETS: Planet[] = [
  {
    id: 'mercury',
    color: '#a1a1aa', // Mercury Grey
    radius: 7,        // Smallest
    orbitRadius: 70, 
    orbitPeriod: 12,  // Fast
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