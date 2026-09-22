import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { aboutValues, clients } from '../data'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section section-alt" style={{ overflow: 'hidden' }} ref={ref}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
          {/* visual */}
          <div className="sr" style={{ width: '100%', aspectRatio: 1, maxWidth: 420, position: 'relative', margin: '0 auto' }}>
            <div style={{ position: 'absolute', width: '65%', aspectRatio: 1, borderRadius: '50%', top: '18%', left: '2%', background: 'radial-gradient(circle at 36% 34%,#787673,#1e1c1b)', opacity: .82 }} />
            <div style={{ position: 'absolute', width: '65%', aspectRatio: 1, borderRadius: '50%', top: '18%', left: '32%', background: 'radial-gradient(circle at 64% 34%,#EFD8D2,#D9A9A0)', opacity: .70 }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-4%', background: 'rgba(241,239,233,.93)', border: '1px solid var(--border-med)', borderRadius: 'var(--r)', padding: '14px 18px', animation: 'floatY 5s ease-in-out infinite' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400, color: 'var(--wedding)', lineHeight: 1 }}>80<span style={{ fontSize: '.55em' }}>+</span></div>
              <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-light)', marginTop: 3 }}>Projects</div>
            </div>
            <div style={{ position: 'absolute', top: '6%', right: '-4%', background: 'rgba(241,239,233,.93)', border: '1px solid var(--border-med)', borderRadius: 'var(--r)', padding: '14px 18px', animation: 'floatY 5s ease-in-out 2.2s infinite' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400, color: 'var(--wedding)', lineHeight: 1 }}>3<span style={{ fontSize: '.55em' }}>+</span></div>
              <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-light)', marginTop: 3 }}>Years active</div>
            </div>
          </div>

          {/* copy */}
          <div>
            <p className="label sr"><span className="rule" />Who we are</p>
            <h2 className="section-title sr d1" style={{ margin: '12px 0 24px' }}>
              A studio built on<br />craft and <em>clarity</em>
            </h2>
            <p className="about-body sr d2">
              PixelBloom started as one editor's obsession with the perfect cut. Today it's a tight-knit creative studio serving creators, brands and couples who care deeply about how their story looks on screen.
            </p>
            <p className="about-body sr d2">
              We believe great video isn't just technically sharp — it's emotionally resonant. Every project we take on gets our full creative energy, from concept to final export.
            </p>
            <div className="about-rule sr d3" />
            <div className="about-vals sr d3">
              {aboutValues.map(v => (
                <div key={v.name} className="aval"
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--wedding)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div className="aval-name">{v.name}</div>
                  <div className="aval-desc">{v.desc}</div>
                </div>
              ))}
            </div>
            <div className="sr d4">
              <div className="clients-label">Worked with</div>
              <div className="clients-list">
                {clients.map(c => (
                  <span key={c} className="client-name"
                    onMouseEnter={e => e.target.style.color = 'var(--ink)'}
                    onMouseLeave={e => e.target.style.color = 'var(--ink-light)'}
                  >{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
