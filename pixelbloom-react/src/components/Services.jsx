import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  '01': <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  '02': <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  '03': <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>,
  '04': <><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></>,
  '05': <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
  '06': <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
}

/* ── Feature card (first service, full left col) ─────────── */
function FeatCard({ s }) {
  const cardRef = useRef(null)
  const [hov, setHov] = useState(false)

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 18
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 18
    gsap.to(cardRef.current, { rotateY:x, rotateX:-y, duration:0.4, ease:'power1.out', transformPerspective:900 })
  }
  const onLeave = () => {
    gsap.to(cardRef.current, { rotateY:0, rotateX:0, duration:0.6, ease:'elastic.out(1,.5)' })
    setHov(false)
  }

  return (
    <div
      ref={cardRef}
      className="bento-feat"
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
    >
      <div className="bento-feat-bg"/>
      <div className="bento-feat-num">{s.num}</div>

      {/* top badge */}
      <div style={{
        position:'absolute',top:44,left:44,
        fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',
        color:'var(--ink-light)',
        display:'flex',alignItems:'center',gap:8,
      }}>
        <span style={{ width:18,height:1,background:'var(--wedding)' }}/>
        Featured Service
      </div>

      <div className="bento-feat-icon">
        <svg viewBox="0 0 24 24" style={{ width:22,height:22,stroke:'var(--wedding)',fill:'none',strokeWidth:1.5 }}>
          {ICONS[s.num]}
        </svg>
      </div>
      <div className="bento-feat-name">{s.name}</div>
      <p className="bento-feat-desc">{s.desc}</p>
      <div className="bento-feat-tags">
        {s.tags.map(t => <span key={t} className="bento-tag-dark">{t}</span>)}
      </div>

      {/* arrow */}
      <div style={{
        position:'absolute',bottom:44,right:44,
        width:40,height:40,borderRadius:'50%',
        border:'1px solid var(--border-med)',
        display:'flex',alignItems:'center',justifyContent:'center',
        transition:'border-color var(--t),background var(--t)',
        background: hov ? 'rgba(232,135,156,.15)' : 'transparent',
        borderColor: hov ? 'var(--wedding)' : 'var(--border-med)',
      }}>
        <svg viewBox="0 0 14 14" fill="none" stroke="var(--ink-mid)" strokeWidth="1.5" style={{ width:14,height:14 }}>
          <path d="M2 7h10M8 3l4 4-4 4"/>
        </svg>
      </div>
    </div>
  )
}

/* ── Regular bento card ──────────────────────────────────── */
function SmallCard({ s }) {
  const cardRef = useRef(null)
  const [hov, setHov] = useState(false)

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 10
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 10
    gsap.to(cardRef.current, { rotateY:x, rotateX:-y, duration:0.35, ease:'power1.out', transformPerspective:700 })
  }
  const onLeave = () => {
    gsap.to(cardRef.current, { rotateY:0, rotateX:0, duration:0.55, ease:'elastic.out(1,.5)' })
    setHov(false)
  }

  return (
    <div
      ref={cardRef}
      className="bento-card service-card-wrap"
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
    >
      <div className="bento-card-accent" style={{ background:s.accent }}/>

      {/* hover glow spot */}
      <div style={{
        position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',
        background:`radial-gradient(circle,${s.accent}22 0%,transparent 72%)`,
        opacity: hov ? 1 : 0, transition:'opacity 0.4s', pointerEvents:'none',
      }}/>

      <div className="bento-card-num">{s.num}</div>
      <div className="bento-card-icon" style={{ borderColor: hov ? s.accent : undefined }}>
        <svg viewBox="0 0 24 24" style={{ width:18,height:18,stroke: hov ? s.accent : 'var(--ink-mid)',fill:'none',strokeWidth:1.5,transition:'stroke var(--t)' }}>
          {ICONS[s.num]}
        </svg>
      </div>
      <div className="bento-card-name">{s.name}</div>
      <p className="bento-card-desc">{s.desc}</p>
      <div className="bento-card-tags">
        {s.tags.map(t => (
          <span key={t} className="bento-tag" style={{ borderColor: hov ? s.accent : undefined, color: hov ? s.accent : undefined }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Services({ cmsServices }) {
  const headerRef = useRef(null)
  const bentoRef  = useRef(null)

  const list = cmsServices?.length
    ? cmsServices.map(s => ({ num:s.num, name:s.name, desc:s.description, tags:s.tags||[], accent:s.accentColor||'var(--wedding)' }))
    : services

  const [feat, ...rest] = list

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity:0, y:36 },
      { opacity:1, y:0, duration:0.75, ease:'power3.out',
        scrollTrigger:{ trigger:headerRef.current, start:'top 85%', once:true } })

    const cells = bentoRef.current?.querySelectorAll('.bento-feat,.bento-card')
    if (cells?.length) {
      gsap.fromTo(cells,
        { opacity:0, y:52, scale:0.96 },
        { opacity:1, y:0, scale:1, duration:0.7, stagger:0.1, ease:'power3.out',
          scrollTrigger:{ trigger:bentoRef.current, start:'top 78%', once:true } })
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="services">
      <div className="wrap">

        {/* header */}
        <div ref={headerRef} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'end', marginBottom:72, opacity:0 }}>
          <div>
            <p className="label services-eyebrow"><span className="rule"/>What we do</p>
            <h2 className="display-md" style={{ marginTop:18 }}>
              Built for creators,<br/>brands &amp; <em className="accent">beyond</em>
            </h2>
          </div>
          <p style={{ fontSize:14.5,fontWeight:300,color:'var(--ink-mid)',lineHeight:1.78,maxWidth:360,alignSelf:'end' }}>
            We don't just edit videos — we build visual identities, tell compelling stories, and craft content that actually moves people. Every project gets our full creative attention.
          </p>
        </div>

        {/* bento grid */}
        <div ref={bentoRef} className="bento-services">
          <FeatCard s={feat}/>
          {rest.map(s => <SmallCard key={s.num} s={s}/>)}
        </div>

      </div>
    </section>
  )
}
