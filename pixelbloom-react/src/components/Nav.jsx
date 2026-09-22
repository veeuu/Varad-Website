import { useState, useEffect } from 'react'

export default function Nav() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90, height: 68,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 52px',
      transition: 'background .4s var(--ease), border-color .4s',
      background: stuck ? 'rgba(241,239,233,.92)' : 'transparent',
      borderBottom: stuck ? '1px solid var(--border)' : 'none',
      backdropFilter: stuck ? 'blur(18px)' : 'none',
    }}>
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ position: 'relative', width: 46, height: 34, flexShrink: 0 }}>
          <div style={{ position: 'absolute', width: 26, height: 26, borderRadius: '50%', top: 4, left: 0, background: 'radial-gradient(circle at 38% 36%,#787673,#1e1c1b)', opacity: .82 }} />
          <div style={{ position: 'absolute', width: 26, height: 26, borderRadius: '50%', top: 4, left: 18, background: 'radial-gradient(circle at 62% 36%,#EFD8D2,#D9A9A0)', opacity: .76 }} />
        </div>
        <span style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)' }}>PixelBloom</span>
      </a>

      <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none' }}>
        {['Services', 'Work', 'Process', 'About', 'Contact'].map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 400, color: 'var(--ink-mid)', transition: 'color var(--t)' }}
              onMouseEnter={e => e.target.style.color = 'var(--ink)'}
              onMouseLeave={e => e.target.style.color = 'var(--ink-mid)'}
            >{link}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" style={{
        fontSize: 12.5, fontWeight: 500, color: 'var(--paper)', background: 'var(--ink)',
        padding: '9px 22px', borderRadius: 'var(--r-pill)', transition: 'var(--t)',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-mid)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
      >Let's create</a>
    </nav>
  )
}
