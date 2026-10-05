import { useCallback, useEffect, useRef, useState } from 'react'
import './WeddingFilms.css'

const CEREMONIES = [
  { name: 'Haldi', number: '01', accent: '#D4A05A', wash: '#F6D99F' },
  { name: 'Engagement', number: '02', accent: '#C1694A', wash: '#E8B5A2' },
  { name: 'Wedding', number: '03', accent: '#E8879C', wash: '#F3C9D2' },
  { name: 'Sangeet', number: '04', accent: '#80551F', wash: '#D5B57B' },
  { name: 'Reception', number: '05', accent: '#6E8B89', wash: '#B9D0C6' },
  { name: 'Pre-wedding', number: '06', accent: '#9B7182', wash: '#D8BDCA' },
]

export default function WeddingFilms({ onBack }) {
  const cursorRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hasGathered, setHasGathered] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const move = useCallback(direction => {
    setActiveIndex(index => (index + direction + CEREMONIES.length) % CEREMONIES.length)
  }, [])

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKeyDown)
    window.scrollTo(0, 0)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move, onBack])

  useEffect(() => {
    const cursor = cursorRef.current
    const page = cursor?.closest('.wedding-page')
    if (!cursor || !page) return undefined

    const onPointerMove = event => {
      if (event.pointerType !== 'mouse') return
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      cursor.style.opacity = '1'
      cursor.classList.toggle('is-interactive', Boolean(event.target.closest('button, a')))
    }
    const onPointerLeave = () => { cursor.style.opacity = '0' }

    page.addEventListener('pointermove', onPointerMove)
    page.addEventListener('pointerleave', onPointerLeave)
    return () => {
      page.removeEventListener('pointermove', onPointerMove)
      page.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  useEffect(() => {
    if (hasGathered) return undefined
    const timeout = window.setTimeout(() => setHasGathered(true), 1450)
    return () => window.clearTimeout(timeout)
  }, [hasGathered])

  useEffect(() => {
    if (!hasGathered) return undefined
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => move(1), 1000)
    return () => window.clearInterval(interval)
  }, [hasGathered, isPaused, move])

  return (
    <main className="wedding-page">
      <header className="wedding-page-nav">
        <a className="wedding-brand" href="#home" onClick={event => { event.preventDefault(); onBack() }}>
          <span className="wedding-brand-mark" aria-hidden="true"><i/><i/></span>
          <span>PixelBloom</span>
        </a>
        <button className="wedding-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to studio
        </button>
      </header>

      <section className="wedding-menu-section" aria-labelledby="wedding-page-title">
        <div className="wedding-page-intro">
          <p className="wedding-page-eyebrow"><span/>The wedding collection <span/></p>
          <h1 id="wedding-page-title">Every moment,<br/><em>one beautiful story.</em></h1>
          <p className="wedding-page-lede">From the first celebration to the final dance, we turn the feeling of your day into a film you can return to.</p>
        </div>

        <div className="wedding-wheel-layout">
          <div
            className="wedding-wheel"
            aria-label="Choose a wedding celebration"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
            }}
          >
            <div className="wedding-wheel-orbit wedding-wheel-orbit-outer" aria-hidden="true"/>
            <div className="wedding-wheel-orbit wedding-wheel-orbit-inner" aria-hidden="true"/>
            <div className={`wedding-wheel-ring${hasGathered ? ' has-gathered' : ''}`} style={{ '--active-index': activeIndex }}>
              {CEREMONIES.map((ceremony, index) => (
                <button
                  key={ceremony.name}
                  type="button"
                  className={`wedding-wheel-card${index === activeIndex ? ' is-active' : ''}`}
                  style={{
                    '--item-index': index,
                    '--card-accent': ceremony.accent,
                    '--card-wash': ceremony.wash,
                    '--entry-x': ['-72vw', '72vw', '-64vw', '68vw', '10vw', '-8vw'][index],
                    '--entry-y': ['-38vh', '-31vh', '35vh', '39vh', '-68vh', '65vh'][index],
                    '--entry-angle': ['-52deg', '48deg', '-62deg', '55deg', '36deg', '-43deg'][index],
                    '--entry-delay': `${index * 90}ms`,
                  }}
                  aria-pressed={index === activeIndex}
                  aria-label={`${ceremony.name} ceremony`}
                  disabled={!hasGathered}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="wedding-card-number">{ceremony.number}</span>
                  <span className="wedding-card-art" aria-hidden="true">
                    <i className="wedding-card-sun"/>
                    <i className="wedding-card-horizon"/>
                    <i className="wedding-card-petal petal-one"/>
                    <i className="wedding-card-petal petal-two"/>
                    <i className="wedding-card-petal petal-three"/>
                  </span>
                  <span className="wedding-card-name">{ceremony.name}</span>
                  <span className="wedding-card-caption">A story in the making</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </section>

      <footer className="wedding-page-footer">
        <span>PixelBloom Weddings</span>
        <span>Made for the moments that matter.</span>
      </footer>
      <div ref={cursorRef} className="wedding-page-cursor" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16.5" />
          <circle className="cursor-inner-ring" cx="20" cy="20" r="11" />
          <path d="M20 13.5c2.7 3.2 3.9 5.3 0 7.1-3.9-1.8-2.7-3.9 0-7.1Z" />
          <path d="M26.5 20c-3.2 2.7-5.3 3.9-7.1 0 1.8-3.9 3.9-2.7 7.1 0Z" />
          <path d="M20 26.5c-2.7-3.2-3.9-5.3 0-7.1 3.9 1.8 2.7 3.9 0 7.1Z" />
          <path d="M13.5 20c3.2-2.7 5.3-3.9 7.1 0-1.8 3.9-3.9 2.7-7.1 0Z" />
          <circle cx="20" cy="20" r="1.25" />
          <path className="cursor-sparkle" d="M34 5v6M31 8h6" />
        </svg>
      </div>
    </main>
  )
}
