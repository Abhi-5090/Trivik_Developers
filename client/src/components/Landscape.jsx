// Three static road-section cards under a centred heading. No carousel.
// Note: the 18m card's file is still named 15metre-road.webp — a stale name
// from an earlier revision; the drawing itself is the 18m section.
// Widths per "Trivik Courtyard — The Master Narrative" (05 · Master Plan and
// 08 · Specifications): a 60 ft arterial avenue with 30 ft & 40 ft internal
// streets. Same roads as before, stated in the narrative's units (60 ft = 18 m,
// 40 ft = 12 m, 30 ft = 9 m).
const roads = [
  { title: '60 ft Arterial Avenue', tag: 'The grand arrival', img: 'images/15metre-road.webp' },
  { title: '40 ft Internal Street', tag: 'Tree-lined and paver-edged', img: 'images/12metre-road.webp' },
  { title: '30 ft Internal Street', tag: 'Quiet, unhurried lane', img: 'images/9metre-road.webp' },
]

export default function Landscape() {
  return (
    <section className="landscape-section" id="landscape">
      <div className="container">
        {/* branded avenue-plantation opener: heading above, caption on the image */}
        <div className="verdant-open-head">
          <h3>Landscape &amp; Avenue Plantation</h3>
        </div>
        <div className="verdant-banner">
          <img src="images/avenue-plantation.webp" alt="Trivik Courtyard tree-lined avenue" />
          <div className="verdant-banner-copy">
            <h4>A grand, tree-lined arrival.</h4>
            <p>Avenue plantation on both sides of every road — a canopy of green that welcomes you home.</p>
          </div>
        </div>

        <div className="verdant-head">
          <span className="verdant-eyebrow">Trivik Courtyard</span>
          <h3>Landscape &amp; Internal Roads</h3>
        </div>

        <div className="verdant-cards">
          {roads.map((r) => (
            <figure className="verdant-card" key={r.title}>
              <div className="verdant-card-media">
                <img src={r.img} alt={`${r.title} — road section`} loading="lazy" />
              </div>
              <figcaption>
                <h4>{r.title}</h4>
                <span>{r.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
