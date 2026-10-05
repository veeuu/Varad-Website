import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials({ cmsTestimonials }) {
  const list    = cmsTestimonials?.length ? cmsTestimonials : testimonials
  const doubled = [...list, ...list]

  const headerRef = useRef(null)
  const rowRef    = useRef(null)

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity:0, y:36 },
      { opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger:{ trigger:headerRef.current, start:'top 85%', once:true } })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const pause  = ref => () => { if(ref.current) ref.current.style.animationPlayState='paused' }
  const resume = ref => () => { if(ref.current) ref.current.style.animationPlayState='running' }

  return (
    <section id="testimonials">

      {/* header */}
      <div className="wrap">
        <div ref={headerRef} className="testi-header" style={{ opacity:0 }}>
          <p className="label testi-header-label">
            <span className="rule"/>What clients say
          </p>
          <h2 className="display-md testi-title" style={{ marginTop:16 }}>
            Heard it straight <em className="accent">from them</em>
          </h2>
        </div>
      </div>

      <div style={{ overflow:'hidden' }}>
        <div
          ref={rowRef}
          style={{ display:'flex', gap:14, width:'max-content', animation:'marquee 42s linear infinite' }}
          onMouseEnter={pause(rowRef)}
          onMouseLeave={resume(rowRef)}
        >
          {[...doubled, ...doubled].map((t, i) => <TCard key={i} t={t}/>) }
        </div>
      </div>

    </section>
  )
}

function TCard({ t }) {
  return (
    <div className="tcard">
      {/* open-quote decoration */}
      <div style={{
        fontFamily:'var(--serif)', fontSize:64, lineHeight:1,
        color:'rgba(232,135,156,.18)', marginBottom:-12, marginTop:-8,
        userSelect:'none', pointerEvents:'none',
      }}>"</div>
      <div className="tcard-stars">{'★'.repeat(t.stars)}</div>
      <p className="tcard-quote">"{t.quote}"</p>
      <div className="tcard-author">
        <div className="tcard-avatar">{t.initials}</div>
        <div>
          <div className="tcard-name">{t.name}</div>
          <div className="tcard-role">{t.role}</div>
        </div>
      </div>
    </div>
  )
}
