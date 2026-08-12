// Location / connectivity landmarks for Trivik Courtyard.
// Coordinates (x = left %, y = top %) are plotted on the base map image
// (public/images/trivik-location-map.jpg, intrinsic 1600 x 1441) and were
// derived from the client's vector LOCATION MAP.pdf. `m` = drive time (minutes).
// Landmarks without a plotted point (roads/highways) carry noPin: true.

// Project site marker (Trivik Courtyard) on the same map.
export const sitePin = { x: 52.2, y: 34, label: 'Trivik Courtyard' }

export const landmarkCategories = [
  {
    key: 'education',
    label: 'Education',
    color: '#3B5D3A',
    places: [
      { n: 'Harrow School', m: 2, x: 44.5, y: 34.38 },
      { n: 'Amity University', m: 2, x: 42.1, y: 32.72 },
      { n: 'Vihaan School', m: 3, x: 53.47, y: 32.35 },
      { n: 'GITAM University', m: 5, x: 41.53, y: 29.16 },
      { n: 'Cambridge Engg. College', m: 5, x: 40.83, y: 42.19 },
      { n: 'Vidyashilp University', m: 13, x: 39.07, y: 53.15 },
      { n: 'Embassy Academy', m: 15, x: 48.17, y: 52.18 },
      { n: 'Stonehill School', m: 17, x: 44.63, y: 61.99 },
      { n: 'Chanakya University', m: 20, x: 82.43, y: 48 },
      { n: 'NAFL School', m: 20, x: 57.47, y: 53.81 },
      { n: 'Akash School', m: 20, x: 65.4, y: 44.04 },
      { n: 'Sadhu Vaswani School', m: 20, x: 45.67, y: 64.91 },
      { n: 'MVIT Engg. College', m: 20, x: 45.93, y: 68.47 },
      { n: 'Ekta School', m: 20, x: 80.23, y: 54.03 },
      { n: 'Global Minds School', m: 20, x: 74.9, y: 45.45 },
      { n: 'Nagarjuna Engg. College', m: 25, x: 76.3, y: 12.66 },
      { n: 'Manipal University', m: 25, x: 39.23, y: 74.69 },
      { n: 'Vidyashilp School', m: 25, x: 38.8, y: 71.91 },
      { n: 'Nitte Engg. College', m: 25, x: 37.47, y: 73.28 },
    ],
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    color: '#8C5A3C',
    places: [
      { n: 'IIAMR Hospital', m: 7, x: 44.77, y: 39.3 },
      { n: 'Manipal Hospital, Doddaballapur', m: 15, x: 29.17, y: 36.16 },
      { n: 'The School of Ancient Wisdom', m: 18, x: 57, y: 47.3 },
      { n: 'New Manasa Hospital', m: 20, x: 73.03, y: 40.67 },
      { n: 'Shathayu Wellness', m: 20, x: 71.27, y: 26.02 },
      { n: 'Akash Hospital', m: 23, x: 65.03, y: 44.82 },
      { n: 'Ramaiah Leena Hospital', m: 23, x: 64.87, y: 42.93 },
      { n: 'Cytecare Hospital', m: 30, x: 43.77, y: 76.5 },
      { n: 'Manipal Hospital, Yelahanka', m: 30, x: 47.5, y: 78.68 },
    ],
  },
  {
    key: 'employment',
    label: 'IT & Employment',
    color: '#556B2F',
    places: [
      { n: 'ITIR', m: 5, x: 44.37, y: 26.94 },
      { n: 'Industrial Zone', m: 8, x: 38.5, y: 35.57 },
      { n: 'Foxconn', m: 10, x: 47.5, y: 28.13 },
      { n: 'ISRO', m: 12, x: 74.9, y: 34.12 },
      { n: 'Aerospace Park', m: 19, x: 82.47, y: 49.7 },
      { n: 'Tech Cloud', m: 25, x: 52.2, y: 56.7 },
      { n: 'Ecopolis', m: 28, x: 48.83, y: 74.76 },
      { n: 'Signature Business Park', m: 29, x: 64.9, y: 50.67 },
      { n: 'Aerocity Techpark', m: 30, x: 46.83, y: 63.99 },
      { n: 'Hardware Park', m: 30, x: 69.13, y: 63.62 },
      { n: 'Northgate', m: 30, x: 42.43, y: 78.42 },
      { n: 'Amazon', m: 30, x: 47.93, y: 77.24 },
      { n: 'Phillips', m: 30, x: 42.87, y: 79.76 },
    ],
  },
  {
    key: 'recreation',
    label: 'Recreation & Retail',
    color: '#A07E3B',
    places: [
      { n: 'Grover Vineyard', m: 5, x: 37.6, y: 30.01 },
      { n: 'To The Tee Golf', m: 10, x: 47.5, y: 48.45 },
      { n: 'D Mart', m: 13, x: 34.6, y: 29.76 },
      { n: 'Dravid Padukone Centre', m: 17, x: 37.3, y: 63.58 },
      { n: 'Embassy Riding School', m: 17, x: 37.23, y: 60.77 },
      { n: 'Surge Riding School', m: 18, x: 37.83, y: 58.7 },
      { n: 'Brigade Arcadia', m: 18, x: 74.87, y: 44.41 },
      { n: 'Sattva Park Cubix', m: 18, x: 74.2, y: 43.19 },
      { n: 'Decathlon', m: 25, x: 54.53, y: 61.47 },
      { n: 'Nandi Hills', m: 30, x: 62.47, y: 10.07 },
      { n: 'JW Marriott', m: 30, x: 62.53, y: 23.39 },
      { n: 'Golfshire', m: 30, x: 62.97, y: 21.58 },
      { n: 'RMZ Galleria', m: 35, x: 44.8, y: 83.35 },
    ],
  },
  {
    key: 'connectivity',
    label: 'Culture & Connectivity',
    color: '#4A6B57',
    places: [
      { n: 'DC Office', m: 3, x: 50.27, y: 30.57 },
      { n: 'NH 44 (Bengaluru–Hyderabad Highway)', m: 10, x: 66, y: 42 },
      { n: 'Devanahalli Fort', m: 15, x: 63.9, y: 41.19 },
      { n: 'Jain Temple', m: 15, x: 73.97, y: 39.3 },
      { n: 'SH 9 (Doddaballapur Road)', m: 15, x: 38, y: 50 },
      { n: 'Kempegowda Intl. Airport', m: 30, x: 63.13, y: 53.48 },
      { n: 'Ghati Subramanya', m: 30, x: 28.13, y: 1.96 },
    ],
  },
  {
    key: 'future',
    label: 'Future Infra',
    color: '#6B5B95',
    places: [
      { n: 'World Trade Center', m: 22, x: 83.93, y: 51.3 },
      { n: 'Brigade Atrium', m: 25, x: 52.47, y: 54.59 },
      { n: 'Forum Mall', m: 25, x: 57.47, y: 57.22 },
      { n: 'Bullet Train Station', m: 30, x: 68.83, y: 49.04 },
      { n: 'Sub-Urban Rail Station', m: 30, x: 57, y: 50.33 },
    ],
  },
]
