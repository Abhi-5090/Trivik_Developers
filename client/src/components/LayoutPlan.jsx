import { useCallback, useEffect, useRef, useState } from 'react'
import { PLAN_CATEGORIES, PLAN_CATEGORY_BY_INDEX } from '../data/masterPlanCategories.js'

// Natural pixel size of masterplan-layout.webp / masterplan-hitmap.png / the
// masterplan-hl-*.webp overlays — all generated together, so they share
// this exact resolution.
const NATURAL_W = 1800
const NATURAL_H = 958

const CAT_BY_KEY = Object.fromEntries(PLAN_CATEGORIES.map((c) => [c.key, c]))

// The sanctioned "TRIVIK LAYOUT PLAN" drawing. A hidden canvas loads
// masterplan-hitmap.png (each plot category flat-filled with a unique index
// in its R channel) so mousemove can sample one pixel and know exactly which
// plot category sits under the cursor — no manual hotspot coordinates.
export default function LayoutPlan() {
  const wrapRef = useRef(null)
  const ctxRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [hover, setHover] = useState(null) // { key, x, y }

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = NATURAL_W
    canvas.height = NATURAL_H
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const img = new Image()
    img.src = 'images/masterplan-hitmap.png'
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      ctxRef.current = ctx
      setReady(true)
    }
  }, [])

  const handleMove = useCallback((e) => {
    if (!ready || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const elAR = rect.width / rect.height
    const natAR = NATURAL_W / NATURAL_H

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

    const nx = Math.min(NATURAL_W - 1, Math.floor((px / dispW) * NATURAL_W))
    const ny = Math.min(NATURAL_H - 1, Math.floor((py / dispH) * NATURAL_H))
    const [r, , , a] = ctxRef.current.getImageData(nx, ny, 1, 1).data
    const key = a ? PLAN_CATEGORY_BY_INDEX[r] : null
    if (!key) {
      setHover(null)
      return
    }
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setHover({ key, x, y, flip: x > rect.width * 0.6 })
  }, [ready])

  const handleLeave = () => setHover(null)

  return (
    <div className="mplan-realplan" ref={wrapRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <img
        src="images/masterplan-layout.webp"
        alt="Trivik Courtyard sanctioned layout plan"
        className="mplan-real-base"
      />
      {PLAN_CATEGORIES.map((c) => (
        <img
          key={c.key}
          src={`images/masterplan-hl-${c.key}.webp`}
          alt=""
          aria-hidden="true"
          className={`mplan-real-hl${hover?.key === c.key ? ' on' : ''}`}
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
