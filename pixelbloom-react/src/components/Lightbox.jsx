import { useEffect } from 'react'

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  if (!src) return null

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(35,34,33,.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(6px)' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 24, fontSize: 28, color: 'var(--paper)', cursor: 'pointer', lineHeight: 1, opacity: .7, background: 'none', border: 'none', transition: 'opacity .2s' }}
        onMouseEnter={e => e.target.style.opacity = 1}
        onMouseLeave={e => e.target.style.opacity = .7}
      >×</button>
      <img src={src} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '88vh', borderRadius: 'var(--r-lg)', objectFit: 'contain' }} />
    </div>
  )
}
