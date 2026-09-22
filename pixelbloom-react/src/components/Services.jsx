import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { services } from '../data'

const svgIcons = {
  '01': <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  '02': <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  '03': <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
  '04': <><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /><line x1="12" y1="22" x2="12" y2="15.5" /><polyline points="22 8.5 12 15.5 2 8.5" /></>,
  '05': <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
  '06': <><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></>,
}

function ServiceCard({ s, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`sr d${(delay % 5) + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? 'var(--paper-warm)' : 'var(--paper)', padding: '44px 38px 40px', position: 'relative', overflow: 'hidden', transition: 'background var(--t)' }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: s.accent, transform: hovered ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'bottom', transition: 'transform .35s var(--ease)' }} />
      <div style={{ fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '.16em', color: 'var(--ink-ghost)', marginBottom: 28 }}>{s.num}</div>
      <div style={{ width: 44, height: 44, borderRadius: 'var(--r)', border: `1px solid ${hovered ? s.accent : 'var(--border-med)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, transition: 'border-color var(--t), background var(--t)', background: hovered ? `color-mix(in srgb,${s.accent} 10%,transparent)` : 'transparent' }}>
        <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: hovered ? s.accent : 'var(--ink-mid)', fill: 'none', strokeWidth: 1.5, transition: 'stroke var(--t)' }}>
          {svgIcons[s.num]}
        </svg>
      </div>
      <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)', marginBottom: 10, letterSpacing: '-.01em' }}>{s.name}</div>
      <p style={{ fontSize: 13.5, fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.72, marginBottom: 26 }}>{s.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {s.tags.map(tag => (
          <span key={tag} style={{ fontSize: 10.5, letterSpacing: '.06em', color: 'var(--ink-light)', padding: '3px 10px', border: '1px solid var(--border)', borderRadius: 'var(--r-pill)' }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const ref = useScrollReveal()

  return (
    <section id="services" className="section" ref={ref}>
      <div className="wrap">
        <div className="section-header">
          <div>
            <p className="label sr"><span className="rule" />What we do</p>
            <h2 className="section-title sr d1">Built for creators,<br />brands &amp; <em>beyond</em></h2>
          </div>
          <p className="section-body sr d2">We don't just edit videos — we build visual identities, tell compelling stories, and craft content that actually moves people. Every project gets our full creative attention.</p>
        </div>
        <div className="sr d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', gap: 1, background: 'var(--border)' }}>
          {services.map((s, i) => <ServiceCard key={s.num} s={s} delay={i} />)}
        </div>
      </div>
    </section>
  )
}
