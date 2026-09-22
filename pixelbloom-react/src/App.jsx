import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MarqueeBand from './components/MarqueeBand'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import About from './components/About'
import Testimonials from './components/Testimonials'
import CtaBand from './components/CtaBand'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'

import { getSiteSettings, getServices, getPortfolioItems, getTestimonials } from './lib/sanity'
import * as localData from './data'

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [cms, setCms] = useState(null)

  useEffect(() => {
    const isSanityConfigured = !import.meta.env.VITE_SANITY_PROJECT_ID?.includes('YOUR_PROJECT')
      && import.meta.env.VITE_SANITY_PROJECT_ID

    if (!isSanityConfigured) return // use local data/index.js

    Promise.all([
      getSiteSettings(),
      getServices(),
      getPortfolioItems(),
      getTestimonials(),
    ]).then(([settings, services, portfolio, testimonials]) => {
      if (settings && services?.length) {
        setCms({ settings, services, portfolio, testimonials })
      }
    }).catch(() => {
      // silently fall back to local data on error
    })
  }, [])

  // Pass cms data down  components use it if available, else use local data
  const data = cms ?? null

  return (
    <>
      <Nav />
      <main>
        <Hero cmsSettings={data?.settings} />
        <MarqueeBand />
        <Services cmsServices={data?.services} />
        <Work onLightbox={setLightboxSrc} cmsPortfolio={data?.portfolio} />
        <Process />
        <About />
        <Testimonials cmsTestimonials={data?.testimonials} />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </>
  )
}
