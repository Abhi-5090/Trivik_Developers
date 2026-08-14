const FACTS = [
  { v: '23.5', l: 'Acres' },
  { v: '306', l: 'Plots' },
  { v: 'STRR', l: 'Road' },
]

export default function Hero({ onEnquire }) {
  return (
    <section className="home-section hero-min" id="home">
      {/* branded entrance render — portrait crop on phones, landscape elsewhere */}
      <picture>
        <source media="(orientation: portrait)" srcSet="images/trivik-hero-gate-mobile.webp" />
        <img src="images/trivik-hero-gate.webp" alt="Trivik Courtyard entrance" className="hero-bg" />
      </picture>

      <button className="enquire-btn" onClick={onEnquire}>
        Enquire now
      </button>

      {/* stats sit as a footer bar along the base of the hero render */}
      <div className="hero-stats">
        {FACTS.map((f) => (
          <div className="hero-stat" key={f.l}>
            <b>{f.v}</b>
            <span>{f.l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
