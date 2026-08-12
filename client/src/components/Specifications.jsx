import { useEffect, useRef, useState } from 'react'
import { specsTabs, specsContent } from '../data/contentData.js'

const RoadIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3 5 21M16 3l3 18M12 4v2M12 10v2M12 16v2" />
  </svg>
)
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
)
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-8.5 16-9-1 12-5 16-9 16Z" />
    <path d="M4 21c3-6 6.5-9 12-11" />
  </svg>
)
const ICONS = { 'infrastructure-tab': <RoadIcon />, 'services-tab': <BoltIcon />, 'features-tab': <LeafIcon /> }

export default function Specifications() {
  const [tab, setTab] = useState('services-tab')
  const timer = useRef(null)
  const active = specsTabs.find((t) => t.key === tab)
  const blocks = specsContent[tab]

  // silently auto-rotate through the tabs, forever (no timer UI)
  const schedule = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      setTab((prev) => {
        const i = specsTabs.findIndex((t) => t.key === prev)
        return specsTabs[(i + 1) % specsTabs.length].key
      })
    }, 4500)
  }
  useEffect(() => {
    schedule()
    return () => clearInterval(timer.current)
  }, [])

  const selectTab = (k) => {
    setTab(k)
    schedule()
  }

  return (
    <section className="specifications-section spec2" id="specifications">
      <div className="container">
        <div className="spec2-head">
          <h3>Project Specifications</h3>
          <p>
            The fundamentals that quietly shape everyday comfort — infrastructure, services and green design,
            considered to the last detail.
          </p>
        </div>

        <div className="spec2-tabs" role="tablist">
          {specsTabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`spec2-tab${tab === t.key ? ' active' : ''}`}
              onClick={() => selectTab(t.key)}
            >
              <span className="spec2-tab-ic">{ICONS[t.key]}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="spec2-body">
          <div className="spec2-content" key={tab} style={{ columns: blocks.length > 1 ? 2 : 1 }}>
            {blocks.map((b) => (
              <div className="spec2-block" key={b.heading}>
                <h5>{b.heading}</h5>
                <ul>
                  {b.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="spec2-media">
            <figure className="spec2-frame">
              {specsTabs.map((t) => (
                <img key={t.key} src={t.img} alt={t.label} className={tab === t.key ? 'on' : ''} />
              ))}
              <span className="spec2-sheen" aria-hidden="true" />
              <span className="spec2-frame-ring" aria-hidden="true" />
              <span className="spec2-glasslabel">
                {ICONS[tab]}
                {active.label}
              </span>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
