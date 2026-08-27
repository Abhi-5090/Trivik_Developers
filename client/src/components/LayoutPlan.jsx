import { useCallback, useEffect, useRef, useState } from 'react'
import { PLAN_CATEGORIES, PLAN_CATEGORY_BY_INDEX } from '../data/masterPlanCategories.js'

// Natural pixel size of the desktop (landscape, rotated) assets vs. the
// mobile (portrait, unrotated) assets — both sets share these dimensions
// with their own masterplan-hitmap / masterplan-hl-*.webp files.
const DESKTOP_SIZE = { w: 1800, h: 958 }
const MOBILE_SIZE = { w: 958, h: 1800 }
const MOBILE_QUERY = '(max-width: 900px)'

const CAT_BY_KEY = Object.fromEntries(PLAN_CATEGORIES.map((c) => [c.key, c]))

function useIsMobilePlan() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

// The sanctioned "TRIVIK LAYOUT PLAN" drawing. A hidden canvas loads the
// matching masterplan-hitmap image (each plot category flat-filled with a
// unique index in its R channel) so a pointer position can sample one pixel
// and know exactly which plot category sits there — no manual hotspots.
// Desktop hovers with the mouse; touch devices tap to select instead, since
// there's no hover — the same hit-test just runs from a click/tap event too.
export default function LayoutPlan({ legendKey = null, onHoverKeyChange }) {
  const isMobile = useIsMobilePlan()
  const size = isMobile ? MOBILE_SIZE : DESKTOP_SIZE
  const suffix = isMobile ? '-mobile' : ''

  const wrapRef = useRef(null)
  const ctxRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [hover, setHover] = useState(null) // { key, x, y, flip }

  useEffect(() => {
    setReady(false)
    setHover(null)
    const canvas = document.createElement('canvas')
    canvas.width = size.w
    canvas.height = size.h
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const img = new Image()
    img.src = `images/masterplan-hitmap${suffix}.png`
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      ctxRef.current = ctx
      setReady(true)
    }
  }, [suffix, size.w, size.h])

  const handlePoint = useCallback((e) => {
    if (!ready || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const elAR = rect.width / rect.height
    const natAR = size.w / size.h

    // the image sits inside this box via object-fit: contain — work out the
    // actual displayed rect (letterboxed left/right or top/bottom)
    let dispW, dispH, offX, offY
    if (elAR > natAR) {
      dispH = rect.height
      dispW = dispH * natAR
      offX = (rect.width - dispW) / 2
      offY = 0
    } else {
      dispW = rect.width
      dispH = dispW / natAR
      offX = 0
      offY = (rect.height - dispH) / 2
    }

    const px = e.clientX - rect.left - offX
    const py = e.clientY - rect.top - offY
    if (px < 0 || py < 0 || px > dispW || py > dispH) {
      setHover(null)
      return
    }

    const nx = Math.min(size.w - 1, Math.floor((px / dispW) * size.w))
    const ny = Math.min(size.h - 1, Math.floor((py / dispH) * size.h))
    const [r, , , a] = ctxRef.current.getImageData(nx, ny, 1, 1).data
    const key = a ? PLAN_CATEGORY_BY_INDEX[r] : null
    if (!key) {
      setHover(null)
      return
    }
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setHover({ key, x, y, flip: x > rect.width * 0.6 })
  }, [ready, size.w, size.h])

  const handleLeave = () => setHover(null)

  // report the pointer-hovered category up so the legend can glow too
  useEffect(() => {
    onHoverKeyChange?.(hover?.key ?? null)
  }, [hover?.key, onHoverKeyChange])

  // a legend row can drive the same highlight from outside — the pointer
  // hover still wins while it's active, since it also carries the tooltip
  const activeKey = hover?.key ?? legendKey

  return (
    <div
      className="mplan-realplan"
      ref={wrapRef}
      onMouseMove={handlePoint}
      onMouseLeave={handleLeave}
      onClick={handlePoint}
    >
      <img
        src={`images/masterplan-layout${suffix}.webp`}
        alt="Trivik Courtyard sanctioned layout plan"
        className="mplan-real-base"
      />
      {PLAN_CATEGORIES.map((c) => (
        <img
          key={c.key}
          src={`images/masterplan-hl-${c.key}${suffix}.webp`}
          alt=""
          aria-hidden="true"
          className={`mplan-real-hl${activeKey === c.key ? ' on' : ''}`}
        />
      ))}

      {hover && (
        <div
          className={`mplan-tip${hover.flip ? ' flip' : ''}`}
          style={{ left: hover.x, top: hover.y }}
        >
          <b>{CAT_BY_KEY[hover.key].label}</b>
          <em>{CAT_BY_KEY[hover.key].value} plots</em>
        </div>
      )}
    </div>
  )
}
