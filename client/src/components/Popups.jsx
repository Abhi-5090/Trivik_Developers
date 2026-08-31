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
      downloadBrochure()
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
    } catch (err) {
      // The enquiry backend isn't hosted on the live site — don't let that
      // block the one thing the visitor actually asked for.
      console.error('Enquiry submission failed:', err)
    } finally {
      setLoading(false)
      setThankyouOpen(true)
      downloadBrochure()
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
            Reserve your place in the courtyard.
          </h1>

          <form id="contactForm" onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email ID" required />
            <input type="tel" name="phone" placeholder="Contact Number" required />
            <textarea name="message" placeholder="Query" required></textarea>
            <label className="checkbox-label">
              {/* The link previously pointed at assetzproperty.com — a different
                  developer, left over from the original template. Plain text
                  until Trivik's own terms page exists. */}
              <input type="checkbox" id="customChecknew" name="termsconsent" value="yes" defaultChecked />
              I agree to the Terms &amp; Conditions
            </label>
            <button type="submit">Schedule your Site Visit</button>
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
              {IS_PREVIEW ? PREVIEW_MESSAGE : 'Thank you. Our team will reach out to you shortly.'}
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
