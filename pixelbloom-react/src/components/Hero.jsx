import { useEffect, useRef } from 'react'
import { siteSettings } from '../data'

function useCounter(ref, target, suffix) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const obs = new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let v = 0
      const step = Math.ceil(target / 38)
      const id = setInterval(() => {
        v = Math.min(v + step, target)
        el.innerHTML = v + '<sup>' + suffix + '</sup>'
        if (v >= target) clearInterval(id)
      }, 28)
    }, { threshold: 0.6 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, target, suffix])
}

export default function Hero() {
  const { heroEyebrow, heroSub, stats, chips } = siteSettings

  const cnt1 = useRef(null)
  const cnt2 = useRef(null)
  const cnt3 = useRef(null)
  const refs = [cnt1, cnt2, cnt3]

  useCounter(cnt1, stats[0].target, '+')
  useCounter(cnt2, stats[1].target, '+')
  useCounter(cnt3, stats[2].target, '+')

  return (
    <section id="hero">
      {/* noise texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: 200 }} />

      {/* LEFT */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 64px 80px 52px', position: 'relative', zIndex: 2 }}>
        <div className="hero-eyebrow">
          <span className="rule" style={{ background: 'var(--wedding)' }} />
          <span className="label">{heroEyebrow}</span>
        </div>

        <h1 className="hero-h1">
          We craft<br />
          <em>stories</em> that<br />
          <strong>bloom.</strong>
        </h1>

        <p className="hero-sub">{heroSub}</p>

        <div className="hero-actions">
          <a href="#work" className="btn-solid">
            Explore our work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline">Start a project</a>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={s.label}>
              <div ref={refs[i]} className="stat-n">
                {s.n}<sup>{s.sup}</sup>
              </div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <div style={{ position: 'absolute', width: '70%', aspectRatio: 1, borderRadius: '50%', background: 'radial-gradient(circle,rgba(217,169,160,.18) 0%,transparent 72%)', pointerEvents: 'none' }} />

        {[{ size: 420, dur: '36s', rev: false }, { size: 560, dur: '52s', rev: true }].map((o, i) => (
          <div key={i} style={{
            position: 'absolute', width: o.size, height: o.size, borderRadius: '50%',
            border: i === 0 ? '1px solid var(--border)' : '1px solid rgba(217,169,160,.15)',
            animation: `spin ${o.dur} linear infinite ${o.rev ? 'reverse' : ''}`,
          }}>
            {i === 0 && <div style={{ position: 'absolute', top: -3, left: '50%', marginLeft: -3, width: 6, height: 6, borderRadius: '50%', background: 'var(--wedding)', boxShadow: '0 0 8px var(--wedding)' }} />}
          </div>
        ))}

        <div style={{ position: 'relative', zIndex: 2, animation: 'scaleIn 1s var(--ease) .5s both' }}>
          <img src="/transparent-pixelbloom.png" alt="PixelBloom" style={{ width: 'clamp(240px,28vw,360px)', filter: 'drop-shadow(0 28px 56px rgba(35,34,33,.12))' }} />
        </div>

        {chips.map((chip, i) => (
          <div key={i} style={{
            position: 'absolute',
            top:    i === 0 ? '26%' : i === 1 ? '44%' : undefined,
            bottom: i === 2 ? '22%' : undefined,
            left:   i === 0 ? '4%'  : i === 2 ? '8%' : undefined,
            right:  i === 1 ? '4%'  : undefined,
            background: 'rgba(241,239,233,.92)', border: '1px solid var(--border-med)',
            borderRadius: 'var(--r)', padding: '9px 14px', fontSize: 11.5, color: 'var(--ink-mid)',
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 7,
            animation: `floatY 4.5s ease-in-out ${[0, 1.8, 0.9][i]}s infinite`,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: chip.color, flexShrink: 0 }} />
            {chip.text}
          </div>
        ))}
      </div>

      {/* scroll nudge */}
      <div style={{ position: 'absolute', bottom: 36, left: 52, display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeUp .7s var(--ease) 1.2s both' }}>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,var(--ink-ghost),transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        <span style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-ghost)' }}>Scroll</span>
      </div>
    </section>
  )
}
