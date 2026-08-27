const nav = [
  { href: '#home', label: 'Home' },
  { href: '#location', label: 'Location' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#landscape', label: 'Landscape' },
  { href: '#clubhouse', label: 'Clubhouse' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#specifications', label: 'Specifications' },
  { href: '#walkthrough', label: 'Walkthrough' },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/trivikdevelopers/',
    outline: true,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61590723986778',
    path: 'M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H7.5v3H10v8h3Z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@TrivikDevelopers',
    path: 'M23 12s0-3.3-.4-4.9c-.2-.8-.9-1.5-1.7-1.7C19.3 5 12 5 12 5s-7.3 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.7 1 12 1 12s0 3.3.4 4.9c.2.8.9 1.5 1.7 1.7C4.7 19 12 19 12 19s7.3 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.6.4-4.9.4-4.9ZM10 15V9l5 3-5 3Z',
  },
]

export default function Footer({ onBrochure }) {
  return (
    <footer className="footer2">
      <img src="images/trivik-logo-white.png" alt="" className="footer2-watermark" aria-hidden="true" />

      <div className="container">
        <div className="footer2-top">
          {/* brand */}
          <div className="footer2-brand">
            <a href="#home">
              <img src="images/trivik-logo-white.png" alt="Trivik Developers" className="footer2-logo" />
            </a>
            <p className="footer2-tag">
              306 Vaastu-compliant villa plots across 23 acres at Beerasandra, directly on the
              Satellite Town Ring Road, North Bengaluru.
            </p>
            <div className="footer2-actions">
              <button className="footer2-brochure" onClick={onBrochure}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
                </svg>
                Download Brochure
              </button>
              <div className="footer2-social">
                {socials.map((sn) => (
                  <a
                    key={sn.label}
                    href={sn.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={sn.label}
                    title={sn.label}
                  >
                    {sn.outline ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d={sn.path} />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* navigation */}
          <div className="footer2-col">
            <h6>Navigation</h6>
            <ul className="footer2-links">
              {nav.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="footer2-col footer2-contact">
            <h6>Get in touch</h6>
            <a href="tel:+910000000000" className="footer2-line">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              +91 00000 00000
            </a>
            <a href="mailto:enquiries@trivikdevelopers.com" className="footer2-line">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              enquiries@trivikdevelopers.com
            </a>
            <p className="footer2-addr">
              <b>Site</b>
              Trivik Courtyard, Beerasandra, on the Satellite Town Ring Road (STRR), Devanahalli Taluk,
              Bengaluru, Karnataka
            </p>
            <p className="footer2-addr">
              <b>Corporate</b>
              Trivik Developers LLP, Bengaluru, Karnataka
            </p>
          </div>
        </div>

        <div className="footer2-bottom">
          <p>© 2026 Trivik Developers LLP. All rights reserved.</p>
          <p className="footer2-disc">
            RERA No. to be updated · Images are for representation only.
          </p>
        </div>
      </div>
    </footer>
  )
}
