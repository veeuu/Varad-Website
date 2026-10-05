import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutValues, clients } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(leftRef.current,
      { opacity:0, x:-48 },
      { opacity:1, x:0, duration:0.9, ease:'power3.out',
        scrollTrigger:{ trigger:leftRef.current, start:'top 80%', once:true } })

    gsap.fromTo(rightRef.current,
      { opacity:0, x:48 },
      { opacity:1, x:0, duration:0.9, ease:'power3.out',
        scrollTrigger:{ trigger:rightRef.current, start:'top 80%', once:true } })

    /* stagger the value cards */
    const vals = rightRef.current?.querySelectorAll('.aval')
    if (vals?.length) {
      gsap.fromTo(vals,
        { opacity:0, y:24, scale:0.97 },
        { opacity:1, y:0, scale:1, duration:0.55, stagger:0.1, ease:'power2.out',
          scrollTrigger:{ trigger:vals[0], start:'top 85%', once:true } })
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="about">
      <div className="about-top">

        {/* ── LEFT — dark panel ────────────────────── */}
        <div ref={leftRef} className="about-top-left" style={{ opacity:0 }}>
          <div className="about-top-left-bg"/>

          <p className="label about-label-dark">
            <span className="rule" style={{ background:'var(--ink-light)' }}/>
            Who we are
          </p>

          <h2 className="display-md about-big-title" style={{ marginTop:20, marginBottom:28 }}>
            A studio built<br/>on craft &amp; <em className="accent">clarity</em>
          </h2>

          <p className="about-lead">
            PixelBloom started as one editor's obsession with the perfect cut. Today it's a tight-knit creative studio serving creators, brands and couples who care deeply about how their story looks on screen.
          </p>

          {/* stats strip */}
          <div className="about-stats-strip">
            {[
              { n:'80', sup:'+', label:'Projects delivered' },
              { n:'3',  sup:'+', label:'Years active' },
              { n:'40', sup:'+', label:'Happy clients' },
            ].map((st,i) => (
              <div key={i} className="about-stat">
                <div className="about-stat-n">{st.n}<sup>{st.sup}</sup></div>
                <div className="about-stat-l">{st.label}</div>
              </div>
            ))}
          </div>

          {/* floating logo mark */}
          <div style={{
            position:'absolute', bottom:40, right:40,
            width:72, height:56, opacity:.12,
          }}>
            <div style={{ position:'absolute',width:46,height:46,borderRadius:'50%',top:5,left:0,background:'radial-gradient(circle at 38% 36%,#787673,#1e1c1b)' }}/>
            <div style={{ position:'absolute',width:46,height:46,borderRadius:'50%',top:5,left:28,background:'radial-gradient(circle at 62% 36%,#EFD8D2,#D9A9A0)' }}/>
          </div>
        </div>

        {/* ── RIGHT — light panel ──────────────────── */}
        <div ref={rightRef} className="about-top-right" style={{ opacity:0 }}>

          <p className="label about-right-label">
            <span className="rule" style={{ background:'var(--ink-ghost)' }}/>
            Our philosophy
          </p>

          <p className="about-body-text" style={{ marginTop:20 }}>
            We believe great video isn't just technically sharp — it's emotionally resonant. Every project we take on gets our full creative energy, from concept to final export.
          </p>
          <p className="about-body-text">
            We're not an agency. We're a studio. Small enough to care deeply, skilled enough to deliver at any scale.
          </p>

          <div className="about-divider"/>

          <div className="about-vals">
            {aboutValues.map(v => (
              <div key={v.name} className="aval" style={{ opacity:0 }}>
                <div className="aval-name">{v.name}</div>
                <div className="aval-desc">{v.desc}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="clients-label">Worked with</div>
            <div className="clients-list">
              {clients.map(c => (
                <span key={c} className="client-name">{c}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
