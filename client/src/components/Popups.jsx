import { useState } from 'react'
import { submitEnquiry, downloadBrochure } from '../api.js'
import { IS_PREVIEW, PREVIEW_MESSAGE } from '../config.js'

export default function Popups({ popupOpen, setPopupOpen, thankyouOpen, setThankyouOpen }) {
  const [loading, setLoading] = useState(false)

  const closePopup = () => setPopupOpen(false)

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) setPopupOpen(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const fd = new FormData(form)
    if (IS_PREVIEW) {
      form.reset()
      setPopupOpen(false)
      setThankyouOpen(true)
      return
    }
    setPopupOpen(false)
    setLoading(true)
    try {
      await submitEnquiry({
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        message: fd.get('message'),
        termsconsent: fd.get('termsconsent') || 'no',
        source: 'enquire-popup',
      })
      form.reset()
      setLoading(false)
      setThankyouOpen(true)
      downloadBrochure()
    } catch (err) {
      setLoading(false)
      alert('Submission failed: ' + (err.message || 'Validation error'))
    }
  }

  return (
    <>
      {/* Enquire / Brochure popup */}
      <div className={`popup-overlay${popupOpen ? ' show' : ''}`} id="popup" onClick={onOverlayClick}>
        <div className="popup-form">
          <span className="close-btn" id="closePopup" onClick={closePopup}>
            &times;
          </span>
          <h1 id="popup-title" className="popup-title">
            Contact
          </h1>

          <form id="contactForm" onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email ID" required />
            <input type="tel" name="phone" placeholder="Contact Number" required />
            <textarea name="message" placeholder="Query" required></textarea>
            <label className="checkbox-label">
              <input type="checkbox" id="customChecknew" name="termsconsent" value="yes" defaultChecked />
              I Agree to the{' '}
              <a
                href="https://www.assetzproperty.com/termsconditions"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'underline', color: '#000' }}
              >
                Terms &amp; Conditions
              </a>
            </label>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      {/* Thank you popup */}
      <div className={`popup-overlay${thankyouOpen ? ' show' : ''}`} id="Thankyou">
        <div className="popup-form">
          <span className="close-btn" id="closePopup2" onClick={() => setThankyouOpen(false)}>
            &times;
          </span>
          <div id="popup-message" style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#2a2a2a', fontWeight: 'bold', marginTop: '1rem' }}>THANK YOU!</h2>
            <p style={{ marginTop: '0.5rem' }}>
              {IS_PREVIEW ? PREVIEW_MESSAGE : 'Thank you for contacting us! We will get in touch with you shortly.'}
            </p>
          </div>
        </div>
      </div>

      {/* Loader */}
      <div
        id="form-loader"
        style={{
          display: loading ? 'flex' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.7)',
          zIndex: 9999,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="spinner"></div>
      </div>
    </>
  )
}
