const FACTS = [
  { v: '23', l: 'Acres' },
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

      {/* brand lockup: big logo + minimal stats */}
      <div className="hero-lockup">
        <img src="images/trivik-logo-white.png" alt="Trivik Developers" className="hero-logo-big" />
        <div className="hero-facts">
          {FACTS.map((f) => (
            <div className="hero-fact" key={f.l}>
              <b>{f.v}</b>
              <span>{f.l}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="enquire-btn" onClick={onEnquire}>
        Enquire now
      </button>
    </section>
  )
}
