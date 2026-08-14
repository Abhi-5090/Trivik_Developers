import { useEffect, useRef, useState } from 'react'

// "Designed for life" — a fixed data card with an image that flies in from
// off-screen left, docks against the card, holds while its figures ease in,
// then exits back out to the left as the next image takes its place.
const ITEMS = [
  {
    img: 'images/dfl-plots.webp',
    alt: 'Master layout',
    value: '305',
    label: 'Residential Plots',
    note: 'Plus 2 commercial sites — 307 in all.',
  },
  {
    img: 'images/dfl-park.webp',
    alt: 'Parks',
    value: '6',
    label: 'Landscaped Parks',
    note: 'Green pockets threaded through the layout.',
  },
  {
    img: 'images/acres.webp',
    alt: 'Acres',
    value: '~23.5',
    label: 'Acres',
    note: 'In the Devanahalli growth corridor.',
  },
  {
    img: 'images/dfl-openspace.webp',
    alt: 'Open space',
    value: '10%',
    label: 'Open Space',
    note: 'Kept open, planted and shared.',
  },
  {
    img: 'images/dfl-amenities.webp',
    alt: 'Amenities',
    value: '30+',
    label: 'Amenities',
    note: 'Curated for wellness, leisure and play.',
  },
]

// phase timings (ms) — must stay in step with the transitions in global.css
const ENTER = 950   // image travels in and docks
const HOLD = 2900   // data is readable
const EXIT = 700    // image leaves to the left

export default function Experience() {
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState('idle')  // idle → enter → hold → leave
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef(null)

  // Hold the first frame off-stage until the section is actually on screen,
  // so the entrance isn't spent while the viewer is elsewhere on the page.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // enter → hold
  useEffect(() => {
    if (!inView) return
    setPhase('enter')
    const t = setTimeout(() => setPhase('hold'), ENTER)
    return () => clearTimeout(t)
  }, [active, inView])

  // hold → leave (skipped while paused, so hovering keeps the figures up)
  useEffect(() => {
    if (phase !== 'hold' || paused) return
    const t = setTimeout(() => setPhase('leave'), HOLD)
    return () => clearTimeout(t)
  }, [phase, paused])

  // leave → next
  useEffect(() => {
    if (phase !== 'leave') return
    const t = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), EXIT)
    return () => clearTimeout(t)
  }, [phase])

  const select = (i) => {
    if (i === active) return
    setActive(i)
  }

  const item = ITEMS[active]

  return (
    <section className="experience-section dfl" id="experience" ref={rootRef}>
      <div className="container">
        <div className="dfl-head">
          <span className="dfl-eyebrow">The Development</span>
          <h3>Designed for life.</h3>
          <p>Experience the luxury of ease.</p>
        </div>

        <div
          className="dfl-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* image card — flies in from off-screen left and docks here */}
          <div className={`dfl-visual is-${phase}`}>
            {ITEMS.map((it, i) => (
              <img
                key={it.img}
                src={it.img}
                alt={it.alt}
                className={i === active ? 'on' : ''}
                aria-hidden={i !== active}
              />
            ))}
          </div>

          {/* data card — stays put; contents ease in once the image docks */}
          <div className={`dfl-card is-${phase}`}>
            <span className="dfl-count" style={{ '--d': 0 }}>
              {String(active + 1).padStart(2, '0')}
              <em>/ {String(ITEMS.length).padStart(2, '0')}</em>
            </span>
            <strong className="dfl-value" style={{ '--d': 1 }}>{item.value}</strong>
            <span className="dfl-label" style={{ '--d': 2 }}>{item.label}</span>
            <span className="dfl-note" style={{ '--d': 3 }}>{item.note}</span>

            <div className="dfl-dots" style={{ '--d': 4 }}>
              {ITEMS.map((it, i) => (
                <button
                  key={it.img}
                  className={`dfl-dot${i === active ? ' on' : ''}`}
                  onClick={() => select(i)}
                  aria-label={`Show ${it.label}`}
                  aria-current={i === active}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
