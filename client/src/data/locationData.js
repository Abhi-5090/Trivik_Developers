// Location section — 6 tabs, each with map markers + a side list.
// Positions/tooltips/times transcribed verbatim from the original site.

export const locationTabs = [
  { key: 'education', label: 'Education' },
  { key: 'itparks', label: 'IT Parks' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'recreation', label: 'Recreation' },
  { key: 'connectivity', label: 'Connectivity' },
]

// Each place: { id, pos (inline style for marker), text, time }
export const locationData = {
  education: [
    { id: '1', pos: { top: '25%', left: '38%' }, text: 'Cambridge Institute of Technology', time: '3 minutes' },
    { id: '2', pos: { top: '8%', left: '48%' }, text: 'Harrow International School', time: '5 minutes' },
    { id: '3', pos: { top: '34%', right: '57%' }, text: 'Vidyashilp University', time: '7 minutes' },
    { id: '4', pos: { top: '41%', right: '59%' }, text: 'Stonehill International School', time: '12 minutes' },
    { id: '5', pos: { top: '29%', left: '0%' }, text: 'Presidency University', time: '22 minutes' },
  ],
  itparks: [
    { id: '6', pos: { top: '4%', right: '51%' }, text: 'Foxconn', time: '12 minutes' },
    { id: '7', pos: { top: '38%', right: '36%' }, text: 'Prestige Tech Cloud', time: '18 minutes' },
    { id: '8', pos: { top: '37%', right: '17%' }, text: 'Bengaluru Signature Business Park', time: '20 minutes' },
    { id: '9', pos: { bottom: '33%', left: '45%' }, text: 'Amazon Office', time: '23 minutes' },
    { id: '10', pos: { bottom: '45%', right: '13%' }, text: 'KIADB Hardware Park', time: '25 minutes' },
  ],
  healthcare: [
    { id: '11', pos: { top: '10%', left: '17%' }, text: 'Aadya Hospital', time: '15 minutes' },
    { id: '12', pos: { top: '15%', left: '12%' }, text: 'Manipal Hospital Doddaballapur', time: '18 minutes' },
    { id: '13', pos: { top: '27%', right: '6%' }, text: 'Akash Super Speciality Hospital', time: '18 minutes' },
    { id: '14', pos: { top: '33%', right: '33.5%' }, text: 'Ramaiah Leena Hospital', time: '20 minutes' },
    { id: '15', pos: { bottom: '37%', left: '42%' }, text: 'Cytecare Hospitals', time: '20 minutes' },
  ],
  shopping: [
    { id: '16', pos: { top: '5%', left: '11%' }, text: 'DMart Doddaballapur', time: '15 minutes' },
    { id: '17', pos: { bottom: '23%', left: '33%' }, text: 'The Galleria Mall', time: '25 minutes' },
    { id: '18', pos: { bottom: '17%', left: '33%' }, text: 'Phoenix Mall Of Asia', time: '25 minutes' },
    { id: '19', pos: { bottom: '21%', right: '39%' }, text: 'Bhartiya Mall of Bengaluru', time: '28 minutes' },
    { id: '20', pos: { bottom: '6%', left: '34%' }, text: 'Esteem Mall', time: '30 minutes' },
  ],
  recreation: [
    { id: '21', pos: { top: '47%', left: '36%' }, text: 'Padukone - Dravid Centre for Sports Excellence', time: '11 minutes' },
    { id: '22', pos: { top: '51%', left: '40%' }, text: 'GoRally Yelahanka (CSE)', time: '12 minutes' },
    { id: '23', pos: { top: '32%', right: '26%' }, text: 'Club Cabana Amusement Park', time: '17 minutes' },
    { id: '24', pos: { top: '39%', left: '15%' }, text: 'Angsana Oasis Spa And Resort', time: '20 minutes' },
    { id: '25', pos: { top: '60%', right: '39%' }, text: 'Farmlore', time: '20 minutes' },
  ],
  connectivity: [
    { id: '26', pos: { top: '9%', right: '44%' }, text: 'STRR', time: '5 minutes' },
    { id: '27', pos: { top: '28%', right: '17%' }, text: 'NH 44', time: '13 minutes' },
    { id: '28', pos: { top: '39%', right: '9%' }, text: 'Kempegowda International Airport', time: '22 minutes' },
  ],
}
