import { marqueeItems } from '../data'

export default function MarqueeBand() {
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '15px 0', overflow: 'hidden', background: 'var(--paper-warm)' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 22s linear infinite' }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '0 28px', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-light)', whiteSpace: 'nowrap' }}>
            {item}
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--wedding)', opacity: .7 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
