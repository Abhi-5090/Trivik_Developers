import { useEffect, useRef, useState } from 'react'
import PlanGraphic from './PlanGraphic.jsx'

const TABS = [
  { key: 'site', label: 'Site Analysis' },
  { key: 'landuse', label: 'Land Use' },
]

// colours mirror PlanGraphic so the legend swatches match the map
// Plot sizes in sq.ft, the unit the master narrative uses (metric equivalents:
// 9.14×12.19 m, 9.14×15.24 m, 9.14×18.28 m, 12.19×18.28 m). The range matches
// the narrative's stated 1,200 – 2,400 sq.ft.
const SITE_ROWS = [
  { color: '#3FA9A6', label: '30 × 40 ft · 1,200 sq.ft', value: '74' },
  { color: '#5B9BD5', label: '30 × 50 ft · 1,500 sq.ft', value: '68' },
  { color: '#7FB069', label: '30 × 60 ft · 1,800 sq.ft', value: '37' },
  { color: '#D2695E', label: '40 × 60 ft · 2,400 sq.ft', value: '26' },
  { color: '#9B8CC4', label: 'Odd Plots (as per site edge)', value: '100' },
  { color: '#E8924A', label: 'Retail & Commercial', value: '02' },
]

const LAND_ROWS = [
  { color: '#BFCFA6', label: 'Residential', value: '48.00%' },
  { color: '#DED9CB', label: 'Roads', value: '28.91%' },
  { color: '#7DA96A', label: 'Park Open Space', value: '10.00%' },
  { color: '#6FA8C7', label: 'Civic Amenity', value: '5.02%' },
  { color: '#C6A98A', label: 'STRR (Land Bank + Widening)', value: '5.00%' },
  { color: '#E3A44A', label: 'Commercial', value: '2.99%' },
  { color: '#AFD08C', label: 'Open Space', value: '0.08%' },
]

const ROTATE_MS = 5500

export default function MasterPlan() {
  const [active, setActive] = useState('site')
  const timer = useRef(null)

  const schedule = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => setActive((a) => (a === 'site' ? 'landuse' : 'site')), ROTATE_MS)
  }

  useEffect(() => {
    schedule()
    return () => clearInterval(timer.current)
  }, [])

  const select = (k) => {
    setActive(k)
    schedule()
  }

  const rows = active === 'site' ? SITE_ROWS : LAND_ROWS

  return (
    <section className="mplan-section" id="master_plan">
      <div className="container">
        <div className="mplan-head">
          <span className="mplan-eyebrow">The Master Plan</span>
          <h3>Thoughtfully zoned, acre by acre.</h3>
          <p>
            306 Vaastu-compliant villa plots from 1,200 – 2,400 sq.ft, gathered around gardens,
            a clubhouse and open sky across 23.5 master-planned acres.
          </p>
        </div>

        <div className="mplan-body">
          <div className="mplan-left">
            <div className="mplan-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active === t.key}
                  className={`mplan-tab${active === t.key ? ' active' : ''}`}
                  onClick={() => select(t.key)}
                >
                  {t.label}
                  {active === t.key && <span className="mplan-timer" key={t.key + Math.random()} />}
                </button>
              ))}
            </div>

            <div className="mplan-rows" key={active}>
              {rows.map((r) => (
                <div className="mplan-row" key={r.label}>
                  <span className="mplan-sw" style={{ background: r.color }} />
                  <span className="mplan-rl">{r.label}</span>
                  <span className="mplan-rv">{r.value}</span>
                </div>
              ))}
            </div>

            <p className="mplan-note">
              23.5 acres · 60 ft arterial avenue with 30 ft &amp; 40 ft internal streets ·
              integrated retail &amp; commercial zone.
            </p>
          </div>

          <div className="mplan-graphic">
            <div className={`mplan-layer${active === 'site' ? ' on' : ''}`}>
              <PlanGraphic mode="site" />
            </div>
            <div className={`mplan-layer${active === 'landuse' ? ' on' : ''}`}>
              <PlanGraphic mode="landuse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
