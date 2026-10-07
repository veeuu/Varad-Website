import { useEffect, useRef } from 'react'
import './TechText.css'

export default function TechText({
  text = 'PixelBloom',
  fontSize = 150,
  reach = 200,
  softness = 0.7,
  dashLength = 4,
  dashGap = 2,
  specks = 15,
  sweep = true,
  speed = 1,
  selection = true,
  labels = true,
  draggable = true,
  className = '',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0, inside: false })
  const dragRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!container || !canvas || !context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 1
    let height = 1
    let dpr = 1
    let frameId = 0
    let lastTime = performance.now()
    let elapsed = 0
    let glyphs = []
    let visible = true
    let alive = true

    const layout = () => {
      const style = getComputedStyle(container)
      const family = style.fontFamily || 'serif'
      const weight = style.fontWeight || '300'
      const spacing = parseFloat(style.letterSpacing) || 0
      let size = Math.min(fontSize, parseFloat(style.fontSize) || fontSize)
      context.font = `${weight} ${size}px ${family}`
      let measured = Array.from(text).reduce((sum, character) => sum + context.measureText(character).width, 0)
        + spacing * Math.max(0, Array.from(text).length - 1)
      if (measured > width * 0.94) {
        size *= (width * 0.94) / measured
        context.font = `${weight} ${size}px ${family}`
      }
      const chars = Array.from(text)
      const widths = chars.map(character => context.measureText(character).width)
      measured = widths.reduce((sum, value) => sum + value, 0) + spacing * Math.max(0, chars.length - 1)
      let x = (width - measured) / 2
      const baseline = (height - (context.measureText('Mg').actualBoundingBoxAscent + context.measureText('Mg').actualBoundingBoxDescent)) / 2
        + context.measureText('Mg').actualBoundingBoxAscent
      glyphs = chars.map((character, index) => {
        const glyph = { character, x, width: widths[index], offsetX: 0, offsetY: 0 }
        x += widths[index] + spacing
        return glyph
      })
      return { family, weight, size, baseline }
    }

    const resize = () => {
      width = Math.max(1, container.clientWidth)
      height = Math.max(1, container.clientHeight)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      layout()
    }

    const findGlyph = (x, y, baseline) => {
      if (Math.abs(y - baseline) > reach * 0.6) return -1
      let closest = -1
      let distance = Infinity
      glyphs.forEach((glyph, index) => {
        const centerX = glyph.x + glyph.width / 2 + glyph.offsetX
        const dx = Math.abs(x - centerX)
        const dy = Math.abs(y - baseline + glyph.offsetY)
        const nextDistance = Math.hypot(dx, dy)
        if (nextDistance < distance) {
          distance = nextDistance
          closest = index
        }
      })
      return distance <= reach ? closest : -1
    }

    const draw = now => {
      if (!alive) return
      if (!visible) {
        frameId = 0
        return
      }
      frameId = window.requestAnimationFrame(draw)
      const delta = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      if (sweep && !reducedMotion) elapsed += delta * speed

      const style = getComputedStyle(container)
      const family = style.fontFamily || 'serif'
      const weight = style.fontWeight || '300'
      const layoutMetrics = layout()
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)
      context.font = `${weight} ${layoutMetrics.size}px ${family}`
      context.textBaseline = 'alphabetic'
      context.lineWidth = 1.5
      context.lineJoin = 'round'
      context.setLineDash([dashLength, dashGap])

      const sweepIndex = sweep && !reducedMotion
        ? Math.floor((elapsed % 5.5) / 5.5 * glyphs.length)
        : -1
      const pointer = pointerRef.current
      const activeIndex = pointer.inside
        ? findGlyph(pointer.x, pointer.y, layoutMetrics.baseline)
        : sweepIndex
      const selected = activeIndex >= 0 ? glyphs[activeIndex] : null
      const selectedDistance = selected && pointer.inside
        ? Math.hypot(
          pointer.x - (selected.x + selected.width / 2 + selected.offsetX),
          pointer.y - (layoutMetrics.baseline + selected.offsetY),
        )
        : 0
      const falloffStart = reach * (1 - softness)
      const focusStrength = selected && pointer.inside
        ? 1 - Math.max(0, Math.min(1, (selectedDistance - falloffStart) / Math.max(1, reach - falloffStart)))
        : 1

      glyphs.forEach((glyph, index) => {
        const x = glyph.x + glyph.offsetX
        const y = layoutMetrics.baseline + glyph.offsetY
        context.globalAlpha = 0.16
        context.fillStyle = '#302e29'
        context.fillText(glyph.character, x, y)
        context.globalAlpha = index === activeIndex ? 0.72 : 0.42
        context.strokeStyle = '#302e29'
        context.strokeText(glyph.character, x, y)
        if (index === activeIndex) {
          context.globalAlpha = 0.3 + 0.54 * focusStrength
          context.setLineDash([])
          context.fillStyle = '#302e29'
          context.fillText(glyph.character, x, y)
          context.globalAlpha = 0.3 + 0.42 * focusStrength
          context.lineWidth = 1.5
          context.setLineDash([dashLength, dashGap])
          context.strokeStyle = '#302e29'
          context.strokeText(glyph.character, x, y)
          if (selection) {
            const metrics = context.measureText(glyph.character)
            const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            const top = y - metrics.actualBoundingBoxAscent - 5
            const left = x - 5
            const boxWidth = glyph.width + 10
            const boxHeight = glyphHeight + 10
            context.globalAlpha = 0.18 + 0.24 * focusStrength
            context.setLineDash([])
            context.strokeRect(left, top, boxWidth, boxHeight)
            if (labels) {
              context.font = '9px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
              context.globalAlpha = 0.3 + 0.32 * focusStrength
              context.fillText(`${glyph.character} ${Math.round(glyph.width)}px`, left, Math.max(12, top - 5))
              context.font = `${weight} ${layoutMetrics.size}px ${family}`
            }
            for (let speck = 0; speck < Math.min(specks, 15); speck++) {
              const phase = elapsed * 3 + speck * 2.4
              const sx = left + ((Math.sin(phase * 1.7) + 1) / 2) * boxWidth
              const sy = top + ((Math.cos(phase) + 1) / 2) * boxHeight
              context.globalAlpha = 0.18 + (Math.sin(phase * 2) + 1) * 0.1
              context.fillRect(sx, sy, speck % 4 === 0 ? 2 : 1, speck % 4 === 0 ? 2 : 1)
            }
          }
        }
      })

      context.setLineDash([])
      context.globalAlpha = 1

      if (dragRef.current) {
        const glyph = glyphs[dragRef.current.index]
        if (glyph) {
          glyph.offsetX = pointer.x - dragRef.current.x
          glyph.offsetY = pointer.y - dragRef.current.y
        }
      } else {
        glyphs.forEach(glyph => {
          glyph.offsetX *= Math.pow(0.82, delta * 60)
          glyph.offsetY *= Math.pow(0.82, delta * 60)
        })
      }
    }

    const onPointerMove = event => {
      const rect = container.getBoundingClientRect()
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, inside: true }
    }
    const onPointerLeave = () => {
      if (!dragRef.current) pointerRef.current.inside = false
    }
    const onPointerDown = event => {
      if (!draggable || (event.pointerType === 'mouse' && event.button !== 0)) return
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const metrics = layout()
      const index = findGlyph(x, y, metrics.baseline)
      if (index < 0) return
      dragRef.current = { index, x: x - glyphs[index].offsetX, y: y - glyphs[index].offsetY }
      container.setPointerCapture(event.pointerId)
    }
    const onPointerUp = event => {
      dragRef.current = null
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId)
    }

    const observer = new ResizeObserver(resize)
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frameId) {
        lastTime = performance.now()
        frameId = window.requestAnimationFrame(draw)
      } else if (!visible && frameId) {
        window.cancelAnimationFrame(frameId)
        frameId = 0
      }
    })
    observer.observe(container)
    visibility.observe(container)
    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave, { passive: true })
    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointerup', onPointerUp)
    container.addEventListener('pointercancel', onPointerUp)
    resize()
    frameId = window.requestAnimationFrame(draw)

    return () => {
      alive = false
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
      visibility.disconnect()
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('pointercancel', onPointerUp)
    }
  }, [dashGap, dashLength, draggable, fontSize, labels, reach, selection, softness, specks, speed, sweep, text])

  return (
    <div
      ref={containerRef}
      className={`tech-text${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={text}
    >
      <canvas ref={canvasRef} className="tech-text-canvas" aria-hidden="true"/>
    </div>
  )
}
