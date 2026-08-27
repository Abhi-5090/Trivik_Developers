// Location / connectivity landmarks for Trivik Courtyard.
// Coordinates (x = left %, y = top %) are plotted on the base map image
// (public/images/trivik-location-map.jpg, intrinsic 1600 x 1441) and were
// derived from the client's vector LOCATION MAP.pdf. `m` = drive time (minutes).
// Landmarks without a plotted point (roads/highways) carry noPin: true.

// Project site marker (Trivik Courtyard) on the same map.
export const sitePin = { x: 52.2, y: 33.8, label: 'Trivik Courtyard' }

export const landmarkCategories = [
  {
    key: 'education',
    label: 'Education',
    color: '#3B5D3A',
    places: [
      { n: 'Harrow School', m: 2, x: 48.63, y: 33.75 },
      { n: 'Amity University', m: 2, x: 46.57, y: 33.0 },
      { n: 'Vihaan School', m: 3, x: 52.34, y: 32.25 },
      { n: 'GITAM University', m: 5, x: 44.02, y: 29.92 },
      { n: 'Cambridge Engg. College', m: 5, x: 46.66, y: 42.34 },
      { n: 'Vidyashilp University', m: 13, x: 44.19, y: 54.86 },
      { n: 'Embassy Academy', m: 15, x: 45.17, y: 53.74 },
      { n: 'Stonehill School', m: 17, x: 43.2, y: 63.65 },
      { n: 'Chanakya University', m: 20, x: 82.82, y: 48.98 },
      { n: 'NAFL School', m: 20, x: 57.61, y: 55.7 },
      { n: 'Akash School', m: 20, x: 70.47, y: 44.49 },
      { n: 'Sadhu Vaswani School', m: 20, x: 44.1, y: 66.64 },
      { n: 'MVIT Engg. College', m: 20, x: 46.9, y: 70.0 },
      { n: 'Ekta School', m: 20, x: 83.65, y: 53.46 },
      { n: 'Global Minds School', m: 20, x: 74.91, y: 45.89 },
      { n: 'Nagarjuna Engg. College', m: 25, x: 75.9, y: 10.95 },
      { n: 'Manipal University', m: 25, x: 41.71, y: 75.89 },
      { n: 'Vidyashilp School', m: 25, x: 41.55, y: 74.02 },
      { n: 'Nitte Engg. College', m: 25, x: 41.63, y: 74.95 },
    ],
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    color: '#8C5A3C',
    places: [
      { n: 'IIAMR Hospital', m: 7, x: 45.17, y: 39.86 },
      { n: 'Manipal Hospital, Doddaballapur', m: 15, x: 33.72, y: 35.62 },
      { n: 'The School of Ancient Wisdom', m: 18, x: 66.02, y: 46.92 },
      { n: 'New Manasa Hospital', m: 20, x: 72.11, y: 40.48 },
      { n: 'Shathayu Wellness', m: 20, x: 72.11, y: 24.5 },
      { n: 'Akash Hospital', m: 23, x: 72.28, y: 45.05 },
      { n: 'Ramaiah Leena Hospital', m: 23, x: 72.11, y: 43.37 },
      { n: 'Cytecare Hospital', m: 30, x: 45.92, y: 79.44 },
      { n: 'Manipal Hospital, Yelahanka', m: 30, x: 46.08, y: 80.93 },
    ],
  },
  {
    key: 'employment',
    label: 'IT & Employment',
    color: '#556B2F',
    places: [
      { n: 'ITIR', m: 5, x: 44.19, y: 27.68 },
      { n: 'Industrial Zone', m: 8, x: 36.69, y: 34.68 },
      { n: 'Foxconn', m: 10, x: 47.73, y: 28.65 },
      { n: 'ISRO', m: 12, x: 74.58, y: 34.18 },
      { n: 'Aerospace Park', m: 19, x: 82.74, y: 50.1 },
      { n: 'Tech Cloud', m: 25, x: 54.9, y: 54.58 },
      { n: 'Ecopolis', m: 28, x: 46.08, y: 76.07 },
      { n: 'Signature Business Park', m: 29, x: 65.52, y: 50.66 },
      { n: 'Aerocity Techpark', m: 30, x: 51.27, y: 64.77 },
      { n: 'Hardware Park', m: 30, x: 72.11, y: 64.02 },
      { n: 'Northgate', m: 30, x: 46.41, y: 80.18 },
      { n: 'Amazon', m: 30, x: 48.14, y: 78.5 },
      { n: 'Phillips', m: 30, x: 45.5, y: 81.49 },
    ],
  },
  {
    key: 'recreation',
    label: 'Recreation & Retail',
    color: '#A07E3B',
    places: [
      { n: 'Grover Vineyard', m: 5, x: 39.24, y: 31.13 },
      { n: 'To The Tee Golf', m: 10, x: 45.75, y: 49.26 },
      { n: 'D Mart', m: 13, x: 32.73, y: 29.92 },
      { n: 'Dravid Padukone Centre', m: 17, x: 43.61, y: 64.67 },
      { n: 'Embassy Riding School', m: 17, x: 42.37, y: 62.81 },
      { n: 'Surge Riding School', m: 18, x: 40.89, y: 60.47 },
      { n: 'Brigade Arcadia', m: 18, x: 76.89, y: 44.96 },
      { n: 'Sattva Park Cubix', m: 18, x: 74.91, y: 43.75 },
      { n: 'Decathlon', m: 25, x: 53.99, y: 61.87 },
      { n: 'Nandi Hills', m: 30, x: 64.86, y: 9.55 },
      { n: 'JW Marriott', m: 30, x: 66.26, y: 21.7 },
      { n: 'Golfshire', m: 30, x: 67.17, y: 21.14 },
      { n: 'RMZ Galleria', m: 35, x: 44.1, y: 85.6 },
    ],
  },
  {
    key: 'connectivity',
    label: 'Culture & Connectivity',
    color: '#4A6B57',
    places: [
      { n: 'DC Office', m: 3, x: 49.95, y: 31.41 },
      { n: 'NH 44 (Bengaluru–Hyderabad Highway)', m: 10, x: 67.99, y: 44.96 },
      { n: 'Devanahalli Fort', m: 15, x: 71.62, y: 41.13 },
      { n: 'Jain Temple', m: 15, x: 73.76, y: 39.64 },
      { n: 'SH 9 (Doddaballapur Road)', m: 15, x: 35.37, y: 54.12 },
      { n: 'Kempegowda Intl. Airport', m: 30, x: 70.51, y: 57.94 },
      { n: 'Ghati Subramanya', m: 30, x: 25.32, y: 0.0 },
    ],
  },
  {
    key: 'future',
    label: 'Future Infra',
    color: '#6B5B95',
    places: [
      { n: 'World Trade Center', m: 22, x: 85.13, y: 51.22 },
      { n: 'Brigade Atrium', m: 25, x: 57.12, y: 56.27 },
      { n: 'Forum Mall', m: 25, x: 56.71, y: 58.23 },
      { n: 'Bullet Train Station', m: 30, x: 68.16, y: 50.01 },
      { n: 'Sub-Urban Rail Station', m: 30, x: 56.46, y: 52.43 },
    ],
  },
]
