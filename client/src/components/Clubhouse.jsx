// Figures per "Trivik Courtyard — The Master Narrative" (02 · Overview,
// 06 · The Clubhouse): 14,000 sq.ft, 25+ curated amenities, 12 facilities.
const STATS = [
  { v: '14,000', u: 'sq. ft.', l: 'Clubhouse' },
  { v: '25+', u: 'curated', l: 'Amenities' },
  { v: '12', u: 'facilities', l: 'Within the club' },
]

export default function Clubhouse() {
  return (
    <section className="clubhouse-section club2" id="clubhouse">
      <div className="container">
        <div className="club2-showcase">
          <div className="club2-intro">
            <span className="club2-eyebrow">The Clubhouse</span>
            <h3>The soul of the community.</h3>
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
            <div className="club2-stats">
              {STATS.map((s) => (
                <div className="club2-stat" key={s.l}>
                  <b>
                    {s.v} <span>{s.u}</span>
                  </b>
                  <em>{s.l}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="club2-gallery">
            <figure className="club2-shot">
              <img src="images/clubhouse-wide.webp" alt="Trivik Courtyard clubhouse" />
              <figcaption>Clubhouse &amp; Pool Deck</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
