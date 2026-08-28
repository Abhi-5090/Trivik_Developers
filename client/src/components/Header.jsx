import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '#location', label: 'Location' },
  { href: '#experience', label: 'Experience' },
  { href: '#master_plan', label: 'Master Plan' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#clubhouse', label: 'Clubhouse' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#landscape', label: 'Landscape' },
  { href: '#specifications', label: 'Specifications' },
  { href: '#contact', label: 'Contact Us' },
]

export default function Header({ onBrochure }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  // close the dropdown on any click outside it (including the toggle button
  // itself, which handles its own open/close via onClick)
  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (menuRef.current?.contains(e.target)) return
      if (toggleRef.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [open])

  return (
    <>
      <header id="site-header">
        <div className="container">
          {/* href="#home" rather than "/" — the live site is served under a
              sub-path, where "/" would leave the site entirely */}
          <a href="#home" className="site-logo">
            <img src="images/trivik-logo-white.png" alt="Trivik Developers" />
          </a>

          <div className="header-actions">
            <button className="brochure-btn" onClick={onBrochure}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
              </svg>
              <span>Brochure</span>
            </button>

            <button
              ref={toggleRef}
              className={`menu-toggle${open ? ' active' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <nav ref={menuRef} className={`mobile-menu${open ? ' open' : ''}`}>
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
