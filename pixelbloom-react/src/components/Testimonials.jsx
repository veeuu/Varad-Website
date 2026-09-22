import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { testimonials } from '../data'

export default function Testimonials() {
  const ref = useScrollReveal()
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="section" ref={ref}>
      <div className="wrap">
        <div className="testi-hdr">
          <p className="label sr"><span className="rule" />What clients say</p>
          <h2 className="sr d1" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,3.6vw,50px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 8 }}>
            Heard it straight <em style={{ fontStyle: 'italic', color: 'var(--wedding)' }}>from them</em>
          </h2>
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 20, width: 'max-content', animation: 'marquee 34s linear infinite' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {doubled.map((t, i) => (
            <div key={i} className="tcard">
              <div className="tcard-stars">{'★'.repeat(t.stars)}</div>
              <p className="tcard-quote">"{t.quote}"</p>
              <div className="tcard-author">
                <div className="tcard-avatar">{t.initials}</div>
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

