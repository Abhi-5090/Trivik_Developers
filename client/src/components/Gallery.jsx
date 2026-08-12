import { useEffect } from 'react'
import Slider from 'react-slick'
import { Fancybox } from '@fancyapps/ui'
import { galleryImages } from '../data/contentData.js'

export default function Gallery() {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {})
    return () => Fancybox.destroy()
  }, [])

  // Carousel is only used on tablet/mobile (arrows needed there). On laptop+ the
  // bento grid shows every image at once, so no carousel/arrows.
  const mobileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
  }

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <h3>Gallery</h3>
        <p>A world where your story takes shape.</p>

        {/* Laptop+ : bento grid, no carousel */}
        <div className="gallery-slide desktop-visible">
          {galleryImages.map((g) => (
            <div className={g.div} key={g.div}>
              <a href={g.src} data-fancybox="gallery" className={g.imgCls}>
                <img src={g.src} alt={g.alt} style={g.style} />
              </a>
            </div>
          ))}
        </div>

        {/* Tablet / mobile : carousel with arrows */}
        <Slider {...mobileSettings} className="gallery-mobile-slider mobile-visible">
          {galleryImages.map((g) => (
            <div key={`m-${g.div}`}>
              <a href={g.src} data-fancybox="gallery">
                <img src={g.src} alt={g.alt} style={g.style} />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
