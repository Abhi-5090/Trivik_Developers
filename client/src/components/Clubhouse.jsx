const STATS = [
  { v: '~20,000', u: 'sq. ft.', l: 'Clubhouse' },
  { v: '2', u: 'levels', l: 'Ground + First' },
  { v: '40+', u: 'curated', l: 'Amenities' },
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
              An exquisite ~20,000 sq. ft. structure that rises as a grounded, earth‑toned presence —
              anchoring Trivik Courtyard with quiet confidence.
            </p>
            <p>
              Social lounges, wellness nooks and curated leisure zones woven into green alcoves invite
              residents to pause, connect and unwind. Here, every gathering feels like a homecoming.
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
