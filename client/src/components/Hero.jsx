export default function Hero({ onEnquire }) {
  return (
    <section className="home-section hero-min" id="home">
      {/* branded entrance render — portrait crop on phones, landscape elsewhere */}
      <picture>
        <source media="(orientation: portrait)" srcSet="images/trivik-hero-gate-mobile.webp" />
        <img src="images/gallery-main.webp" alt="Trivik Courtyard entrance" className="hero-bg" />
      </picture>

      <button className="enquire-btn" onClick={onEnquire}>
        Enquire now
      </button>
    </section>
  )
}
