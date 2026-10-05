import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteSettings } from '../data'

/* ── counter hook ──────────────────────────────────────────── */
function useCounter(ref, target, suffix) {
  useEffect(() => {
    if (!ref.current) return
    const el  = ref.current
    const obs = new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return
      o.disconnect()
      let v = 0
      const step = Math.ceil(target / 40)
      const id   = setInterval(() => {
        v = Math.min(v + step, target)
        el.innerHTML = v + '<sup>' + suffix + '</sup>'
        if (v >= target) clearInterval(id)
      }, 28)
    }, { threshold: 0.6 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, target, suffix])
}

/* ── split chars ───────────────────────────────────────────── */
function Chars({ text, style }) {
  return (
    <span style={style}>
      {text.split('').map((c,i) => (
        <span key={i} className="split-char" style={{ display:'inline-block', willChange:'transform,opacity' }}>
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ cmsSettings }) {
  const s     = cmsSettings || siteSettings
  const local = siteSettings

  const heroSub     = s.heroSub     ?? local.heroSub
  const stats       = s.stats       ?? local.stats
  const chips       = s.chips       ?? local.chips

  const cnt1 = useRef(null), cnt2 = useRef(null), cnt3 = useRef(null)
  useCounter(cnt1, stats[0].target, '+')
  useCounter(cnt2, stats[1].target, '+')
  useCounter(cnt3, stats[2].target, '+')
  const cntRefs = [cnt1, cnt2, cnt3]

  /* refs for gsap */
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const subRef     = useRef(null)
  const actRef     = useRef(null)
  const statsRef   = useRef(null)
  const scrollRef  = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(scrollRef.current, { opacity:0, y:10 }, { opacity:1, y:0, duration:0.4 }, 1.3)

    return () => tl.kill()
  }, [])

  return (
    <section id="hero">
      {/* noise overlay */}
      <div style={{
        position:'absolute',inset:0,pointerEvents:'none',opacity:.025,zIndex:2,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:200,
      }} />

      {/* ── LEFT ─────────────────────────────────────── */}
      <div className="hero-left">

        <h1 className="hero-h1" style={{ perspective:900 }}>
          <span ref={line1Ref} style={{ display:'block', overflow:'hidden', paddingBottom:6 }}>
            <Chars text={s.heroHeadlineLine1 ?? 'We craft'} />
            <Chars text=" " />
            <em><Chars text={s.heroHeadlineEm ?? 'stories'} /></em>
          </span>
          <span ref={line2Ref} style={{ display:'block', overflow:'hidden', paddingBottom:6 }}>
            <Chars text="that " />
            <strong><Chars text={s.heroHeadlineLine2 ?? 'bloom.'} /></strong>
          </span>
        </h1>

        <p className="hero-tagline">Cinematic storytelling. Unmistakably yours.</p>
        <p ref={subRef} className="hero-sub">{heroSub}</p>

        <div ref={actRef} className="hero-actions">
          <a href="#work" className="btn btn-dark btn-magnetic">
            Explore our work
            <svg className="arrow-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 7h10M8 3l4 4-4 4"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline-dark btn-magnetic">Start a project</a>
        </div>

        <div ref={statsRef} className="hero-stats">
          {stats.map((st, i) => (
            <div key={st.label}>
              <div ref={cntRefs[i]} className="stat-n">{st.n}<sup>{st.sup}</sup></div>
              <div className="stat-l">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
