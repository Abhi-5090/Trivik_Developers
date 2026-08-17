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
function Lightbox({ items, index, setIndex, getRect, onClose }) {
  const imgRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const opened = useRef(false)
  const busy = useRef(false)
  const item = items[index]

  // FLIP between the overlay image and a tile's rect
  const flip = useCallback((rect, toThumb) => {
    const el = imgRef.current
    if (!el || !rect) return
    el.style.transition = 'none'
    el.style.transform = 'none'
    const F = el.getBoundingClientRect()
    const dx = rect.left + rect.width / 2 - (F.left + F.width / 2)
    const dy = rect.top + rect.height / 2 - (F.top + F.height / 2)
    const s = Math.max(rect.width / F.width, 0.05)
    const thumb = `translate(${dx}px, ${dy}px) scale(${s})`

    if (toThumb) {
      el.style.transform = 'none'
      el.getBoundingClientRect()
      requestAnimationFrame(() => {
        el.style.transition = `transform ${CLOSE_MS}ms cubic-bezier(.4,0,.6,1), opacity ${CLOSE_MS}ms ease`
        el.style.transform = thumb
        el.style.opacity = '0'
      })
      return
    }
    el.style.transform = thumb
    el.style.opacity = '0.55'
    el.getBoundingClientRect()
    requestAnimationFrame(() => {
      el.style.transition = `transform ${OPEN_MS}ms cubic-bezier(.2,.8,.25,1), opacity ${Math.round(OPEN_MS * 0.55)}ms ease`
      el.style.transform = 'none'
      el.style.opacity = '1'
    })
  }, [])

  // grow out of the tile — once, on open
  useLayoutEffect(() => {
    if (opened.current) return
    opened.current = true
    flip(getRect(index), false)
  }, [flip, getRect, index])

  // arrows slide the next image through in place; no FLIP while browsing
  const navigate = useCallback((dir) => {
    const el = imgRef.current
    if (!el || busy.current || items.length < 2) return
    busy.current = true
    el.style.transition = 'transform .17s ease, opacity .17s ease'
    el.style.transform = `translateX(${dir * -26}px)`
    el.style.opacity = '0'
    setTimeout(() => {
      setIndex((i) => (i + dir + items.length) % items.length)
      requestAnimationFrame(() => {
        el.style.transition = 'none'
        el.style.transform = `translateX(${dir * 26}px)`
        el.getBoundingClientRect()
        requestAnimationFrame(() => {
          el.style.transition = 'transform .3s cubic-bezier(.2,.8,.25,1), opacity .3s ease'
          el.style.transform = 'none'
          el.style.opacity = '1'
          busy.current = false
        })
      })
    }, 170)
  }, [items.length, setIndex])

  const close = useCallback(() => {
    if (closing) return
    setClosing(true)
    flip(getRect(index), true)          // shrink back into whichever tile is showing
    setTimeout(onClose, CLOSE_MS)
  }, [closing, flip, getRect, index, onClose])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') { e.preventDefault(); navigate(-1) }
      if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1) }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [close, navigate])

  return createPortal(
    <div
      className={`amen-lb${closing ? ' is-closing' : ''}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <img
        ref={imgRef}
        src={`images/${item.n}.webp`}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="amen-lb-nav amen-lb-nav--prev"
        onClick={(e) => { e.stopPropagation(); navigate(-1) }}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        className="amen-lb-nav amen-lb-nav--next"
        onClick={(e) => { e.stopPropagation(); navigate(1) }}
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <span className="amen-lb-cap">
        {item.alt}
        <em>{index + 1} / {items.length}</em>
      </span>

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
  const [lbIndex, setLbIndex] = useState(null)
  const a = TABS.find((t) => t.key === tab)

  // measured live, so closing lands on whichever tile is currently showing
  const getRect = useCallback((i) => {
    const el = document.querySelectorAll('.amen-mosaic.on .amen-fig img')[i]
    return el ? el.getBoundingClientRect() : null
  }, [])

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
                      onClick={() => setLbIndex(i)}
                      tabIndex={tab === t.key ? 0 : -1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setLbIndex(i)
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

      {lbIndex !== null && (
        <Lightbox
          items={a.imgs}
          index={lbIndex}
          setIndex={setLbIndex}
          getRect={getRect}
          onClose={() => setLbIndex(null)}
        />
      )}
    </section>
  )
}
