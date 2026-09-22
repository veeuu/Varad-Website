import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CtaBand() {
  const ref = useScrollReveal()

  return (
    <div className="cta-band" ref={ref}>
      <div className="wrap cta-inner">
        <p className="label cta-band-label sr">
          <span className="rule" />Ready to start?
        </p>
        <h2 className="cta-title sr d1">
          Your story deserves<br />to <em>bloom.</em>
        </h2>
        <p className="cta-sub sr d2">
          Let's build something worth watching. Drop us a message and we'll get back to you within 24 hours.
        </p>
        <div className="cta-actions sr d3">
          <a href="#contact" className="btn-paper">
            Start a project{' '}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </a>
          <a href="#work" className="btn-ghost-light">See more work</a>
        </div>
      </div>
    </div>
  )
}
