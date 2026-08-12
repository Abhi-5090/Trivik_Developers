import { useEffect, useRef, useState } from 'react'

const FLOORS = [
  {
    key: 'ground',
    label: 'Ground Floor',
    img: 'images/clubhouse-plan-ground.webp',
    spaces: [
      'Grand Entry Lobby & Lounge',
      'Bistro Café',
      'Fine-dining & Party Hall',
      'Cowork Area & Meeting Rooms',
      'Swimming Pool & Kids Pool',
      'Landscaped Lawn & Water Fountain',
    ],
  },
  {
    key: 'first',
    label: 'First Floor',
    img: 'images/clubhouse-plan-first.webp',
    spaces: [
      'Fully-equipped Gymnasium',
      'Double-height Game Room',
      'VR Room & Home Theatre',
      'Steam & Sauna',
      'Changing Rooms',
      'Open Lawn Deck',
    ],
  },
]

const STATS = [
  { v: '~20,000', u: 'sq. ft.', l: 'Clubhouse' },
  { v: '2', u: 'levels', l: 'Ground + First' },
  { v: '40+', u: 'curated', l: 'Amenities' },
]

export default function Clubhouse() {
  const [floor, setFloor] = useState('ground')
  const timer = useRef(null)
  const active = FLOORS.find((f) => f.key === floor)

  const schedule = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      setFloor((p) => (p === 'ground' ? 'first' : 'ground'))
    }, 6000)
  }
  useEffect(() => {
    schedule()
    return () => clearInterval(timer.current)
  }, [])

  const select = (k) => {
    setFloor(k)
    schedule()
  }

  return (
    <section className="clubhouse-section club2" id="clubhouse">
      <div className="container">
        {/* SHOWCASE — branded clubhouse glamour renders */}
        <div className="club2-showcase">
          <div className="club2-intro">
            <span className="club2-eyebrow">The Clubhouse</span>
            <h3>The soul of the community.</h3>
            <p>
              An exquisite ~20,000 sq. ft. structure that rises as a grounded, earth‑toned presence —
              anchoring Trivik Courtyard with quiet confidence.
            </p>
            <p>
              Social lounges, wellness nooks and curated leisure zones woven into green alcoves invite
              residents to pause, connect and unwind. Here, every gathering feels like a homecoming.
            </p>
            <div className="club2-stats">
              {STATS.map((s) => (
                <div className="club2-stat" key={s.l}>
                  <b>
                    {s.v} <span>{s.u}</span>
                  </b>
                  <em>{s.l}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="club2-gallery">
            <figure className="club2-shot club2-shot--main">
              <img src="images/clubhouse-wide.webp" alt="Trivik Courtyard clubhouse" />
              <figcaption>Clubhouse & Pool Deck</figcaption>
            </figure>
            <figure className="club2-shot club2-shot--sub">
              <img src="images/clubhouse-entry.webp" alt="Clubhouse entrance" />
              <figcaption>Arrival Court</figcaption>
            </figure>
          </div>
        </div>

        {/* FLOOR-PLAN EXPLORER */}
        <div className="club2-floors">
          <div className="club2-floors-head">
            <div>
              <span className="club2-eyebrow">Explore the plan</span>
              <h4>Two levels of considered leisure.</h4>
            </div>
            <div className="club2-tabs" role="tablist">
              {FLOORS.map((f) => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={floor === f.key}
                  className={`club2-tab${floor === f.key ? ' active' : ''}`}
                  onClick={() => select(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="club2-floor-body">
            <div className="club2-plan">
              {FLOORS.map((f) => (
                <img
                  key={f.key}
                  src={f.img}
                  alt={`${f.label} plan`}
                  className={floor === f.key ? 'on' : ''}
                />
              ))}
              <span className="club2-plan-badge">{active.label}</span>
            </div>

            <ul className="club2-spaces" key={floor}>
              {active.spaces.map((s, i) => (
                <li key={s} style={{ '--i': i }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-11" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
