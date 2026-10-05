import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageLoader({ onDone }) {
  const overlayRef = useRef(null)
  const logoBRef   = useRef(null)
  const counterRef = useRef(null)
  const barRef     = useRef(null)
  const panelsRef  = useRef([])
  const taglineRef = useRef(null)

  useEffect(() => {
    const overlay  = overlayRef.current
    const logoB    = logoBRef.current
    const counter  = counterRef.current
    const bar      = barRef.current
    const tagline  = taglineRef.current
    const panels   = panelsRef.current

    // prevent scroll during load
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onDone?.()
      }
    })

    // count up 0 → 100
    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate() {
        const v = Math.round(obj.val)
        if (counter) counter.textContent = v
        if (bar) bar.style.width = v + '%'
      }
    }, 0)

    // logo circles bloom in
    tl.fromTo(logoB, { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' }, 0.15)

    // tagline fades in
    tl.fromTo(tagline,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.8)

    // curtain split — panels slide out top + bottom
    tl.to(panels[0], { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 1.9)
    tl.to(panels[1], { yPercent:  100, duration: 0.85, ease: 'power4.inOut' }, 1.9)
    tl.to([counter, bar, tagline, logoB],
      { opacity: 0, duration: 0.3, ease: 'power1.in' }, 1.85)

    return () => { tl.kill(); document.body.style.overflow = '' }
  }, [])

  const panelStyle = (top) => ({
    position: 'absolute', left: 0, right: 0,
    height: '50%', top: top ? 0 : '50%',
    background: '#F1EFE9',
  })

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'all', overflow: 'hidden',
    }}>
      {/* top panel */}
      <div ref={el => panelsRef.current[0] = el} style={panelStyle(true)} />
      {/* bottom panel */}
      <div ref={el => panelsRef.current[1] = el} style={panelStyle(false)} />

      {/* centre content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>

        {/* logo mark */}
        <div ref={logoBRef} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 56, height: 44 }}>
            <div style={{
              position: 'absolute', width: 34, height: 34, borderRadius: '50%',
              top: 5, left: 0,
              background: 'radial-gradient(circle at 38% 36%,#787673,#1e1c1b)',
              opacity: 0.85,
            }} />
            <div style={{
              position: 'absolute', width: 34, height: 34, borderRadius: '50%',
              top: 5, left: 22,
              background: 'radial-gradient(circle at 62% 36%,#EFD8D2,#D9A9A0)',
              opacity: 0.8,
            }} />
          </div>
          <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-.03em', color: '#232221' }}>
            PixelBloom
          </span>
        </div>

        {/* tagline */}
        <p ref={taglineRef} style={{
          fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase',
          color: '#9C9890', opacity: 0,
        }}>
          Elevating with Digital Buzz
        </p>

        {/* progress bar */}
        <div style={{ width: 180, height: 1, background: 'rgba(35,34,33,.12)', borderRadius: 1, overflow: 'hidden' }}>
          <div ref={barRef} style={{
            height: '100%', width: '0%',
            background: 'linear-gradient(90deg,#E8879C,#C1694A)',
            borderRadius: 1,
            transition: 'width 0.04s linear',
          }} />
        </div>

        {/* counter */}
        <span ref={counterRef} style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 13, color: '#9C9890', letterSpacing: '.1em',
        }}>0</span>
      </div>
    </div>
  )
}
