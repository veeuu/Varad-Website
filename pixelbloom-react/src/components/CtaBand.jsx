import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Text scramble (runs on the DOM element directly) ───────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'
const FINAL_TEXT = 'bloom.'

function scramble(el) {
  if (!el) return
  const len = FINAL_TEXT.length
  let frame = 0
  const tick = () => {
    el.textContent = FINAL_TEXT.split('').map((ch, i) => {
      if (i < frame / 2.4) return ch
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    }).join('')
    frame++
    if (frame < len * 2.4 + 4) requestAnimationFrame(tick)
    else el.textContent = FINAL_TEXT
  }
  requestAnimationFrame(tick)
}

/* ── Floating orbs ─────────────────────────────────────────── */
function Orbs() {
  const orbs = [
    { w: 480, h: 480, left: '10%',  top: '-20%',   bg: 'rgba(232,135,156,0.14)', dur: '14s' },
    { w: 360, h: 360, right: '8%',  top: '-10%',   bg: 'rgba(217,161,90,0.10)',  dur: '18s' },
    { w: 300, h: 300, left: '40%',  bottom: '-5%', bg: 'rgba(193,105,74,0.12)',  dur: '11s' },
  ]
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: o.w, height: o.h,
          left: o.left, right: o.right, top: o.top, bottom: o.bottom,
          borderRadius: '50%',
          background: `radial-gradient(circle,${o.bg},transparent 70%)`,
          animation: `blobPulse ${o.dur} ease-in-out ${i * 2.5}s infinite`,
          filter: 'blur(40px)',
        }} />
      ))}
      {/* subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle,rgba(241,239,233,.07) 1px,transparent 1px)',
        backgroundSize: '36px 36px',
      }} />
    </div>
  )
}

export default function CtaBand() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const titleRef   = useRef(null)
  const scrambleEl = useRef(null)
  const subRef     = useRef(null)
  const actionsRef = useRef(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        // label
        gsap.fromTo(labelRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })

        // headline words stagger
        const words = titleRef.current?.querySelectorAll('.cta-word') ?? []
        gsap.fromTo(words,
          { opacity: 0, y: 50, rotateX: -25 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.65, stagger: 0.11, ease: 'back.out(1.2)',
            delay: 0.12, transformPerspective: 600,
          })

        // sub + actions
        gsap.fromTo(subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.55 })
        gsap.fromTo(actionsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.72 })

        // scramble "bloom." text
        setTimeout(() => scramble(scrambleEl.current), 480)
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div ref={sectionRef} className="cta-band">
      <Orbs />

      <div className="wrap cta-inner">
        <p ref={labelRef} className="label cta-band-label" style={{ opacity: 0 }}>
          <span className="rule" />Ready to start?
        </p>

        <h2 ref={titleRef} className="cta-title" style={{ perspective: 700 }}>
          {['Your', 'story', 'deserves'].map(w => (
            <span key={w} className="cta-word"
              style={{ display: 'inline-block', marginRight: '0.24em', opacity: 0 }}>
              {w}
            </span>
          ))}
          <br />
          to{' '}
          <em>
            <span ref={scrambleEl}>bloom.</span>
          </em>
        </h2>

        <p ref={subRef} className="cta-sub" style={{ opacity: 0 }}>
          Let's build something worth watching. Drop us a message and we'll get back to you within 24 hours.
        </p>

        <div ref={actionsRef} className="cta-actions" style={{ opacity: 0 }}>
          <a href="#contact" className="btn-paper btn-magnetic">
            Start a project{' '}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </a>
          <a href="#work" className="btn-ghost-light btn-magnetic">See more work</a>
        </div>
      </div>
    </div>
  )
}
