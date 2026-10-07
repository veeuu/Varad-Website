import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { footerLinks } from '../data'
import TechText from './TechText'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const wordmarkRef = useRef(null)
  const mainRef     = useRef(null)

  useEffect(() => {
    /* oversized wordmark reveals from left */
    gsap.fromTo(wordmarkRef.current,
      { opacity:0, x:-60 },
      { opacity:1, x:0, duration:1.0, ease:'power3.out',
        scrollTrigger:{ trigger:wordmarkRef.current, start:'top 92%', once:true } })

    /* footer columns stagger */
    const cols = mainRef.current?.querySelectorAll('.footer-col')
    if (cols?.length) {
      gsap.fromTo(cols,
        { opacity:0, y:28 },
        { opacity:1, y:0, duration:0.6, stagger:0.1, ease:'power2.out',
          scrollTrigger:{ trigger:mainRef.current, start:'top 88%', once:true } })
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer>
      {/* oversized wordmark decoration */}
      <div ref={wordmarkRef} className="footer-wordmark-wrap" style={{ opacity:0 }}>
        <TechText
          text="PixelBloom"
          className="footer-wordmark-big"
          fontSize={280}
          reach={200}
          softness={0.7}
          dashLength={4}
          dashGap={2}
          specks={15}
          speed={1}
          selection
          labels
          draggable
          sweep
        />
      </div>

      {/* main grid */}
      <div ref={mainRef} className="footer-main">

        {/* brand col */}
        <div className="footer-col">
          <div className="footer-brand-mark">
            <div className="footer-mark"><div className="c1"/><div className="c2"/></div>
            <span className="footer-wordmark">PixelBloom</span>
          </div>
          <p className="footer-desc">
            A full-service creative studio building visual stories for creators, brands, and people in love.
          </p>
          <div className="footer-tagline-text">Elevating with Digital Buzz</div>

          <div className="footer-socials" style={{ marginTop:28 }}>
            <SocBtn href="https://instagram.com/pixelbloom.studio" label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </SocBtn>
            <SocBtn href="https://youtube.com/@pixelbloom" label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </SocBtn>
            <SocBtn href="#" label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </SocBtn>
          </div>
        </div>

        {/* services col */}
        <div className="footer-col">
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            {footerLinks.Services.map(l => (
              <li key={l}><a href="#services">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* studio col */}
        <div className="footer-col">
          <div className="footer-col-title">Studio</div>
          <ul className="footer-links">
            {footerLinks.Studio.map((l, i) => {
              const hrefs = ['#about','#work','#process','#testimonials','#contact']
              return <li key={l}><a href={hrefs[i]}>{l}</a></li>
            })}
          </ul>
        </div>

        {/* contact col */}
        <div className="footer-col">
          <div className="footer-col-title">Say hello</div>
          <ul className="footer-links">
            <li><a href="mailto:hello@pixelbloom.in">hello@pixelbloom.in</a></li>
            <li><a href="https://instagram.com/pixelbloom.studio" target="_blank" rel="noreferrer">@pixelbloom.studio</a></li>
            <li><a href="https://youtube.com/@pixelbloom" target="_blank" rel="noreferrer">YouTube Channel</a></li>
          </ul>
          <a href="#contact" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            marginTop:28, fontSize:12, fontWeight:500,
            color:'var(--ink)', letterSpacing:'.06em',
            border:'1px solid var(--border-med)',
            padding:'10px 20px', borderRadius:'var(--r-pill)',
            transition:'border-color var(--t), background var(--t)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--brand)'; e.currentTarget.style.background='var(--brand-bg)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-med)'; e.currentTarget.style.background='transparent' }}
          >
            Start a project →
          </a>
        </div>

      </div>

      {/* bottom bar */}
      <div className="footer-bottom">
        <div className="footer-copy">© {year} <span>PixelBloom</span>. All rights reserved.</div>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

function SocBtn({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="soc">
      {children}
    </a>
  )
}
