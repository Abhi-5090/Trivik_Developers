// Figures per the official amenities schedule: 14,000 sq.ft clubhouse,
// 40+ amenities in all, 25+ of them within the clubhouse itself.
const STATS = [
  { v: '14,000', u: 'sq. ft.', l: 'Clubhouse' },
  { v: '40+', u: '', l: 'Amenities' },
  { v: '25+', u: '', l: 'Indoor Amenities' },
]

export default function Clubhouse() {
  return (
    <section className="clubhouse-section club2" id="clubhouse">
      {/* mobile-only heading — sits above the image like every other section;
          hidden on desktop, where the heading is overlaid on the render instead */}
      <div className="container">
        <div className="club2-head club2-head--mobile">
          <span className="club2-eyebrow">Club Aurum</span>
          <h3>The soul of the community.</h3>
        </div>
      </div>

      <div className="club2-frame">
        <picture>
          {/* portrait crop on phones — open sky up top leaves room for the copy
              without covering the entrance signage or the pool deck below */}
          <source media="(max-width: 900px)" srcSet="images/clubhouse-entry-mobile.webp" />
          <img src="images/clubhouse-entry.webp" alt="Trivik Courtyard clubhouse" className="club2-bg" />
        </picture>
        <span className="club2-scrim" aria-hidden="true" />

        <div className="club2-frame-inner container">
          <div className="club2-content">
            {/* desktop-only heading — overlaid on the image, hero-style */}
            <div className="club2-head club2-head--desktop">
              <span className="club2-eyebrow">Club Aurum</span>
              <h3>The soul of the community.</h3>
            </div>

            <div className="club2-copy">
              <p>
                Fourteen thousand square feet, built for one purpose: to turn a layout into a
                neighbourhood, and neighbours into the family next door.
              </p>
              <p>
                Mornings on the yoga deck while the pool catches the first light; afternoons over coffee at
                the café; evenings in the party hall — and on clear nights, the stargazing deck. It is
                quietly thoughtful, too: wheelchair-accessible throughout and lift-served, with a steam
                room and sauna for tired days and an infirmary for anxious ones.
              </p>
            </div>

            <div className="club2-stats">
              {STATS.map((s) => (
                <div className="club2-stat" key={s.l}>
                  <b>
                    {s.v} {s.u && <span>{s.u}</span>}
                  </b>
                  <em>{s.l}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
