import { useCallback, useEffect, useRef } from 'react'
import './CircularGallery.css'

export default function CircularGallery({
  items,
  bend = 1,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollEase = 0.05,
  font = '500 12px "DM Sans", sans-serif',
  scrollSpeed = 2,
}) {
  const galleryRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const interactionRef = useRef(false)

  const updateCards = useCallback(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const center = gallery.scrollLeft + gallery.clientWidth / 2
    const radius = Math.max(1, gallery.clientWidth * 0.72)
    gallery.querySelectorAll('.circular-gallery__card').forEach(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = (cardCenter - center) / radius
      const normalizedDistance = Math.max(-1.5, Math.min(1.5, distance))
      const curve = normalizedDistance * normalizedDistance * bend * 52
      card.style.setProperty('--gallery-curve', `${curve}px`)
      card.style.setProperty('--gallery-rotate', `${normalizedDistance * -12}deg`)
      card.style.setProperty('--gallery-scale', `${1 - Math.min(Math.abs(normalizedDistance) * 0.09, 0.13)}`)
    })
  }, [bend])

  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(updateCards)
  }, [updateCards])

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return undefined

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(gallery)
    gallery.addEventListener('scroll', scheduleUpdate, { passive: true })
    const frame = requestAnimationFrame(() => {
      const cards = gallery.querySelectorAll('.circular-gallery__card')
      if (cards.length > items.length) {
        const firstCardInMiddleSet = cards[items.length]
        gallery.scrollLeft =
          firstCardInMiddleSet.offsetLeft +
          firstCardInMiddleSet.offsetWidth / 2 -
          gallery.clientWidth / 2
      }
      scheduleUpdate()
    })

    return () => {
      resizeObserver.disconnect()
      gallery.removeEventListener('scroll', scheduleUpdate)
      cancelAnimationFrame(frame)
      cancelAnimationFrame(frameRef.current)
    }
  }, [scheduleUpdate, items.length])

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery || items.length < 2) return undefined

    const interval = window.setInterval(() => {
      if (
        interactionRef.current ||
        document.hidden ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) return

      const cards = gallery.querySelectorAll('.circular-gallery__card')
      const setOffset = cards[items.length].offsetLeft - cards[0].offsetLeft
      const center = gallery.scrollLeft + gallery.clientWidth / 2
      let activeIndex = 0
      let closestDistance = Infinity

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(cardCenter - center)
        if (distance < closestDistance) {
          closestDistance = distance
          activeIndex = index
        }
      })

      if (activeIndex < items.length) {
        gallery.scrollLeft += setOffset
        activeIndex += items.length
      } else if (activeIndex >= items.length * 2) {
        gallery.scrollLeft -= setOffset
        activeIndex -= items.length
      }

      const nextCard = cards[activeIndex + 1]
      const target = nextCard.offsetLeft + nextCard.offsetWidth / 2 - gallery.clientWidth / 2
      gallery.scrollTo({ left: target, behavior: 'smooth' })
    }, 2000)

    return () => window.clearInterval(interval)
  }, [items.length])

  const onPointerDown = event => {
    interactionRef.current = true
    if (event.button !== 0 || event.pointerType === 'touch') return
    pointerRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: galleryRef.current.scrollLeft,
    }
    galleryRef.current.classList.add('is-dragging')
    galleryRef.current.setPointerCapture(event.pointerId)
  }

  const onPointerMove = event => {
    if (!pointerRef.current.active) return
    const distance = (event.clientX - pointerRef.current.startX) * scrollSpeed
    galleryRef.current.scrollLeft = pointerRef.current.scrollLeft - distance
  }

  const onPointerUp = () => {
    pointerRef.current.active = false
    interactionRef.current = false
    galleryRef.current?.classList.remove('is-dragging')
  }

  const onKeyDown = event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    galleryRef.current.scrollBy({
      left: direction * galleryRef.current.clientWidth * scrollEase,
      behavior: 'smooth',
    })
  }

  return (
    <div className="circular-gallery-wrap">
      <div
        ref={galleryRef}
        className="circular-gallery"
        role="region"
        aria-label="Our four-step creative process. Automatically advances every 2 seconds in a continuous loop. Drag or use the arrow keys to explore."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onLostPointerCapture={onPointerUp}
        onMouseEnter={() => { interactionRef.current = true }}
        onMouseLeave={() => { interactionRef.current = false }}
        onFocus={() => { interactionRef.current = true }}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) interactionRef.current = false
        }}
        onKeyDown={onKeyDown}
      >
        <div className="circular-gallery__track">
          {Array.from({ length: 3 }, (_, setIndex) => items.map(item => (
            <article
              key={`${setIndex}-${item.n}`}
              className="circular-gallery__card"
              aria-hidden={setIndex !== 1}
              style={{ '--gallery-radius': `${borderRadius * 100}px`, color: textColor }}
            >
              <img className="circular-gallery__image" src={item.image} alt="" draggable="false" />
              <div className="circular-gallery__shade" />
              <div className="circular-gallery__content">
                <span className="circular-gallery__number" style={{ font }}>STEP {item.n}</span>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          )))}
        </div>
      </div>
    </div>
  )
}
