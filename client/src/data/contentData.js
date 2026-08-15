// ---- Amenities section ----
// Source of truth: "Trivik Courtyard — The Master Narrative" (07 · Amenities
// and 06 · The Clubhouse). The narrative states 25+ curated indoor & outdoor
// amenities; these two lists total exactly that.

// Indoor / clubhouse facilities (narrative 06 · Facilities)
export const clubhouseItems = [
  'Entrance Lobby', 'Party Hall with Kitchen & Pantry', 'Swimming Pool', 'Kids’ Pool',
  'Gym', 'Steam & Sauna', 'Games Room', 'Café', 'Yoga Deck', 'Stargazing Deck',
  'Lift', 'Infirmary',
]

// Outdoor amenities (narrative 07 · Active / Family / Wellness / Nature)
export const outdoorItems = [
  'Cricket Box', 'Basketball Half Court', 'Pickleball Court', 'Kids’ Play Area',
  'Amphitheatre', 'Meditation Zone', 'Reflexology Park', 'Senior Citizen Park',
  'Miyawaki Forest', 'Sensory Gardens', 'Landscaped Gardens', 'Pet Park',
  'Theme Parks & Green Pockets',
]

// ---- Specifications section ----
// Source of truth: narrative 08 · Specifications and 07A · Green & Sustainability.
// Tab order: Infrastructure -> Green Features -> Our Services
export const specsTabs = [
  { key: 'infrastructure-tab', label: 'Infrastructure', img: 'images/clubhouse-entry.webp' },
  { key: 'features-tab', label: 'Green Features', img: 'images/spec-green-features.webp' },
  { key: 'services-tab', label: 'Our Services', img: 'images/services.webp' },
]

export const specsContent = {
  'infrastructure-tab': [
    {
      heading: 'Roads & Access',
      points: [
        '60 ft wide asphalt arterial road.',
        '30 ft & 40 ft wide asphalt internal roads.',
        'Landscaped and paver pathways on either side of roads.',
        'Road signage and plot numbering.',
        'Defined concrete / paver access to every plot from the approach road.',
      ],
    },
  ],
  'services-tab': [
    {
      heading: 'Water',
      points: [
        'Underground water supply connection (UGWS).',
        'Overhead water tank (OHT) and water treatment plant.',
        'Storm water gutter drains along the driveway.',
        'Rainwater harvesting recharge pits.',
      ],
    },
    {
      heading: 'Sewage',
      points: [
        'Underground sewage drain pipeline.',
        'Sewage treatment plant.',
      ],
    },
    {
      heading: 'Electrical & Communication',
      points: [
        'Underground electrical power connection.',
        'Energy-efficient street lighting.',
        'DG backup for common areas.',
        'Underground communication cabling.',
      ],
    },
    {
      heading: 'Safety & Security',
      points: [
        'Peripheral boundary with entry & exit gates.',
        'Grand entrance with security.',
        'CCTV surveillance across the community.',
      ],
    },
  ],
  'features-tab': [
    {
      heading: 'A Forest, Planted on Purpose',
      points: [
        'A Miyawaki forest — dense, native and alive with birdsong within a few short years.',
        'Sensory gardens that engage sight, scent and touch.',
        'Theme parks and green pockets threading green through the layout.',
        'Tree-lined pathways that turn every errand into a walk.',
      ],
    },
    {
      heading: 'Care Beneath the Surface',
      points: [
        'Rainwater harvesting recharge pits.',
        'Water treatment and reuse.',
        'Energy-efficient street lighting.',
        'Waste managed within the community.',
      ],
    },
  ],
}

// ---- Gallery section (bento layout) ----
export const galleryImages = [
  { src: 'images/swimming-pool.webp', div: 'div1', imgCls: 'img-large', alt: 'Swimming Pool' },
  { src: 'images/kids-play-area.webp', div: 'div2', imgCls: 'img-2', alt: 'Kids Play Area' },
  { src: 'images/club-day.webp', div: 'div3', imgCls: 'img-3', alt: 'Club Day View' },
  { src: 'images/night-club-view.webp', div: 'div4', imgCls: 'img-4', alt: 'Night Club View', style: { objectPosition: '-3em' } },
  { src: 'images/swimming-pool-top-view.webp', div: 'div5', imgCls: 'img-5', alt: 'Swimming Pool Top View' },
  { src: 'images/amphitheatre.webp', div: 'div6', imgCls: 'img-6', alt: 'Amphitheatre' },
  { src: 'images/multi-purpose-court.webp', div: 'div7', imgCls: 'img-7', alt: 'Multi Purpose Court' },
  { src: 'images/trivik-gate.webp', div: 'div8', imgCls: 'img-8', alt: 'Trivik Courtyard Entrance Gate' },
]

// ---- Clubhouse slider images ----
export const clubhouseImages = [
  'images/night-club-view.webp', 'images/fitness-items.webp', 'images/badminton.webp',
  'images/poker-table.webp', 'images/pingpong-table.webp', 'images/swimming-pool-stairs.webp',
  'images/playground.webp', 'images/yard.webp', 'images/sports.webp',
  'images/yoga-mat.webp', 'images/maple.webp',
]
