import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../data'

gsap.registerPlugin(ScrollTrigger)

const STEP_ICONS = [
  /* Discovery */
  <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
  /* Concept */
  <><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></>,
  /* Production */
  <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
  /* Delivery */
  <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
]

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const stepsRef   = useRef(null)
  const bgNumRef   = useRef(null)

  useEffect(() => {
    /* header */
    gsap.fromTo(headerRef.current,
      { opacity:0, y:40 },
      { opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger:{ trigger:headerRef.current, start:'top 85%', once:true } })

    /* steps stagger */
    const steps = stepsRef.current?.querySelectorAll('.process-big-step')
    if (steps?.length) {
      gsap.fromTo(steps,
        { opacity:0, y:48 },
        { opacity:1, y:0, duration:0.7, stagger:0.14, ease:'power3.out',
          scrollTrigger:{ trigger:stepsRef.current, start:'top 78%', once:true } })
    }

    /* bg number counts up as you scroll through section */
    let current = { v: 1 }
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%', end: 'bottom 40%',
      onUpdate(self) {
        const v = Math.min(4, Math.ceil(self.progress * 4.5))
        if (bgNumRef.current && v !== current.v) {
          current.v = v
          gsap.fromTo(bgNumRef.current,
            { opacity:0, y:20 },
            { opacity:1, y:0, duration:0.4, ease:'power2.out',
              onStart: () => { bgNumRef.current.textContent = `0${v}` } })
        }
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="process" ref={sectionRef}>
      {/* floating giant background number */}
      <div ref={bgNumRef} className="process-bg-num">01</div>

      <div className="wrap">
        {/* header */}
        <div ref={headerRef} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'end', marginBottom:100, opacity:0 }}>
          <div>
            <p className="label process-header-label"><span className="rule"/>How we work</p>
            <h2 className="display-md process-title" style={{ marginTop:18 }}>
              Our creative <em className="accent-cr">process</em>
            </h2>
          </div>
          <p className="process-subtitle">
            Four clear steps from brief to delivery — no fluff, no back-and-forths, just clean creative execution every time.
          </p>
        </div>

        {/* 2×2 big step grid */}
        <div ref={stepsRef} className="process-big-grid">
          {processSteps.map((step, i) => (
            <div key={step.n} className="process-big-step">
              <div className="process-big-num">{step.n}</div>

              <div className="process-big-icon">
                <svg viewBox="0 0 24 24" style={{ width:22,height:22,stroke:'var(--creator-ink)',fill:'none',strokeWidth:1.5 }}>
                  {STEP_ICONS[i]}
                </svg>
              </div>

              {/* step label */}
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
                <span style={{ fontFamily:'var(--serif)',fontSize:13,color:'var(--creator-ink)',letterSpacing:'.1em' }}>
                  {step.n}
                </span>
                <span style={{ width:28,height:1,background:'var(--border-med)' }}/>
              </div>

              <div className="process-big-name">{step.name}</div>
              <p className="process-big-desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
