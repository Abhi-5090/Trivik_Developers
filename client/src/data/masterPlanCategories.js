// Plot-size categories for the Master Plan section, colour-sampled directly
// from the sanctioned "TRIVIK LAYOUT PLAN" drawing's own legend (updated
// revision — numbered plots, muted olive/tan/grey palette). `key` maps a
// category to its images/masterplan-hl-{key}.webp highlight overlay and to
// the pixel index baked into images/masterplan-hitmap.png (odd=1, s1=2,
// s3=3, s4=4, s5=5, comm=6 — see the hitmap's R channel).
// `origin` is the centroid of each category's plots (as a % of the plan
// image), sampled separately for the rotated desktop art and the portrait
// mobile art — used as the CSS transform-origin for the hover zoom so the
// plan scales up around that category's own plots rather than the cursor.
export const PLAN_CATEGORIES = [
  { key: 's5', color: '#E8DCC8', label: '30 × 40 ft · 1,200 sq.ft', value: '74', origin: { desktop: { x: 34.78, y: 75.47 }, mobile: { x: 24.32, y: 34.78 } } },
  { key: 's1', color: '#ABACA6', label: '30 × 50 ft · 1,500 sq.ft', value: '68', origin: { desktop: { x: 67.17, y: 55.85 }, mobile: { x: 44.05, y: 67.17 } } },
  { key: 's4', color: '#B69B7E', label: '30 × 60 ft · 1,800 sq.ft', value: '37', origin: { desktop: { x: 36.67, y: 67.75 }, mobile: { x: 32.15, y: 36.67 } } },
  { key: 's3', color: '#A29572', label: '40 × 60 ft · 2,400 sq.ft', value: '26', origin: { desktop: { x: 40.28, y: 64.93 }, mobile: { x: 34.97, y: 40.28 } } },
  { key: 'odd', color: '#696F55', label: 'Odd Plots (as per site edge)', value: '100', origin: { desktop: { x: 56.39, y: 82.78 }, mobile: { x: 17.12, y: 56.39 } } },
  { key: 'comm', color: '#D6C4A8', label: 'Retail & Commercial', value: '02', origin: { desktop: { x: 26.44, y: 39.87 }, mobile: { x: 60.02, y: 26.44 } } },
]

export const PLAN_CATEGORY_BY_INDEX = {
  1: 'odd',
  2: 's1',
  3: 's3',
  4: 's4',
  5: 's5',
  6: 'comm',
}
