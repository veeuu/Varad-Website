import { useState } from 'react'
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

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState(null)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeBand />
        <Services />
        <Work onLightbox={setLightboxSrc} />
        <Process />
        <About />
        <Testimonials />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </>
  )
}
