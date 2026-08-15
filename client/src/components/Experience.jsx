import { useEffect, useRef, useState } from 'react'

// "Designed for life" — a fixed data card with an image that flies in from
// off-screen left, docks against the card, holds while its figures ease in,
// then exits back out to the left as the next image takes its place.
const ITEMS = [
  {
    img: 'images/dfl-plots.webp',
    alt: 'Master layout',
    value: '306',
    label: 'Villa Plots',
    note: 'Vaastu-compliant, 1,200 – 2,400 sq.ft.',
  },
  {
    img: 'images/acres.webp',
    alt: 'Acres',
    value: '25',
    label: 'Acres',
    note: 'Master-planned, low density, gated.',
  },
  {
    img: 'images/clubhouse-wide.webp',
    alt: 'Clubhouse',
    value: '14,000',
    label: 'Sq.ft Clubhouse',
    note: 'Wheelchair-accessible and lift-served.',
  },
  {
    img: 'images/dfl-amenities.webp',
    alt: 'Amenities',
    value: '25+',
    label: 'Amenities',
    note: 'Curated indoor and outdoor spaces.',
  },
  {
    img: 'images/dfl-park.webp',
    alt: 'Courts',
    value: '4',
    label: 'Courts',
    note: 'Green, Play, Zen and Bloom.',
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
  const queued = useRef(null)

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

  // hold → leave. Runs regardless of the cursor: hovering does not pause it.
  useEffect(() => {
    if (phase !== 'hold' || paused) return
    const t = setTimeout(() => setPhase('leave'), HOLD)
    return () => clearTimeout(t)
  }, [phase, paused])

  // leave → next. A manual pick parks its index here so arrows and dots run
  // through the same exit/enter choreography as the automatic advance.
  useEffect(() => {
    if (phase !== 'leave') return
    const t = setTimeout(() => {
      // read and clear the queued index *outside* the updater — a state updater
      // must be pure, and React invokes it more than once in StrictMode, which
      // dropped the queued value and sent "previous" forward instead of back
      const q = queued.current
      queued.current = null
      setActive((a) => (q !== null ? q : (a + 1) % ITEMS.length))
    }, EXIT)
    return () => clearTimeout(t)
  }, [phase])

  const goTo = (i) => {
    const n = (i + ITEMS.length) % ITEMS.length
    if (n === active || phase === 'leave' || !inView) return
    queued.current = n
    setPhase('leave')
  }
  const prev = () => goTo(active - 1)
  const next = () => goTo(active + 1)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
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
          onKeyDown={onKeyDown}
          role="group"
          aria-roledescription="carousel"
          aria-label="Project figures"
        >
          {/* image column — the arrows sit on this static wrapper so they hold
              their place while the card itself travels in and out */}
          <div className="dfl-imagecol">
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

            <button className="dfl-arrow dfl-arrow--prev" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="dfl-arrow dfl-arrow--next" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
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
                  onClick={() => goTo(i)}
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
