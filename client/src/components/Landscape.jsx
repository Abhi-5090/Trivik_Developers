// Three static road-section cards under a centred heading. No carousel.
// Note: the 18m card's file is still named 15metre-road.webp — a stale name
// from an earlier revision; the drawing itself is the 18m section.
const roads = [
  { title: '18 Metre Roads', tag: 'Arterial avenue', img: 'images/15metre-road.webp' },
  { title: '12 Metre Roads', tag: 'Connector street', img: 'images/12metre-road.webp' },
  { title: '9 Metre Roads', tag: 'Quiet internal lane', img: 'images/9metre-road.webp' },
]

export default function Landscape() {
  return (
    <section className="landscape-section" id="landscape">
      <div className="container">
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
