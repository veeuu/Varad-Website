import { useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { processSteps } from '../data'

function ProcessStep({ step, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className={`sr d${delay + 1}`} style={{ padding: '0 28px 36px', textAlign: 'center' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', border: `1px solid ${hovered ? 'var(--creator)' : 'var(--border-med)'}`, background: hovered ? 'color-mix(in srgb,var(--creator) 10%,var(--paper))' : 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', position: 'relative', zIndex: 2, transition: 'border-color var(--t), background var(--t)' }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400, color: 'var(--creator)' }}>{step.n}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 10 }}>{step.name}</div>
      <p style={{ fontSize: 13.5, fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.72 }}>{step.desc}</p>
    </div>
  )
}

export default function Process() {
  const ref = useScrollReveal()

  return (
    <section id="process" style={{ padding: '120px 0' }} ref={ref}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <p className="label sr"><span className="rule" />How we work</p>
          <h2 className="sr d1" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px,4vw,52px)', fontWeight: 300, lineHeight: 1.1, margin: '12px 0 16px' }}>
            Our creative <em style={{ fontStyle: 'italic', color: 'var(--creator)' }}>process</em>
          </h2>
          <p className="sr d2" style={{ fontSize: 14.5, fontWeight: 300, color: 'var(--ink-mid)', maxWidth: 440, margin: '0 auto', lineHeight: 1.75 }}>
            Four clear steps from brief to delivery. No fluff, no back-and-forths  just clean, creative execution.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 30, left: 'calc(12.5% + 24px)', right: 'calc(12.5% + 24px)', height: 1, background: 'linear-gradient(to right,var(--creator),var(--border-med),var(--creator))' }} />
          {processSteps.map((step, i) => (
            <ProcessStep key={step.n} step={step} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
