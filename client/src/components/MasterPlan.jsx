import { useEffect, useRef, useState } from 'react'
import PlanGraphic from './PlanGraphic.jsx'

const TABS = [
  { key: 'site', label: 'Site Analysis' },
  { key: 'landuse', label: 'Land Use' },
]

// colours mirror PlanGraphic so the legend swatches match the map
const SITE_ROWS = [
  { color: '#9B8CC4', label: 'Odd Sites', value: '100' },
  { color: '#5B9BD5', label: '9.14 × 15.24 m', value: '68' },
  { color: '#3FA9A6', label: '9.14 × 12.19 m', value: '74' },
  { color: '#7FB069', label: '9.14 × 18.28 m', value: '37' },
  { color: '#D2695E', label: '12.19 × 18.28 m', value: '26' },
  { color: '#E8924A', label: 'Commercial Sites', value: '02' },
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
          <h3>Master Plan</h3>
          <p>
            Thoughtfully zoned across ~23.5 acres — 307 sites, 6 landscaped parks and generous open spaces.
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
              {active === 'site' && (
                <div className="mplan-row mplan-total">
                  <span className="mplan-sw mplan-sw--empty" />
                  <span className="mplan-rl">Total Sites</span>
                  <span className="mplan-rv">307</span>
                </div>
              )}
            </div>

            <p className="mplan-note">
              Total area ~23.5 acres (95,019 sq.m) · 6 parks (9,511 sq.m) · 2 commercial sites.
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
