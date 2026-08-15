import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { clubhouseItems, outdoorItems } from '../data/contentData.js'

const TABS = [
  {
    key: 'clubhouse',
    label: 'Clubhouse',
    count: 12,
    items: clubhouseItems,
    cols: 2,
    imgs: [
      { n: 'club-gym', alt: 'Gymnasium' },
      { n: 'club-cafeteria', alt: 'Café' },
      { n: 'club-sports', alt: 'Games Room' },
      { n: 'club-partyhall', alt: 'Party Hall' },
      { n: 'club-meeting', alt: 'Lounge' },
      { n: 'club-library', alt: 'Entrance Lobby' },
    ],
  },
  {
    key: 'outdoor',
    label: 'Outdoor',
    count: 13,
    items: outdoorItems,
    cols: 2,
    imgs: [
      { n: 'lux-yoga', alt: 'Yoga Deck' },
      { n: 'lux-varenda', alt: 'Landscaped Gardens' },
      { n: 'lux-basketball', alt: 'Basketball Half Court' },
      { n: 'lux-openarea', alt: 'Open Lawns' },
      { n: 'lux-tabletennis', alt: 'Pickleball Court' },
      { n: 'lux-amphi', alt: 'Amphitheatre' },
    ],
  },
]

const OPEN_MS = 520
const CLOSE_MS = 380

// Zooms the clicked tile up to full size using FLIP: the overlay image is first
// transformed back onto the thumbnail's exact rect, then released to its natural
// centred size, so it appears to grow out of the tile it came from.
function Lightbox({ shot, onClose }) {
  const imgRef = useRef(null)
  const [closing, setClosing] = useState(false)

  const animate = useCallback((toThumb) => {
    const el = imgRef.current
    if (!el) return
    // clear any transform first: if this runs twice (StrictMode) the element is
    // already scaled down, and measuring it in that state yields I/F ~= 1, so
    // nothing appears to animate
    el.style.transition = 'none'
    el.style.transform = 'none'
    const F = el.getBoundingClientRect()
    const I = shot.rect
    const dx = I.left + I.width / 2 - (F.left + F.width / 2)
    const dy = I.top + I.height / 2 - (F.top + F.height / 2)
    const s = Math.max(I.width / F.width, 0.05)
    const thumb = `translate(${dx}px, ${dy}px) scale(${s})`

    if (toThumb) {
      el.style.transition = `transform ${CLOSE_MS}ms cubic-bezier(.4,0,.6,1), opacity ${CLOSE_MS}ms ease`
      el.style.transform = thumb
      el.style.opacity = '0'
      return
    }
    el.style.transition = 'none'
    el.style.transform = thumb
    el.style.opacity = '0.55'
    el.getBoundingClientRect()          // flush, so the release actually animates
    requestAnimationFrame(() => {
      el.style.transition = `transform ${OPEN_MS}ms cubic-bezier(.2,.8,.25,1), opacity ${Math.round(OPEN_MS * 0.55)}ms ease`
      el.style.transform = 'none'
      el.style.opacity = '1'
    })
  }, [shot])

  useLayoutEffect(() => { animate(false) }, [animate])

  const close = useCallback(() => {
    if (closing) return
    setClosing(true)
    animate(true)
    setTimeout(onClose, CLOSE_MS)
  }, [closing, animate, onClose])

  // esc to dismiss, and hold the page still while open
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [close])

  return createPortal(
    <div
      className={`amen-lb${closing ? ' is-closing' : ''}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
    >
      <img ref={imgRef} src={shot.src} alt={shot.alt} onClick={(e) => e.stopPropagation()} />
      <span className="amen-lb-cap">{shot.alt}</span>
      <button className="amen-lb-close" onClick={close} aria-label="Close">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>,
    document.body
  )
}

export default function Amenities() {
  const [tab, setTab] = useState('clubhouse')
  const [shot, setShot] = useState(null)
  const a = TABS.find((t) => t.key === tab)

  const open = (e, src, alt) => {
    setShot({ src, alt, rect: e.currentTarget.getBoundingClientRect() })
  }

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
                {t.imgs.map((g, i) => (
                  <figure className={`amen-fig m${i + 1}`} key={g.n}>
                    <img
                      src={`images/${g.n}.webp`}
                      alt={g.alt}
                      onClick={(e) => open(e, `images/${g.n}.webp`, g.alt)}
                      tabIndex={tab === t.key ? 0 : -1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          open(e, `images/${g.n}.webp`, g.alt)
                        }
                      }}
                    />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {shot && <Lightbox shot={shot} onClose={() => setShot(null)} />}
    </section>
  )
}
