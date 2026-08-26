// The sanctioned "TRIVIK LAYOUT PLAN" drawing, with six pre-rendered
// highlight overlays (one per plot-size category, colour-matched by sampling
// the drawing's own legend). Hovering a legend row in MasterPlan dims the
// rest of the plan and lights up the matching plots.
const HIGHLIGHT_KEYS = ['odd', 's1', 's3', 's4', 's5', 'comm']

export default function LayoutPlan({ hoverKey }) {
  return (
    <div className="mplan-realplan">
      <img
        src="images/masterplan-layout.webp"
        alt="Trivik Courtyard sanctioned layout plan"
        className="mplan-real-base"
      />
      {HIGHLIGHT_KEYS.map((k) => (
        <img
          key={k}
          src={`images/masterplan-hl-${k}.webp`}
          alt=""
          aria-hidden="true"
          className={`mplan-real-hl${hoverKey === k ? ' on' : ''}`}
        />
      ))}
    </div>
  )
}
