import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

// Video teaser placed right after the Location section. The hero "Experience the
// View" button calls playFromHero() (via a ref) to smooth-scroll here and play.
const VideoSection = forwardRef(function VideoSection(_props, ref) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)

  const startPlayback = () => {
    setStarted(true)
    const v = videoRef.current
    if (!v) return
    v.muted = false
    const p = v.play()
    if (p && p.catch) p.catch(() => { v.muted = true; v.play() })
  }

  useImperativeHandle(ref, () => ({
    playFromHero: () => {
      startPlayback()
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    },
  }))

  return (
    <section className="video-section" id="video" ref={sectionRef}>
      <div className="container">
        <div className="video-header">
          <h3>A glimpse of life at Trivik Courtyard.</h3>
          <p>
            Sunlit avenues, verdant open spaces and quiet corners to call your own — press play for a moment
            in the life that awaits.
          </p>
        </div>

        <div className={`video-frame${started ? ' is-playing' : ''}`}>
          <video
            ref={videoRef}
            className="video-el"
            poster="images/trivik-teaser-poster.jpg"
            preload="auto"
            playsInline
            controls={started}
            onEnded={() => setStarted(false)}
          >
            <source src="images/trivik-teaser.mp4" type="video/mp4" />
          </video>

          {!started && (
            <button className="video-play" onClick={startPlayback} aria-label="Play video">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7L8 5Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  )
})

export default VideoSection
