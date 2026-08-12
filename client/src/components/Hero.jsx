// Small stroke icons for the hero stats bar
const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 13.5 3 12l1-2 6.5 1 4-5.5c.6-.8 1.5-1.2 2.3-1 .8.2 1 1.1.5 1.9L14 12l.8 6.5-1.6.8-2.4-5.3L6.5 15 6 18l-1.5.5L4 15Z" />
  </svg>
)
const CapIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9l10-4 10 4-10 4L2 9Z" />
    <path d="M6 11v4c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-4" />
    <path d="M22 9v5" />
  </svg>
)
const HospitalIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M12 8v8M8 12h8" />
  </svg>
)
const RoadIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3 5 21M16 3l3 18M12 4v2M12 10v2M12 16v2" />
  </svg>
)

const STATS = [
  { icon: <PlaneIcon />, value: '30', unit: 'Mins', label: 'Airport' },
  { icon: <CapIcon />, value: '2', unit: 'Mins', label: 'Schools' },
  { icon: <HospitalIcon />, value: '7', unit: 'Mins', label: 'Hospitals' },
  { icon: <RoadIcon />, value: '10', unit: 'Mins', label: 'From Highway' },
]

export default function Hero({ onEnquire, onExperience }) {
  const scrollTo = (id) => () => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="home-section" id="home">
      {/* Brand-neutral forest-villa render (old signage removed) */}
      <img src="images/trivik-hero.webp" alt="Trivik Courtyard" className="hero-bg" />

      {/* vertical scroll-down rail */}
      <div className="hero-scroll" onClick={scrollTo('intro')} role="button" tabIndex={0}>
        <span className="hero-scroll-text">SCROLL DOWN</span>
        <span className="hero-scroll-line" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Premium Plotted Development</p>
        <h1 className="hero-title">
          <span>Trivik</span>
          <span className="accent">Courtyard</span>
        </h1>
        <p className="hero-tagline">A life of your own design.</p>
        <p className="hero-desc">
          A ~23.5-acre premium plotted development in North Bengaluru’s Devanahalli corridor. Expansive plots
          and generous open spaces amidst verdant serenity — future-ready infrastructure and seamless
          connectivity.
        </p>
        <div className="hero-actions">
          <button className="hero-btn hero-btn--primary" onClick={onEnquire}>
            Pre-book Now
            <span aria-hidden="true">→</span>
          </button>
          <button className="hero-btn hero-btn--ghost" onClick={onEnquire}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
            </svg>
            Download Brochure
          </button>
        </div>
      </div>

      {/* experience the view */}
      <button className="hero-pulse" onClick={onExperience} aria-label="Experience the view">
        <span className="hero-pulse-play">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7L8 5Z" />
          </svg>
        </span>
        <span className="hero-pulse-text">
          Trivik Courtyard
          <em>Experience the View</em>
        </span>
      </button>

      {/* proximity stats bar */}
      <div className="hero-stats">
        {STATS.map((s) => (
          <div className="hero-stat" key={s.label}>
            <span className="hero-stat-icon">{s.icon}</span>
            <span className="hero-stat-body">
              <span className="hero-stat-top">
                <b>{s.value}</b> {s.unit}
              </span>
              <span className="hero-stat-label">{s.label}</span>
            </span>
          </div>
        ))}
      </div>

      <button className="enquire-btn" onClick={onEnquire}>
        Enquire now
      </button>
    </section>
  )
}
