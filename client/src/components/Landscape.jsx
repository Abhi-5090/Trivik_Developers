import { useEffect, useRef, useState } from 'react'

const roads = [
  { title: '15 Metre Roads', tag: 'Arterial avenue', img: 'images/15metre-road.webp' },
  { title: '12 Metre Roads', tag: 'Connector street', img: 'images/12metre-road.webp' },
  { title: '9 Metre Roads', tag: 'Quiet internal lane', img: 'images/9metre-road.webp' },
]

const messages = [
  { kind: 'lead', text: 'A verdant welcome. 🌿' },
  {
    kind: 'text',
    text:
      'The internal roads are engineered for comfort, longevity and a smoother living experience. Our wide, chamber‑free concrete roads minimise junctions, sharp turns and underground utility hiccups — translating to lower maintenance, fewer disruptions and a quieter, safer passage for cars, cyclists and pedestrians, through the seasons.',
  },
  {
    kind: 'text',
    text:
      'Broad, clean and uncluttered, they echo the project’s ethos of restraint and permanence — where every detail quietly supports a life that moves with grace.',
  },
]

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M20 4c-9 .5-15 4-16.5 11.2-.5 2.3-.4 3.9-.2 5.3l1.9-.2c-.1-1.1-.2-2.2.1-3.6C6 12 10.5 9.5 15 8.6c-3.4 1.7-6.3 4.3-8 8.2 4.9.7 9.4-.8 11.6-5C20.7 8.4 20 5.8 20 4Z" />
  </svg>
)

export default function Landscape() {
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(false)
  const timer = useRef(null)
  const rootRef = useRef(null)

  const schedule = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => setActive((a) => (a + 1) % roads.length), 4200)
  }

  useEffect(() => {
    schedule()
    return () => clearInterval(timer.current)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const select = (i) => {
    setActive(i)
    schedule()
  }

  return (
    <section className="landscape-section" id="landscape" ref={rootRef}>
      <div className="container">
        {/* branded avenue-plantation opener */}
        <div className="verdant-banner">
          <img src="images/avenue-plantation.webp" alt="Trivik Courtyard tree-lined avenue" />
          <div className="verdant-banner-copy">
            <span className="verdant-banner-eyebrow">Landscape &amp; Avenue Plantation</span>
            <h3>A grand, tree-lined arrival.</h3>
            <p>Avenue plantation on both sides of every road — a canopy of green that welcomes you home.</p>
          </div>
        </div>
      </div>
      <div className="container verdant-wrap">
        {/* LEFT — rotating road-diagram viewer */}
        <div className="verdant-gallery">
          <div className="verdant-stage">
            <div className="verdant-frame">
              {roads.map((r, i) => (
                <figure className={`verdant-slide${active === i ? ' on' : ''}`} key={r.title}>
                  <img src={r.img} alt={r.title} />
                </figure>
              ))}
            </div>
            <div className="verdant-cap">
              <span className="verdant-cap-tag">Internal Roads</span>
              <span className="verdant-cap-title" key={active}>
                {roads[active].title}
              </span>
              <span className="verdant-cap-sub">{roads[active].tag}</span>
            </div>
          </div>
          <div className="verdant-dots">
            {roads.map((r, i) => (
              <button
                key={r.title}
                className={`verdant-dot${active === i ? ' on' : ''}`}
                onClick={() => select(i)}
                aria-label={r.title}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — chat-style description */}
        <div className={`verdant-chat${seen ? ' seen' : ''}`}>
          <div className="verdant-chat-head">
            <span className="verdant-avatar">
              <LeafIcon />
            </span>
            <span className="verdant-chat-meta">
              <b>Trivik Courtyard</b>
              <em>Landscape &amp; Internal Roads</em>
            </span>
          </div>
          <div className="verdant-thread">
            {messages.map((m, i) => (
              <div className={`verdant-bubble verdant-bubble--${m.kind}`} style={{ '--d': i }} key={i}>
                <span className="verdant-bubble-text">{m.text}</span>
                <span className="verdant-time">now</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
