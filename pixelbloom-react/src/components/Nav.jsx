import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ShreeMark from './ShreeMark'
import './Nav.css'

const LINKS = ['Services', 'Work', 'Process', 'About', 'Pricing', 'Contact']

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

  useEffect(() => {
    const closeOnEscape = event => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  /* entrance */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y:-68, opacity:0 },
      { y:0, opacity:1, duration:0.8, ease:'power3.out', delay:0.1 })
  }, [])

  /* Lock scrolling while the mobile menu is open. */
  useEffect(() => {
    if (open && mobile) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open, mobile])

  /* frosted light navigation */
  const navBg     = stuck ? 'rgba(242,239,232,.92)' : 'transparent'
  const navBorder = stuck ? '1px solid var(--border)' : '1px solid transparent'
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

        <div className="nav-shree-mark"><ShreeMark /></div>

        {/* Logo */}
        <a href="#hero" style={{ display:'flex', alignItems:'center', gap:10 }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale:1.04, duration:0.22 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale:1, duration:0.22 })}
        >
          <div className="nav-brand-mark" style={{ position:'relative', width:46, height:34, flexShrink:0 }}>
            <div style={{ position:'absolute',width:26,height:26,borderRadius:'50%',top:4,left:0,background:'radial-gradient(circle at 38% 36%,#787673,#1e1c1b)',opacity:.82 }}/>
            <div style={{ position:'absolute',width:26,height:26,borderRadius:'50%',top:4,left:18,background:'radial-gradient(circle at 62% 36%,var(--logo-mark-highlight),var(--logo-mark-shadow))',opacity:.76 }}/>
          </div>
          <span style={{ fontSize:19,fontWeight:500,letterSpacing:'-.02em',color:logoColor }}>PixelBloom</span>
        </a>

        {/* CTA and menu toggle */}
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
          <button
            className={`nav-menu-toggle${open ? ' is-open' : ''}`}
            onClick={() => setOpen(value => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-menu"
          >
            {!mobile && <span className="nav-menu-label">{open ? 'Close' : 'Menu'}</span>}
            <span className={`nav-menu-symbol${open ? ' is-open' : ''}`} aria-hidden="true">
              {open ? '×' : '+'}
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="nav-menu"
        className={`nav-menu-overlay${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        onMouseDown={event => {
          if (event.target === event.currentTarget) setOpen(false)
        }}
      >
        <div className="nav-menu-prelayers" aria-hidden="true">
          <span className="nav-menu-prelayer nav-menu-prelayer-warm" />
          <span className="nav-menu-prelayer nav-menu-prelayer-rose" />
          <span className="nav-menu-prelayer nav-menu-prelayer-paper" />
        </div>
        <section className={`nav-menu-panel${mobile ? ' nav-menu-panel-mobile' : ''}`} aria-label="Main navigation">
          <div className="nav-menu-heading">
            <span>Explore</span>
            <span>PixelBloom Studio</span>
          </div>
          <nav>
            {LINKS.map((link, index) => (
              <a
                key={link}
                className="nav-menu-item"
                href={link === 'Pricing' ? '#/pricing' : `#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                <span className="nav-menu-item-inner">
                  <span className="nav-menu-number">0{index + 1}</span>
                  <span>{link}</span>
                  <span className="nav-menu-arrow" aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </nav>
          {mobile && (
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-light">
              Let's create →
            </a>
          )}
          <p className="nav-menu-footer">Cinematic storytelling. Unmistakably yours.</p>
        </section>
      </div>
    </>
  )
}
