import { useEffect, useMemo, useRef } from 'react'
import './DomeGallery.css'

const DEFAULT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop',
    alt: 'Abstract artwork',
  },
  {
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=774&auto=format&fit=crop',
    alt: 'Modern sculpture',
  },
  {
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop',
    alt: 'Digital artwork',
  },
  {
    src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop',
    alt: 'Contemporary art',
  },
  {
    src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop',
    alt: 'Geometric pattern',
  },
  {
    src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop',
    alt: 'Textured surface',
  },
  {
    src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large',
    alt: 'Creative inspiration',
  },
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  minRadius = 600,
  maxVerticalRotationDeg = 5,
  segments = 35,
  dragDampening = 2,
  grayscale = true,
  className = '',
}) {
  const rootRef = useRef(null)
  const sphereRef = useRef(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef(null)
  const inertiaRef = useRef(0)
  const lastFrameRef = useRef(0)
  const imageItems = useMemo(() => {
    const rows = Array.from({ length: 5 }, (_, row) => row)
    const columns = Array.from({ length: segments }, (_, column) => column)
    return columns.flatMap((column, columnIndex) => {
      const x = -37 + columnIndex * 2
      const yValues = columnIndex % 2 === 0 ? [-4, -2, 0, 2, 4] : [-3, -1, 1, 3, 5]
      return rows.map((row, rowIndex) => ({
        ...images[(columnIndex * rows.length + rowIndex) % images.length],
        key: `${column}-${row}`,
        rotateY: (180 / segments) * (x + 0.5),
        rotateX: (180 / segments) * (yValues[row] - 0.5),
      }))
    })
  }, [images, segments])

  useEffect(() => {
    const root = rootRef.current
    const sphere = sphereRef.current
    if (!root || !sphere) return undefined

    const resize = () => {
      const { width, height } = root.getBoundingClientRect()
      if (!width || !height) return
      const minDimension = Math.min(width, height)
      const basis = width / height >= 1.3 ? width : minDimension
      const radius = Math.max(minRadius, Math.min(basis * fit, height * 1.35))
      root.style.setProperty('--radius', `${Math.round(radius)}px`)
      root.style.setProperty('--tile-size', `${(Math.PI * 2 * radius) / segments}px`)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(root)
    resize()

    let frameId = 0
    const animate = time => {
      if (lastFrameRef.current) {
        const delta = Math.min((time - lastFrameRef.current) / (1000 / 60), 3)
        if (!dragRef.current) {
          rotationRef.current.y += delta * (0.032 + inertiaRef.current)
          inertiaRef.current *= Math.pow(0.94 + 0.055 * clamp(dragDampening, 0, 1), delta)
          if (Math.abs(inertiaRef.current) < 0.001) inertiaRef.current = 0
        }
      }
      lastFrameRef.current = time
      sphere.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`
      frameId = window.requestAnimationFrame(animate)
    }
    frameId = window.requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frameId)
    }
  }, [dragDampening, fit, minRadius, segments])

  const handlePointerDown = event => {
    if (event.button !== 0 && event.pointerType !== 'touch') return
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      rotation: { ...rotationRef.current },
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = event => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const now = performance.now()
    const elapsed = Math.max(1, now - drag.lastTime)
    drag.velocity = ((event.clientX - drag.lastX) / 16 / elapsed) * (1000 / 60)
    drag.lastX = event.clientX
    drag.lastTime = now
    rotationRef.current = {
      x: clamp(drag.rotation.x - (event.clientY - drag.y) / 16, -maxVerticalRotationDeg, maxVerticalRotationDeg),
      y: drag.rotation.y + (event.clientX - drag.x) / 16,
    }
  }

  const handlePointerUp = event => {
    if (dragRef.current?.pointerId === event.pointerId) {
      inertiaRef.current = clamp(dragRef.current.velocity, -1.4, 1.4)
      dragRef.current = null
    }
  }

  return (
    <div
      ref={rootRef}
      className={`dome-gallery${className ? ` ${className}` : ''}`}
      style={{
        '--segments': segments,
        '--image-filter': grayscale ? 'grayscale(1)' : 'none',
        '--radius': `${minRadius}px`,
        '--tile-size': `${(Math.PI * 2 * minRadius) / segments}px`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Interactive spherical gallery. Drag to rotate."
    >
      <div className="dome-gallery__stage">
        <div className="dome-gallery__sphere" ref={sphereRef}>
          {imageItems.map(item => (
            <div
              className="dome-gallery__tile"
              key={item.key}
              style={{
                transform: `rotateY(${item.rotateY}deg) rotateX(${item.rotateX}deg) translateZ(var(--radius))`,
              }}
            >
              <img src={item.src} alt={item.alt} draggable="false" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <div className="dome-gallery__vignette" aria-hidden="true" />
      <span className="dome-gallery__hint" aria-hidden="true">Drag to explore</span>
    </div>
  )
}
