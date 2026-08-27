import { useEffect, useRef, useState } from 'react'
import { landmarkCategories, sitePin } from '../data/locationLandmarks.js'

// On mobile/tablet, show only this many plots before the "Load more" button.
const MOBILE_PREVIEW = 4

// On desktop, a category longer than this is split into two columns so the
// whole list is readable at a glance instead of hiding behind a scrollbar.
const TWO_COL_MIN = 10

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 13.5 3 12l1-2 6.5 1 4-5.5c.6-.8 1.5-1.2 2.3-1 .8.2 1 1.1.5 1.9L14 12l.8 6.5-1.6.8-2.4-5.3L6.5 15 6 18l-1.5.5L4 15Z" />
  </svg>
)
const RoadIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3 5 21M16 3l3 18M12 4v2M12 10v2M12 16v2" />
  </svg>
)
const WorkIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
  </svg>
)
const CapIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9l10-4 10 4-10 4L2 9Z" />
    <path d="M6 11v4c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-4M22 9v5" />
  </svg>
)

// Drive times per "Trivik Courtyard — The Master Narrative" (03 · Location).
// The narrative groups schools and universities at 5–15 min, so the headline
// figure is the near end of that band, not the 2 min previously shown.
const HIGHLIGHTS = [
  { icon: <PlaneIcon />, value: 30, unit: 'min', label: 'Kempegowda Intl. Airport' },
  { icon: <WorkIcon />, value: 5, unit: 'min', label: 'ITIR · Foxconn operational' },
  { icon: <CapIcon />, value: 5, unit: 'min', label: 'Leading Schools & Universities' },
  { icon: <RoadIcon />, value: 10, unit: 'min', label: 'Doddaballapur Industrial Area' },
]

// count-up number that animates once its section scrolls into view
function CountUp({ to, run }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    const start = performance.now()
    const dur = 1100
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{n}</>
}

export default function Location() {
  const [active, setActive] = useState('education')
  const [hover, setHover] = useState(null)
  const [inView, setInView] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const rootRef = useRef(null)

  const idx = landmarkCategories.findIndex((c) => c.key === active)
  const cat = landmarkCategories[idx]

  // Two-column layout fills column-first (1…n down the left, then the right),
  // which needs an explicit row count for grid-auto-flow: column.
  const twoCol = cat.places.length > TWO_COL_MIN
  const colRows = Math.ceil(cat.places.length / 2)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const switchCat = (key) => {
    setActive(key)
    setHover(null)
    setExpanded(false)
  }

  return (
    <section className="location-section loc2" id="location" ref={rootRef}>
      <div className="container">
        <div className="loc2-stage">
          {/* ── header : centred title, then animated highlight stats ── */}
          <div className="loc2-head">
            <span className="loc2-eyebrow">
              The Location{' '}
              <span className="loc2-eyebrow-sub">
                Beerasandra,<br className="loc2-eyebrow-br" /> North Bengaluru.
              </span>
            </span>
            <h3>Your world, within minutes.</h3>
            <p>
              Trivik Courtyard sits directly on the Satellite Town Ring Road, the artery of North
              Bengaluru’s fastest-growing corridor — schools and universities, workplaces, healthcare
              and the airport, all arranged around the community, minutes in every direction.
            </p>
          </div>

          <div className="loc2-highlights">
            {HIGHLIGHTS.map((h) => (
              <div className="loc2-stat" key={h.label}>
                <span className="loc2-stat-ic">{h.icon}</span>
                <span className="loc2-stat-val">
                  <CountUp to={h.value} run={inView} />
                  <em>{h.unit}</em>
                </span>
                <span className="loc2-stat-label">{h.label}</span>
              </div>
            ))}
          </div>

          {/* ── category tabs ── */}
          <div className="loc2-tabs" role="tablist">
            {landmarkCategories.map((c, i) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === c.key}
                className={`loc2-tab${active === c.key ? ' active' : ''}`}
                onClick={() => switchCat(c.key)}
              >
                <span className="loc2-tab-dot" />
                {c.label}
                <span className="loc2-tab-count">{c.places.length}</span>
              </button>
            ))}
          </div>

          {/* ── body : synced list + map ── */}
          <div className="loc2-body">
            <div className="loc2-listcol">
              <div
                className={`loc2-list${twoCol ? ' loc2-list--two' : ''}${expanded ? ' expanded' : ''}`}
                style={twoCol ? { '--rows': colRows } : undefined}
                key={active}
              >
                {cat.places.map((p, i) => (
                  <div
                    className={`loc2-item${hover === i ? ' on' : ''}`}
                    key={p.n}
                    style={{ '--i': i }}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <span className="loc2-item-num">{i + 1}</span>
                    <span className="loc2-item-name">{p.n}</span>
                    <span className="loc2-item-time">{p.m} min</span>
                  </div>
                ))}
              </div>
              {cat.places.length > MOBILE_PREVIEW && !expanded && (
                <button className="loc2-more" onClick={() => setExpanded(true)}>
                  Load more <span>({cat.places.length - MOBILE_PREVIEW} more)</span>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>

            <div className="loc2-map">
              <div className="loc2-map-inner">
                <img src="images/trivik-location-map.jpg" alt="Trivik Courtyard location map" />

                {cat.places.map((p, i) =>
                  p.noPin ? null : (
                    <button
                      key={p.n}
                      className={`loc2-marker${hover === i ? ' on' : ''}`}
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      aria-label={`${p.n}, ${p.m} min`}
                    >
                      <span className="loc2-marker-n">{i + 1}</span>
                      <span className="loc2-marker-tip">
                        {p.n}
                        <b>{p.m} min drive</b>
                      </span>
                    </button>
                  )
                )}

                {/* project site pin with radar reach rings */}
                <div className="loc2-site" style={{ left: `${sitePin.x}%`, top: `${sitePin.y}%` }}>
                  <span className="loc2-site-ring" />
                  <span className="loc2-site-ring loc2-site-ring--2" />
                  <span className="loc2-site-dot" />
                  <span className="loc2-site-label">{sitePin.label}</span>
                </div>
              </div>

              <div className="loc2-legend">
                <span className="loc2-legend-dot" />
                <b>{cat.label}</b>
                <span className="loc2-legend-count">{cat.places.length} places</span>
              </div>
              <span className="loc2-compass" aria-hidden="true">N</span>
            </div>
          </div>

          <p className="loc2-disclaimer">
            *Drive times are approximate and indicative, based on typical road conditions. Map not to scale.
          </p>
        </div>
      </div>
    </section>
  )
}
