import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const pct      = total > 0 ? (scrolled / total) * 100 : 0
      if (bar) bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 2,
      zIndex: 200, pointerEvents: 'none',
      background: 'transparent',
    }}>
      <div ref={barRef} style={{
        height: '100%', width: '0%',
        background: 'linear-gradient(90deg, #E8879C, #C1694A, #D9A15A)',
        borderRadius: '0 2px 2px 0',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px rgba(193,105,74,0.5)',
      }} />
    </div>
  )
}
