import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Lightbox({ src, onClose }) {
  const overlayRef = useRef(null)
  const imgRef     = useRef(null)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    /* entrance */
    gsap.fromTo(overlayRef.current,
      { opacity:0 }, { opacity:1, duration:0.3, ease:'power2.out' })
    gsap.fromTo(imgRef.current,
      { scale:0.82, opacity:0, y:20 },
      { scale:1, opacity:1, y:0, duration:0.5, ease:'back.out(1.4)', delay:0.05 })

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    gsap.to(imgRef.current, { scale:0.88, opacity:0, duration:0.25, ease:'power2.in' })
    gsap.to(overlayRef.current, {
      opacity:0, duration:0.3, delay:0.1, ease:'power1.in',
      onComplete: onClose,
    })
  }

  if (!src) return null

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      onClick={handleClose}
      style={{ opacity:0 }}
    >
      {/* close button */}
      <button className="lightbox-close" onClick={handleClose} aria-label="Close">×</button>

      <img
        ref={imgRef}
        src={src}
        alt=""
        className="lightbox-img"
        onClick={e => e.stopPropagation()}
        style={{ opacity:0 }}
      />
    </div>
  )
}
