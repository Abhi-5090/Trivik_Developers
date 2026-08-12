import { useState } from 'react'

const navLinks = [
  { href: '#location', label: 'Location' },
  { href: '#experience', label: 'Experience' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#landscape', label: 'Landscape' },
  { href: '#specifications', label: 'Specifications' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact Us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header id="site-header">
        <div className="container">
          <a href="/" className="site-logo">
            <img src="images/trivik-logo-white.png" alt="Trivik Courtyard" />
          </a>
          <button
            className={`menu-toggle${open ? ' active' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <nav className={`mobile-menu${open ? ' open' : ''}`}>
        <ul>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
