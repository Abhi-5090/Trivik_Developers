// Trivik Courtyard — proximity data, transcribed from the PROXIMITY CHART.
// Six categories laid out as 60° sectors of the wheel, clockwise from the top.
// startAngle/endAngle are degrees clockwise from 12 o'clock (used for the SVG overlay).

export const proximityCategories = [
  {
    key: 'education',
    label: 'Education',
    color: '#2f7fd1',
    startAngle: 300,
    endAngle: 360,
    places: {
      5: ['Amity (U)', 'Harrow', 'Vihaan'],
      10: ['IIAMR', 'Cambridge (E)', 'Gitam (U)'],
      20: ['Chanakya (U)', 'Ekta', 'Global Minds', 'MVIT (E)', 'Akash', 'NAFL', 'Sadhu Vaswani', 'Stonehill', 'Embassy Academy', 'Vidyashilp (U)'],
      30: ['Manipal (U)', 'Vidyashilp', 'Podar Global', 'Nagarjuna (E)', 'Nitte (E)', 'Rayn'],
    },
  },
  {
    key: 'employment',
    label: 'Employment',
    color: '#e0a83e',
    startAngle: 0,
    endAngle: 60,
    places: {
      5: ['Grovers', 'ITIR'],
      10: ['Foxconn', 'Industrial Zone (DBR)'],
      20: ['Hightech Defence Park', 'ISRO'],
      30: ['Northgate', 'Scion Square', 'Devanahalli Business Park', 'Amazon', 'Aerospace Park', 'Aerocity', 'Ecopolis', 'Tech Cloud'],
    },
  },
  {
    key: 'retail',
    label: 'Retail & Leisure',
    color: '#e0607f',
    startAngle: 60,
    endAngle: 120,
    places: {
      5: ['To The Tee'],
      20: ['Embassy Riding', 'Dravid Center', 'Surge Riding', 'Brigade Arcade', 'Sattva Park Rubix', 'DMart'],
      30: ['JW Marriott', 'Decathlon', 'Nandi Hills', 'RMZ Mall', 'Golfshire'],
    },
  },
  {
    key: 'infra',
    label: 'Future Infra',
    color: '#2bb7c9',
    startAngle: 120,
    endAngle: 180,
    places: {
      30: ['World Trade Center', 'Brigade Atrium IT Park', 'Kwin City', 'Forum Mall', 'Metro', 'Bullet Train Station'],
    },
  },
  {
    key: 'connectivity',
    label: 'Connectivity',
    color: '#7b6fe0',
    startAngle: 180,
    endAngle: 240,
    places: {
      5: ['DC Office'],
      10: ['NH 44'],
      20: ['SH 9', 'Doddaballapura', 'Devanahalli'],
      30: ['Yelahanka', 'Airport'],
    },
  },
  {
    key: 'health',
    label: 'Health',
    color: '#4caf7d',
    startAngle: 240,
    endAngle: 300,
    places: {
      10: ['Manipal (DBR)', 'Ancient Wisdom'],
      20: ['Cytecare', 'Trust', 'Shathayu', 'Manasa'],
      30: ['Manipal (YNK)', 'Akash', 'Ramaiah Leena'],
    },
  },
]

export const timeRings = [5, 10, 20, 30]
