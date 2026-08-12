import { useEffect } from 'react'

// Faithful vanilla port of the original site's logic.js scroll/mouse effects.
export default function useSiteEffects() {
  useEffect(() => {
    /* ---- fade-up reveal on scroll ---- */
    const revealFadeUps = () => {
      const scrollTop = window.pageYOffset
      const windowHeight = window.innerHeight
      document.querySelectorAll('.fade-up').forEach((el) => {
        const top = el.getBoundingClientRect().top + scrollTop
        if (scrollTop + windowHeight - 100 > top) el.classList.add('show')
      })
    }

    /* ---- header shrink after 50px ---- */
    const header = document.getElementById('site-header')
    const headerScroll = () => {
      if (!header) return
      if (window.pageYOffset > 50) header.classList.add('scrolled')
      else header.classList.remove('scrolled')
    }

    /* ---- hero background parallax on mouse move ---- */
    const heroBg = document.querySelector('.hero-bg')
    const onMouseMove = (e) => {
      if (!heroBg) return
      const x = (e.pageX / window.innerWidth - 0.5) * 20
      const y = (e.pageY / window.innerHeight - 0.5) * 20
      heroBg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`
    }

    /* ---- hero text freeze / release on scroll ---- */
    const heroText = document.querySelector('.hero-content')
    const heroSection = document.querySelector('.home-section')
    let releaseTop = null
    const handleHeroTextScroll = () => {
      if (!heroText || !heroSection) return
      const rect = heroSection.getBoundingClientRect()
      const sectionHeight = heroSection.offsetHeight

      if (rect.top > 0) {
        heroText.classList.remove('fixed-hero-text', 'unfixed-hero-text')
        heroText.style.top = ''
        heroText.style.width = ''
        heroText.style.left = ''
        releaseTop = null
        return
      }
      const scrolledInside = Math.abs(rect.top)
      const isMobile = window.innerWidth <= 768
      const freezeDistance = sectionHeight * (isMobile ? 0.4 : 0.45)

      if (scrolledInside < freezeDistance) {
        heroText.classList.add('fixed-hero-text')
        heroText.classList.remove('unfixed-hero-text')
        heroText.style.top = ''
        releaseTop = null
      } else {
        if (!releaseTop) {
          const textRect = heroText.getBoundingClientRect()
          releaseTop = textRect.top + window.scrollY
          heroText.style.width = `${textRect.width}px`
          heroText.style.left = `${textRect.left}px`
        }
        heroText.classList.remove('fixed-hero-text')
        heroText.classList.add('unfixed-hero-text')
        heroText.style.top = `${releaseTop}px`
      }
    }
    const onHeroScroll = () => requestAnimationFrame(handleHeroTextScroll)
    const onResize = () => {
      // clear any stale pixel width/left captured during a previous release
      if (heroText) {
        heroText.style.width = ''
        heroText.style.left = ''
      }
      releaseTop = null
      handleHeroTextScroll()
    }

    /* ---- progress ring + scroll-to-top ---- */
    const progressPath = document.querySelector('.progress-wrap path')
    const progressWrap = document.querySelector('.progress-wrap')
    let pathLength = 0
    if (progressPath) {
      pathLength = progressPath.getTotalLength()
      progressPath.style.transition = 'none'
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`
      progressPath.style.strokeDashoffset = pathLength
      progressPath.getBoundingClientRect()
      progressPath.style.transition = 'stroke-dashoffset 10ms linear'
    }
    const updateProgress = () => {
      if (!progressPath) return
      const scroll = window.pageYOffset
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = pathLength - (scroll * pathLength) / height
      progressPath.style.strokeDashoffset = progress
      if (progressWrap) {
        if (scroll > 50) progressWrap.classList.add('active-progress')
        else progressWrap.classList.remove('active-progress')
      }
    }
    const onProgressClick = (e) => {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    /* ---- combined scroll handler ---- */
    const onScroll = () => {
      revealFadeUps()
      headerScroll()
      onHeroScroll()
      updateProgress()
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    document.addEventListener('mousemove', onMouseMove)
    if (progressWrap) progressWrap.addEventListener('click', onProgressClick)

    // initial run
    revealFadeUps()
    headerScroll()
    updateProgress()
    handleHeroTextScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('mousemove', onMouseMove)
      if (progressWrap) progressWrap.removeEventListener('click', onProgressClick)
    }
  }, [])
}
