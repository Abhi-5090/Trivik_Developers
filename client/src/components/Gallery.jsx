import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Fancybox } from '@fancyapps/ui'

// Runway carousel: an endless thumbnail belt above a large centred stage.
// The belt is the image list repeated COPIES times; `pos` counts forward
// forever and is rebased by one full copy once it drifts past the middle one,
// so the runway only ever travels in one direction — no snap-back at the end.
const GALLERY = [
  { src: 'images/trivik-gate-daylight.webp', alt: 'The Grand Entrance by Day' },
  { src: 'images/clubhouse-entry.webp', alt: 'Clubhouse & Pool Deck' },
  { src: 'images/gallery-main.webp', alt: 'The Grand Entrance' },
  { src: 'images/gallery-entrance.webp', alt: 'Arrival Gateway' },
  { src: 'images/gallery-avenue.webp', alt: 'Tree-lined Avenue' },
  { src: 'images/gallery-open.webp', alt: 'Landscaped Open Spaces' },
  { src: 'images/gallery-basketball.webp', alt: 'Sports Court' },
  { src: 'images/gallery-park.webp', alt: "Children's Park" },
  { src: 'images/gallery-yoga.webp', alt: 'Yoga Deck' },
  { src: 'images/gallery-tabletennis.webp', alt: 'Pickleball Court' },
  { src: 'images/gallery-amphitheatre.webp', alt: 'Amphitheatre' },
]

const N = GALLERY.length
const COPIES = 3
const BELT = Array.from({ length: N * COPIES }, (_, k) => ({ ...GALLERY[k % N], k }))

const SLIDE_MS = 620      // keep in step with the .runway-belt transition
const AUTOPLAY_MS = 4000
const SWIPE_PX = 40

export default function Gallery() {
  const [pos, setPos] = useState(0)
  const [noAnim, setNoAnim] = useState(false)
  const [paused, setPaused] = useState(false)
  const [metrics, setMetrics] = useState({ step: 0, center: 0 })
  const stripRef = useRef(null)
  const beltRef = useRef(null)
  const touchX = useRef(null)

  const active = ((pos % N) + N) % N
  const centered = N + pos           // belt slot currently under the spotlight

  useEffect(() => {
    Fancybox.bind("[data-fancybox='project-gallery']", { Thumbs: { type: 'classic' } })
    return () => Fancybox.destroy()
  }, [])

  // Measure one thumb + gap so the belt can be positioned in pixels. Runs
  // before paint, and again whenever the strip resizes.
  useLayoutEffect(() => {
    const measure = () => {
      const belt = beltRef.current
      const strip = stripRef.current
      if (!belt || !strip || belt.children.length < 2) return
      const a = belt.children[0].getBoundingClientRect()
      const b = belt.children[1].getBoundingClientRect()
      setMetrics({ step: b.left - a.left, center: (strip.clientWidth - a.width) / 2 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stripRef.current) ro.observe(stripRef.current)
    return () => ro.disconnect()
  }, [])

  // Once the travel finishes, shift back by exactly one copy. The belt repeats
  // every N items, so the same pixels are on screen before and after — with the
  // transition suppressed for that frame the rebase is invisible.
  useEffect(() => {
    if (pos >= 0 && pos < N) return
    const t = setTimeout(() => {
      setNoAnim(true)
      setPos((p) => (p >= N ? p - N : p + N))
    }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [pos])

  useEffect(() => {
    if (!noAnim) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setNoAnim(false)))
    return () => cancelAnimationFrame(id)
  }, [noAnim])

  // Keyed off `active`, not `pos`, so an invisible rebase doesn't restart the
  // clock. Hovering no longer pauses it — only keyboard focus does, so someone
  // tabbing through the thumbs isn't fighting the rotation.
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setPos((p) => p + 1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [active, paused])

  const step = useCallback((d) => setPos((p) => p + d), [])

  // Dots jump by the shortest way round rather than unwinding the long way.
  const goIndex = useCallback((i) => {
    setPos((p) => {
      const cur = ((p % N) + N) % N
      let d = i - cur
      if (d > N / 2) d -= N
      if (d < -N / 2) d += N
      return p + d
    })
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
  }

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > SWIPE_PX) step(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const x = metrics.center - centered * metrics.step

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="jg-head">
          <h3>A world where your story takes shape.</h3>
        </div>

        <div
          className="runway"
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={onKeyDown}
          role="group"
          aria-roledescription="carousel"
          aria-label="Project gallery"
        >
          {/* ── the runway: endless thumbnail belt ── */}
          <div className="runway-strip" ref={stripRef}>
            <div
              className={`runway-belt${noAnim ? ' no-anim' : ''}`}
              ref={beltRef}
              style={{ transform: `translate3d(${x}px, 0, 0)` }}
            >
              {BELT.map((g) => (
                <button
                  key={g.k}
                  className={`runway-thumb${g.k === centered ? ' on' : ''}`}
                  onClick={() => setPos(g.k - N)}
                  aria-label={`Show ${g.alt}`}
                  aria-current={g.k === centered}
                  tabIndex={g.k >= N && g.k < N * 2 ? 0 : -1}
                >
                  <img src={g.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* ── the stage ── */}
          <div className="runway-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {GALLERY.map((g, i) => (
              <a
                key={g.src}
                href={g.src}
                data-fancybox="project-gallery"
                data-caption={g.alt}
                className={`runway-slide${i === active ? ' on' : ''}`}
                aria-hidden={i !== active}
                tabIndex={i === active ? 0 : -1}
              >
                <img src={g.src} alt={g.alt} />
              </a>
            ))}

            <span className="runway-caption">{GALLERY[active].alt}</span>

            <button className="runway-arrow runway-arrow--prev" onClick={() => step(-1)} aria-label="Previous image">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="runway-arrow runway-arrow--next" onClick={() => step(1)} aria-label="Next image">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <div className="runway-dots">
              {GALLERY.map((g, i) => (
                <button
                  key={g.src}
                  className={`runway-dot${i === active ? ' on' : ''}`}
                  onClick={() => goIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
