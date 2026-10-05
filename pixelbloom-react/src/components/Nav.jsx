import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const LINKS = ['Services', 'Work', 'Process', 'About', 'Contact']

export default function Nav() {
  const [stuck,  setStuck]  = useState(false)
  const [mobile, setMobile] = useState(false)
  const [open,   setOpen]   = useState(false)

  const navRef    = useRef(null)
  const menuRef   = useRef(null)

  useEffect(() => {
    const s = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', s, { passive:true })
    return () => window.removeEventListener('scroll', s)
  }, [])

  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768)
    c(); window.addEventListener('resize', c)
    return () => window.removeEventListener('resize', c)
  }, [])

  /* entrance */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y:-68, opacity:0 },
      { y:0, opacity:1, duration:0.8, ease:'power3.out', delay:0.1 })
  }, [])

  /* mobile drawer */
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    if (open) {
      menu.style.display = 'flex'
      gsap.fromTo(menu, { opacity:0, y:-16 }, { opacity:1, y:0, duration:0.36, ease:'power2.out' })
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to(menu, { opacity:0, y:-10, duration:0.24, ease:'power1.in',
        onComplete: () => { menu.style.display = 'none' } })
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* frosted light navigation */
  const navBg     = stuck ? 'rgba(242,239,232,.92)' : 'transparent'
  const navBorder = stuck ? '1px solid var(--border)' : '1px solid transparent'
  const linkColor = 'var(--ink-mid)'
  const logoColor = 'var(--ink)'
  const hamColor  = 'var(--ink)'

  return (
    <>
      <nav ref={navRef} id="nav" style={{
        opacity:0,
        background: navBg,
        borderBottom: navBorder,
        backdropFilter: stuck ? 'blur(20px) saturate(1.4)' : 'none',
        boxShadow: stuck ? '0 2px 24px rgba(22,20,15,.08)' : 'none',
        transition: 'background .4s var(--ease), border-color .4s, box-shadow .4s, backdrop-filter .4s',
      }}>

        {/* Logo */}
        <a href="#hero" style={{ display:'flex', alignItems:'center', gap:10 }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale:1.04, duration:0.22 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale:1, duration:0.22 })}
        >
          <div style={{ position:'relative', width:46, height:34, flexShrink:0 }}>
            <div style={{ position:'absolute',width:26,height:26,borderRadius:'50%',top:4,left:0,background:'radial-gradient(circle at 38% 36%,#787673,#1e1c1b)',opacity:.82 }}/>
            <div style={{ position:'absolute',width:26,height:26,borderRadius:'50%',top:4,left:18,background:'radial-gradient(circle at 62% 36%,#EFD8D2,#D9A9A0)',opacity:.76 }}/>
          </div>
          <span style={{ fontSize:19,fontWeight:500,letterSpacing:'-.02em',color:logoColor }}>PixelBloom</span>
        </a>

        {/* Desktop links */}
        {!mobile && (
          <ul style={{ display:'flex', alignItems:'center', gap:32, listStyle:'none' }}>
            {LINKS.map(link => (
              <li key={link}><NavLink href={`#${link.toLowerCase()}`} label={link} color={linkColor}/></li>
            ))}
          </ul>
        )}

        {/* CTA + hamburger */}
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {!mobile && (
            <a href="#contact" className="nav-cta" style={{
              fontSize:12.5, fontWeight:500, color:'var(--ink)',
              background:'var(--paper)', padding:'9px 22px',
              borderRadius:'var(--r-pill)',
              transition:'background var(--t)',
              display:'inline-block',
            }}
              onMouseOver={e => e.currentTarget.style.background='var(--paper-warm)'}
              onMouseOut={e => e.currentTarget.style.background='var(--paper)'}
            >Let's create</a>
          )}
          {mobile && (
            <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu"
              style={{ width:44,height:44,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:5,padding:8 }}>
              <span className={`ham-line${open?' ham-open-1':''}`} style={{ background:hamColor }}/>
              <span className={`ham-line${open?' ham-open-2':''}`} style={{ background:hamColor }}/>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      <div ref={menuRef} style={{
        display:'none', opacity:0,
        position:'fixed', inset:0, top:68, zIndex:89,
        flexDirection:'column', alignItems:'center', justifyContent:'center',
        background:'rgba(242,239,232,.98)', backdropFilter:'blur(24px)',
        gap:36, padding:'40px 24px',
      }}>
        {LINKS.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}
            style={{ fontSize:32,fontWeight:300,letterSpacing:'-.02em',color:'var(--ink)',fontFamily:'var(--serif)' }}>
            {link}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}
          className="btn btn-light" style={{ marginTop:8 }}>
          Let's create →
        </a>
      </div>
    </>
  )
}

function NavLink({ href, label, color }) {
  const lineRef = useRef(null)
  return (
    <a href={href} style={{ position:'relative', fontSize:13, fontWeight:400, color, paddingBottom:2, transition:'color .3s' }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--ink)'
        gsap.fromTo(lineRef.current, { scaleX:0, transformOrigin:'left' }, { scaleX:1, duration:0.26, ease:'power2.out' })
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = color
        gsap.to(lineRef.current, { scaleX:0, transformOrigin:'right', duration:0.2, ease:'power1.in' })
      }}
    >
      {label}
      <span ref={lineRef} style={{
        position:'absolute', bottom:-1, left:0, right:0, height:1,
        background:'var(--wedding)', borderRadius:1, transform:'scaleX(0)',
      }}/>
    </a>
  )
}
