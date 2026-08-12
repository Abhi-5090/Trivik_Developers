import { useState } from 'react'
import { clubhouseItems, outdoorItems } from '../data/contentData.js'

const TABS = [
  {
    key: 'clubhouse',
    label: 'Clubhouse',
    count: 25,
    items: clubhouseItems,
    cols: 3,
    imgs: ['amenities6', 'amenities9', 'sports2', 'sports1', 'sports7', 'amenities3'],
  },
  {
    key: 'outdoor',
    label: 'Outdoor',
    count: 15,
    items: outdoorItems,
    cols: 2,
    imgs: ['amenities1', 'kids-play-area', 'amenities5', 'amphitheatre-new', 'yoga-deck', 'yard'],
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
            At Trivik Courtyard, every amenity is a quiet celebration of the everyday — 40+ curated spaces
            for wellness, leisure and joy.
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
