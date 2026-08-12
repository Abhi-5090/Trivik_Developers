import { useState } from 'react'

// Original: hidden by default (display:none) until enabled; play swaps thumbnail for a YouTube embed.
export default function Walkthrough() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="walkthrough-section" id="walkthrough" style={{ display: 'none' }}>
      <div className="container">
        <h3>Walkthrough</h3>
      </div>
      <div className="walkthrough-video" id="videoContainer">
        {playing ? (
          <iframe
            width="100%"
            height="600"
            src="https://www.youtube.com/embed/o072QrxuE14?autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Walkthrough"
          />
        ) : (
          <>
            <img src="images/walkthrough-image.webp" alt="Walkthrough" />
            <div className="play-button" onClick={() => setPlaying(true)}>
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)" />
                <polygon points="25,18 50,32 25,46" fill="#fff" />
              </svg>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
