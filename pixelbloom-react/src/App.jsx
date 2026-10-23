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
import DesignToggle from './components/DesignToggle'

import { getSiteSettings, getServices, getPortfolioItems, getTestimonials } from './lib/sanity'
import * as localData from './data'

const BrandCommercial = lazy(() => import('./components/BrandCommercial'))
const Vfx3D = lazy(() => import('./components/Vfx3D'))
const VideoEditing = lazy(() => import('./components/VideoEditing'))
const Photography = lazy(() => import('./components/Photography'))

const getInitialTheme = () => {
  try {
    return window.localStorage.getItem('pixelbloom-theme') === 'dark' ? 'dark' : 'light'
  } catch (error) {
    console.error('Unable to read the saved color theme.', error)
    return 'light'
  }
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [lightboxSrc,  setLightboxSrc]  = useState(null)
  const [cms,          setCms]          = useState(null)
  const [loaderDone,   setLoaderDone]   = useState(false)
  const [route, setRoute] = useState(() => window.location.hash)
  const [designVersion, setDesignVersion] = useState('current')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('pixelbloom-theme', theme)
    } catch (error) {
      console.error('Unable to save the selected color theme.', error)
    }
  }, [theme])

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (['#/wedding-films', '#/creator-space', '#/brand-commercial', '#/vfx-3d', '#/video-editing', '#/photography'].includes(route)) {
      window.scrollTo(0, 0)
    }
  }, [route])

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
  const withDesignToggle = content => (
    <>
      {content}
      <DesignToggle designVersion={designVersion} onChange={setDesignVersion} />
    </>
  )

  if (route === '#/wedding-films') {
    return withDesignToggle(
      <WeddingFilms designVersion={designVersion} onBack={() => { window.location.hash = '' }} />
    )
  }

  if (route === '#/creator-space') {
    return withDesignToggle(
      <CreatorSpace designVersion={designVersion} onBack={() => { window.location.hash = '' }} />
    )
  }

  if (route === '#/brand-commercial') {
    return withDesignToggle(
      <Suspense fallback={<main className="brand-commercial-loading" aria-label="Loading Brand & Commercial page" />}>
        <BrandCommercial designVersion={designVersion} onBack={() => { window.location.hash = '' }} />
      </Suspense>
    )
  }

  if (route === '#/vfx-3d') {
    return withDesignToggle(
      <Suspense fallback={<main className="brand-commercial-loading" aria-label="Loading VFX and 3D page" />}>
        <Vfx3D designVersion={designVersion} onBack={() => { window.location.hash = '' }} />
      </Suspense>
    )
  }

  if (route === '#/video-editing') {
    return withDesignToggle(
      <Suspense fallback={<main className="brand-commercial-loading" aria-label="Loading Video Editing page" />}>
        <VideoEditing designVersion={designVersion} onBack={() => { window.location.hash = '' }} />
      </Suspense>
    )
  }

  if (route === '#/photography') {
    return withDesignToggle(
      <Suspense fallback={<main className="brand-commercial-loading" aria-label="Loading Photography page" />}>
        <Photography designVersion={designVersion} onBack={() => { window.location.hash = '' }} />
      </Suspense>
    )
  }

  if (route === '#/pricing') {
    return withDesignToggle(
      <>
        <Pricing />
        <Footer />
      </>
    )
  }

  return withDesignToggle(
    <>
      {/* Custom mouse cursor (desktop only) */}
      <CustomCursor />

      {/* Scroll progress line at very top */}
      <ScrollProgress />

      {/* Cinematic page loader — shows once, then reveals site */}
      {!loaderDone && <PageLoader onDone={() => setLoaderDone(true)} />}

      <Nav theme={theme} onToggleTheme={() => setTheme(value => value === 'dark' ? 'light' : 'dark')} />

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
