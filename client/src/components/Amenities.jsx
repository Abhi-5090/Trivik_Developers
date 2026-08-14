import { useState } from 'react'
import { clubhouseItems, outdoorItems } from '../data/contentData.js'

const TABS = [
  {
    key: 'clubhouse',
    label: 'Clubhouse',
    count: 12,
    items: clubhouseItems,
    cols: 3,
    imgs: ['club-gym', 'club-cafeteria', 'club-sports', 'club-partyhall', 'club-meeting', 'club-library'],
  },
  {
    key: 'outdoor',
    label: 'Outdoor',
    count: 13,
    items: outdoorItems,
    cols: 2,
    imgs: ['lux-yoga', 'lux-varenda', 'lux-basketball', 'lux-openarea', 'lux-tabletennis', 'lux-amphi'],
  },
]

export default function Amenities() {
  const [tab, setTab] = useState('clubhouse')
  const a = TABS.find((t) => t.key === tab)

  return (
    <section className="amenities-section" id="amenities">
      <div className="container">
        <div className="amen-head">
          <h3>Layers of luxury.</h3>
          <p>
            Amenities here aren’t a list to be counted — they’re the moments of a day, designed with care.
            25+ curated indoor and outdoor spaces for play, wellness and belonging.
          </p>
        </div>

        <div className="amen-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`amen-tab${tab === t.key ? ' active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              <span>{t.count}</span>
            </button>
          ))}
        </div>

        <div className="amen-body">
          <ol className={`amen-list cols-${a.cols}`} key={a.key}>
            {a.items.map((label, i) => (
              <li key={label} style={{ '--i': i }}>
                <span className="amen-num">{i + 1}</span>
                <span className="amen-label">{label}</span>
              </li>
            ))}
          </ol>

          {/* both tabs mounted and stacked → cross-fade between them */}
          <div className="amen-mosaic-stack">
            {TABS.map((t) => (
              <div
                className={`amen-mosaic${tab === t.key ? ' on' : ''}`}
                key={t.key}
                aria-hidden={tab !== t.key}
              >
                {t.imgs.map((n, i) => (
                  <figure className={`amen-fig m${i + 1}`} key={n}>
                    <img src={`images/${n}.webp`} alt="" />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
