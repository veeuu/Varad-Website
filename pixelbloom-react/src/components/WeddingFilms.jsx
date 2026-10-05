import { useCallback, useEffect, useState } from 'react'
import './WeddingFilms.css'

const CEREMONIES = [
  { name: 'Haldi', number: '01', note: 'A little sunshine, a lot of laughter.', accent: '#D4A05A', wash: '#F6D99F' },
  { name: 'Engagement', number: '02', note: 'The beginning of your forever story.', accent: '#C1694A', wash: '#E8B5A2' },
  { name: 'Wedding', number: '03', note: 'The moment two stories become one.', accent: '#E8879C', wash: '#F3C9D2' },
  { name: 'Sangeet', number: '04', note: 'Big feelings. Bigger dance moves.', accent: '#80551F', wash: '#D5B57B' },
  { name: 'Reception', number: '05', note: 'One more night worth remembering.', accent: '#6E8B89', wash: '#B9D0C6' },
  { name: 'Pre-wedding', number: '06', note: 'Your story, before the big day.', accent: '#9B7182', wash: '#D8BDCA' },
]

export default function WeddingFilms({ onBack }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const active = CEREMONIES[activeIndex]

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
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => move(1), 1000)
    return () => window.clearInterval(interval)
  }, [isPaused, move])

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
            <div className="wedding-wheel-ring" style={{ '--active-index': activeIndex }}>
              {CEREMONIES.map((ceremony, index) => (
                <button
                  key={ceremony.name}
                  type="button"
                  className={`wedding-wheel-card${index === activeIndex ? ' is-active' : ''}`}
                  style={{
                    '--item-index': index,
                    '--card-accent': ceremony.accent,
                    '--card-wash': ceremony.wash,
                  }}
                  aria-pressed={index === activeIndex}
                  aria-label={`${ceremony.name} ceremony`}
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
            <div className="wedding-wheel-center" aria-hidden="true">
              <span>PB</span>
              <i/>
            </div>
          </div>

          <div className="wedding-active-story" aria-live="polite" key={active.name} style={{ '--story-accent': active.accent }}>
            <div className="wedding-active-meta"><span>{active.number}</span><span>Wedding film chapter</span></div>
            <h2>{active.name}</h2>
            <p>{active.note}</p>
            <span className="wedding-coming-soon">Film collection coming soon</span>
          </div>
        </div>

        <div className="wedding-wheel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous celebration">←</button>
          <div className="wedding-wheel-pagination" aria-label={`${activeIndex + 1} of ${CEREMONIES.length}`}>
            {CEREMONIES.map((ceremony, index) => (
              <button key={ceremony.name} type="button" aria-label={`Show ${ceremony.name}`} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => setActiveIndex(index)} />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Next celebration">→</button>
        </div>
      </section>

      <footer className="wedding-page-footer">
        <span>PixelBloom Weddings</span>
        <span>Made for the moments that matter.</span>
      </footer>
    </main>
  )
}
