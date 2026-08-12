// ---- Amenities section (from client's amenities workbook) ----
// Indoor / clubhouse amenities
export const clubhouseItems = [
  'Entry Lobby', 'Lounge', 'Bistro Café', 'Meeting Room', 'Cowork Area', 'Library', 'Infirmary',
  'Game Room', 'Gym', 'VR Room', 'Home Theatre', 'Steam & Sauna', 'Party Hall', 'Pantry',
  'Meditation Deck', 'Yoga Deck', 'Star Gazing', 'Swimming Pool', 'Kids Pool', 'Table Tennis',
  'Billiards', 'Changing Rooms / Toilets', 'Lift', 'Lawns', 'Water Fountain',
]

// Outdoor amenities
export const outdoorItems = [
  'Kids Play Area', 'Jogging Track', 'Party Lawns', 'Outdoor Gym', 'Pickleball Court', 'Pet Park',
  'Basketball Court', 'Cricket Net Box', 'Senior Citizen Zone', 'Amphitheatre', 'Reflexology Path',
  'Landscape Gardens', 'Gazebo', 'Miyawaki Forest', 'Yoga Lawns',
]

// ---- Specifications section ----
export const specsTabs = [
  { key: 'services-tab', label: 'Electrical, Plumbing & Services', img: 'images/services.webp' },
  { key: 'features-tab', label: 'Green Features', img: 'images/features.webp' },
  { key: 'infrastructure-tab', label: 'Infrastructure', img: 'images/infra.webp' },
]

export const specsContent = {
  'infrastructure-tab': [
    {
      heading: 'Roads & Pathways',
      points: [
        '18m wide entrance road.',
        'Internal roads 12m & 9m wide asphalted driveways.',
        'Landscaped avenue on either side of the road with pedestrian pathways.',
        'Each plot has a defined access finished in concrete / pavers from the approach road.',
      ],
    },
  ],
  'services-tab': [
    {
      heading: 'Electrical',
      points: [
        'LED streetlights.',
        'Underground conduits for fibre optic provision (data & voice).',
        'Underground power lines from transformer yards to feeder pillars, with provision up to the plot.',
      ],
    },
    {
      heading: 'Plumbing',
      points: [
        'Underground dual water supply system.',
        'Plumbing lines terminated within plots for water supply & sewage.',
        'Underground sanitary lines connected to central STP.',
        'Centralized OHT & UG sump of suitable capacity with adequate head / pressure.',
        'Drip irrigation network for majority of common landscape areas.',
      ],
    },
    {
      heading: 'Services',
      points: [
        'Sewage Treatment Plant.',
        'Water Treatment Plant with underground sump tank.',
        'Organic Waste Convertor.',
        'DG provided for common services.',
      ],
    },
    {
      heading: 'Safety & Security',
      points: [
        'Security cabin with boom barriers.',
        'Peripheral boundary with entry / exit signages.',
        "CCTV cameras at main entrance & exit, service yards and children's play area.",
      ],
    },
  ],
  'features-tab': [
    {
      heading: 'Water Conservation',
      points: [
        'STP-treated water used for common landscape irrigation & flushing (all plots).',
        'Recharge pits for rainwater harvesting.',
      ],
    },
    {
      heading: 'Energy Conservation',
      points: ['Time-controlled LED street lights, partially powered by solar power.'],
    },
    {
      heading: 'Landscape Features',
      points: [
        'Urban garden areas.',
        'Avenue plantation for internal & public roads with low-maintenance plants.',
        'All landscape lights designed to enhance hardscape & softscape.',
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
