import { useEffect } from 'react'
import { Fancybox } from '@fancyapps/ui'

// Bento layout: one big feature (main) + a 2x2 cluster + a bottom row.
// Every cell is ~3:2, matching the renders so cropping stays minimal, and the
// whole set fits one screen. `area` maps each image to a grid-area.
const GALLERY = [
  { src: 'images/gallery-main.webp', alt: 'The Grand Entrance', area: 'main' },
  { src: 'images/gallery-entrance.webp', alt: 'Arrival Gateway', area: 'a' },
  { src: 'images/gallery-avenue.webp', alt: 'Tree-lined Avenue', area: 'b' },
  { src: 'images/gallery-open.webp', alt: 'Landscaped Open Spaces', area: 'c' },
  { src: 'images/gallery-basketball.webp', alt: 'Sports Court', area: 'd' },
  { src: 'images/gallery-park.webp', alt: "Children's Park", area: 'e' },
  { src: 'images/gallery-yoga.webp', alt: 'Yoga Deck', area: 'f' },
  { src: 'images/gallery-tabletennis.webp', alt: 'Pickleball Court', area: 'g' },
  { src: 'images/gallery-amphitheatre.webp', alt: 'Amphitheatre', area: 'h' },
]

export default function Gallery() {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", { Thumbs: { type: 'classic' } })
    return () => Fancybox.destroy()
  }, [])

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="jg-head">
          <span className="jg-eyebrow">Gallery</span>
          <h3>A world where your story takes shape.</h3>
        </div>

        <div className="gbento">
          {GALLERY.map((g) => (
            <a
              key={g.src}
              href={g.src}
              data-fancybox="gallery"
              data-caption={g.alt}
              className="gcell"
              style={{ gridArea: g.area }}
            >
              <img src={g.src} alt={g.alt} loading="lazy" />
              <span className="jg-cap">{g.alt}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
