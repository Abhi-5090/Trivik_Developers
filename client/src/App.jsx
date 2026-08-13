import { useRef, useState } from 'react'
import useSiteEffects from './hooks/useSiteEffects.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import Location from './components/Location.jsx'
import VideoSection from './components/VideoSection.jsx'
import Gallery from './components/Gallery.jsx'
import Experience from './components/Experience.jsx'
// import MasterPlan from './components/MasterPlan.jsx' — temporarily hidden per client request
import Clubhouse from './components/Clubhouse.jsx'
import Amenities from './components/Amenities.jsx'
import Landscape from './components/Landscape.jsx'
import Specifications from './components/Specifications.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Popups from './components/Popups.jsx'
import ProgressRing from './components/ProgressRing.jsx'

export default function App() {
  useSiteEffects()
  const [popupOpen, setPopupOpen] = useState(false)
  const [thankyouOpen, setThankyouOpen] = useState(false)
  const videoRef = useRef(null)

  const openPopup = () => setPopupOpen(true)
  const handleExperience = () => videoRef.current?.playFromHero()

  return (
    <>
      <Header />
      <main>
        <Hero onEnquire={openPopup} onExperience={handleExperience} />
        <Intro />
        <Location />
        <VideoSection ref={videoRef} />
        <Gallery />
        <Experience />
        {/* <MasterPlan />  — temporarily hidden per client request */}
        <Clubhouse />
        <Amenities />
        <Landscape />
        <Specifications />
        <Contact />
        <Popups
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
          thankyouOpen={thankyouOpen}
          setThankyouOpen={setThankyouOpen}
        />
      </main>
      <Footer onBrochure={openPopup} />
      <ProgressRing />
    </>
  )
}
