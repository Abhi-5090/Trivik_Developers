// A coherent, schematic master-plan of Trivik Courtyard:
//   • site boundary + internal ring road and central cross-roads
//   • four plotted residential quadrants (colour-coded by plot-size group)
//   • a central landscaped park (roundabout), side parks, civic amenity,
//     two commercial plots at the gated entrance, an STRR land-bank band.
// Same geometry, two colour readings:
//   mode="site"    → residential plots by size group; rest muted
//   mode="landuse" → every zone by land-use category
const W = 1280
const H = 720

const SIZE = { odd: '#9B8CC4', s1: '#5B9BD5', s2: '#3FA9A6', s4: '#7FB069', s5: '#D2695E' }
const LAND = { R: '#BFCFA6', P: '#7DA96A', C: '#E3A44A', A: '#6FA8C7', S: '#C6A98A', O: '#AFD08C' }
const COMM = '#E8924A'

// muted tones for the "site" reading (so coloured plots dominate)
const M = { road: '#E7E2D3', park: '#D7DCC6', civic: '#D6D9C8', strr: '#DED9CB', base: '#F1EEE4' }

// residential quadrant fields  {x,y,w,h,group,split?}
const QUADS = [
  { x: 92, y: 96, w: 514, h: 240, group: 'odd' },
  { x: 674, y: 96, w: 514, h: 240, group: 's2' },
  { x: 92, y: 384, w: 514, h: 240, group: 's1' },
  // bottom-right quadrant split into two size groups
  { x: 674, y: 384, w: 514, h: 116, group: 's4' },
  { x: 674, y: 508, w: 514, h: 116, group: 's5' },
]

// overlaid feature blocks {x,y,w,h,kind,rx,label?}
const FEATURES = [
  { x: 700, y: 150, w: 150, h: 96, kind: 'civic', rx: 12, label: 'CLUB' },
  { x: 520, y: 250, w: 78, h: 78, kind: 'park', rx: 16 },
  { x: 686, y: 396, w: 92, h: 74, kind: 'park', rx: 16 },
  { x: 150, y: 250, w: 84, h: 78, kind: 'park', rx: 16 },
  { x: 556, y: 546, w: 60, h: 56, kind: 'comm', rx: 8 },
  { x: 668, y: 546, w: 60, h: 56, kind: 'comm', rx: 8 },
]

function plotFill(group, mode) {
  return mode === 'landuse' ? LAND.R : SIZE[group]
}
function featureFill(kind, mode) {
  if (kind === 'comm') return COMM
  if (mode === 'landuse') {
    if (kind === 'park') return LAND.P
    if (kind === 'civic') return LAND.A
  }
  return kind === 'park' ? M.park : M.civic
}

// tile a rectangle with portrait "plots"
function plots(f, mode) {
  const pw = 33
  const ph = 40
  const gap = 5
  const cols = Math.max(1, Math.floor((f.w + gap) / (pw + gap)))
  const rows = Math.max(1, Math.floor((f.h + gap) / (ph + gap)))
  const tw = cols * pw + (cols - 1) * gap
  const th = rows * ph + (rows - 1) * gap
  const ox = f.x + (f.w - tw) / 2
  const oy = f.y + (f.h - th) / 2
  const fill = plotFill(f.group, mode)
  const out = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push(
        <rect
          key={`${f.group}-${f.y}-${r}-${c}`}
          x={ox + c * (pw + gap)}
          y={oy + r * (ph + gap)}
          width={pw}
          height={ph}
          rx={3}
          fill={fill}
        />
      )
    }
  }
  return out
}

export default function PlanGraphic({ mode }) {
  const road = mode === 'landuse' ? '#DED9CB' : M.road
  const treeC = mode === 'landuse' ? '#5F8C4E' : '#B9C3A6'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mplan-svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label={mode === 'landuse' ? 'Land use plan' : 'Site analysis plan'}>
      <defs>
        <linearGradient id={`mp-base-${mode}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5F2EA" />
          <stop offset="1" stopColor="#ECE8DC" />
        </linearGradient>
      </defs>

      {/* land base / boundary */}
      <rect x="20" y="20" width={W - 40} height={H - 40} rx="30" fill={`url(#mp-base-${mode})`} stroke="#D8D2C1" strokeWidth="2" />

      {/* STRR land-bank band (right edge) */}
      <rect x={1196} y={70} width={44} height={580} rx="10" fill={mode === 'landuse' ? LAND.S : M.strr} />

      {/* ROADS — ring + central cross */}
      <rect x="58" y="58" width={W - 116} height={H - 116} rx="34" fill="none" stroke={road} strokeWidth="30" />
      <rect x={606} y={58} width={68} height={H - 116} fill={road} />
      <rect x={58} y={336} width={W - 116} height={48} fill={road} />
      {/* dashed centre lines */}
      <line x1={640} y1={80} x2={640} y2={640} stroke="#C7C1B0" strokeWidth="2" strokeDasharray="9 11" />
      <line x1={80} y1={360} x2={1200} y2={360} stroke="#C7C1B0" strokeWidth="2" strokeDasharray="9 11" />

      {/* residential plots */}
      {QUADS.map((q) => plots(q, mode))}

      {/* overlaid features (halo + block) */}
      {FEATURES.map((f, i) => (
        <g key={`f-${i}`}>
          <rect x={f.x - 6} y={f.y - 6} width={f.w + 12} height={f.h + 12} rx={f.rx + 4} fill={M.base} />
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={f.rx} fill={featureFill(f.kind, mode)} />
          {f.kind === 'park' && (
            <>
              <circle cx={f.x + f.w * 0.32} cy={f.y + f.h * 0.4} r="8" fill={treeC} opacity="0.55" />
              <circle cx={f.x + f.w * 0.64} cy={f.y + f.h * 0.58} r="10" fill={treeC} opacity="0.5" />
            </>
          )}
          {f.kind === 'civic' && (
            <path
              d={`M${f.x + f.w / 2 - 16} ${f.y + f.h / 2 + 10} v-16 l16 -12 l16 12 v16 z`}
              fill="rgba(255,255,255,.65)"
            />
          )}
        </g>
      ))}

      {/* central park roundabout (over the crossroads) */}
      <circle cx={640} cy={360} r="104" fill={M.base} />
      <circle cx={640} cy={360} r="96" fill={mode === 'landuse' ? LAND.P : M.park} />
      <circle cx={640} cy={360} r="60" fill="none" stroke={mode === 'landuse' ? '#6B9558' : '#C4CFB0'} strokeWidth="2" strokeDasharray="6 8" />
      <circle cx={608} cy={338} r="11" fill={treeC} opacity="0.5" />
      <circle cx={672} cy={352} r="13" fill={treeC} opacity="0.45" />
      <circle cx={636} cy={392} r="10" fill={treeC} opacity="0.5" />

      {/* entrance gateway (bottom-centre) */}
      <rect x={606} y={624} width={68} height={44} fill={road} />
      <rect x={598} y={648} width={84} height={12} rx="6" fill="#B0452B" />
      <text x={640} y={690} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="17" fontWeight="700" letterSpacing="2" fill="#8A8272">
        ENTRANCE
      </text>

      {/* compass */}
      <g transform={`translate(${W - 74}, 66)`}>
        <circle r="20" fill="rgba(255,255,255,.85)" stroke="#D8D2C1" strokeWidth="1.5" />
        <path d="M0 -12 L5 2 L0 -2 L-5 2 Z" fill="#B0452B" />
        <text y="15" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="10" fontWeight="700" fill="#5A5F50">N</text>
      </g>
    </svg>
  )
}
