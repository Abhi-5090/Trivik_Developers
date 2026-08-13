import { useState } from 'react'
import { submitEnquiry } from '../api.js'
import { IS_PREVIEW, PREVIEW_MESSAGE } from '../config.js'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const fd = new FormData(form)
    if (IS_PREVIEW) {
      form.reset()
      setStatus('preview')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await submitEnquiry({
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('contact'),
        message: fd.get('query'),
        source: 'contact-section',
      })
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-text fade-up">
          <h3>Contact us</h3>
          <p>This is where your journey to elevated living begins.</p>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email ID" required />
          <input type="text" name="contact" placeholder="Contact Number" required />
          <input type="text" name="query" placeholder="Query" />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Schedule your Site Visit'}
          </button>
        </form>

        {status === 'sent' && (
          <p style={{ marginTop: '1rem', color: '#2a2a2a' }}>
            Thank you for contacting us! We will get in touch with you shortly.
          </p>
        )}
        {status === 'preview' && (
          <p style={{ marginTop: '1rem', color: '#45241B' }}>{PREVIEW_MESSAGE}</p>
        )}
        {status === 'error' && (
          <p style={{ marginTop: '1rem', color: '#b00' }}>{error}</p>
        )}
      </div>
    </section>
  )
}
