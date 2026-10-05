import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const labelRef = useRef(null)
  const trailRef = useRef([])
  const pos      = useRef({ x: -200, y: -200 })
  const ring     = useRef({ x: -200, y: -200 })
  const raf      = useRef(null)
  const isTouch  = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true
      return
    }

    const dot   = dotRef.current
    const ringEl = ringRef.current

    // ── build 8 trail dots ───────────────────────────────────
    const TRAIL = 8
    const trails = []
    for (let i = 0; i < TRAIL; i++) {
      const el = document.createElement('div')
      el.className = 'cur-trail'
      el.style.cssText = `
        position:fixed;pointer-events:none;z-index:9998;
        width:${6 - i * 0.5}px;height:${6 - i * 0.5}px;
        border-radius:50%;
        background:rgba(232,135,156,${0.35 - i * 0.04});
        transform:translate(-50%,-50%);
        will-change:transform;
      `
      document.body.appendChild(el)
      trails.push({ el, x: -200, y: -200 })
    }
    trailRef.current = trails

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onEnter = () => { dot.style.opacity = '1'; ringEl.style.opacity = '1' }
    const onLeave = () => { dot.style.opacity = '0'; ringEl.style.opacity = '0' }

    // magnetic hover on interactive elements
    const onMouseOver = (e) => {
      const t = e.target.closest('a,button,[data-magnetic],[data-cursor]')
      if (t) {
        const label = t.getAttribute('data-cursor')
        ringEl.style.width  = '56px'
        ringEl.style.height = '56px'
        ringEl.style.background = 'rgba(232,135,156,0.18)'
        ringEl.style.borderColor = 'var(--wedding)'
        dot.style.opacity = '0'
        if (labelRef.current) {
          labelRef.current.textContent = label || ''
          labelRef.current.style.opacity = label ? '1' : '0'
        }
      }
    }
    const onMouseOut = (e) => {
      const t = e.target.closest('a,button,[data-magnetic],[data-cursor]')
      if (t && !t.contains(e.relatedTarget)) {
        ringEl.style.width  = '36px'
        ringEl.style.height = '36px'
        ringEl.style.background = 'transparent'
        ringEl.style.borderColor = 'rgba(232,135,156,0.7)'
        dot.style.opacity = '1'
        if (labelRef.current) labelRef.current.style.opacity = '0'
      }
    }
    const onDown = () => { ringEl.style.transform = 'translate(-50%,-50%) scale(0.75)' }
    const onUp   = () => { ringEl.style.transform = 'translate(-50%,-50%) scale(1)' }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mouseout',   onMouseOut)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    // ── RAF loop ─────────────────────────────────────────────
    const LERP = 0.14
    const TRAIL_LERP = 0.55

    const tick = () => {
      // dot snaps immediately
      dot.style.left = pos.current.x + 'px'
      dot.style.top  = pos.current.y + 'px'

      // ring lerps
      ring.current.x += (pos.current.x - ring.current.x) * LERP
      ring.current.y += (pos.current.y - ring.current.y) * LERP
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'

      // trail chain
      let prev = pos.current
      for (let i = 0; i < trails.length; i++) {
        const t = trails[i]
        const factor = TRAIL_LERP - i * 0.055
        t.x += (prev.x - t.x) * Math.max(factor, 0.08)
        t.y += (prev.y - t.y) * Math.max(factor, 0.08)
        t.el.style.left = t.x + 'px'
        t.el.style.top  = t.y + 'px'
        prev = t
      }

      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    // hide native cursor
    document.documentElement.style.cursor = 'none'

    return () => {
      cancelAnimationFrame(raf.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mouseout',   onMouseOut)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      trails.forEach(t => t.el.remove())
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* inner dot */}
      <div ref={dotRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--wedding)',
        transform: 'translate(-50%,-50%)',
        left: -200, top: -200,
        transition: 'opacity 0.2s',
        willChange: 'left,top',
      }} />
      {/* outer ring */}
      <div ref={ringRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9998,
        width: 36, height: 36, borderRadius: '50%',
        border: '1.5px solid rgba(232,135,156,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: 'translate(-50%,-50%)',
        left: -200, top: -200,
        transition: 'width 0.25s var(--ease), height 0.25s var(--ease), background 0.25s, border-color 0.25s, transform 0.15s, opacity 0.2s',
        willChange: 'left,top',
      }}>
        <span ref={labelRef} style={{ color:'var(--ink)', fontSize:7, fontWeight:500, letterSpacing:'.08em', opacity:0, transition:'opacity .2s' }}/>
      </div>
    </>
  )
}
