import { lazy, Suspense, useState, useEffect } from 'react'
import Nav           from './components/Nav'
import Hero          from './components/Hero'
import MarqueeBand   from './components/MarqueeBand'
import Services      from './components/Services'
import Work          from './components/Work'
import Process       from './components/Process'
import About         from './components/About'
import Testimonials  from './components/Testimonials'
import CtaBand       from './components/CtaBand'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import Lightbox      from './components/Lightbox'
import CustomCursor  from './components/CustomCursor'
import PageLoader    from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import WeddingFilms from './components/WeddingFilms'
import Pricing from './components/Pricing'
import CreatorSpace from './components/CreatorSpace'

import { getSiteSettings, getServices, getPortfolioItems, getTestimonials } from './lib/sanity'
import * as localData from './data'

const BrandCommercial = lazy(() => import('./components/BrandCommercial'))
const Vfx3D = lazy(() => import('./components/Vfx3D'))

export default function App() {
  const [lightboxSrc,  setLightboxSrc]  = useState(null)
  const [cms,          setCms]          = useState(null)
  const [loaderDone,   setLoaderDone]   = useState(false)
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  // Sanity CMS — optional
  useEffect(() => {
    const isSanityConfigured = !import.meta.env.VITE_SANITY_PROJECT_ID?.includes('YOUR_PROJECT')
      && import.meta.env.VITE_SANITY_PROJECT_ID
    if (!isSanityConfigured) return
    Promise.all([
      getSiteSettings(), getServices(), getPortfolioItems(), getTestimonials(),
    ]).then(([settings, services, portfolio, testimonials]) => {
      if (settings && services?.length) setCms({ settings, services, portfolio, testimonials })
    }).catch(() => {})
  }, [])

  const data = cms ?? null

  if (route === '#/wedding-films') {
    return <WeddingFilms onBack={() => { window.location.hash = '' }} />
  }

  if (route === '#/creator-space') {
    return <CreatorSpace onBack={() => { window.location.hash = '' }} />
  }

  if (route === '#/brand-commercial') {
    return (
      <Suspense fallback={<main className="brand-commercial-loading" aria-label="Loading Brand & Commercial page" />}>
        <BrandCommercial onBack={() => { window.location.hash = '' }} />
      </Suspense>
    )
  }

  if (route === '#/vfx-3d') {
    return (
      <Suspense fallback={<main className="brand-commercial-loading" aria-label="Loading VFX and 3D page" />}>
        <Vfx3D onBack={() => { window.location.hash = '' }} />
      </Suspense>
    )
  }

  if (route === '#/pricing') {
    return (
      <>
        <Pricing />
        <Footer />
      </>
    )
  }

  return (
    <>
      {/* Custom mouse cursor (desktop only) */}
      <CustomCursor />

      {/* Scroll progress line at very top */}
      <ScrollProgress />

      {/* Cinematic page loader — shows once, then reveals site */}
      {!loaderDone && <PageLoader onDone={() => setLoaderDone(true)} />}

      <Nav />

      <main>
        <Hero        cmsSettings={data?.settings} />
        <MarqueeBand />
        <Services    cmsServices={data?.services} />
        <Work        onLightbox={setLightboxSrc} cmsPortfolio={data?.portfolio} />
        <Process />
        <About />
        <Testimonials cmsTestimonials={data?.testimonials} />
        <CtaBand />
        <Contact />
      </main>

      <Footer />

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  )
}
