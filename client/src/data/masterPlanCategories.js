// Plot-size categories for the Master Plan section, colour-sampled directly
// from the sanctioned "TRIVIK LAYOUT PLAN" drawing's own legend (updated
// revision — numbered plots, muted olive/tan/grey palette). `key` maps a
// category to its images/masterplan-hl-{key}.webp highlight overlay and to
// the pixel index baked into images/masterplan-hitmap.png (odd=1, s1=2,
// s3=3, s4=4, s5=5, comm=6 — see the hitmap's R channel).
export const PLAN_CATEGORIES = [
  { key: 's5', color: '#E8DCC8', label: '30 × 40 ft · 1,200 sq.ft', value: '74' },
  { key: 's1', color: '#ABACA6', label: '30 × 50 ft · 1,500 sq.ft', value: '68' },
  { key: 's4', color: '#B69B7E', label: '30 × 60 ft · 1,800 sq.ft', value: '37' },
  { key: 's3', color: '#A29572', label: '40 × 60 ft · 2,400 sq.ft', value: '26' },
  { key: 'odd', color: '#696F55', label: 'Odd Plots (as per site edge)', value: '100' },
  { key: 'comm', color: '#D6C4A8', label: 'Retail & Commercial', value: '02' },
]

export const PLAN_CATEGORY_BY_INDEX = {
  1: 'odd',
  2: 's1',
  3: 's3',
  4: 's4',
  5: 's5',
  6: 'comm',
}
